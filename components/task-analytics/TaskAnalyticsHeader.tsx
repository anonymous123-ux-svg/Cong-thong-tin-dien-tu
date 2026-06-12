"use client";

import { CalendarRange, ChevronDown, Download } from "lucide-react";

import { useTaskAnalytics } from "./TaskAnalyticsProvider";
import type { AnalyticsDateRange } from "./types";

const OPTIONS: AnalyticsDateRange[] = [
  "Last 7 Days",
  "Last 30 Days",
  "Last 90 Days",
];

export default function TaskAnalyticsHeader() {
  const { range, setRange } = useTaskAnalytics();

  return (
    <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Analytics & Performance
        </h1>
        <p className="mt-1 max-w-lg text-[13px] text-slate-500">
          Real-time analysis of project progress, workload, and AI predictions
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <CalendarRange className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <select
            value={range}
            onChange={(e) => setRange(e.target.value as AnalyticsDateRange)}
            aria-label="Date range"
            className="h-10 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white pl-10 pr-10 text-[13px] font-medium text-slate-700 outline-none transition hover:bg-slate-50 focus:ring-2 focus:ring-[#2D2DE8]/20"
          >
            {OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>

        <button
          type="button"
          onClick={() => {
            // Template behavior: no-op.
          }}
          className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <Download className="h-4 w-4" />
          Export PDF
        </button>
      </div>
    </header>
  );
}
