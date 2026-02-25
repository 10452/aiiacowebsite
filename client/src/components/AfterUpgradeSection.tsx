/*
 * AiiACo After Upgrade Section — Liquid Glass Bio-Organic Design
 * Before/after transformation table with glass styling
 */
import { motion } from "framer-motion";

const comparisons = [
  { dimension: "Operational Complexity", before: "Multiple disconnected tools, manual processes, and internal AI confusion", after: "Unified AI infrastructure managed by AiiAco — one point of accountability" },
  { dimension: "AI Talent Requirements", before: "Ongoing need to hire, train, and retain AI specialists across functions", after: "AiiAco functions as your AI Director — assembling and managing the workforce" },
  { dimension: "Implementation Risk", before: "High risk of failed deployments, wasted investment, and misaligned tools", after: "Structured deployment with defined benchmarks and performance accountability" },
  { dimension: "Time to Value", before: "Months of internal planning, vendor evaluation, and failed pilots", after: "Accelerated deployment through proven integration methodology" },
  { dimension: "Cost Structure", before: "Unpredictable costs across multiple vendors, tools, and internal resources", after: "Transparent engagement models — including performance-based options" },
  { dimension: "Competitive Position", before: "Reactive adoption of AI tools as competitors advance", after: "Proactive, strategic AI infrastructure that compounds competitive advantage" },
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
            The Upgrade
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            Before AiiAco. <span className="accent">After AiiAco.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            The difference between a business that experiments with AI and a business
            that operates with AI is not technology. It is architecture, execution, and accountability.
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
                <th style={{ width: "22%" }}>Dimension</th>
                <th style={{ width: "39%", color: "rgba(200,215,230,0.50)" }}>Before AiiAco</th>
                <th style={{ width: "39%", color: "#D4A843" }}>After AiiAco</th>
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <motion.tr
                  key={row.dimension}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.07 }}
                >
                  <td><span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.88)" }}>{row.dimension}</span></td>
                  <td style={{ color: "rgba(200,215,230,0.55)" }}>{row.before}</td>
                  <td style={{ color: "rgba(210,220,235,0.90)", fontWeight: 600 }}>{row.after}</td>
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
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, fontStyle: "italic", color: "rgba(255,255,255,0.85)", lineHeight: 1.35, margin: "0 auto 16px", maxWidth: "70ch", letterSpacing: "-0.2px" }}>
            "The businesses that will define the next decade are not the ones that
            tried AI. They are the ones that{" "}
            <span style={{ color: "#D4A843", fontStyle: "normal", fontWeight: 700 }}>integrated it.</span>"
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(184,156,74,0.60)", margin: 0 }}>
            — AiiAco
          </p>
        </motion.div>
      </div>
    </section>
  );
}
