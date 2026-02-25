/*
 * AiiACo Navbar — Liquid Glass Bio-Organic Design
 * Gold AI chip logo, glassmorphism nav, announcement bar
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Method", href: "#method" },
  { label: "Industries", href: "#industries" },
  { label: "Engagement Models", href: "#models" },
  { label: "Upgrade", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* Announcement bar */}
      <div className="announce-bar">
        <span className="gold-text">AI Integration Authority</span>
        {" — "}Performance-based models available. We earn more when you hit your targets.{" "}
        <button
          onClick={() => scrollTo("#models")}
          style={{ color: "rgba(212,168,67,0.90)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textDecorationColor: "rgba(212,168,67,0.35)", fontSize: "inherit", fontFamily: "inherit" }}
        >
          See models →
        </button>
      </div>

      {/* Main navbar */}
      <motion.nav
        className="navbar"
        style={{ boxShadow: scrolled ? "0 8px 40px rgba(0,0,0,0.55)" : "none", transition: "box-shadow 0.3s ease" }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 0", gap: "16px" }}>
            {/* Brand */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <div className="logo-chip">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ position: "relative", zIndex: 1 }}>
                  <rect x="5" y="5" width="10" height="10" rx="2" fill="rgba(10,8,0,0.85)" stroke="rgba(10,8,0,0.30)" strokeWidth="0.5"/>
                  <line x1="7" y1="5" x2="7" y2="2" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="10" y1="5" x2="10" y2="2" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="13" y1="5" x2="13" y2="2" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="7" y1="15" x2="7" y2="18" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="10" y1="15" x2="10" y2="18" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="13" y1="15" x2="13" y2="18" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="5" y1="7" x2="2" y2="7" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="5" y1="10" x2="2" y2="10" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="5" y1="13" x2="2" y2="13" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="15" y1="7" x2="18" y2="7" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="15" y1="10" x2="18" y2="10" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <line x1="15" y1="13" x2="18" y2="13" stroke="rgba(10,8,0,0.65)" strokeWidth="1.2" strokeLinecap="round"/>
                  <circle cx="10" cy="10" r="2" fill="rgba(10,8,0,0.90)"/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.3px", color: "rgba(255,255,255,0.96)", lineHeight: 1 }}>
                  AiiAco
                </div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "8px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(184,156,74,0.70)", lineHeight: 1, marginTop: "3px" }}>
                  UPGRADE
                </div>
              </div>
            </button>

            {/* Desktop links */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: "13.5px",
                    color: "rgba(200,215,230,0.72)",
                    background: "none",
                    border: "none",
                    padding: "8px 13px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "color 0.15s, background 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.96)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(200,215,230,0.72)"; e.currentTarget.style.background = "none"; }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA + mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button onClick={() => scrollTo("#contact")} className="btn-gold hidden lg:inline-flex" style={{ fontSize: "13px", padding: "10px 20px" }}>
                Request Upgrade
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.80)", padding: "6px", cursor: "pointer" }}>
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ borderTop: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}
              >
                <div style={{ padding: "12px 0 20px", display: "flex", flexDirection: "column", gap: "2px" }}>
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "15px", color: "rgba(200,215,230,0.85)", background: "none", border: "none", padding: "10px 8px", textAlign: "left", cursor: "pointer", borderRadius: "8px" }}
                    >
                      {link.label}
                    </button>
                  ))}
                  <button onClick={() => scrollTo("#contact")} className="btn-gold mt-2" style={{ justifyContent: "center" }}>
                    Request Upgrade
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </div>
  );
}
