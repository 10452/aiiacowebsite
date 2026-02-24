/*
 * AiiACo — Contact / Lead Generation Section
 * The primary conversion point: "Hire AiiA" form
 */
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

const CTA_BG = "https://private-us-east-1.manuscdn.com/sessionFile/FvSFBd374GXzqjgBtweNkq/sandbox/F4ncCcII64x2p4VFSvfQPR-img-4_1771960363000_na1fn_YWlpYS1jdGEtYmc.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvRnZTRkJkMzc0R1h6cWpnQnR3ZU5rcS9zYW5kYm94L0Y0bmNDY0lJNjR4MnA0VkZTdmZRUFItaW1nLTRfMTc3MTk2MDM2MzAwMF9uYTFmbl9ZV2xwWVMxamRHRXRZbWMucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=HBth5oMmcMhwd43xIXjp5k7smC~Z56zN~UuNUGe9mDYTa-M7juUgCbpTBq21OcrxUKNJM9qrbtRMKZMjngv5ulrQpyWwSoh45Eucmr7YKWbPHt1VFqYl0MsYoIZjT47ETHag1mlKeVMvTr6MXhXMadnFqmHWi26V5o6DraH3mdnF1ff5d0d4pMmldid32v00TsT9TR2zZC43Bd~diK2x4QXFFZL1~5k~ahf5xtvwnV7pddvGMW1GI6Axbe7J1YmhKD05jXHq5vcEim3c9TFlIOGAGP8gUrXDpqZtSlSzjxY9C6ZBafovIme~ZlDcEt3ObMIW9~KSwRbkH-xVG~uVMg__";

const industries = [
  "Real Estate", "Financial Services", "Insurance", "Crypto & Web3",
  "Software & Tech", "Health & Beauty", "Automotive", "Energy",
  "Food & Beverage", "Agency", "Other"
];

const services = [
  "AI Strategy Only",
  "Done For You Implementation",
  "Performance-Based Model",
  "Not Sure — Need Guidance",
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", company: "", industry: "", service: "", message: "", phone: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to a backend or form service
    setSubmitted(true);
  };

  const inputClass = "w-full bg-[#071428] border border-[#0A1E35] rounded-lg px-4 py-3 font-dm text-sm text-[#E8F4F8] placeholder-[#7A9BB5]/50 focus:outline-none focus:border-[#00E5FF]/60 focus:ring-1 focus:ring-[#00E5FF]/30 transition-all duration-200";
  const labelClass = "font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase mb-1.5 block";

  return (
    <section
      id="contact"
      className="py-24 md:py-32 relative overflow-hidden"
      style={{ background: "#020B18" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url(${CTA_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020B18] via-[#020B18]/80 to-[#020B18]" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Left: Copy */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-px bg-[#C9A227]" />
                <span className="label-tag-gold">Start Your Transformation</span>
              </div>
              <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                Your Business.
                <br />
                <span className="gradient-text-gold">AI-Powered.</span>
                <br />
                Starting Now.
              </h2>
              <p className="font-dm text-lg text-[#7A9BB5] leading-relaxed">
                Tell AiiA about your business. She'll respond with clarity on exactly
                what's possible — and how to get there. No commitment required.
              </p>
            </div>

            {/* What happens next */}
            <div className="flex flex-col gap-4">
              <p className="font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase">What Happens Next</p>
              {[
                { step: "01", text: "AiiA reviews your submission within 24 hours" },
                { step: "02", text: "You receive a personalized response — not a template" },
                { step: "03", text: "We schedule a free discovery call at your convenience" },
                { step: "04", text: "You walk away with clarity, regardless of next steps" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4">
                  <span className="font-cinzel text-sm font-bold text-[#C9A227]/60 flex-shrink-0 w-6">{item.step}</span>
                  <span className="font-dm text-sm text-[#E8F4F8]/70">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Trust signals */}
            <div className="glass rounded-xl p-6">
              <p className="font-cinzel text-lg text-white mb-3">
                "We don't just tell you how to do it.
                <span className="gradient-text-cyan"> We deliver the results."</span>
              </p>
              <p className="font-dm text-sm text-[#7A9BB5]">— The AiiA Promise</p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {submitted ? (
              <div className="glass rounded-2xl p-12 flex flex-col items-center gap-6 text-center">
                <div className="w-20 h-20 rounded-full bg-[#00E5FF]/10 flex items-center justify-center animate-pulse-glow">
                  <CheckCircle2 size={40} className="text-[#00E5FF]" />
                </div>
                <div>
                  <h3 className="font-cinzel text-2xl font-bold text-white mb-3">AiiA Has Received Your Message</h3>
                  <p className="font-dm text-[#7A9BB5] leading-relaxed">
                    We'll review your submission and reach out within 24 hours with a personalized response.
                    Your transformation begins now.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
                  <span className="font-rajdhani text-xs text-[#7A9BB5] tracking-widest uppercase">AiiA Online</span>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-8 flex flex-col gap-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Your Name *</label>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email Address *</label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelClass}>Company / Business</label>
                    <input
                      name="company"
                      type="text"
                      placeholder="Your Company Name"
                      value={form.company}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone (Optional)</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Your Industry *</label>
                  <select
                    name="industry"
                    required
                    value={form.industry}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>Select your industry</option>
                    {industries.map(i => (
                      <option key={i} value={i}>{i}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>What Are You Looking For? *</label>
                  <select
                    name="service"
                    required
                    value={form.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="" disabled>Select a service model</option>
                    {services.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Tell AiiA About Your Business *</label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your business, your current challenges, and what you're hoping AI can help you achieve..."
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#C9A227] hover:bg-[#E8C84A] text-[#020B18] font-rajdhani font-700 text-sm tracking-[0.12em] uppercase rounded-lg transition-all duration-300 glow-gold hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  <Send size={16} />
                  Hire AiiA — Start My Transformation
                </button>

                <p className="font-dm text-xs text-[#7A9BB5] text-center">
                  Free discovery call included. No commitment required.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
