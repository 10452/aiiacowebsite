/*
 * AiiACo Footer — Liquid Glass Bio-Organic Design
 */

const linkStyle = {
  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
  color: "rgba(200,215,230,0.50)" as const, letterSpacing: "0.2px",
  textDecoration: "none", display: "block", padding: "2px 0", transition: "color 0.15s",
};

export default function Footer() {
  return (
    <footer
      style={{
        background: "#02030A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "56px 0 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,156,74,0.50), transparent)" }} />

      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "48px", alignItems: "flex-start", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, rgba(184,156,74,0.90), rgba(212,168,67,0.60))", border: "1px solid rgba(184,156,74,0.45)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 12px rgba(184,156,74,0.20)" }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "rgba(3,5,10,0.80)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", padding: "2px" }}>
                  {[0,1,2,3].map(i => <div key={i} style={{ background: "rgba(184,156,74,0.90)", borderRadius: "1px" }} />)}
                </div>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "0.5px" }}>AiiAco</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(200,215,230,0.48)", margin: "0 0 8px", maxWidth: "42ch" }}>
              AiiAco is the AI Integration Authority for the Corporate Age. We design, deploy, and manage operational AI infrastructure for businesses that intend to lead.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", lineHeight: 1.6, color: "rgba(200,215,230,0.32)", margin: "0 0 4px", maxWidth: "42ch" }}>
              AI integration services across 20+ industries. Performance-based AI consulting available.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>www.aiiaco.com</p>
          </div>

          {/* Platform links */}
          <nav aria-label="Platform navigation">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", marginBottom: "14px" }}>Platform</p>
            <a href="/method" style={linkStyle}>AI Integration Method</a>
            <a href="/industries" style={linkStyle}>Industries Served</a>
            <a href="/models" style={linkStyle}>Engagement Models</a>
            <a href="/results" style={linkStyle}>Results & Outcomes</a>
            <a href="/case-studies" style={linkStyle}>Case Studies</a>
          </nav>

          {/* Company links */}
          <nav aria-label="Company navigation">
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", marginBottom: "14px" }}>Company</p>
            <a href="/manifesto" style={linkStyle}>Our Manifesto</a>
            <a href="/upgrade" style={linkStyle}>Request Upgrade</a>
            <a href="/privacy" style={linkStyle}>Privacy Policy</a>
            <a href="/terms" style={linkStyle}>Terms of Service</a>
          </nav>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "24px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>
            © {new Date().getFullYear()} AiiAco. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>
            AI Integration Authority · Operational AI Infrastructure · Performance-Based AI Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
