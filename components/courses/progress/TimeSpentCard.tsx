import { Clock } from "lucide-react";

import type { TimeSpent } from "./types";

type Props = {
  timeSpent: TimeSpent;
};

export default function TimeSpentCard({ timeSpent }: Props) {
  return (
    <section className="flex h-full flex-col justify-between rounded-xl bg-linear-to-tr from-indigo-900 to-indigo-600 p-8 text-white shadow-sm">
      <div className="flex items-start justify-between">
        <Clock className="h-8 w-8 opacity-80" aria-hidden="true" />
      </div>

      <div className="mt-10">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-indigo-100/90">
          TOTAL TIME SPENT
        </p>
        <p className="mt-2 text-5xl font-bold tracking-tight">
          {timeSpent.totalHours}
          <span className="ml-1 text-lg font-normal opacity-80">hrs</span>
        </p>
      </div>

      <div className="mt-6 border-t border-white/15 pt-4">
        <p className="text-sm text-indigo-100">
          +{timeSpent.deltaHoursThisWeek} hrs this week
        </p>
      </div>
    </section>
  );
}
