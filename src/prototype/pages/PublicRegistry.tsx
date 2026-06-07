import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, SectionTitle, DemoBanner } from "../ui";
import DocTable from "../components/DocTable";
import { documents } from "../mockData";

const PublicRegistry: React.FC = () => {
  const [q, setQ] = useState("");
  const issued = documents.filter((d) => d.status === "issued");
  const filtered = issued.filter(
    (d) =>
      d.name.toLowerCase().includes(q.toLowerCase()) ||
      d.company.toLowerCase().includes(q.toLowerCase()) ||
      d.subject.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <DemoBanner />
      <SectionTitle
        title="Public Certificate Registry"
        subtitle="All certified, on-chain compliance documents — publicly verifiable."
        right={
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search registry…"
              className="w-56 rounded-lg border border-gray-200 bg-white py-2 pl-9 pr-3 text-sm text-gray-700 focus:border-brand-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            />
          </div>
        }
      />
      <Card className="p-2">
        <DocTable docs={filtered} />
      </Card>
    </div>
  );
};

export default PublicRegistry;
