/**
 * Lead Diagnostic Engine
 *
 * Generates an AI-powered diagnostic for every completed intake lead.
 * Called from qualifierStep3 (the final step of the intake flow).
 * Fires a rich owner notification with the full lead profile + diagnostic.
 */

import { invokeLLM } from "./_core/llm";
import { notifyOwner } from "./_core/notification";
import { Lead } from "../drizzle/schema";

// ─── Problem → AiiACo signal mapping ─────────────────────────────────────────

const PROBLEM_SIGNAL_MAP: Record<
  string,
  { pillar: string; signal: string; urgency: string; aiiaFit: string }
> = {
  "My team spends too much time on manual, repetitive tasks": {
    pillar: "Operational AI Systems",
    signal: "High manual overhead across internal workflows",
    urgency: "High",
    aiiaFit: "Workflow automation, task routing, and AI-assisted execution layers",
  },
  "We lose leads because follow-up is slow or inconsistent": {
    pillar: "AI Revenue Engine",
    signal: "Revenue leakage from pipeline gaps",
    urgency: "Critical",
    aiiaFit: "Automated follow-up sequencing, lead scoring, and CRM intelligence",
  },
  "Our data lives in multiple systems and we can't trust the numbers": {
    pillar: "Operational AI Systems",
    signal: "Fragmented data infrastructure and reporting blind spots",
    urgency: "High",
    aiiaFit: "Data unification layer, real-time dashboards, and AI-driven reporting",
  },
  "Document processing and approvals take too long": {
    pillar: "Operational AI Systems",
    signal: "Document bottlenecks slowing delivery and compliance",
    urgency: "Medium",
    aiiaFit: "AI document processing, automated approval workflows",
  },
  "Client communication requires too much manual coordination": {
    pillar: "AI Revenue Engine",
    signal: "Communication overhead reducing capacity",
    urgency: "High",
    aiiaFit: "AI-assisted client communication, automated touchpoint management",
  },
  "We lack real-time visibility into operations and performance": {
    pillar: "Operational AI Systems",
    signal: "Leadership operating without live operational data",
    urgency: "High",
    aiiaFit: "Real-time operational dashboards, AI performance monitoring",
  },
  "Proposal and deliverable creation is slow and resource-heavy": {
    pillar: "Operational AI Systems",
    signal: "Delivery capacity constrained by manual production",
    urgency: "Medium",
    aiiaFit: "AI-assisted proposal generation, templated delivery systems",
  },
  "We're growing but can't scale without adding headcount": {
    pillar: "AI Revenue Engine + Operational AI Systems",
    signal: "Growth ceiling caused by linear headcount dependency",
    urgency: "Critical",
    aiiaFit:
      "AI infrastructure that decouples revenue growth from headcount — the core AiiACo thesis",
  },
};

const CALL_PREF_LABELS: Record<string, string> = {
  morning: "Morning (Weekdays 8am – 12pm)",
  afternoon: "Afternoon (Weekdays 12pm – 5pm)",
  weekdays: "Any Weekday (morning or afternoon)",
  anytime: "Anytime — flexible",
  "Calendly booking": "Calendly — specific slot",
};

// ─── Main diagnostic generator ────────────────────────────────────────────────

export async function generateAndSendLeadDiagnostic(lead: Lead): Promise<void> {
  const problemCategory = lead.problemCategory ?? "Not specified";
  const context = PROBLEM_SIGNAL_MAP[problemCategory] ?? {
    pillar: "Full Diagnostic Required",
    signal: "Custom situation — requires discovery call",
    urgency: "Medium",
    aiiaFit: "Tailored AI infrastructure design",
  };

  const callPrefLabel =
    CALL_PREF_LABELS[lead.callPreference ?? ""] ?? lead.callPreference ?? "Not specified";

  const submittedAt = lead.createdAt
    ? new Date(lead.createdAt).toLocaleString("en-US", {
        timeZone: "America/New_York",
        dateStyle: "medium",
        timeStyle: "short",
      }) + " EST"
    : "Unknown";

  // ── Generate AI diagnostic ──────────────────────────────────────────────────
  let diagnostic = "";
  try {
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: `You are AiiACo's internal lead intelligence system. AiiACo is an AI infrastructure firm that designs, deploys, and manages AI inside the operational and revenue systems of modern businesses ($5M–$100M revenue). AiiACo's three service pillars are:
1. Database Reactivation — cleaning and reactivating dormant CRM databases to generate new conversations from existing assets
2. AI Revenue Engine — AI-assisted outbound prospecting, automated follow-up sequencing, lead scoring, and conversion intelligence
3. Operational AI Systems — custom AI integrations embedded in field operations, communications, reporting, and workflow coordination

Your job is to produce a sharp, concise, investor-grade lead diagnostic for the AiiACo owner (Nemr Hallak) based on a prospect's intake answers. The diagnostic must include:
- CORE OPERATIONAL PROBLEM: What is actually broken and why it matters
- BUSINESS IMPACT: The downstream cost of leaving this unresolved
- MAPPED AIIACO PILLAR(S): Which service(s) directly address this
- URGENCY AND FIT: How urgent and how strong the fit is
- NEXT STEPS FOR SALES CALL: 3 specific, actionable questions or actions for the call

Be direct, confident, and executive in tone. No filler. Every sentence earns its place.
Format with ALL CAPS section headers. Plain text only — no markdown bullets or asterisks.`,
        },
        {
          role: "user",
          content: `Generate a lead diagnostic for the following prospect:

LEAD INFORMATION:
- Name: ${lead.name}
- Company: ${lead.company ?? "Not provided"}
- Email: ${lead.email}
- Phone: ${lead.phone ?? "Not provided"}
- Lead Source: ${lead.leadSource ?? "Website"}
- Call Preference: ${callPrefLabel}
- Submitted: ${submittedAt}

INTAKE ANSWERS:
- Primary Challenge: "${problemCategory}"${lead.problemDetail ? `\n- Additional Detail: "${lead.problemDetail}"` : ""}

INTERNAL SIGNAL MAPPING:
- Matched Pillar: ${context.pillar}
- Operational Signal: ${context.signal}
- Urgency: ${context.urgency}
- AiiACo Fit: ${context.aiiaFit}

Generate the diagnostic now.`,
        },
      ],
    });

    diagnostic =
      (response as any)?.choices?.[0]?.message?.content ??
      (typeof response === "string" ? response : JSON.stringify(response));
  } catch (err) {
    console.error("[LeadDiagnostic] LLM call failed:", err);
    diagnostic = `[Diagnostic generation failed — review lead manually]\n\nPrimary Challenge: ${problemCategory}\nMapped Pillar: ${context.pillar}\nUrgency: ${context.urgency}`;
  }

  // ── Build notification ──────────────────────────────────────────────────────
  const title = `NEW LEAD — ${lead.name}${lead.company ? ` (${lead.company})` : ""} | Call: ${callPrefLabel}`;

  const content = [
    `LEAD PROFILE`,
    `Name:     ${lead.name}`,
    `Company:  ${lead.company ?? "—"}`,
    `Email:    ${lead.email}`,
    `Phone:    ${lead.phone ?? "—"}`,
    `Call:     ${callPrefLabel}`,
    `Source:   ${lead.leadSource ?? "Website"}`,
    `Submitted: ${submittedAt}`,
    ``,
    `INTAKE ANSWERS`,
    `Challenge: ${problemCategory}`,
    lead.problemDetail ? `Detail:    ${lead.problemDetail}` : null,
    ``,
    `─────────────────────────────────────`,
    `AI DIAGNOSTIC`,
    `─────────────────────────────────────`,
    ``,
    diagnostic,
  ]
    .filter((line) => line !== null)
    .join("\n");

  // ── Send notification ───────────────────────────────────────────────────────
  try {
    await notifyOwner({ title, content });
  } catch (err) {
    console.error("[LeadDiagnostic] Notification failed:", err);
  }
}
