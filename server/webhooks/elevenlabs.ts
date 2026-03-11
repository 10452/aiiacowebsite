/**
 * ElevenLabs Post-Call Webhook Handler
 *
 * Endpoint: POST /api/webhooks/elevenlabs
 *
 * Receives post_call_transcription events from ElevenLabs after each call
 * to the AiiA Diagnostic Agent. Processes the transcript to:
 *   1. Extract caller info (email, name, company, phone, pain point, budget, track)
 *   2. Run LLM-powered conversation intelligence extraction (pain points, wants, current solutions, summary)
 *   3. Create or update a lead in the DB with full transcript + intelligence
 *   4. Send a track-specific follow-up email to the caller
 *   5. Send an owner notification with the call summary + extracted intelligence
 */

import type { Request, Response } from "express";
import { verifyElevenLabsSignature, parseCallWebhook, extractConversationIntelligence, type TrackType } from "../aiAgent";
import { insertLead, getLeadByEmail, updateLeadById } from "../db";
import { notifyOwner } from "../_core/notification";
import { sendEmail } from "../email";

const WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET ?? "";

// ── Track-specific email content ────────────────────────────────────────────

function getTrackEmail(track: TrackType, callerName: string | null): {
  subject: string;
  html: string;
  text: string;
} {
  const name = callerName ?? "there";

  const trackContent: Record<TrackType, { subject: string; html: string; text: string }> = {
    operator: {
      subject: "Your AiiACo Operator Program Overview",
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #03050A; color: #C8D7E6; padding: 40px 32px;">
        <div style="margin-bottom: 32px;">
          <img src="https://cdn.aiiaco.com/logo-gold.png" alt="AiiACo" style="height: 36px;" />
        </div>
        <h1 style="font-size: 24px; font-weight: 700; color: #B89C4A; margin: 0 0 16px;">The Operator Program</h1>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Hi ${name},</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Based on your diagnostic, you're a strong fit for the <strong style="color: #B89C4A;">AiiACo Operator Program</strong> — where we build, deploy, and manage your entire AI infrastructure end-to-end.</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">This is the same model powering companies like LRMB — fully managed, performance-oriented AI operations with zero internal overhead on your team.</p>
        <div style="background: rgba(184,156,74,0.08); border: 1px solid rgba(184,156,74,0.20); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="font-size: 13px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(184,156,74,0.75); margin: 0 0 12px;">What's included</p>
          <ul style="font-size: 14px; line-height: 1.8; color: rgba(200,215,230,0.80); margin: 0; padding-left: 20px;">
            <li>Full AI infrastructure design and deployment</li>
            <li>Dedicated AiiACo operations team</li>
            <li>Monthly performance reporting</li>
            <li>Ongoing optimization and expansion</li>
          </ul>
        </div>
        <a href="https://aiiaco.com/upgrade" style="display: inline-block; background: #B89C4A; color: #03050A; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 8px 0 24px;">Book Your Strategy Call →</a>
        <p style="font-size: 13px; color: rgba(200,215,230,0.45); margin: 24px 0 0; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px;">AiiACo · AI Integration Authority for the Corporate Age · <a href="https://aiiaco.com" style="color: rgba(184,156,74,0.65);">aiiaco.com</a></p>
      </div>`,
      text: `Hi ${name},\n\nBased on your diagnostic, you're a strong fit for the AiiACo Operator Program — fully managed AI infrastructure, end-to-end.\n\nBook your strategy call: https://aiiaco.com/upgrade\n\nAiiACo · aiiaco.com`,
    },
    agent: {
      subject: "Your AiiACo Agent Program Overview",
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #03050A; color: #C8D7E6; padding: 40px 32px;">
        <div style="margin-bottom: 32px;">
          <img src="https://cdn.aiiaco.com/logo-gold.png" alt="AiiACo" style="height: 36px;" />
        </div>
        <h1 style="font-size: 24px; font-weight: 700; color: #B89C4A; margin: 0 0 16px;">The Agent Program</h1>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Hi ${name},</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Based on your diagnostic, the <strong style="color: #B89C4A;">AiiACo Agent Program</strong> is built for operators like you — powerful AI tools you control, without the enterprise overhead.</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">This is the model powering solo practitioners and small teams — like Stephanie in real estate — who want to run faster without hiring more people.</p>
        <div style="background: rgba(184,156,74,0.08); border: 1px solid rgba(184,156,74,0.20); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="font-size: 13px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(184,156,74,0.75); margin: 0 0 12px;">What's included</p>
          <ul style="font-size: 14px; line-height: 1.8; color: rgba(200,215,230,0.80); margin: 0; padding-left: 20px;">
            <li>AI tools configured for your specific workflow</li>
            <li>Onboarding and setup support</li>
            <li>Monthly check-ins and optimizations</li>
            <li>Access to the AiiACo agent toolkit</li>
          </ul>
        </div>
        <a href="https://aiiaco.com/upgrade" style="display: inline-block; background: #B89C4A; color: #03050A; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 8px 0 24px;">Book Your Strategy Call →</a>
        <p style="font-size: 13px; color: rgba(200,215,230,0.45); margin: 24px 0 0; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px;">AiiACo · AI Integration Authority for the Corporate Age · <a href="https://aiiaco.com" style="color: rgba(184,156,74,0.65);">aiiaco.com</a></p>
      </div>`,
      text: `Hi ${name},\n\nBased on your diagnostic, the AiiACo Agent Program is built for operators like you.\n\nBook your strategy call: https://aiiaco.com/upgrade\n\nAiiACo · aiiaco.com`,
    },
    corporate: {
      subject: "Your AiiACo Corporate Program Overview",
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #03050A; color: #C8D7E6; padding: 40px 32px;">
        <div style="margin-bottom: 32px;">
          <img src="https://cdn.aiiaco.com/logo-gold.png" alt="AiiACo" style="height: 36px;" />
        </div>
        <h1 style="font-size: 24px; font-weight: 700; color: #B89C4A; margin: 0 0 16px;">The Corporate Program</h1>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Hi ${name},</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Based on your diagnostic, you're a fit for the <strong style="color: #B89C4A;">AiiACo Corporate Program</strong> — enterprise-level AI implementation delivered in modular, bite-sized packages.</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">We start with a deep diagnostic, build a custom implementation roadmap, and deploy in phases — so you see results at every stage without betting the whole company on a single initiative.</p>
        <div style="background: rgba(184,156,74,0.08); border: 1px solid rgba(184,156,74,0.20); border-radius: 12px; padding: 24px; margin: 24px 0;">
          <p style="font-size: 13px; font-weight: 700; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(184,156,74,0.75); margin: 0 0 12px;">Implementation phases</p>
          <ul style="font-size: 14px; line-height: 1.8; color: rgba(200,215,230,0.80); margin: 0; padding-left: 20px;">
            <li>Phase 1: Cold Email Agent</li>
            <li>Phase 2: SDR Agent + Website + AI Receptionist</li>
            <li>Phase 3: Full Agent &amp; Operator Packages</li>
            <li>Phase 4+: Paid Ads, Podcast, Social Media Management</li>
          </ul>
        </div>
        <a href="https://aiiaco.com/upgrade" style="display: inline-block; background: #B89C4A; color: #03050A; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 8px 0 24px;">Book Your Strategy Call →</a>
        <p style="font-size: 13px; color: rgba(200,215,230,0.45); margin: 24px 0 0; border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px;">AiiACo · AI Integration Authority for the Corporate Age · <a href="https://aiiaco.com" style="color: rgba(184,156,74,0.65);">aiiaco.com</a></p>
      </div>`,
      text: `Hi ${name},\n\nBased on your diagnostic, the AiiACo Corporate Program is the right fit — enterprise AI in modular phases.\n\nBook your strategy call: https://aiiaco.com/upgrade\n\nAiiACo · aiiaco.com`,
    },
    unknown: {
      subject: "Thank you for calling AiiACo",
      html: `<div style="font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #03050A; color: #C8D7E6; padding: 40px 32px;">
        <h1 style="font-size: 24px; font-weight: 700; color: #B89C4A; margin: 0 0 16px;">Thanks for calling AiiACo</h1>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Hi ${name},</p>
        <p style="font-size: 15px; line-height: 1.7; color: rgba(200,215,230,0.85); margin: 0 0 20px;">Our team will be in touch shortly to follow up on your inquiry.</p>
        <a href="https://aiiaco.com/upgrade" style="display: inline-block; background: #B89C4A; color: #03050A; font-weight: 700; font-size: 14px; padding: 14px 28px; border-radius: 8px; text-decoration: none; margin: 8px 0 24px;">Visit AiiACo →</a>
      </div>`,
      text: `Hi ${name},\n\nThank you for calling AiiACo. Our team will be in touch shortly.\n\nhttps://aiiaco.com`,
    },
  };

  return trackContent[track] ?? trackContent.unknown;
}

// ── Webhook handler ──────────────────────────────────────────────────────────

export async function handleElevenLabsWebhook(req: Request, res: Response): Promise<void> {
  const rawBody: string = (req as any).rawBodyText ?? JSON.stringify(req.body);
  const signatureHeader = req.headers["elevenlabs-signature"] as string | undefined;

  if (!verifyElevenLabsSignature(rawBody, signatureHeader, WEBHOOK_SECRET)) {
    console.warn("[ElevenLabsWebhook] Signature verification failed");
    res.status(401).json({ error: "Invalid signature" });
    return;
  }

  const eventType: string = (req.body as Record<string, unknown>)?.type as string ?? "";

  // Only process transcription events
  if (eventType !== "post_call_transcription") {
    res.status(200).json({ received: true, processed: false, reason: "event_type_ignored" });
    return;
  }

  try {
    const summary = parseCallWebhook(req.body as Record<string, unknown>);

    console.log(`[ElevenLabsWebhook] Call ${summary.conversationId} — track: ${summary.track}, email: ${summary.callerEmail ?? "none"}, duration: ${summary.durationSeconds}s`);

    // ── Extract conversation intelligence via LLM ───────────────────────────
    const intelligence = await extractConversationIntelligence(summary.transcriptText);
    console.log(`[ElevenLabsWebhook] Intelligence extracted: ${intelligence.painPoints.length} pain points, ${intelligence.wants.length} wants, ${intelligence.currentSolutions.length} current solutions`);

    // Use LLM-extracted contact info as fallback/override for regex-extracted data
    const callerEmail = summary.callerEmail ?? intelligence.callerEmail;
    const callerName = summary.callerName ?? intelligence.callerName;
    const companyName = summary.companyName ?? intelligence.companyName;
    const callerPhone = summary.callerPhone ?? intelligence.callerPhone;

    // ── Save lead to DB ────────────────────────────────────────────────────
    let leadId: number | null = null;

    // Shared intelligence fields for DB storage
    const intelligenceFields = {
      painPoints: intelligence.painPoints.length > 0 ? JSON.stringify(intelligence.painPoints) : null,
      wants: intelligence.wants.length > 0 ? JSON.stringify(intelligence.wants) : null,
      currentSolutions: intelligence.currentSolutions.length > 0 ? JSON.stringify(intelligence.currentSolutions) : null,
      conversationSummary: intelligence.conversationSummary !== "Transcript analysis unavailable." ? intelligence.conversationSummary : null,
      callDurationSeconds: summary.durationSeconds || null,
      conversationId: summary.conversationId || null,
    };

    if (callerEmail) {
      // Check if lead already exists (e.g. from a form submission)
      const existing = await getLeadByEmail(callerEmail);

      if (existing) {
        // Update existing lead with call data + intelligence
        await updateLeadById(existing.id, {
          name: callerName ?? existing.name,
          company: companyName ?? existing.company ?? undefined,
          phone: callerPhone ?? existing.phone ?? undefined,
          adminNotes: [
            existing.adminNotes,
            `📞 AI Call (${summary.conversationId}): Track → ${summary.track}${summary.painPoint ? ` | Pain: ${summary.painPoint}` : ""}${summary.budgetSignal ? ` | Budget: ${summary.budgetSignal}` : ""}`,
          ].filter(Boolean).join("\n\n"),
          callTranscript: summary.transcriptText ?? undefined,
          callTrack: summary.track,
          ...intelligenceFields,
          status: existing.status === "new" ? "diagnostic_ready" : existing.status,
        });
        leadId = existing.id;
      } else {
        // Create new lead from call
        const result = await insertLead({
          type: "call",
          name: callerName ?? "Phone Caller",
          email: callerEmail,
          company: companyName ?? undefined,
          phone: callerPhone ?? undefined,
          message: summary.painPoint ?? undefined,
          budgetRange: summary.budgetSignal ?? undefined,
          leadSource: `AI Phone Call — ${summary.track} track`,
          callTranscript: summary.transcriptText ?? undefined,
          callTrack: summary.track,
          ...intelligenceFields,
          status: "diagnostic_ready",
        });
        leadId = result.insertId;
      }
    }

    // ── Send follow-up email to caller ─────────────────────────────────────
    if (callerEmail) {
      const emailContent = getTrackEmail(summary.track, callerName);
      try {
        await sendEmail({
          to: callerEmail,
          subject: emailContent.subject,
          html: emailContent.html,
          text: emailContent.text,
        });
        console.log(`[ElevenLabsWebhook] Follow-up email sent to ${callerEmail}`);
      } catch (emailErr) {
        console.error("[ElevenLabsWebhook] Failed to send follow-up email:", emailErr);
      }
    }

    // ── Notify owner (with intelligence summary) ───────────────────────────
    const trackLabel = summary.track === "unknown" ? "Unrouted" : summary.track.charAt(0).toUpperCase() + summary.track.slice(1);
    await notifyOwner({
      title: `📞 AI CALL — ${trackLabel} Track${callerName ? ` | ${callerName}` : ""}${companyName ? ` @ ${companyName}` : ""}`,
      content: [
        `Conversation ID: ${summary.conversationId}`,
        `Duration: ${summary.durationSeconds}s`,
        `Track: ${trackLabel}`,
        callerEmail ? `Email: ${callerEmail}` : null,
        callerPhone ? `Phone: ${callerPhone}` : null,
        summary.painPoint ? `Pain point: ${summary.painPoint}` : null,
        summary.budgetSignal ? `Budget signal: ${summary.budgetSignal}` : null,
        intelligence.conversationSummary !== "Transcript analysis unavailable." ? `\nSUMMARY\n${intelligence.conversationSummary}` : null,
        intelligence.painPoints.length > 0 ? `\nPAIN POINTS\n${intelligence.painPoints.map(p => `• ${p}`).join("\n")}` : null,
        intelligence.wants.length > 0 ? `\nWANTS & WISHES\n${intelligence.wants.map(w => `• ${w}`).join("\n")}` : null,
        intelligence.currentSolutions.length > 0 ? `\nCURRENT SOLUTIONS\n${intelligence.currentSolutions.map(s => `• ${s}`).join("\n")}` : null,
        leadId ? `\nLead #${leadId} saved to pipeline` : "No email captured — lead not saved",
      ].filter(Boolean).join("\n"),
    });

    res.status(200).json({ received: true, processed: true, leadId });
  } catch (err) {
    console.error("[ElevenLabsWebhook] Error processing webhook:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
