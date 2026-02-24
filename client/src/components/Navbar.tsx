/*
 * AiiACo Navbar — Corporate Institutional
 * Design: BlackRock meets Palantir — sticky glass topbar, gold mark, DM Sans nav
 * No avatar. No personality. Pure authority.
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "topbar-glass" : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between py-4 gap-4">

          {/* Brand mark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 group"
          >
            <div
              className="w-9 h-9 rounded-[10px] flex-shrink-0 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(184,156,74,0.30)]"
              style={{
                background: "linear-gradient(135deg, rgba(184,156,74,0.95), rgba(197,204,214,0.25))",
                boxShadow: "0 8px 24px rgba(184,156,74,0.15)",
                border: "1px solid rgba(184,156,74,0.35)",
              }}
            />
            <div className="flex flex-col leading-none">
              <span
                className="text-white font-bold text-base tracking-[0.5px] uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                AiiAco
              </span>
              <span
                className="text-[10px] font-semibold tracking-[1.2px] uppercase"
                style={{ color: "rgba(197,204,214,0.60)", fontFamily: "'DM Sans', sans-serif" }}
              >
                UPGRADE
              </span>
            </div>
          </button>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-semibold tracking-wide transition-colors duration-200 relative group"
                style={{ color: "rgba(255,255,255,0.72)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#B89C4A] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex">
            <button
              onClick={() => scrollTo("#upgrade")}
              className="btn-primary text-sm"
            >
              Request Upgrade
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden transition-colors duration-200"
            style={{ color: "rgba(197,204,214,0.80)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
            transition={{ duration: 0.25 }}
            className="lg:hidden topbar-glass border-t"
            style={{ borderColor: "rgba(197,204,214,0.12)" }}
          >
            <div className="container py-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-3 text-sm font-semibold border-b transition-colors duration-200"
                  style={{
                    color: "rgba(255,255,255,0.80)",
                    borderColor: "rgba(197,204,214,0.10)",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#upgrade")}
                className="btn-primary mt-3 w-full justify-center"
              >
                Request Upgrade
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
