/*
 * AiiACo Footer — Liquid Glass Bio-Organic Design
 */

const linkStyle = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", fontWeight: 600,
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
        <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr 1fr", gap: "40px", alignItems: "flex-start", marginBottom: "48px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png"
                alt="AiiA logo"
                style={{ height: "44px", width: "auto", objectFit: "contain" }}
              />
            </div>
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(200,215,230,0.48)", margin: "0 0 8px", maxWidth: "42ch" }}>
              AiiAco is the AI Integration Authority for the Corporate Age. We design, deploy, and manage operational AI infrastructure for businesses that intend to lead.
            </p>
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12.5px", lineHeight: 1.6, color: "rgba(200,215,230,0.32)", margin: "0 0 4px", maxWidth: "42ch" }}>
              AI integration services across 20+ industries. Performance-based AI consulting available.
            </p>
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>www.aiiaco.com</p>
          </div>

          {/* Services links */}
          <nav aria-label="Services navigation">
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", marginBottom: "14px" }}>Services</p>
            <a href="/ai-integration" style={linkStyle}>AI Integration</a>
            <a href="/ai-implementation-services" style={linkStyle}>AI Implementation</a>
            <a href="/ai-automation-for-business" style={linkStyle}>AI Automation</a>
            <a href="/ai-governance" style={linkStyle}>AI Governance</a>
            <a href="/models" style={linkStyle}>Engagement Models</a>
          </nav>

          {/* Platform links */}
          <nav aria-label="Platform navigation">
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", marginBottom: "14px" }}>Platform</p>
            <a href="/method" style={linkStyle}>The AiiAco Method</a>
            <a href="/industries" style={linkStyle}>Industries Served</a>
            <a href="/results" style={linkStyle}>Results & Outcomes</a>
            <a href="/case-studies" style={linkStyle}>Case Studies</a>
          </nav>

          {/* Company links */}
          <nav aria-label="Company navigation">
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", marginBottom: "14px" }}>Company</p>
            <a href="/manifesto" style={linkStyle}>Our Manifesto</a>
            <a href="/workplace" style={linkStyle}>Workplace Policy</a>
            <a href="/upgrade" style={linkStyle}>Request Upgrade</a>
            <a href="/privacy" style={linkStyle}>Privacy Policy</a>
            <a href="/terms" style={linkStyle}>Terms of Service</a>
          </nav>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "24px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>
            © {new Date().getFullYear()} AiiAco. All rights reserved.
          </p>
          <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>
            AI Integration Authority · Operational AI Infrastructure · Performance-Based AI Consulting
          </p>
        </div>
      </div>
    </footer>
  );
}
