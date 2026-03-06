/*
 * AiiACo — Home Page
 * Design: Liquid Glass Bio-Organic — deep void black, liquid glass, gold electricity
 * Section order: Hero → Platform → Method → AfterUpgrade → Results → Industries → CaseStudies → Models → Principles → Contact
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformSection from "@/components/PlatformSection";
import MethodSection from "@/components/MethodSection";
import AfterUpgradeSection from "@/components/AfterUpgradeSection";
import ResultsSection from "@/components/ResultsSection";
import Industries from "@/components/Industries";
import CaseStudiesSection from "@/components/caseStudies/CaseStudiesSection";
import EngagementModels from "@/components/EngagementModels";
import BuiltForCorporateAge from "@/components/BuiltForCorporateAge";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SEO from "@/seo/SEO";
import CredibilityBlock from "@/components/CredibilityBlock";

export default function Home() {
  return (
    <>
      <SEO
        title="AiiA | Remove Operational Friction. Run Your Business Faster."
        description="AiiA helps growing companies simplify workflows, activate dormant databases, and create clear operational visibility so leadership can move faster and teams execute without coordination drag. Real estate, mortgage, commercial property, and management consulting."
        path="/"
        keywords="AI integration authority, enterprise AI integration, AI implementation services, managed AI integration, AI automation for business, operational AI infrastructure, AI workforce, AI director, done-for-you AI, performance-based AI, AI integration services, artificial intelligence consulting, business AI automation, AI strategy, managed AI services"
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <CredibilityBlock />
          <PlatformSection />
          <MethodSection />
          <AfterUpgradeSection />
          <ResultsSection />
          <Industries />
          <CaseStudiesSection />
          <EngagementModels />
          <BuiltForCorporateAge />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
}
