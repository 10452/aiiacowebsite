/*
 * AiiACo Case Studies — Anonymized, verifiable in structure
 * No client names. No theatre. Operating model improvements only.
 */

export type CaseMetric = {
  label: string;
  value: string;
  note?: string;
};

export type CaseStudy = {
  id: string;
  sector: string;
  type: string;
  situation: string;
  constraints: string[];
  approach: string[];
  systemsDeployed: string[];
  outcomes: CaseMetric[];
  timeline: string;
  governance: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "fs-intake-ops",
    sector: "Financial Services",
    type: "Mid-market",
    situation:
      "Fragmented intake and underwriting support workflows created delays, inconsistent decision support, and manual reporting overhead.",
    constraints: [
      "Auditability required",
      "Role-based access controls",
      "Legacy CRM and document systems",
    ],
    approach: [
      "Mapped intake → decision → documentation lifecycle",
      "Designed KPI framework and acceptance criteria",
      "Automated routing, summaries, and compliance checkpoints",
      "Implemented monitoring and escalation logic",
    ],
    systemsDeployed: [
      "Workflow orchestration (intake → routing → status)",
      "Document automation + structured templates",
      "KPI dashboarding + automated reporting",
      "Quality controls + exception handling",
    ],
    outcomes: [
      { label: "Cycle time reduction", value: "30–55%", note: "Varies by product and documentation complexity" },
      { label: "Manual reporting eliminated", value: "80–95%" },
      { label: "Consistency improved", value: "Measured via QA sampling + standardized outputs" },
    ],
    timeline: "6–10 weeks",
    governance: ["Permissions + access tiers", "Change logging", "Quality sampling cadence"],
  },
  {
    id: "merchant-compliance",
    sector: "High-Risk Merchant",
    type: "Scale-up",
    situation:
      "Onboarding and compliance operations were manual-heavy, slow to respond, and inconsistent across teams.",
    constraints: ["Compliance checkpoints", "Multi-system data inputs", "High-volume support load"],
    approach: [
      "Standardized intake + validation rules",
      "Automated document checks and follow-ups",
      "Built escalation paths for edge cases",
    ],
    systemsDeployed: [
      "Automated onboarding workflows",
      "Compliance check orchestration",
      "Support triage automation",
      "Unified ops dashboard",
    ],
    outcomes: [
      { label: "Onboarding throughput", value: "2–3x", note: "Without proportional staffing increases" },
      { label: "Repeated support tasks automated", value: "40–65%" },
      { label: "Operational visibility", value: "Unified KPI framework established" },
    ],
    timeline: "4–8 weeks",
    governance: ["Audit trail", "Exception handling rules", "Human review gates"],
  },
  {
    id: "realestate-lead-ops",
    sector: "Real Estate",
    type: "Brokerage",
    situation:
      "Lead response times were inconsistent, follow-up sequences were manual, and pipeline visibility was fragmented across agents.",
    constraints: ["CRM integration required", "Agent adoption risk", "Compliance with disclosure rules"],
    approach: [
      "Mapped lead lifecycle from inquiry to close",
      "Automated qualification and routing logic",
      "Built structured follow-up sequences with override controls",
    ],
    systemsDeployed: [
      "Lead qualification automation",
      "CRM workflow integration",
      "Automated follow-up sequences",
      "Pipeline reporting dashboard",
    ],
    outcomes: [
      { label: "Lead response time", value: "< 5 min (from avg. 4+ hours)" },
      { label: "Follow-up consistency", value: "100% structured sequence coverage" },
      { label: "Pipeline visibility", value: "Unified dashboard with stage-level KPIs" },
    ],
    timeline: "3–6 weeks",
    governance: ["Agent override controls", "Compliance review gates", "Activity logging"],
  },
  {
    id: "agency-ops-scale",
    sector: "Agency Operations",
    type: "Growth-stage",
    situation:
      "Delivery operations were bottlenecked by manual reporting, inconsistent client communication, and reactive project management.",
    constraints: ["Multiple client environments", "Variable deliverable formats", "Team capacity constraints"],
    approach: [
      "Standardized delivery workflows and status reporting",
      "Automated client update sequences",
      "Built internal capacity tracking and alert logic",
    ],
    systemsDeployed: [
      "Delivery workflow automation",
      "Automated client reporting",
      "Capacity monitoring system",
      "Internal knowledge base automation",
    ],
    outcomes: [
      { label: "Reporting time per client", value: "Reduced by 70–80%" },
      { label: "Client communication consistency", value: "Standardized across all accounts" },
      { label: "Delivery bottlenecks resolved", value: "3 critical friction points eliminated" },
    ],
    timeline: "4–7 weeks",
    governance: ["Client-level access controls", "Escalation logic", "Quality review checkpoints"],
  },
  {
    id: "mortgage-origination",
    sector: "Mortgage & Lending",
    type: "Regional lender",
    situation:
      "A regional mortgage lender was losing closings to faster competitors due to document-heavy underwriting queues and inconsistent borrower communication.",
    constraints: [
      "RESPA and TRID compliance requirements",
      "Legacy LOS integration",
      "Loan officer adoption risk",
    ],
    approach: [
      "Mapped full origination lifecycle from application to CTC",
      "Automated document extraction and validation for income, asset, and identity files",
      "Built borrower status update sequences triggered by pipeline milestones",
      "Implemented pre-underwriting compliance flag logic",
    ],
    systemsDeployed: [
      "AI document extraction and validation layer",
      "Automated borrower communication sequences",
      "Pre-underwriting compliance monitoring",
      "Pipeline velocity dashboard",
    ],
    outcomes: [
      { label: "Document processing time", value: "Reduced 75–85%", note: "Across income, asset, and identity document types" },
      { label: "Borrower inbound call volume", value: "Reduced 50–60%" },
      { label: "Clear-to-close timeline", value: "Reduced 35–45%" },
    ],
    timeline: "6–9 weeks",
    governance: ["RESPA/TRID compliance gates", "Human review on exception files", "Audit trail on all automated decisions"],
  },
  {
    id: "insurance-claims-ops",
    sector: "Insurance",
    type: "Mid-market carrier",
    situation:
      "A mid-market P&C carrier was experiencing claims processing backlogs, rising fraud losses, and policyholder satisfaction scores below industry benchmarks.",
    constraints: [
      "State regulatory requirements on claims handling timelines",
      "Legacy claims management system",
      "Adjuster workflow integration",
    ],
    approach: [
      "Mapped claims lifecycle from FNOL to settlement",
      "Deployed AI triage and routing logic by claim type, complexity, and fraud risk",
      "Automated policyholder milestone communications",
      "Built fraud pattern detection layer on historical claims data",
    ],
    systemsDeployed: [
      "Claims triage and routing automation",
      "Fraud detection model (pattern-based)",
      "Policyholder communication sequences",
      "Adjuster workload dashboard",
    ],
    outcomes: [
      { label: "Claims processing cycle time", value: "Reduced 55–65%" },
      { label: "Fraud detection coverage", value: "Expanded to 100% of claims vs. sampled review" },
      { label: "Policyholder satisfaction", value: "Improved via consistent milestone communication" },
    ],
    timeline: "7–10 weeks",
    governance: ["State compliance review gates", "Adjuster override controls", "Fraud flag audit trail"],
  },
  {
    id: "wealth-client-ops",
    sector: "Investment & Wealth Management",
    type: "RIA / multi-family office",
    situation:
      "A growing RIA was unable to scale personalized client communication and reporting as AUM grew — advisors were spending 30–40% of their time on administrative tasks.",
    constraints: [
      "SEC and FINRA communication compliance",
      "Custodian data integration",
      "Advisor adoption and brand consistency",
    ],
    approach: [
      "Audited advisor time allocation and identified highest-leverage automation targets",
      "Built automated portfolio commentary generation from custodian data feeds",
      "Deployed client reporting automation with advisor review gate",
      "Implemented rebalancing signal monitoring with alert logic",
    ],
    systemsDeployed: [
      "Portfolio commentary generation",
      "Automated client reporting pipeline",
      "Rebalancing signal monitoring",
      "Compliance review workflow",
    ],
    outcomes: [
      { label: "Advisor administrative time", value: "Reduced 60–70%" },
      { label: "Client reporting cycle", value: "From 3–5 days to same-day" },
      { label: "AUM per advisor capacity", value: "Increased 40–55%" },
    ],
    timeline: "5–8 weeks",
    governance: ["Advisor review gate on all client-facing outputs", "SEC/FINRA compliance logging", "Custodian data access controls"],
  },
  {
    id: "luxury-hospitality-ops",
    sector: "Luxury & UHNW",
    type: "Luxury hospitality group",
    situation:
      "A luxury hospitality group was losing repeat bookings and referrals due to inconsistent guest communication, reactive service recovery, and manual VIP profile management.",
    constraints: [
      "Brand voice and discretion requirements",
      "PMS and CRM integration",
      "Staff adoption across properties",
    ],
    approach: [
      "Mapped guest lifecycle from pre-arrival to post-stay",
      "Built AI-assisted VIP profile enrichment from interaction history",
      "Deployed personalized pre-arrival and in-stay communication sequences",
      "Implemented service recovery detection and escalation logic",
    ],
    systemsDeployed: [
      "Guest lifecycle communication automation",
      "VIP profile intelligence layer",
      "Service recovery detection and escalation",
      "Post-stay retention sequences",
    ],
    outcomes: [
      { label: "Repeat booking rate", value: "Improved 25–35%" },
      { label: "Service recovery response time", value: "Reduced from hours to minutes" },
      { label: "Staff time on manual guest communication", value: "Reduced 60–70%" },
    ],
    timeline: "4–7 weeks",
    governance: ["Brand voice review on all automated outputs", "Staff override controls", "Guest data privacy controls"],
  },
];
