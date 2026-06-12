import {
  BellRing,
  TrendingUp,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import type { StatCard, StatIconKey, StatTone } from "./types";

const iconMap: Record<StatIconKey, LucideIcon> = {
  students: Users,
  attendance: UserCheck,
  performance: TrendingUp,
  alerts: BellRing,
};

function badgeClassName(tone: StatTone) {
  if (tone === "danger") return "bg-red-100 text-red-600";
  if (tone === "success") return "bg-emerald-100 text-emerald-600";
  return "bg-slate-100 text-slate-500";
}

function iconWrapperClassName(icon: StatIconKey) {
  if (icon === "attendance") return "bg-teal-50 text-teal-600";
  if (icon === "alerts") return "bg-red-50 text-red-500";
  if (icon === "performance") return "bg-indigo-50 text-indigo-600";
  return "bg-indigo-50 text-indigo-600";
}

type StatsGridProps = {
  stats: StatCard[];
};

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon];

        return (
          <div
            key={stat.id}
            className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <div className="mb-4 flex items-start justify-between">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full ${iconWrapperClassName(stat.icon)}`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`rounded-md px-2 py-1 text-xs font-bold ${badgeClassName(stat.badgeTone)}`}
              >
                {stat.badge}
              </span>
            </div>

            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              {stat.label}
            </p>
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
          </div>
        );
      })}
    </section>
  );
}
