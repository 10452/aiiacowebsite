/*
 * AiiACo Navbar - Liquid Glass Bio-Organic Design
 * Gold AI chip logo, glassmorphism nav, announcement bar
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ReadAloud from "./ReadAloud";
import CallNowButton from "@/components/CallNowButton";

const navLinks = [
  { label: "Platform", href: "#platform", route: "/" },
  { label: "Method", href: "#method", route: "/method" },
  { label: "Industries", href: "#industries", route: "/industries" },
  { label: "Models", href: "#models", route: "/models" },
  { label: "Corporate", href: "/corporate", route: "/corporate" },
  { label: "Upgrade", href: "#contact", route: "/upgrade" },
];

const FF = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";
const FFD = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

export default function Navbar({ onOpenQualifier }: { onOpenQualifier?: () => void } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    // If we're not on the homepage, navigate there first
    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100 }}>
      {/* Announcement bar */}
      <div className="announce-bar">
        <span className="gold-text">Operational Intelligence for Real Estate, Mortgage &amp; Management Consulting.</span>
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
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png"
                alt="AiiAco — AI Integration Authority"
                style={{ height: "44px", width: "auto", objectFit: "contain", display: "block" }}
              />
            </button>

            {/* Desktop links */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden lg:flex">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.route}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  style={{
                    fontFamily: FF,
                    fontWeight: 600,
                    fontSize: "13.5px",
                    color: "rgba(200,215,230,0.72)",
                    background: "none",
                    border: "none",
                    padding: "8px 13px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "color 0.15s, background 0.15s",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.96)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(200,215,230,0.72)"; e.currentTarget.style.background = "none"; }}
                >
                  {link.label}
                </a>
              ))}

            </div>

            {/* CTA + mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div className="hidden lg:flex">
                <ReadAloud />
              </div>

              <CallNowButton
                variant="outline"
                size="sm"
                className="hidden lg:inline-flex"
                style={{
                  fontFamily: FF,
                  fontSize: "13px",
                  letterSpacing: "0.02em",
                  color: "rgba(200,215,230,0.85)",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "20px",
                  padding: "9px 16px",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  whiteSpace: "nowrap",
                }}
              />
              <button onClick={() => { if (onOpenQualifier) { setMobileOpen(false); onOpenQualifier(); } else { scrollTo("#contact"); } }} className="btn-gold hidden lg:inline-flex" style={{ fontSize: "13px", padding: "10px 20px" }}>
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
                      style={{ fontFamily: FF, fontWeight: 600, fontSize: "15px", color: "rgba(200,215,230,0.85)", background: "none", border: "none", padding: "10px 8px", textAlign: "left", cursor: "pointer", borderRadius: "8px" }}
                    >
                      {link.label}
                    </button>
                  ))}


                  <CallNowButton
                    variant="outline"
                    size="md"
                    style={{
                      fontFamily: FF,
                      fontSize: "15px",
                      color: "rgba(200,215,230,0.85)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "10px",
                      padding: "10px 8px",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  />
                  <button onClick={() => { if (onOpenQualifier) { setMobileOpen(false); onOpenQualifier(); } else { scrollTo("#contact"); } }} className="btn-gold mt-2" style={{ justifyContent: "center" }}>
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
