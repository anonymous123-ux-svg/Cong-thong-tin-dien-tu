import { ArrowRight, Clock3 } from "lucide-react";

import type { Assignment } from "./types";

type TaskAssignmentItemProps = {
  assignment: Assignment;
};

function priorityClassName(priority: Assignment["priority"]) {
  if (priority === "High") return "bg-red-100 text-red-600";
  if (priority === "Medium") return "bg-emerald-100 text-emerald-700";
  return "bg-slate-200 text-slate-500";
}

export default function TaskAssignmentItem({
  assignment,
}: TaskAssignmentItemProps) {
  return (
    <article className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest px-5 py-4 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex items-center gap-3">
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${priorityClassName(assignment.priority)}`}
            >
              {assignment.priority === "High"
                ? "High Priority"
                : assignment.priority}
            </span>
            <h4 className="truncate text-base font-bold text-on-background">
              {assignment.title}
            </h4>
          </div>

          <p className="mb-3 flex items-center gap-1 text-xs text-slate-400">
            <Clock3 className="h-3.5 w-3.5" />
            {assignment.dueText}
          </p>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${assignment.progressWidthClassName} ${assignment.barColorClassName}`}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 border-slate-100 pt-3 md:border-l md:pl-4 md:pt-0">
          <div className="text-right md:min-w-16">
            <p className="text-xs font-bold text-on-background">
              {assignment.completion}%
            </p>
            <p className="text-[10px] uppercase text-slate-400">Complete</p>
          </div>

          <button
            type="button"
            className="rounded-full bg-indigo-100 p-2 text-indigo-700 transition hover:bg-indigo-200"
            aria-label={`Open ${assignment.title}`}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
