import React, { useState } from "react";
import { CheckCircle2, RotateCcw, XCircle, Wallet, FileText } from "lucide-react";
import { Card, SectionTitle, DemoBanner, Btn, StatusBadge, Rating, Mono } from "../ui";
import { documents, DocItem } from "../mockData";

const queue = documents.filter((d) =>
  ["submitted", "under_review", "needs_revision"].includes(d.status)
);

export const ReviewQueue: React.FC = () => {
  const [selected, setSelected] = useState<DocItem | null>(queue[0] || null);
  const [rating, setRating] = useState(0);

  return (
    <div>
      <DemoBanner />
      <SectionTitle
        title="Review Queue"
        subtitle="Documents awaiting your legal review."
        right={
          <span className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-3 py-2 text-sm text-white">
            <Wallet size={15} /> Wallet connected
          </span>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Queue list */}
        <div className="space-y-3 lg:col-span-2">
          {queue.map((d) => (
            <button
              key={d.id}
              onClick={() => { setSelected(d); setRating(0); }}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selected?.id === d.id
                  ? "border-brand-400 bg-brand-50/40 dark:bg-brand-500/5"
                  : "border-gray-200 bg-white hover:border-gray-300 dark:border-gray-800 dark:bg-white/[0.02]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 dark:text-white/90">{d.name}</span>
                <StatusBadge status={d.status} />
              </div>
              <p className="mt-1 text-sm text-gray-500">{d.company} · {d.subject}</p>
              <p className="mt-2 text-xs text-gray-400">{d.approvals}/{d.requiredApprovals} approvals · submitted {d.submittedAt}</p>
            </button>
          ))}
        </div>

        {/* Review panel */}
        <div className="lg:col-span-3">
          {selected ? (
            <Card className="p-6">
              <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-gray-800">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-500">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white/90">{selected.name}</p>
                  <Mono>{selected.id} · {selected.hash.slice(0, 24)}…</Mono>
                </div>
              </div>

              {/* Existing reviews */}
              {selected.reviews.length > 0 && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">Previous reviews</p>
                  {selected.reviews.filter((r) => r.decision !== "pending").map((r, i) => (
                    <div key={i} className="rounded-lg bg-gray-50 p-3 text-sm dark:bg-white/[0.02]">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-700 dark:text-gray-200">{r.expert}</span>
                        <Rating value={r.rating} />
                      </div>
                      <p className="mt-1 text-gray-500">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Your review */}
              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Your assessment</p>
                <div className="mb-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className={`text-2xl ${n <= rating ? "text-warning-400" : "text-gray-300 dark:text-gray-600"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <textarea
                  rows={3}
                  placeholder="Add your legal assessment / comments…"
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-brand-400 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
                />
                <div className="mt-4 flex flex-wrap gap-3">
                  <Btn variant="success"><CheckCircle2 size={16} /> Approve</Btn>
                  <Btn variant="outline"><RotateCcw size={16} /> Needs Revision</Btn>
                  <Btn variant="danger"><XCircle size={16} /> Reject</Btn>
                </div>
                <p className="mt-3 text-xs text-gray-400">
                  Approving will record your signature on-chain. {selected.requiredApprovals} approvals required before issuance.
                </p>
              </div>
            </Card>
          ) : (
            <Card className="p-10 text-center text-gray-400">No documents in the queue.</Card>
          )}
        </div>
      </div>
    </div>
  );
};

export const ReviewHistory: React.FC = () => {
  const reviewed = documents.filter((d) => d.reviews.some((r) => r.expert === "Adv. Sara Khan" && r.decision !== "pending"));
  return (
    <div>
      <DemoBanner />
      <SectionTitle title="My Reviews" subtitle="Documents you have reviewed." />
      <div className="space-y-3">
        {reviewed.map((d) => {
          const mine = d.reviews.find((r) => r.expert === "Adv. Sara Khan")!;
          return (
            <Card key={d.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-medium text-gray-800 dark:text-white/90">{d.name}</p>
                <p className="text-sm text-gray-500">{d.company} · reviewed {mine.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <Rating value={mine.rating} />
                <StatusBadge status={d.status} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
