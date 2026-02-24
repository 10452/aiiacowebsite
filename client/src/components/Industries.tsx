/*
 * AiiACo Industries Section — Upgraded Design
 * Vendasta-inspired: vivid colored accent cards, large headline, alternating bg
 */
import { motion } from "framer-motion";

const industries = [
  { title: "Financial Services", desc: "Lending, underwriting support, customer ops automation, compliance workflows.", color: "rgba(26,50,96,0.80)" },
  { title: "Real Estate", desc: "Lead ops, property workflows, investment analysis, document automation.", color: "rgba(18,37,72,0.80)" },
  { title: "Insurance", desc: "Claims triage, intake automation, underwriting acceleration, service systems.", color: "rgba(13,30,56,0.80)" },
  { title: "Crypto & Web3", desc: "Ops automation, support workflows, compliance layers, analytics pipelines.", color: "rgba(26,50,96,0.80)" },
  { title: "Software & Tech", desc: "SaaS operations, support automation, internal tooling, engineering leverage.", color: "rgba(18,37,72,0.80)" },
  { title: "Energy", desc: "Operations intelligence, vendor workflows, reporting automation, analytics.", color: "rgba(26,26,0,0.80)" },
  { title: "High-Risk Merchant", desc: "Portal automation, onboarding, monitoring, and compliance orchestration.", color: "rgba(13,30,56,0.80)" },
  { title: "Automotive & EV", desc: "Dealer ops, service workflows, scheduling, customer communication systems.", color: "rgba(26,50,96,0.80)" },
  { title: "Food & Beverage", desc: "Inventory + ops workflows, support systems, reporting, customer operations.", color: "rgba(18,37,72,0.80)" },
  { title: "Investment Firms", desc: "Portfolio analytics, reporting automation, client ops, research workflows.", color: "rgba(26,26,0,0.80)" },
  { title: "Luxury & Lifestyle", desc: "Client experience systems, concierge automation, brand ops, CRM intelligence.", color: "rgba(13,30,56,0.80)" },
  { title: "Alternative Energy", desc: "Biofuel, helium, hydrogen — operations data, compliance, and reporting systems.", color: "rgba(26,50,96,0.80)" },
];

export default function Industries() {
  return (
    <section
      id="industries"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #050C1A 0%, #0D1E38 60%, #050C1A 100%)",
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
          <div className="section-pill w-fit">Industries</div>
          <h2 className="section-headline" style={{ maxWidth: "22ch" }}>
            Cross-Industry{" "}
            <span className="accent">Deployment Capability.</span>
          </h2>
          <p className="section-subhead">
            If your business runs on processes, data, and decisions — it can be upgraded.
          </p>
        </motion.div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="card-base p-6 flex flex-col gap-3"
              style={{ background: ind.color }}
            >
              <div
                className="w-8 h-1 rounded-full"
                style={{ background: "linear-gradient(90deg, #D4A843, #F0C84A)" }}
              />
              <h3
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.2px",
                  margin: 0,
                }}
              >
                {ind.title}
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13.5px",
                  lineHeight: 1.6,
                  color: "rgba(200,212,224,0.80)",
                  margin: 0,
                }}
              >
                {ind.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "14px",
            color: "rgba(200,212,224,0.45)",
          }}
        >
          Don't see your sector? If it has workflows, it has leverage.
        </p>
      </div>
    </section>
  );
}
