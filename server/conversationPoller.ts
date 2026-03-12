/**
 * Conversation Poller — Fallback Safety Net
 *
 * Polls the ElevenLabs conversations API every 5 minutes to catch any calls
 * that the webhook missed (due to HMAC failures, network issues, downtime, etc.)
 *
 * RULE: No call is ever lost. If the webhook fails, the poller catches it.
 */

import { parseCallWebhook, extractConversationIntelligence } from "./aiAgent";
import { getTrackEmail } from "./trackEmails";
import { insertLead, getLeadByEmail, updateLeadById, updateLeadEmailStatus, getDb } from "./db";
import { notifyOwner } from "./_core/notification";
import { sendEmail } from "./email";
import { leads } from "../drizzle/schema";
import { sql } from "drizzle-orm";

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY ?? "";
const ELEVENLABS_AGENT_ID = process.env.ELEVENLABS_AGENT_ID ?? "";
const POLL_INTERVAL_MS = 5 * 60 * 1000; // 5 minutes
const INITIAL_DELAY_MS = 60 * 1000; // 1 minute after startup

interface ElevenLabsConversation {
  conversation_id: string;
  agent_id: string;
  status: string;
  start_time_unix_secs?: number;
  call_duration_secs?: number;
}

interface ElevenLabsConversationDetail {
  conversation_id: string;
  agent_id: string;
  status: string;
  transcript: Array<{ role: string; message: string; time_in_call_secs?: number }>;
  metadata?: Record<string, unknown>;
  analysis?: Record<string, unknown>;
}

// ── Fetch recent conversations from ElevenLabs API ─────────────────────────

async function fetchRecentConversations(): Promise<ElevenLabsConversation[]> {
  if (!ELEVENLABS_API_KEY || !ELEVENLABS_AGENT_ID) {
    console.warn("[ConversationPoller] Missing API key or agent ID");
    return [];
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations?agent_id=${ELEVENLABS_AGENT_ID}&page_size=20`,
      { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
    );
    if (!res.ok) {
      console.error(`[ConversationPoller] Failed to fetch conversations: ${res.status}`);
      return [];
    }
    const data = (await res.json()) as { conversations?: ElevenLabsConversation[] };
    return data.conversations ?? [];
  } catch (err) {
    console.error("[ConversationPoller] Error fetching conversations:", err);
    return [];
  }
}

async function fetchConversationDetail(conversationId: string): Promise<ElevenLabsConversationDetail | null> {
  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${conversationId}`,
      { headers: { "xi-api-key": ELEVENLABS_API_KEY } }
    );
    if (!res.ok) {
      console.error(`[ConversationPoller] Failed to fetch conversation ${conversationId}: ${res.status}`);
      return null;
    }
    return (await res.json()) as ElevenLabsConversationDetail;
  } catch (err) {
    console.error(`[ConversationPoller] Error fetching conversation ${conversationId}:`, err);
    return null;
  }
}

// ── Check if a conversation is already captured in our DB ──────────────────

async function isConversationCaptured(conversationId: string): Promise<boolean> {
  try {
    const db = await getDb();
    if (!db) return false;
    const rows = await db
      .select({ id: leads.id })
      .from(leads)
      .where(sql`${leads.conversationId} = ${conversationId}`)
      .limit(1);
    return rows.length > 0;
  } catch {
    return false;
  }
}

// ── Process a missed conversation ──────────────────────────────────────────

async function processMissedConversation(detail: ElevenLabsConversationDetail): Promise<void> {
  console.log(`[ConversationPoller] Processing missed conversation ${detail.conversation_id}`);

  // Build a webhook-like payload so we can reuse parseCallWebhook
  const webhookPayload = {
    type: "post_call_transcription",
    data: {
      conversation_id: detail.conversation_id,
      agent_id: detail.agent_id,
      transcript: detail.transcript,
      metadata: detail.metadata ?? {},
      analysis: detail.analysis ?? {},
    },
  };

  try {
    const summary = parseCallWebhook(webhookPayload);

    // Extract intelligence
    const intelligence = await extractConversationIntelligence(summary.transcriptText);

    const callerEmail = summary.callerEmail ?? intelligence.callerEmail;
    const callerName = summary.callerName ?? intelligence.callerName;
    const companyName = summary.companyName ?? intelligence.companyName;
    const callerPhone = summary.callerPhone ?? intelligence.callerPhone;

    const structuredTranscriptJson = summary.structuredTranscript.length > 0
      ? JSON.stringify(summary.structuredTranscript)
      : null;
    const intelligenceFields = {
      painPoints: intelligence.painPoints.length > 0 ? JSON.stringify(intelligence.painPoints) : null,
      wants: intelligence.wants.length > 0 ? JSON.stringify(intelligence.wants) : null,
      currentSolutions: intelligence.currentSolutions.length > 0 ? JSON.stringify(intelligence.currentSolutions) : null,
      conversationSummary: intelligence.conversationSummary || null,
      structuredTranscript: structuredTranscriptJson,
      callDurationSeconds: summary.durationSeconds ?? null,
      conversationId: summary.conversationId ?? null,
    };

    // Check if lead already exists by email
    let leadId: number | null = null;
    if (callerEmail) {
      const existing = await getLeadByEmail(callerEmail);
      if (existing) {
        leadId = existing.id;
        await updateLeadById(existing.id, {
          callTranscript: summary.transcriptText,
          ...intelligenceFields,
          phone: callerPhone ?? existing.phone,
          name: callerName ?? existing.name,
          company: companyName ?? existing.company,
        });
        console.log(`[ConversationPoller] Updated existing lead ${existing.id} with missed call data`);
      }
    }

    if (!leadId) {
      try {
        const emailForLead = callerEmail ?? `voice-${summary.conversationId}@aiiaco.com`;
        const result = await insertLead({
          type: "call",
          email: emailForLead,
          name: callerName ?? "Voice Caller",
          company: companyName ?? undefined,
          phone: callerPhone ?? undefined,
          callTrack: summary.track,
          leadSource: "voice",
          status: "new",
          callTranscript: summary.transcriptText,
          ...intelligenceFields,
        });
        leadId = result.insertId;
        console.log(`[ConversationPoller] Created new lead ${leadId} from missed call`);
      } catch (insertErr) {
        console.error("[ConversationPoller] Failed to insert lead:", insertErr);
      }
    }

    // Send follow-up email if we have an email
    if (callerEmail && !callerEmail.includes("@aiiaco.com") && leadId) {
      try {
        const trackEmail = getTrackEmail(summary.track, callerName);
        const emailSent = await sendEmail({
          to: callerEmail,
          subject: trackEmail.subject,
          html: trackEmail.html,
          text: trackEmail.text,
        });
        await updateLeadEmailStatus(leadId, emailSent ? "sent" : "failed");
        console.log(`[ConversationPoller] Follow-up email ${emailSent ? "sent" : "FAILED"} to ${callerEmail}`);
      } catch (emailErr) {
        console.error(`[ConversationPoller] Failed to send follow-up email:`, emailErr);
        if (leadId) await updateLeadEmailStatus(leadId, "failed").catch(() => {});
      }
    } else if (leadId && (!callerEmail || callerEmail.includes("@aiiaco.com"))) {
      await updateLeadEmailStatus(leadId, "not_applicable").catch(() => {});
    }

    // Notify owner
    try {
      const summaryLines = [
        `📞 **Recovered Missed Call** (via poller)`,
        `Caller: ${callerName ?? "Unknown"} (${callerEmail ?? "no email"})`,
        `Company: ${companyName ?? "Unknown"}`,
        `Track: ${summary.track}`,
        `Duration: ${summary.durationSeconds ?? 0}s`,
        intelligence.conversationSummary ? `\nSummary: ${intelligence.conversationSummary}` : "",
      ].filter(Boolean).join("\n");

      await notifyOwner({
        title: `🔄 Recovered Call: ${callerName ?? callerEmail ?? "Unknown"}`,
        content: summaryLines,
      });
    } catch (notifyErr) {
      console.error(`[ConversationPoller] Failed to notify owner:`, notifyErr);
    }

    console.log(`[ConversationPoller] ✅ Successfully recovered conversation ${detail.conversation_id}`);
  } catch (err) {
    console.error(`[ConversationPoller] Failed to process conversation ${detail.conversation_id}:`, err);
  }
}

// ── Main poll loop ─────────────────────────────────────────────────────────

async function pollForMissedCalls(): Promise<void> {
  console.log("[ConversationPoller] Checking for missed calls...");

  try {
    const conversations = await fetchRecentConversations();
    const completedCalls = conversations.filter(
      (c) => c.status === "done" && c.agent_id === ELEVENLABS_AGENT_ID
    );

    let recovered = 0;
    for (const call of completedCalls) {
      const alreadyCaptured = await isConversationCaptured(call.conversation_id);
      if (alreadyCaptured) continue;

      // This is a missed call — fetch full details and process
      const detail = await fetchConversationDetail(call.conversation_id);
      if (!detail || !detail.transcript || detail.transcript.length === 0) continue;

      await processMissedConversation(detail);
      recovered++;

      // Small delay between processing to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    if (recovered > 0) {
      console.log(`[ConversationPoller] ✅ Recovered ${recovered} missed call(s)`);
    } else {
      console.log("[ConversationPoller] No missed calls found");
    }
  } catch (err) {
    console.error("[ConversationPoller] Poll error:", err);
  }
}

// ── Scheduler ──────────────────────────────────────────────────────────────

let pollTimer: ReturnType<typeof setInterval> | null = null;

export function startConversationPoller(): void {
  console.log(`[ConversationPoller] Starting — initial check in ${INITIAL_DELAY_MS / 1000}s, then every ${POLL_INTERVAL_MS / 1000 / 60} minutes`);

  // Initial check after delay
  setTimeout(() => {
    pollForMissedCalls();

    // Then poll on interval
    pollTimer = setInterval(pollForMissedCalls, POLL_INTERVAL_MS);
  }, INITIAL_DELAY_MS);
}

export function stopConversationPoller(): void {
  if (pollTimer) {
    clearInterval(pollTimer);
    pollTimer = null;
    console.log("[ConversationPoller] Stopped");
  }
}

// Export for manual triggering from admin
export { pollForMissedCalls };
