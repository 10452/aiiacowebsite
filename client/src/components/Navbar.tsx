/*
 * AiiACo Navbar - Liquid Glass Bio-Organic Design
 * Gold AI chip logo, glassmorphism nav, announcement bar
 * Mobile/tablet: hamburger menu with full-screen overlay, body scroll lock
 * Desktop links only show at xl (1280px+) to prevent truncation
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

export default function Navbar({ onOpenQualifier }: { onOpenQualifier?: () => void } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1280 && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [mobileOpen]);

  // Close mobile menu on orientation change
  useEffect(() => {
    const onOrientationChange = () => setMobileOpen(false);
    window.addEventListener("orientationchange", onOrientationChange);
    return () => window.removeEventListener("orientationchange", onOrientationChange);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
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
              onClick={() => { setMobileOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              style={{ display: "flex", alignItems: "center", gap: "12px", background: "none", border: "none", padding: 0, cursor: "pointer", flexShrink: 0 }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_pure_gold_transparent_8063797a.png"
                alt="AiiAco — AI Integration Authority"
                style={{ height: "40px", width: "auto", objectFit: "contain", display: "block" }}
              />
            </button>

            {/* Desktop links — only show at xl (1280px+) */}
            <div style={{ display: "flex", alignItems: "center", gap: "4px" }} className="hidden xl:flex">
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
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.96)"; e.currentTarget.style.background = "rgba(255,255,255,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(200,215,230,0.72)"; e.currentTarget.style.background = "none"; }}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA + mobile toggle */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
              {/* Desktop CTAs — only at xl */}
              <div className="hidden xl:flex">
                <ReadAloud />
              </div>

              <CallNowButton
                variant="outline"
                size="sm"
                className="hidden xl:inline-flex"
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
              <button onClick={() => { if (onOpenQualifier) { setMobileOpen(false); onOpenQualifier(); } else { scrollTo("#contact"); } }} className="btn-gold hidden xl:inline-flex" style={{ fontSize: "13px", padding: "10px 20px" }}>
                Request Upgrade
              </button>

              {/* Mobile/tablet hamburger — shows below xl (1280px) */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden"
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.80)",
                  padding: "10px",
                  cursor: "pointer",
                  minWidth: "48px",
                  minHeight: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile/tablet menu — full screen overlay */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  borderTop: "1px solid rgba(255,255,255,0.07)",
                  overflow: "hidden",
                  maxHeight: "calc(100vh - 120px)",
                  overflowY: "auto",
                }}
              >
                <div style={{ padding: "16px 0 24px", display: "flex", flexDirection: "column", gap: "4px" }}>
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => scrollTo(link.href)}
                      style={{
                        fontFamily: FF,
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "rgba(200,215,230,0.85)",
                        background: "none",
                        border: "none",
                        padding: "14px 12px",
                        textAlign: "left",
                        cursor: "pointer",
                        borderRadius: "10px",
                        minHeight: "48px",
                        display: "flex",
                        alignItems: "center",
                        transition: "background 0.15s",
                      }}
                    >
                      {link.label}
                    </button>
                  ))}

                  <div style={{ height: "8px" }} />

                  <ReadAloud />

                  <div style={{ height: "4px" }} />

                  <CallNowButton
                    variant="outline"
                    size="md"
                    style={{
                      fontFamily: FF,
                      fontSize: "15px",
                      color: "rgba(200,215,230,0.85)",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "12px",
                      padding: "14px 16px",
                      width: "100%",
                      justifyContent: "center",
                      minHeight: "48px",
                    }}
                  />
                  <button
                    onClick={() => {
                      if (onOpenQualifier) { setMobileOpen(false); onOpenQualifier(); }
                      else { scrollTo("#contact"); }
                    }}
                    className="btn-gold"
                    style={{ justifyContent: "center", marginTop: "8px", minHeight: "48px", fontSize: "15px", width: "100%" }}
                  >
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
