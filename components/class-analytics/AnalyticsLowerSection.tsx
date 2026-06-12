import Image from "next/image";
import {
  AlertTriangle,
  Award,
  GraduationCap,
  Minus,
  Rocket,
  TrendingUp,
  Trophy,
} from "lucide-react";

import type {
  AnalyticsLower,
  AtRiskSeverity,
  PerformerBadgeIconKey,
  PerformerTrend,
} from "./types";

function severityClassName(severity: AtRiskSeverity) {
  return severity === "CRITICAL"
    ? "bg-red-100 text-red-600"
    : "bg-amber-100 text-amber-600";
}

function BadgeIcon({ icon }: { icon: PerformerBadgeIconKey }) {
  const className = "h-4 w-4 text-indigo-400";

  if (icon === "award") return <Award className={className} />;
  if (icon === "rocket") return <Rocket className={className} />;
  if (icon === "school") return <GraduationCap className={className} />;
  return <Trophy className={className} />;
}

function TrendIcon({ trend }: { trend: PerformerTrend }) {
  if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-500" />;
  return <Minus className="h-4 w-4 text-slate-300" aria-hidden="true" />;
}

export default function AnalyticsLowerSection({
  lower,
}: {
  lower: AnalyticsLower;
}) {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <div className="rounded-xl bg-slate-50 p-8">
        <div className="mb-6 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-red-500" aria-hidden="true" />
          <h4 className="text-xl font-bold text-slate-800">
            At-Risk Early Warning
          </h4>
        </div>

        <div className="space-y-4">
          {lower.atRisk.items.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-4 rounded-xl bg-white p-4 border border-slate-100"
            >
              <Image
                src={item.avatarUrl}
                alt={`${item.name} profile`}
                width={48}
                height={48}
                className="h-12 w-12 rounded-lg object-cover"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <h5 className="font-bold text-slate-800">{item.name}</h5>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${severityClassName(item.severity)}`}
                  >
                    {item.severity}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{item.insight}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="mt-6 w-full rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-bold text-slate-400 transition-colors hover:bg-white"
        >
          {lower.atRisk.footerLabel}
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white p-8 shadow-[0px_20px_40px_rgba(21,28,39,0.03)] border border-slate-100">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h4 className="text-xl font-bold text-slate-800">Top Performers</h4>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase tracking-widest text-green-700">
            {lower.topPerformers.badgeLabel}
          </span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                <th className="rounded-l-lg px-4 py-3">Student</th>
                <th className="px-4 py-3">Mastery</th>
                <th className="px-4 py-3">Badges</th>
                <th className="rounded-r-lg px-4 py-3">Trend</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {lower.topPerformers.items.map((p) => (
                <tr key={p.name}>
                  <td className="flex items-center gap-3 px-4 py-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-600">
                      {p.initials}
                    </div>
                    <span className="text-sm font-semibold">{p.name}</span>
                  </td>
                  <td className="px-4 py-4 text-sm font-bold text-indigo-600">
                    {p.masteryLabel}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-1">
                      {p.badges.map((b, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={idx} aria-hidden="true">
                          <BadgeIcon icon={b.icon} />
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <TrendIcon trend={p.trend} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
