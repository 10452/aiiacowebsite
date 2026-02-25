/*
 * AiiACo Footer — Liquid Glass Bio-Organic Design
 */

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Method", href: "#method" },
  { label: "Industries", href: "#industries" },
  { label: "Engagement Models", href: "#models" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#02030A",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 0 32px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold line */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(184,156,74,0.50), transparent)" }} />

      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "48px", alignItems: "flex-start", marginBottom: "40px" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "8px",
                background: "linear-gradient(135deg, rgba(184,156,74,0.90), rgba(212,168,67,0.60))",
                border: "1px solid rgba(184,156,74,0.45)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 12px rgba(184,156,74,0.20)",
              }}>
                <div style={{ width: "14px", height: "14px", borderRadius: "3px", background: "rgba(3,5,10,0.80)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px", padding: "2px" }}>
                  {[0,1,2,3].map(i => <div key={i} style={{ background: "rgba(184,156,74,0.90)", borderRadius: "1px" }} />)}
                </div>
              </div>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.92)", letterSpacing: "0.5px" }}>
                AiiAco
              </span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(200,215,230,0.48)", margin: "0 0 8px", maxWidth: "36ch" }}>
              The integrated AI agency. We deploy and manage your entire AI workforce — and deliver results, not workload.
            </p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.32)", margin: 0 }}>
              www.aiiaco.com
            </p>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 600,
                  color: "rgba(200,215,230,0.50)", letterSpacing: "0.2px",
                  padding: "2px 0", transition: "color 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "rgba(184,156,74,0.85)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(200,215,230,0.50)")}
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div style={{ height: "1px", background: "rgba(255,255,255,0.05)", marginBottom: "24px" }} />

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>
            © {new Date().getFullYear()} AiiAco. All rights reserved.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.28)", margin: 0 }}>
            AI Integration Agency · Integrated Intelligence · Measurable Outcomes
          </p>
        </div>
      </div>
    </footer>
  );
}
