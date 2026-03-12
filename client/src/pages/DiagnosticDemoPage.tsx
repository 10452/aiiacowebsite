/**
 * Diagnostic Intelligence Demo Page
 *
 * Client-facing showcase of AiiACo's diagnostic agent service.
 * Linked from footer Tools only — not marketed on the main page.
 * Shows what we build for clients: voice AI agents that diagnose,
 * extract intelligence, and automate follow-up.
 */
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";

const sf = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif";
const sfDisplay = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Helvetica Neue', Arial, sans-serif";

const CAPABILITIES = [
  {
    icon: "🎙",
    title: "Voice AI Agent",
    desc: "A branded voice agent that lives on your website. Greets visitors, qualifies leads, and captures contact info — all through natural conversation.",
    color: "rgba(184,156,74,0.80)",
    bg: "rgba(184,156,74,0.06)",
    border: "rgba(184,156,74,0.18)",
  },
  {
    icon: "🧠",
    title: "Intelligence Extraction",
    desc: "Every conversation is transcribed and analyzed by AI. Pain points, wants, current solutions, and a full summary — extracted automatically.",
    color: "rgba(120,200,255,0.80)",
    bg: "rgba(120,200,255,0.06)",
    border: "rgba(120,200,255,0.18)",
  },
  {
    icon: "📊",
    title: "Lead Pipeline",
    desc: "Leads flow into a real-time admin console with status tracking, diagnostic scoring, and conversation intelligence at a glance.",
    color: "rgba(100,220,160,0.80)",
    bg: "rgba(100,220,160,0.06)",
    border: "rgba(100,220,160,0.18)",
  },
  {
    icon: "📧",
    title: "Automated Follow-Up",
    desc: "After every call, your prospect gets a personalized follow-up email. Your team gets a full intelligence brief. No manual work.",
    color: "rgba(200,160,255,0.80)",
    bg: "rgba(200,160,255,0.06)",
    border: "rgba(200,160,255,0.18)",
  },
  {
    icon: "🔍",
    title: "Health Monitoring",
    desc: "24/7 automated health checks across the entire diagnostic chain. If anything goes down — agent, webhook, email, database — you know instantly.",
    color: "rgba(255,180,100,0.80)",
    bg: "rgba(255,180,100,0.06)",
    border: "rgba(255,180,100,0.18)",
  },
  {
    icon: "🌐",
    title: "Website Integration",
    desc: "A single floating widget. One line of code. Works on any website. Your visitors talk to your brand — not a generic chatbot.",
    color: "rgba(255,120,150,0.80)",
    bg: "rgba(255,120,150,0.06)",
    border: "rgba(255,120,150,0.18)",
  },
];

const USE_CASES = [
  {
    company: "Real Estate Brokerage",
    agent: "Property Concierge",
    desc: "Voice agent qualifies buyers by budget, location, and timeline. Books viewings directly into the agent's calendar. Extracts investment preferences and urgency signals.",
  },
  {
    company: "SaaS Platform",
    agent: "Product Advisor",
    desc: "Answers feature questions, identifies pain points with current tools, and routes qualified leads to the right sales rep with a full intelligence brief.",
  },
  {
    company: "Law Firm",
    agent: "Intake Specialist",
    desc: "Captures case details, assesses urgency, and schedules consultations. Extracts key facts and conflict-of-interest flags before the attorney ever picks up the phone.",
  },
  {
    company: "Healthcare Practice",
    agent: "Patient Navigator",
    desc: "Triages patient inquiries, captures symptoms and insurance info, and routes to the right department. HIPAA-aware conversation design.",
  },
];

const CHAIN_STEPS = [
  { step: "1", label: "Visitor clicks widget", icon: "🖱", color: "rgba(184,156,74,0.80)" },
  { step: "2", label: "Voice agent activates", icon: "🎙", color: "rgba(184,156,74,0.80)" },
  { step: "3", label: "Smart intake flow", icon: "📋", color: "rgba(120,200,255,0.80)" },
  { step: "4", label: "Conversation captured", icon: "💬", color: "rgba(120,200,255,0.80)" },
  { step: "5", label: "AI extracts intelligence", icon: "🧠", color: "rgba(100,220,160,0.80)" },
  { step: "6", label: "Lead created & scored", icon: "📊", color: "rgba(100,220,160,0.80)" },
  { step: "7", label: "Emails sent automatically", icon: "📧", color: "rgba(200,160,255,0.80)" },
  { step: "8", label: "Owner notified in real-time", icon: "🔔", color: "rgba(200,160,255,0.80)" },
];

export default function DiagnosticDemoPage() {
  return (
    <>
      <SEO
        title="Diagnostic Intelligence | AiiACo"
        description="Voice AI agents that diagnose, extract intelligence, and automate follow-up. Built by AiiACo for enterprises that want their website to work as hard as their best salesperson."
        path="/demo"
      />
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#03050A" }}>
        <Navbar />
        <main style={{ flex: 1 }}>

          {/* ─── Hero ─── */}
          <section style={{ padding: "120px 24px 80px", textAlign: "center", position: "relative" }}>
            {/* Subtle radial glow */}
            <div style={{
              position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
              width: "600px", height: "400px", borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(184,156,74,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto" }}>
              <p style={{
                fontFamily: sf, fontSize: "10px", fontWeight: 800,
                letterSpacing: "0.20em", textTransform: "uppercase",
                color: "rgba(184,156,74,0.65)", marginBottom: "20px",
              }}>
                Diagnostic Intelligence Platform
              </p>
              <h1 style={{
                fontFamily: sfDisplay, fontSize: "clamp(32px, 5vw, 56px)",
                fontWeight: 800, lineHeight: 1.1, color: "rgba(255,255,255,0.92)",
                margin: "0 0 24px",
              }}>
                Your Website's Most
                <br />
                <span style={{ color: "rgba(184,156,74,0.90)" }}>Intelligent Employee</span>
              </h1>
              <p style={{
                fontFamily: sf, fontSize: "18px", lineHeight: 1.7,
                color: "rgba(200,215,230,0.55)", maxWidth: "620px", margin: "0 auto 40px",
              }}>
                We build voice AI agents that live on your website, diagnose visitor needs through
                natural conversation, extract actionable intelligence, and automate the entire
                follow-up pipeline. Your brand's voice. Your rules. Our infrastructure.
              </p>
              <a
                href="/#contact"
                style={{
                  display: "inline-block", fontFamily: sf, fontSize: "13px", fontWeight: 700,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  padding: "14px 36px", borderRadius: "8px",
                  background: "rgba(184,156,74,0.12)", border: "1px solid rgba(184,156,74,0.35)",
                  color: "rgba(184,156,74,0.90)", textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,156,74,0.22)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,156,74,0.55)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,156,74,0.12)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,156,74,0.35)";
                }}
              >
                Build Yours
              </a>
            </div>
          </section>

          {/* ─── Diagnostic Chain ─── */}
          <section style={{ padding: "60px 24px 80px", maxWidth: "1000px", margin: "0 auto" }}>
            <p style={{
              fontFamily: sf, fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: "rgba(120,200,255,0.55)", marginBottom: "16px", textAlign: "center",
            }}>
              The Diagnostic Chain
            </p>
            <h2 style={{
              fontFamily: sfDisplay, fontSize: "28px", fontWeight: 800,
              color: "rgba(255,255,255,0.88)", textAlign: "center", margin: "0 0 48px",
            }}>
              From Click to Intelligence in Seconds
            </h2>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "2px", position: "relative",
            }}>
              {CHAIN_STEPS.map((s) => (
                <div key={s.step} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "10px", padding: "20px 16px", textAlign: "center",
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: "24px", marginBottom: "8px" }}>{s.icon}</div>
                  <div style={{
                    fontFamily: sf, fontSize: "10px", fontWeight: 800,
                    letterSpacing: "0.14em", color: s.color, marginBottom: "6px",
                  }}>
                    Step {s.step}
                  </div>
                  <p style={{
                    fontFamily: sf, fontSize: "13px", fontWeight: 600,
                    color: "rgba(200,215,230,0.75)", margin: 0,
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Capabilities Grid ─── */}
          <section style={{ padding: "60px 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
            <p style={{
              fontFamily: sf, fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: "rgba(184,156,74,0.55)", marginBottom: "16px", textAlign: "center",
            }}>
              What We Build For You
            </p>
            <h2 style={{
              fontFamily: sfDisplay, fontSize: "28px", fontWeight: 800,
              color: "rgba(255,255,255,0.88)", textAlign: "center", margin: "0 0 48px",
            }}>
              Six Capabilities. One Platform.
            </h2>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "16px",
            }}>
              {CAPABILITIES.map((cap) => (
                <div key={cap.title} style={{
                  background: cap.bg, border: `1px solid ${cap.border}`,
                  borderRadius: "12px", padding: "28px 24px",
                  transition: "all 0.2s",
                }}>
                  <div style={{ fontSize: "28px", marginBottom: "14px" }}>{cap.icon}</div>
                  <h3 style={{
                    fontFamily: sfDisplay, fontSize: "17px", fontWeight: 800,
                    color: cap.color, margin: "0 0 10px",
                  }}>
                    {cap.title}
                  </h3>
                  <p style={{
                    fontFamily: sf, fontSize: "14px", lineHeight: 1.65,
                    color: "rgba(200,215,230,0.60)", margin: 0,
                  }}>
                    {cap.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Use Cases ─── */}
          <section style={{ padding: "60px 24px 80px", maxWidth: "1000px", margin: "0 auto" }}>
            <p style={{
              fontFamily: sf, fontSize: "10px", fontWeight: 800,
              letterSpacing: "0.20em", textTransform: "uppercase",
              color: "rgba(100,220,160,0.55)", marginBottom: "16px", textAlign: "center",
            }}>
              Industry Applications
            </p>
            <h2 style={{
              fontFamily: sfDisplay, fontSize: "28px", fontWeight: 800,
              color: "rgba(255,255,255,0.88)", textAlign: "center", margin: "0 0 48px",
            }}>
              Built for Every Industry
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {USE_CASES.map((uc) => (
                <div key={uc.company} style={{
                  background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "12px", padding: "28px 32px",
                  display: "grid", gridTemplateColumns: "200px 1fr", gap: "24px",
                  alignItems: "start",
                }}>
                  <div>
                    <p style={{
                      fontFamily: sf, fontSize: "10px", fontWeight: 800,
                      letterSpacing: "0.14em", textTransform: "uppercase",
                      color: "rgba(200,215,230,0.35)", margin: "0 0 6px",
                    }}>
                      {uc.company}
                    </p>
                    <p style={{
                      fontFamily: sfDisplay, fontSize: "16px", fontWeight: 800,
                      color: "rgba(184,156,74,0.85)", margin: 0,
                    }}>
                      {uc.agent}
                    </p>
                  </div>
                  <p style={{
                    fontFamily: sf, fontSize: "14px", lineHeight: 1.7,
                    color: "rgba(200,215,230,0.60)", margin: 0,
                  }}>
                    {uc.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ─── CTA ─── */}
          <section style={{
            padding: "80px 24px", textAlign: "center",
            background: "linear-gradient(180deg, transparent 0%, rgba(184,156,74,0.03) 50%, transparent 100%)",
          }}>
            <h2 style={{
              fontFamily: sfDisplay, fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 800, color: "rgba(255,255,255,0.88)", margin: "0 0 16px",
            }}>
              Ready to Give Your Website a Voice?
            </h2>
            <p style={{
              fontFamily: sf, fontSize: "16px", lineHeight: 1.7,
              color: "rgba(200,215,230,0.50)", maxWidth: "540px", margin: "0 auto 32px",
            }}>
              We design, build, and manage the entire diagnostic intelligence system.
              You focus on closing deals. We handle the infrastructure.
            </p>
            <a
              href="/#contact"
              style={{
                display: "inline-block", fontFamily: sf, fontSize: "13px", fontWeight: 700,
                letterSpacing: "0.08em", textTransform: "uppercase",
                padding: "14px 36px", borderRadius: "8px",
                background: "rgba(184,156,74,0.12)", border: "1px solid rgba(184,156,74,0.35)",
                color: "rgba(184,156,74,0.90)", textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,156,74,0.22)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,156,74,0.55)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.background = "rgba(184,156,74,0.12)";
                (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(184,156,74,0.35)";
              }}
            >
              Let's Talk
            </a>
          </section>

        </main>
        <Footer />
      </div>
    </>
  );
}
