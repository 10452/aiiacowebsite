/*
 * AiiACo — Admin Operations Console
 * Route: /admin-opsteam (not linked anywhere, not in sitemap)
 * Dedicated username/password auth — independent of Manus OAuth
 */

import { useState } from "react";
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
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_33559279.png"
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
            src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_33559279.png"
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

// ─── Main Console ─────────────────────────────────────────────────────────────

function Console({ adminUser }: { adminUser: { id: number; username: string; displayName: string | null; role: string } }) {
  const [tab, setTab] = useState<"leads" | "admins">("leads");
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
              src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_33559279.png"
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
          {(["leads", "admins"] as const).map((t) => (
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
              {t === "leads" ? `Leads (${allLeads.length})` : "Admin Users"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px" }}>
        {tab === "leads" && (
          <>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px", marginBottom: "28px" }}>
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
