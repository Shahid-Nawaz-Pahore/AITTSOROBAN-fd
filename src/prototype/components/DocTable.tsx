import React from "react";
import { Link } from "react-router";
import { DocItem } from "../mockData";
import { StatusBadge, Mono } from "../ui";

interface Props {
  docs: DocItem[];
  showCompany?: boolean;
  showApprovals?: boolean;
}

const DocTable: React.FC<Props> = ({ docs, showCompany = true, showApprovals = false }) => (
  <div className="overflow-x-auto">
    <table className="w-full min-w-[640px] text-left text-sm">
      <thead>
        <tr className="border-b border-gray-200 text-xs uppercase tracking-wider text-gray-400 dark:border-gray-800">
          <th className="px-4 py-3 font-medium">Document</th>
          {showCompany && <th className="px-4 py-3 font-medium">Company</th>}
          <th className="px-4 py-3 font-medium">Subject</th>
          {showApprovals && <th className="px-4 py-3 font-medium">Approvals</th>}
          <th className="px-4 py-3 font-medium">Status</th>
          <th className="px-4 py-3 font-medium">Submitted</th>
          <th className="px-4 py-3" />
        </tr>
      </thead>
      <tbody>
        {docs.map((d) => (
          <tr
            key={d.id}
            className="border-b border-gray-100 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-white/[0.02]"
          >
            <td className="px-4 py-3.5">
              <p className="font-medium text-gray-800 dark:text-white/90">{d.name}</p>
              <Mono>{d.id}</Mono>
            </td>
            {showCompany && (
              <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">{d.company}</td>
            )}
            <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">{d.subject}</td>
            {showApprovals && (
              <td className="px-4 py-3.5">
                <span className="font-medium text-gray-700 dark:text-gray-200">
                  {d.approvals}/{d.requiredApprovals}
                </span>
              </td>
            )}
            <td className="px-4 py-3.5">
              <StatusBadge status={d.status} />
            </td>
            <td className="px-4 py-3.5 text-gray-500">{d.submittedAt}</td>
            <td className="px-4 py-3.5 text-right">
              <Link to={`/certificate/${d.id}`} className="text-sm font-medium text-brand-500 hover:underline">
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DocTable;
