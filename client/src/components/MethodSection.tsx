/*
 * AiiACo Method Section — Liquid Glass Bio-Organic Design
 * 5-phase process with glass cards and gold spine
 */
import { motion } from "framer-motion";

const phases = [
  {
    num: "01",
    title: "Business Intelligence Audit",
    sub: "Understand Before Recommending",
    body: "We begin with a structured audit of your business architecture — revenue model, operational workflow, technology stack, competitive environment, and growth constraints. This is not a discovery call. It is a diagnostic process designed to surface the precise gaps where AI integration will generate the highest return.",
    outputs: ["Revenue and operational gap analysis", "Competitive AI adoption assessment", "Technology infrastructure review", "Priority opportunity mapping"],
  },
  {
    num: "02",
    title: "Strategic AI Blueprint",
    sub: "Precision Before Deployment",
    body: "Based on the audit, we develop a custom AI integration blueprint. This document defines the specific systems to be deployed, the sequence of implementation, the measurable outcomes targeted, and the performance benchmarks that will govern the engagement.",
    outputs: ["Custom AI integration roadmap", "Prioritized deployment sequence", "ROI targets and performance benchmarks", "Resource and timeline framework"],
  },
  {
    num: "03",
    title: "AI Workforce Assembly",
    sub: "The Right Systems for the Right Functions",
    body: "AiiAco selects, configures, and deploys the AI systems required to execute the blueprint. This is a curated, purpose-built AI workforce — each system selected for its specific function within your operational architecture.",
    outputs: ["AI system selection and configuration", "Workflow integration and testing", "Performance baseline establishment", "Team onboarding and transition support"],
  },
  {
    num: "04",
    title: "Managed Execution",
    sub: "We Run It. You Receive Results.",
    body: "AiiAco manages the operational execution of your AI infrastructure. We monitor performance, resolve issues, optimize outputs, and ensure that the systems continue to deliver against the targets defined in the blueprint. You do not manage AI. You manage your business.",
    outputs: ["Ongoing system monitoring and management", "Performance reporting against benchmarks", "Continuous optimization and refinement", "Escalation and issue resolution"],
  },
  {
    num: "05",
    title: "Lifecycle Expansion",
    sub: "Growth Without Complexity",
    body: "As your business evolves, your AI infrastructure evolves with it. AiiAco conducts regular strategic reviews to identify new integration opportunities, expand existing systems, and ensure that your AI capabilities remain aligned with your current and future objectives.",
    outputs: ["Quarterly strategic review", "Capability expansion planning", "New opportunity identification", "Long-term AI roadmap management"],
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
            The Method
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            Five Phases. <span className="accent">One Outcome.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            A structured, five-phase process designed to take any business from its current
            operational state to a fully integrated, AI-powered architecture — with
            measurable outcomes at every stage.
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
