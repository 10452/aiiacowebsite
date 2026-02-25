/*
 * AiiACo Platform Section — Liquid Glass Bio-Organic Design
 * Six foundations, glass cards, gold accents
 */
import { motion } from "framer-motion";

const foundations = [
  {
    num: "01",
    title: "Business Intelligence Audit",
    body: "A comprehensive diagnostic of operational friction, revenue drag, data readiness, and competitive exposure. No templates. No assumptions.",
  },
  {
    num: "02",
    title: "Strategic AI Architecture",
    body: "A custom integration blueprint: priorities, timeline, metrics, governance, and ROI targets.",
  },
  {
    num: "03",
    title: "AI Workforce Deployment",
    body: "We configure the AI workforce your business actually needs: automations, agents, and integrated systems with accountability.",
  },
  {
    num: "04",
    title: "Full Execution",
    body: "Implementation is not optional. We deploy and integrate workflows end-to-end so outcomes land in operations, not in documents.",
  },
  {
    num: "05",
    title: "Managed Optimization",
    body: "Continuous monitoring, quality control, and iteration. AI is maintained like infrastructure, not treated like a project.",
  },
  {
    num: "06",
    title: "Performance Alignment",
    body: "Optional success-linked structures that align incentives. We earn more when the system produces measurable outcomes.",
  },
];

export default function PlatformSection() {
  return (
    <section
      id="platform"
      style={{
        position: "relative",
        padding: "120px 0",
        background: "#060B14",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 600px at 85% 50%, rgba(184,156,74,0.04) 0%, transparent 60%)" }} />

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
            Platform
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            Operational AI <span className="accent">Infrastructure.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead" style={{ marginBottom: "16px" }}>
            Most vendors sell tools. Most consultants sell recommendations. AiiAco delivers an integrated operating model: diagnostics, architecture, deployment, and managed optimization.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", lineHeight: 1.65, color: "rgba(200,215,230,0.55)", margin: 0, maxWidth: "58ch" }}>
            AI is no longer a novelty. It is infrastructure. Businesses that treat it as experimentation will be outpaced by businesses that integrate intelligence into operations.
          </p>
        </motion.div>

        {/* Foundation cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "14px",
          }}
        >
          {foundations.map((f, i) => (
            <motion.div
              key={f.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.55 }}
              className="glass-card"
              style={{ padding: "28px" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: "16px" }}>
                <div className="phase-badge" style={{ flexShrink: 0 }}>{f.num}</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "19px", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 10px", lineHeight: 1.15, letterSpacing: "-0.2px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", lineHeight: 1.65, color: "rgba(200,215,230,0.70)", margin: 0 }}>
                    {f.body}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-card-gold"
          style={{ marginTop: "40px", padding: "36px 40px", textAlign: "center" }}
        >
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 12px", lineHeight: 1.2, letterSpacing: "-0.4px" }}>
            You do not hire AI tools. You hire{" "}
            <span style={{ color: "#D4A843" }}>AiiAco</span>.
          </p>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "16px", color: "rgba(200,215,230,0.70)", margin: 0, maxWidth: "60ch", marginLeft: "auto", marginRight: "auto" }}>
            AiiAco assembles, deploys, and manages your entire AI workforce — and delivers
            the results, not the workload.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
