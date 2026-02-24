/*
 * AiiACo Engagement Models Section — Corporate Institutional
 * "Choose Your Upgrade Path."
 * Three models: Strategic Upgrade / Full Integration / Performance Partnership
 */
import { motion } from "framer-motion";

const models = [
  {
    name: "Strategic Upgrade",
    badge: "Blueprint",
    meta: "A defined AI integration plan with priorities, metrics, and implementation structure.",
    features: [
      "Diagnostics + discovery",
      "Custom integration architecture",
      "ROI priorities and timeline",
      "Technology selection guidance",
      "30-day support window",
    ],
    cta: "Request Blueprint",
    featured: false,
  },
  {
    name: "Full Integration",
    badge: "Managed",
    meta: "End-to-end deployment and ongoing management. You focus on leadership. We run the AI system.",
    features: [
      "Everything in Strategic Upgrade",
      "Deployment + integrations",
      "Automation + agent configuration",
      "Monitoring + optimization",
      "Performance reporting",
    ],
    cta: "Request Integration",
    featured: true,
  },
  {
    name: "Performance Partnership",
    badge: "Aligned",
    meta: "Reduced upfront structure with milestone-based upside. We only earn more when targets are hit.",
    features: [
      "Everything in Full Integration",
      "Milestone-based structure",
      "Transparent metrics",
      "Success-linked fees",
      "Long-term compounding model",
    ],
    cta: "Explore Partnership",
    featured: false,
  },
];

export default function EngagementModels() {
  const scrollToUpgrade = () =>
    document.querySelector("#upgrade")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="models" className="py-16">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <div className="corp-pill mb-4">Engagement Models</div>
            <h2
              className="text-white m-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                letterSpacing: "-0.5px",
              }}
            >
              Choose Your Upgrade Path.
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-[52ch] m-0"
            style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Every engagement is scoped to business size and complexity. What never changes:
            execution, management, and measurable outcomes.
          </p>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="corp-card p-6 flex flex-col"
              style={
                model.featured
                  ? {
                      border: "1px solid rgba(184,156,74,0.45)",
                      background: "rgba(10,16,24,0.75)",
                      boxShadow: "0 20px 60px rgba(184,156,74,0.12)",
                    }
                  : {}
              }
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <h3
                  className="m-0 font-bold"
                  style={{
                    fontSize: "18px",
                    color: model.featured ? "#B89C4A" : "rgba(255,255,255,0.92)",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    letterSpacing: "-0.3px",
                  }}
                >
                  {model.name}
                </h3>
                <span className="corp-pill flex-shrink-0">{model.badge}</span>
              </div>

              {/* Meta */}
              <p
                className="text-sm leading-relaxed mb-5"
                style={{ color: "rgba(197,204,214,0.85)", fontFamily: "'DM Sans', sans-serif", margin: "0 0 20px" }}
              >
                {model.meta}
              </p>

              {/* Features */}
              <ul className="flex flex-col gap-2.5 m-0 p-0 list-none flex-1 mb-6">
                {model.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm"
                    style={{ color: "rgba(197,204,214,0.85)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span
                      className="flex-shrink-0 mt-[6px] w-1.5 h-1.5 rounded-full"
                      style={{ background: "rgba(184,156,74,0.70)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                onClick={scrollToUpgrade}
                className={model.featured ? "btn-primary w-full justify-center" : "btn-ghost w-full justify-center"}
              >
                {model.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <p
          className="mt-5 text-sm"
          style={{ color: "rgba(197,204,214,0.50)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Engagement begins with a structured diagnostic call to confirm fit and scope.
        </p>
      </div>
    </section>
  );
}
