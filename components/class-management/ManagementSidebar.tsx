import { Brain, Pencil } from "lucide-react";

import type { GradeAlert, ScheduleItem } from "./types";

export default function ManagementSidebar({
  classCapacityLabel,
  capacityHint,
  schedule,
  alerts,
}: {
  classCapacityLabel: string;
  capacityHint: string;
  schedule: ScheduleItem[];
  alerts: GradeAlert[];
}) {
  return (
    <aside className="col-span-12 xl:col-span-3 space-y-6">
      <section className="bg-surface-container-low rounded-2xl p-6">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">
          Management
        </h3>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Class Capacity
            </label>
            <div className="flex items-center justify-between p-3 bg-white rounded-xl">
              <span className="text-sm font-semibold">
                {classCapacityLabel}
              </span>
              <button
                type="button"
                className="text-indigo-600 cursor-pointer hover:opacity-80"
                aria-label="Edit capacity"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </div>
            <p className="text-[10px] text-slate-500 mt-2">{capacityHint}</p>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Weekly Schedule
            </label>
            <div className="space-y-2">
              {schedule.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl"
                >
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                    {item.day}
                  </div>
                  <div>
                    <div className="text-xs font-bold">{item.time}</div>
                    <div className="text-[10px] text-slate-400">
                      {item.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="w-full py-3 border-2 border-indigo-600/20 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-indigo-50 transition-colors"
          >
            Edit Schedule
          </button>
        </div>
      </section>

      <section className="bg-indigo-600 rounded-2xl p-6 text-white overflow-hidden relative">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="h-5 w-5" />
            <span className="text-xs font-bold uppercase">AI Prediction</span>
          </div>
          <p className="text-sm font-medium leading-relaxed mb-4">
            Cohort performance is trending upwards. 3 students need intervention
            on &apos;Schrödinger Equations&apos;.
          </p>
          <button
            type="button"
            className="bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-xs font-bold"
          >
            Generate Study Plan
          </button>
        </div>

        <div className="absolute -right-10 -bottom-10 opacity-10">
          <Brain className="h-40 w-40" />
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
          Recent Grade Alerts
        </h3>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex gap-4">
              <div
                className={
                  alert.tone === "error"
                    ? "w-2 h-2 rounded-full bg-error mt-1.5 shrink-0"
                    : "w-2 h-2 rounded-full bg-secondary mt-1.5 shrink-0"
                }
              />
              <div>
                <p className="text-xs font-bold text-on-background">
                  {alert.title}
                </p>
                <p className="text-[10px] text-slate-500">{alert.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}
