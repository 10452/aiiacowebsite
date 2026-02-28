import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions, isSecureRequest } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  insertLead, getAllLeads, updateLeadStatus,
  getAdminUserByUsername, getAdminUserById, getAllAdminUsers,
  createAdminUser, deleteAdminUser, updateAdminUserPassword, countAdminUsers,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";
import { TRPCError } from "@trpc/server";

// ─── Admin Session JWT helpers ────────────────────────────────────────────────

const ADMIN_COOKIE = ENV.adminSessionCookieName;
const ADMIN_JWT_SECRET = new TextEncoder().encode(ENV.cookieSecret + "_admin");
const ADMIN_SESSION_TTL = 60 * 60 * 8; // 8 hours

async function signAdminToken(payload: { id: number; username: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${ADMIN_SESSION_TTL}s`)
    .setIssuedAt()
    .sign(ADMIN_JWT_SECRET);
}

async function verifyAdminToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, ADMIN_JWT_SECRET);
    return payload as { id: number; username: string; role: string };
  } catch {
    return null;
  }
}

function getAdminCookieOptions(req: import("express").Request) {
  return {
    httpOnly: true,
    sameSite: "none" as const,
    path: "/",
    secure: isSecureRequest(req),
    maxAge: ADMIN_SESSION_TTL,
  };
}

// ─── Admin-authenticated procedure ───────────────────────────────────────────

const adminAuthedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  // Read token from custom header (primary) or cookie (fallback)
  const headerToken = ctx.req.headers["x-admin-token"] as string | undefined;
  const cookieToken = ctx.req.cookies?.[ADMIN_COOKIE];
  const token = headerToken || cookieToken;
  if (!token) throw new TRPCError({ code: "UNAUTHORIZED", message: "Admin login required" });
  const session = await verifyAdminToken(token);
  if (!session) throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid or expired session" });
  return next({ ctx: { ...ctx, adminSession: session } });
});

// Owner-only procedure (can manage other admins)
const ownerProcedure = adminAuthedProcedure.use(async ({ ctx, next }) => {
  if ((ctx as any).adminSession.role !== "owner") {
    throw new TRPCError({ code: "FORBIDDEN", message: "Owner access required" });
  }
  return next({ ctx });
});

// ─── CRM Webhook Helper ───────────────────────────────────────────────────────

async function fireCrmWebhook(payload: Record<string, unknown>): Promise<void> {
  if (!ENV.crmWebhookUrl) return;
  try {
    await fetch(ENV.crmWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, source: "aiiaco.com", timestamp: new Date().toISOString() }),
    });
  } catch (err) {
    console.warn("[CRM Webhook] Failed to deliver:", err);
  }
}

// ─── Lead Schemas ─────────────────────────────────────────────────────────────

const callSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(320),
});

const intakeSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(320),
  company: z.string().max(255).optional(),
  phone: z.string().max(64).optional(),
  industry: z.string().max(128).optional(),
  engagementModel: z.string().max(128).optional(),
  annualRevenue: z.string().max(64).optional(),
  message: z.string().max(5000).optional(),
});

// ─── Router ───────────────────────────────────────────────────────────────────

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── Admin Console Auth ─────────────────────────────────────────────────────
  adminAuth: router({
    /**
     * Login with username + password.
     * Returns session cookie on success.
     */
    login: publicProcedure
      .input(z.object({
        username: z.string().min(1).max(64),
        password: z.string().min(1).max(128),
      }))
      .mutation(async ({ input, ctx }) => {
        const adminUser = await getAdminUserByUsername(input.username.toLowerCase().trim());
        if (!adminUser) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid username or password" });
        }
        const valid = await bcrypt.compare(input.password, adminUser.passwordHash);
        if (!valid) {
          throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid username or password" });
        }
        const token = await signAdminToken({
          id: adminUser.id,
          username: adminUser.username,
          role: adminUser.role,
        });
        ctx.res.cookie(ADMIN_COOKIE, token, getAdminCookieOptions(ctx.req));
        return {
          success: true,
          token, // Return token for localStorage storage (cookie may be blocked by proxy)
          user: {
            id: adminUser.id,
            username: adminUser.username,
            displayName: adminUser.displayName,
            role: adminUser.role,
          },
        };
      }),

    /**
     * Get current admin session info.
     */
    me: publicProcedure.query(async ({ ctx }) => {
      // Check header first (localStorage-based), then cookie fallback
      const headerToken = ctx.req.headers["x-admin-token"] as string | undefined;
      const cookieToken = ctx.req.cookies?.[ADMIN_COOKIE];
      const token = headerToken || cookieToken;
      if (!token) return null;
      const session = await verifyAdminToken(token);
      if (!session) return null;
      const adminUser = await getAdminUserById(session.id);
      if (!adminUser) return null;
      return {
        id: adminUser.id,
        username: adminUser.username,
        displayName: adminUser.displayName,
        role: adminUser.role,
      };
    }),

    /**
     * Logout — clears admin session cookie.
     */
    logout: publicProcedure.mutation(({ ctx }) => {
      ctx.res.clearCookie(ADMIN_COOKIE, { path: "/", httpOnly: true });
      return { success: true };
    }),

    /**
     * Public: check if any admin accounts exist (used to show setup vs login).
     */
    hasAdmins: publicProcedure.query(async () => {
      const count = await countAdminUsers();
      return { hasAdmins: count > 0 };
    }),

    /**
     * Setup: create the first owner account (only works when no admins exist).
     */
    setup: publicProcedure
      .input(z.object({
        username: z.string().min(3).max(64).regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
        password: z.string().min(8).max(128),
        displayName: z.string().max(128).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        const count = await countAdminUsers();
        if (count > 0) {
          throw new TRPCError({ code: "FORBIDDEN", message: "Setup already complete. Use the admin console to manage users." });
        }
        const passwordHash = await bcrypt.hash(input.password, 12);
        const newUser = await createAdminUser({
          username: input.username.toLowerCase().trim(),
          passwordHash,
          displayName: input.displayName ?? input.username,
          role: "owner",
        });
        // Auto-login: set session cookie immediately after setup
        const token = await signAdminToken({
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        });
        ctx.res.cookie(ADMIN_COOKIE, token, getAdminCookieOptions(ctx.req));
        return { success: true, token }; // Return token for localStorage storage
      }),

    /**
     * Owner: create a new admin user.
     */
    createAdmin: ownerProcedure
      .input(z.object({
        username: z.string().min(3).max(64).regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores, and hyphens"),
        password: z.string().min(8).max(128),
        displayName: z.string().max(128).optional(),
        role: z.enum(["owner", "admin"]).default("admin"),
      }))
      .mutation(async ({ input }) => {
        const existing = await getAdminUserByUsername(input.username.toLowerCase().trim());
        if (existing) {
          throw new TRPCError({ code: "CONFLICT", message: "Username already taken" });
        }
        const passwordHash = await bcrypt.hash(input.password, 12);
        await createAdminUser({
          username: input.username.toLowerCase().trim(),
          passwordHash,
          displayName: input.displayName ?? input.username,
          role: input.role,
        });
        return { success: true };
      }),

    /**
     * Owner: list all admin users (no passwords).
     */
    listAdmins: adminAuthedProcedure.query(async () => {
      return getAllAdminUsers();
    }),

    /**
     * Owner: delete an admin user (cannot delete yourself).
     */
    deleteAdmin: ownerProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input, ctx }) => {
        const session = (ctx as any).adminSession;
        if (input.id === session.id) {
          throw new TRPCError({ code: "BAD_REQUEST", message: "You cannot delete your own account" });
        }
        await deleteAdminUser(input.id);
        return { success: true };
      }),

    /**
     * Change own password.
     */
    changePassword: adminAuthedProcedure
      .input(z.object({
        currentPassword: z.string().min(1),
        newPassword: z.string().min(8).max(128),
      }))
      .mutation(async ({ input, ctx }) => {
        const session = (ctx as any).adminSession;
        const adminUser = await getAdminUserById(session.id);
        if (!adminUser) throw new TRPCError({ code: "NOT_FOUND", message: "Admin user not found" });
        const valid = await bcrypt.compare(input.currentPassword, adminUser.passwordHash);
        if (!valid) throw new TRPCError({ code: "UNAUTHORIZED", message: "Current password is incorrect" });
        const passwordHash = await bcrypt.hash(input.newPassword, 12);
        await updateAdminUserPassword(session.id, passwordHash);
        return { success: true };
      }),
  }),

  // ─── Leads ──────────────────────────────────────────────────────────────────
  leads: router({
    submitCall: publicProcedure
      .input(callSchema)
      .mutation(async ({ input }) => {
        await insertLead({ type: "call", name: input.name, email: input.email });
        await notifyOwner({
          title: `New Call Request — ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nType: Executive Call Request`,
        }).catch(() => {});
        await fireCrmWebhook({ type: "call_request", name: input.name, email: input.email });
        return { success: true };
      }),

    submitIntake: publicProcedure
      .input(intakeSchema)
      .mutation(async ({ input }) => {
        await insertLead({
          type: "intake",
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          industry: input.industry ?? null,
          engagementModel: input.engagementModel ?? null,
          annualRevenue: input.annualRevenue ?? null,
          message: input.message ?? null,
        });
        const lines = [
          `Name: ${input.name}`,
          `Email: ${input.email}`,
          input.company ? `Company: ${input.company}` : null,
          input.phone ? `Phone: ${input.phone}` : null,
          input.industry ? `Industry: ${input.industry}` : null,
          input.engagementModel ? `Engagement: ${input.engagementModel}` : null,
          input.annualRevenue ? `Revenue: ${input.annualRevenue}` : null,
          input.message ? `\nMessage:\n${input.message}` : null,
        ].filter(Boolean).join("\n");
        await notifyOwner({
          title: `New Structured Intake — ${input.name} (${input.company ?? "no company"})`,
          content: lines,
        }).catch(() => {});
        await fireCrmWebhook({
          type: "structured_intake",
          name: input.name,
          email: input.email,
          company: input.company ?? null,
          phone: input.phone ?? null,
          industry: input.industry ?? null,
          engagementModel: input.engagementModel ?? null,
          annualRevenue: input.annualRevenue ?? null,
          message: input.message ?? null,
        });
        return { success: true };
      }),

    list: adminAuthedProcedure.query(async () => {
      return getAllLeads();
    }),

    updateStatus: adminAuthedProcedure
      .input(z.object({
        id: z.number().int().positive(),
        status: z.enum(["new", "reviewed", "contacted", "closed"]),
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
