/*
 * AiiACo After Upgrade Section — Corporate Institutional
 * "Your Operating Model, Rebuilt."
 * Before/after table — clinical, precise, no fluff
 */
import { motion } from "framer-motion";

const rows = [
  {
    legacy: "Manual workflow dependency",
    legacySub: "Hours burned on tasks AI can complete in seconds.",
    upgraded: "Autonomous execution",
    upgradedSub: "AI-driven processes handle operations while leadership focuses on growth.",
  },
  {
    legacy: "Tool fragmentation",
    legacySub: "Disconnected apps, dashboards, and unused subscriptions.",
    upgraded: "Unified infrastructure",
    upgradedSub: "Integrated AI systems with ownership, monitoring, and continuous improvement.",
  },
  {
    legacy: "Reactive decision-making",
    legacySub: "Late signals and inconsistent reporting.",
    upgraded: "Operational intelligence",
    upgradedSub: "Predictive analytics and automated decision support.",
  },
  {
    legacy: "Headcount pressure",
    legacySub: "Hiring and managing expanding teams for repetitive work.",
    upgraded: "AI-optimized workforce",
    upgradedSub: "Humans for judgment, AI for execution. Scalable without chaos.",
  },
];

export default function AfterUpgradeSection() {
  const scrollToUpgrade = () =>
    document.querySelector("#upgrade")?.scrollIntoView({ behavior: "smooth" });
  const scrollToModels = () =>
    document.querySelector("#models")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="py-16">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <div className="corp-pill mb-4">After Upgrade</div>
            <h2
              className="text-white m-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                letterSpacing: "-0.5px",
              }}
            >
              Your Operating Model, Rebuilt.
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-[52ch] m-0"
            style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            You do not need to learn AI. You need to integrate it. The advantage comes
            from structure, not novelty.
          </p>
        </div>

        {/* Before/After table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <table className="corp-table">
            <thead>
              <tr>
                <th style={{ width: "50%" }}>Legacy Operation</th>
                <th style={{ width: "50%" }}>Upgraded Operation</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ color: "rgba(197,204,214,0.75)", fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="font-semibold" style={{ color: "rgba(197,204,214,0.85)" }}>
                      {row.legacy}
                    </span>
                    <span>{row.legacySub}</span>
                  </td>
                  <td style={{ color: "rgba(255,255,255,0.90)", fontFamily: "'DM Sans', sans-serif" }}>
                    <span className="font-semibold" style={{ color: "#B89C4A" }}>
                      {row.upgraded}
                    </span>
                    <span style={{ color: "rgba(197,204,214,0.80)" }}>{row.upgradedSub}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mt-5">
          <button onClick={scrollToUpgrade} className="btn-primary">
            Initiate Upgrade
          </button>
          <button onClick={scrollToModels} className="btn-ghost">
            View Engagement Models
          </button>
        </div>
      </div>
    </section>
  );
}
