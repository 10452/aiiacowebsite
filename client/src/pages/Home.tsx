/*
 * AiiACo — Home Page
 * Design: Liquid Glass Bio-Organic — deep void black, liquid glass, gold electricity
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
    <div className="min-h-screen flex flex-col" style={{ background: "#03050A" }}>
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <PlatformSection />
        <MethodSection />
        <AfterUpgradeSection />
        <Industries />
        <EngagementModels />
        <BuiltForCorporateAge />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
