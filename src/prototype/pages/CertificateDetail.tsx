import React from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, FileText, ShieldCheck, Clock, Building2, ExternalLink } from "lucide-react";
import { Card, SectionTitle, DemoBanner, StatusBadge, Rating, Mono, Btn } from "../ui";
import { documents } from "../mockData";

const Row: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="flex flex-col gap-0.5 border-b border-gray-100 py-3 last:border-0 dark:border-gray-800 sm:flex-row sm:items-center sm:justify-between">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{children}</span>
  </div>
);

const CertificateDetail: React.FC = () => {
  const { id } = useParams();
  const doc = documents.find((d) => d.id === id) || documents[0];

  return (
    <div>
      <DemoBanner />
      <Link to="/registry" className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700">
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <FileText size={24} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">{doc.name}</h2>
                  <Mono>{doc.id}</Mono>
                </div>
              </div>
              <StatusBadge status={doc.status} />
            </div>

            <div className="mt-4">
              <Row label="Company"><span className="inline-flex items-center gap-1.5"><Building2 size={14} /> {doc.company}</span></Row>
              <Row label="Compliance subject">{doc.subject}</Row>
              <Row label="Submitted">{doc.submittedAt}</Row>
              <Row label="Expires">{doc.expiryAt || "—"}</Row>
              <Row label="Approvals">{doc.approvals}/{doc.requiredApprovals}</Row>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <p className="text-sm text-gray-400">Document hash (SHA-256)</p>
                <Mono className="break-all">{doc.hash}</Mono>
              </div>
              {doc.txHash && (
                <div>
                  <p className="text-sm text-gray-400">On-chain transaction</p>
                  <div className="flex items-center gap-2">
                    <Mono className="break-all">{doc.txHash}</Mono>
                    <ExternalLink size={13} className="shrink-0 text-brand-500" />
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Reviews */}
          <Card className="mt-6 p-6">
            <SectionTitle title="Legal Reviews" subtitle="Assessments by validated legal experts." />
            {doc.reviews.filter((r) => r.decision !== "pending").length === 0 ? (
              <p className="text-sm text-gray-400">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {doc.reviews.filter((r) => r.decision !== "pending").map((r, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-500">
                          {r.expert.split(" ").slice(-1)[0][0]}
                        </div>
                        <span className="font-medium text-gray-800 dark:text-white/90">{r.expert}</span>
                      </div>
                      <Rating value={r.rating} />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{r.comment}</p>
                    <p className="mt-2 text-xs text-gray-400">{r.date}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 text-center">
            {doc.status === "issued" ? (
              <>
                <ShieldCheck className="mx-auto mb-2 h-12 w-12 text-success-500" />
                <p className="font-semibold text-gray-800 dark:text-white/90">Certified & On-Chain</p>
                <p className="mt-1 text-sm text-gray-500">This document is verified and immutably anchored on Stellar.</p>
              </>
            ) : (
              <>
                <Clock className="mx-auto mb-2 h-12 w-12 text-warning-500" />
                <p className="font-semibold text-gray-800 dark:text-white/90">In Progress</p>
                <p className="mt-1 text-sm text-gray-500">This document is moving through the review workflow.</p>
              </>
            )}
          </Card>

          <Card className="p-6">
            <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-200">Workflow</p>
            <ol className="space-y-3">
              {["Submitted", "Under review", "Approved", "Issued on-chain"].map((step, i) => {
                const order = ["submitted", "under_review", "approved", "issued"];
                const current = order.indexOf(doc.status);
                const done = i <= current || doc.status === "issued";
                return (
                  <li key={step} className="flex items-center gap-3 text-sm">
                    <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                      done ? "bg-success-500 text-white" : "bg-gray-200 text-gray-500 dark:bg-gray-700"
                    }`}>
                      {done ? "✓" : i + 1}
                    </span>
                    <span className={done ? "text-gray-700 dark:text-gray-200" : "text-gray-400"}>{step}</span>
                  </li>
                );
              })}
            </ol>
          </Card>

          <Btn variant="outline" className="w-full">Download document</Btn>
        </div>
      </div>
    </div>
  );
};

export default CertificateDetail;
