import React from "react";
import { Award, Clock, Building2, Scale, Plus, Check, FileText, Vote } from "lucide-react";
import { Card, SectionTitle, DemoBanner, Btn, StatCard } from "../ui";
import DocTable from "../components/DocTable";
import { documents, companies, experts, proposals, adminStats } from "../mockData";

export const AdminDashboard: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle title="Admin Dashboard" subtitle="Overview of the compliance certification platform." />

    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard label="Certificates Issued" value={adminStats.totalCertificates} icon={<Award size={20} />} accent="bg-success-50 text-success-500" />
      <StatCard label="Pending Review" value={adminStats.pendingReview} icon={<Clock size={20} />} accent="bg-warning-50 text-warning-500" />
      <StatCard label="Active Companies" value={adminStats.activeCompanies} icon={<Building2 size={20} />} />
      <StatCard label="Legal Experts" value={adminStats.legalExperts} icon={<Scale size={20} />} accent="bg-theme-purple-500/10 text-theme-purple-500" />
    </div>

    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="p-5 lg:col-span-2">
        <SectionTitle title="Recent Documents" />
        <DocTable docs={documents.slice(0, 5)} showApprovals />
      </Card>

      <Card className="p-5">
        <SectionTitle title="Pending Governance" />
        <div className="space-y-3">
          {proposals.filter((p) => p.status === "pending").map((p) => (
            <div key={p.id} className="rounded-lg border border-gray-200 p-3 dark:border-gray-800">
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">{p.action}</p>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-gray-400">{p.approvals}/{p.required} approvals</span>
                <Btn variant="outline" className="px-3 py-1 text-xs">Approve</Btn>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export const AdminDocuments: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle title="All Documents" subtitle="Every submission across all companies." />
    <Card className="p-2">
      <DocTable docs={documents} showApprovals />
    </Card>
  </div>
);

export const AdminCompanies: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle
      title="Companies"
      subtitle="Manage company accounts and onboarding."
      right={<Btn><Plus size={16} /> Add Company</Btn>}
    />
    <Card className="p-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Documents</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3.5 font-medium text-gray-800 dark:text-white/90">{c.name}</td>
                <td className="px-4 py-3.5 text-gray-500">{c.email}</td>
                <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">{c.documents}</td>
                <td className="px-4 py-3.5">
                  {c.status === "active" ? (
                    <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700">Active</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700">Pending approval</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-right">
                  {c.status === "pending" ? (
                    <Btn variant="success" className="px-3 py-1 text-xs"><Check size={14} /> Approve</Btn>
                  ) : (
                    <button className="text-sm text-gray-400 hover:text-gray-600">Manage</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);

export const AdminExperts: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle
      title="Legal Experts (Sub-Admins)"
      subtitle="Validated lawyers who review and approve certifications."
      right={<Btn><Plus size={16} /> Invite Expert</Btn>}
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {experts.map((e) => (
        <Card key={e.id} className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-lg font-semibold text-brand-500">
              {e.name.split(" ").slice(-1)[0][0]}
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white/90">{e.name}</p>
              <p className="text-xs text-gray-500">{e.email}</p>
            </div>
          </div>
          <div className="mt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-gray-400">Wallet</span><span className="font-mono text-xs text-gray-600 dark:text-gray-300">{e.wallet}</span></div>
            <div className="flex justify-between"><span className="text-gray-400">Reviews</span><span className="text-gray-600 dark:text-gray-300">{e.reviewsDone}</span></div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              {e.status === "active" ? (
                <span className="text-success-600">Active</span>
              ) : (
                <span className="text-warning-600">Invited</span>
              )}
            </div>
          </div>
          <Btn variant="outline" className="mt-4 w-full text-xs">Manage</Btn>
        </Card>
      ))}
    </div>
  </div>
);

const TYPE_LABEL: Record<string, { label: string; icon: React.ReactNode }> = {
  issuance: { label: "Certificate Issuance", icon: <FileText size={15} /> },
  whitelist: { label: "Company Whitelisting", icon: <Building2 size={15} /> },
  config: { label: "Contract Config", icon: <Vote size={15} /> },
  admin: { label: "Admin Control", icon: <Scale size={15} /> },
};

export const AdminGovernance: React.FC = () => (
  <div>
    <DemoBanner />
    <SectionTitle title="Governance" subtitle="Multi-signature approvals for sensitive on-chain actions." />
    <Card className="p-2">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
              <th className="px-4 py-3 font-medium">Proposal</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Approvals</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {proposals.map((p) => (
              <tr key={p.id} className="border-b border-gray-100 dark:border-gray-800">
                <td className="px-4 py-3.5">
                  <p className="font-medium text-gray-800 dark:text-white/90">{p.action}</p>
                  <span className="font-mono text-xs text-gray-400">{p.id}</span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="inline-flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                    {TYPE_LABEL[p.type].icon} {TYPE_LABEL[p.type].label}
                  </span>
                </td>
                <td className="px-4 py-3.5">
                  <span className="font-medium text-gray-700 dark:text-gray-200">{p.approvals}/{p.required}</span>
                </td>
                <td className="px-4 py-3.5">
                  {p.status === "executed" ? (
                    <span className="inline-flex items-center rounded-full bg-success-50 px-2.5 py-1 text-xs font-medium text-success-700">Executed</span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-warning-50 px-2.5 py-1 text-xs font-medium text-warning-700">Pending</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-right">
                  {p.status === "pending" && <Btn variant="outline" className="px-3 py-1 text-xs">Approve</Btn>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  </div>
);
