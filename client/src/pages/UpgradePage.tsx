/*
 * AiiACo Upgrade Page — /upgrade
 */
import SEO from "@/seo/SEO";
import Navbar from "@/components/Navbar";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function UpgradePage() {
  return (
    <>
      <SEO
        title="Initiate AI Upgrade | AiiAco Engagement"
        description="Begin your AI integration engagement. Submit a structured intake or request an executive call. AiiAco responds within 24 hours."
        path="/upgrade"
        keywords="AI integration engagement, AI upgrade, initiate AI integration, AI consulting intake, AI implementation request, AI strategy consultation"
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
        <Navbar />
        <main className="flex-1" style={{ paddingTop: "80px" }}>
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
