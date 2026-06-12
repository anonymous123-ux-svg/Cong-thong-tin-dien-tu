import Link from "next/link";

import type { DeadlineItem, DeadlinePriority, DeadlineStatus } from "./types";

const priorityDot: Record<DeadlinePriority, string> = {
  High: "bg-red-500",
  Medium: "bg-amber-400",
  Low: "bg-emerald-400",
};

function statusPillClass(status: DeadlineStatus) {
  switch (status) {
    case "Overdue":
      return "bg-red-100 text-red-600";
    case "Due Soon":
      return "bg-amber-100 text-amber-600";
    case "Active":
      return "bg-indigo-100 text-indigo-600";
    case "Completed":
      return "bg-emerald-100 text-emerald-600";
    default:
      return "bg-slate-100 text-slate-500";
  }
}

export default function DeadlinesTable({ items }: { items: DeadlineItem[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full min-w-200 border-collapse text-left">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Deadline
            </th>
            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Task Name
            </th>
            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Module
            </th>
            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Priority
            </th>
            <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Status
            </th>
            <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {items.map((item) => {
            const isCompleted = item.status === "Completed";
            const rowClassName = isCompleted ? "opacity-60" : "";

            const taskClassName = isCompleted
              ? "text-slate-400 line-through"
              : "text-slate-800";

            const dateClassName = isCompleted
              ? "text-slate-400 line-through"
              : item.status === "Overdue"
                ? "text-red-500"
                : item.status === "Due Soon"
                  ? "text-amber-500"
                  : "text-slate-700";

            const priorityText = isCompleted
              ? "text-slate-400"
              : "text-slate-600";
            const priorityDotClass = isCompleted
              ? "bg-slate-300"
              : priorityDot[item.priority];

            const actionClassName = isCompleted
              ? "text-slate-400 hover:bg-slate-100"
              : "text-indigo-600 hover:bg-indigo-50";

            return (
              <tr
                key={item.id}
                className={`${rowClassName} transition-colors hover:bg-slate-50/70`}
              >
                <td className="px-6 py-5">
                  <div className="flex flex-col">
                    <span className={`text-sm font-bold ${dateClassName}`}>
                      {item.dateLabel}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {item.timeLabel}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span className={`text-sm font-semibold ${taskClassName}`}>
                    {item.taskName}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={
                      isCompleted
                        ? "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-400"
                        : "rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600"
                    }
                  >
                    {item.module}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${priorityDotClass}`}
                    />
                    <span className={`text-xs font-medium ${priorityText}`}>
                      {item.priority}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${statusPillClass(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-5 text-right">
                  <Link
                    href={`/admin/tasks/deadlines/${item.id}`}
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold transition-colors ${actionClassName}`}
                  >
                    {isCompleted ? "Review" : "View Details"}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
