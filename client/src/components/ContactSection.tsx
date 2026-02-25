/*
 * AiiACo Contact Section — Liquid Glass Bio-Organic Design
 */
import { useState } from "react";
import { motion } from "framer-motion";

const industries = [
  "Real Estate & Brokerage", "Mortgage & Lending", "Financial Services",
  "Insurance", "Investment & Wealth Management", "Cryptocurrency & Digital Assets",
  "High-Risk Merchant Services", "Software & Technology", "Energy",
  "Automotive & EV", "Food & Beverage", "Luxury & Hospitality",
  "Beauty, Health & Wellness", "Other",
];

const models = [
  "AI Strategy & Blueprint", "Full Integration", "Performance Partnership", "Not sure yet",
];

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "",
    industry: "", model: "", revenue: "", message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        padding: "120px 0",
        background: "#060B14",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(900px 600px at 30% 50%, rgba(184,156,74,0.04) 0%, transparent 55%)" }} />

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "64px", alignItems: "flex-start" }}>

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-pill" style={{ marginBottom: "20px", width: "fit-content" }}>
              <span className="dot" />
              Initiate Engagement
            </div>
            <h2 className="section-headline" style={{ marginBottom: "20px" }}>
              Begin Your <span className="accent">AI Upgrade.</span>
            </h2>
            <div className="gold-divider" style={{ marginBottom: "24px" }} />
            <p className="section-subhead" style={{ marginBottom: "40px" }}>
              Every AiiAco engagement begins with a structured discovery process.
              Complete the form and a member of our team will contact you within
              one business day to confirm fit and outline next steps.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
                { title: "No Obligation", desc: "The initial discovery call is complimentary. We assess fit before proposing any engagement." },
                { title: "Confidential", desc: "All information shared during the discovery process is treated with full confidentiality." },
                { title: "Structured Process", desc: "Every engagement begins with a business intelligence audit — not a sales presentation." },
              ].map((item) => (
                <div key={item.title} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "rgba(184,156,74,0.80)", marginTop: "6px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "14px", color: "rgba(255,255,255,0.90)", margin: "0 0 4px" }}>{item.title}</p>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(200,215,230,0.62)", margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {submitted ? (
              <div className="glass-card-gold" style={{ padding: "48px", textAlign: "center" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(184,156,74,0.15)", border: "1px solid rgba(184,156,74,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "22px", color: "#D4A843" }}>✓</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "26px", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 12px" }}>Submission Received</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14.5px", color: "rgba(200,215,230,0.72)", lineHeight: 1.6, margin: 0 }}>
                  A member of the AiiAco team will contact you within one business day
                  to schedule your initial discovery session.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-card" style={{ padding: "36px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input name="name" required value={form.name} onChange={handleChange} placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company *</label>
                    <input name="company" required value={form.company} onChange={handleChange} placeholder="Company name" className="form-input" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="your@email.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 (000) 000-0000" className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Industry *</label>
                  <select name="industry" required value={form.industry} onChange={handleChange} className="form-input">
                    <option value="">Select your industry</option>
                    {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Engagement Model of Interest</label>
                  <select name="model" value={form.model} onChange={handleChange} className="form-input">
                    <option value="">Select a model</option>
                    {models.map((m) => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Annual Revenue Range</label>
                  <select name="revenue" value={form.revenue} onChange={handleChange} className="form-input">
                    <option value="">Select range</option>
                    <option>Under $1M</option>
                    <option>$1M – $5M</option>
                    <option>$5M – $25M</option>
                    <option>$25M – $100M</option>
                    <option>$100M+</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">What are your primary business objectives?</label>
                  <textarea name="message" value={form.message} onChange={handleChange} placeholder="Describe your current challenges and what you are trying to achieve..." className="form-input" style={{ minHeight: "100px", resize: "vertical" }} />
                </div>
                <button type="submit" className="btn-gold" style={{ justifyContent: "center", marginTop: "4px" }}>
                  Submit Inquiry
                </button>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11.5px", color: "rgba(200,215,230,0.40)", textAlign: "center", margin: 0 }}>
                  By submitting, you agree to be contacted by the AiiAco team. Your information will not be shared with third parties.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
