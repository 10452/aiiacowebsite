/*
 * AiiACo Contact Section — Liquid Glass Bio-Organic Design
 * Two-path lead capture: Fast Path (30s) + Structured Intake (recommended)
 * Forms are wired to the tRPC backend — submissions stored in DB + owner notified.
 */
import { useState } from "react";
import { motion } from "framer-motion";
import { trpc } from "@/lib/trpc";

const industries = [
  "Real Estate & Brokerage", "Mortgage & Lending", "Financial Services",
  "Insurance", "Investment & Wealth Management", "Cryptocurrency & Digital Assets",
  "High-Risk Merchant Services", "Software & Technology", "Energy",
  "Automotive & EV", "Food & Beverage", "Luxury & Hospitality",
  "Beauty, Health & Wellness", "Other",
];

const engagementOptions = [
  "Strategic Blueprint", "Full Integration", "Performance Partnership", "Not sure yet",
];

const whatHappensNext = [
  { n: "01", t: "Review within 24 hours" },
  { n: "02", t: "Direct response aligned to your scenario" },
  { n: "03", t: "Scope, metrics, and feasibility confirmed" },
  { n: "04", t: "Upgrade plan initiated" },
];

export default function ContactSection() {
  const [fastSubmitted, setFastSubmitted] = useState(false);
  const [fullSubmitted, setFullSubmitted] = useState(false);
  const [fastError, setFastError] = useState("");
  const [fullError, setFullError] = useState("");

  const [fastForm, setFastForm] = useState({ name: "", email: "" });
  const [fullForm, setFullForm] = useState({
    name: "", company: "", email: "", phone: "",
    industry: "", engagementModel: "", annualRevenue: "", message: "",
  });

  const submitCall = trpc.leads.submitCall.useMutation({
    onSuccess: () => setFastSubmitted(true),
    onError: (err) => setFastError(err.message || "Submission failed. Please try again."),
  });

  const submitIntake = trpc.leads.submitIntake.useMutation({
    onSuccess: () => setFullSubmitted(true),
    onError: (err) => setFullError(err.message || "Submission failed. Please try again."),
  });

  const handleFastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFastForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFastError("");
  };

  const handleFullChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFullForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFullError("");
  };

  const handleFastSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitCall.mutate({ name: fastForm.name, email: fastForm.email });
  };

  const handleFullSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitIntake.mutate({
      name: fullForm.name,
      email: fullForm.email,
      company: fullForm.company || undefined,
      phone: fullForm.phone || undefined,
      industry: fullForm.industry || undefined,
      engagementModel: fullForm.engagementModel || undefined,
      annualRevenue: fullForm.annualRevenue || undefined,
      message: fullForm.message || undefined,
    });
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
            Upgrade
          </div>
          <h2 className="section-headline" style={{ marginBottom: "20px" }}>
            Initiate <span className="accent">Upgrade.</span>
          </h2>
          <div className="gold-divider" style={{ marginBottom: "20px" }} />
          <p className="section-subhead">
            Describe your business and operational friction. We will determine what should be upgraded, how, and in what order.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "flex-start" }}>

          {/* Left — Forms */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {/* Fast Path — Executive Call Request */}
            <div className="glass-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.96)", letterSpacing: "-0.1px" }}>
                  Executive Call Request
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(184,156,74,0.80)", background: "rgba(184,156,74,0.10)", border: "1px solid rgba(184,156,74,0.25)", borderRadius: "999px", padding: "3px 10px" }}>
                  30 seconds
                </span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(200,215,230,0.55)", margin: "0 0 20px", lineHeight: 1.5 }}>
                For teams that want a direct diagnostic conversation first.
              </p>

              {fastSubmitted ? (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(184,156,74,0.12)", border: "1px solid rgba(184,156,74,0.30)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "18px", color: "#D4A843" }}>✓</div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "0 0 6px" }}>Request received.</p>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(200,215,230,0.60)", margin: 0 }}>We will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFastSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input name="name" required value={fastForm.name} onChange={handleFastChange} placeholder="Your name" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" required value={fastForm.email} onChange={handleFastChange} placeholder="your@email.com" className="form-input" />
                    </div>
                  </div>
                  {fastError && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(220,80,80,0.90)", margin: 0 }}>{fastError}</p>
                  )}
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ justifyContent: "center", marginTop: "4px", opacity: submitCall.isPending ? 0.7 : 1 }}
                    disabled={submitCall.isPending}
                  >
                    {submitCall.isPending ? "Sending…" : "Request Executive Call"}
                  </button>
                </form>
              )}
            </div>

            {/* Structured Intake */}
            <div className="glass-card" style={{ padding: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.96)", letterSpacing: "-0.1px" }}>
                  Structured Intake
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "10px", fontWeight: 800, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(210,220,235,0.70)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "999px", padding: "3px 10px" }}>
                  Preferred
                </span>
              </div>
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(200,215,230,0.55)", margin: "0 0 20px", lineHeight: 1.5 }}>
                Allows us to prepare a relevant, scenario-specific response before the first conversation.
              </p>

              {fullSubmitted ? (
                <div className="glass-card-gold" style={{ padding: "36px", textAlign: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", background: "rgba(184,156,74,0.15)", border: "1px solid rgba(184,156,74,0.35)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: "20px", color: "#D4A843" }}>✓</div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 10px" }}>Intake Received</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13.5px", color: "rgba(200,215,230,0.70)", lineHeight: 1.6, margin: 0 }}>
                    A member of the AiiAco team will review your submission and respond within 24 hours with a scenario-aligned reply.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFullSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">Full Name *</label>
                      <input name="name" required value={fullForm.name} onChange={handleFullChange} placeholder="Your name" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Company *</label>
                      <input name="company" required value={fullForm.company} onChange={handleFullChange} placeholder="Company name" className="form-input" />
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input name="email" type="email" required value={fullForm.email} onChange={handleFullChange} placeholder="your@email.com" className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input name="phone" value={fullForm.phone} onChange={handleFullChange} placeholder="+1 (000) 000-0000" className="form-input" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Engagement Interest</label>
                    <select name="engagementModel" value={fullForm.engagementModel} onChange={handleFullChange} className="form-input">
                      <option value="">Select engagement type</option>
                      {engagementOptions.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                    <div className="form-group">
                      <label className="form-label">Industry</label>
                      <select name="industry" value={fullForm.industry} onChange={handleFullChange} className="form-input">
                        <option value="">Select industry</option>
                        {industries.map((ind) => <option key={ind} value={ind}>{ind}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Annual Revenue</label>
                      <select name="annualRevenue" value={fullForm.annualRevenue} onChange={handleFullChange} className="form-input">
                        <option value="">Select range</option>
                        <option>Under $1M</option>
                        <option>$1M – $5M</option>
                        <option>$5M – $25M</option>
                        <option>$25M – $100M</option>
                        <option>$100M+</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Overview</label>
                    <textarea
                      name="message"
                      value={fullForm.message}
                      onChange={handleFullChange}
                      placeholder="Describe operations, bottlenecks, targets, and constraints. We will determine the upgrade sequence."
                      className="form-input"
                      style={{ minHeight: "110px", resize: "vertical" }}
                    />
                  </div>
                  {fullError && (
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(220,80,80,0.90)", margin: 0 }}>{fullError}</p>
                  )}
                  <button
                    type="submit"
                    className="btn-gold"
                    style={{ justifyContent: "center", marginTop: "4px", opacity: submitIntake.isPending ? 0.7 : 1 }}
                    disabled={submitIntake.isPending}
                  >
                    {submitIntake.isPending ? "Submitting…" : "Submit Structured Intake"}
                  </button>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "11.5px", color: "rgba(200,215,230,0.35)", textAlign: "center", margin: 0 }}>
                    Your information is treated with full confidentiality and will not be shared with third parties.
                  </p>
                </form>
              )}
            </div>
          </motion.div>

          {/* Right — What Happens Next + quote */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div className="glass-card" style={{ padding: "28px" }}>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "18px", fontWeight: 700, color: "rgba(255,255,255,0.90)", marginBottom: "24px", letterSpacing: "-0.1px" }}>
                What Happens Next
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {whatHappensNext.map((step) => (
                  <div key={step.n} style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                    <div className="phase-badge" style={{ width: "32px", height: "32px", fontSize: "11px", borderRadius: "9px", flexShrink: 0 }}>{step.n}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", fontWeight: 600, color: "rgba(210,220,235,0.85)", paddingTop: "6px", lineHeight: 1.4 }}>
                      {step.t}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card-gold" style={{ padding: "28px" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(17px, 1.8vw, 22px)", fontWeight: 700, fontStyle: "italic", color: "rgba(255,255,255,0.92)", lineHeight: 1.3, margin: "0 0 16px", letterSpacing: "-0.2px" }}>
                "AiiAco principle: We do not build what clients ask for. We build what creates leverage."
              </p>
              <div style={{ height: "1px", background: "rgba(184,156,74,0.20)", marginBottom: "16px" }} />
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(200,215,230,0.55)", margin: 0, lineHeight: 1.55 }}>
                Every engagement begins with a diagnostic. We assess your operational architecture before making a single recommendation.
              </p>
            </div>

            <div className="glass-card" style={{ padding: "24px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {[
                  { title: "No Obligation", desc: "The initial discovery call is complimentary." },
                  { title: "Confidential", desc: "All information shared is treated with full confidentiality." },
                  { title: "Diagnostic First", desc: "Every engagement begins with an audit, not a sales pitch." },
                ].map((item) => (
                  <div key={item.title} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(184,156,74,0.75)", marginTop: "7px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13.5px", color: "rgba(255,255,255,0.88)", margin: "0 0 3px" }}>{item.title}</p>
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "rgba(200,215,230,0.58)", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
