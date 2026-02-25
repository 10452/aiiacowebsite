/*
 * AiiACo Industries Page — /industries
 */
import SEO from "@/seo/SEO";
import Navbar from "@/components/Navbar";
import Industries from "@/components/Industries";
import Footer from "@/components/Footer";

export default function IndustriesPage() {
  return (
    <>
      <SEO
        title="AI Integration Across Industries | Enterprise Automation"
        description="AI operational infrastructure for financial services, real estate, insurance, SaaS, energy, and high-complexity industries."
        path="/industries"
        keywords="AI integration for financial services, AI integration for real estate, AI integration for insurance, AI integration for SaaS, AI integration for energy, enterprise AI automation, AI integration across industries, industry AI deployment"
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
        <Navbar />
        <main className="flex-1" style={{ paddingTop: "80px" }}>
          <Industries />
        </main>
        <Footer />
      </div>
    </>
  );
}
