import {
  CalendarDays,
  CheckCircle2,
  CalendarRange,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";

type SummaryProps = {
  overdue: number;
  dueToday: number;
  thisWeek: number;
  completed: number;
};

type SummaryCardProps = {
  icon: ReactNode;
  badgeLabel: string;
  badgeClassName: string;
  value: number;
  label: string;
};

function SummaryCard({
  icon,
  badgeLabel,
  badgeClassName,
  value,
  label,
}: SummaryCardProps) {
  return (
    <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition-all hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>{icon}</div>
        <span className={badgeClassName}>{badgeLabel}</span>
      </div>
      <h3 className="mb-1 text-3xl font-bold text-slate-900">{value}</h3>
      <p className="text-sm font-medium text-slate-500">{label}</p>
    </div>
  );
}

export default function DeadlineSummaryCards({
  overdue,
  dueToday,
  thisWeek,
  completed,
}: SummaryProps) {
  return (
    <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        icon={
          <div className="rounded-lg bg-red-50 p-2.5 text-red-500">
            <TriangleAlert className="h-5 w-5" />
          </div>
        }
        badgeLabel="CRITICAL"
        badgeClassName="rounded bg-red-50 px-2 py-1 text-xs font-bold text-red-500"
        value={overdue}
        label="Overdue Tasks"
      />

      <SummaryCard
        icon={
          <div className="rounded-lg bg-amber-50 p-2.5 text-amber-500">
            <CalendarDays className="h-5 w-5" />
          </div>
        }
        badgeLabel="TODAY"
        badgeClassName="rounded bg-amber-50 px-2 py-1 text-xs font-bold text-amber-500"
        value={dueToday}
        label="Due Today"
      />

      <SummaryCard
        icon={
          <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-500">
            <CalendarRange className="h-5 w-5" />
          </div>
        }
        badgeLabel="WEEKLY"
        badgeClassName="rounded bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-500"
        value={thisWeek}
        label="This Week"
      />

      <SummaryCard
        icon={
          <div className="rounded-lg bg-emerald-50 p-2.5 text-emerald-500">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        }
        badgeLabel="HISTORY"
        badgeClassName="rounded bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-500"
        value={completed}
        label="Completed"
      />
    </div>
  );
}
