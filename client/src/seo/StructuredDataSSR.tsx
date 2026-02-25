/**
 * AiiACo Structured Data — SSR-safe version
 * react-helmet-async v2 SSR: script children must be text nodes, NOT dangerouslySetInnerHTML.
 * dangerouslySetInnerHTML works in the browser but is ignored by renderToString.
 * This component is used in entry-server.tsx for prerendering.
 * The browser version (StructuredData.tsx) uses dangerouslySetInnerHTML for runtime injection.
 */
import { Helmet } from "react-helmet-async";

const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "AiiAco",
  "url": "https://aiiaco.com",
  "logo": "https://aiiaco.com/logo.png",
  "description": "AI Integration Authority for the Corporate Age. Operational AI infrastructure engineered for measurable outcomes.",
  "foundingDate": "2026",
  "sameAs": ["https://www.linkedin.com/company/aiiaco"],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Business Inquiry",
    "url": "https://aiiaco.com/upgrade"
  }
});

const serviceSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Enterprise AI Integration",
  "provider": { "@type": "Organization", "name": "AiiAco", "url": "https://aiiaco.com" },
  "areaServed": "Global",
  "description": "Operational AI integration including diagnostics, system architecture, deployment, and managed optimization aligned to measurable ROI.",
  "serviceType": "AI Integration & Implementation",
  "offers": [
    { "@type": "Offer", "name": "Strategic Intelligence Blueprint", "description": "Full diagnostic and AI integration architecture." },
    { "@type": "Offer", "name": "Full Integration", "description": "Complete AI operational infrastructure. Design, deployment, and managed optimization." },
    { "@type": "Offer", "name": "Performance Partnership", "description": "Performance-based AI integration. Success-linked fees aligned to measurable outcomes." }
  ]
});

const websiteSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AiiAco",
  "url": "https://aiiaco.com",
  "description": "AI Integration Authority for the Corporate Age."
});

export default function StructuredDataSSR() {
  return (
    <Helmet>
      {/* SSR-safe: text children work with renderToString; dangerouslySetInnerHTML does not */}
      <script type="application/ld+json">{organizationSchema}</script>
      <script type="application/ld+json">{serviceSchema}</script>
      <script type="application/ld+json">{websiteSchema}</script>
    </Helmet>
  );
}
