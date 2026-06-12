"use client";

import { useMemo, useState } from "react";

import Card from "@/components/ui/Card";

import type { TrendMode, TrendPoint, WorkloadByPriority } from "./types";

type Props = {
  weekly: TrendPoint[];
  monthly: TrendPoint[];
  workload: WorkloadByPriority[];
};

function workloadBarClassName(priority: WorkloadByPriority["priority"]) {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-indigo-700";
    case "low":
    default:
      return "bg-emerald-500";
  }
}

export default function TaskCompletionTrendCard({
  weekly,
  monthly,
  workload,
}: Props) {
  const [mode, setMode] = useState<TrendMode>("weekly");

  const points = useMemo(
    () => (mode === "weekly" ? weekly : monthly),
    [mode, weekly, monthly],
  );

  return (
    <Card className="p-8">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">
          Task Completion Trend
        </h2>

        <div className="flex rounded-full border border-slate-100 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setMode("weekly")}
            className={
              mode === "weekly"
                ? "rounded-full bg-white px-5 py-1.5 text-[11px] font-bold text-indigo-700 shadow-sm"
                : "rounded-full px-5 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600"
            }
          >
            WEEKLY
          </button>
          <button
            type="button"
            onClick={() => setMode("monthly")}
            className={
              mode === "monthly"
                ? "rounded-full bg-white px-5 py-1.5 text-[11px] font-bold text-indigo-700 shadow-sm"
                : "rounded-full px-5 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-600"
            }
          >
            MONTHLY
          </button>
        </div>
      </div>

      <div className="mb-12 flex h-64 w-full items-end justify-between gap-4 px-2">
        {points.map((point) => (
          <div
            key={point.label}
            className={
              point.highlight
                ? `${point.heightClassName} w-full rounded-t-lg bg-indigo-700 shadow-lg shadow-indigo-700/20`
                : `${point.heightClassName} w-full rounded-t-lg bg-indigo-50 transition hover:bg-indigo-100`
            }
            aria-label={`${point.label}: ${point.percent}%`}
            title={`${point.label}: ${point.percent}%`}
          />
        ))}
      </div>

      <div className="mb-10 flex justify-between px-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        {points.map((point) => (
          <span key={point.label}>{point.label}</span>
        ))}
      </div>

      <div className="border-t border-slate-50 pt-8">
        <h3 className="mb-6 text-sm font-bold text-slate-900">
          Workload by Priority
        </h3>

        <div className="space-y-5">
          {workload.map((row) => (
            <div key={row.priority} className="flex items-center gap-4">
              <span className="w-24 text-[11px] font-bold uppercase text-slate-400">
                {row.label}
              </span>

              <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-50">
                <div
                  className={`h-full rounded-full ${workloadBarClassName(
                    row.priority,
                  )} ${row.widthClassName}`}
                />
              </div>

              <span className="w-16 text-right text-xs font-bold text-slate-700">
                {row.countLabel}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
