/*
 * AiiACo Home Page — Bioluminescent Cosmos Design
 * Full lead-generation website for AiiA, the AI Director
 * Sections: Hero → What is AiiA → How It Works → Industries → Pricing → Team → Contact → Footer
 */
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhatIsAiiA from "@/components/WhatIsAiiA";
import HowItWorks from "@/components/HowItWorks";
import Industries from "@/components/Industries";
import DreamState from "@/components/DreamState";
import Pricing from "@/components/Pricing";
import TeamSection from "@/components/TeamSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#020B18] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <WhatIsAiiA />
      <HowItWorks />
      <DreamState />
      <Industries />
      <Pricing />
      <TeamSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
