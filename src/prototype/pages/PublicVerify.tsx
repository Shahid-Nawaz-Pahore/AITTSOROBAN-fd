import React, { useState } from "react";
import { Link } from "react-router";
import { UploadCloud, CheckCircle2, XCircle, FileCheck2, ShieldCheck } from "lucide-react";
import { Card, Btn, DemoBanner, Mono, StatusBadge } from "../ui";
import { documents } from "../mockData";

type Result = "idle" | "verifying" | "found" | "notfound";

const PublicVerify: React.FC = () => {
  const [file, setFile] = useState<string | null>(null);
  const [result, setResult] = useState<Result>("idle");
  const match = documents[0]; // sample verified document

  const verify = (outcome: "found" | "notfound") => {
    setResult("verifying");
    setTimeout(() => setResult(outcome), 700);
  };

  return (
    <div>
      <DemoBanner />

      <div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-500">
          <ShieldCheck size={28} />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 sm:text-3xl">
          Verify a Compliance Document
        </h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Upload a file to instantly check whether it has been certified and anchored on-chain.
          No account required.
        </p>
      </div>

      <Card className="mx-auto mt-8 max-w-3xl p-6 sm:p-8">
        {result === "idle" || result === "verifying" ? (
          <>
            <label
              className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center transition hover:border-brand-400 dark:border-gray-700 dark:bg-white/[0.02]"
            >
              <UploadCloud className="mb-3 h-12 w-12 text-gray-400" />
              <p className="font-medium text-gray-700 dark:text-gray-200">
                {file || "Drag & drop your document, or click to browse"}
              </p>
              <p className="mt-1 text-sm text-gray-400">PDF, DOCX, PNG, JPG — up to 10 MB</p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0]?.name || "document.pdf")}
              />
            </label>

            <div className="mt-6 flex flex-col items-center gap-3">
              <Btn
                className="w-full sm:w-auto"
                disabled={!file || result === "verifying"}
                onClick={() => verify("found")}
              >
                {result === "verifying" ? "Verifying on-chain…" : "Verify Document"}
              </Btn>
              <button
                onClick={() => verify("notfound")}
                className="text-xs text-gray-400 underline-offset-2 hover:underline"
              >
                (demo) preview “not found” result
              </button>
            </div>
          </>
        ) : result === "found" ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto mb-3 h-16 w-16 text-success-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">Document Verified</h2>
            <p className="mt-1 text-gray-500">This document is certified and recorded on the Stellar blockchain.</p>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-5 text-left dark:border-gray-800 dark:bg-white/[0.02]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-5 w-5 text-brand-500" />
                  <span className="font-medium text-gray-800 dark:text-white/90">{match.name}</span>
                </div>
                <StatusBadge status={match.status} />
              </div>
              <dl className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                <Field label="Company" value={match.company} />
                <Field label="Subject" value={match.subject} />
                <Field label="Issued" value={match.submittedAt} />
                <Field label="Expires" value={match.expiryAt || "—"} />
                <div className="sm:col-span-2">
                  <p className="text-gray-400">Document hash (SHA-256)</p>
                  <Mono className="break-all">{match.hash}</Mono>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-gray-400">On-chain transaction</p>
                  <Mono className="break-all">{match.txHash}</Mono>
                </div>
              </dl>
              <div className="mt-4">
                <Link to={`/certificate/${match.id}`} className="text-sm font-medium text-brand-500 hover:underline">
                  View full certificate →
                </Link>
              </div>
            </div>

            <Btn variant="outline" className="mt-6" onClick={() => { setResult("idle"); setFile(null); }}>
              Verify another document
            </Btn>
          </div>
        ) : (
          <div className="text-center">
            <XCircle className="mx-auto mb-3 h-16 w-16 text-error-500" />
            <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">Document Not Found</h2>
            <p className="mt-1 text-gray-500">
              This document has not been certified or anchored on-chain. It may be unverified or altered.
            </p>
            <Btn variant="outline" className="mt-6" onClick={() => { setResult("idle"); setFile(null); }}>
              Try another document
            </Btn>
          </div>
        )}
      </Card>
    </div>
  );
};

const Field: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium text-gray-700 dark:text-gray-200">{value}</p>
  </div>
);

export default PublicVerify;
