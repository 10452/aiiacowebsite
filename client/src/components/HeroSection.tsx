/*
 * AiiACo Hero Section — Liquid Glass Bio-Organic Design
 * Full-bleed liquid glass background, split layout, glass KPI cards
 */
import { motion } from "framer-motion";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/KV9rHWJ9VYR1NSAlzZrFLI-img-1_1771979979000_na1fn_YWlpYS1nbGFzcy1oZXJv.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L0tWOXJIV0o5VllSMU5TQWx6WnJGTEktaW1nLTFfMTc3MTk3OTk3OTAwMF9uYTFmbl9ZV2xwWVMxbmJHRnpjeTFvWlhKdi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=IIazNlOoHV8170uFXchIaHa34J5vzX23qrQb3LVV9AzF~OiH9Btz6EwN7L0xgFpZUpHLzjZBGC2NCSJn5EmFUhL2xrlVox-b-NOvzv0SO4hPEa18Zl32uzJoHrGaSqeyyyatH2USmFpbJw2xHVVXrhJB3ALS0Xk-uE1E6GVda3za0ztjngT50984lFRGyMW8eHm8hrWKrXimODsn3WolhqTB5aHLxMbD8Pgr-QWkFrVXmyhtWUh-psF3WuzurBLB~FQEs5oh4pQ1csdxuziIv1MoaWyYbJt5e6VFIbCKGhcd6~Hbf4qDtWpuRhknbOX2z2poIASSL5rf7rDsLfB0Pg__";

const kpis = [
  { num: "20+", label: "Industries Integrated", sub: "Cross-industry deployment capability for high-complexity operations." },
  { num: "100%", label: "Managed Execution", sub: "We build, integrate, and run the system. You run the business." },
  { num: "0", label: "Internal Overload", sub: "Outcomes delivered without dumping complexity on your team." },
];

const points = [
  "Business architecture audit: friction, leverage, and exposure",
  "Custom integration blueprint aligned to measurable ROI",
  "Deployment + managed optimization without internal overload",
  "Optional performance alignment: milestones, metrics, and success-linked fees",
];

export default function HeroSection() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  const scrollToPlatform = () =>
    document.querySelector("#platform")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#03050A",
      }}
    >
      {/* Liquid glass background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center right",
          opacity: 0.22,
        }}
      />
      {/* Directional fade */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(3,5,10,0.94) 0%, rgba(3,5,10,0.70) 50%, rgba(3,5,10,0.30) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(700px 500px at 8% 75%, rgba(184,156,74,0.07) 0%, transparent 60%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "80px", paddingBottom: "80px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.3fr 0.7fr",
            gap: "32px",
            alignItems: "stretch",
          }}
          className="lg:grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
          >
            <div className="section-pill w-fit">
              <span className="dot" />
              AI Integration Authority — Not Consulting. Execution.
            </div>

            <h1 className="display-headline">
              Operational AI Integration<br />
              <span className="gold-line">for the Corporate Age.</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 700, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.70)", margin: "-8px 0 0" }}>
              The Corporate Age of AI Has Begun. Upgrade or Fall Behind.
            </p>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(15px, 1.5vw, 18px)", lineHeight: 1.65, color: "rgba(200,215,230,0.82)", maxWidth: "52ch", margin: 0 }}>
              AiiAco is the AI Integration Authority that designs, deploys, and manages your
              complete AI operational infrastructure — from diagnostics to execution.{" "}
              <strong style={{ color: "rgba(255,255,255,0.92)", fontWeight: 700 }}>
                You do not hire AI tools. You hire AiiAco. AiiAco hires and manages everything else.
              </strong>
            </p>

            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              {points.map((p) => (
                <li key={p} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", fontWeight: 600, color: "rgba(210,220,235,0.85)" }}>
                  <span style={{ width: "18px", height: "18px", borderRadius: "50%", background: "rgba(184,156,74,0.12)", border: "1px solid rgba(184,156,74,0.32)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px", fontSize: "10px", color: "#D4A843", fontWeight: 900 }}>✓</span>
                  {p}
                </li>
              ))}
            </ul>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "4px" }}>
              <button onClick={scrollToContact} className="btn-gold" style={{ fontSize: "15px", padding: "14px 30px" }}>
                Request Your Upgrade Plan
              </button>
              <button onClick={() => document.querySelector("#method")?.scrollIntoView({ behavior: "smooth" })} className="btn-glass" style={{ fontSize: "15px", padding: "14px 24px" }}>
                Review the Method
              </button>
            </div>

            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12.5px", color: "rgba(200,215,230,0.50)", margin: 0, letterSpacing: "0.1px" }}>
                Not a consultant. Not a software vendor. The AI Integration Authority that executes.
              </p>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", fontStyle: "italic", color: "rgba(200,215,230,0.38)", margin: 0 }}>
                We do not advise. We do not recommend. We build, deploy, and run your AI operation.
              </p>
            </div>
          </motion.div>

          {/* Right: KPI + how it works */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
            className="hidden lg:flex"
          >
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.10 }}
                className="glass-card"
                style={{ padding: "20px 24px" }}
              >
                <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "12px" }}>
                  <span className="stat-number">{kpi.num}</span>
                  <span className="stat-label" style={{ textAlign: "right" }}>{kpi.label}</span>
                </div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.50)", margin: "8px 0 0", lineHeight: 1.4 }}>{kpi.sub}</p>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="glass-card-gold"
              style={{ padding: "24px", flex: 1 }}
            >
              <div className="section-pill" style={{ marginBottom: "14px", width: "fit-content" }}>
                <span className="dot" />
                How It Works
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 16px", lineHeight: 1.2, letterSpacing: "-0.3px" }}>
                One engagement.<br />
                <span style={{ color: "#D4A843" }}>Complete AI infrastructure.</span>
              </p>
              {[
                { n: "01", t: "We learn your business", s: "Architecture, goals, bottlenecks, competition." },
                { n: "02", t: "We build the blueprint", s: "Custom AI integration plan with ROI targets." },
                { n: "03", t: "We deploy and manage", s: "Full execution — you receive outcomes, not dashboards." },
              ].map((step) => (
                <div key={step.n} style={{ display: "flex", gap: "12px", alignItems: "flex-start", marginBottom: "12px" }}>
                  <div className="phase-badge" style={{ width: "30px", height: "30px", fontSize: "10px", borderRadius: "8px", flexShrink: 0 }}>{step.n}</div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", color: "rgba(255,255,255,0.90)", margin: "0 0 2px" }}>{step.t}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,215,230,0.62)", margin: 0, lineHeight: 1.4 }}>{step.s}</p>
                  </div>
                </div>
              ))}
              <div style={{ marginTop: "12px", padding: "12px 14px", borderRadius: "10px", background: "rgba(184,156,74,0.07)", border: "1px solid rgba(184,156,74,0.18)" }}>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(210,220,235,0.78)", margin: 0, lineHeight: 1.5 }}>
                  Performance-based models available — we earn more when you hit your targets.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100px", background: "linear-gradient(to bottom, transparent, #03050A)", pointerEvents: "none" }} />
    </section>
  );
}
