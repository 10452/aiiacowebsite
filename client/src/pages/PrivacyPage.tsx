/*
 * AiiACo Privacy Policy Page — /privacy
 */
import SEO from "@/seo/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Policy | AiiAco"
        description="AiiAco privacy policy — how we collect, use, and protect your information."
        path="/privacy"
        noindex={false}
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
        <Navbar />
        <main className="flex-1" style={{ paddingTop: "100px", paddingBottom: "100px" }}>
          <div className="container" style={{ maxWidth: "720px" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="section-pill" style={{ marginBottom: "24px", width: "fit-content" }}>
                <span className="dot" />
                Legal
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 700, color: "rgba(255,255,255,0.97)", margin: "0 0 20px", letterSpacing: "-0.8px", lineHeight: 1.1 }}>
                Privacy Policy
              </h1>
              <div className="gold-divider" style={{ marginBottom: "32px" }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(200,215,230,0.72)", display: "flex", flexDirection: "column", gap: "20px" }}>
                <p><strong style={{ color: "rgba(255,255,255,0.90)" }}>Effective Date:</strong> 2026</p>
                <p>AiiAco ("we," "us," or "our") operates the website aiiaco.com. This policy describes how we collect, use, and protect information submitted through our website.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Information We Collect</h2>
                <p>We collect information you voluntarily submit through our contact and intake forms, including name, company, email address, phone number, and business information. We do not collect data through cookies beyond standard analytics.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>How We Use Your Information</h2>
                <p>Information submitted is used solely to respond to your inquiry, assess engagement fit, and communicate with you about our services. We do not sell, share, or distribute your information to third parties.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Data Security</h2>
                <p>We implement appropriate technical and organizational measures to protect your information. All information shared during the discovery process is treated with full confidentiality.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Contact</h2>
                <p>For questions regarding this policy, contact us through the <a href="/upgrade" style={{ color: "#D4A843", textDecoration: "none" }}>Upgrade page</a>.</p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
