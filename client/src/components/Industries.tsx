/*
 * AiiACo Industries Section — Liquid Glass Bio-Organic Design
 * Cross-industry pill grid + capability cards
 */
import { motion } from "framer-motion";
import { industries as industryData } from "@/data/industries";

// Map display names to slugs for industries that have microsite pages
const industryLinks: { name: string; slug: string | null }[] = [
  { name: "Real Estate & Brokerage", slug: "real-estate-brokerage" },
  { name: "Mortgage & Lending", slug: "mortgage-lending" },
  { name: "High-Risk Merchant Services", slug: "high-risk-merchant-services" },
  { name: "Cryptocurrency & Digital Assets", slug: "cryptocurrency-digital-assets" },
  { name: "Insurance", slug: "insurance" },
  { name: "Luxury Lifestyle & Hospitality", slug: "luxury-lifestyle-hospitality" },
  { name: "Investment & Wealth Management", slug: "investment-wealth-management" },
  { name: "Software Consulting", slug: "software-consulting" },
  { name: "Software Engineering", slug: "software-engineering" },
  { name: "Beauty, Health & Wellness", slug: "beauty-health-wellness" },
  { name: "Cosmetics & Personal Care", slug: "cosmetics-personal-care" },
  { name: "Automotive & EV", slug: "automotive-ev" },
  { name: "Solar & Renewable Energy", slug: "solar-renewable-energy" },
  { name: "Battery & EV Technology", slug: null },
  { name: "Oil & Gas", slug: "oil-gas" },
  { name: "Alternative Energy", slug: "alternative-energy" },
  { name: "Helium & Specialty Gas", slug: null },
  { name: "Biofuel & Sustainable Fuels", slug: null },
  { name: "Food & Beverage", slug: "food-beverage" },
  { name: "Agency Operations", slug: "agency-operations" },
];

const capabilities = [
  { title: "Revenue Operations", desc: "Lead qualification, pipeline automation, conversion tracking, and revenue forecasting." },
  { title: "Customer Operations", desc: "Automated support, response consistency, retention systems, and lifecycle management." },
  { title: "Marketing Intelligence", desc: "Content generation, campaign optimization, audience segmentation, and performance analytics." },
  { title: "Financial Operations", desc: "Reporting automation, anomaly detection, compliance monitoring, and forecasting." },
  { title: "Workforce Optimization", desc: "Recruitment automation, onboarding systems, performance management, and workforce analytics." },
  { title: "Operational Infrastructure", desc: "Workflow orchestration, documentation automation, approvals, and decision support." },
];

export default function Industries() {
  return (
    <section
      id="industries"
      style={{
        position: "relative",
        padding: "120px 0",
        background: "#03050A",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(1000px 600px at 80% 30%, rgba(184,156,74,0.04) 0%, transparent 55%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: "640px", marginBottom: "64px" }}
        >
          <div className="section-pill" style={{ marginBottom: "20px", width: "fit-content" }}>
            <span className="dot" />
            Industries
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            Industry-Agnostic. <span className="accent">Operationally Precise.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            AI integration is not industry-specific. Operational drag, manual dependency, and decision latency exist across every sector. AiiAco has built and deployed across more than twenty industries.
          </p>
        </motion.div>

        {/* Industry pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "64px" }}
        >
          {industryLinks.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.35 }}
            >
              {industry.slug ? (
                <a
                  href={`/industries/${industry.slug}`}
                  style={{
                    display: "inline-block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(210,220,235,0.88)",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(184,156,74,0.22)",
                    cursor: "pointer",
                    textDecoration: "none",
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,156,74,0.10)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,156,74,0.45)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.04)";
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,156,74,0.22)";
                  }}
                >
                  {industry.name} →
                </a>
              ) : (
                <span
                  style={{
                    display: "inline-block",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "rgba(210,220,235,0.62)",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {industry.name}
                </span>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Capabilities */}
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.62)", marginBottom: "24px" }}>
          Core AI Capabilities Deployed Across All Industries
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="glass-card"
              style={{ padding: "22px 24px" }}
            >
              <h4 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "17px", fontWeight: 700, color: "rgba(255,255,255,0.94)", margin: "0 0 8px", letterSpacing: "-0.2px" }}>
                {cap.title}
              </h4>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", lineHeight: 1.6, color: "rgba(200,215,230,0.65)", margin: 0 }}>
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
