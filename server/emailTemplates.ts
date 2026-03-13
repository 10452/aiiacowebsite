/**
 * AiiACo Email Templates — v3 (Magnificent Edition)
 *
 * Two templates:
 * 1. Owner Pilot Brief — full brand-book styled HTML document with all intelligence
 * 2. Caller Summary — personalized, intelligence-driven follow-up with conversation insights
 *
 * Both use the AiiA brand system: void black (#0A0804), gold accents (#C9A84C / #F5D77A),
 * Cormorant Garamond + Inter typography, warm paper (#F8F3E8) for content sections.
 *
 * Design: Email-safe inline CSS only. No external stylesheets, no CSS classes.
 * All fonts use web-safe fallbacks. Google Fonts loaded via <link> in <head>.
 */

import type { TrackType, ConversationIntelligence } from "./aiAgent";

// ─── CDN Assets ──────────────────────────────────────────────────────────────

const LOGO_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png";
const ARC_ICON_URL =
  "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia-arc-icon-final-transparent_883f9364.png";

// ─── Shared Constants ────────────────────────────────────────────────────────

const CALENDLY_URL = "https://calendly.com/aiiaco";

const TRACK_LABELS: Record<TrackType, string> = {
  operator: "Operator Program",
  agent: "Agent Program",
  corporate: "Corporate Program",
  unknown: "Custom Engagement",
};

const TRACK_DESCRIPTIONS: Record<TrackType, string> = {
  operator:
    "Fully managed AI infrastructure — we design, deploy, and operate the entire stack end-to-end. Zero internal overhead.",
  agent:
    "AI-powered growth tools configured for your specific workflow — powerful automation without enterprise overhead.",
  corporate:
    "Enterprise-level AI implementation in modular phases — deep diagnostic, custom roadmap, staged deployment.",
  unknown:
    "A tailored engagement designed around your specific situation and operational needs.",
};

// ─── Helper: format duration ─────────────────────────────────────────────────

function formatDuration(seconds: number | null | undefined): string {
  if (!seconds || seconds <= 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

// ─── Helper: safe HTML escape ────────────────────────────────────────────────

function esc(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/\n/g, "<br/>");
}

function escPlain(str: string | null | undefined): string {
  return str ?? "";
}

// ─── Helper: parse JSON arrays safely ────────────────────────────────────────

function parseJsonArray(val: string | null | undefined): string[] {
  if (!val) return [];
  try {
    const parsed = JSON.parse(val);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. OWNER PILOT BRIEF — Magnificent brand-book styled HTML email
// ═══════════════════════════════════════════════════════════════════════════════

export interface OwnerPilotBriefData {
  // Lead info
  leadId: number;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  industry?: string | null;
  leadSource?: string | null;
  callPreference?: string | null;
  submittedAt?: string;
  // Call data
  track: TrackType;
  callDurationSeconds?: number | null;
  conversationId?: string | null;
  // Intelligence
  conversationSummary?: string | null;
  painPoints?: string | null; // JSON array string
  wants?: string | null; // JSON array string
  currentSolutions?: string | null; // JSON array string
  // Diagnostic (from LLM)
  recapSnapshot?: string | null;
  whatTheyToldUs?: string | null;
  fullDiagnostic?: string | null;
  solutionAreas?: string | null;
  salesCallNextSteps?: string | null;
  leadBrief?: string | null;
  // Quality
  quality?: string | null;
}

export function buildOwnerPilotBriefEmail(data: OwnerPilotBriefData): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = data.name.split(" ")[0] ?? data.name;
  const trackLabel = TRACK_LABELS[data.track] ?? "Custom Engagement";
  const painPoints = parseJsonArray(data.painPoints);
  const wants = parseJsonArray(data.wants);
  const currentSolutions = parseJsonArray(data.currentSolutions);

  const subject = `PILOT BRIEF — ${data.name}${data.company ? ` | ${data.company}` : ""} | ${trackLabel}`;

  // ── Build HTML sections ────────────────────────────────────────────────────

  const painPointsHtml =
    painPoints.length > 0
      ? painPoints
          .map(
            (p) =>
              `<tr><td style="padding: 6px 0 6px 16px; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #3D2E0A; border-bottom: 1px solid rgba(139,105,20,0.10);">
                <span style="color: #C9A84C; margin-right: 8px;">&#9670;</span>${esc(p)}
              </td></tr>`
          )
          .join("")
      : `<tr><td style="padding: 8px 16px; font-family: 'Inter', Arial, sans-serif; font-size: 13px; color: #6B5320; font-style: italic;">No specific pain points extracted</td></tr>`;

  const wantsHtml =
    wants.length > 0
      ? wants
          .map(
            (w) =>
              `<tr><td style="padding: 6px 0 6px 16px; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #3D2E0A; border-bottom: 1px solid rgba(139,105,20,0.10);">
                <span style="color: #C9A84C; margin-right: 8px;">&#9670;</span>${esc(w)}
              </td></tr>`
          )
          .join("")
      : "";

  const currentSolutionsHtml =
    currentSolutions.length > 0
      ? currentSolutions
          .map(
            (s) =>
              `<tr><td style="padding: 6px 0 6px 16px; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #3D2E0A; border-bottom: 1px solid rgba(139,105,20,0.10);">
                <span style="color: #C9A84C; margin-right: 8px;">&#9670;</span>${esc(s)}
              </td></tr>`
          )
          .join("")
      : "";

  const salesStepsHtml = data.salesCallNextSteps
    ? data.salesCallNextSteps
        .split("\n")
        .filter((l) => l.trim())
        .map(
          (step) =>
            `<tr><td style="padding: 6px 0 6px 16px; font-family: 'Inter', Arial, sans-serif; font-size: 13px; line-height: 1.6; color: #F5D77A;">
              ${esc(step)}
            </td></tr>`
        )
        .join("")
    : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Pilot Brief — ${esc(data.name)}</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; padding: 0; background-color: #1A1208; font-family: 'Inter', Arial, sans-serif;">

  <!-- Outer wrapper -->
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #1A1208;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <!-- Main container -->
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width: 640px; width: 100%;">

          <!-- ═══ COVER HEADER ═══ -->
          <tr>
            <td style="background: #0A0804; border: 1px solid rgba(201,168,76,0.25); border-bottom: none; padding: 32px 36px 24px;">
              <!-- Logo row -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${LOGO_URL}" alt="AiiACo" width="44" height="44" style="display: block;" />
                  </td>
                  <td style="text-align: right;">
                    <span style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: rgba(201,168,76,0.50);">PILOT BRIEF</span>
                  </td>
                </tr>
              </table>

              <!-- Gold rule -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: 20px 0 16px;">
                <tr>
                  <td style="height: 1px; background: linear-gradient(90deg, transparent, #F5D77A, transparent);"></td>
                </tr>
              </table>

              <!-- Title -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; font-weight: 300; line-height: 1.1; color: #F5D77A; text-align: center; padding-bottom: 8px;">
                    ${esc(data.name)}
                  </td>
                </tr>
                ${
                  data.company
                    ? `<tr><td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 300; font-style: italic; color: #C9A84C; text-align: center; padding-bottom: 4px;">${esc(data.company)}</td></tr>`
                    : ""
                }
                <tr>
                  <td style="font-family: 'Inter', Arial, sans-serif; font-size: 11px; font-weight: 500; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(245,215,122,0.60); text-align: center; padding-top: 8px;">
                    ${trackLabel} &nbsp;&middot;&nbsp; Lead #${data.leadId}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ LEAD PROFILE CARD ═══ -->
          <tr>
            <td style="background: #0A0804; border-left: 1px solid rgba(201,168,76,0.25); border-right: 1px solid rgba(201,168,76,0.25); padding: 0 36px 24px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15); border-radius: 8px;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(201,168,76,0.65); padding-bottom: 12px;" colspan="2">LEAD PROFILE</td>
                      </tr>
                      <tr>
                        <td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0; width: 100px;">Email</td>
                        <td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.85); padding: 4px 0;"><a href="mailto:${esc(data.email)}" style="color: #C9A84C; text-decoration: none;">${esc(data.email)}</a></td>
                      </tr>
                      ${data.phone ? `<tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0;">Phone</td><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.85); padding: 4px 0;">${esc(data.phone)}</td></tr>` : ""}
                      ${data.industry ? `<tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0;">Industry</td><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.85); padding: 4px 0;">${esc(data.industry)}</td></tr>` : ""}
                      <tr>
                        <td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0;">Source</td>
                        <td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.85); padding: 4px 0;">${esc(data.leadSource ?? "—")}</td>
                      </tr>
                      ${data.callDurationSeconds ? `<tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0;">Call Duration</td><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.85); padding: 4px 0;">${formatDuration(data.callDurationSeconds)}</td></tr>` : ""}
                      ${data.callPreference ? `<tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0;">Call Pref</td><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.85); padding: 4px 0;">${esc(data.callPreference)}</td></tr>` : ""}
                      ${data.quality ? `<tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.50); padding: 4px 0;">Quality</td><td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: ${data.quality === "high" ? "#4ADE80" : data.quality === "medium" ? "#FBBF24" : "#FB923C"}; padding: 4px 0; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.5px;">${esc(data.quality)}</td></tr>` : ""}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ TRANSITION TO PAPER ═══ -->
          <tr>
            <td style="background: #0A0804; border-left: 1px solid rgba(201,168,76,0.25); border-right: 1px solid rgba(201,168,76,0.25); padding: 0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height: 1px; background: linear-gradient(90deg, transparent, #C9A84C, transparent);"></td></tr>
              </table>
            </td>
          </tr>

          <!-- ═══ CONTENT BODY (warm paper) ═══ -->
          <tr>
            <td style="background: #F8F3E8; border-left: 1px solid rgba(139,105,20,0.25); border-right: 1px solid rgba(139,105,20,0.25); padding: 28px 36px 0;">

              ${
                data.recapSnapshot
                  ? `
              <!-- WHO THEY ARE -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; WHO THEY ARE</td></tr>
                <tr><td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 18px; font-weight: 400; line-height: 1.5; color: #1A1208;">${esc(data.recapSnapshot)}</td></tr>
              </table>
              `
                  : ""
              }

              ${
                data.whatTheyToldUs
                  ? `
              <!-- WHAT THEY TOLD US -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; WHAT THEY TOLD US</td></tr>
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; font-weight: 300; line-height: 1.75; color: #3D2E0A;">${esc(data.whatTheyToldUs)}</td></tr>
              </table>
              `
                  : ""
              }

              ${
                data.conversationSummary &&
                data.conversationSummary !== "Transcript analysis unavailable."
                  ? `
              <!-- CONVERSATION SUMMARY -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; CONVERSATION SUMMARY</td></tr>
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; font-weight: 300; line-height: 1.75; color: #3D2E0A;">${esc(data.conversationSummary)}</td></tr>
              </table>
              `
                  : ""
              }

              <!-- PAIN POINTS -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; PAIN POINTS</td></tr>
                ${painPointsHtml}
              </table>

              ${
                wants.length > 0
                  ? `
              <!-- WANTS & WISHES -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; WANTS &amp; WISHES</td></tr>
                ${wantsHtml}
              </table>
              `
                  : ""
              }

              ${
                currentSolutions.length > 0
                  ? `
              <!-- CURRENT SOLUTIONS -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; CURRENT SOLUTIONS &amp; ATTEMPTS</td></tr>
                ${currentSolutionsHtml}
              </table>
              `
                  : ""
              }

            </td>
          </tr>

          <!-- ═══ FULL DIAGNOSTIC (dark block) ═══ -->
          ${
            data.fullDiagnostic
              ? `
          <tr>
            <td style="background: #0A0804; border-left: 1px solid rgba(201,168,76,0.25); border-right: 1px solid rgba(201,168,76,0.25); padding: 0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height: 1px; background: linear-gradient(90deg, transparent, #F5D77A, transparent);"></td></tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 24px 0;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(201,168,76,0.65); padding-bottom: 12px;">&#9670; FULL DIAGNOSTIC — OWNER ONLY</td></tr>
                <tr><td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; font-weight: 400; font-style: italic; line-height: 1.6; color: rgba(245,215,122,0.85);">${esc(data.fullDiagnostic)}</td></tr>
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- ═══ SOLUTION AREAS (paper) ═══ -->
          ${
            data.solutionAreas
              ? `
          <tr>
            <td style="background: #F8F3E8; border-left: 1px solid rgba(139,105,20,0.25); border-right: 1px solid rgba(139,105,20,0.25); padding: 24px 36px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 8px;">&#9670; SOLUTION AREAS</td></tr>
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; font-weight: 300; line-height: 1.75; color: #3D2E0A;">${esc(data.solutionAreas)}</td></tr>
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- ═══ SALES CALL NEXT STEPS (dark block) ═══ -->
          ${
            data.salesCallNextSteps
              ? `
          <tr>
            <td style="background: #0A0804; border-left: 1px solid rgba(201,168,76,0.25); border-right: 1px solid rgba(201,168,76,0.25); padding: 0 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height: 1px; background: linear-gradient(90deg, transparent, #F5D77A, transparent);"></td></tr>
              </table>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding: 24px 0;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(201,168,76,0.65); padding-bottom: 12px;">&#9670; SALES CALL — NEXT STEPS</td></tr>
                ${salesStepsHtml}
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- ═══ LEAD BRIEF PREVIEW (paper) ═══ -->
          ${
            data.leadBrief
              ? `
          <tr>
            <td style="background: #F8F3E8; border-left: 1px solid rgba(139,105,20,0.25); border-right: 1px solid rgba(139,105,20,0.25); padding: 24px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #F2EAD6; border: 1px solid rgba(139,105,20,0.20); border-radius: 8px; padding: 20px 24px;">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: #8B6914; padding-bottom: 10px;">PREVIEW — WHAT THE CALLER WILL RECEIVE</td></tr>
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 13px; font-weight: 300; font-style: italic; line-height: 1.75; color: #3D2E0A;">${esc(data.leadBrief)}</td></tr>
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="background: #0A0804; border: 1px solid rgba(201,168,76,0.25); border-top: none; padding: 20px 36px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.30), transparent); margin-bottom: 16px;"></td></tr>
                <tr>
                  <td style="padding-top: 16px; font-family: 'Inter', Arial, sans-serif; font-size: 11px; color: rgba(200,215,230,0.35); text-align: center;">
                    AiiACo &nbsp;&middot;&nbsp; AI Integration Authority for the Corporate Age &nbsp;&middot;&nbsp; <a href="https://aiiaco.com" style="color: rgba(201,168,76,0.50); text-decoration: none;">aiiaco.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 6px; font-family: 'Inter', Arial, sans-serif; font-size: 10px; color: rgba(200,215,230,0.20); text-align: center; letter-spacing: 1px; text-transform: uppercase;">
                    CONFIDENTIAL — INTERNAL USE ONLY
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  // ── Plain text fallback ────────────────────────────────────────────────────

  const text = [
    `PILOT BRIEF — ${data.name}${data.company ? ` | ${data.company}` : ""}`,
    `Track: ${trackLabel} | Lead #${data.leadId}`,
    ``,
    `LEAD PROFILE`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.industry ? `Industry: ${data.industry}` : null,
    `Source: ${data.leadSource ?? "—"}`,
    data.callDurationSeconds ? `Call Duration: ${formatDuration(data.callDurationSeconds)}` : null,
    data.callPreference ? `Call Preference: ${data.callPreference}` : null,
    data.quality ? `Quality: ${data.quality}` : null,
    ``,
    data.recapSnapshot ? `WHO THEY ARE\n${data.recapSnapshot}\n` : null,
    data.whatTheyToldUs ? `WHAT THEY TOLD US\n${data.whatTheyToldUs}\n` : null,
    data.conversationSummary && data.conversationSummary !== "Transcript analysis unavailable."
      ? `CONVERSATION SUMMARY\n${data.conversationSummary}\n`
      : null,
    painPoints.length > 0
      ? `PAIN POINTS\n${painPoints.map((p) => `  • ${p}`).join("\n")}\n`
      : null,
    wants.length > 0
      ? `WANTS & WISHES\n${wants.map((w) => `  • ${w}`).join("\n")}\n`
      : null,
    currentSolutions.length > 0
      ? `CURRENT SOLUTIONS\n${currentSolutions.map((s) => `  • ${s}`).join("\n")}\n`
      : null,
    `─────────────────────────────────────`,
    data.fullDiagnostic ? `FULL DIAGNOSTIC (OWNER ONLY)\n${data.fullDiagnostic}\n` : null,
    data.solutionAreas ? `SOLUTION AREAS\n${data.solutionAreas}\n` : null,
    data.salesCallNextSteps ? `SALES CALL — NEXT STEPS\n${data.salesCallNextSteps}\n` : null,
    `─────────────────────────────────────`,
    data.leadBrief ? `PREVIEW — WHAT THE CALLER WILL RECEIVE\n${data.leadBrief}\n` : null,
    ``,
    `AiiACo · aiiaco.com · CONFIDENTIAL`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. CALLER SUMMARY — Personalized, intelligence-driven follow-up email
// ═══════════════════════════════════════════════════════════════════════════════

export interface CallerSummaryData {
  name: string;
  email: string;
  company?: string | null;
  track: TrackType;
  // Intelligence (from LLM extraction)
  conversationSummary?: string | null;
  painPoints?: string | null; // JSON array string
  wants?: string | null; // JSON array string
  // Diagnostic brief (lead-facing, no internal language)
  leadBrief?: string | null;
}

export function buildCallerSummaryEmail(data: CallerSummaryData): {
  subject: string;
  html: string;
  text: string;
} {
  const firstName = data.name.split(" ")[0] ?? data.name;
  const trackLabel = TRACK_LABELS[data.track] ?? "Custom Engagement";
  const trackDesc = TRACK_DESCRIPTIONS[data.track] ?? TRACK_DESCRIPTIONS.unknown;
  const painPoints = parseJsonArray(data.painPoints);
  const wants = parseJsonArray(data.wants);

  const subject = `${firstName}, here's your AiiACo conversation summary`;

  // Build pain points section for the caller (reframed positively)
  const insightsHtml =
    painPoints.length > 0
      ? painPoints
          .map(
            (p) =>
              `<tr><td style="padding: 6px 0 6px 0; font-family: 'Inter', Arial, sans-serif; font-size: 14px; line-height: 1.65; color: rgba(200,215,230,0.80); border-bottom: 1px solid rgba(255,255,255,0.04);">
                <span style="color: #C9A84C; margin-right: 8px;">&#9670;</span>${esc(p)}
              </td></tr>`
          )
          .join("")
      : "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your Conversation Summary — AiiACo</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
</head>
<body style="margin: 0; padding: 0; background-color: #03050A; font-family: 'Inter', Arial, sans-serif;">

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #03050A;">
    <tr>
      <td align="center" style="padding: 32px 16px;">

        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">

          <!-- ═══ HEADER ═══ -->
          <tr>
            <td style="padding: 0 0 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img src="${LOGO_URL}" alt="AiiACo" width="36" height="36" style="display: block;" />
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gold divider -->
          <tr>
            <td style="padding: 0 0 28px;">
              <table role="presentation" width="48" cellpadding="0" cellspacing="0">
                <tr><td style="height: 1px; background: linear-gradient(90deg, rgba(201,168,76,0.80), rgba(201,168,76,0.15));"></td></tr>
              </table>
            </td>
          </tr>

          <!-- ═══ GREETING ═══ -->
          <tr>
            <td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; font-weight: 300; line-height: 1.2; color: #F0F4F8; padding-bottom: 16px;">
              ${firstName}, thank you for the conversation.
            </td>
          </tr>

          <tr>
            <td style="font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 300; line-height: 1.75; color: rgba(200,215,230,0.80); padding-bottom: 24px;">
              We appreciate you taking the time to walk us through your situation${data.company ? ` at <strong style="color: rgba(240,192,80,0.90);">${esc(data.company)}</strong>` : ""}. Here's a summary of what we discussed and what happens next.
            </td>
          </tr>

          ${
            data.leadBrief
              ? `
          <!-- ═══ INITIAL ASSESSMENT ═══ -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(201,168,76,0.65); padding-bottom: 12px;">YOUR INITIAL ASSESSMENT</td></tr>
                      <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 1.75; color: rgba(200,215,230,0.85); font-style: italic;">${esc(data.leadBrief)}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          `
              : ""
          }

          ${
            painPoints.length > 0
              ? `
          <!-- ═══ KEY AREAS WE IDENTIFIED ═══ -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(201,168,76,0.65); padding-bottom: 12px;">KEY AREAS WE IDENTIFIED</td></tr>
                ${insightsHtml}
              </table>
            </td>
          </tr>
          `
              : ""
          }

          <!-- ═══ RECOMMENDED PROGRAM ═══ -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(201,168,76,0.06); border: 1px solid rgba(201,168,76,0.15); border-radius: 8px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(201,168,76,0.65); padding-bottom: 8px;">SUGGESTED PROGRAM</td></tr>
                      <tr><td style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 22px; font-weight: 600; color: #C9A84C; padding-bottom: 8px;">${trackLabel}</td></tr>
                      <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 1.65; color: rgba(200,215,230,0.80);">${esc(trackDesc)}</td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ WHAT HAPPENS NEXT ═══ -->
          <tr>
            <td style="padding-bottom: 28px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07); border-radius: 8px;">
                <tr>
                  <td style="padding: 24px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(240,192,80,0.80); padding-bottom: 12px;">WHAT HAPPENS NEXT</td></tr>
                      <tr><td style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 1.75; color: rgba(200,215,230,0.80);">
                        A specialist from our team will be reaching out to you personally to discuss the full picture and walk you through potential next steps. In the meantime, you can book a strategy call directly:
                      </td></tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ═══ CTA BUTTON ═══ -->
          <tr>
            <td align="center" style="padding-bottom: 32px;">
              <a href="${CALENDLY_URL}" style="display: inline-block; background: #C9A84C; color: #0A0804; font-family: 'Inter', Arial, sans-serif; font-weight: 700; font-size: 14px; padding: 14px 32px; border-radius: 8px; text-decoration: none; letter-spacing: 0.5px;">Book Your Strategy Call &rarr;</a>
            </td>
          </tr>

          <!-- ═══ CLOSING ═══ -->
          <tr>
            <td style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 300; line-height: 1.65; color: rgba(200,215,230,0.50); padding-bottom: 8px;">
              If you have any questions before the call, reply directly to this email.
            </td>
          </tr>
          <tr>
            <td style="font-family: 'Inter', Arial, sans-serif; font-size: 14px; font-weight: 300; color: rgba(200,215,230,0.50); padding-bottom: 32px;">
              — The AiiACo Team
            </td>
          </tr>

          <!-- ═══ FOOTER ═══ -->
          <tr>
            <td style="border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-family: 'Inter', Arial, sans-serif; font-size: 12px; color: rgba(200,215,230,0.30); line-height: 1.6;">
                    AiiACo &nbsp;&middot;&nbsp; AI Integration Authority for the Corporate Age<br />
                    <a href="https://aiiaco.com" style="color: rgba(201,168,76,0.50); text-decoration: none;">aiiaco.com</a>
                  </td>
                </tr>
                <tr>
                  <td style="font-family: 'Inter', Arial, sans-serif; font-size: 11px; color: rgba(200,215,230,0.20); padding-top: 8px;">
                    You received this email because you spoke with AiiA, our AI diagnostic intelligence.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

  // ── Plain text fallback ────────────────────────────────────────────────────

  const text = [
    `${firstName}, thank you for the conversation.`,
    ``,
    `We appreciate you taking the time to walk us through your situation${data.company ? ` at ${data.company}` : ""}.`,
    ``,
    data.leadBrief ? `YOUR INITIAL ASSESSMENT\n${data.leadBrief}\n` : null,
    painPoints.length > 0
      ? `KEY AREAS WE IDENTIFIED\n${painPoints.map((p) => `  • ${p}`).join("\n")}\n`
      : null,
    `SUGGESTED PROGRAM: ${trackLabel}`,
    trackDesc,
    ``,
    `WHAT HAPPENS NEXT`,
    `A specialist from our team will be reaching out to you personally. In the meantime, you can book a strategy call: ${CALENDLY_URL}`,
    ``,
    `If you have any questions, reply directly to this email.`,
    ``,
    `— The AiiACo Team`,
    `aiiaco.com`,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}
