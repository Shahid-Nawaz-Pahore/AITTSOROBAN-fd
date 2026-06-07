// =============================================================
// AITT Prototype — MOCK DATA ONLY
// This file powers the design prototype for client review.
// No backend calls. Replace with API wiring after sign-off.
// =============================================================

export type DocStatus =
  | "submitted"
  | "under_review"
  | "needs_revision"
  | "approved"
  | "issued"
  | "rejected";

export type Role = "public" | "company" | "expert" | "admin";

export interface Review {
  expert: string;
  decision: "approved" | "needs_revision" | "rejected" | "pending";
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface DocItem {
  id: string;
  name: string;
  company: string;
  subject: string;
  status: DocStatus;
  submittedAt: string;
  expiryAt?: string;
  hash: string;
  txHash?: string;
  approvals: number;
  requiredApprovals: number;
  reviews: Review[];
}

export interface Company {
  id: string;
  name: string;
  email: string;
  status: "active" | "pending";
  documents: number;
  joinedAt: string;
}

export interface Expert {
  id: string;
  name: string;
  email: string;
  wallet: string;
  reviewsDone: number;
  status: "active" | "invited";
}

export const STATUS_META: Record<
  DocStatus,
  { label: string; classes: string }
> = {
  submitted: { label: "Submitted", classes: "bg-gray-100 text-gray-600" },
  under_review: { label: "Under Review", classes: "bg-warning-50 text-warning-700" },
  needs_revision: { label: "Needs Revision", classes: "bg-orange-50 text-orange-700" },
  approved: { label: "Approved", classes: "bg-blue-light-50 text-blue-light-700" },
  issued: { label: "Issued ✓", classes: "bg-success-50 text-success-700" },
  rejected: { label: "Rejected", classes: "bg-error-50 text-error-700" },
};

export const documents: DocItem[] = [
  {
    id: "DOC-1042",
    name: "ISO-27001 Compliance Report.pdf",
    company: "Nimbus Technologies",
    subject: "Information Security Certification",
    status: "issued",
    submittedAt: "2026-05-21",
    expiryAt: "2027-05-21",
    hash: "2d8f1bd06c6f0c2c2f2b2b4a7b3a9b2e4a5b8d6f9e0c1d3f4a6b7c8d9e0f1a2b",
    txHash: "a5780ef9c1b4d2e3f6071829abcd34ef56789012abcdef34567890abcdef1234",
    approvals: 2,
    requiredApprovals: 2,
    reviews: [
      { expert: "Adv. Sara Khan", decision: "approved", rating: 5, comment: "All clauses verified against ISO-27001:2022. Compliant.", date: "2026-05-23" },
      { expert: "Adv. Daniel Roy", decision: "approved", rating: 4, comment: "Minor formatting noted, content is fully compliant.", date: "2026-05-24" },
    ],
  },
  {
    id: "DOC-1043",
    name: "GDPR Data Processing Agreement.docx",
    company: "Meridian Finance",
    subject: "Data Privacy Compliance",
    status: "under_review",
    submittedAt: "2026-06-01",
    hash: "3d8f1bd06c6f0c2c2f2b2b4a7b3a9b2e4a5b8d6f9e0c1d3f4a6b7c8d9e0f1a2b",
    approvals: 1,
    requiredApprovals: 2,
    reviews: [
      { expert: "Adv. Sara Khan", decision: "approved", rating: 4, comment: "Lawful basis well documented. Awaiting second review.", date: "2026-06-03" },
      { expert: "Adv. Daniel Roy", decision: "pending", rating: 0, comment: "", date: "" },
    ],
  },
  {
    id: "DOC-1044",
    name: "AML Policy Statement.pdf",
    company: "Meridian Finance",
    subject: "Anti-Money-Laundering Certification",
    status: "needs_revision",
    submittedAt: "2026-06-02",
    hash: "9a1c4e7b2d5f8091a3c6e9b2d5f8091a3c6e9b2d5f8091a3c6e9b2d5f8091a3c6",
    approvals: 0,
    requiredApprovals: 2,
    reviews: [
      { expert: "Adv. Daniel Roy", decision: "needs_revision", rating: 2, comment: "Section 4 (customer due diligence) is incomplete. Please add the enhanced due-diligence procedure and resubmit.", date: "2026-06-04" },
    ],
  },
  {
    id: "DOC-1045",
    name: "Employment Contract Template.docx",
    company: "Nimbus Technologies",
    subject: "Labour Law Compliance",
    status: "submitted",
    submittedAt: "2026-06-04",
    hash: "7b3a9b2e4a5b8d6f9e0c1d3f4a6b7c8d9e0f1a2b2d8f1bd06c6f0c2c2f2b2b4a7",
    approvals: 0,
    requiredApprovals: 2,
    reviews: [],
  },
  {
    id: "DOC-1046",
    name: "Tax Compliance Certificate 2025.pdf",
    company: "Orion Logistics",
    subject: "Tax Regulation Compliance",
    status: "issued",
    submittedAt: "2026-04-10",
    expiryAt: "2026-07-10",
    hash: "c6e9b2d5f8091a3c6e9b2d5f8091a3c6e9b2d5f8091a3c6e9b2d5f8091a3c6e9b",
    txHash: "b1c2d3e4f5061728394a5b6c7d8e9f0a1b2c3d4e5f60718293a4b5c6d7e8f9012",
    approvals: 2,
    requiredApprovals: 2,
    reviews: [
      { expert: "Adv. Sara Khan", decision: "approved", rating: 5, comment: "Verified against current tax code. Valid.", date: "2026-04-12" },
      { expert: "Adv. Daniel Roy", decision: "approved", rating: 5, comment: "Confirmed compliant.", date: "2026-04-12" },
    ],
  },
  {
    id: "DOC-1047",
    name: "Environmental Impact Disclosure.pdf",
    company: "Orion Logistics",
    subject: "ESG Compliance",
    status: "rejected",
    submittedAt: "2026-05-30",
    hash: "f8091a3c6e9b2d5f8091a3c6e9b2d5f8091a3c6e9b2d5f8091a3c6e9b2d5f8091",
    approvals: 0,
    requiredApprovals: 2,
    reviews: [
      { expert: "Adv. Sara Khan", decision: "rejected", rating: 1, comment: "Document does not meet the minimum disclosure standard. Rejected.", date: "2026-06-01" },
    ],
  },
];

export const companies: Company[] = [
  { id: "CMP-01", name: "Nimbus Technologies", email: "compliance@nimbus.io", status: "active", documents: 2, joinedAt: "2026-03-12" },
  { id: "CMP-02", name: "Meridian Finance", email: "legal@meridian.com", status: "active", documents: 2, joinedAt: "2026-04-02" },
  { id: "CMP-03", name: "Orion Logistics", email: "ops@orionlog.com", status: "active", documents: 2, joinedAt: "2026-04-20" },
  { id: "CMP-04", name: "Vertex Pharma", email: "qa@vertexpharma.com", status: "pending", documents: 0, joinedAt: "2026-06-03" },
];

export const experts: Expert[] = [
  { id: "EXP-01", name: "Adv. Sara Khan", email: "sara.khan@aitt-legal.com", wallet: "GB7UTX4D…ESNABADA", reviewsDone: 34, status: "active" },
  { id: "EXP-02", name: "Adv. Daniel Roy", email: "daniel.roy@aitt-legal.com", wallet: "GCWMPNEO…HQBPTA45", reviewsDone: 28, status: "active" },
  { id: "EXP-03", name: "Adv. Mei Lin", email: "mei.lin@aitt-legal.com", wallet: "GDPC2AYK…3HOWGRQB", reviewsDone: 0, status: "invited" },
];

export interface Proposal {
  id: string;
  action: string;
  type: "issuance" | "whitelist" | "config" | "admin";
  approvals: number;
  required: number;
  status: "pending" | "executed";
}

export const proposals: Proposal[] = [
  { id: "GOV-21", action: "Issue certificate for GDPR Data Processing Agreement", type: "issuance", approvals: 1, required: 2, status: "pending" },
  { id: "GOV-20", action: "Whitelist Vertex Pharma signing wallet", type: "whitelist", approvals: 1, required: 2, status: "pending" },
  { id: "GOV-19", action: "Update required approvals threshold to 2", type: "config", approvals: 2, required: 2, status: "executed" },
  { id: "GOV-18", action: "Add Adv. Mei Lin as sub-admin", type: "admin", approvals: 2, required: 2, status: "executed" },
];

export const adminStats = {
  totalCertificates: 128,
  pendingReview: 3,
  activeCompanies: 3,
  legalExperts: 2,
};
