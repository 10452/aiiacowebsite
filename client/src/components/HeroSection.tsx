/*
 * AiiACo Hero Section — Bioluminescent Cosmos
 * Split layout: copy left, AiiA avatar right
 * Floating particles, glow effects, typewriter headline
 */
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const HERO_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/F4ncCcII64x2p4VFSvfQPR-img-2_1771960363000_na1fn_YWlpYS1oZXJvLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L0Y0bmNDY0lJNjR4MnA0VkZTdmZRUFItaW1nLTJfMTc3MTk2MDM2MzAwMF9uYTFmbl9ZV2xwWVMxb1pYSnZMV0puLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hvfNtunekY2uL0eioAvDvXiQPHdVENfs5NGgISq-RAgVBPDYOS96wONxFosnsr6Q4lXk1lUwgN6ytDfsM6sts8C3uRW-aFnDO3Oa3egzN1LJajO99J66LMN~a-bfWCXRE~ixb12hXkNu7N~~npE055CpR5q2qi7XkBu~6HTFr--BR7xPiyZwxafZeIomrxMndsoW0nUaWmePhrIcE1fo7hItrMnNL1TCfrhzUirKPPBs92sOgpCIoaUNk16pQXspxZJnLo6AGXocnko7YmTXGTX3EvH8Sg-dSL707enFwM4tP2NuJ7COhTUZD0Hl5dK8xZwAGFtOFg1wfjnlZphVoQ__";
const AIIA_AVATAR = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/F4ncCcII64x2p4VFSvfQPR-img-1_1771960356000_na1fn_YWlpYS1oZXJvLWF2YXRhcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L0Y0bmNDY0lJNjR4MnA0VkZTdmZRUFItaW1nLTFfMTc3MTk2MDM1NjAwMF9uYTFmbl9ZV2xwWVMxb1pYSnZMV0YyWVhSaGNnLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=K3cZKWGjTgZvJwhyeJsmXofL87SMTa2rr30PKLYrC58A9iNlOVeXRFaRJQxl3BayMME-e74lkcIRLIpR2jUa5HIPEuTFb0DARD3ZjNpd3pZzKBww8le57x81nLDLkW0V91k4mXueoRjsUKs5TrtRi1J0xoRKst6d2RwiqE34OGCEBorUKSrPdk9JlJs0Yf4sPpzpi8crEipJNPvbwAtiHyYYxwyifXKS1zir~mTkqeQYdklLdvtHiHJAlO2-OhN974eXPa8Xz9~LDjIUHRRpNF6SNgpR2fOC7lKM3GvhCyN90Mj-0Exii3Ckq-fZz1tZTzcZ7zdCnton4C6hyleeig__";

const particles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 4 + 1,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
}));

const stats = [
  { value: "20+", label: "Industries Served" },
  { value: "100%", label: "Done For You" },
  { value: "0→AI", label: "Seamless Upgrade" },
];

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHow = () => {
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, #020B18 0%, #071428 50%, #020B18 100%)`,
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#020B18] via-[#020B18]/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020B18] via-transparent to-transparent" />

      {/* Floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.id % 3 === 0 ? "#00E5FF" : p.id % 3 === 1 ? "#C9A227" : "#0D7377",
            opacity: 0.4,
            animation: `floatSlow ${p.duration}s ease-in-out ${p.delay}s infinite`,
            boxShadow: `0 0 ${p.size * 3}px currentColor`,
          }}
        />
      ))}

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col gap-6 lg:gap-8"
          >
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-[#00E5FF]" />
              <span className="label-tag">AI Integration Agency</span>
            </div>

            {/* Headline */}
            <div>
              <h1 className="font-cinzel text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] text-white">
                Meet{" "}
                <span className="gradient-text-cyan text-glow-cyan">AiiA</span>
                <br />
                <span className="text-3xl md:text-4xl xl:text-5xl font-normal text-[#E8F4F8]/80">
                  Your AI Director
                </span>
              </h1>
            </div>

            {/* Sub-headline */}
            <p className="font-dm text-lg md:text-xl text-[#7A9BB5] leading-relaxed max-w-xl">
              She learns your business. She builds your AI strategy. She hires your entire AI staff and manages them.{" "}
              <span className="text-[#E8F4F8]">She delivers results — not workload.</span>
            </p>

            {/* Value prop bullets */}
            <div className="flex flex-col gap-3">
              {[
                "Deep business analysis — your goals, your industry, your competition",
                "Complete AI roadmap tailored to your exact situation",
                "Done-for-you implementation with performance-based pricing",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0 shadow-[0_0_8px_#00E5FF]" />
                  <span className="font-dm text-[#E8F4F8]/80 text-sm md:text-base">{item}</span>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={scrollToContact}
                className="relative px-8 py-4 font-rajdhani font-700 text-base tracking-[0.12em] uppercase text-[#020B18] bg-[#C9A227] rounded hover:bg-[#E8C84A] transition-all duration-300 glow-gold hover:scale-105 active:scale-95"
              >
                Hire AiiA Now
              </button>
              <button
                onClick={scrollToHow}
                className="px-8 py-4 font-rajdhani font-600 text-base tracking-[0.12em] uppercase text-[#00E5FF] border border-[#00E5FF]/40 rounded hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all duration-300"
              >
                See How It Works
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-8 pt-4 border-t border-[#071428]"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="font-cinzel text-2xl font-bold gradient-text-gold">{s.value}</span>
                  <span className="font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: AiiA Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[420px] h-[420px] rounded-full opacity-20 animate-pulse-glow"
                style={{ background: "radial-gradient(circle, #00E5FF 0%, transparent 70%)" }}
              />
            </div>
            {/* Mid glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-[320px] h-[320px] rounded-full opacity-15 animate-breathe"
                style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
              />
            </div>

            {/* Avatar image */}
            <div className="relative z-10 animate-breathe">
              <img
                src={AIIA_AVATAR}
                alt="AiiA — Your AI Director"
                className="w-full max-w-[420px] lg:max-w-[500px] object-contain drop-shadow-[0_0_40px_rgba(0,229,255,0.4)]"
              />
              {/* Name badge */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass rounded-full px-6 py-2 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                <span className="font-cinzel text-white text-sm font-semibold tracking-widest">AiiA</span>
                <span className="font-rajdhani text-[#7A9BB5] text-xs tracking-wider">ONLINE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#7A9BB5]"
      >
        <span className="label-tag text-[10px]">Discover AiiA</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
