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
  { name: "Battery & EV Technology", slug: "battery-ev-technology" },
  { name: "Oil & Gas", slug: "oil-gas" },
  { name: "Alternative Energy", slug: "alternative-energy" },
  { name: "Helium & Specialty Gas", slug: "helium-specialty-gas" },
  { name: "Biofuel & Sustainable Fuels", slug: "biofuel-sustainable-fuels" },
  { name: "Food & Beverage", slug: "food-beverage" },
  { name: "Agency Operations", slug: "agency-operations" },
  { name: "UHNW & Private Wealth", slug: "uhnw-private-wealth" },
  { name: "Financial Services", slug: "financial-services" },
  { name: "Software & Technology", slug: "software-technology" },
  { name: "Energy", slug: "energy" },
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
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
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
                    fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
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

        {/* UHNW Featured Section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            marginBottom: "64px",
            borderRadius: "16px",
            overflow: "hidden",
            position: "relative",
            background: "linear-gradient(135deg, rgba(184,156,74,0.07) 0%, rgba(3,5,10,0.95) 50%, rgba(184,156,74,0.04) 100%)",
            border: "1px solid rgba(184,156,74,0.28)",
            padding: "48px 48px",
          }}
        >
          {/* Background glow */}
          <div style={{ position: "absolute", top: 0, right: 0, width: "400px", height: "400px", background: "radial-gradient(circle, rgba(184,156,74,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            {/* Left: Copy */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                <span style={{
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                  fontSize: "10px",
                  fontWeight: 800,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(184,156,74,0.9)",
                  padding: "5px 12px",
                  border: "1px solid rgba(184,156,74,0.35)",
                  borderRadius: "4px",
                }}>PRIVATE DIVISION</span>
                <span style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", color: "rgba(184,156,74,0.55)", letterSpacing: "1px", textTransform: "uppercase" }}>UHNW &amp; Family Office</span>
              </div>
              <h3 style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: "rgba(255,255,255,0.96)",
                lineHeight: 1.15,
                margin: "0 0 16px",
                letterSpacing: "-0.5px",
              }}>
                AI Infrastructure<br />
                <span style={{ color: "#B89C4A" }}>for the Ultra-Private Tier.</span>
              </h3>
              <p style={{
                fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "rgba(200,215,230,0.72)",
                margin: "0 0 28px",
                maxWidth: "420px",
              }}>
                Ultra High Net Worth individuals and family offices operate at a level of complexity that standard enterprise tools cannot serve. AiiAco's Private Division builds AI infrastructure calibrated to the UHNW standard — absolute discretion, institutional precision.
              </p>
              <a
                href="/industries/uhnw-private-wealth"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                  color: "#03050A",
                  background: "linear-gradient(135deg, #C9A84C 0%, #B89C4A 100%)",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.88"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                Explore Private Division →
              </a>
            </div>

            {/* Right: KPI grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { value: "100%", label: "Discretion Standard", sub: "No exceptions" },
                { value: "60%", label: "Admin Overhead Reduced", sub: "Principal time reclaimed" },
                { value: "Real-Time", label: "Wealth Intelligence", sub: "Unified across entities" },
                { value: "0→AI", label: "Operations Infrastructure", sub: "Built for your structure" },
              ].map((kpi) => (
                <div
                  key={kpi.label}
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(184,156,74,0.15)",
                    borderRadius: "10px",
                    padding: "20px 18px",
                  }}
                >
                  <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "26px", fontWeight: 800, color: "#C9A84C", letterSpacing: "-0.5px", marginBottom: "4px" }}>{kpi.value}</div>
                  <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "12px", fontWeight: 700, color: "rgba(255,255,255,0.82)", marginBottom: "2px" }}>{kpi.label}</div>
                  <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", color: "rgba(200,215,230,0.45)" }}>{kpi.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Capabilities */}
        <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.62)", marginBottom: "24px" }}>
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
              <h4 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "17px", fontWeight: 700, color: "rgba(255,255,255,0.94)", margin: "0 0 8px", letterSpacing: "-0.2px" }}>
                {cap.title}
              </h4>
              <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", lineHeight: 1.6, color: "rgba(200,215,230,0.65)", margin: 0 }}>
                {cap.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
