import Link from "next/link";
import { Calendar, CheckCircle2 } from "lucide-react";

import type {
  Assignment,
  AssignmentBadgeTone,
  AssignmentStatus,
} from "./types";

const STATUS_META: Record<
  AssignmentStatus,
  {
    label: string;
    pillClassName: string;
    actionLabel: string;
    actionClassName: string;
  }
> = {
  in_progress: {
    label: "In Progress",
    pillClassName:
      "rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600",
    actionLabel: "Continue Work",
    actionClassName:
      "rounded-full bg-[#3D52A0] px-6 py-2 font-medium text-white shadow-sm transition-colors hover:bg-[#2D3F80]",
  },
  not_started: {
    label: "Not Started",
    pillClassName:
      "rounded-full border border-slate-200 px-3 py-1 text-xs font-medium text-slate-500",
    actionLabel: "Start Assignment",
    actionClassName:
      "rounded-full px-6 py-2 font-medium text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/10",
  },
  submitted: {
    label: "Submitted",
    pillClassName:
      "rounded-full bg-[#16A34A] px-3 py-1 text-xs font-medium text-white",
    actionLabel: "View Submission",
    actionClassName:
      "rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900",
  },
};

function badgeClassName(tone: AssignmentBadgeTone | undefined) {
  if (tone === "danger") return "bg-orange-100 text-orange-600";
  return "bg-slate-100 text-slate-600";
}

export default function AssignmentCard({
  assignment,
}: {
  assignment: Assignment;
}) {
  const meta = STATUS_META[assignment.status];
  const hasDescription = assignment.description.trim().length > 0;
  const actionHref =
    assignment.status === "submitted"
      ? null
      : `/admin/courses/assignments/${assignment.id}`;

  const cardClassName =
    assignment.status === "in_progress"
      ? "relative overflow-hidden rounded-xl bg-white p-6 shadow-md transition-all duration-300 hover:shadow-lg"
      : assignment.status === "submitted"
        ? "rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md opacity-90"
        : "rounded-xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-md";

  return (
    <article className={cardClassName}>
      {assignment.status === "in_progress" ? (
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-[#3D52A0]/5" />
      ) : null}

      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div>
          {assignment.badgeLabel ? (
            <span
              className={`mb-3 inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ${badgeClassName(
                assignment.badgeTone,
              )}`}
            >
              {assignment.badgeTone === "danger" ? (
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              ) : null}
              {assignment.badgeLabel}
            </span>
          ) : null}

          <h3 className="mb-1 text-lg font-medium text-slate-900">
            {assignment.title}
          </h3>
          <p className="text-sm text-slate-500">{assignment.moduleLabel}</p>
        </div>

        <span className={meta.pillClassName}>{meta.label}</span>
      </div>

      {hasDescription ? (
        <p className="mb-6 line-clamp-2 text-base text-slate-500">
          {assignment.description}
        </p>
      ) : null}

      <div
        className={
          assignment.status === "submitted"
            ? "mt-2 flex items-center justify-between"
            : "flex items-center justify-between border-t border-slate-100 pt-4"
        }
      >
        <div className="flex items-center gap-2 text-sm text-slate-500">
          {assignment.status === "submitted" ? (
            <CheckCircle2
              className="h-4 w-4 text-[#16A34A]"
              aria-hidden="true"
            />
          ) : (
            <Calendar className="h-4 w-4" aria-hidden="true" />
          )}
          {assignment.dueLabel}
        </div>

        {actionHref ? (
          <Link href={actionHref} className={meta.actionClassName}>
            {meta.actionLabel}
          </Link>
        ) : (
          <button type="button" className={meta.actionClassName}>
            {meta.actionLabel}
          </button>
        )}
      </div>
    </article>
  );
}
