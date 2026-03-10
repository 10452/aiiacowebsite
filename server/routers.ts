import { z } from "zod";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions, isSecureRequest } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import {
  insertLead, getAllLeads, updateLeadStatus, updateLeadById, getLeadById,
  getAdminUserByUsername, getAdminUserById, getAllAdminUsers,
  createAdminUser, deleteAdminUser, updateAdminUserPassword, countAdminUsers,
} from "./db";
import { generateAndSendLeadDiagnostic } from "./leadDiagnostic";
import { sendLeadConfirmationEmail } from "./email";
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
  message: z.string().max(2000).optional(),
  investmentType: z.string().max(64).optional(),
  budgetRange: z.string().max(64).optional(),
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

// New 3-step qualifier schemas
const qualifierStep1Schema = z.object({
  name: z.string().min(1).max(255),
  company: z.string().min(1).max(255),
  email: z.string().email().max(320),
  phone: z.string().max(64).optional(),
  source: z.string().max(128).optional(),
});

const qualifierStep2Schema = z.object({
  leadId: z.number().int().positive(),
  problemCategory: z.string().max(255),
  problemDetail: z.string().max(5000).optional(),
});

const qualifierStep3Schema = z.object({
  leadId: z.number().int().positive(),
  callPreference: z.string().max(128),
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

  // ─── Text-to-Speech (ElevenLabs) ────────────────────────────────────────────
  tts: router({
    /**
     * Synthesize text using ElevenLabs Rachel voice.
     * Returns base64-encoded MP3 audio.
     * Rate-limited to 3000 chars per request to control API usage.
     */
    synthesize: publicProcedure
      .input(z.object({
        text: z.string().min(1).max(3000),
      }))
      .mutation(async ({ input }) => {
        const apiKey = ENV.elevenLabsApiKey;
        if (!apiKey) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "TTS not configured" });

        // Rachel voice ID — warm, authoritative, American
        const VOICE_ID = "21m00Tcm4TlvDq8ikWAM";

        // ── Sanitize text for natural speech ──────────────────────────────────
        // Preserve URLs (don't strip dots inside them), then clean everything else
        const sanitized = input.text
          // Fix brand name pronunciation FIRST (before any other transforms)
          // "AiiACo" → "AiiA Co" so ElevenLabs reads it as two words: AyyA + Co
          .replace(/AiiACo/gi, "AiiA Co")
          // "AiiAco" → "AiiA Co"
          .replace(/AiiAco/gi, "AiiA Co")
          // Protect URLs: temporarily replace dots inside URLs
          .replace(/https?:\/\/[^\s]+/g, (url) => url.replace(/\./g, "__DOT__"))
          // Remove bullet/list symbols
          .replace(/[•·▪▸►→✓✔★☆]/g, " ")
          // Remove standalone dots (e.g. nav labels like "Platform. Method.")
          .replace(/(?<![\w])\.(?![\w])/g, " ")
          // Remove other non-speech punctuation that TTS reads literally
          .replace(/[|\\^~`<>{}\[\]]/g, " ")
          // Remove excessive dashes used as decorators (not hyphens in words)
          .replace(/\s[-–—]{1,3}\s/g, ", ")
          // Remove repeated punctuation
          .replace(/([!?]){2,}/g, "$1")
          // Restore URL dots
          .replace(/__DOT__/g, ".")
          // Collapse multiple spaces
          .replace(/\s{2,}/g, " ")
          .trim();

        const response = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
          {
            method: "POST",
            headers: {
              "xi-api-key": apiKey,
              "Content-Type": "application/json",
              "Accept": "audio/mpeg",
            },
            body: JSON.stringify({
              text: sanitized,
              model_id: "eleven_multilingual_v2",  // Better prosody and naturalness than turbo
              voice_settings: {
                stability: 0.30,          // Lower = more expressive, less monotone
                similarity_boost: 0.75,   // Keeps Rachel's character
                style: 0.40,              // Higher style = more personality and wit
                use_speaker_boost: true,
              },
            }),
          }
        );

        if (!response.ok) {
          const err = await response.text();
          console.error("[ElevenLabs TTS Error]", err);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Voice synthesis failed" });
        }

        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return { audio: base64, mimeType: "audio/mpeg" };
      }),
  }),

  // ─── Leads ──────────────────────────────────────────────────────────────────
  leads: router({
    submitCall: publicProcedure
      .input(callSchema)
      .mutation(async ({ input }) => {
        await insertLead({
          type: "call",
          name: input.name,
          email: input.email,
          message: input.message ?? null,
          investmentType: input.investmentType ?? null,
          budgetRange: input.budgetRange ?? null,
        });
        await notifyOwner({
          title: `New Call Request — ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nInvestment Type: ${input.investmentType ?? 'Not specified'}\nBudget Range: ${input.budgetRange ?? 'Not specified'}\nType: Executive Call Request`,
        }).catch(() => {});
        await fireCrmWebhook({ type: "call_request", name: input.name, email: input.email, investmentType: input.investmentType, budgetRange: input.budgetRange });
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

    /**
     * Step 1: Save name + company + email + phone immediately.
     * Returns leadId for subsequent steps.
     */
    qualifierStep1: publicProcedure
      .input(qualifierStep1Schema)
      .mutation(async ({ input }) => {
        const result = await insertLead({
          type: "intake",
          name: input.name,
          company: input.company,
          email: input.email,
          phone: input.phone ?? null,
          leadSource: input.source ?? "Direct",
        });
        const leadId = result.insertId;
        // Notify + CRM immediately on first capture
        await notifyOwner({
          title: `New Lead Started — ${input.name} (${input.company})`,
          content: `Name: ${input.name}\nCompany: ${input.company}\nEmail: ${input.email}\nPhone: ${input.phone ?? 'Not provided'}\nSource: ${input.source ?? 'Direct'}\nStatus: Step 1 captured`,
        }).catch(() => {});
        await fireCrmWebhook({
          type: "qualifier_step1",
          name: input.name,
          company: input.company,
          email: input.email,
          phone: input.phone ?? null,
          leadSource: input.source ?? "Direct",
        });
        return { success: true, leadId };
      }),

    /**
     * Step 2: Update lead with problem category + detail.
     */
    qualifierStep2: publicProcedure
      .input(qualifierStep2Schema)
      .mutation(async ({ input }) => {
        await updateLeadById(input.leadId, {
          problemCategory: input.problemCategory,
          problemDetail: input.problemDetail ?? null,
        });
        await fireCrmWebhook({
          type: "qualifier_step2",
          leadId: input.leadId,
          problemCategory: input.problemCategory,
          problemDetail: input.problemDetail ?? null,
        });
        return { success: true };
      }),

    /**
     * Step 3: Update lead with call preference. Sends full notification.
     */
    qualifierStep3: publicProcedure
      .input(qualifierStep3Schema)
      .mutation(async ({ input }) => {
        await updateLeadById(input.leadId, {
          callPreference: input.callPreference,
        });
        await fireCrmWebhook({
          type: "qualifier_complete",
          leadId: input.leadId,
          callPreference: input.callPreference,
        });
        // Fire confirmation email to lead + AI diagnostic to owner (both non-blocking)
        getLeadById(input.leadId)
          .then((lead) => {
            if (lead) {
              // 1. Send thank-you confirmation to the lead (no diagnostic content)
              sendLeadConfirmationEmail({
                name: lead.name,
                email: lead.email,
                company: lead.company,
                callPreference: lead.callPreference,
              }).catch((err) => console.error("[Email] Confirmation error:", err));

              // 2. Send full AI diagnostic exclusively to the owner
              generateAndSendLeadDiagnostic(lead).catch((err) =>
                console.error("[LeadDiagnostic] Background error:", err)
              );
            }
          })
          .catch((err) => console.error("[LeadDiagnostic] getLeadById error:", err));
        return { success: true };
      }),

    list: adminAuthedProcedure.query(async () => {
      return getAllLeads();
    }),

    /**
     * Re-run the AI diagnostic for an existing lead.
     * Regenerates the GPT-4o diagnostic, updates the DB, and re-sends the owner notification.
     * Does NOT re-send the lead confirmation email (to avoid spamming the lead).
     */
    rerunDiagnostic: adminAuthedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ input }) => {
        const lead = await getLeadById(input.id);
        if (!lead) throw new TRPCError({ code: "NOT_FOUND", message: "Lead not found" });
        await generateAndSendLeadDiagnostic(lead);
        return { success: true };
      }),

    updateStatus: adminAuthedProcedure
      .input(z.object({
        id: z.number().int().positive(),
        status: z.enum(["new", "diagnostic_ready", "reviewed", "contacted", "closed"]),
      }))
      .mutation(async ({ input }) => {
        await updateLeadStatus(input.id, input.status);
        return { success: true };
      }),

    /**
     * Save admin-only internal notes for a lead.
     * Notes are free-text and stored in the adminNotes column.
     */
    saveNotes: adminAuthedProcedure
      .input(z.object({
        id: z.number().int().positive(),
        notes: z.string().max(10000),
      }))
      .mutation(async ({ input }) => {
        await updateLeadById(input.id, { adminNotes: input.notes });
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
