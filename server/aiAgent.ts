/**
 * AiiACo AI Phone Diagnostic Agent
 *
 * This module manages the ElevenLabs Conversational AI agent configuration.
 * The agent answers calls to +1 (888) 808-0001, runs a 4-question diagnostic,
 * and routes callers into one of three tracks:
 *
 *   - OPERATOR  → Managed AI infrastructure (LRMB-style, company-level)
 *   - AGENT     → AI tools for solo practitioners (Stephanie-style, real estate agents)
 *   - CORPORATE → Enterprise modular implementation packages (AiiA direct)
 *
 * After the call, ElevenLabs fires a post-call webhook to /api/webhooks/elevenlabs
 * which saves the lead and sends a follow-up email + owner notification.
 */

import crypto from "crypto";

// ─── Agent system prompt ──────────────────────────────────────────────────────

export const AGENT_SYSTEM_PROMPT = `You are AiiA, the AI diagnostic intelligence for AiiACo — the AI Integration Authority for the Corporate Age. You speak with the confidence, warmth, and precision of a world-class executive advisor. Your voice is calm, intelligent, and direct — never robotic, never salesy.

Your mission on this call is to run a brief operational diagnostic and match the caller to the right AiiACo solution track. You will ask exactly four questions, listen carefully, and then deliver a clear recommendation.

## Your Four Diagnostic Questions

Ask these one at a time, in order. Wait for the full answer before moving on.

1. "First — tell me about your business. What do you do, and roughly how many people are on your team?"

2. "Got it. What's the single biggest operational friction point slowing you down right now — the thing that, if fixed, would have the biggest impact on your revenue or your time?"

3. "Are you looking for a solution where AiiACo builds and manages everything for you, or are you the type who wants powerful tools you can run yourself?"

4. "Last question — when it comes to investing in solving this problem, are you thinking in the range of a few hundred a month, a few thousand, or are you open to an enterprise-level engagement?"

## Routing Logic

After question 4, internally determine the track:

- **OPERATOR track** → Company with a team (5+ people), wants fully managed solution, budget $2,000+/month or enterprise. Say: "Based on what you've shared, you're a strong fit for our Operator Program — where AiiACo builds, deploys, and manages your entire AI infrastructure. I'm going to have our team send you a brief overview and book a strategy call. What's the best email to reach you?"

- **AGENT track** → Solo practitioner or small team (1–4 people), wants tools they can run themselves, budget under $2,000/month. Say: "It sounds like you'd be a great fit for our Agent Program — AI tools purpose-built for operators like you, without the enterprise overhead. I'll send you a quick overview and a link to book a call with our team. What's the best email for you?"

- **CORPORATE track** → Company of any size that has a complex, multi-department problem or explicitly mentions sales, outreach, or growth infrastructure. Say: "What you're describing sounds like a corporate-level engagement — we'd start with a diagnostic and build a modular implementation roadmap specific to your business. Let me have our team reach out with next steps. What's the best email?"

## After Getting the Email

Confirm the email back to them, then say:
"Perfect. You'll receive an overview of the [TRACK NAME] Program and a link to book a strategy call within the next few minutes. Is there anything else you'd like me to note for the team before we wrap up?"

Then close warmly: "Excellent. You're in good hands. The AiiACo team will be in touch shortly. Have a great day."

## Tone Rules

- Never mention competitors, pricing figures, or make guarantees.
- If someone asks a question outside the diagnostic, answer briefly and redirect: "Great question — that's exactly what we'll cover on the strategy call. For now, let me make sure I get you to the right team."
- If someone is rude or unresponsive, stay calm and professional. After two non-responses, say: "It sounds like now might not be the best time. Feel free to call back anytime at 888-808-0001. Have a great day." and end the call.
- Keep total call time under 4 minutes.`;

// ─── Agent metadata ───────────────────────────────────────────────────────────

export const AGENT_CONFIG = {
  name: "AiiA Diagnostic Agent",
  firstMessage:
    "Thank you for calling AiiACo — the AI Integration Authority. I'm AiiA, your diagnostic intelligence. I'm going to ask you four quick questions to make sure we connect you with the right solution. Ready to get started?",
  systemPrompt: AGENT_SYSTEM_PROMPT,
  voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel — professional, warm, clear
  language: "en",
  maxCallDurationSeconds: 300, // 5 min hard cap
};

// ─── ElevenLabs API helpers ───────────────────────────────────────────────────

const EL_API_KEY = process.env.ELEVENLABS_API_KEY ?? "";
const EL_BASE = "https://api.elevenlabs.io/v1";

export interface ElevenLabsAgent {
  agent_id: string;
  name: string;
}

/**
 * Fetch all agents in the workspace.
 */
export async function listAgents(): Promise<ElevenLabsAgent[]> {
  const res = await fetch(`${EL_BASE}/convai/agents`, {
    headers: { "xi-api-key": EL_API_KEY },
  });
  if (!res.ok) throw new Error(`ElevenLabs listAgents failed: ${res.status}`);
  const data = await res.json() as { agents: ElevenLabsAgent[] };
  return data.agents ?? [];
}

/**
 * Get a single agent by ID.
 */
export async function getAgent(agentId: string): Promise<Record<string, unknown>> {
  const res = await fetch(`${EL_BASE}/convai/agents/${agentId}`, {
    headers: { "xi-api-key": EL_API_KEY },
  });
  if (!res.ok) throw new Error(`ElevenLabs getAgent failed: ${res.status}`);
  return res.json();
}

/**
 * Create the AiiA Diagnostic Agent in ElevenLabs.
 * Returns the new agent_id.
 */
export async function createDiagnosticAgent(webhookUrl: string): Promise<string> {
  const body = {
    name: AGENT_CONFIG.name,
    conversation_config: {
      agent: {
        prompt: {
          prompt: AGENT_CONFIG.systemPrompt,
          llm: "gemini-2.0-flash",
          temperature: 0.4,
          max_tokens: 1024,
        },
        first_message: AGENT_CONFIG.firstMessage,
        language: AGENT_CONFIG.language,
      },
      tts: {
        voice_id: AGENT_CONFIG.voiceId,
        model_id: "eleven_turbo_v2",
      },
      asr: {
        quality: "high",
        user_input_audio_format: "pcm_16000",
      },
      turn: {
        turn_timeout: 7,
        silence_end_call_timeout: 20,
      },
      conversation: {
        max_duration_seconds: AGENT_CONFIG.maxCallDurationSeconds,
      },
    },
    platform_settings: {
      webhook: {
        url: webhookUrl,
      },
    },
  };

  const res = await fetch(`${EL_BASE}/convai/agents/create`, {
    method: "POST",
    headers: {
      "xi-api-key": EL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs createAgent failed: ${res.status} — ${err}`);
  }

  const data = await res.json() as { agent_id: string };
  return data.agent_id;
}

/**
 * Update an existing agent's system prompt and first message.
 */
export async function updateAgentPrompt(
  agentId: string,
  systemPrompt: string,
  firstMessage: string
): Promise<void> {
  const res = await fetch(`${EL_BASE}/convai/agents/${agentId}`, {
    method: "PATCH",
    headers: {
      "xi-api-key": EL_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      conversation_config: {
        agent: {
          prompt: { prompt: systemPrompt },
          first_message: firstMessage,
        },
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`ElevenLabs updateAgent failed: ${res.status} — ${err}`);
  }
}

// ─── Webhook signature verification ──────────────────────────────────────────

/**
 * Verify an ElevenLabs webhook signature.
 * ElevenLabs sends: ElevenLabs-Signature: t=<timestamp>,v1=<hex>
 * Signed payload: "<timestamp>.<rawBody>"
 */
export function verifyElevenLabsSignature(
  rawBody: string,
  header: string | undefined,
  secret: string
): boolean {
  if (!secret) {
    console.warn("[ElevenLabsWebhook] No webhook secret configured — skipping verification");
    return true;
  }
  if (!header) return false;

  const parts: Record<string, string> = {};
  for (const part of header.split(",")) {
    const [k, v] = part.split("=");
    if (k && v) parts[k.trim()] = v.trim();
  }

  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  // Reject if timestamp is more than 5 minutes old
  const age = Math.abs(Date.now() / 1000 - parseInt(timestamp));
  if (age > 300) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(expected, "hex"),
      Buffer.from(signature, "hex")
    );
  } catch {
    return false;
  }
}

// ─── Transcript analysis ──────────────────────────────────────────────────────

export type TrackType = "operator" | "agent" | "corporate" | "unknown";

export interface CallSummary {
  track: TrackType;
  callerEmail: string | null;
  callerName: string | null;
  companyName: string | null;
  painPoint: string | null;
  budgetSignal: string | null;
  transcriptText: string;
  conversationId: string;
  durationSeconds: number;
}

/**
 * Parse the ElevenLabs post-call transcription webhook payload
 * and extract the key diagnostic fields.
 */
export function parseCallWebhook(payload: Record<string, unknown>): CallSummary {
  const data = (payload.data ?? {}) as Record<string, unknown>;
  const conversationId = (data.conversation_id as string) ?? "";
  const durationSeconds = (data.metadata as Record<string, unknown>)?.call_duration_secs as number ?? 0;

  // Build plain-text transcript
  const turns = (data.transcript as Array<{ role: string; message: string }>) ?? [];
  const transcriptText = turns
    .map((t) => `${t.role === "agent" ? "AiiA" : "Caller"}: ${t.message}`)
    .join("\n");

  // Extract email from transcript (simple regex)
  const emailMatch = transcriptText.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
  const callerEmail = emailMatch ? emailMatch[0].toLowerCase() : null;

  // Extract caller name from agent's confirmation line
  const nameMatch = transcriptText.match(/(?:your name is|I have|noted for|speaking with)\s+([A-Z][a-z]+(?: [A-Z][a-z]+)?)/i);
  const callerName = nameMatch ? nameMatch[1] : null;

  // Determine track from agent's routing statement
  let track: TrackType = "unknown";
  const lowerTranscript = transcriptText.toLowerCase();
  if (lowerTranscript.includes("operator program")) {
    track = "operator";
  } else if (lowerTranscript.includes("agent program")) {
    track = "agent";
  } else if (lowerTranscript.includes("corporate-level") || lowerTranscript.includes("corporate level")) {
    track = "corporate";
  }

  // Extract pain point — look for caller's answer to question 2
  const painPointMatch = transcriptText.match(/(?:biggest.*?(?:problem|friction|challenge|issue|pain).*?(?:\n|$))(.*?)(?=\nAiiA:)/i);
  const painPoint = painPointMatch ? painPointMatch[1].trim().slice(0, 300) : null;

  // Extract budget signal — look for caller's answer to question 4
  const budgetMatch = transcriptText.match(/(?:few hundred|few thousand|enterprise|a few hundred|a few thousand|[0-9,]+\s*(?:a month|per month|\/month))/i);
  const budgetSignal = budgetMatch ? budgetMatch[0] : null;

  // Extract company name — look for caller's answer to question 1
  const companyMatch = transcriptText.match(/(?:I(?:'m| am) (?:with|at|from)|(?:company|business|firm) (?:is|called))\s+([A-Z][A-Za-z0-9\s&.,']+?)(?:\.|,|\n|$)/);
  const companyName = companyMatch ? companyMatch[1].trim().slice(0, 128) : null;

  return {
    track,
    callerEmail,
    callerName,
    companyName,
    painPoint,
    budgetSignal,
    transcriptText,
    conversationId,
    durationSeconds,
  };
}
