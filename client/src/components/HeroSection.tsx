/*
 * AiiACo Hero Section — Corporate Institutional
 * Design: Split layout — copy left, KPI cards right
 * Background: hexagonal circuit grid image
 * Tone: AI Integration Authority. Cold. Controlled. Inevitable.
 */
import { motion } from "framer-motion";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/zAKMegHXoOd6CG42VZZYgq-img-1_1771967819000_na1fn_YWlpYWNvLWhlcm8tYmctdjI.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L3pBS01lZ0hYb09kNkNHNDJWWlpZZ3EtaW1nLTFfMTc3MTk2NzgxOTAwMF9uYTFmbl9ZV2xwWVdOdkxXaGxjbTh0WW1jdGRqSS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=uGUUJun3C9-~hxjPlgGvIwwq6IP6uflOnj6K1AlcjoJaieput0ola2TN4Zls4jP-uxM5b7bcymO2~JO9TLQA83xeLzSTzzzfwUwlUaa5JeKQdHqZBNQot-fZ9q48tmfgSmQRZTqQPDr77qWt52jvtUwSnhL5j7QrwfMZyLdK~qGKhXv-MD8ax0JZDX86xa1qZFsMfmsDT6CI0NmFzEZPEbAKo8EzUyU1JqRxM8lInVfx1aTAEuioXVrJffuOxhtTfwEfpaC0Mc0CurjEJidUEKXlPXk1689SSEjfYuOCp7Aq78mazRY6qSGyeO7JgliwboOduKPlwJmVHQUWN~HL8g__";

const kpis = [
  {
    num: "20+",
    label: "Industries Integrated",
    sub: "Cross-sector deployment capability across high-complexity verticals.",
  },
  {
    num: "100%",
    label: "Managed Execution",
    sub: "We architect, deploy, and operate. You receive outcomes, not dashboards.",
  },
  {
    num: "0",
    label: "Internal Overload",
    sub: "No new hires. No new complexity. AI infrastructure without the burden.",
  },
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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ paddingTop: "80px", paddingBottom: "40px" }}
    >
      {/* Background image — hexagonal circuit grid */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#05070a] via-[#05070a]/70 to-[#05070a]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070a] via-transparent to-transparent" />

      <div className="container relative z-10">
        <div
          className="grid gap-6 items-stretch"
          style={{ gridTemplateColumns: "1.25fr 0.75fr" }}
        >
          {/* Left: Primary copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="corp-card p-8 md:p-10 flex flex-col gap-6"
          >
            {/* Label */}
            <div className="corp-pill w-fit">AI Integration Authority</div>

            {/* Headline */}
            <h1
              className="text-white leading-[1.02] tracking-tight"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(32px, 4vw, 54px)",
                letterSpacing: "-0.8px",
                margin: 0,
              }}
            >
              The Corporate Age of AI Has Begun.{" "}
              <span style={{ color: "#B89C4A" }}>Upgrade or Fall Behind.</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="text-base leading-relaxed"
              style={{
                color: "rgba(197,204,214,0.86)",
                maxWidth: "56ch",
                fontFamily: "'DM Sans', sans-serif",
                margin: 0,
              }}
            >
              AiiAco designs, deploys, and manages complete AI operational systems
              for businesses that intend to lead — not experiment.
              <br />
              <span
                className="font-semibold mt-2 block"
                style={{ color: "rgba(255,255,255,0.90)" }}
              >
                We do not sell tools. We engineer outcomes.
              </span>
            </p>

            {/* Value points */}
            <ul className="flex flex-col gap-3 m-0 p-0 list-none">
              {valuePoints.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="flex items-start gap-3"
                  style={{ color: "rgba(255,255,255,0.86)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}
                >
                  <span
                    className="flex-shrink-0 mt-[7px] w-2.5 h-2.5 rounded-full"
                    style={{
                      background: "rgba(184,156,74,0.85)",
                      boxShadow: "0 0 0 3px rgba(184,156,74,0.15)",
                    }}
                  />
                  {point}
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <button onClick={scrollToUpgrade} className="btn-primary">
                Request Your Upgrade Plan
              </button>
              <button onClick={scrollToMethod} className="btn-ghost">
                Review the Method
              </button>
            </motion.div>
          </motion.div>

          {/* Right: KPI cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.12 }}
                className="corp-card p-5 flex-1"
              >
                <div className="flex items-end justify-between gap-3">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontSize: "28px",
                      color: "#B89C4A",
                      letterSpacing: "-0.4px",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {kpi.num}
                  </span>
                  <span
                    className="text-right text-[11px] font-bold tracking-[1px] uppercase"
                    style={{ color: "rgba(197,204,214,0.65)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {kpi.label}
                  </span>
                </div>
                <p
                  className="mt-3 text-[13px] leading-relaxed"
                  style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif", margin: "12px 0 0" }}
                >
                  {kpi.sub}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
