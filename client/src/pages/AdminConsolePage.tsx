/*
 * AiiACo — Admin Operations Console
 * Route: /admin-opsteam (not linked anywhere, not in sitemap)
 * Dedicated username/password auth — independent of Manus OAuth
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { trpc } from "@/lib/trpc";
import { setAdminToken, clearAdminToken } from "@/lib/adminToken";
import { toast } from "sonner";
import type { Lead } from "../../../drizzle/schema";

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";
const FFD = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  fontFamily: FF,
  fontSize: "14px",
  color: "rgba(255,255,255,0.88)",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.10)",
  borderRadius: "8px",
  padding: "10px 14px",
  width: "100%",
  outline: "none",
  boxSizing: "border-box",
};

const btnGold: React.CSSProperties = {
  fontFamily: FF,
  fontSize: "14px",
  fontWeight: 700,
  color: "#03050A",
  background: "rgba(184,156,74,0.90)",
  border: "none",
  borderRadius: "8px",
  padding: "11px 28px",
  cursor: "pointer",
  width: "100%",
};

const btnGhost: React.CSSProperties = {
  fontFamily: FF,
  fontSize: "13px",
  fontWeight: 600,
  color: "rgba(200,215,230,0.55)",
  background: "transparent",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "6px",
  padding: "7px 16px",
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  fontFamily: FF,
  fontSize: "12px",
  fontWeight: 600,
  color: "rgba(255,100,100,0.80)",
  background: "rgba(255,60,60,0.06)",
  border: "1px solid rgba(255,60,60,0.18)",
  borderRadius: "6px",
  padding: "5px 12px",
  cursor: "pointer",
};

// ─── Status colours ───────────────────────────────────────────────────────────

const STATUS_COLORS: Record<Lead["status"], { bg: string; text: string; border: string }> = {
  new: { bg: "rgba(184,156,74,0.14)", text: "rgba(212,180,80,1)", border: "rgba(184,156,74,0.35)" },
  diagnostic_ready: { bg: "rgba(120,200,255,0.10)", text: "rgba(120,200,255,0.92)", border: "rgba(120,200,255,0.28)" },
  reviewed: { bg: "rgba(100,160,255,0.12)", text: "rgba(120,175,255,1)", border: "rgba(100,160,255,0.30)" },
  contacted: { bg: "rgba(80,220,150,0.12)", text: "rgba(80,220,150,1)", border: "rgba(80,220,150,0.30)" },
  closed: { bg: "rgba(255,255,255,0.05)", text: "rgba(200,215,230,0.40)", border: "rgba(255,255,255,0.10)" },
  incomplete: { bg: "rgba(255,180,60,0.10)", text: "rgba(255,180,60,0.90)", border: "rgba(255,180,60,0.25)" },
  abandoned: { bg: "rgba(255,80,80,0.08)", text: "rgba(255,80,80,0.65)", border: "rgba(255,80,80,0.18)" },
};

const STATUS_LABELS: Record<Lead["status"], string> = {
  new: "New", diagnostic_ready: "Diagnostic Ready", reviewed: "Reviewed", contacted: "Contacted", closed: "Closed", incomplete: "Incomplete", abandoned: "Abandoned",
};

const TYPE_LABELS: Record<Lead["type"], string> = {
  call: "Call Request", intake: "Full Intake",
};

// ─── Setup Page (first-time owner account creation) ───────────────────────────

function SetupPage({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "", displayName: "" });
  const [loading, setLoading] = useState(false);

  const setup = trpc.adminAuth.setup.useMutation({
    onSuccess: (data) => {
      if (data.token) setAdminToken(data.token);
      toast.success("Owner account created. Signing you in…");
      onDone();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    setup.mutate({
      username: form.username,
      password: form.password,
      displayName: form.displayName || undefined,
    });
    setLoading(false);
  };

  return (
    <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "420px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png"
            alt="AiiA logo"
            style={{ height: "56px", width: "auto", objectFit: "contain", margin: "0 auto 20px", display: "block" }}
          />
          <h1 style={{ fontFamily: FFD, fontSize: "26px", fontWeight: 700, color: "rgba(255,255,255,0.92)", margin: "0 0 8px" }}>Initial Setup</h1>
          <p style={{ fontFamily: FF, fontSize: "14px", color: "rgba(200,215,230,0.45)", margin: 0, lineHeight: 1.6 }}>
            Create your owner account to access the AiiAco Operations Console.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", display: "block", marginBottom: "6px" }}>Display Name</label>
            <input
              style={inputStyle}
              placeholder="Your name"
              value={form.displayName}
              onChange={(e) => setForm(f => ({ ...f, displayName: e.target.value }))}
            />
          </div>
          <div>
            <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", display: "block", marginBottom: "6px" }}>Username <span style={{ color: "rgba(212,180,80,0.7)" }}>*</span></label>
            <input
              style={inputStyle}
              placeholder="e.g. nemr"
              value={form.username}
              onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
              required
              autoComplete="username"
            />
          </div>
          <div>
            <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", display: "block", marginBottom: "6px" }}>Password <span style={{ color: "rgba(212,180,80,0.7)" }}>*</span></label>
            <input
              style={inputStyle}
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
              required
              autoComplete="new-password"
            />
          </div>
          <div>
            <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", display: "block", marginBottom: "6px" }}>Confirm Password <span style={{ color: "rgba(212,180,80,0.7)" }}>*</span></label>
            <input
              style={inputStyle}
              type="password"
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={(e) => setForm(f => ({ ...f, confirmPassword: e.target.value }))}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" style={{ ...btnGold, marginTop: "6px", opacity: loading ? 0.6 : 1 }} disabled={loading}>
            {loading ? "Creating Account…" : "Create Owner Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Login Page ───────────────────────────────────────────────────────────────

function LoginPage({ onLogin }: { onLogin: () => void }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const utils = trpc.useUtils();

  const login = trpc.adminAuth.login.useMutation({
    onSuccess: (data) => {
      if (data.token) setAdminToken(data.token);
      utils.adminAuth.me.invalidate();
      onLogin();
    },
    onError: (e) => toast.error(e.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(form);
  };

  return (
    <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ width: "100%", maxWidth: "380px" }}>
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <img
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png"
            alt="AiiA logo"
            style={{ height: "56px", width: "auto", objectFit: "contain", margin: "0 auto 20px", display: "block" }}
          />
          <h1 style={{ fontFamily: FFD, fontSize: "26px", fontWeight: 700, color: "rgba(255,255,255,0.92)", margin: "0 0 8px" }}>Operations Console</h1>
          <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.40)", margin: 0 }}>AiiAco — Restricted Access</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", display: "block", marginBottom: "6px" }}>Username</label>
            <input
              style={inputStyle}
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm(f => ({ ...f, username: e.target.value }))}
              required
              autoComplete="username"
              autoFocus
            />
          </div>
          <div>
            <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.40)", display: "block", marginBottom: "6px" }}>Password</label>
            <input
              style={inputStyle}
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
              required
              autoComplete="current-password"
            />
          </div>
          <button type="submit" style={{ ...btnGold, marginTop: "6px", opacity: login.isPending ? 0.6 : 1 }} disabled={login.isPending}>
            {login.isPending ? "Signing In…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── Lead Row ─────────────────────────────────────────────────────────────────

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
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(200px, 100%), 1fr))", gap: "12px", padding: "16px 0 12px" }}>
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

// ─── Admin Management Tab ─────────────────────────────────────────────────────

function AdminManagementTab({ currentUserId, currentRole }: { currentUserId: number; currentRole: string }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ username: "", password: "", displayName: "", role: "admin" as "admin" | "owner" });
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const utils = trpc.useUtils();

  const { data: admins, isLoading } = trpc.adminAuth.listAdmins.useQuery();

  const createAdmin = trpc.adminAuth.createAdmin.useMutation({
    onSuccess: () => {
      toast.success("Admin user created");
      setShowCreate(false);
      setNewAdmin({ username: "", password: "", displayName: "", role: "admin" });
      utils.adminAuth.listAdmins.invalidate();
    },
    onError: (e) => toast.error(e.message),
  });

  const deleteAdmin = trpc.adminAuth.deleteAdmin.useMutation({
    onSuccess: () => { toast.success("Admin removed"); utils.adminAuth.listAdmins.invalidate(); },
    onError: (e) => toast.error(e.message),
  });

  const changePassword = trpc.adminAuth.changePassword.useMutation({
    onSuccess: () => { toast.success("Password updated"); setShowChangePassword(false); setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); },
    onError: (e) => toast.error(e.message),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createAdmin.mutate(newAdmin);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.newPassword !== pwForm.confirmPassword) { toast.error("Passwords do not match"); return; }
    changePassword.mutate({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword });
  };

  return (
    <div style={{ maxWidth: "800px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontFamily: FFD, fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "0 0 4px" }}>Admin Users</h2>
          <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.40)", margin: 0 }}>Manage who can access this console.</p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={btnGhost} onClick={() => setShowChangePassword(!showChangePassword)}>Change My Password</button>
          {currentRole === "owner" && (
            <button style={{ ...btnGold, width: "auto" }} onClick={() => setShowCreate(!showCreate)}>+ Add Admin</button>
          )}
        </div>
      </div>

      {/* Change password form */}
      {showChangePassword && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: FFD, fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: "0 0 16px" }}>Change Password</h3>
          <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <input style={inputStyle} type="password" placeholder="Current password" value={pwForm.currentPassword} onChange={e => setPwForm(f => ({ ...f, currentPassword: e.target.value }))} required autoComplete="current-password" />
            <input style={inputStyle} type="password" placeholder="New password (min. 8 chars)" value={pwForm.newPassword} onChange={e => setPwForm(f => ({ ...f, newPassword: e.target.value }))} required autoComplete="new-password" />
            <input style={inputStyle} type="password" placeholder="Confirm new password" value={pwForm.confirmPassword} onChange={e => setPwForm(f => ({ ...f, confirmPassword: e.target.value }))} required autoComplete="new-password" />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ ...btnGold, width: "auto", padding: "10px 24px" }} disabled={changePassword.isPending}>
                {changePassword.isPending ? "Saving…" : "Update Password"}
              </button>
              <button type="button" style={btnGhost} onClick={() => setShowChangePassword(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Create admin form */}
      {showCreate && currentRole === "owner" && (
        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(184,156,74,0.15)", borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
          <h3 style={{ fontFamily: FFD, fontSize: "15px", fontWeight: 700, color: "rgba(255,255,255,0.85)", margin: "0 0 16px" }}>New Admin User</h3>
          <form onSubmit={handleCreate} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.35)", display: "block", marginBottom: "5px" }}>Display Name</label>
              <input style={inputStyle} placeholder="Full name" value={newAdmin.displayName} onChange={e => setNewAdmin(f => ({ ...f, displayName: e.target.value }))} />
            </div>
            <div>
              <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.35)", display: "block", marginBottom: "5px" }}>Username *</label>
              <input style={inputStyle} placeholder="e.g. marylou" value={newAdmin.username} onChange={e => setNewAdmin(f => ({ ...f, username: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.35)", display: "block", marginBottom: "5px" }}>Password *</label>
              <input style={inputStyle} type="password" placeholder="Min. 8 characters" value={newAdmin.password} onChange={e => setNewAdmin(f => ({ ...f, password: e.target.value }))} required />
            </div>
            <div>
              <label style={{ fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "rgba(200,215,230,0.35)", display: "block", marginBottom: "5px" }}>Role</label>
              <select
                style={{ ...inputStyle, appearance: "none" }}
                value={newAdmin.role}
                onChange={e => setNewAdmin(f => ({ ...f, role: e.target.value as "admin" | "owner" }))}
              >
                <option value="admin">Admin (leads access only)</option>
                <option value="owner">Owner (can manage admins)</option>
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", marginTop: "4px" }}>
              <button type="submit" style={{ ...btnGold, width: "auto", padding: "10px 24px" }} disabled={createAdmin.isPending}>
                {createAdmin.isPending ? "Creating…" : "Create Admin"}
              </button>
              <button type="button" style={btnGhost} onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Admin list */}
      {isLoading ? (
        <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.35)" }}>Loading…</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {(admins ?? []).map((admin) => (
            <div key={admin.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px 18px" }}>
              <div>
                <p style={{ fontFamily: FFD, fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.88)", margin: "0 0 2px" }}>
                  {admin.displayName || admin.username}
                  {admin.id === currentUserId && <span style={{ fontFamily: FF, fontSize: "11px", color: "rgba(184,156,74,0.65)", marginLeft: "8px" }}>(you)</span>}
                </p>
                <p style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.40)", margin: 0 }}>@{admin.username}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{
                  fontFamily: FF, fontSize: "11px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "3px 10px", borderRadius: "999px",
                  background: admin.role === "owner" ? "rgba(184,156,74,0.14)" : "rgba(255,255,255,0.05)",
                  color: admin.role === "owner" ? "rgba(212,180,80,1)" : "rgba(200,215,230,0.45)",
                  border: admin.role === "owner" ? "1px solid rgba(184,156,74,0.30)" : "1px solid rgba(255,255,255,0.08)",
                }}>
                  {admin.role}
                </span>
                {currentRole === "owner" && admin.id !== currentUserId && (
                  <button
                    style={btnDanger}
                    onClick={() => {
                      if (confirm(`Remove @${admin.username}?`)) deleteAdmin.mutate({ id: admin.id });
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Web Transcripts Tab ─────────────────────────────────────────────────────

/** Parse transcript JSON into typed message array */
function parseWebTranscript(jsonStr: string): Array<{ role: "user" | "ai"; text: string; timestamp?: string }> {
  try {
    const parsed = JSON.parse(jsonStr);
    if (Array.isArray(parsed)) {
      return parsed.map((m: any) => ({
        role: m.role === "user" ? "user" as const : "ai" as const,
        text: m.text ?? m.message ?? "",
        timestamp: m.timestamp,
      }));
    }
  } catch { /* fall through */ }
  return [];
}

/** Format seconds to human-readable duration */
function fmtDuration(sec: number | null | undefined): string {
  if (!sec) return "—";
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

/** Format timestamp string to short time */
function fmtTime(ts?: string): string {
  if (!ts) return "";
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  } catch { return ""; }
}

/** Check if a transcript is "live" — created recently and no duration (still in progress) */
function isLiveTranscript(t: any): boolean {
  if (t.durationSeconds != null && t.durationSeconds > 0) return false;
  const created = new Date(t.createdAt).getTime();
  const fiveMinAgo = Date.now() - 5 * 60 * 1000;
  return created > fiveMinAgo;
}

/** Full transcript viewer panel — slide-out overlay */
function TranscriptPanel({ transcript: t, onClose }: { transcript: any; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const messages = parseWebTranscript(t.transcript);
  const live = isLiveTranscript(t);
  const [copied, setCopied] = useState(false);

  const copyAll = useCallback(() => {
    const text = messages.map(m => `${m.role === "ai" ? "AiA" : "Visitor"}: ${m.text}`).join("\n\n");
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [messages]);

  // Auto-scroll to bottom on new messages (live mode)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", justifyContent: "flex-end",
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
      />

      {/* Panel */}
      <div
        style={{
          position: "relative", width: "100%", maxWidth: "640px",
          background: "#060A12", borderLeft: "1px solid rgba(184,156,74,0.15)",
          display: "flex", flexDirection: "column", overflow: "hidden",
          animation: "slideInRight 0.25s ease-out",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px",
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
              {live && (
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  padding: "3px 10px", borderRadius: "999px", fontSize: "10px", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  background: "rgba(74,222,128,0.10)", color: "rgba(74,222,128,0.90)",
                  border: "1px solid rgba(74,222,128,0.25)", fontFamily: FF,
                }}>
                  <span style={{
                    width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80",
                    boxShadow: "0 0 8px rgba(74,222,128,0.6)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }} />
                  Live
                </span>
              )}
              <h3 style={{ fontFamily: FFD, fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.92)", margin: 0 }}>
                {t.visitorName || "Anonymous"}
              </h3>
            </div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              {t.visitorEmail && (
                <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(184,156,74,0.70)" }}>
                  {t.visitorEmail}
                </span>
              )}
              {t.visitorPhone && (
                <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.50)" }}>
                  {t.visitorPhone}
                </span>
              )}
              <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.35)" }}>
                {new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                {" · "}
                {new Date(t.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div style={{ display: "flex", gap: "16px", marginTop: "8px" }}>
              <span style={{ fontFamily: FF, fontSize: "11px", color: "rgba(200,215,230,0.40)" }}>
                {messages.length} messages
              </span>
              <span style={{ fontFamily: FF, fontSize: "11px", color: "rgba(200,215,230,0.40)" }}>
                Duration: {fmtDuration(t.durationSeconds)}
              </span>
              {t.leadId && (
                <span style={{
                  fontFamily: FF, fontSize: "10px", fontWeight: 700,
                  color: "rgba(80,220,150,0.80)", background: "rgba(80,220,150,0.10)",
                  padding: "2px 8px", borderRadius: "4px",
                }}>
                  Lead #{t.leadId}
                </span>
              )}
            </div>
          </div>

          <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
            <button
              onClick={copyAll}
              disabled={messages.length === 0}
              style={{
                fontFamily: FF, fontSize: "11px", fontWeight: 600, padding: "6px 14px",
                borderRadius: "6px", cursor: messages.length === 0 ? "not-allowed" : "pointer",
                border: "1px solid rgba(255,255,255,0.10)",
                background: copied ? "rgba(74,222,128,0.12)" : "rgba(255,255,255,0.04)",
                color: copied ? "rgba(74,222,128,0.90)" : "rgba(200,215,230,0.55)",
                opacity: messages.length === 0 ? 0.4 : 1,
              }}
            >
              {copied ? "Copied" : "Copy All"}
            </button>
            <button
              onClick={onClose}
              style={{
                fontFamily: FF, fontSize: "18px", fontWeight: 400, padding: "4px 10px",
                borderRadius: "6px", cursor: "pointer",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
                color: "rgba(200,215,230,0.55)",
                lineHeight: 1,
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Chat bubbles */}
        <div
          ref={scrollRef}
          style={{
            flex: 1, overflowY: "auto", padding: "24px",
            scrollBehavior: "smooth",
          }}
        >
          {messages.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.30)" }}>
                {live ? "Waiting for conversation to begin…" : "No messages in this transcript."}
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {messages.map((msg, i) => {
                const isAi = msg.role === "ai";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex", flexDirection: "column",
                      alignItems: isAi ? "flex-start" : "flex-end",
                      animation: "fadeInUp 0.2s ease-out",
                    }}
                  >
                    {/* Speaker + timestamp */}
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                      <span style={{
                        fontFamily: FF, fontSize: "10px", fontWeight: 700,
                        letterSpacing: "0.06em", textTransform: "uppercase",
                        color: isAi ? "rgba(184,156,74,0.75)" : "rgba(120,200,255,0.75)",
                      }}>
                        {isAi ? "AiA" : "Visitor"}
                      </span>
                      {msg.timestamp && (
                        <span style={{ fontSize: "10px", color: "rgba(200,215,230,0.25)", fontFamily: FF }}>
                          {fmtTime(msg.timestamp)}
                        </span>
                      )}
                    </div>
                    {/* Bubble */}
                    <div style={{
                      maxWidth: "85%", padding: "12px 16px",
                      borderRadius: isAi ? "2px 14px 14px 14px" : "14px 2px 14px 14px",
                      background: isAi ? "rgba(184,156,74,0.08)" : "rgba(120,200,255,0.06)",
                      border: `1px solid ${isAi ? "rgba(184,156,74,0.15)" : "rgba(120,200,255,0.12)"}`,
                      fontFamily: FF, fontSize: "13px", lineHeight: 1.65,
                      color: "rgba(200,215,230,0.88)",
                    }}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fadeInUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

function WebTranscriptsTab() {
  const [liveMode, setLiveMode] = useState(false);
  const [viewingId, setViewingId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const prevCountRef = useRef(0);

  // Poll every 5s in live mode, otherwise static
  const { data: transcripts, isLoading } = trpc.talk.listTranscripts.useQuery(undefined, {
    refetchInterval: liveMode ? 5000 : false,
  });

  const all = transcripts ?? [];

  // Detect new transcripts arriving in live mode
  useEffect(() => {
    if (liveMode && all.length > prevCountRef.current && prevCountRef.current > 0) {
      toast.info("New transcript detected", { duration: 2000 });
    }
    prevCountRef.current = all.length;
  }, [all.length, liveMode]);

  const liveCount = all.filter(isLiveTranscript).length;

  const visible = all.filter((t: any) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (t.visitorName ?? "").toLowerCase().includes(q) ||
      (t.visitorEmail ?? "").toLowerCase().includes(q) ||
      (t.visitorPhone ?? "").toLowerCase().includes(q) ||
      (t.transcriptText ?? "").toLowerCase().includes(q)
    );
  });

  const viewingTranscript = viewingId != null ? all.find((t: any) => t.id === viewingId) : null;

  return (
    <div>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h2 style={{ fontFamily: FFD, fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "0 0 4px" }}>Web Transcripts</h2>
          <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.40)", margin: 0 }}>Conversations from the /talk page.</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Live session count */}
          {liveCount > 0 && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              fontFamily: FF, fontSize: "12px", fontWeight: 600,
              color: "rgba(74,222,128,0.85)",
            }}>
              <span style={{
                width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80",
                boxShadow: "0 0 8px rgba(74,222,128,0.5)",
                animation: "pulse 1.5s ease-in-out infinite",
              }} />
              {liveCount} live
            </span>
          )}

          {/* Live mode toggle */}
          <button
            onClick={() => setLiveMode(!liveMode)}
            style={{
              fontFamily: FF, fontSize: "12px", fontWeight: 600, padding: "6px 14px",
              borderRadius: "6px", cursor: "pointer",
              border: `1px solid ${liveMode ? "rgba(74,222,128,0.30)" : "rgba(255,255,255,0.10)"}`,
              background: liveMode ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
              color: liveMode ? "rgba(74,222,128,0.90)" : "rgba(200,215,230,0.50)",
              display: "flex", alignItems: "center", gap: "6px",
            }}
          >
            <span style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: liveMode ? "#4ade80" : "rgba(200,215,230,0.30)",
              transition: "background 0.2s",
            }} />
            {liveMode ? "Live" : "Live Mode"}
          </button>

          <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.35)" }}>{all.length} total</span>
        </div>
      </div>

      {/* Search */}
      <input
        style={{ ...inputStyle, maxWidth: "320px", marginBottom: "20px" }}
        placeholder="Search name, email, phone, or transcript…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {isLoading ? (
        <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.35)" }}>Loading transcripts…</p>
      ) : visible.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <p style={{ fontFamily: FFD, fontSize: "18px", color: "rgba(255,255,255,0.30)", margin: "0 0 8px" }}>No transcripts yet</p>
          <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.25)", margin: 0 }}>Transcripts from /talk page conversations will appear here.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {visible.map((t: any) => {
            const messages = parseWebTranscript(t.transcript);
            const live = isLiveTranscript(t);
            const preview = messages.length > 0
              ? messages[messages.length - 1].text.slice(0, 80) + (messages[messages.length - 1].text.length > 80 ? "…" : "")
              : "No messages";

            return (
              <div
                key={t.id}
                onClick={() => setViewingId(t.id)}
                style={{
                  background: live ? "rgba(74,222,128,0.03)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${live ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: "10px",
                  padding: "14px 18px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 80px 80px 60px",
                  alignItems: "center",
                  gap: "12px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = live ? "rgba(74,222,128,0.06)" : "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = live ? "rgba(74,222,128,0.25)" : "rgba(184,156,74,0.18)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = live ? "rgba(74,222,128,0.03)" : "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = live ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)";
                }}
              >
                {/* Name + email */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {live && (
                      <span style={{
                        width: "7px", height: "7px", borderRadius: "50%", background: "#4ade80",
                        boxShadow: "0 0 6px rgba(74,222,128,0.5)",
                        animation: "pulse 1.5s ease-in-out infinite", flexShrink: 0,
                      }} />
                    )}
                    <p style={{ fontFamily: FFD, fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.88)", margin: 0 }}>
                      {t.visitorName || "Anonymous"}
                    </p>
                  </div>
                  <p style={{ fontFamily: FF, fontSize: "12px", color: "rgba(184,156,74,0.70)", margin: "2px 0 0" }}>
                    {t.visitorEmail || "No email"}
                  </p>
                </div>

                {/* Last message preview */}
                <div>
                  <p style={{
                    fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.45)", margin: 0,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {preview}
                  </p>
                  {t.leadId && (
                    <span style={{
                      fontFamily: FF, fontSize: "10px", fontWeight: 700,
                      color: "rgba(80,220,150,0.80)", background: "rgba(80,220,150,0.10)",
                      padding: "1px 6px", borderRadius: "3px", marginTop: "2px", display: "inline-block",
                    }}>
                      Lead #{t.leadId}
                    </span>
                  )}
                </div>

                {/* Message count */}
                <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.40)", textAlign: "center" }}>
                  {messages.length} msg{messages.length !== 1 ? "s" : ""}
                </span>

                {/* Duration */}
                <span style={{ fontFamily: FF, fontSize: "12px", color: "rgba(200,215,230,0.40)", textAlign: "center" }}>
                  {live ? (
                    <span style={{ color: "rgba(74,222,128,0.75)", fontWeight: 600 }}>Active</span>
                  ) : fmtDuration(t.durationSeconds)}
                </span>

                {/* Date */}
                <span style={{ fontFamily: FF, fontSize: "11px", color: "rgba(200,215,230,0.35)", textAlign: "right" }}>
                  {new Date(t.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* Full transcript slide-out panel */}
      {viewingTranscript && (
        <TranscriptPanel
          transcript={viewingTranscript}
          onClose={() => setViewingId(null)}
        />
      )}

      {/* Shared keyframe animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}

// ─── Main Console ─────────────────────────────────────────────────────────────

function Console({ adminUser }: { adminUser: { id: number; username: string; displayName: string | null; role: string } }) {
  const [tab, setTab] = useState<"leads" | "transcripts" | "admins">("leads");
  const [filter, setFilter] = useState<Lead["status"] | "all">("all");
  const [search, setSearch] = useState("");
  const utils = trpc.useUtils();

  const { data: leads, isLoading, refetch } = trpc.leads.list.useQuery();

  const updateStatus = trpc.leads.updateStatus.useMutation({
    onSuccess: () => { refetch(); toast.success("Status updated"); },
    onError: () => toast.error("Failed to update status"),
  });

  const logout = trpc.adminAuth.logout.useMutation({
    onSuccess: () => {
      clearAdminToken();
      utils.adminAuth.me.invalidate();
    },
  });

  const allLeads = leads ?? [];
  const byStatus = (s: Lead["status"]) => allLeads.filter((l) => l.status === s).length;

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
            <img
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png"
              alt="AiiA logo"
              style={{ height: "36px", width: "auto", objectFit: "contain" }}
            />
            <div>
              <p style={{ fontFamily: FFD, fontSize: "16px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: 0 }}>AiiAco Operations Console</p>
              <p style={{ fontFamily: FF, fontSize: "11px", color: "rgba(200,215,230,0.35)", margin: 0, letterSpacing: "0.06em" }}>
                {adminUser.displayName || adminUser.username} · {adminUser.role}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout.mutate()}
            style={{ fontFamily: FF, fontSize: "13px", fontWeight: 600, color: "rgba(200,215,230,0.45)", background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "6px", padding: "7px 16px", cursor: "pointer" }}
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", display: "flex", gap: "0" }}>
          {(["leads", "transcripts", "admins"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                fontFamily: FF, fontSize: "13px", fontWeight: 600,
                color: tab === t ? "rgba(212,180,80,1)" : "rgba(200,215,230,0.40)",
                background: "transparent", border: "none",
                borderBottom: tab === t ? "2px solid rgba(184,156,74,0.80)" : "2px solid transparent",
                padding: "14px 20px", cursor: "pointer", textTransform: "capitalize", letterSpacing: "0.04em",
              }}
            >
              {t === "leads" ? `Leads (${allLeads.length})` : t === "transcripts" ? "Web Transcripts" : "Admin Users"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        {tab === "leads" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(160px, 100%), 1fr))", gap: "12px", marginBottom: "28px" }}>
              {[
                { label: "Total", value: allLeads.length },
                { label: "New", value: byStatus("new") },
                { label: "Reviewed", value: byStatus("reviewed") },
                { label: "Contacted", value: byStatus("contacted") },
                { label: "Closed", value: byStatus("closed") },
                { label: "Full Intakes", value: allLeads.filter(l => l.type === "intake").length },
              ].map(({ label, value }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "10px", padding: "16px 20px" }}>
                  <p style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(184,156,74,0.55)", margin: "0 0 6px" }}>{label}</p>
                  <p style={{ fontFamily: FFD, fontSize: "28px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: 0, lineHeight: 1 }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
              <input
                style={{ ...inputStyle, maxWidth: "260px" }}
                placeholder="Search name, email, company…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {(["all", "new", "reviewed", "contacted", "closed"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  style={{
                    fontFamily: FF, fontSize: "12px", fontWeight: 600, padding: "8px 16px", borderRadius: "6px", cursor: "pointer",
                    background: filter === s ? "rgba(184,156,74,0.14)" : "transparent",
                    color: filter === s ? "rgba(212,180,80,1)" : "rgba(200,215,230,0.45)",
                    border: filter === s ? "1px solid rgba(184,156,74,0.30)" : "1px solid rgba(255,255,255,0.07)",
                    textTransform: "capitalize",
                  }}
                >
                  {s === "all" ? `All (${allLeads.length})` : `${STATUS_LABELS[s]} (${byStatus(s)})`}
                </button>
              ))}
            </div>

            {/* Table */}
            {isLoading ? (
              <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.35)" }}>Loading leads…</p>
            ) : visible.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontFamily: FFD, fontSize: "18px", color: "rgba(255,255,255,0.30)", margin: "0 0 8px" }}>No leads yet</p>
                <p style={{ fontFamily: FF, fontSize: "13px", color: "rgba(200,215,230,0.25)", margin: 0 }}>Leads will appear here when contact forms are submitted.</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      {["Contact", "Company", "Type", "Industry", "Status", "Date", ""].map((h) => (
                        <th key={h} style={{ fontFamily: FF, fontSize: "10px", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(200,215,230,0.30)", padding: "12px 16px", textAlign: "left" }}>{h}</th>
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
          </>
        )}

        {tab === "transcripts" && (
          <WebTranscriptsTab />
        )}

        {tab === "admins" && (
          <AdminManagementTab currentUserId={adminUser.id} currentRole={adminUser.role} />
        )}
      </div>
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────

export default function AdminConsolePage() {
  const { data: adminUser, isLoading } = trpc.adminAuth.me.useQuery();
  const { data: hasAdminsData, isLoading: hasAdminsLoading } = trpc.adminAuth.hasAdmins.useQuery();
  const utils = trpc.useUtils();
  const [showSetup, setShowSetup] = useState(false);

  if (isLoading || hasAdminsLoading) {
    return (
      <div style={{ background: "#03050A", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: FF, color: "rgba(200,215,230,0.35)", fontSize: "14px" }}>Loading…</div>
      </div>
    );
  }

  // If logged in, show the console
  if (adminUser) {
    return <Console adminUser={adminUser} />;
  }

  // No admins exist yet — force setup
  if (!hasAdminsData?.hasAdmins || showSetup) {
    return <SetupPage onDone={() => { setShowSetup(false); utils.adminAuth.me.invalidate(); utils.adminAuth.hasAdmins.invalidate(); }} />;
  }

  return <LoginPage onLogin={() => utils.adminAuth.me.invalidate()} />;
}
