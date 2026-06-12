import { AlertTriangle } from "lucide-react";

import type { ClassListStatsData } from "./types";

export default function ClassListStats({ data }: { data: ClassListStatsData }) {
  return (
    <section className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
      <div className="rounded-[20px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Total Members
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {data.totalMembers.value}
          </span>
          <span className="text-xs font-bold text-green-500">
            {data.totalMembers.deltaLabel}
          </span>
        </div>
      </div>

      <div className="rounded-[20px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Active Now
        </p>
        <div className="flex items-center gap-3">
          <span className="text-4xl font-bold text-gray-900">
            {data.activeNow}
          </span>
          <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
        </div>
      </div>

      <div className="rounded-[20px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Avg Progress
        </p>
        <div className="flex items-end gap-3">
          <span className="text-4xl font-bold text-gray-900">
            {data.avgProgressPct}%
          </span>
          <div className="flex h-8 items-end gap-1 pb-1" aria-hidden="true">
            <div className="h-2 w-1 rounded-full bg-indigo-200" />
            <div className="h-4 w-1 rounded-full bg-indigo-300" />
            <div className="h-3 w-1 rounded-full bg-indigo-400" />
            <div className="h-5 w-1 rounded-full bg-indigo-500" />
            <div className="h-6 w-1 rounded-full bg-indigo-600" />
          </div>
        </div>
      </div>

      <div className="rounded-[20px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          Completion Rate
        </p>
        <span className="text-4xl font-bold text-gray-900">
          {data.completionRatePct}%
        </span>
      </div>

      <div className="rounded-[20px] bg-white p-6 shadow-sm transition-all hover:shadow-md">
        <p className="mb-4 text-[11px] font-bold uppercase tracking-widest text-gray-500">
          At-Risk
        </p>
        <div className="flex items-center justify-between">
          <span className="text-4xl font-bold text-gray-900">
            {data.atRisk}
          </span>
          <AlertTriangle className="h-6 w-6 text-red-500" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
