/*
 * AiiACo Hero Section — Upgraded Design
 * Vendasta-inspired: massive headline, vivid gradient bg, bold stats row
 */
import { motion } from "framer-motion";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/zAKMegHXoOd6CG42VZZYgq-img-1_1771967819000_na1fn_YWlpYWNvLWhlcm8tYmctdjI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L3pBS01lZ0hYb09kNkNHNDJWWlpZZ3EtaW1nLTFfMTc3MTk2NzgxOTAwMF9uYTFmbl9ZV2xwWVdOdkxXaGxjbTh0WW1jdGRqSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uGUUJun3C9-~hxjPlgGvIwwq6IP6uflOnj6K1AlcjoJaieput0ola2TN4Zls4jP-uxM5b7bcymO2~JO9TLQA83xeLzSTzzzfwUwlUaa5JeKQdHqZBNQot-fZ9q48tmfgSmQRZTqQPDr77qWt52jvtUwSnhL5j7QrwfMZyLdK~qGKhXv-MD8ax0JZDX86xa1qZFsMfmsDT6CI0NmFzEZPEbAKo8EzUyU1JqRxM8lInVfx1aTAEuioXVrJffuOxhtTfwEfpaC0Mc0CurjEJidUEKXlPXk1689SSEjfYuOCp7Aq78mazRY6qSGyeO7JgliwboOduKPlwJmVHQUWN~HL8g__";

const stats = [
  { num: "20+", label: "Industries Integrated" },
  { num: "100%", label: "Managed Execution" },
  { num: "0", label: "Internal Overload" },
  { num: "3", label: "Engagement Models" },
];

const valuePoints = [
  "Deep structural analysis of your business architecture",
  "Custom AI integration blueprint with measurable ROI targets",
  "Full deployment, managed execution, and lifecycle optimization",
  "Performance-aligned engagement models available",
];

export default function HeroSection() {
  const scrollToUpgrade = () =>
    document.querySelector("#upgrade")?.scrollIntoView({ behavior: "smooth" });
  const scrollToMethod = () =>
    document.querySelector("#method")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "80px",
        background: "linear-gradient(160deg, #0D2050 0%, #091325 45%, #050C1A 100%)",
      }}
    >
      {/* Background image overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
          opacity: 0.12,
          mixBlendMode: "luminosity",
        }}
      />
      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(900px 600px at 80% 30%, rgba(212,168,67,0.10) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-40"
        style={{ background: "linear-gradient(to top, #050C1A, transparent)" }}
      />

      <div className="container relative z-10">
        {/* Main content — two column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center mb-16">
          {/* Left: Primary copy */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-7"
          >
            <div className="section-pill w-fit">AI Integration Authority</div>

            <h1
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(38px, 5.5vw, 72px)",
                fontWeight: 900,
                lineHeight: 1.02,
                letterSpacing: "-1.5px",
                color: "rgba(255,255,255,0.96)",
                margin: 0,
              }}
            >
              The Corporate Age of AI Has Begun.{" "}
              <span className="text-shimmer">Upgrade or Fall Behind.</span>
            </h1>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "clamp(16px, 1.8vw, 20px)",
                lineHeight: 1.65,
                color: "rgba(200,212,224,0.85)",
                margin: 0,
                maxWidth: "54ch",
              }}
            >
              AiiAco designs, deploys, and manages complete AI operational systems
              for businesses that intend to lead — not experiment.{" "}
              <strong style={{ color: "rgba(255,255,255,0.95)", fontWeight: 700 }}>
                We do not sell tools. We engineer outcomes.
              </strong>
            </p>

            <ul className="flex flex-col gap-3.5 m-0 p-0 list-none">
              {valuePoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.88)",
                  }}
                >
                  <span
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #D4A843, #F0C84A)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      fontSize: "11px",
                      fontWeight: 900,
                      color: "#0A0800",
                    }}
                  >
                    ✓
                  </span>
                  {point}
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button onClick={scrollToUpgrade} className="btn-gold">
                Request Your Upgrade Plan
              </button>
              <button onClick={scrollToMethod} className="btn-outline">
                Review the Method
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Feature card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="card-base p-8 flex flex-col gap-6"
          >
            <div>
              <p
                className="section-pill w-fit mb-4"
                style={{ fontSize: "10px" }}
              >
                How it works
              </p>
              <h3
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.4px",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                One engagement.
                <br />
                <span className="text-gold">Complete AI infrastructure.</span>
              </h3>
            </div>

            <div className="flex flex-col gap-4">
              {[
                { step: "01", title: "We learn your business", desc: "Architecture, goals, bottlenecks, competition." },
                { step: "02", title: "We build the blueprint", desc: "Custom AI integration plan with ROI targets." },
                { step: "03", title: "We deploy and manage", desc: "Full execution — you receive outcomes, not dashboards." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="phase-badge" style={{ width: "36px", height: "36px", fontSize: "11px" }}>
                    {item.step}
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "14px",
                        color: "rgba(255,255,255,0.92)",
                        margin: "0 0 2px",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(200,212,224,0.70)",
                        margin: 0,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="rounded-xl p-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, rgba(212,168,67,0.12), rgba(212,168,67,0.05))",
                border: "1px solid rgba(212,168,67,0.28)",
              }}
            >
              <div className="dot-pulse flex-shrink-0" />
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  margin: 0,
                }}
              >
                Performance-based models available — we earn more when you hit targets.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{
            background: "rgba(200,212,224,0.10)",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(200,212,224,0.12)",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center justify-center py-7 px-4 gap-1"
              style={{
                background: i % 2 === 0 ? "rgba(9,19,37,0.75)" : "rgba(13,30,56,0.65)",
              }}
            >
              <span className="stat-number">{stat.num}</span>
              <span className="stat-label text-center">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
