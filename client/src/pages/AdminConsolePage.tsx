/*
 * AiiACo — Secret Admin Console
 * Route: /admin-opsteam (not linked anywhere, not in sitemap)
 * Owner-only: requires authentication + admin role
 */

import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";
import type { Lead } from "../../../drizzle/schema";

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";
const FFD = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

const STATUS_COLORS: Record<Lead["status"], { bg: string; text: string; border: string }> = {
  new: { bg: "rgba(184,156,74,0.14)", text: "rgba(212,180,80,1)", border: "rgba(184,156,74,0.35)" },
  reviewed: { bg: "rgba(100,160,255,0.12)", text: "rgba(120,175,255,1)", border: "rgba(100,160,255,0.30)" },
  contacted: { bg: "rgba(80,220,150,0.12)", text: "rgba(80,220,150,1)", border: "rgba(80,220,150,0.30)" },
  closed: { bg: "rgba(255,255,255,0.05)", text: "rgba(200,215,230,0.40)", border: "rgba(255,255,255,0.10)" },
};

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "New", reviewed: "Reviewed", contacted: "Contacted", closed: "Closed",
};

const TYPE_LABELS: Record<Lead["type"], string> = {
  call: "Call Request", intake: "Full Intake",
};

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px 24px" }}>
      <p style={{ fontFamily: FF, fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", margin: "0 0 8px" }}>{label}</p>
      <p style={{ fontFamily: FFD, fontSize: "36px", fontWeight: 700, color: "rgba(255,255,255,0.92)", margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.40)", margin: "6px 0 0" }}>{sub}</p>}
    </div>
  );
}

function LeadRow({ lead, onStatusChange }: { lead: Lead; onStatusChange: (id: number, status: Lead["status"]) => void }) {
  const [expanded, setExpanded] = useState(false);
  const c = STATUS_COLORS[lead.status];

  return (
    <>
      <tr
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer", borderBottom: "1px solid rgba(255,255,255,0.04)", transition: "background 0.15s" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.025)")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
          <p style={{ fontFamily: FFD, fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.88)", margin: 0 }}>{lead.name}</p>
          <a href={`mailto:${lead.email}`} style={{ fontFamily: FF, fontSize: "12px", color: "rgba(184,156,74,0.70)", textDecoration: "none" }}>{lead.email}</a>
        </td>
        <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
          <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.55)" }}>{lead.company || "—"}</span>
        </td>
        <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
          <span style={{ fontFamily: FF, fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px", background: lead.type === "intake" ? "rgba(184,156,74,0.08)" : "rgba(255,255,255,0.04)", color: lead.type === "intake" ? "rgba(184,156,74,0.80)" : "rgba(200,215,230,0.45)" }}>
            {TYPE_LABELS[lead.type]}
          </span>
        </td>
        <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
          <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.50)" }}>{lead.industry || "—"}</span>
        </td>
        <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
          <span style={{ display: "inline-block", padding: "3px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", background: c.bg, color: c.text, border: `1px solid ${c.border}`, fontFamily: FF }}>
            {STATUS_LABELS[lead.status]}
          </span>
        </td>
        <td style={{ padding: "14px 16px", verticalAlign: "middle" }}>
          <span style={{ fontFamily: FF, fontSize: "11px", color: "rgba(200,215,230,0.35)" }}>
            {new Date(lead.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
        </td>
        <td style={{ padding: "14px 16px", verticalAlign: "middle", textAlign: "right" }}>
          <span style={{ color: "rgba(200,215,230,0.30)", fontSize: "11px" }}>{expanded ? "▲" : "▼"}</span>
        </td>
      </tr>

      {expanded && (
        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <td colSpan={7} style={{ padding: "0 16px 20px", background: "rgba(184,156,74,0.02)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px", padding: "16px 0 12px" }}>
              {lead.phone && (
                <div>
                  <p style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.30)", margin: "0 0 4px" }}>Phone</p>
                  <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.70)", margin: 0 }}>{lead.phone}</p>
                </div>
              )}
              {lead.engagementModel && (
                <div>
                  <p style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.30)", margin: "0 0 4px" }}>Engagement Model</p>
                  <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.70)", margin: 0 }}>{lead.engagementModel}</p>
                </div>
              )}
              {lead.annualRevenue && (
                <div>
                  <p style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.30)", margin: "0 0 4px" }}>Annual Revenue</p>
                  <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.70)", margin: 0 }}>{lead.annualRevenue}</p>
                </div>
              )}
              {lead.message && (
                <div style={{ gridColumn: "1 / -1" }}>
                  <p style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.30)", margin: "0 0 4px" }}>Message</p>
                  <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.70)", margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{lead.message}</p>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", paddingTop: "12px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.35)", alignSelf: "center", marginRight: "4px" }}>Move to:</span>
              {(["new", "reviewed", "contacted", "closed"] as Lead["status"][]).map((s) => {
                const sc = STATUS_COLORS[s];
                return (
                  <button
                    key={s}
                    onClick={(e) => { e.stopPropagation(); onStatusChange(lead.id, s); }}
                    disabled={lead.status === s}
                    style={{
                      fontFamily: FF, fontSize: "12px", fontWeight: 600, padding: "5px 14px", borderRadius: "6px",
                      border: `1px solid ${lead.status === s ? sc.border : "rgba(255,255,255,0.08)"}`,
                      background: lead.status === s ? sc.bg : "transparent",
                      color: lead.status === s ? sc.text : "rgba(200,215,230,0.50)",
                      cursor: lead.status === s ? "default" : "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                );
              })}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function AdminConsolePage() {
  const { user, loading, isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");
  const [search, setSearch] = useState("");

  const { data: leads, isLoading, refetch } = trpc.leads.list.useQuery(undefined, {
    enabled: isAuthenticated,
  });

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { refetch(); toast.success("Status updated"); },
    onError: () => toast.error("Failed to update status"),
  });

  // Auth guard — loading
  if (loading) {
    return (
      <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FF, color: "rgba(200,215,230,0.35)", fontSize: "14px" }}>Authenticating…</div>
      </div>
    );
  }

  // Auth guard — not signed in
  if (!isAuthenticated) {
    return (
      <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", maxWidth: "360px" }}>
          <div style={{ width: "48px", height: "48px", background: "rgba(184,156,74,0.10)", border: "1px solid rgba(184,156,74,0.25)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <span style={{ fontSize: "22px" }}>🔒</span>
          </div>
          <h1 style={{ fontFamily: FFD, fontSize: "28px", fontWeight: 700, color: "rgba(255,255,255,0.90)", marginBottom: "10px" }}>Admin Access Required</h1>
          <p style={{ fontFamily: FF, fontSize: "14px", color: "rgba(200,215,230,0.45)", marginBottom: "28px", lineHeight: 1.6 }}>This console is restricted to authorised AiiAco administrators.</p>
          <a href={getLoginUrl()} style={{ display: "inline-block", fontFamily: FF, fontSize: "14px", fontWeight: 700, color: "#03050A", background: "rgba(184,156,74,0.90)", padding: "12px 32px", borderRadius: "8px", textDecoration: "none" }}>
            Sign In
          </a>
        </div>
      </div>
    );
  }

  // Compute stats
  const allLeads = leads ?? [];
  const byStatus = (s: Lead["status"]) => allLeads.filter((l) => l.status === s).length;
  const intakeLeads = allLeads.filter((l) => l.type === "intake").length;

  // Filter + search
  const visible = allLeads
    .filter((l) => filter === "all" || l.status === filter)
    .filter((l) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q) ||
        (l.industry ?? "").toLowerCase().includes(q)
      );
    });

  return (
    <div style={{ background: "#03050A", minHeight: "100vh", color: "rgba(255,255,255,0.88)" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "32px", height: "32px", background: "rgba(184,156,74,0.12)", border: "1px solid rgba(184,156,74,0.28)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "14px" }}>⚙</span>
            </div>
            <div>
              <p style={{ fontFamily: FFD, fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: 0 }}>AiiAco Operations Console</p>
              <p style={{ fontFamily: FF, fontSize: "11px", color: "rgba(184,156,74,0.60)", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>Restricted Access</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.45)" }}>
              {user?.name ?? user?.email}
            </span>
            <a href="/" style={{ fontFamily: FF, fontSize: "12px", color: "rgba(184,156,74,0.70)", textDecoration: "none", padding: "6px 14px", border: "1px solid rgba(184,156,74,0.20)", borderRadius: "6px" }}>
              ← Main Site
            </a>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 32px" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "16px", marginBottom: "40px" }}>
          <StatCard label="Total Leads" value={allLeads.length} sub="All time" />
          <StatCard label="New" value={byStatus("new")} sub="Awaiting review" />
          <StatCard label="Contacted" value={byStatus("contacted")} sub="In conversation" />
          <StatCard label="Full Intakes" value={intakeLeads} sub="Structured submissions" />
          <StatCard label="Closed" value={byStatus("closed")} sub="Resolved" />
        </div>

        {/* Leads table */}
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", overflow: "hidden" }}>
          {/* Table toolbar */}
          <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <p style={{ fontFamily: FFD, fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.88)", margin: 0, flex: 1 }}>Lead Pipeline</p>

            {/* Search */}
            <input
              type="text"
              placeholder="Search name, email, company…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ fontFamily: FF, fontSize: "13px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", padding: "8px 14px", color: "rgba(255,255,255,0.80)", outline: "none", width: "240px" }}
            />

            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "4px" }}>
              {(["all", "new", "reviewed", "contacted", "closed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  style={{
                    fontFamily: FF, fontSize: "12px", fontWeight: 600, padding: "6px 14px", borderRadius: "6px",
                    border: filter === s ? "1px solid rgba(184,156,74,0.35)" : "1px solid rgba(255,255,255,0.07)",
                    background: filter === s ? "rgba(184,156,74,0.10)" : "transparent",
                    color: filter === s ? "rgba(212,180,80,0.95)" : "rgba(200,215,230,0.45)",
                    cursor: "pointer", transition: "all 0.15s",
                    textTransform: "capitalize",
                  }}
                >
                  {s === "all" ? "All" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          {isLoading ? (
            <div style={{ padding: "60px", textAlign: "center", fontFamily: FF, fontSize: "14px", color: "rgba(200,215,230,0.35)" }}>Loading leads…</div>
          ) : visible.length === 0 ? (
            <div style={{ padding: "60px", textAlign: "center", fontFamily: FF, fontSize: "14px", color: "rgba(200,215,230,0.35)" }}>
              {allLeads.length === 0 ? "No leads yet. Form submissions will appear here." : "No leads match the current filter."}
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                    {["Contact", "Company", "Type", "Industry", "Status", "Date", ""].map((h) => (
                      <th key={h} style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.30)", padding: "12px 16px", textAlign: "left" }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visible.map((lead) => (
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

        <p style={{ fontFamily: FF, fontSize: "11px", color: "rgba(200,215,230,0.20)", textAlign: "center", marginTop: "32px" }}>
          AiiAco Operations Console · Restricted · Do not share this URL
        </p>
      </div>
    </div>
  );
}
