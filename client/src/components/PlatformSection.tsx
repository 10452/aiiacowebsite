/*
 * AiiACo Platform Section — Upgraded Design
 * Vendasta-inspired: vivid gradient bg, large headline, bold card grid
 */
import { motion } from "framer-motion";

const foundations = [
  { num: "01", title: "Business Intelligence Audit", desc: "Comprehensive analysis of operational bottlenecks, revenue friction, and competitive exposure." },
  { num: "02", title: "Strategic AI Architecture", desc: "A custom-built integration blueprint aligned with measurable ROI targets." },
  { num: "03", title: "AI Workforce Deployment", desc: "We configure and integrate the precise systems your business requires." },
  { num: "04", title: "Full Execution", desc: "Deployment, integration, automation, and lifecycle management." },
  { num: "05", title: "Performance Alignment", desc: "Optional milestone-based or success-linked compensation structures." },
  { num: "06", title: "Enterprise-Grade Framework", desc: "Built on proven AI acquisition and operational models refined through cross-industry implementation." },
];

const differentiators = [
  {
    title: "Not Software",
    desc: "We do not sell subscriptions. We build and operate AI infrastructure that runs inside your business.",
    gradient: "linear-gradient(135deg, #1A3260 0%, #0D1E38 100%)",
  },
  {
    title: "Not Advice",
    desc: "Strategy without implementation is theatre. We build the system, then run it with you.",
    gradient: "linear-gradient(135deg, #1A1200 0%, #0D1E38 100%)",
  },
  {
    title: "Measurable Outcomes",
    desc: "We align every deployment to targets and metrics that matter to your business.",
    gradient: "linear-gradient(135deg, #0D2050 0%, #050C1A 100%)",
  },
];

export default function PlatformSection() {
  return (
    <section
      id="platform"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #050C1A 0%, #091325 50%, #050C1A 100%)",
      }}
    >
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-5 items-start"
        >
          <div className="section-pill">Platform</div>
          <h2 className="section-headline" style={{ maxWidth: "16ch" }}>
            Not Software. Not Advice.{" "}
            <span className="accent">Operational AI Infrastructure.</span>
          </h2>
          <p className="section-subhead">
            Most AI vendors increase your complexity. AiiAco removes it. We replace
            fragmented tools, scattered automation, and internal AI confusion with one
            unified execution model. You receive outcomes. Not dashboards.
          </p>
        </motion.div>

        {/* Three differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="rounded-[18px] p-7 flex flex-col gap-3"
              style={{
                background: d.gradient,
                border: "1px solid rgba(200,212,224,0.12)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "22px",
                  fontWeight: 800,
                  color: "#D4A843",
                  letterSpacing: "-0.3px",
                  margin: 0,
                }}
              >
                {d.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  color: "rgba(200,212,224,0.85)",
                  margin: 0,
                }}
              >
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Six foundations */}
        <div>
          <p
            className="stat-label mb-6"
            style={{ color: "rgba(200,212,224,0.40)" }}
          >
            The Six Foundations
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foundations.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card-gradient p-6 flex gap-4 items-start"
              >
                <div className="phase-badge">{f.num}</div>
                <div>
                  <h4
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "rgba(255,255,255,0.92)",
                      margin: "0 0 6px",
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {f.title}
                  </h4>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                      color: "rgba(200,212,224,0.75)",
                      margin: 0,
                    }}
                  >
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
