/*
 * AiiACo Method Section — Liquid Glass Bio-Organic Design
 * 5-phase process with glass cards and gold spine
 */
import { motion } from "framer-motion";

const phases = [
  {
    num: "01",
    title: "Business Intelligence Audit",
    sub: "Diagnostic Clarity Before Any Recommendation",
    body: "We conduct a structured audit of your operations: process mapping, data readiness, bottleneck identification, revenue friction, and competitive exposure. No assumptions. No templates.",
    outputs: ["Process mapping", "Data readiness", "Bottleneck analysis", "Revenue friction", "Risk exposure", "Competitive gaps"],
  },
  {
    num: "02",
    title: "Strategic Architecture",
    sub: "Precision Before Deployment",
    body: "We design the integration blueprint: what gets upgraded first, why it matters, how it will be measured, and how it scales.",
    outputs: ["Integration blueprint", "ROI prioritization", "Governance", "Tooling selection", "Timeline", "Success metrics"],
  },
  {
    num: "03",
    title: "Future State Simulation",
    sub: "See the Outcome Before Execution",
    body: "Before implementation, you see the upgraded operating model: workflows, automations, decision loops, and expected outcomes.",
    outputs: ["Future-state map", "Outcome forecast", "KPI framework", "Investment structure", "Milestones", "Acceptance criteria"],
  },
  {
    num: "04",
    title: "Deployment & Integration",
    sub: "We Run It. You Receive Results.",
    body: "We configure the AI workforce, integrate systems, and operationalize execution. No tool chaos. No internal burden.",
    outputs: ["Automation build", "Agent orchestration", "Integrations", "Quality controls", "Monitoring", "Documentation"],
  },
  {
    num: "05",
    title: "Managed Optimization",
    sub: "Compounding Performance Over Time",
    body: "We run the system: reporting, improvement cycles, scaling support, and optional milestone-based performance alignment.",
    outputs: ["Optimization cycles", "Performance reporting", "Scaling", "Governance", "Success-linked fees", "Continuous improvement"],
  },
];

export default function MethodSection() {
  return (
    <section
      id="method"
      style={{
        position: "relative",
        padding: "120px 0",
        background: "#03050A",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(800px 600px at 10% 60%, rgba(184,156,74,0.04) 0%, transparent 55%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "640px", marginBottom: "72px" }}
        >
          <div className="section-pill" style={{ marginBottom: "20px", width: "fit-content" }}>
            <span className="dot" />
            The AiiAco Execution Method
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            Five Phases. <span className="accent">Zero Guesswork. Irreversible Results.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            This is not a roadmap. It is an execution protocol. AiiAco runs every phase — you receive outcomes at each milestone, not status reports and slide decks.
          </p>
        </motion.div>

        {/* Phases */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {phases.map((phase, i) => (
            <motion.div
              key={phase.num}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09, duration: 0.55 }}
              className="glass-card"
              style={{ padding: "28px 32px" }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "56px 1fr", gap: "20px", alignItems: "flex-start" }}>
                {/* Badge + spine */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <div className="phase-badge" style={{ width: "48px", height: "48px", fontSize: "13px", borderRadius: "14px" }}>{phase.num}</div>
                  {i < phases.length - 1 && (
                    <div style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, rgba(184,156,74,0.22), transparent)" }} />
                  )}
                </div>
                {/* Content */}
                <div>
                  <div style={{ marginBottom: "4px" }}>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.2px", textTransform: "uppercase", color: "rgba(184,156,74,0.72)" }}>
                      {phase.sub}
                    </span>
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(19px, 2vw, 25px)", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 12px", lineHeight: 1.15, letterSpacing: "-0.3px" }}>
                    {phase.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", lineHeight: 1.65, color: "rgba(200,215,230,0.70)", margin: "0 0 18px", maxWidth: "72ch" }}>
                    {phase.body}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
                    {phase.outputs.map((o) => (
                      <span
                        key={o}
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "12px",
                          fontWeight: 600,
                          color: "rgba(200,215,230,0.72)",
                          padding: "5px 12px",
                          borderRadius: "999px",
                          background: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        {o}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
