/*
 * AiiACo After Upgrade Section — Upgraded Design
 * Bold before/after table, vivid section background, large headline
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
    <section
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #050C1A 0%, #091325 100%)",
      }}
    >
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-5"
        >
          <div className="section-pill w-fit">After Upgrade</div>
          <h2 className="section-headline" style={{ maxWidth: "18ch" }}>
            Your Operating Model,{" "}
            <span className="accent">Rebuilt.</span>
          </h2>
          <p className="section-subhead">
            You do not need to learn AI. You need to integrate it. The advantage comes
            from structure, not novelty.
          </p>
        </motion.div>

        {/* Before/After table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <table className="corp-table">
            <thead>
              <tr>
                <th
                  style={{
                    width: "50%",
                    borderRight: "1px solid rgba(200,212,224,0.10)",
                  }}
                >
                  Legacy Operation
                </th>
                <th style={{ width: "50%" }}>
                  <span style={{ color: "#D4A843" }}>↑</span> Upgraded Operation
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td
                    style={{
                      borderRight: "1px solid rgba(200,212,224,0.08)",
                      background: i % 2 === 0 ? "rgba(9,19,37,0.50)" : "transparent",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "rgba(200,212,224,0.80)",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {row.legacy}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(200,212,224,0.55)",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.legacySub}
                    </span>
                  </td>
                  <td
                    style={{
                      background: i % 2 === 0
                        ? "rgba(212,168,67,0.05)"
                        : "rgba(212,168,67,0.03)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "#D4A843",
                        display: "block",
                        marginBottom: "4px",
                      }}
                    >
                      {row.upgraded}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(200,212,224,0.75)",
                        lineHeight: 1.5,
                      }}
                    >
                      {row.upgradedSub}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4">
          <button onClick={scrollToUpgrade} className="btn-gold">
            Initiate Upgrade
          </button>
          <button onClick={scrollToModels} className="btn-outline">
            View Engagement Models
          </button>
        </div>
      </div>
    </section>
  );
}
