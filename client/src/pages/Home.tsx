/*
 * AiiACo — Home Page (Corporate Institutional Rebuild)
 * Assembles all corporate sections in order
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PlatformSection from "@/components/PlatformSection";
import MethodSection from "@/components/MethodSection";
import AfterUpgradeSection from "@/components/AfterUpgradeSection";
import Industries from "@/components/Industries";
import EngagementModels from "@/components/EngagementModels";
import BuiltForCorporateAge from "@/components/BuiltForCorporateAge";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#05070a" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <div className="section-divider" />
        <PlatformSection />
        <div className="section-divider" />
        <MethodSection />
        <div className="section-divider" />
        <AfterUpgradeSection />
        <div className="section-divider" />
        <Industries />
        <div className="section-divider" />
        <EngagementModels />
        <div className="section-divider" />
        <BuiltForCorporateAge />
        <div className="section-divider" />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
