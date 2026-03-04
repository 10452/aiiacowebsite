/**
 * AiiAco Industry Microsite Data
 * Focused niche: Real Estate & Brokerage, Mortgage & Lending,
 * Commercial Real Estate & Property Management, Management Consulting
 * Each entry maps to /industries/[slug]
 */

export interface IndustryData {
  slug: string;
  name: string;
  headline: string;
  subheadline: string;
  description: string;
  painPoints: { title: string; body: string }[];
  useCases: { title: string; body: string }[];
  kpis: { value: string; label: string }[];
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  /** ID of a related case study to feature on the microsite page */
  featuredCaseStudyId?: string;
  /** Show an inline Calendly embed in the CTA section instead of the generic contact link */
  showCalendly?: boolean;
}

export const industries: IndustryData[] = [
  {
    slug: "real-estate-brokerage",
    name: "Real Estate & Brokerage",
    headline: "AI Integration for Real Estate & Brokerage Operations",
    subheadline: "From lead qualification to transaction management — AI removes the manual drag from every stage of the deal cycle.",
    description: "Real estate operations run on relationships, timing, and volume. AiiAco deploys AI systems that qualify inbound leads in real time, automate follow-up sequences, generate listing content, and surface deal intelligence — so agents close more with less friction.",
    painPoints: [
      { title: "Lead Overload", body: "High-volume inbound leads with no intelligent triage — agents waste hours on unqualified prospects." },
      { title: "Manual Follow-Up", body: "Inconsistent outreach cadences mean deals fall through the cracks between touchpoints." },
      { title: "Listing Content Bottleneck", body: "Writing property descriptions, market analyses, and client reports consumes hours per listing." },
      { title: "Pipeline Opacity", body: "No real-time visibility into deal stage, probability, or revenue forecast across the brokerage." },
    ],
    useCases: [
      { title: "AI Lead Qualification", body: "Inbound leads are scored and routed instantly based on intent signals, budget, timeline, and property criteria." },
      { title: "Automated Outreach Sequences", body: "Personalized follow-up emails, texts, and reminders triggered by deal stage — no manual scheduling." },
      { title: "Listing Content Generation", body: "Property descriptions, neighborhood summaries, and market reports generated in seconds from MLS data." },
      { title: "Pipeline Intelligence", body: "Real-time dashboard showing deal velocity, conversion probability, and revenue forecast by agent and team." },
    ],
    kpis: [
      { value: "3×", label: "Lead-to-Meeting Conversion" },
      { value: "70%", label: "Reduction in Manual Follow-Up" },
      { value: "60%", label: "Faster Listing Content" },
      { value: "0→AI", label: "Pipeline Visibility" },
    ],
    seoTitle: "AI Integration for Real Estate & Brokerage | AiiAco",
    seoDescription: "AiiAco deploys AI lead qualification, automated follow-up, listing content generation, and pipeline intelligence for real estate brokerages. Operational AI for the modern brokerage.",
    seoKeywords: "AI for real estate, real estate AI integration, brokerage AI automation, AI lead qualification real estate, real estate CRM automation",
    featuredCaseStudyId: "realestate-lead-ops",
  },
  {
    slug: "mortgage-lending",
    name: "Mortgage & Lending",
    headline: "AI Integration for Mortgage & Lending Operations",
    subheadline: "Accelerate underwriting, automate borrower communication, and reduce compliance exposure — without adding headcount.",
    description: "Mortgage operations are document-heavy, compliance-sensitive, and time-critical. AiiAco deploys AI systems that extract and validate loan data, automate borrower status updates, flag compliance risks, and accelerate the full origination cycle.",
    painPoints: [
      { title: "Document Processing Lag", body: "Loan officers spend hours extracting data from income statements, tax returns, and bank statements." },
      { title: "Borrower Communication Gaps", body: "Inconsistent status updates create borrower anxiety and increase inbound call volume." },
      { title: "Compliance Risk", body: "Manual review processes create exposure to regulatory errors and audit failures." },
      { title: "Pipeline Bottlenecks", body: "Underwriting queues create deal delays that cost closings and damage referral relationships." },
    ],
    useCases: [
      { title: "Automated Document Extraction", body: "AI reads and validates income, asset, and identity documents — reducing manual data entry by over 80%." },
      { title: "Borrower Status Automation", body: "Automated updates at every milestone keep borrowers informed without consuming loan officer time." },
      { title: "Compliance Monitoring", body: "Real-time flagging of regulatory exposure across the loan file before it reaches underwriting." },
      { title: "Pipeline Acceleration", body: "AI-assisted pre-underwriting surfaces issues early, reducing clear-to-close timelines significantly." },
    ],
    kpis: [
      { value: "80%", label: "Reduction in Document Processing Time" },
      { value: "60%", label: "Fewer Borrower Status Calls" },
      { value: "40%", label: "Faster Clear-to-Close" },
      { value: "0→AI", label: "Compliance Monitoring" },
    ],
    seoTitle: "AI Integration for Mortgage & Lending | AiiAco",
    seoDescription: "AiiAco deploys AI document extraction, borrower communication automation, and compliance monitoring for mortgage lenders. Reduce origination time and compliance risk.",
    seoKeywords: "AI for mortgage, lending AI automation, mortgage document processing AI, underwriting automation, loan origination AI",
    featuredCaseStudyId: "mortgage-origination",
  },
  {
    slug: "commercial-real-estate",
    name: "Commercial Real Estate & Property Management",
    headline: "AI Integration for Commercial Real Estate & Property Management",
    subheadline: "Automate tenant communication, surface portfolio intelligence, and accelerate lease cycles — with AI built for CRE operations.",
    description: "Commercial real estate and property management firms manage complex portfolios, long lease cycles, and demanding tenant relationships. AiiAco deploys AI systems that automate tenant communication, surface portfolio performance intelligence, accelerate lease administration, and predict maintenance requirements — so teams manage more assets with less overhead.",
    painPoints: [
      { title: "Tenant Communication Volume", body: "Managing communication across large tenant portfolios is labor-intensive and inconsistently executed." },
      { title: "Lease Administration Overhead", body: "Manual tracking of lease milestones, renewals, and critical dates creates risk and administrative drag." },
      { title: "Maintenance Coordination", body: "Reactive maintenance scheduling increases costs and damages tenant satisfaction." },
      { title: "Portfolio Intelligence Gaps", body: "No real-time view of occupancy trends, lease expiry risk, or revenue forecast across the portfolio." },
    ],
    useCases: [
      { title: "Tenant Communication Automation", body: "Automated maintenance updates, lease milestone notifications, and renewal outreach at scale." },
      { title: "Lease Administration Intelligence", body: "AI tracks critical dates, renewal windows, and escalation clauses — surfacing action items before deadlines." },
      { title: "Predictive Maintenance", body: "AI analyzes maintenance history and building data to predict and schedule maintenance proactively." },
      { title: "Portfolio Performance Dashboard", body: "Real-time visibility into occupancy, lease expiry risk, and revenue forecast across the entire portfolio." },
    ],
    kpis: [
      { value: "60%", label: "Reduction in Tenant Communication Overhead" },
      { value: "0 Missed", label: "Lease Critical Dates" },
      { value: "35%", label: "Reduction in Reactive Maintenance" },
      { value: "0→AI", label: "Portfolio Intelligence" },
    ],
    seoTitle: "AI Integration for Commercial Real Estate & Property Management | AiiAco",
    seoDescription: "AiiAco deploys AI tenant communication, lease administration, and portfolio intelligence for commercial real estate firms and property managers.",
    seoKeywords: "AI for commercial real estate, property management AI, CRE AI automation, lease administration AI, tenant communication AI",
  },
  {
    slug: "management-consulting",
    name: "Management Consulting",
    headline: "AI Integration for Management Consulting Firms",
    subheadline: "Scale delivery capacity, automate proposal generation, and surface client intelligence — with AI built for consulting operations.",
    description: "Management consulting firms compete on expertise, speed of insight, and client outcomes. AiiAco deploys AI systems that accelerate proposal and deliverable generation, surface project risk signals, systematize knowledge management, and identify account expansion opportunities — so consultants spend time on strategy, not administration.",
    painPoints: [
      { title: "Proposal and Deliverable Overhead", body: "Consultants spend disproportionate time on proposal, SOW, and report generation that AI can accelerate." },
      { title: "Project Risk Visibility", body: "Project health signals exist in communication and delivery data but are not systematically monitored." },
      { title: "Knowledge Management", body: "Institutional knowledge is siloed in documents and individual expertise — not systematically accessible across the firm." },
      { title: "Client Expansion Gaps", body: "Expansion opportunities within existing accounts are not systematically identified and pursued." },
    ],
    useCases: [
      { title: "Proposal & Report Generation", body: "AI generates first-draft proposals, SOWs, and client reports from briefs and data — reducing preparation time by 60%." },
      { title: "Project Risk Monitoring", body: "AI surfaces project health signals from communication patterns, delivery data, and milestone tracking." },
      { title: "Knowledge Management", body: "AI-powered knowledge base makes institutional expertise searchable and accessible across the firm." },
      { title: "Account Intelligence", body: "AI identifies expansion signals within existing accounts and surfaces them to account managers before the client asks." },
    ],
    kpis: [
      { value: "60%", label: "Faster Proposal Generation" },
      { value: "40%", label: "Reduction in Project Overruns" },
      { value: "3×", label: "Knowledge Accessibility" },
      { value: "0→AI", label: "Account Expansion Intelligence" },
    ],
    seoTitle: "AI Integration for Management Consulting Firms | AiiAco",
    seoDescription: "AiiAco deploys AI proposal generation, project risk monitoring, and account intelligence for management consulting firms. Operational AI for consulting at scale.",
    seoKeywords: "AI for management consulting, consulting firm AI automation, proposal automation AI, project management AI, consulting operations AI",
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find((i) => i.slug === slug);
}
