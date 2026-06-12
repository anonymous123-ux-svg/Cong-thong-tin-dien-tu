import { Award } from "lucide-react";

import type { ContributionSummary } from "./types";

type Props = {
  summary: ContributionSummary;
};

export default function ContributionCard({ summary }: Props) {
  return (
    <section className="relative overflow-hidden rounded-xl bg-linear-to-br from-indigo-600 to-indigo-500 p-6 text-white shadow-sm">
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

      <h2 className="mb-6 text-base font-semibold">Your Contribution</h2>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-100">
            Posts
          </p>
          <p className="text-3xl font-light">{summary.posts}</p>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-indigo-100">
            Replies
          </p>
          <p className="text-3xl font-light">{summary.replies}</p>
        </div>

        <div className="col-span-2 mt-2 border-t border-white/20 pt-4">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-indigo-100">
            Reputation
          </p>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-emerald-200" aria-hidden="true" />
            <p className="text-lg font-medium">{summary.reputationLabel}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
