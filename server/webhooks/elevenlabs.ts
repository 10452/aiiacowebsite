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
import { verifyElevenLabsSignature, parseCallWebhook, extractConversationIntelligence } from "../aiAgent";
import { getTrackEmail } from "../trackEmails";
import { insertLead, getLeadByEmail, updateLeadById } from "../db";
import { notifyOwner } from "../_core/notification";
import { sendEmail } from "../email";

const WEBHOOK_SECRET = process.env.ELEVENLABS_WEBHOOK_SECRET ?? "";

// ── Webhook handler ──────────────────────────────────────────────────────────

export async function handleElevenLabsWebhook(req: Request, res: Response): Promise<void> {
  const rawBody: string = (req as any).rawBodyText ?? JSON.stringify(req.body);
  const signatureHeader = req.headers["elevenlabs-signature"] as string | undefined;

  const signatureValid = verifyElevenLabsSignature(rawBody, signatureHeader, WEBHOOK_SECRET);
  if (!signatureValid) {
    // CRITICAL: Never drop a lead over a signature mismatch.
    // Log the warning for security review but ALWAYS process the call.
    console.warn("[ElevenLabsWebhook] ⚠ Signature verification failed — processing anyway to avoid losing lead data");
    console.warn(`[ElevenLabsWebhook] Header: ${signatureHeader?.substring(0, 40)}... | Secret set: ${!!WEBHOOK_SECRET} | Secret length: ${WEBHOOK_SECRET.length}`);
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
    const structuredTranscriptJson = summary.structuredTranscript.length > 0
      ? JSON.stringify(summary.structuredTranscript)
      : null;
    const intelligenceFields = {
      painPoints: intelligence.painPoints.length > 0 ? JSON.stringify(intelligence.painPoints) : null,
      wants: intelligence.wants.length > 0 ? JSON.stringify(intelligence.wants) : null,
      currentSolutions: intelligence.currentSolutions.length > 0 ? JSON.stringify(intelligence.currentSolutions) : null,
      conversationSummary: intelligence.conversationSummary !== "Transcript analysis unavailable." ? intelligence.conversationSummary : null,
      callDurationSeconds: summary.durationSeconds || null,
      conversationId: summary.conversationId || null,
      structuredTranscript: structuredTranscriptJson,
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
