/*
 * AiiACo Footer — Corporate Institutional
 * No Volentixlabs. No team. Pure authority.
 */

const navLinks = [
  { label: "Platform", href: "#platform" },
  { label: "Method", href: "#method" },
  { label: "Industries", href: "#industries" },
  { label: "Models", href: "#models" },
  { label: "Upgrade", href: "#upgrade" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="py-10"
      style={{
        borderTop: "1px solid rgba(197,204,214,0.12)",
        background: "rgba(5,7,10,0.98)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded-[9px] flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(184,156,74,0.95), rgba(197,204,214,0.25))",
                  border: "1px solid rgba(184,156,74,0.35)",
                }}
              />
              <div>
                <span
                  className="block font-bold text-sm tracking-[0.5px] uppercase text-white"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  AiiAco
                </span>
                <span
                  className="block text-[10px] font-semibold tracking-[1.2px] uppercase"
                  style={{ color: "rgba(197,204,214,0.45)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  UPGRADE
                </span>
              </div>
            </div>
            <p
              className="text-sm leading-relaxed max-w-[34ch] mb-3"
              style={{ color: "rgba(197,204,214,0.55)", fontFamily: "'DM Sans', sans-serif", margin: "0 0 12px" }}
            >
              AI Integration Authority for the Corporate Age.
            </p>
            {["Enterprise AI Infrastructure", "Operational Execution", "Performance Alignment"].map((item) => (
              <span
                key={item}
                className="block text-xs mb-1"
                style={{ color: "rgba(197,204,214,0.35)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {item}
              </span>
            ))}
          </div>

          {/* Navigate */}
          <div>
            <p
              className="text-xs font-bold tracking-[1px] uppercase mb-4"
              style={{ color: "rgba(197,204,214,0.40)", fontFamily: "'DM Sans', sans-serif" }}
            >
              Navigate
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm transition-colors duration-200 hover:text-[#B89C4A]"
                  style={{ color: "rgba(197,204,214,0.60)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <button
              onClick={() => scrollTo("#upgrade")}
              className="btn-primary w-fit"
            >
              Request Upgrade
            </button>
            <p
              className="text-xs leading-relaxed max-w-[28ch]"
              style={{ color: "rgba(197,204,214,0.40)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}
            >
              Engagement begins with a structured diagnostic call to confirm fit and scope.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(197,204,214,0.08)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(197,204,214,0.30)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}
          >
            © 2026 AiiAco. All rights reserved.
          </p>
          <p
            className="text-xs tracking-[1.2px] uppercase"
            style={{ color: "rgba(197,204,214,0.25)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}
          >
            AI Integration Authority
          </p>
        </div>
      </div>
    </footer>
  );
}
