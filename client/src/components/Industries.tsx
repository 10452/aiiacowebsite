/*
 * AiiACo — Industries Section
 * Cross-industry credibility: 20+ sectors served
 * Scrolling ticker + expandable grid
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Building2, Landmark, CreditCard, Bitcoin, Shield, Gem, TrendingUp,
  Code2, Sparkles, Car, Sun, Zap, Users, UtensilsCrossed, Flame, Leaf
} from "lucide-react";

const industries = [
  { name: "Real Estate", icon: Building2, desc: "Brokers, lenders, property management, investment analysis" },
  { name: "Financial Services", icon: Landmark, desc: "Lending, banking, wealth management, financial advisory" },
  { name: "High-Risk Merchant", icon: CreditCard, desc: "Payment processing, merchant portals, compliance automation" },
  { name: "Crypto & Web3", icon: Bitcoin, desc: "DeFi platforms, token projects, blockchain consulting" },
  { name: "Insurance", icon: Shield, desc: "Claims processing, underwriting, customer service automation" },
  { name: "Luxury Lifestyle", icon: Gem, desc: "High-end retail, hospitality, concierge services" },
  { name: "Investment", icon: TrendingUp, desc: "Private equity, venture capital, portfolio management" },
  { name: "Software & Tech", icon: Code2, desc: "SaaS companies, software consulting, engineering firms" },
  { name: "Beauty & Health", icon: Sparkles, desc: "Cosmetics, wellness, fitness, health coaching" },
  { name: "Automotive", icon: Car, desc: "Dealerships, service centers, EV companies" },
  { name: "Solar & Battery", icon: Sun, desc: "Solar installers, energy storage, clean energy companies" },
  { name: "EV & New Energy", icon: Zap, desc: "Electric vehicles, charging networks, energy tech" },
  { name: "Agency Operators", icon: Users, desc: "Marketing agencies, consulting firms, service businesses" },
  { name: "Food & Beverage", icon: UtensilsCrossed, desc: "Restaurants, CPG brands, food tech, distribution" },
  { name: "Oil & Gas", icon: Flame, desc: "Exploration, production, distribution, energy trading" },
  { name: "Alternative Energy", icon: Leaf, desc: "Biofuel, helium, hydrogen, sustainable energy" },
];

const tickerItems = industries.map(i => i.name);

function IndustryCard({ industry, index }: { industry: typeof industries[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: (index % 8) * 0.07 }}
      className="glass rounded-xl p-5 flex flex-col gap-3 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300 group cursor-default"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#00E5FF]/20 transition-all">
          <industry.icon size={18} className="text-[#00E5FF]" />
        </div>
        <h3 className="font-cinzel text-sm font-semibold text-white">{industry.name}</h3>
      </div>
      <p className="font-dm text-xs text-[#7A9BB5] leading-relaxed">{industry.desc}</p>
    </motion.div>
  );
}

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="industries" className="py-24 md:py-32 bg-[#071428] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(ellipse, #C9A227 0%, transparent 70%)" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-px bg-[#00E5FF]/40" />
            <span className="label-tag">Universal Expertise</span>
            <div className="w-12 h-px bg-[#00E5FF]/40" />
          </div>
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-6">
            AiiA Speaks{" "}
            <span className="gradient-text-cyan">Every Industry's</span>
            <br />
            Language
          </h2>
          <p className="font-dm text-lg text-[#7A9BB5] max-w-2xl mx-auto">
            We haven't found a niche because we don't need one. Two decades of cross-industry experience
            means AiiA understands your business from day one — regardless of your sector.
          </p>
        </motion.div>

        {/* Scrolling ticker */}
        <div className="relative mb-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, #071428, transparent)" }}
          />
          <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, #071428, transparent)" }}
          />
          <div
            className="flex gap-6 py-3"
            style={{
              animation: "scroll-ticker 30s linear infinite",
              width: "max-content",
            }}
          >
            {[...tickerItems, ...tickerItems].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full flex-shrink-0"
                style={{
                  background: "rgba(0,229,255,0.05)",
                  border: "1px solid rgba(0,229,255,0.15)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                <span className="font-rajdhani text-sm text-[#E8F4F8] tracking-wider whitespace-nowrap">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Industry grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((industry, i) => (
            <IndustryCard key={industry.name} industry={industry} index={i} />
          ))}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="font-dm text-[#7A9BB5] text-sm">
            Don't see your industry?{" "}
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-[#00E5FF] hover:text-[#E8C84A] transition-colors underline underline-offset-4"
            >
              Talk to AiiA — she's been there too.
            </button>
          </p>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll-ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
