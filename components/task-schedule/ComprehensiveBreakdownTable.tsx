"use client";

import Image from "next/image";
import { Filter } from "lucide-react";

import { BREAKDOWN_ROWS } from "./mockData";
import type { BreakdownRow } from "./types";

const WIDTH_CLASS: Record<number, string> = {
  30: "w-[30%]",
  65: "w-[65%]",
  100: "w-[100%]",
};

function StatusBadge({ status }: { status: BreakdownRow["status"] }) {
  if (status === "Complete") {
    return (
      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 uppercase">
        Complete
      </span>
    );
  }
  if (status === "In Review") {
    return (
      <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-bold text-amber-700 uppercase">
        In Review
      </span>
    );
  }
  return (
    <span className="rounded-full bg-indigo-100 px-2 py-1 text-[10px] font-bold text-indigo-700 uppercase">
      Active
    </span>
  );
}

function PriorityBadge({
  label,
  tone,
}: {
  label: string;
  tone: BreakdownRow["priorityTone"];
}) {
  if (tone === "danger") {
    return (
      <span className="rounded bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 uppercase">
        {label}
      </span>
    );
  }
  if (tone === "tertiary") {
    return (
      <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase">
        {label}
      </span>
    );
  }
  return (
    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-500 uppercase">
      {label}
    </span>
  );
}

function ProgressBar({
  percent,
  tone,
}: {
  percent: number;
  tone: BreakdownRow["progressTone"];
}) {
  const widthClass = WIDTH_CLASS[percent] ?? "w-full";
  const toneClass =
    tone === "success"
      ? "bg-emerald-500"
      : tone === "tertiary"
        ? "bg-amber-700"
        : "bg-indigo-700";

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full ${toneClass} ${widthClass}`} />
    </div>
  );
}

export default function ComprehensiveBreakdownTable() {
  return (
    <section className="mb-8 overflow-hidden rounded-3xl border border-slate-200/40 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 p-6">
        <h3 className="text-lg font-bold text-slate-900">
          Comprehensive Task Breakdown
        </h3>
        <button
          type="button"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 transition hover:underline"
        >
          <Filter className="h-4 w-4" />
          Filter View
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/70">
              <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Task Name
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Module
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Status
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Assignee
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Dates
              </th>
              <th className="px-6 py-4 text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Progress
              </th>
              <th className="px-6 py-4 text-right text-[10px] font-black tracking-wider text-slate-500 uppercase">
                Priority
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {BREAKDOWN_ROWS.map((row) => (
              <tr
                key={row.id}
                className="transition-colors hover:bg-slate-50/60"
              >
                <td className="px-6 py-4 text-sm font-bold text-slate-900">
                  {row.taskName}
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-500">
                  {row.module}
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={row.status} />
                </td>
                <td className="px-6 py-4">
                  <Image
                    src={row.assigneeAvatarUrl}
                    alt={row.taskName}
                    width={28}
                    height={28}
                    className="h-7 w-7 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 text-xs font-medium text-slate-500">
                  {row.dates}
                </td>
                <td className="px-6 py-4 w-40">
                  <ProgressBar
                    percent={row.progressPercent}
                    tone={row.progressTone}
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <PriorityBadge label={row.priority} tone={row.priorityTone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
