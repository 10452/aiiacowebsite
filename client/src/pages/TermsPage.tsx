/*
 * AiiACo Terms of Service Page — /terms
 */
import SEO from "@/seo/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Service | AiiAco"
        description="AiiAco terms of service governing use of our platform and engagement services."
        path="/terms"
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
                Terms of Service
              </h1>
              <div className="gold-divider" style={{ marginBottom: "32px" }} />
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "15px", lineHeight: 1.75, color: "rgba(200,215,230,0.72)", display: "flex", flexDirection: "column", gap: "20px" }}>
                <p><strong style={{ color: "rgba(255,255,255,0.90)" }}>Effective Date:</strong> 2026</p>
                <p>By accessing aiiaco.com, you agree to the following terms. If you do not agree, do not use this website.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Use of This Website</h2>
                <p>This website is provided for informational purposes and to facilitate engagement inquiries. You may not use this website for any unlawful purpose or in any manner that could damage or impair its operation.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Intellectual Property</h2>
                <p>All content on this website — including copy, design, structure, and methodology — is the property of AiiAco. No content may be reproduced, distributed, or used without express written permission.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Engagement Terms</h2>
                <p>Specific terms governing AI integration engagements, performance-based models, and service delivery are defined in individual engagement agreements and are not governed by these general terms of service.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Limitation of Liability</h2>
                <p>AiiAco is not liable for any indirect, incidental, or consequential damages arising from use of this website or reliance on its content.</p>
                <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "22px", fontWeight: 700, color: "rgba(255,255,255,0.90)", margin: "8px 0 4px" }}>Contact</h2>
                <p>For questions regarding these terms, contact us through the <a href="/upgrade" style={{ color: "#D4A843", textDecoration: "none" }}>Upgrade page</a>.</p>
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
