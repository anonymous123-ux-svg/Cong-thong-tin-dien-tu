import {
  CheckCircle2,
  ClipboardList,
  Clock,
  TrendingUp,
  Verified,
  CalendarX2,
} from "lucide-react";

import { SCHEDULE_STATS } from "./mockData";
import type { ScheduleStatCard } from "./types";

function ToneIconWrapper(tone: ScheduleStatCard["iconTone"]): {
  wrap: string;
  icon: string;
} {
  if (tone === "success")
    return { wrap: "bg-emerald-200", icon: "text-emerald-800" };
  if (tone === "danger") return { wrap: "bg-red-100", icon: "text-red-600" };
  if (tone === "tertiary")
    return { wrap: "bg-amber-100", icon: "text-amber-700" };
  return { wrap: "bg-indigo-100", icon: "text-indigo-700" };
}

function StatIcon({ name }: { name: ScheduleStatCard["icon"] }) {
  if (name === "pending") return <Clock className="h-5 w-5" />;
  if (name === "eventBusy") return <CalendarX2 className="h-5 w-5" />;
  if (name === "check") return <CheckCircle2 className="h-5 w-5" />;
  return <ClipboardList className="h-5 w-5" />;
}

function Badge({ badge }: { badge: NonNullable<ScheduleStatCard["badge"]> }) {
  const base =
    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold";

  const toneClass =
    badge.tone === "danger"
      ? "bg-red-100 text-red-600"
      : badge.tone === "warning"
        ? "bg-amber-100 text-amber-700"
        : badge.tone === "success"
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-100 text-slate-600";

  return (
    <span className={`${base} ${toneClass}`}>
      {badge.label}
      {badge.icon === "trendingUp" && <TrendingUp className="h-3.5 w-3.5" />}
      {badge.icon === "verified" && <Verified className="h-3.5 w-3.5" />}
    </span>
  );
}

export default function StatStrip() {
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {SCHEDULE_STATS.map((card) => {
        const tone = ToneIconWrapper(card.iconTone);

        return (
          <div
            key={card.id}
            className="rounded-3xl border border-slate-200/40 bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-start justify-between">
              <div className={`rounded-xl p-2 ${tone.wrap} ${tone.icon}`}>
                <StatIcon name={card.icon} />
              </div>
              {card.badge ? <Badge badge={card.badge} /> : null}
            </div>
            <p className="text-sm font-medium text-slate-500">{card.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{card.value}</h3>
          </div>
        );
      })}
    </section>
  );
}
