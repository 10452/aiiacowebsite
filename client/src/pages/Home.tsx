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

export default function Home() {
  return (
    <>
      <SEO
        title="AiiAco — AI Integration Agency | Upgrade Your Business"
        description="AiiAco designs, deploys, and manages complete AI operational systems for businesses that intend to lead. AI integration, automation, and performance-based AI consulting across 20+ industries."
        path="/"
        keywords="AI integration agency, AI consulting, business AI automation, AI operational infrastructure, AI workforce, AI director, done-for-you AI, performance-based AI, AI integration services, AI agency, artificial intelligence consulting, business automation, AI implementation, AI strategy, operational AI"
      />
      <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
        <Navbar />
        <main className="flex-1">
          <HeroSection />
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
