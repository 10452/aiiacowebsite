import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { insertLead, getAllLeads, updateLeadStatus } from "./db";
import { notifyOwner } from "./_core/notification";
import { ENV } from "./_core/env";

// ─── CRM Webhook Helper ───────────────────────────────────────────────────────
/**
 * Fire-and-forget POST to the configured CRM webhook URL (Zapier / Make.com).
 * Non-fatal: if the webhook is not configured or fails, the lead is still saved.
 */
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

  leads: router({
    /**
     * Fast-path: Executive Call Request (name + email only).
     * Public — no auth required.
     */
    submitCall: publicProcedure
      .input(callSchema)
      .mutation(async ({ input }) => {
        await insertLead({ type: "call", name: input.name, email: input.email });

        // Notify owner via Manus notification system
        await notifyOwner({
          title: `New Call Request — ${input.name}`,
          content: `Name: ${input.name}\nEmail: ${input.email}\nType: Executive Call Request`,
        }).catch(() => {/* non-fatal */});

        // Fire CRM webhook (non-fatal)
        await fireCrmWebhook({ type: "call_request", name: input.name, email: input.email });

        return { success: true };
      }),

    /**
     * Full structured intake form.
     * Public — no auth required.
     */
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

        // Notify owner
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
        }).catch(() => {/* non-fatal */});

        // Fire CRM webhook (non-fatal)
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
     * Admin: list all leads ordered by newest first.
     * Protected — requires authentication.
     */
    list: protectedProcedure.query(async () => {
      return getAllLeads();
    }),

    /**
     * Admin: update lead status.
     */
    updateStatus: protectedProcedure
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
