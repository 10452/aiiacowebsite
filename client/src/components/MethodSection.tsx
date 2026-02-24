/*
 * AiiACo Method Section — Upgraded Design
 * Vendasta-inspired: alternating bg, large phase cards, vivid phase badges
 */
import { motion } from "framer-motion";

const phases = [
  {
    phase: "Phase 01",
    title: "Intelligence & Diagnostics",
    desc: "We assess operational bottlenecks, data readiness, revenue friction, and competitive exposure.",
    tags: ["Business architecture", "Process mapping", "ROI targets", "Risk assessment"],
    accent: "rgba(212,168,67,0.15)",
  },
  {
    phase: "Phase 02",
    title: "Strategic AI Architecture",
    desc: "A custom integration blueprint with priorities, timeline, metrics, and investment structure.",
    tags: ["Blueprint", "Opportunity ranking", "Timeline", "Success metrics"],
    accent: "rgba(26,50,96,0.40)",
  },
  {
    phase: "Phase 03",
    title: "Deployment",
    desc: "We configure, integrate, and operationalize the AI workforce: automations, agents, and systems.",
    tags: ["Integrations", "Automation", "AI agents", "Quality controls"],
    accent: "rgba(212,168,67,0.15)",
  },
  {
    phase: "Phase 04",
    title: "Managed Optimization",
    desc: "Continuous improvement, monitoring, and scaling to ensure results compound over time.",
    tags: ["Monitoring", "Optimization", "Reporting", "Scaling"],
    accent: "rgba(26,50,96,0.40)",
  },
  {
    phase: "Phase 05",
    title: "Measurable Results",
    desc: "Documented outcomes tied directly to business objectives. Optional success-linked pricing models.",
    tags: ["Outcome delivery", "Metric alignment", "Milestones", "Performance partnership"],
    accent: "rgba(212,168,67,0.15)",
  },
];

export default function MethodSection() {
  return (
    <section
      id="method"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #050C1A 0%, #0D2050 50%, #050C1A 100%)",
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
          <div className="section-pill w-fit">Method</div>
          <h2 className="section-headline" style={{ maxWidth: "20ch" }}>
            From Diagnostics to{" "}
            <span className="accent">Compounding Results.</span>
          </h2>
          <p className="section-subhead">
            A disciplined process that upgrades operations, reduces friction, and scales
            performance without internal overload.
          </p>
        </motion.div>

        {/* Phase steps */}
        <div className="flex flex-col gap-4">
          {phases.map((p, i) => (
            <motion.div
              key={p.phase}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="card-base p-7"
              style={{ background: `rgba(9,19,37,0.75)` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-6 items-start">
                {/* Phase badge */}
                <div
                  className="rounded-[14px] py-4 px-3 flex flex-col items-center justify-center gap-1"
                  style={{
                    background: p.accent,
                    border: "1px solid rgba(212,168,67,0.25)",
                    minHeight: "80px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 800,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "rgba(212,168,67,0.80)",
                    }}
                  >
                    {p.phase}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "32px",
                      fontWeight: 900,
                      color: "#D4A843",
                      lineHeight: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h4
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(18px, 2vw, 24px)",
                      fontWeight: 800,
                      color: "rgba(255,255,255,0.95)",
                      letterSpacing: "-0.3px",
                      margin: "0 0 8px",
                    }}
                  >
                    {p.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "15px",
                      lineHeight: 1.65,
                      color: "rgba(200,212,224,0.85)",
                      margin: "0 0 14px",
                    }}
                  >
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="tag-chip">{tag}</span>
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
