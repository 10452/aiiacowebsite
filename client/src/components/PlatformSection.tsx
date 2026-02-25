/*
 * AiiACo Platform Section — Liquid Glass Bio-Organic Design
 * Six foundations, glass cards, gold accents
 */
import { motion } from "framer-motion";

const foundations = [
  {
    num: "01",
    title: "Business Intelligence Mapping",
    body: "We begin by learning your business with the depth of a strategic partner — not a vendor. Revenue architecture, operational bottlenecks, competitive positioning, and growth constraints are catalogued before a single AI recommendation is made.",
  },
  {
    num: "02",
    title: "AI Integration Blueprint",
    body: "Every engagement produces a custom integration blueprint: a structured, sequenced plan that maps AI capabilities to your specific operational gaps and growth objectives. No generic frameworks. No recycled playbooks.",
  },
  {
    num: "03",
    title: "Managed Deployment",
    body: "AiiAco executes. We do not hand you a roadmap and leave. Our team deploys, configures, and integrates AI systems directly into your operations — with full accountability for outcomes.",
  },
  {
    num: "04",
    title: "AI Workforce Management",
    body: "Rather than requiring you to hire, manage, and coordinate multiple AI specialists, AiiAco functions as your AI Director — assembling, deploying, and managing a complete AI workforce on your behalf.",
  },
  {
    num: "05",
    title: "Performance Alignment",
    body: "Our performance-based engagement model means our compensation is structurally tied to the results we deliver. When you grow, we grow. This is not a consulting model. It is a partnership model.",
  },
  {
    num: "06",
    title: "Continuous Optimization",
    body: "AI integration is not a one-time event. AiiAco provides ongoing lifecycle management — monitoring performance, refining systems, and expanding capabilities as your business evolves.",
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
            The Platform
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            What AiiAco <span className="accent">Actually Does</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            AiiAco is not a software platform. It is an integrated AI operating system
            for your business — designed, deployed, and managed by a team that treats
            your outcomes as its own.
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
