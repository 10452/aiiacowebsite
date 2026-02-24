/*
 * AiiACo Industries Section — Corporate Institutional
 * "Cross-Industry Deployment Capability."
 * No niche language. Pure authority.
 */
import { motion } from "framer-motion";

const industries = [
  {
    title: "Financial Services",
    desc: "Lending, underwriting support, customer ops automation, compliance workflows.",
  },
  {
    title: "Real Estate",
    desc: "Lead ops, property workflows, investment analysis, document automation.",
  },
  {
    title: "Insurance",
    desc: "Claims triage, intake automation, underwriting acceleration, service systems.",
  },
  {
    title: "Crypto & Web3",
    desc: "Ops automation, support workflows, compliance layers, analytics pipelines.",
  },
  {
    title: "Software & Tech",
    desc: "SaaS operations, support automation, internal tooling, engineering leverage.",
  },
  {
    title: "Energy",
    desc: "Operations intelligence, vendor workflows, reporting automation, analytics.",
  },
  {
    title: "High-Risk Merchant",
    desc: "Portal automation, onboarding, monitoring, and compliance orchestration.",
  },
  {
    title: "Automotive & EV",
    desc: "Dealer ops, service workflows, scheduling, customer communication systems.",
  },
  {
    title: "Food & Beverage",
    desc: "Inventory + ops workflows, support systems, reporting, customer operations.",
  },
  {
    title: "Investment Firms",
    desc: "Portfolio analytics, reporting automation, client ops, research workflows.",
  },
  {
    title: "Luxury & Lifestyle",
    desc: "Client experience systems, concierge automation, brand ops, CRM intelligence.",
  },
  {
    title: "Alternative Energy",
    desc: "Biofuel, helium, hydrogen — operations data, compliance, and reporting systems.",
  },
];

export default function Industries() {
  return (
    <section id="industries" className="py-16">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <div className="corp-pill mb-4">Industries</div>
            <h2
              className="text-white m-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                letterSpacing: "-0.5px",
              }}
            >
              Cross-Industry Deployment Capability.
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-[52ch] m-0"
            style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            If your business runs on processes, data, and decisions — it can be upgraded.
          </p>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((ind, i) => (
            <motion.div
              key={ind.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="corp-card p-5"
            >
              <h3
                className="m-0 mb-2 font-bold"
                style={{
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.92)",
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "-0.2px",
                }}
              >
                {ind.title}
              </h3>
              <p
                className="m-0 text-sm leading-relaxed"
                style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {ind.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <p
          className="mt-5 text-sm"
          style={{ color: "rgba(197,204,214,0.55)", fontFamily: "'DM Sans', sans-serif" }}
        >
          Don't see your sector? If it has workflows, it has leverage.
        </p>
      </div>
    </section>
  );
}
