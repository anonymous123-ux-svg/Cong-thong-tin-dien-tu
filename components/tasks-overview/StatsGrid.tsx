import type { ComponentType } from "react";

import { CalendarX2, CheckCircle2, ClipboardList, Clock3 } from "lucide-react";

import Card from "@/components/ui/Card";

import type { TaskStat } from "./types";

const ICONS: Record<TaskStat["icon"], ComponentType<{ className?: string }>> = {
  total: ClipboardList,
  active: Clock3,
  completed: CheckCircle2,
  deadline: CalendarX2,
};

function iconWrapperClassName(icon: TaskStat["icon"]) {
  switch (icon) {
    case "completed":
      return "bg-emerald-50 text-emerald-600";
    case "deadline":
      return "bg-red-50 text-red-600";
    case "total":
    case "active":
    default:
      return "bg-indigo-50 text-indigo-700";
  }
}

function badgeClassName(tone: NonNullable<TaskStat["badge"]>["tone"]) {
  switch (tone) {
    case "success":
      return "bg-emerald-50 text-emerald-600";
    case "danger":
      return "bg-red-50 text-red-600";
    case "info":
    default:
      return "text-indigo-700";
  }
}

export default function StatsGrid({ stats }: { stats: TaskStat[] }) {
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICONS[stat.icon];

        return (
          <Card
            key={stat.id}
            className="p-6 transition hover:border-indigo-200/60"
          >
            <div className="mb-5 flex items-start justify-between">
              <span
                className={`inline-flex rounded-xl p-2.5 ${iconWrapperClassName(
                  stat.icon,
                )}`}
              >
                <Icon className="h-5 w-5" />
              </span>

              {stat.badge ? (
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${badgeClassName(
                    stat.badge.tone,
                  )}`}
                >
                  {stat.badge.label}
                </span>
              ) : null}
            </div>

            <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {stat.label}
            </p>
            <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
          </Card>
        );
      })}
    </div>
  );
}
