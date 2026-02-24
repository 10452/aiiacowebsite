/*
 * AiiACo Footer — Upgraded Design
 * Vendasta-inspired: vivid gradient top border, bold brand, clean nav
 */
export default function Footer() {
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer
      style={{
        background: "#050C1A",
        borderTop: "1px solid rgba(200,212,224,0.10)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top gold gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "2px",
          background: "linear-gradient(90deg, transparent, #D4A843, transparent)",
        }}
      />

      <div className="container py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "linear-gradient(135deg, #D4A843, #F0C84A)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 16px rgba(212,168,67,0.25)",
                }}
              >
                <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 900, fontSize: "15px", color: "#0A0800" }}>A</span>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontSize: "17px", color: "rgba(255,255,255,0.95)" }}>AiiAco</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "8px", letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,212,224,0.45)" }}>AI INTEGRATION AUTHORITY</div>
              </div>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(200,212,224,0.60)", margin: 0, maxWidth: "30ch" }}>
              We design, deploy, and manage complete AI operational systems for businesses that intend to lead.
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-[10px] px-3 py-2 w-fit"
              style={{ background: "rgba(212,168,67,0.08)", border: "1px solid rgba(212,168,67,0.20)" }}
            >
              <div className="dot-pulse" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(212,168,67,0.85)" }}>
                Performance models available
              </span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(200,212,224,0.40)", margin: "0 0 14px" }}>Platform</p>
            {[
              { label: "Platform Overview", href: "#platform" },
              { label: "The Method", href: "#method" },
              { label: "After Upgrade", href: "#method" },
            ].map((link) => (
              <button
                key={link.href + link.label}
                onClick={() => scrollTo(link.href)}
                className="block mb-3 text-left"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(200,212,224,0.70)", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,212,224,0.70)")}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Industries */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(200,212,224,0.40)", margin: "0 0 14px" }}>Industries</p>
            {["Financial Services", "Real Estate", "Energy", "Software & Tech", "Automotive & EV"].map((ind) => (
              <button
                key={ind}
                onClick={() => scrollTo("#industries")}
                className="block mb-3 text-left"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(200,212,224,0.70)", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,212,224,0.70)")}
              >
                {ind}
              </button>
            ))}
          </div>

          {/* Engage */}
          <div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(200,212,224,0.40)", margin: "0 0 14px" }}>Engage</p>
            {[
              { label: "Engagement Models", href: "#models" },
              { label: "Request Upgrade", href: "#contact" },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block mb-3 text-left"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(200,212,224,0.70)", background: "none", border: "none", padding: 0, cursor: "pointer", transition: "color 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.95)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(200,212,224,0.70)")}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-gold mt-2"
              style={{ fontSize: "13px", padding: "10px 18px" }}
            >
              Begin Upgrade
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-3 pt-6"
          style={{ borderTop: "1px solid rgba(200,212,224,0.08)" }}
        >
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,212,224,0.35)", margin: 0 }}>
            © {new Date().getFullYear()} AiiAco. All rights reserved. AI Integration Authority.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,212,224,0.35)", margin: 0 }}>
            aiiaco.com
          </p>
        </div>
      </div>
    </footer>
  );
}
