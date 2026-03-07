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

function LeadRow({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: number, status: Lead["status"]) => void }) {
  const [expanded, setExpanded] = useState(false);

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
          <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", color: "rgba(200,215,230,0.40)" }}>
            {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
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

            {/* Status controls */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", alignSelf: "center", marginRight: "4px" }}>
                Move to:
              </span>
              {(["new", "reviewed", "contacted", "closed"] as Lead["status"][]).map((s) => (
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
        reviewed: leads.filter((l) => l.status === "reviewed").length,
        contacted: leads.filter((l) => l.status === "contacted").length,
        closed: leads.filter((l) => l.status === "closed").length,
      }
    : { all: 0, new: 0, reviewed: 0, contacted: 0, closed: 0 };

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
            {(["all", "new", "reviewed", "contacted", "closed"] as const).map((s) => (
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
