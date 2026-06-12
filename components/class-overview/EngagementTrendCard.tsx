"use client";

import { useMemo, useState } from "react";

type RangeKey = "weekly" | "monthly";

const WEEKLY = [60, 85, 45, 75, 92, 68, 50];
const MONTHLY = [55, 70, 62, 78, 88, 74, 66];

const heightClassMap: Record<number, string> = {
  45: "h-[45%]",
  50: "h-[50%]",
  55: "h-[55%]",
  60: "h-[60%]",
  62: "h-[62%]",
  66: "h-[66%]",
  68: "h-[68%]",
  70: "h-[70%]",
  74: "h-[74%]",
  75: "h-[75%]",
  78: "h-[78%]",
  85: "h-[85%]",
  88: "h-[88%]",
  92: "h-[92%]",
};

function heightClassName(value: number) {
  return heightClassMap[value] ?? "h-[50%]";
}

export default function EngagementTrendCard() {
  const [range, setRange] = useState<RangeKey>("weekly");

  const data = useMemo(() => {
    return range === "weekly" ? WEEKLY : MONTHLY;
  }, [range]);

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Class Engagement Trend
          </h3>
          <p className="text-sm text-slate-500">
            Real-time participation monitoring
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setRange("weekly")}
            className={
              range === "weekly"
                ? "cursor-pointer rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200"
                : "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            }
          >
            Weekly
          </button>
          <button
            type="button"
            onClick={() => setRange("monthly")}
            className={
              range === "monthly"
                ? "cursor-pointer rounded-full bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-200"
                : "cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            }
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="relative flex h-62.5 w-full items-end justify-between gap-2 px-2">
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-0 w-full border-b border-slate-100" />
          ))}
        </div>

        {data.map((value, idx) => {
          const isToday = idx === 5;
          const heightClass = heightClassName(value);

          return (
            <div
              key={idx}
              className={
                isToday
                  ? `relative w-12 rounded-t-xl bg-indigo-600 ${heightClass}`
                  : value >= 80
                    ? `w-12 rounded-t-xl bg-indigo-200 ${heightClass}`
                    : value >= 70
                      ? `w-12 rounded-t-xl bg-indigo-300/60 ${heightClass}`
                      : value >= 50
                        ? `w-12 rounded-t-xl bg-indigo-100 ${heightClass}`
                        : `w-12 rounded-t-xl bg-indigo-50 ${heightClass}`
              }
            >
              {isToday && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white">
                  Today
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex justify-between px-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </section>
  );
}
