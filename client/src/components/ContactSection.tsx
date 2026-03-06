/*
 * AiiACo Contact Section — Conversational Qualifier + Booking Flow
 * Step 1: Project type (one-time vs monthly)
 * Step 2a: One-time budget range
 * Step 2b: Monthly budget range
 * Step 3: Name + email + brief + book call
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";

type Step = "type" | "budget-onetime" | "budget-monthly" | "details" | "done";

interface QualifierData {
  projectType: "one-time" | "monthly" | "";
  budgetRange: string;
  name: string;
  email: string;
  message: string;
}

const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

const ChoiceButton = ({
  label,
  sub,
  onClick,
}: {
  label: string;
  sub?: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      textAlign: "left",
      padding: "18px 22px",
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(184,156,74,0.18)",
      borderRadius: "12px",
      cursor: "pointer",
      transition: "all 0.18s ease",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
    }}
    onMouseEnter={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background = "rgba(184,156,74,0.08)";
      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,156,74,0.40)";
    }}
    onMouseLeave={(e) => {
      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(184,156,74,0.18)";
    }}
  >
    <span
      style={{
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        color: "rgba(255,255,255,0.92)",
      }}
    >
      {label}
    </span>
    {sub && (
      <span
        style={{
          fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
          fontSize: "13px",
          color: "rgba(200,215,230,0.50)",
        }}
      >
        {sub}
      </span>
    )}
  </button>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(184,156,74,0.18)",
  borderRadius: "10px",
  color: "rgba(255,255,255,0.92)",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const whatHappensNext = [
  { n: "01", t: "Review within 24 hours" },
  { n: "02", t: "Direct response aligned to your scenario" },
  { n: "03", t: "Scope and feasibility confirmed on the call" },
  { n: "04", t: "First operational module scoped and initiated" },
];

export default function ContactSection() {
  const [step, setStep] = useState<Step>("type");
  const [showCalendly, setShowCalendly] = useState(false);
  const [data, setData] = useState<QualifierData>({
    projectType: "",
    budgetRange: "",
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");

  const submitCall = trpc.leads.submitCall.useMutation({
    onSuccess: () => {
      setStep("done");
      setShowCalendly(true);
    },
    onError: (err) => setError(err.message || "Submission failed. Please try again."),
  });

  const handleSubmit = () => {
    if (!data.name.trim() || !data.email.trim()) {
      setError("Please enter your name and email.");
      return;
    }
    const budgetLabel = data.projectType === "one-time"
      ? `One-time: ${data.budgetRange}`
      : `Monthly: ${data.budgetRange}`;
    submitCall.mutate({
      name: data.name,
      email: data.email,
      message: `${budgetLabel}${data.message ? ` | ${data.message}` : ""}`,
    });
  };

  return (
    <>
      {/* Calendly Modal */}
      {showCalendly && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(3,5,10,0.96)",
            backdropFilter: "blur(20px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(184,156,74,0.6), transparent)" }} />
          <button
            onClick={() => setShowCalendly(false)}
            style={{
              position: "absolute", top: "24px", right: "24px",
              background: "rgba(184,156,74,0.08)", border: "1px solid rgba(184,156,74,0.22)",
              borderRadius: "8px", color: "rgba(184,156,74,0.80)",
              fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif",
              fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em",
              padding: "8px 16px", cursor: "pointer", textTransform: "uppercase",
            }}
          >
            Close
          </button>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ textAlign: "center", marginBottom: "32px" }}
          >
            <h2 style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: "0 0 8px" }}>
              Select a time for your <span style={{ color: "#D4A843" }}>Strategy Call.</span>
            </h2>
            <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "14px", color: "rgba(200,215,230,0.55)", margin: 0 }}>
              Your submission has been received. Choose a slot that works for your schedule.
            </p>
          </motion.div>
          <div style={{ width: "100%", maxWidth: "720px", borderRadius: "16px", overflow: "hidden", border: "1px solid rgba(184,156,74,0.18)", background: "#060B14" }}>
            <iframe
              src="https://calendly.com/nemr1?embed_type=Inline&hide_gdpr_banner=1&background_color=060B14&text_color=d2dceb&primary_color=B89C4A"
              width="100%" height="580" frameBorder="0"
              title="Schedule a call with AiiA"
              style={{ display: "block" }}
            />
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, rgba(184,156,74,0.4), transparent)" }} />
        </motion.div>
      )}

      <section
        id="contact"
        style={{ position: "relative", padding: "120px 0", background: "#060B14", overflow: "hidden" }}
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
              Book a Strategy Call
            </div>
            <h2 className="section-headline shimmer-headline" style={{ marginBottom: "20px" }}>
              Let's Find Your <span className="accent">Operational Leak.</span>
            </h2>
            <div className="gold-divider" style={{ marginBottom: "20px" }} />
            <p className="section-subhead">
              Answer two quick questions so we can come prepared. Then pick a time that works for you.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "flex-start" }}>

            {/* Left — Qualifier flow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="glass-card" style={{ padding: "36px", minHeight: "320px" }}>

                {/* Progress dots */}
                {step !== "done" && (
                  <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
                    {(["type", "budget-onetime", "budget-monthly", "details"] as Step[]).map((s, i) => {
                      const steps: Step[] = ["type", step === "budget-monthly" ? "budget-monthly" : "budget-onetime", "details"];
                      const activeIdx = steps.indexOf(step);
                      return (
                        <div
                          key={i}
                          style={{
                            width: i <= activeIdx ? "20px" : "6px",
                            height: "6px",
                            borderRadius: "999px",
                            background: i <= activeIdx ? "#D4A843" : "rgba(184,156,74,0.20)",
                            transition: "all 0.3s ease",
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                <AnimatePresence mode="wait">
                  {/* Step 1: Project type */}
                  {step === "type" && (
                    <motion.div
                      key="type"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(17px, 1.6vw, 20px)", fontWeight: 700, color: "rgba(255,255,255,0.95)", margin: "0 0 4px" }}>
                        Are you looking for a one-time project or ongoing support?
                      </p>
                      <ChoiceButton
                        label="One-time project"
                        sub="Fix a specific operational problem"
                        onClick={() => { setData(d => ({ ...d, projectType: "one-time" })); setStep("budget-onetime"); }}
                      />
                      <ChoiceButton
                        label="Ongoing monthly support"
                        sub="Continuous operational improvement"
                        onClick={() => { setData(d => ({ ...d, projectType: "monthly" })); setStep("budget-monthly"); }}
                      />
                    </motion.div>
                  )}

                  {/* Step 2a: One-time budget */}
                  {step === "budget-onetime" && (
                    <motion.div
                      key="budget-onetime"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(17px, 1.6vw, 20px)", fontWeight: 700, color: "rgba(255,255,255,0.95)", margin: "0 0 4px" }}>
                        What investment range feels right for solving this?
                      </p>
                      {[
                        { label: "Up to $10K", sub: "Focused single-workflow fix" },
                        { label: "$10K – $20K", sub: "Department-level operational upgrade" },
                        { label: "$20K – $30K+", sub: "Full operational transformation" },
                      ].map(opt => (
                        <ChoiceButton
                          key={opt.label}
                          label={opt.label}
                          sub={opt.sub}
                          onClick={() => { setData(d => ({ ...d, budgetRange: opt.label })); setStep("details"); }}
                        />
                      ))}
                      <button onClick={() => setStep("type")} style={{ background: "none", border: "none", color: "rgba(184,156,74,0.55)", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0 }}>← Back</button>
                    </motion.div>
                  )}

                  {/* Step 2b: Monthly budget */}
                  {step === "budget-monthly" && (
                    <motion.div
                      key="budget-monthly"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(17px, 1.6vw, 20px)", fontWeight: 700, color: "rgba(255,255,255,0.95)", margin: "0 0 4px" }}>
                        What monthly investment are you comfortable with?
                      </p>
                      {[
                        { label: "$3K – $6K / month", sub: "Core workflow automation" },
                        { label: "$8K – $12K / month", sub: "Multi-department operational support" },
                        { label: "$15K+ / month", sub: "Full operational intelligence partnership" },
                      ].map(opt => (
                        <ChoiceButton
                          key={opt.label}
                          label={opt.label}
                          sub={opt.sub}
                          onClick={() => { setData(d => ({ ...d, budgetRange: opt.label })); setStep("details"); }}
                        />
                      ))}
                      <button onClick={() => setStep("type")} style={{ background: "none", border: "none", color: "rgba(184,156,74,0.55)", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0 }}>← Back</button>
                    </motion.div>
                  )}

                  {/* Step 3: Details */}
                  {step === "details" && (
                    <motion.div
                      key="details"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25 }}
                      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
                    >
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "clamp(17px, 1.6vw, 20px)", fontWeight: 700, color: "rgba(255,255,255,0.95)", margin: "0 0 4px" }}>
                        Last step — where should we reach you?
                      </p>
                      <input
                        style={inputStyle}
                        placeholder="Your name"
                        value={data.name}
                        onChange={e => { setData(d => ({ ...d, name: e.target.value })); setError(""); }}
                      />
                      <input
                        style={inputStyle}
                        type="email"
                        placeholder="Work email"
                        value={data.email}
                        onChange={e => { setData(d => ({ ...d, email: e.target.value })); setError(""); }}
                      />
                      <textarea
                        style={{ ...inputStyle, resize: "none", height: "80px" }}
                        placeholder="Briefly describe the friction (optional)"
                        value={data.message}
                        onChange={e => setData(d => ({ ...d, message: e.target.value }))}
                      />
                      {error && (
                        <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", color: "#E05A5A", margin: 0 }}>{error}</p>
                      )}
                      <button
                        onClick={handleSubmit}
                        disabled={submitCall.isPending}
                        className="btn-gold"
                        style={{ fontSize: "15px", padding: "14px 28px", opacity: submitCall.isPending ? 0.7 : 1 }}
                      >
                        {submitCall.isPending ? "Sending…" : "Book My Strategy Call →"}
                      </button>
                      <button onClick={() => setStep(data.projectType === "monthly" ? "budget-monthly" : "budget-onetime")} style={{ background: "none", border: "none", color: "rgba(184,156,74,0.55)", fontSize: "13px", cursor: "pointer", textAlign: "left", padding: 0 }}>← Back</button>
                    </motion.div>
                  )}

                  {/* Done */}
                  {step === "done" && (
                    <motion.div
                      key="done"
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px 0", textAlign: "center" }}
                    >
                      <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(184,156,74,0.12)", border: "1px solid rgba(184,156,74,0.30)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", color: "#D4A843" }}>✓</div>
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif", fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.96)", margin: 0 }}>Request received.</p>
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "14px", color: "rgba(200,215,230,0.55)", margin: 0, maxWidth: "32ch" }}>
                        The calendar is opening now. Pick a time that works for you.
                      </p>
                      <button onClick={() => setShowCalendly(true)} className="btn-gold" style={{ fontSize: "14px", padding: "12px 24px" }}>
                        Open Calendar →
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right — What happens next */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            >
              <div className="glass-card" style={{ padding: "28px" }}>
                <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "11px", fontWeight: 800, letterSpacing: "1.4px", textTransform: "uppercase", color: "rgba(184,156,74,0.65)", margin: "0 0 20px" }}>
                  What happens next
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  {whatHappensNext.map((item) => (
                    <div key={item.n} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                      <div className="phase-badge" style={{ width: "32px", height: "32px", fontSize: "11px", borderRadius: "8px", flexShrink: 0 }}>{item.n}</div>
                      <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "14px", fontWeight: 500, color: "rgba(210,220,235,0.78)", margin: 0, lineHeight: 1.5, paddingTop: "6px" }}>{item.t}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card" style={{ padding: "24px" }}>
                <p style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif", fontSize: "13px", fontStyle: "italic", color: "rgba(200,215,230,0.45)", margin: 0, lineHeight: 1.6 }}>
                  "Most operational modules are implemented within 2–4 weeks. We find the friction, build the fix, and measure the improvement."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
