/*
 * AiiACo Upgrade / Contact Section — Corporate Institutional
 * "Upgrade Begins Here."
 * Serious tone. Diagnostic framing. No warm language.
 */
import { useState } from "react";
import { motion } from "framer-motion";

const UPGRADE_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/zAKMegHXoOd6CG42VZZYgq-img-3_1771967819000_na1fn_YWlpYWNvLXVwZ3JhZGUtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L3pBS01lZ0hYb09kNkNHNDJWWlpZZ3EtaW1nLTNfMTc3MTk2NzgxOTAwMF9uYTFmbl9ZV2xwWVdOdkxYVndaM0poWkdVdFltYy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=dLRKijotF~E3kQJd~kMSq6Z-yXxSbwAIRRYh8cx5i7ibPgfvqsDtpGiXJYJ7dbeE5kK3b6R0O2CPAKyx1Rb5Fsnp61Yuo0drSeirRAJqQyxSOWysHYHQ2Z6JqEG9KN24iNDcTaVjmoV9QSeGvvuZXybmcrlR3Y4qlrGlMpfhVIt0-FhGciuSrLPhRJN6lhxzEsoe1i3bqX99vskUnKc1u5o1eEXyxdGj-dQjR-EIJj1nfgMIQFkwQGbzNnpBvH2AzNmVUTF1NhoiJbMfkzD0abd6mwfeEbz7lnCCSl8kQ1IG5RaLgw-zpH2P9ovcyaON4XNi2~EZ2yDdkWm7it~dig__";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", industry: "", model: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="upgrade" className="relative py-16 overflow-hidden">
      <div
        className="absolute inset-0 opacity-18"
        style={{
          backgroundImage: `url(${UPGRADE_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-transparent to-[#05070a]/80" />

      <div className="container relative z-10">
        <div className="flex items-end justify-between gap-6 mb-8 flex-wrap">
          <div>
            <div className="corp-pill mb-4">Upgrade</div>
            <h2
              className="text-white m-0"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(22px, 3vw, 36px)",
                letterSpacing: "-0.5px",
              }}
            >
              Upgrade Begins Here.
            </h2>
          </div>
          <p
            className="text-base leading-relaxed max-w-[52ch] m-0"
            style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
          >
            Describe your business. We will determine whether and how it should be upgraded.
          </p>
        </div>

        <div
          className="grid gap-6 items-start"
          style={{ gridTemplateColumns: "1fr 320px" }}
        >
          {/* Form */}
          <div className="corp-card p-7">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-12 text-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(184,156,74,0.15)", border: "1px solid rgba(184,156,74,0.35)" }}
                >
                  <span style={{ color: "#B89C4A", fontSize: "22px" }}>✓</span>
                </div>
                <h3
                  className="m-0 font-bold"
                  style={{
                    fontSize: "20px",
                    color: "rgba(255,255,255,0.92)",
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  Submission Received.
                </h3>
                <p
                  className="m-0 text-sm leading-relaxed max-w-[40ch]"
                  style={{ color: "rgba(197,204,214,0.80)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  We will review your submission and respond directly — not with a template.
                  Expect contact within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="corp-label" htmlFor="name">Your Name *</label>
                    <input id="name" name="name" required placeholder="Full name" className="corp-input" value={form.name} onChange={handleChange} />
                  </div>
                  <div>
                    <label className="corp-label" htmlFor="email">Email *</label>
                    <input id="email" name="email" type="email" required placeholder="name@company.com" className="corp-input" value={form.email} onChange={handleChange} />
                  </div>
                </div>
                <div>
                  <label className="corp-label" htmlFor="company">Company</label>
                  <input id="company" name="company" placeholder="Company / business name" className="corp-input" value={form.company} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="corp-label" htmlFor="industry">Industry *</label>
                    <select id="industry" name="industry" required className="corp-input" value={form.industry} onChange={handleChange}>
                      <option value="" disabled>Select</option>
                      <option>Financial Services</option>
                      <option>Real Estate</option>
                      <option>Insurance</option>
                      <option>Crypto & Web3</option>
                      <option>Software & Tech</option>
                      <option>Energy</option>
                      <option>High-Risk Merchant</option>
                      <option>Automotive & EV</option>
                      <option>Food & Beverage</option>
                      <option>Investment Firms</option>
                      <option>Luxury & Lifestyle</option>
                      <option>Alternative Energy</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="corp-label" htmlFor="model">Engagement Interest *</label>
                    <select id="model" name="model" required className="corp-input" value={form.model} onChange={handleChange}>
                      <option value="" disabled>Select</option>
                      <option>Strategic Upgrade</option>
                      <option>Full Integration</option>
                      <option>Performance Partnership</option>
                      <option>Not sure — need guidance</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="corp-label" htmlFor="message">Business Overview *</label>
                  <textarea
                    id="message" name="message" required rows={5}
                    placeholder="Describe your operations, bottlenecks, and targets. We will determine what should be upgraded."
                    className="corp-input resize-none"
                    value={form.message} onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn-primary w-full justify-center py-3">
                  Request Upgrade
                </button>
              </form>
            )}
          </div>

          {/* What happens next */}
          <div className="flex flex-col gap-4">
            <div className="corp-card p-6">
              <h3 className="m-0 mb-4 font-bold text-base" style={{ color: "rgba(255,255,255,0.92)", fontFamily: "'DM Sans', sans-serif" }}>
                What happens next
              </h3>
              {[
                "We review your submission",
                "You receive a direct response — not a template",
                "We confirm scope, metrics, and feasibility",
                "We initiate the upgrade plan",
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ background: "rgba(184,156,74,0.15)", border: "1px solid rgba(184,156,74,0.30)", color: "#B89C4A", fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {i + 1}
                  </span>
                  <p className="m-0 text-sm leading-relaxed" style={{ color: "rgba(197,204,214,0.82)", fontFamily: "'DM Sans', sans-serif" }}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
            <div className="rounded-xl p-5" style={{ background: "rgba(184,156,74,0.07)", border: "1px solid rgba(184,156,74,0.22)" }}>
              <p className="m-0 text-[11px] font-bold tracking-[0.8px] uppercase mb-2" style={{ color: "rgba(184,156,74,0.70)", fontFamily: "'DM Sans', sans-serif" }}>
                AiiAco Principle
              </p>
              <p className="m-0 text-sm leading-relaxed italic" style={{ color: "rgba(255,255,255,0.85)", fontFamily: "'Playfair Display', Georgia, serif" }}>
                We do not build what clients ask for. We build what creates leverage.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
