/*
 * AiiACo — Built for the Corporate Age Section
 * Replaces team section entirely. No founders. No bios.
 * "We are building credibility through execution."
 */
import { motion } from "framer-motion";

const pillars = [
  {
    label: "Strategic Architecture",
    desc: "We design AI integration systems aligned to your business model, competitive position, and growth objectives.",
  },
  {
    label: "Deployment Engineering",
    desc: "We build and configure the AI infrastructure — tools, agents, automations — and integrate them into your operations.",
  },
  {
    label: "Operational Management",
    desc: "We run the system. Monitoring, optimization, reporting, and scaling — managed continuously.",
  },
];

export default function BuiltForCorporateAge() {
  return (
    <section className="py-16">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="corp-card p-10 md:p-14"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left: Statement */}
            <div>
              <div className="corp-pill mb-5">About AiiAco</div>
              <h2
                className="text-white m-0 mb-5"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                }}
              >
                Built for the Corporate Age.
              </h2>
              <p
                className="text-base leading-relaxed mb-4"
                style={{ color: "rgba(197,204,214,0.85)", fontFamily: "'DM Sans', sans-serif", margin: "0 0 16px" }}
              >
                AiiAco operates as an AI Integration Authority — combining strategic
                architecture, deployment engineering, and operational management into
                one unified system.
              </p>
              <p
                className="text-base leading-relaxed mb-6"
                style={{ color: "rgba(197,204,214,0.85)", fontFamily: "'DM Sans', sans-serif", margin: "0 0 24px" }}
              >
                We are not building credibility through biography.
                <br />
                <span
                  className="font-semibold"
                  style={{ color: "rgba(255,255,255,0.92)" }}
                >
                  We are building it through execution.
                </span>
              </p>

              {/* Core principle */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "rgba(184,156,74,0.08)",
                  border: "1px solid rgba(184,156,74,0.25)",
                }}
              >
                <p
                  className="m-0 text-sm leading-relaxed italic"
                  style={{ color: "rgba(255,255,255,0.88)", fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  "Most companies think they need AI tools. What they need is operational
                  restructuring. AiiAco does not give clients what they ask for. We give
                  them what creates leverage."
                </p>
              </div>
            </div>

            {/* Right: Three pillars */}
            <div className="flex flex-col gap-4">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black"
                    style={{
                      background: "rgba(184,156,74,0.12)",
                      border: "1px solid rgba(184,156,74,0.28)",
                      color: "#B89C4A",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    0{i + 1}
                  </div>
                  <div>
                    <h4
                      className="m-0 mb-1 font-bold text-sm"
                      style={{ color: "rgba(255,255,255,0.90)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {p.label}
                    </h4>
                    <p
                      className="m-0 text-sm leading-relaxed"
                      style={{ color: "rgba(197,204,214,0.75)", fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {p.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
