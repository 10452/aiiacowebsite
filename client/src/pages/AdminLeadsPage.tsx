/*
 * AiiACo — Admin Leads Dashboard
 * Protected route: requires authentication (owner only)
 * Shows all lead submissions with pipeline status controls
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import type { Lead } from "../../../drizzle/schema";

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "New",
  diagnostic_ready: "Diagnostic Ready",
  reviewed: "Reviewed",
  contacted: "Contacted",
  closed: "Closed",
};

const STATUS_COLORS: Record<Lead["status"], { bg: string; text: string; border: string }> = {
  new: {
    bg: "rgba(184,156,74,0.12)",
    text: "rgba(184,156,74,0.95)",
    border: "rgba(184,156,74,0.30)",
  },
  diagnostic_ready: {
    bg: "rgba(120,200,255,0.10)",
    text: "rgba(120,200,255,0.92)",
    border: "rgba(120,200,255,0.28)",
  },
  reviewed: {
    bg: "rgba(100,160,255,0.10)",
    text: "rgba(100,160,255,0.90)",
    border: "rgba(100,160,255,0.25)",
  },
  contacted: {
    bg: "rgba(100,220,160,0.10)",
    text: "rgba(100,220,160,0.90)",
    border: "rgba(100,220,160,0.25)",
  },
  closed: {
    bg: "rgba(255,255,255,0.05)",
    text: "rgba(200,215,230,0.45)",
    border: "rgba(255,255,255,0.10)",
  },
};

const TYPE_LABELS: Record<Lead["type"], string> = {
  call: "Call Request",
  intake: "Full Intake",
};

const ALL_STATUSES: Lead["status"][] = ["new", "diagnostic_ready", "reviewed", "contacted", "closed"];

function StatusBadge({ status }: { status: Lead["status"] }) {
  const c = STATUS_COLORS[status];
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 10px",
        borderRadius: "999px",
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        background: c.bg,
        color: c.text,
        border: `1px solid ${c.border}`,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

const TRACK_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  operator: { bg: "rgba(184,156,74,0.10)", text: "rgba(184,156,74,0.90)", border: "rgba(184,156,74,0.25)" },
  agent: { bg: "rgba(120,200,255,0.10)", text: "rgba(120,200,255,0.90)", border: "rgba(120,200,255,0.25)" },
  corporate: { bg: "rgba(160,120,255,0.10)", text: "rgba(160,120,255,0.90)", border: "rgba(160,120,255,0.25)" },
  unknown: { bg: "rgba(255,255,255,0.05)", text: "rgba(200,215,230,0.45)", border: "rgba(255,255,255,0.10)" },
};

/** Helper to safely parse JSON arrays stored as strings in the DB */
function parseJsonArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/** Conversation Intelligence Panel — shows AI-extracted insights from voice calls */
function ConversationIntelligencePanel({ lead }: { lead: Lead }) {
  const [open, setOpen] = useState(true);
  const painPoints = parseJsonArray(lead.painPoints);
  const wants = parseJsonArray(lead.wants);
  const currentSolutions = parseJsonArray(lead.currentSolutions);
  const hasSummary = !!lead.conversationSummary;
  const hasIntelligence = painPoints.length > 0 || wants.length > 0 || currentSolutions.length > 0 || hasSummary;

  if (!hasIntelligence) return null;

  const sectionHeader: React.CSSProperties = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "0.10em",
    textTransform: "uppercase",
    margin: "0 0 8px",
  };

  const bulletStyle: React.CSSProperties = {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
    fontSize: "13px",
    lineHeight: 1.6,
    color: "rgba(200,215,230,0.85)",
    margin: "0 0 6px",
    paddingLeft: "16px",
    position: "relative" as const,
  };

  return (
    <div style={{ paddingTop: "16px", paddingBottom: "4px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: open ? "14px" : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
              fontSize: "10px",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(120,200,255,0.80)",
              background: "rgba(120,200,255,0.08)",
              border: "1px solid rgba(120,200,255,0.20)",
              padding: "3px 10px",
              borderRadius: "4px",
            }}
          >
            Conversation Intelligence
          </span>
          {lead.callDurationSeconds && lead.callDurationSeconds > 0 && (
            <span style={{ fontSize: "11px", color: "rgba(200,215,230,0.40)", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif" }}>
              {Math.floor(lead.callDurationSeconds / 60)}m {lead.callDurationSeconds % 60}s
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)", color: "rgba(200,215,230,0.60)", cursor: "pointer" }}
        >
          {open ? "Hide" : "View"}
        </button>
      </div>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Conversation Summary */}
          {hasSummary && (
            <div style={{ background: "rgba(120,200,255,0.04)", border: "1px solid rgba(120,200,255,0.12)", borderRadius: "10px", padding: "14px 18px" }}>
              <p style={{ ...sectionHeader, color: "rgba(120,200,255,0.70)" }}>Summary</p>
              <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", lineHeight: 1.65, color: "rgba(200,215,230,0.85)", margin: 0 }}>
                {lead.conversationSummary}
              </p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
            {/* Pain Points */}
            {painPoints.length > 0 && (
              <div style={{ background: "rgba(220,80,80,0.04)", border: "1px solid rgba(220,80,80,0.12)", borderRadius: "10px", padding: "14px 16px" }}>
                <p style={{ ...sectionHeader, color: "rgba(220,100,100,0.80)" }}>Pain Points</p>
                {painPoints.map((p, i) => (
                  <p key={i} style={bulletStyle}>
                    <span style={{ position: "absolute", left: 0, color: "rgba(220,100,100,0.60)" }}>&bull;</span>
                    {p}
                  </p>
                ))}
              </div>
            )}

            {/* Wants & Wishes */}
            {wants.length > 0 && (
              <div style={{ background: "rgba(100,220,160,0.04)", border: "1px solid rgba(100,220,160,0.12)", borderRadius: "10px", padding: "14px 16px" }}>
                <p style={{ ...sectionHeader, color: "rgba(100,220,160,0.80)" }}>Wants &amp; Wishes</p>
                {wants.map((w, i) => (
                  <p key={i} style={bulletStyle}>
                    <span style={{ position: "absolute", left: 0, color: "rgba(100,220,160,0.60)" }}>&bull;</span>
                    {w}
                  </p>
                ))}
              </div>
            )}

            {/* Current Solutions */}
            {currentSolutions.length > 0 && (
              <div style={{ background: "rgba(184,156,74,0.04)", border: "1px solid rgba(184,156,74,0.12)", borderRadius: "10px", padding: "14px 16px" }}>
                <p style={{ ...sectionHeader, color: "rgba(184,156,74,0.80)" }}>Current Solutions</p>
                {currentSolutions.map((s, i) => (
                  <p key={i} style={bulletStyle}>
                    <span style={{ position: "absolute", left: 0, color: "rgba(184,156,74,0.60)" }}>&bull;</span>
                    {s}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CallTranscriptViewer({ transcript, track }: { transcript: string; track?: string }) {
  const [open, setOpen] = useState(false);
  const trackKey = (track ?? "unknown").toLowerCase();
  const tc = TRACK_COLORS[trackKey] ?? TRACK_COLORS.unknown;
  const lines = transcript.split("\n").filter(Boolean);
  return (
    <div style={{ paddingTop: "16px", paddingBottom: "4px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: open ? "12px" : 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", margin: 0 }}>
            Call Transcript
          </p>
          {track && (
            <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: "999px", fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: tc.bg, color: tc.text, border: `1px solid ${tc.border}`, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif" }}>
              {track} track
            </span>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "6px", border: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.04)", color: "rgba(200,215,230,0.60)", cursor: "pointer" }}
        >
          {open ? "Hide" : "View"}
        </button>
      </div>
      {open && (
        <div style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "14px 16px", maxHeight: "320px", overflowY: "auto" }}>
          {lines.map((line, i) => {
            const isAiiA = line.startsWith("AiiA:");
            const isCaller = line.startsWith("Caller:");
            return (
              <div key={i} style={{ marginBottom: "8px", display: "flex", gap: "8px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: isAiiA ? "rgba(184,156,74,0.80)" : isCaller ? "rgba(120,200,255,0.80)" : "rgba(200,215,230,0.35)", minWidth: "48px", paddingTop: "1px" }}>
                  {isAiiA ? "AiiA" : isCaller ? "Caller" : ""}
                </span>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", lineHeight: 1.55, color: isAiiA ? "rgba(200,215,230,0.75)" : "rgba(200,215,230,0.90)" }}>
                  {line.replace(/^(AiiA:|Caller:)\s*/, "")}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LeadRow({ lead, onStatusChange, onRerunDiagnostic }: { lead: Lead; onStatusChange: (id: number, status: Lead["status"]) => void; onRerunDiagnostic: (id: number) => Promise<unknown> }) {
  const [expanded, setExpanded] = useState(false);
  const [isRerunning, setIsRerunning] = useState(false);
  const [notes, setNotes] = useState(lead.adminNotes ?? "");
  const [notesSaved, setNotesSaved] = useState(false);

  const saveNotes = trpc.leads.saveNotes.useMutation({
    onSuccess: () => {
      setNotesSaved(true);
      setTimeout(() => setNotesSaved(false), 2000);
    },
    onError: () => toast.error("Failed to save notes"),
  });

  async function handleRerun(id: number) {
    setIsRerunning(true);
    try {
      await onRerunDiagnostic(id);
    } finally {
      setIsRerunning(false);
    }
  }

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        style={{
          cursor: "pointer",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <td style={tdStyle}>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.90)" }}>
            {lead.name}
          </span>
          <br />
          <a href={`mailto:${lead.email}`} style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(184,156,74,0.75)", textDecoration: "none" }}>
            {lead.email}
          </a>
          {/* Notes preview — only shown when there are saved notes */}
          {lead.adminNotes && (
            <div style={{ marginTop: "4px", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", color: "rgba(200,215,230,0.40)", fontStyle: "italic", maxWidth: "220px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={lead.adminNotes}>
              ✏️ {lead.adminNotes.length > 60 ? lead.adminNotes.slice(0, 60) + "…" : lead.adminNotes}
            </div>
          )}
        </td>
        <td style={tdStyle}>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.60)" }}>
            {lead.company || "—"}
          </span>
        </td>
        {/* Source column */}
        <td style={tdStyle}>
          {lead.leadSource ? (
            <span
              style={{
                display: "inline-block",
                padding: "2px 8px",
                borderRadius: "4px",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.04em",
                background: "rgba(120,100,200,0.10)",
                color: "rgba(160,140,255,0.85)",
                border: "1px solid rgba(120,100,200,0.20)",
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                maxWidth: "120px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              title={lead.leadSource}
            >
              {lead.leadSource}
            </span>
          ) : (
            <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.25)" }}>—</span>
          )}
        </td>
        <td style={tdStyle}>
          <span
            style={{
              display: "inline-block",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 600,
              background: lead.type === "intake" ? "rgba(184,156,74,0.08)" : "rgba(255,255,255,0.04)",
              color: lead.type === "intake" ? "rgba(184,156,74,0.80)" : "rgba(200,215,230,0.50)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
            }}
          >
            {TYPE_LABELS[lead.type]}
          </span>
        </td>
        <td style={tdStyle}>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: lead.investmentType ? "rgba(184,156,74,0.80)" : "rgba(200,215,230,0.35)" }}>
            {lead.investmentType || "—"}
          </span>
        </td>
        <td style={tdStyle}>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", fontWeight: lead.budgetRange ? 600 : 400, color: lead.budgetRange ? "rgba(100,220,160,0.85)" : "rgba(200,215,230,0.35)" }}>
            {lead.budgetRange || "—"}
          </span>
        </td>
        <td style={tdStyle}>
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.55)" }}>
            {lead.industry || "—"}
          </span>
        </td>
        <td style={tdStyle}>
          <StatusBadge status={lead.status} />
        </td>
        <td style={tdStyle}>
          {/* Age chip */}
          {(() => {
            const ageMs = Date.now() - new Date(lead.createdAt).getTime();
            const ageDays = Math.floor(ageMs / (1000 * 60 * 60 * 24));
            const ageLabel = ageDays === 0 ? "Today" : ageDays === 1 ? "1d" : `${ageDays}d`;
            const chipColor = ageDays < 3
              ? { bg: "rgba(80,220,150,0.10)", text: "rgba(80,220,150,0.90)", border: "rgba(80,220,150,0.25)" }
              : ageDays < 7
              ? { bg: "rgba(255,180,60,0.10)", text: "rgba(255,180,60,0.90)", border: "rgba(255,180,60,0.25)" }
              : { bg: "rgba(255,80,80,0.10)", text: "rgba(255,100,100,0.90)", border: "rgba(255,80,80,0.25)" };
            return (
              <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: "4px", fontSize: "11px", fontWeight: 700, background: chipColor.bg, color: chipColor.text, border: `1px solid ${chipColor.border}`, fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", width: "fit-content" }}>
                  {ageLabel}
                </span>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", color: "rgba(200,215,230,0.35)" }}>
                  {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            );
          })()}
        </td>
        <td style={{ ...tdStyle, textAlign: "right" }}>
          <span style={{ color: "rgba(200,215,230,0.35)", fontSize: "12px" }}>{expanded ? "▲" : "▼"}</span>
        </td>
      </tr>

      {expanded && (
        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <td colSpan={10} style={{ padding: "0 16px 20px", background: "rgba(184,156,74,0.03)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px", padding: "16px 0 12px" }}>
              {lead.phone && (
                <div>
                  <p style={labelStyle}>Phone</p>
                  <p style={valueStyle}>{lead.phone}</p>
                </div>
              )}
              {lead.leadSource && (
                <div>
                  <p style={labelStyle}>Lead Source</p>
                  <p style={{ ...valueStyle, color: "rgba(160,140,255,0.85)" }}>{lead.leadSource}</p>
                </div>
              )}
              {lead.problemCategory && (
                <div>
                  <p style={labelStyle}>Problem / Challenge</p>
                  <p style={{ ...valueStyle, color: "rgba(184,156,74,0.85)" }}>{lead.problemCategory}</p>
                </div>
              )}
              {lead.callPreference && (
                <div>
                  <p style={labelStyle}>Call Preference</p>
                  <p style={valueStyle}>{lead.callPreference}</p>
                </div>
              )}
              {lead.engagementModel && (
                <div>
                  <p style={labelStyle}>Engagement Model</p>
                  <p style={valueStyle}>{lead.engagementModel}</p>
                </div>
              )}
              {lead.annualRevenue && (
                <div>
                  <p style={labelStyle}>Annual Revenue</p>
                  <p style={valueStyle}>{lead.annualRevenue}</p>
                </div>
              )}
              {lead.message && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={labelStyle}>Message / Problem Detail</p>
                  <p style={{ ...valueStyle, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{lead.message}</p>
                </div>
              )}
            </div>

            {/* AI Diagnostic Panel */}
            {(lead.diagnosticSnapshot || lead.leadBrief) && (
              <div style={{ marginTop: "16px", marginBottom: "4px" }}>
                <div
                  style={{
                    borderTop: "1px solid rgba(184,156,74,0.18)",
                    paddingTop: "16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <span
                      style={{
                        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(184,156,74,0.75)",
                        background: "rgba(184,156,74,0.08)",
                        border: "1px solid rgba(184,156,74,0.20)",
                        padding: "3px 10px",
                        borderRadius: "4px",
                      }}
                    >
                      AI Diagnostic — Owner Only
                    </span>
                  </div>

                  {lead.diagnosticSnapshot && (
                    <div
                      style={{
                        background: "rgba(5,8,16,0.70)",
                        border: "1px solid rgba(184,156,74,0.12)",
                        borderRadius: "10px",
                        padding: "16px 20px",
                      }}
                    >
                      <pre
                        style={{
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                          fontSize: "12px",
                          lineHeight: 1.7,
                          color: "rgba(200,215,230,0.80)",
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                          margin: 0,
                        }}
                      >
                        {lead.diagnosticSnapshot}
                      </pre>
                    </div>
                  )}

                  {lead.leadBrief && (
                    <div>
                      <p style={labelStyle}>Preview — What the Lead Received</p>
                      <p
                        style={{
                          ...valueStyle,
                          fontStyle: "italic",
                          color: "rgba(184,156,74,0.70)",
                          lineHeight: 1.6,
                          borderLeft: "2px solid rgba(184,156,74,0.25)",
                          paddingLeft: "12px",
                          margin: "4px 0 0",
                        }}
                      >
                        {lead.leadBrief}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Re-run Diagnostic button */}
            <div style={{ paddingTop: "12px", paddingBottom: "12px" }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isRerunning) handleRerun(lead.id);
                }}
                disabled={isRerunning}
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  padding: "7px 16px",
                  borderRadius: "7px",
                  border: `1px solid ${isRerunning ? "rgba(184,156,74,0.18)" : "rgba(184,156,74,0.35)"}`,
                  background: isRerunning ? "rgba(184,156,74,0.04)" : "rgba(184,156,74,0.08)",
                  color: isRerunning ? "rgba(184,156,74,0.45)" : "rgba(184,156,74,0.90)",
                  cursor: isRerunning ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.15s",
                  opacity: isRerunning ? 0.7 : 1,
                }}
                onMouseEnter={e => {
                  if (!isRerunning) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,156,74,0.16)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,156,74,0.55)";
                  }
                }}
                onMouseLeave={e => {
                  if (!isRerunning) {
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,156,74,0.08)";
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,156,74,0.35)";
                  }
                }}
              >
                {isRerunning ? (
                  <>
                    <span style={{ display: "inline-block", animation: "spin 1s linear infinite", fontSize: "13px" }}>↺</span>
                    Running…
                  </>
                ) : (
                  <>↺ Re-run Diagnostic</>
                )}
              </button>
            </div>

            {/* Conversation Intelligence */}
            <ConversationIntelligencePanel lead={lead} />

            {/* Call Transcript */}
            {lead.callTranscript && (
              <CallTranscriptViewer transcript={lead.callTranscript} track={lead.callTrack ?? undefined} />
            )}

            {/* Admin Notes */}
            <div style={{ paddingTop: "16px", paddingBottom: "4px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", margin: "0 0 8px" }}>
                Internal Notes
              </p>
              <textarea
                value={notes}
                onChange={(e) => { setNotes(e.target.value); setNotesSaved(false); }}
                onClick={(e) => e.stopPropagation()}
                placeholder="Call outcomes, follow-up dates, internal context…"
                rows={3}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  color: "rgba(200,215,230,0.85)",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                  fontSize: "13px",
                  lineHeight: 1.55,
                  resize: "vertical",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(184,156,74,0.35)"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
              />
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "6px" }}>
                <button
                  onClick={(e) => { e.stopPropagation(); saveNotes.mutate({ id: lead.id, notes }); }}
                  disabled={saveNotes.isPending}
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: "6px",
                    border: notesSaved ? "1px solid rgba(80,220,150,0.35)" : "1px solid rgba(255,255,255,0.12)",
                    background: notesSaved ? "rgba(80,220,150,0.08)" : "rgba(255,255,255,0.05)",
                    color: notesSaved ? "rgba(80,220,150,0.90)" : "rgba(200,215,230,0.65)",
                    cursor: saveNotes.isPending ? "not-allowed" : "pointer",
                    transition: "all 0.15s",
                  }}
                >
                  {saveNotes.isPending ? "Saving…" : notesSaved ? "✓ Saved" : "Save Notes"}
                </button>
              </div>
            </div>

            {/* Status controls */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", alignSelf: "center", marginRight: "4px" }}>
                Move to:
              </span>
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(lead.id, s);
                  }}
                  disabled={lead.status === s}
                  style={{
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                    fontSize: "12px",
                    fontWeight: 600,
                    padding: "5px 14px",
                    borderRadius: "6px",
                    border: `1px solid ${lead.status === s ? STATUS_COLORS[s].border : "rgba(255,255,255,0.10)"}`,
                    background: lead.status === s ? STATUS_COLORS[s].bg : "transparent",
                    color: lead.status === s ? STATUS_COLORS[s].text : "rgba(200,215,230,0.55)",
                    cursor: lead.status === s ? "default" : "pointer",
                    opacity: lead.status === s ? 1 : 0.8,
                    transition: "all 0.15s",
                  }}
                >
                  {STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

const tdStyle: React.CSSProperties = {
  padding: "14px 16px",
  verticalAlign: "middle",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
  fontSize: "10px",
  fontWeight: 800,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(200,215,230,0.35)",
  margin: "0 0 4px",
};

const valueStyle: React.CSSProperties = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
  fontSize: "13px",
  color: "rgba(200,215,230,0.75)",
  margin: 0,
};

export default function AdminLeadsPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");

  const { data: leads, isLoading, refetch } = trpc.leads.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  const rerunDiagnostic = trpc.leads.rerunDiagnostic.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Diagnostic re-run complete — owner notified");
    },
    onError: (err) => toast.error(`Re-run failed: ${err.message}`),
  });

  // Auth guard
  if (loading) {
    return (
      <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", color: "rgba(200,215,230,0.40)", fontSize: "14px" }}>Loading…</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "32px", fontWeight: 700, color: "rgba(255,255,255,0.90)", marginBottom: "16px" }}>
            Sign In Required
          </h1>
          <a
            href={getLoginUrl()}
            style={{
              display: "inline-block",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              color: "#03050A",
              background: "rgba(184,156,74,0.90)",
              padding: "12px 28px",
              borderRadius: "8px",
              textDecoration: "none",
            }}
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  const filteredLeads = leads
    ? filter === "all"
      ? leads
      : leads.filter((l) => l.status === filter)
    : [];

  function exportToCSV() {
    if (!leads || leads.length === 0) {
      toast.error("No leads to export");
      return;
    }
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Company",
      "Industry",
      "Lead Source",
      "Problem / Challenge",
      "Call Preference",
      "Type",
      "Investment Type",
      "Budget Range",
      "Engagement Model",
      "Annual Revenue",
      "Message",
      "Status",
      "Date",
    ];
    const rows = leads.map((l) => [
      l.id,
      l.name,
      l.email,
      l.phone || "",
      l.company || "",
      l.industry || "",
      l.leadSource || "",
      l.problemCategory || "",
      l.callPreference || "",
      l.type,
      l.investmentType || "",
      l.budgetRange || "",
      l.engagementModel || "",
      l.annualRevenue || "",
      (l.message || "").replace(/\n/g, " "),
      l.status,
      new Date(l.createdAt).toISOString(),
    ]);
    const escape = (v: string | number) => {
      const s = String(v);
      return s.includes(",") || s.includes('"') || s.includes("\n")
        ? `"${s.replace(/"/g, '""')}"`
        : s;
    };
    const csv = [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aiia-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${leads.length} leads to CSV`);
  }

  const counts = leads
    ? {
        all: leads.length,
        new: leads.filter((l) => l.status === "new").length,
        diagnostic_ready: leads.filter((l) => l.status === "diagnostic_ready").length,
        reviewed: leads.filter((l) => l.status === "reviewed").length,
        contacted: leads.filter((l) => l.status === "contacted").length,
        closed: leads.filter((l) => l.status === "closed").length,
      }
    : { all: 0, new: 0, diagnostic_ready: 0, reviewed: 0, contacted: 0, closed: 0 };

  return (
    <div style={{ background: "#03050A", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "20px 0",
          background: "rgba(5,8,16,0.95)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "20px", fontWeight: 700, color: "rgba(184,156,74,0.90)" }}>
                AiiAco
              </span>
            </a>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: "16px" }}>/</span>
            <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", fontWeight: 600, color: "rgba(200,215,230,0.55)", letterSpacing: "0.04em" }}>
              Lead Pipeline
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Diagnostic Ready badge — only shown when there are leads awaiting review */}
            {counts.diagnostic_ready > 0 && (
              <div
                title={`${counts.diagnostic_ready} lead${counts.diagnostic_ready > 1 ? "s" : ""} with completed diagnostics awaiting review`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "5px 11px",
                  borderRadius: "999px",
                  background: "rgba(120,200,255,0.10)",
                  border: "1px solid rgba(120,200,255,0.28)",
                  cursor: "default",
                }}
              >
                <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(120,200,255,0.90)", boxShadow: "0 0 6px rgba(120,200,255,0.55)", flexShrink: 0, display: "inline-block", animation: "pulse-dot 2s ease-in-out infinite" }} />
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(120,200,255,0.90)" }}>
                  {counts.diagnostic_ready} Diagnostic{counts.diagnostic_ready > 1 ? "s" : ""} Ready
                </span>
              </div>
            )}
            <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.45)" }}>
              {user?.name || user?.email}
            </span>
            <button
              onClick={exportToCSV}
              style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                padding: "7px 16px",
                borderRadius: "7px",
                border: "1px solid rgba(184,156,74,0.35)",
                background: "rgba(184,156,74,0.10)",
                color: "rgba(184,156,74,0.90)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.15s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,156,74,0.18)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,156,74,0.55)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,156,74,0.10)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,156,74,0.35)";
              }}
            >
              <span>↓</span> Export CSV
            </button>
            <a href="/admin/agent" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(200,215,230,0.60)", textDecoration: "none", display: "flex", alignItems: "center", gap: "5px" }}>
              🤖 Agent Config
            </a>
            <a href="/" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(184,156,74,0.70)", textDecoration: "none" }}>
              ← Site
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Title + stats */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "rgba(255,255,255,0.92)",
              letterSpacing: "-0.02em",
              marginBottom: "24px",
            }}
          >
            Lead Pipeline
          </h1>

          {/* Stat cards */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "28px" }}>
            {(["all", ...ALL_STATUSES] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  padding: "8px 18px",
                  borderRadius: "8px",
                  border: `1px solid ${filter === s ? "rgba(184,156,74,0.40)" : "rgba(255,255,255,0.08)"}`,
                  background: filter === s ? "rgba(184,156,74,0.10)" : "rgba(255,255,255,0.03)",
                  color: filter === s ? "rgba(184,156,74,0.90)" : "rgba(200,215,230,0.55)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ textTransform: "capitalize" }}>{s === "all" ? "All Leads" : STATUS_LABELS[s as Lead["status"]]}</span>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: filter === s ? "rgba(184,156,74,0.20)" : "rgba(255,255,255,0.06)",
                    fontSize: "11px",
                    fontWeight: 800,
                  }}
                >
                  {counts[s]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "14px",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <div style={{ padding: "60px", textAlign: "center", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", color: "rgba(200,215,230,0.35)", fontSize: "14px" }}>
              Loading leads…
            </div>
          ) : filteredLeads.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center" }}>
              <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.50)", marginBottom: "8px" }}>
                No leads yet
              </p>
              <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", color: "rgba(200,215,230,0.35)" }}>
                Submissions from the contact forms will appear here.
              </p>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    {["Contact", "Company", "Source", "Type", "Investment", "Budget", "Industry", "Status", "Date", ""].map((h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                          fontSize: "10px",
                          fontWeight: 800,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(200,215,230,0.35)",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <LeadRow
                      key={lead.id}
                      lead={lead}
                      onStatusChange={(id, status) => updateStatus.mutate({ id, status })}
                      onRerunDiagnostic={(id) => rerunDiagnostic.mutateAsync({ id })}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
