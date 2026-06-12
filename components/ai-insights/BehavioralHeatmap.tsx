"use client";

import { useMemo, useState } from "react";

type BehavioralHeatmapProps = {
  periodLabel: string;
  days: string[];
  grid: number[][];
};

const INTENSITY_CLASSES = [
  "bg-indigo-50",
  "bg-indigo-100",
  "bg-indigo-200",
  "bg-indigo-400",
  "bg-indigo-700",
] as const;

export default function BehavioralHeatmap({
  periodLabel,
  days,
  grid,
}: BehavioralHeatmapProps) {
  const [period, setPeriod] = useState(periodLabel);

  const rows = useMemo(() => grid.slice(0, 5), [grid]);

  return (
    <section className="col-span-12 rounded-3xl bg-white p-8 shadow-sm lg:col-span-7">
      <div className="mb-8 flex items-center justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Behavioral Heatmap
          </h2>
          <p className="text-sm text-gray-500">
            Student interaction density across content modules
          </p>
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-xs font-bold text-gray-700 outline-none"
          aria-label="Heatmap period"
        >
          <option value={periodLabel}>{periodLabel}</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-7 gap-3">
        {days.map((day, col) => (
          <div key={day} className="space-y-3">
            {rows.map((row, rowIndex) => {
              const intensity = Math.max(0, Math.min(4, row[col] ?? 0)) as
                | 0
                | 1
                | 2
                | 3
                | 4;
              return (
                <div
                  key={`${day}-${rowIndex}`}
                  className={`h-10 w-full rounded-lg ${INTENSITY_CLASSES[intensity]}`}
                />
              );
            })}
            <span className="block text-center text-[9px] font-bold uppercase text-gray-400">
              {day}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
