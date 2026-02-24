/*
 * AiiACo Navbar — Upgraded (Vendasta-inspired)
 * Announcement bar + sticky glass nav + bold brand mark
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Method", href: "#method" },
  { label: "Industries", href: "#industries" },
  { label: "Engagement Models", href: "#models" },
  { label: "Upgrade", href: "#upgrade" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="announce-bar">
        <span>AI Integration Authority — </span>
        <span className="highlight">Performance-based models available.</span>
        <span> We earn more when you hit your targets.</span>
        <button
          onClick={() => scrollTo("#models")}
          className="inline-flex items-center gap-1 ml-2 font-bold underline underline-offset-2"
          style={{ color: "rgba(212,168,67,0.90)" }}
        >
          See models <ArrowRight size={12} />
        </button>
      </div>

      {/* Main nav */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
        className={`transition-all duration-300 ${scrolled ? "topbar-glass" : "bg-transparent"}`}
      >
        <div className="container">
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Brand */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-3 group flex-shrink-0"
            >
              <div
                className="w-10 h-10 rounded-[11px] flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_24px_rgba(212,168,67,0.35)]"
                style={{
                  background: "linear-gradient(135deg, #D4A843 0%, #F0C84A 60%, rgba(200,212,224,0.30) 100%)",
                  boxShadow: "0 4px 16px rgba(212,168,67,0.25)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "16px",
                    color: "#0A0800",
                    letterSpacing: "-0.5px",
                  }}
                >
                  A
                </span>
              </div>
              <div className="flex flex-col leading-none">
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 800,
                    fontSize: "18px",
                    color: "rgba(255,255,255,0.95)",
                    letterSpacing: "-0.3px",
                  }}
                >
                  AiiAco
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "9px",
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(200,212,224,0.50)",
                    marginTop: "1px",
                  }}
                >
                  UPGRADE
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm font-semibold relative group transition-colors duration-200"
                  style={{ color: "rgba(255,255,255,0.70)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  <span className="group-hover:text-white transition-colors duration-200">{link.label}</span>
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[1.5px] bg-[#D4A843] group-hover:w-full transition-all duration-300 rounded-full" />
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => scrollTo("#upgrade")}
              className="hidden lg:flex btn-gold text-sm py-2.5 px-5"
            >
              Request Upgrade
            </button>

            {/* Mobile toggle */}
            <button
              className="lg:hidden"
              style={{ color: "rgba(200,212,224,0.80)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
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
              transition={{ duration: 0.22 }}
              className="lg:hidden topbar-glass"
              style={{ borderTop: "1px solid rgba(200,212,224,0.10)" }}
            >
              <div className="container py-5 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollTo(link.href)}
                    className="text-left py-3 text-sm font-semibold border-b"
                    style={{
                      color: "rgba(255,255,255,0.82)",
                      borderColor: "rgba(200,212,224,0.08)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => scrollTo("#upgrade")}
                  className="btn-gold mt-3 w-full"
                >
                  Request Upgrade
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
