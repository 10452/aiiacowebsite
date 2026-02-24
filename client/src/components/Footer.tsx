/*
 * AiiACo Footer — Bioluminescent Cosmos
 */
import { ExternalLink } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-[#020B18] border-t border-[#071428] py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#00E5FF]/10 flex items-center justify-center">
                <span className="font-cinzel text-[#00E5FF] font-bold text-sm">A</span>
              </div>
              <div>
                <span className="font-cinzel text-white font-bold text-lg tracking-widest">AiiA</span>
                <span className="font-rajdhani text-[#7A9BB5] text-xs ml-2 tracking-wider">by AiiACo</span>
              </div>
            </div>
            <p className="font-dm text-sm text-[#7A9BB5] leading-relaxed max-w-sm">
              The world's most powerful AI Director. She learns your business, builds your strategy,
              hires your AI staff, and delivers results — not workload.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
              <span className="font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase">AiiA Online — Ready to Help</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <p className="font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase mb-1">Navigate</p>
            {[
              { label: "What is AiiA", href: "#what-is-aiia" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Industries", href: "#industries" },
              { label: "Pricing", href: "#pricing" },
              { label: "The Team", href: "#team" },
            ].map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left font-dm text-sm text-[#7A9BB5] hover:text-[#00E5FF] transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase mb-1">Contact</p>
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left font-dm text-sm text-[#7A9BB5] hover:text-[#C9A227] transition-colors"
            >
              Hire AiiA
            </button>
            <button
              onClick={() => scrollTo("#contact")}
              className="text-left font-dm text-sm text-[#7A9BB5] hover:text-[#C9A227] transition-colors"
            >
              Free Discovery Call
            </button>
            <a
              href="https://volentixlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-dm text-sm text-[#7A9BB5] hover:text-[#00E5FF] transition-colors flex items-center gap-1"
            >
              Volentixlabs.com
              <ExternalLink size={11} />
            </a>
            <p className="font-dm text-sm text-[#7A9BB5]">www.aiiaco.com</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#071428] pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-dm text-xs text-[#7A9BB5]">
            © {year} AiiACo. All rights reserved. Built by{" "}
            <a
              href="https://volentixlabs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E5FF] hover:text-[#E8C84A] transition-colors"
            >
              Volentixlabs
            </a>
            .
          </p>
          <div className="flex items-center gap-6">
            <span className="font-rajdhani text-xs text-[#7A9BB5] tracking-wider">AIIA IS YOUR AI DIRECTOR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
