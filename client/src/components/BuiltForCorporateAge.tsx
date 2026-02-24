/*
 * AiiACo Built For Corporate Age — Upgraded Design
 * Vendasta-inspired: vivid gradient section, large quote, bold stats
 */
import { motion } from "framer-motion";

const pillars = [
  { num: "1", title: "Hire One. Deploy Many.", desc: "Instead of sourcing, onboarding, and managing multiple AI vendors, you engage AiiAco. We architect the entire AI workforce and manage it on your behalf." },
  { num: "2", title: "No Learning Curve.", desc: "You do not need to become an AI expert. We translate your business goals into operational systems. You receive outcomes, not complexity." },
  { num: "3", title: "Aligned Incentives.", desc: "In our Performance Partnership model, our compensation is tied to your results. We build for outcomes because that is how we are measured." },
];

const stats = [
  { num: "20+", label: "Industries" },
  { num: "5", label: "Deployment Phases" },
  { num: "3", label: "Engagement Models" },
  { num: "0", label: "Internal Overload" },
];

export default function BuiltForCorporateAge() {
  const scrollToContact = () =>
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="about"
      className="py-24"
      style={{
        background: "linear-gradient(160deg, #0D2050 0%, #091325 40%, #1A1200 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(800px 500px at 50% 0%, rgba(212,168,67,0.10) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 flex flex-col gap-5 items-center text-center"
        >
          <div className="section-pill">Built for the Corporate Age</div>
          <h2 className="section-headline" style={{ maxWidth: "22ch", textAlign: "center" }}>
            One Engagement.{" "}
            <span className="accent">Your Entire AI Infrastructure.</span>
          </h2>
          <p className="section-subhead" style={{ textAlign: "center", maxWidth: "60ch", margin: "0 auto" }}>
            AiiAco is not a software subscription. It is not a consulting report. It is the
            operating layer that transforms your business into an AI-powered enterprise.
          </p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-14"
          style={{
            background: "rgba(200,212,224,0.10)",
            borderRadius: "18px",
            overflow: "hidden",
            border: "1px solid rgba(200,212,224,0.12)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center py-8 gap-1"
              style={{
                background: i % 2 === 0 ? "rgba(9,19,37,0.75)" : "rgba(13,30,56,0.65)",
              }}
            >
              <span className="stat-number">{s.num}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="card-base p-7 flex flex-col gap-4"
            >
              <div
                className="w-10 h-10 rounded-[12px] flex items-center justify-center flex-shrink-0"
                style={{
                  background: "linear-gradient(135deg, rgba(212,168,67,0.20), rgba(212,168,67,0.06))",
                  border: "1px solid rgba(212,168,67,0.30)",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontWeight: 900,
                    fontSize: "16px",
                    color: "#D4A843",
                  }}
                >
                  {p.num}
                </span>
              </div>
              <h4
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(17px, 2vw, 21px)",
                  fontWeight: 800,
                  color: "rgba(255,255,255,0.95)",
                  letterSpacing: "-0.3px",
                  margin: 0,
                }}
              >
                {p.title}
              </h4>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14.5px",
                  lineHeight: 1.65,
                  color: "rgba(200,212,224,0.82)",
                  margin: 0,
                }}
              >
                {p.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Central quote + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-[24px] p-10 md:p-14 flex flex-col items-center gap-8 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(212,168,67,0.10) 0%, rgba(13,30,56,0.80) 50%, rgba(26,50,96,0.60) 100%)",
            border: "1px solid rgba(212,168,67,0.25)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.40)",
          }}
        >
          <blockquote
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(22px, 3.5vw, 38px)",
              fontWeight: 800,
              lineHeight: 1.2,
              letterSpacing: "-0.6px",
              color: "rgba(255,255,255,0.95)",
              margin: 0,
              maxWidth: "28ch",
            }}
          >
            "We don't just tell you how to do it.{" "}
            <span style={{ color: "#D4A843" }}>We deliver the results."</span>
          </blockquote>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              color: "rgba(200,212,224,0.75)",
              margin: 0,
              maxWidth: "52ch",
            }}
          >
            AiiAco is the turnkey AI agency. You hire one entity. We hire and manage
            your entire AI workforce and deliver outcomes — not workload.
          </p>
          <button onClick={scrollToContact} className="btn-gold" style={{ fontSize: "16px", padding: "16px 36px" }}>
            Begin Your Upgrade
          </button>
        </motion.div>
      </div>
    </section>
  );
}
