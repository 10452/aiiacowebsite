/*
 * AiiACo After Upgrade Section — Liquid Glass Bio-Organic Design
 * Before/after transformation table with glass styling
 */
import { motion } from "framer-motion";

const comparisons = [
  {
    before: "Manual workflow dependency",
    after: "Autonomous execution infrastructure",
    support: "AI-driven processes handle operations while leadership focuses on growth.",
  },
  {
    before: "Tool fragmentation and unused subscriptions",
    after: "Unified infrastructure with ownership",
    support: "Integrated systems with monitoring, governance, and continuous improvement.",
  },
  {
    before: "Reactive decision-making",
    after: "Operational intelligence",
    support: "Predictive analytics and automated decision support with clear KPIs.",
  },
  {
    before: "Hiring pressure for repetitive work",
    after: "AI-optimized workforce",
    support: "Humans for judgment. AI for execution. Scalable without chaos.",
  },
];

export default function AfterUpgradeSection() {
  return (
    <section
      id="upgrade"
      style={{
        position: "relative",
        padding: "120px 0",
        background: "#060B14",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 500px at 50% 100%, rgba(184,156,74,0.04) 0%, transparent 55%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "640px", marginBottom: "64px" }}
        >
          <div className="section-pill" style={{ marginBottom: "20px", width: "fit-content" }}>
            <span className="dot" />
            The Structural Transformation
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            This Is What <span className="accent">Your Business Looks Like After AiiAco.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            You do not need to understand AI. You need to be running on it. The businesses that survive the next decade will not be the ones that tried AI — they will be the ones that integrated it at the operational level. This is that level.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="glass-card"
          style={{ overflow: "hidden" }}
        >
          <table className="glass-table">
            <thead>
              <tr>
                <th style={{ width: "38%", color: "rgba(200,215,230,0.50)" }}>Before</th>
                <th style={{ width: "38%", color: "#D4A843" }}>After Upgrade</th>
                <th style={{ width: "24%" }}>What Changes</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <motion.tr
                  key={row.before}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <td style={{ color: "rgba(200,215,230,0.55)" }}>{row.before}</td>
                  <td style={{ color: "rgba(210,220,235,0.90)", fontWeight: 600 }}>{row.after}</td>
                  <td style={{ color: "rgba(200,215,230,0.55)", fontSize: "13px" }}>{row.support}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{ marginTop: "48px", textAlign: "center" }}
        >
          <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(22px, 2.8vw, 36px)", fontWeight: 700, color: "rgba(255,255,255,0.92)", lineHeight: 1.2, margin: "0 auto 20px", maxWidth: "60ch", letterSpacing: "-0.4px" }}>
            Your competitors are not waiting.
            <br />
            <span style={{ color: "#D4A843" }}>The question is whether you move first or respond last.</span>
          </p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold"
            style={{ fontSize: "15px", padding: "14px 32px" }}
          >
            Initiate Upgrade
          </button>
        </motion.div>
      </div>
    </section>
  );
}
