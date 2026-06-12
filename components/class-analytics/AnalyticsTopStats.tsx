import { CheckSquare, Star, Users, Zap } from "lucide-react";

import type { AnalyticsTopStat, AnalyticsTopStatIconKey } from "./types";

function StatIcon({ icon }: { icon: AnalyticsTopStatIconKey }) {
  const className = "h-5 w-5";

  if (icon === "users") return <Users className={className} />;
  if (icon === "bolt") return <Zap className={className} />;
  if (icon === "star") return <Star className={className} />;
  return <CheckSquare className={className} />;
}

export default function AnalyticsTopStats({
  stats,
}: {
  stats: AnalyticsTopStat[];
}) {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="group rounded-xl bg-white p-6 shadow-[0px_20px_40px_rgba(21,28,39,0.03)] border border-slate-100 transition-all hover:shadow-md"
        >
          <div className="mb-4 flex items-start justify-between">
            <span className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <StatIcon icon={s.icon} />
            </span>

            {s.deltaLabel ? (
              <span className="text-xs font-bold text-green-600">
                {s.deltaLabel}
              </span>
            ) : s.noteLabel ? (
              <span className="text-xs font-bold text-slate-400">
                {s.noteLabel}
              </span>
            ) : null}
          </div>

          <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-500">
            {s.label}
          </p>
          <h3 className="text-3xl font-bold text-slate-800">{s.value}</h3>
        </div>
      ))}
    </section>
  );
}
