/*
 * AiiACo SEO Configuration
 * Central source of truth for all meta tags, OG, and structured data
 */

export const SITE = {
  name: "AiiAco",
  domain: "https://aiiaco.com",
  defaultTitle: "AiiAco | AI Integration Authority for the Corporate Age",
  defaultDescription:
    "AiiAco delivers operational AI infrastructure for enterprises. We design, deploy, and manage AI systems that produce measurable results — not workload.",
  ogImage: "https://aiiaco.com/og-image.jpg",
  twitterHandle: "@aiiaco",
  keywords:
    "AI integration, enterprise AI integration, AI implementation services, AI operational infrastructure, business AI automation, AI transformation, managed AI integration, AI workflow automation, AI governance, AI operating model, AI agents for business, done-for-you AI deployment, performance-based AI implementation, AI integration agency",
};

export const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "AiiAco | AI Integration Authority for the Corporate Age",
    description:
      "AiiAco delivers operational AI infrastructure for enterprises. We design, deploy, and manage AI systems that produce measurable results — not workload.",
  },
  "/manifesto": {
    title: "The Corporate Age of AI | AiiAco Manifesto",
    description:
      "AI is no longer a tool — it is infrastructure. Read the AiiAco manifesto on operational AI integration and the next corporate evolution.",
  },
  "/method": {
    title: "AI Integration Method | Operational AI Deployment Framework",
    description:
      "A disciplined AI integration method: diagnostics, architecture, deployment, and managed optimization aligned to measurable ROI.",
  },
  "/industries": {
    title: "AI Integration Across Industries | Enterprise Automation",
    description:
      "AI operational infrastructure for financial services, real estate, insurance, SaaS, energy, and high-complexity industries.",
  },
  "/models": {
    title: "AI Implementation Models | Strategic, Managed & Performance-Based",
    description:
      "Choose your AI upgrade path: strategic blueprint, full managed integration, or performance-aligned partnership.",
  },
  "/case-studies": {
    title: "AI Integration Case Studies | Anonymized Operational Upgrades",
    description:
      "See how structured AI integration improves operational speed, capacity, and governance across industries.",
  },
  "/results": {
    title: "AI Integration Results | Proof Without Personalities — AiiAco",
    description:
      "Measurable outcomes from structured AI integration: cycle time reduction, capacity increase, and operational visibility across 20+ industries.",
  },
  "/upgrade": {
    title: "Initiate AI Upgrade | AiiAco Engagement",
    description:
      "Begin your AI integration engagement. Submit a structured intake or request an executive call. AiiAco responds within 24 hours.",
  },
  "/privacy": {
    title: "Privacy Policy | AiiAco",
    description: "AiiAco privacy policy — how we collect, use, and protect your information.",
  },
  "/terms": {
    title: "Terms of Service | AiiAco",
    description: "AiiAco terms of service governing use of our platform and engagement services.",
  },
};
