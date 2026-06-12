import { AlertTriangle } from "lucide-react";

import type { AtRiskStudent } from "./types";

function toneBadgeClassName(tone: AtRiskStudent["tone"]) {
  if (tone === "critical") return "bg-red-500 text-white";
  if (tone === "high") return "bg-orange-500 text-white";
  return "bg-slate-400 text-white";
}

function toneInitialsClassName(tone: AtRiskStudent["tone"]) {
  if (tone === "critical") return "bg-red-100 text-red-600";
  if (tone === "high") return "bg-indigo-100 text-indigo-600";
  return "bg-slate-200 text-slate-600";
}

type AtRiskStudentsCardProps = {
  students: AtRiskStudent[];
};

export default function AtRiskStudentsCard({
  students,
}: AtRiskStudentsCardProps) {
  return (
    <section className="w-full rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">At-Risk Students</h3>
          <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
            Intervention Required
          </p>
        </div>
        <AlertTriangle className="h-5 w-5 text-red-500" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${toneInitialsClassName(student.tone)}`}
            >
              {student.initials}
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center justify-between gap-3">
                <p className="truncate text-sm font-bold text-slate-900">
                  {student.name}
                </p>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold ${toneBadgeClassName(student.tone)}`}
                >
                  {student.tone.toUpperCase()}
                </span>
              </div>
              <p className="truncate text-[10px] italic text-slate-500">
                {student.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-6 w-full cursor-pointer rounded-2xl border border-indigo-200 py-3 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-50"
      >
        Manage All Interventions
      </button>
    </section>
  );
}
