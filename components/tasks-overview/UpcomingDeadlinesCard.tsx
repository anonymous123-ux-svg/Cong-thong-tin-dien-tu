import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import Card from "@/components/ui/Card";

import type { UpcomingDeadline } from "./types";

function priorityLabel(priority: UpcomingDeadline["priority"]) {
  switch (priority) {
    case "high":
      return "High";
    case "medium":
      return "Medium";
    case "low":
    default:
      return "Low";
  }
}

function toneStyles(priority: UpcomingDeadline["priority"]) {
  switch (priority) {
    case "high":
      return {
        border: "border-l-red-500",
        badge: "bg-red-50 text-red-600",
      };
    case "medium":
      return {
        border: "border-l-indigo-700",
        badge: "bg-indigo-50 text-indigo-700",
      };
    case "low":
    default:
      return {
        border: "border-l-emerald-500",
        badge: "bg-emerald-50 text-emerald-600",
      };
  }
}

export default function UpcomingDeadlinesCard({
  items,
}: {
  items: UpcomingDeadline[];
}) {
  return (
    <Card className="flex flex-col p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-lg font-bold text-slate-900">Upcoming Deadlines</h2>
        <button
          type="button"
          aria-label="More"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="max-h-125 space-y-4 overflow-y-auto pr-1">
        {items.map((item) => {
          const styles = toneStyles(item.priority);

          return (
            <div
              key={item.id}
              className={`group cursor-pointer rounded-xl border border-slate-100 border-l-4 bg-slate-50/50 p-4 transition hover:bg-white ${styles.border}`}
            >
              <div className="mb-2 flex items-start justify-between">
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase ${styles.badge}`}
                >
                  {priorityLabel(item.priority)}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {item.relativeDue}
                </span>
              </div>

              <h4 className="mb-1 text-sm font-bold text-slate-900 transition-colors group-hover:text-indigo-700">
                {item.title}
              </h4>
              <p className="text-xs text-slate-500">{item.dueLabel}</p>
            </div>
          );
        })}
      </div>

      <Link
        href="/admin/tasks/deadlines"
        className="mt-8 inline-flex w-full items-center justify-center rounded-xl border border-indigo-100 py-3 text-xs font-bold text-indigo-700 transition hover:bg-indigo-50 hover:text-indigo-800"
      >
        View All Deadlines
      </Link>
    </Card>
  );
}
