/*
 * AiiACo Structured Data — JSON-LD schemas
 * Includes: Organization, Service, WebSite, FAQPage, HowTo
 * Injected globally in App.tsx for all pages.
 * AI systems and Google use these to understand and cite the site.
 */
import { Helmet } from "react-helmet-async";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AiiAco",
  "alternateName": "AI Integration Authority",
  "url": "https://aiiaco.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://d2xsxph8kpxj0f.cloudfront.net/310419663031409823/jiUKWZNCEesKEKgdJkoZwj/aiia_logo_full_4970c781.png",
    "width": 344,
    "height": 431
  },
  "description": "AiiAco is the AI Integration Authority for the Corporate Age. We design, deploy, and manage complete AI operational infrastructure for enterprise and mid-market businesses across 20+ industries. Engagements include strategic AI blueprints, full managed integration, and performance-based AI partnerships.",
  "foundingDate": "2026",
  "areaServed": "Global",
  "knowsAbout": [
    "Enterprise AI Integration",
    "AI Implementation Services",
    "Managed AI Infrastructure",
    "AI Automation for Business",
    "AI Governance Frameworks",
    "LLM Deployment",
    "AI Workflow Orchestration",
    "Operational AI Strategy"
  ],
  "sameAs": [
    "https://www.linkedin.com/company/aiiaco"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Business Inquiry",
    "url": "https://aiiaco.com/upgrade",
    "availableLanguage": "English"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "AI Integration Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Strategic Intelligence Blueprint",
          "description": "Full operational diagnostic and AI integration architecture. Delivered as a structured blueprint with implementation roadmap, system selection, and ROI projections."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Full Managed AI Integration",
          "description": "Complete AI operational infrastructure — design, deployment, and managed optimization. Zero internal overhead. AiiAco builds, integrates, and runs the entire AI stack."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Performance-Based AI Partnership",
          "description": "Reduced upfront cost with success-linked fees tied to measurable operational outcomes. Aligned incentives from day one."
        }
      }
    ]
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Enterprise AI Integration — AiiAco",
  "provider": {
    "@type": "Organization",
    "name": "AiiAco",
    "url": "https://aiiaco.com"
  },
  "areaServed": "Global",
  "description": "End-to-end AI integration for enterprise and mid-market businesses. AiiAco conducts operational diagnostics, designs custom AI architecture, deploys LLM-based automation, predictive models, and workflow orchestration systems, then manages the full stack on an ongoing basis.",
  "serviceType": [
    "AI Integration",
    "AI Implementation Services",
    "Managed AI Services",
    "AI Automation",
    "AI Governance"
  ],
  "audience": {
    "@type": "BusinessAudience",
    "audienceType": "Enterprise and mid-market companies seeking operational AI infrastructure"
  }
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AiiAco — AI Integration Authority",
  "url": "https://aiiaco.com",
  "description": "AI Integration Authority for the Corporate Age. Operational AI infrastructure engineered for measurable outcomes across 20+ industries.",
  "publisher": {
    "@type": "Organization",
    "name": "AiiAco"
  }
};

// FAQ schema — answers the most common questions enterprise buyers ask about AI integration
// These questions mirror what people search on Google and ask AI assistants
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is AI integration for business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI integration for business means embedding artificial intelligence into your operational infrastructure — not as a standalone tool, but as a functional system that executes decisions, automates workflows, and delivers measurable outcomes. True AI integration replaces manual processes with AI agents, automates document extraction and data routing, deploys predictive models for demand forecasting or risk scoring, and orchestrates multi-step workflows without human intervention. AiiAco designs, deploys, and manages this infrastructure end-to-end."
      }
    },
    {
      "@type": "Question",
      "name": "How long does AI integration take for a business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI integration timelines vary by scope. A Strategic Intelligence Blueprint (full operational diagnostic and architecture design) typically takes 2–4 weeks. Initial AI system deployment for a defined workflow — such as automating AP invoice processing or deploying an LLM-based document extraction pipeline — takes 4–8 weeks. Full managed AI integration across multiple operational functions typically spans 3–6 months for initial deployment, followed by continuous optimization. AiiAco manages every phase, eliminating the internal resource burden that typically extends timelines."
      }
    },
    {
      "@type": "Question",
      "name": "How much does AI integration cost for a business?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI integration costs depend on scope, complexity, and engagement model. AiiAco offers three structures: a Strategic Intelligence Blueprint (diagnostic and architecture) as a defined-scope engagement; Full Managed Integration as a monthly retainer covering deployment, management, and optimization; and a Performance Partnership with reduced upfront cost and success-linked fees tied to measurable outcomes. Every engagement begins with a Business Intelligence Audit to scope the integration accurately before any commitment."
      }
    },
    {
      "@type": "Question",
      "name": "What is the difference between AI integration and AI consulting?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AI consulting delivers strategy, recommendations, and frameworks — but leaves implementation to your internal team. AI integration means the systems are actually built, deployed, and running in your operations. AiiAco is an AI Integration Authority, not a consulting firm. We do not deliver slide decks. We design the AI architecture, deploy every system, manage all vendor relationships, and optimize performance on an ongoing basis. You receive operational outcomes, not advisory documents."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does AiiAco serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AiiAco has deployed AI integration frameworks across 20+ industries including Financial Services, Real Estate, Insurance, Healthcare & Wellness, Manufacturing, Logistics, Energy & Resources, Software & Technology, Automotive, Food & Beverage, Luxury & Lifestyle, Agency Operations, Investment & Capital, and Retail & Commerce. The AI architecture is customized per sector; the integration methodology — diagnostic, blueprint, deployment, optimization — remains consistent."
      }
    },
    {
      "@type": "Question",
      "name": "How does AiiAco handle AI governance and data security?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "AiiAco implements AI governance protocols at every layer of the integration stack. This includes data access controls and role-based permissions for all AI systems, model validation and output auditing before production deployment, documented AI decision trails for regulatory compliance, vendor security assessment for all third-party AI providers, and ongoing monitoring for model drift and performance degradation. Enterprise clients receive a governance framework document as part of every full integration engagement."
      }
    },
    {
      "@type": "Question",
      "name": "What is managed AI integration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Managed AI integration means a third party — AiiAco — designs, deploys, and operates your AI infrastructure on an ongoing basis. Rather than hiring an internal AI team, purchasing multiple AI tool subscriptions, and managing vendor relationships yourself, you engage AiiAco as your AI operational partner. We handle system selection, prompt engineering, API integrations, model retraining, performance monitoring, and expansion as your business evolves. You receive outcomes; we manage the complexity."
      }
    },
    {
      "@type": "Question",
      "name": "What is performance-based AI integration?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Performance-based AI integration is an engagement model where AiiAco's fees are partially tied to measurable operational outcomes — such as reduction in processing time, increase in throughput, or cost savings from automation. This model reduces upfront investment and aligns AiiAco's incentives directly with your business results. It is available to qualified engagements where clear KPIs can be established at the outset."
      }
    }
  ]
};

// HowTo schema — targets "how to integrate AI into business" queries
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Integrate AI Into Your Business Operations",
  "description": "A structured approach to enterprise AI integration — from operational diagnostic to managed deployment and continuous optimization.",
  "totalTime": "P3M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "USD",
    "value": "Contact for scope-based pricing"
  },
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Operational Diagnostic",
      "text": "Conduct a full audit of your business workflows, data flows, decision bottlenecks, and competitive exposure. Identify the highest-leverage AI integration points — where AI can eliminate manual work, accelerate decisions, or surface intelligence from existing data.",
      "url": "https://aiiaco.com/method"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "AI Integration Blueprint",
      "text": "Map each identified leverage point to a specific AI capability — LLMs for document processing and communication, automation agents for workflow orchestration, predictive models for forecasting and risk scoring. Attach measurable ROI targets to each integration.",
      "url": "https://aiiaco.com/method"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "System Selection and Architecture",
      "text": "Select AI tools, models, and infrastructure components based on your technical environment, data architecture, and security requirements. Design the integration architecture to connect AI systems with your existing ERP, CRM, and operational platforms.",
      "url": "https://aiiaco.com/ai-integration"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Deployment and Integration",
      "text": "Deploy AI systems into your operational environment. Configure API integrations, data pipelines, and automation triggers. Validate outputs against defined accuracy and performance thresholds before production go-live.",
      "url": "https://aiiaco.com/ai-implementation-services"
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Governance and Compliance Setup",
      "text": "Implement AI governance protocols: data access controls, model output auditing, decision trail documentation, and vendor security assessments. Establish monitoring dashboards for ongoing performance visibility.",
      "url": "https://aiiaco.com/method"
    },
    {
      "@type": "HowToStep",
      "position": 6,
      "name": "Continuous Optimization",
      "text": "Monitor AI system performance against KPIs on an ongoing basis. Retrain models as your business data evolves. Expand the integration footprint as new leverage points emerge. Managed AI integration is not a one-time project — it is operational infrastructure.",
      "url": "https://aiiaco.com/method"
    }
  ]
};

export default function StructuredData() {
  return (
    <Helmet>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
    </Helmet>
  );
}
