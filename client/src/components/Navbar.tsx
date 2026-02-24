/*
 * AiiACo Navbar — Bioluminescent Cosmos
 * Glassmorphism sticky nav with AiiA brand mark and CTA
 */
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "What is AiiA", href: "#what-is-aiia" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "The Team", href: "#team" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-[#00E5FF]/10 shadow-lg shadow-[#00E5FF]/5"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <div className="relative w-10 h-10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-[#00E5FF]/10 group-hover:bg-[#00E5FF]/20 transition-all duration-300 animate-pulse-glow" />
              <span className="font-cinzel text-[#00E5FF] font-bold text-lg relative z-10">A</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-cinzel text-white font-bold text-xl tracking-widest">AiiA</span>
              <span className="font-rajdhani text-[#7A9BB5] text-[10px] tracking-[0.2em] uppercase">AI Director</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-dm text-[#7A9BB5] hover:text-[#00E5FF] text-sm tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#00E5FF] group-hover:w-full transition-all duration-300" />
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scrollTo("#contact")}
              className="relative px-6 py-2.5 font-rajdhani font-600 text-sm tracking-[0.1em] uppercase text-[#020B18] bg-[#C9A227] rounded hover:bg-[#E8C84A] transition-all duration-300 glow-gold"
            >
              Hire AiiA
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-[#7A9BB5] hover:text-[#00E5FF] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-[#00E5FF]/10"
          >
            <div className="container py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left font-dm text-[#E8F4F8] hover:text-[#00E5FF] text-base py-2 border-b border-[#071428] transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("#contact")}
                className="mt-2 w-full py-3 font-rajdhani font-600 text-sm tracking-[0.1em] uppercase text-[#020B18] bg-[#C9A227] rounded hover:bg-[#E8C84A] transition-all"
              >
                Hire AiiA
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
