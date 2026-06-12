import { CheckCircle2, TrendingUp } from "lucide-react";

import { TASK_LIST_STATS } from "./mockData";

export default function TaskStatsGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="relative overflow-hidden rounded-3xl bg-indigo-700 p-6 text-white">
        <div className="relative z-10">
          <h3 className="mb-2 text-sm font-bold uppercase tracking-wider opacity-80">
            Completion Rate
          </h3>
          <p className="mb-4 text-4xl font-black">
            {TASK_LIST_STATS.completionRate}%
          </p>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-[74%] bg-white" />
          </div>
        </div>

        <CheckCircle2 className="absolute -bottom-4 -right-4 h-32 w-32 opacity-10" />
      </div>

      <div className="rounded-3xl border border-surface-container-low bg-white p-6 shadow-[0px_20px_40px_rgba(21,28,39,0.04)]">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-outline-variant">
          Team Capacity
        </h3>
        <p className="mb-2 text-4xl font-black text-on-surface">
          {TASK_LIST_STATS.teamCapacity}
          <span className="text-lg font-medium text-outline-variant">/100</span>
        </p>
        <p className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp className="h-4 w-4" />
          {TASK_LIST_STATS.teamCapacityDeltaPercent}% increase this week
        </p>
      </div>

      <div className="rounded-3xl border border-surface-container-low bg-white p-6 shadow-[0px_20px_40px_rgba(21,28,39,0.04)]">
        <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-outline-variant">
          Upcoming Deadlines
        </h3>
        <div className="space-y-4">
          {TASK_LIST_STATS.upcomingDeadlines.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm font-bold text-on-surface">
                {item.label}
              </span>
              <span
                className={
                  item.tone === "danger"
                    ? "rounded-lg bg-red-50 px-2 py-1 text-xs font-medium text-red-500"
                    : "rounded-lg bg-surface-container-low px-2 py-1 text-xs font-medium text-outline-variant"
                }
              >
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
