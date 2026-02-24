/*
 * AiiACo Platform Section — Corporate Institutional
 * "Not Software. Not Advice. Operational AI Infrastructure."
 * Six Foundations — no mystical tone, pure authority
 */
import { motion } from "framer-motion";

const PLATFORM_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/zAKMegHXoOd6CG42VZZYgq-img-2_1771967814000_na1fn_YWlpYWNvLXBsYXRmb3JtLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L3pBS01lZ0hYb09kNkNHNDJWWlpZZ3EtaW1nLTJfMTc3MTk2NzgxNDAwMF9uYTFmbl9ZV2xwWVdOdkxYQnNZWFJtYjNKdExXSm4ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dkf3r1eqc2z3mGml1T~-8tSZo5inV42giGqVcaGDFNxHHFzquC7XNqlshz1HThQncHcKowAtKkIzWWpxKQ7I4gp0sbTVCuhctwCl3EOwz1Zk90YAYb4QK0u-lfB-EYIzmMjPutN100KbKa8alIiAkoP1QhaISOZ~AXfeJusCoMAx53rCgTjcD~ju1SAG8zwM8kbFXU0FpOgYZT474gM96mwr54xvGqXMFE62wYjdH67d-R5aMSwaFxW7NnUCEa6zj6VALajtcXgVaODewwExXP0dZrCl0EYmPTSemUXpiC3~tJW7nPqDw~Hv8esbI2E2xzFbtBcvhVMIBmiZs1XAOg__";

const foundations = [
  {
    title: "Business Intelligence Audit",
    desc: "Comprehensive analysis of operational bottlenecks, revenue friction, and competitive exposure.",
  },
  {
    title: "Strategic AI Architecture",
    desc: "A custom-built integration blueprint aligned with measurable ROI targets.",
  },
  {
    title: "AI Workforce Deployment",
    desc: "We configure and integrate the precise systems your business requires.",
  },
  {
    title: "Full Execution",
    desc: "Deployment, integration, automation, and lifecycle management.",
  },
  {
    title: "Performance Alignment",
    desc: "Optional milestone-based or success-linked compensation structures.",
  },
  {
    title: "Enterprise-Grade Framework",
    desc: "Built on proven AI acquisition and operational models refined through cross-industry implementation.",
  },
];

const differentiators = [
  {
    title: "Not Software",
    desc: "We do not sell subscriptions. We build and operate AI infrastructure that runs inside your business.",
  },
  {
    title: "Not Advice",
    desc: "Strategy without implementation is theatre. We build the system, then run it with you.",
  },
  {
    title: "Measurable Outcomes",
    desc: "We align every deployment to targets and metrics that matter to your business.",
  },
];

export default function PlatformSection() {
  return (
    <section id="platform" className="relative py-16 overflow-hidden">
      {/* Subtle background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${PLATFORM_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070a] via-transparent to-[#05070a]" />

      <div className="container relative z-10">
        {/* Section header */}
        <div className="flex items-end justify-between gap-6 mb-10 flex-wrap">
          <div>
            <div className="corp-pill mb-4">Platform</div>
            <h2
              className="text-white m-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                letterSpacing: "-0.5px",
              }}
            >
              Not Software. Not Advice.
              <br />
              Operational AI Infrastructure.
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-[52ch]"
            style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif", margin: 0 }}
          >
            Most AI vendors increase your complexity. AiiAco removes it. We replace
            fragmented tools, scattered automation, and internal AI confusion with one
            unified execution model.
          </p>
        </div>

        {/* Core statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="corp-card p-7 mb-8"
        >
          <p
            className="text-base leading-relaxed m-0"
            style={{ color: "rgba(197,204,214,0.88)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Instead of hiring AI tools and hoping your team figures them out, you engage
            AiiAco — and we architect, deploy, and manage the entire AI system for you.
          </p>
          <p
            className="mt-3 font-semibold m-0"
            style={{ color: "rgba(255,255,255,0.92)", fontFamily: "'DM Sans', sans-serif" }}
          >
            You receive outcomes. Not dashboards.
          </p>
        </motion.div>

        {/* Three differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="corp-card p-5"
            >
              <h3
                className="m-0 mb-2"
                style={{
                  fontSize: "16px",
                  color: "#B89C4A",
                  fontFamily: "'Playfair Display', Georgia, serif",
                  letterSpacing: "-0.2px",
                }}
              >
                {d.title}
              </h3>
              <p
                className="m-0 text-sm leading-relaxed"
                style={{ color: "rgba(197,204,214,0.85)", fontFamily: "'DM Sans', sans-serif" }}
              >
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Six foundations */}
        <div className="mb-4">
          <h3
            className="text-sm font-bold tracking-[1.2px] uppercase mb-5"
            style={{ color: "rgba(197,204,214,0.55)", fontFamily: "'DM Sans', sans-serif" }}
          >
            The Six Foundations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foundations.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="corp-card p-5"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="text-xs font-black tracking-[1px] uppercase"
                    style={{ color: "rgba(184,156,74,0.70)", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="m-0 text-sm font-bold"
                    style={{ color: "rgba(255,255,255,0.90)", fontFamily: "'DM Sans', sans-serif", letterSpacing: "-0.1px" }}
                  >
                    {f.title}
                  </h3>
                </div>
                <p
                  className="m-0 text-sm leading-relaxed"
                  style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
