/*
 * AiiACo Contact / Upgrade Section — Upgraded Design
 * Vendasta-inspired: vivid gradient bg, bold headline, polished form
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const industries = [
  "Financial Services", "Real Estate", "Insurance", "Crypto & Web3",
  "Software & Technology", "Energy (Oil, Gas, Alternative)", "High-Risk Merchant",
  "Automotive & EV", "Food & Beverage", "Investment / Wealth Management",
  "Luxury & Lifestyle", "Health, Beauty & Fitness", "Other",
];

const models = [
  "Strategic Upgrade — Blueprint",
  "Full Integration — Managed",
  "Performance Partnership — Aligned",
  "Not sure — advise me",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", industry: "", model: "", challenge: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #050C1A 0%, #091325 60%, #050C1A 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(700px 400px at 80% 50%, rgba(212,168,67,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 items-start">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="section-pill w-fit">Request Upgrade</div>
            <h2 className="section-headline" style={{ maxWidth: "18ch" }}>
              Begin Your{" "}
              <span className="accent">AI Upgrade.</span>
            </h2>
            <p className="section-subhead">
              Every engagement begins with a structured diagnostic call. We assess your
              operations, identify leverage points, and outline a deployment path.
            </p>

            {/* What to expect */}
            <div className="flex flex-col gap-4 mt-2">
              {[
                { step: "01", title: "Diagnostic Call", desc: "60-minute structured session to map your operations and objectives." },
                { step: "02", title: "Upgrade Blueprint", desc: "A custom integration plan with priorities, timeline, and ROI targets." },
                { step: "03", title: "Deployment Decision", desc: "Choose your engagement model and initiate execution." },
              ].map((item) => (
                <div key={item.step} className="flex gap-4 items-start">
                  <div className="phase-badge" style={{ width: "36px", height: "36px", fontSize: "11px", flexShrink: 0 }}>
                    {item.step}
                  </div>
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.92)", margin: "0 0 2px" }}>
                      {item.title}
                    </p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(200,212,224,0.70)", margin: 0, lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div
              className="rounded-[14px] p-5 mt-2"
              style={{
                background: "linear-gradient(135deg, rgba(212,168,67,0.10), rgba(212,168,67,0.04))",
                border: "1px solid rgba(212,168,67,0.25)",
              }}
            >
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "15px", fontStyle: "italic", color: "rgba(255,255,255,0.88)", margin: 0, lineHeight: 1.6 }}>
                "We do not build what clients ask for. We build what creates leverage."
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {submitted ? (
              <div
                className="rounded-[20px] p-10 flex flex-col items-center gap-5 text-center"
                style={{
                  background: "rgba(9,19,37,0.80)",
                  border: "1px solid rgba(212,168,67,0.30)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
                }}
              >
                <CheckCircle2 size={52} style={{ color: "#D4A843" }} />
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "26px", fontWeight: 800, color: "rgba(255,255,255,0.95)", margin: 0 }}>
                  Submission Received
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.65, color: "rgba(200,212,224,0.80)", margin: 0, maxWidth: "38ch" }}>
                  Our team will contact you within one business day to schedule your
                  diagnostic call and confirm next steps.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-[20px] p-8 flex flex-col gap-5"
                style={{
                  background: "rgba(9,19,37,0.80)",
                  border: "1px solid rgba(200,212,224,0.12)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="corp-label">Full Name *</label>
                    <input className="corp-input" name="name" value={form.name} onChange={handleChange} placeholder="Your name" required />
                  </div>
                  <div>
                    <label className="corp-label">Company *</label>
                    <input className="corp-input" name="company" value={form.company} onChange={handleChange} placeholder="Company name" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="corp-label">Email *</label>
                    <input className="corp-input" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@company.com" required />
                  </div>
                  <div>
                    <label className="corp-label">Phone</label>
                    <input className="corp-input" name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (000) 000-0000" />
                  </div>
                </div>

                <div>
                  <label className="corp-label">Industry *</label>
                  <select className="corp-input" name="industry" value={form.industry} onChange={handleChange} required>
                    <option value="" disabled>Select your industry</option>
                    {industries.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="corp-label">Preferred Engagement Model</label>
                  <select className="corp-input" name="model" value={form.model} onChange={handleChange}>
                    <option value="" disabled>Select a model</option>
                    {models.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="corp-label">Primary Challenge or Objective</label>
                  <textarea
                    className="corp-input"
                    name="challenge"
                    value={form.challenge}
                    onChange={handleChange}
                    placeholder="Describe your current operational challenge or growth objective..."
                    rows={4}
                    style={{ resize: "vertical" }}
                  />
                </div>

                <button type="submit" className="btn-gold w-full" style={{ fontSize: "16px", padding: "16px" }}>
                  Request Diagnostic Call
                </button>

                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(200,212,224,0.40)", margin: 0, textAlign: "center" }}>
                  No commitment required. We confirm fit before any engagement begins.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
