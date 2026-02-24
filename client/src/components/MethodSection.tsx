/*
 * AiiACo Method Section — Corporate Institutional
 * "From Diagnostics to Compounding Results."
 * 5 phases — clinical, unemotional, powerful
 */
import { motion } from "framer-motion";

const phases = [
  {
    phase: "Phase 01",
    title: "Intelligence & Diagnostics",
    desc: "We assess operational bottlenecks, data readiness, revenue friction, and competitive exposure.",
    tags: ["Business architecture", "Process mapping", "ROI targets", "Risk assessment"],
  },
  {
    phase: "Phase 02",
    title: "Strategic AI Architecture",
    desc: "A custom integration blueprint with priorities, timeline, metrics, and investment structure.",
    tags: ["Blueprint", "Opportunity ranking", "Timeline", "Success metrics"],
  },
  {
    phase: "Phase 03",
    title: "Deployment",
    desc: "We configure, integrate, and operationalize the AI workforce: automations, agents, and systems.",
    tags: ["Integrations", "Automation", "AI agents", "Quality controls"],
  },
  {
    phase: "Phase 04",
    title: "Managed Optimization",
    desc: "Continuous improvement, monitoring, and scaling to ensure results compound over time.",
    tags: ["Monitoring", "Optimization", "Reporting", "Scaling"],
  },
  {
    phase: "Phase 05",
    title: "Measurable Results",
    desc: "Documented outcomes tied directly to business objectives. Optional success-linked pricing models.",
    tags: ["Outcome delivery", "Metric alignment", "Milestones", "Performance partnership"],
  },
];

export default function MethodSection() {
  return (
    <section id="method" className="py-16">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <div className="corp-pill mb-4">Method</div>
            <h2
              className="text-white m-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                letterSpacing: "-0.5px",
              }}
            >
              From Diagnostics to Compounding Results.
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-[52ch] m-0"
            style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            A disciplined process that upgrades operations, reduces friction, and scales
            performance without internal overload.
          </p>
        </div>

        {/* Phase steps */}
        <div className="flex flex-col gap-3">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="corp-card p-5"
              style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "16px", alignItems: "start" }}
            >
              {/* Phase badge */}
              <div
                className="text-center py-3 px-2 rounded-[14px] text-xs font-black tracking-[1px] uppercase"
                style={{
                  border: "1px solid rgba(184,156,74,0.32)",
                  background: "rgba(184,156,74,0.10)",
                  color: "rgba(255,255,255,0.86)",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {p.phase}
              </div>

              {/* Content */}
              <div>
                <h4
                  className="m-0 mb-2 font-bold"
                  style={{
                    fontSize: "16px",
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {p.title}
                </h4>
                <p
                  className="m-0 text-sm leading-relaxed"
                  style={{ color: "rgba(197,204,214,0.86)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {p.tags.map((tag) => (
                    <span key={tag} className="corp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
