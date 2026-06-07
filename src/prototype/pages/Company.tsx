import React, { useState } from "react";
import { Link } from "react-router";
import { UploadCloud, Download, FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, SectionTitle, DemoBanner, Btn, StatCard } from "../ui";
import DocTable from "../components/DocTable";
import { documents } from "../mockData";

const COMPANY = "Nimbus Technologies"; // simulated logged-in company
const myDocs = documents.filter((d) => d.company === COMPANY);

export const MyDocuments: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle
      title="My Documents"
      subtitle={`Compliance submissions for ${COMPANY}`}
      right={
        <Link to="/company/submit">
          <Btn>
            <UploadCloud size={16} /> Submit Document
          </Btn>
        </Link>
      }
    />

    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Total Submitted" value={myDocs.length} icon={<FileText size={20} />} />
      <StatCard label="Under Review" value={myDocs.filter((d) => d.status === "under_review").length} icon={<Clock size={20} />} accent="bg-warning-50 text-warning-500" />
      <StatCard label="Issued" value={myDocs.filter((d) => d.status === "issued").length} icon={<CheckCircle2 size={20} />} accent="bg-success-50 text-success-500" />
      <StatCard label="Needs Action" value={myDocs.filter((d) => d.status === "needs_revision").length} icon={<AlertTriangle size={20} />} accent="bg-orange-50 text-orange-500" />
    </div>

    <Card className="p-2">
      <DocTable docs={myDocs} showCompany={false} showApprovals />
    </Card>
  </div>
);

export const SubmitDocument: React.FC = () => {
  const [file, setFile] = useState<string | null>(null);
  return (
    <div>
      <DemoBanner />
      <SectionTitle title="Submit a Document" subtitle="Upload a completed compliance document for legal review." />
      <Card className="max-w-2xl p-6 sm:p-8">
        <div className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Document name</label>
            <input
              placeholder="e.g. ISO-27001 Compliance Report"
              className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Compliance subject</label>
            <select className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <option>Information Security Certification</option>
              <option>Data Privacy Compliance</option>
              <option>Anti-Money-Laundering Certification</option>
              <option>Labour Law Compliance</option>
              <option>ESG Compliance</option>
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">File</label>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 px-6 py-10 text-center hover:border-brand-400 dark:border-gray-700 dark:bg-white/[0.02]">
              <UploadCloud className="mb-2 h-10 w-10 text-gray-400" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">{file || "Click to upload your filled document"}</p>
              <p className="mt-1 text-xs text-gray-400">PDF or DOCX — up to 10 MB</p>
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0]?.name || "document.pdf")} />
            </label>
          </div>
          <div className="flex items-center gap-3 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-700">
            <FileText size={18} />
            Don’t have a document yet? <Link to="/company/templates" className="font-medium underline">Download a blank template</Link>.
          </div>
          <div className="flex justify-end gap-3">
            <Btn variant="outline">Cancel</Btn>
            <Btn disabled={!file}>Submit for Review</Btn>
          </div>
        </div>
      </Card>
    </div>
  );
};

const templates = [
  { name: "ISO-27001 Compliance Report", desc: "Information security management certification template.", file: "iso-27001-template.docx" },
  { name: "GDPR Data Processing Agreement", desc: "Standard data-privacy / DPA template.", file: "gdpr-dpa-template.docx" },
  { name: "AML Policy Statement", desc: "Anti-money-laundering policy template.", file: "aml-policy-template.docx" },
  { name: "Employment Contract", desc: "Labour-law compliant employment agreement.", file: "employment-contract-template.docx" },
];

export const Templates: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle title="Document Templates" subtitle="Download a blank Word template, fill it out, then submit for certification." />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {templates.map((t) => (
        <Card key={t.file} className="flex items-start gap-4 p-5">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
            <FileText size={20} />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-800 dark:text-white/90">{t.name}</p>
            <p className="mt-0.5 text-sm text-gray-500">{t.desc}</p>
            <button className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:underline">
              <Download size={15} /> Download .docx
            </button>
          </div>
        </Card>
      ))}
    </div>
  </div>
);
