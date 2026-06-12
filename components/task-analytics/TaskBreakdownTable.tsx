import Image from "next/image";

import { BREAKDOWN_ROWS } from "./mockData";
import type { AnalyticsBreakdownRow } from "./types";

function StatusBadge({ status }: { status: AnalyticsBreakdownRow["status"] }) {
  if (status === "Completed") {
    return (
      <span className="rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-bold text-white">
        Completed
      </span>
    );
  }
  if (status === "In Progress") {
    return (
      <span className="rounded-full bg-[#2D2DE8] px-3 py-1 text-[11px] font-bold text-white">
        In Progress
      </span>
    );
  }
  return (
    <span className="rounded-full bg-slate-500 px-3 py-1 text-[11px] font-bold text-white">
      Paused
    </span>
  );
}

function ComplexityDots({ value }: { value: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-1.5">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={
            i <= value
              ? "h-2.5 w-2.5 rounded-full bg-[#2D2DE8]"
              : "h-2.5 w-2.5 rounded-full bg-slate-200"
          }
        />
      ))}
    </div>
  );
}

function TrendBars({ tone }: { tone: AnalyticsBreakdownRow["trendTone"] }) {
  const barClass =
    tone === "success"
      ? "bg-emerald-500"
      : tone === "danger"
        ? "bg-red-500"
        : "bg-[#2D2DE8]";

  return (
    <div className="flex h-4 justify-end gap-1">
      {[
        "opacity-30",
        "opacity-50",
        "opacity-100",
        "opacity-80",
        "opacity-90",
      ].map((opacityClass, idx) => (
        <div key={idx} className={`h-full w-1 ${barClass} ${opacityClass}`} />
      ))}
    </div>
  );
}

export default function TaskBreakdownTable() {
  return (
    <section className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-50 p-6">
        <h3 className="text-base font-bold">Task & Module Breakdown</h3>
        <p className="mt-1 text-xs text-slate-500">
          Detailed performance metrics per project task
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-xs font-bold tracking-wider text-slate-500 uppercase">
            <tr>
              <th className="px-6 py-4">Task Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Time Spent</th>
              <th className="px-6 py-4">Complexity</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4 text-right">Trend</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {BREAKDOWN_ROWS.map((row, idx) => (
              <tr
                key={row.id}
                className={
                  idx === 1
                    ? "bg-slate-50/30 transition-colors hover:bg-slate-50"
                    : "transition-colors hover:bg-slate-50"
                }
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-[13px] font-bold text-slate-900">
                      {row.title}
                    </span>
                    <span className="text-xs text-slate-500">
                      {row.subtitle}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <StatusBadge status={row.status} />
                </td>

                <td className="px-6 py-4 text-[13px] text-slate-700">
                  {row.timeSpent}
                </td>

                <td className="px-6 py-4">
                  <ComplexityDots value={row.complexity} />
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Image
                      src={row.owner.avatarUrl}
                      alt={row.owner.name}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="text-[13px] text-slate-700">
                      {row.owner.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 text-right">
                  <TrendBars tone={row.trendTone} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
