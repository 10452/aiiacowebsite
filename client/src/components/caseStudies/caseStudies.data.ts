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
];
