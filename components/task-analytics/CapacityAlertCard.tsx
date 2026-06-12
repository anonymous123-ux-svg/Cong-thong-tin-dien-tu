"use client";

import { AlertTriangle } from "lucide-react";

export default function CapacityAlertCard() {
  return (
    <section className="relative flex items-start gap-6 rounded-xl border-2 border-red-500/10 bg-red-500/5 p-8">
      <div className="hidden h-0.5 w-4 bg-red-500/20 lg:absolute lg:-left-4 lg:top-1/2 lg:block lg:-translate-y-1/2" />

      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-red-500 text-white shadow-lg shadow-red-500/20">
        <AlertTriangle className="h-8 w-8" />
      </div>

      <div>
        <h3 className="text-base font-bold text-red-500">Capacity Alert</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-700">
          Review & Publication team is reaching burnout limits. 3 members have
          exceeded 50+ hours this week. Consider reassigning Module B-7 to Data
          Analysis Unit.
        </p>
        <button
          type="button"
          onClick={() => {
            // Template behavior: no-op.
          }}
          className="mt-6 rounded-lg bg-red-500 px-6 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-110"
        >
          REALLOCATE RESOURCES
        </button>
      </div>
    </section>
  );
}
