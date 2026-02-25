/*
 * AiiACo Structured Data — JSON-LD schemas for Organization, Service, WebSite
 * Uses dangerouslySetInnerHTML because react-helmet-async does not support
 * text children inside <script> tags — they must be passed as innerHTML.
 * Injected globally in App.tsx for all pages.
 */
import { Helmet } from "react-helmet-async";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AiiAco",
  "url": "https://aiiaco.com",
  "logo": "https://aiiaco.com/logo.png",
  "description": "AI Integration Authority for the Corporate Age. Operational AI infrastructure engineered for measurable outcomes.",
  "foundingDate": "2026",
  "sameAs": [
    "https://www.linkedin.com/company/aiiaco"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Business Inquiry",
    "url": "https://aiiaco.com/upgrade"
  }
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Enterprise AI Integration",
  "provider": {
    "@type": "Organization",
    "name": "AiiAco",
    "url": "https://aiiaco.com"
  },
  "areaServed": "Global",
  "description": "Operational AI integration including diagnostics, system architecture, deployment, and managed optimization aligned to measurable ROI. Available as strategic blueprint, full managed integration, or performance-based partnership.",
  "serviceType": "AI Integration & Implementation",
  "offers": [
    {
      "@type": "Offer",
      "name": "Strategic Intelligence Blueprint",
      "description": "Full diagnostic and AI integration architecture. Delivered as a structured blueprint with implementation roadmap."
    },
    {
      "@type": "Offer",
      "name": "Full Integration",
      "description": "Complete AI operational infrastructure. Design, deployment, and managed optimization. Zero internal overhead."
    },
    {
      "@type": "Offer",
      "name": "Performance Partnership",
      "description": "Performance-based AI integration. Reduced upfront cost. Success-linked fees aligned to measurable outcomes."
    }
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AiiAco",
  "url": "https://aiiaco.com",
  "description": "AI Integration Authority for the Corporate Age.",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://aiiaco.com/upgrade",
    "query-input": "required name=search_term_string"
  }
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
    </Helmet>
  );
}
