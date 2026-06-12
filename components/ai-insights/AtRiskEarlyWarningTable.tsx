import Image from "next/image";

import type { AtRiskStudent } from "./types";

type AtRiskEarlyWarningTableProps = {
  title: string;
  subtitle: string;
  highAlertCount: number;
  monitoringCount: number;
  students: AtRiskStudent[];
};

function toneBarClass(tone: AtRiskStudent["engagementTone"]) {
  return tone === "critical" ? "bg-red-500" : "bg-amber-500";
}

function toneLabelClass(tone: AtRiskStudent["engagementTone"]) {
  return tone === "critical" ? "text-red-500" : "text-amber-500";
}

function tagClasses(tone: "danger" | "neutral" | "warn") {
  if (tone === "danger") return "bg-red-100 text-red-700";
  if (tone === "warn") return "bg-amber-100 text-amber-700";
  return "bg-gray-100 text-gray-600";
}

export default function AtRiskEarlyWarningTable({
  title,
  subtitle,
  highAlertCount,
  monitoringCount,
  students,
}: AtRiskEarlyWarningTableProps) {
  return (
    <section className="col-span-12 rounded-3xl bg-white p-8 shadow-sm">
      <div className="mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>

        <div className="flex gap-4">
          <div className="px-4 text-center">
            <span className="block text-2xl font-bold text-red-500">
              {String(highAlertCount).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              High Alert
            </span>
          </div>
          <div className="border-l border-gray-200 px-4 text-center">
            <span className="block text-2xl font-bold text-amber-500">
              {monitoringCount}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Monitoring
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left">
          <thead>
            <tr className="bg-gray-50 text-[11px] font-bold uppercase tracking-widest text-gray-400">
              <th className="rounded-l-xl px-6 py-4">Student Name</th>
              <th className="px-6 py-4">Engagement Index</th>
              <th className="px-6 py-4">AI Reasonings</th>
              <th className="px-6 py-4">Current Grade</th>
              <th className="rounded-r-xl px-6 py-4">Recommended Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map((s) => (
              <tr key={s.studentId}>
                <td className="px-6 py-6">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 overflow-hidden rounded-full">
                      <Image
                        src={s.avatarUrl}
                        alt={`${s.name} profile`}
                        width={40}
                        height={40}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {s.name}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        ID: {s.studentId}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 min-w-[100px] flex-1 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full ${toneBarClass(s.engagementTone)}`}
                        style={{ width: `${s.engagementPercent}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold ${toneLabelClass(s.engagementTone)}`}
                    >
                      {s.engagementTone === "critical" ? "Critical" : "Warning"}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-6">
                  <div className="flex flex-wrap gap-2">
                    {s.reasoningTags.map((t) => (
                      <span
                        key={t.label}
                        className={`rounded-lg px-2 py-1 text-[10px] font-semibold ${tagClasses(t.tone)}`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-6 py-6">
                  <span className="text-sm font-bold text-gray-900">
                    {s.currentGradePercent.toFixed(1)}%
                  </span>
                </td>

                <td className="px-6 py-6">
                  <button
                    type="button"
                    className="cursor-pointer rounded-full border border-indigo-600 px-4 py-2 text-xs font-bold text-indigo-600 transition-all hover:bg-indigo-600 hover:text-white"
                  >
                    {s.actionLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
