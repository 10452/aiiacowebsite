/*
 * AiiACo Engagement Models — Upgraded Design
 * Vendasta-inspired: vivid featured card, bold headline, strong CTA
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
    bg: "rgba(9,19,37,0.80)",
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
    bg: "linear-gradient(160deg, #1A3260 0%, #0D1E38 100%)",
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
    bg: "rgba(26,26,0,0.60)",
  },
];

export default function EngagementModels() {
  const scrollToUpgrade = () =>
    document.querySelector("#upgrade")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="models"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #050C1A 0%, #091325 100%)",
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
          <div className="section-pill w-fit">Engagement Models</div>
          <h2 className="section-headline" style={{ maxWidth: "18ch" }}>
            Choose Your{" "}
            <span className="accent">Upgrade Path.</span>
          </h2>
          <p className="section-subhead">
            Every engagement is scoped to business size and complexity. What never changes:
            execution, management, and measurable outcomes.
          </p>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {models.map((model, i) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              className="flex flex-col rounded-[20px] overflow-hidden"
              style={{
                background: model.bg,
                border: model.featured
                  ? "1.5px solid rgba(212,168,67,0.50)"
                  : "1px solid rgba(200,212,224,0.12)",
                boxShadow: model.featured
                  ? "0 0 0 1px rgba(212,168,67,0.15), 0 32px 80px rgba(212,168,67,0.12)"
                  : "0 12px 40px rgba(0,0,0,0.35)",
                position: "relative",
              }}
            >
              {/* Featured badge */}
              {model.featured && (
                <div
                  className="text-center py-2 text-xs font-black tracking-[1.2px] uppercase"
                  style={{
                    background: "linear-gradient(90deg, #D4A843, #F0C84A)",
                    color: "#0A0800",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Most Comprehensive
                </div>
              )}

              <div className="p-7 flex flex-col flex-1 gap-5">
                {/* Top */}
                <div className="flex items-start justify-between gap-3">
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: "clamp(18px, 2vw, 22px)",
                      fontWeight: 800,
                      color: model.featured ? "#D4A843" : "rgba(255,255,255,0.95)",
                      letterSpacing: "-0.3px",
                      margin: 0,
                    }}
                  >
                    {model.name}
                  </h3>
                  <span className="section-pill flex-shrink-0" style={{ fontSize: "10px" }}>
                    {model.badge}
                  </span>
                </div>

                {/* Meta */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.65,
                    color: "rgba(200,212,224,0.85)",
                    margin: 0,
                  }}
                >
                  {model.meta}
                </p>

                {/* Features */}
                <ul className="flex flex-col gap-3 m-0 p-0 list-none flex-1">
                  {model.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "14px",
                        color: "rgba(200,212,224,0.85)",
                      }}
                    >
                      <span
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: "rgba(212,168,67,0.15)",
                          border: "1px solid rgba(212,168,67,0.30)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "2px",
                          fontSize: "10px",
                          color: "#D4A843",
                          fontWeight: 900,
                        }}
                      >
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={scrollToUpgrade}
                  className={model.featured ? "btn-gold w-full" : "btn-outline w-full"}
                >
                  {model.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fine print */}
        <p
          className="mt-6"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "rgba(200,212,224,0.40)",
          }}
        >
          Engagement begins with a structured diagnostic call to confirm fit and scope.
        </p>
      </div>
    </section>
  );
}
