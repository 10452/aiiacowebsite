/*
 * AiiACo Method Page — /method
 */
import SEO from "@/seo/SEO";
import Navbar from "@/components/Navbar";
import MethodSection from "@/components/MethodSection";
import Footer from "@/components/Footer";

export default function MethodPage() {
  return (
    <>
      <SEO
        title="AI Integration Method | Operational AI Deployment Framework"
        description="A disciplined AI integration method: diagnostics, architecture, deployment, and managed optimization aligned to measurable ROI."
        path="/method"
        keywords="AI integration method, AI deployment framework, operational AI implementation, AI integration process, AI diagnostics, AI architecture, managed AI optimization, AI ROI"
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
        <Navbar />
        <main className="flex-1" style={{ paddingTop: "80px" }}>
          <MethodSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
