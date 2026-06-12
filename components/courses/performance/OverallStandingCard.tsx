import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import type { PerformanceSummary } from "./types";

type Props = {
  summary: PerformanceSummary;
};

export default function OverallStandingCard({ summary }: Props) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
        Overall Standing
      </h3>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-5xl font-bold tracking-tight text-indigo-700">
          {summary.standingPercent}%
        </span>
        <span className="flex items-center gap-1 text-sm font-medium text-emerald-700">
          <ArrowUp className="h-4 w-4" aria-hidden="true" />+
          {summary.standingDeltaThisWeek}% this week
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {summary.metrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-2 flex justify-between text-xs">
              <span className="text-slate-700">{metric.label}</span>
              <span className="font-medium text-slate-900">
                {metric.valueLabel}
              </span>
            </div>

            <progress
              value={metric.percent}
              max={100}
              aria-label={`${metric.label} ${metric.percent}%`}
              className={cn(
                "h-1.5 w-full overflow-hidden rounded-full bg-slate-100",
                "[&::-webkit-progress-bar]:bg-slate-100",
                "[&::-webkit-progress-value]:rounded-full",
                "[&::-moz-progress-bar]:rounded-full",
                metric.tone === "secondary"
                  ? "[&::-webkit-progress-value]:bg-emerald-600 [&::-moz-progress-bar]:bg-emerald-600"
                  : "[&::-webkit-progress-value]:bg-indigo-600 [&::-moz-progress-bar]:bg-indigo-600",
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
