import Link from "next/link";
import {
  AlertTriangle,
  CalendarDays,
  ChevronRight,
  Clock,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  MessageSquare,
  UploadCloud,
} from "lucide-react";

import Card from "@/components/ui/Card";
import type { DeadlineItem } from "../types";
import { DEADLINE_DETAIL_CONTENT, getPriorityLabel } from "./detailContent";

function progressWidthClass(percent: number) {
  switch (percent) {
    case 0:
      return "w-0";
    case 25:
      return "w-1/4";
    case 50:
      return "w-1/2";
    case 65:
      return "w-[65%]";
    case 75:
      return "w-3/4";
    case 100:
      return "w-full";
    default:
      return "w-2/3";
  }
}

function formatDueDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map((value) => Number(value));
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date);
}

function diffDays(fromIso: string, toDate: Date) {
  const [year, month, day] = fromIso.split("-").map((value) => Number(value));
  const dueUtc = Date.UTC(year, month - 1, day);
  const todayUtc = Date.UTC(
    toDate.getFullYear(),
    toDate.getMonth(),
    toDate.getDate(),
  );
  return Math.round((dueUtc - todayUtc) / (24 * 60 * 60 * 1000));
}

function dueBadge(item: DeadlineItem) {
  const delta = diffDays(item.dueDate, new Date());

  if (delta < 0) {
    return {
      label: `Overdue by ${Math.abs(delta)} day${Math.abs(delta) === 1 ? "" : "s"}`,
      className: "bg-red-100 text-red-600",
    };
  }

  if (delta === 0) {
    return { label: "Due today", className: "bg-amber-100 text-amber-700" };
  }

  return {
    label: `Due in ${delta} day${delta === 1 ? "" : "s"}`,
    className: "bg-red-100 text-red-600",
  };
}

type Props = {
  item: DeadlineItem;
};

export default function DeadlineDetailView({ item }: Props) {
  const content =
    DEADLINE_DETAIL_CONTENT[item.id] ?? DEADLINE_DETAIL_CONTENT["qm-pset-4"];
  const badge = dueBadge(item);

  return (
    <div className="px-6">
      <nav className="mb-8 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
        <Link
          href="/admin/dashboard"
          className="transition hover:text-indigo-600"
        >
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href="/admin/tasks/deadlines"
          className="transition hover:text-indigo-600"
        >
          Deadlines
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-slate-700">{item.taskName}</span>
      </nav>

      <section className="mb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {item.taskName}
            </h1>

            <div className="flex flex-wrap gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-semibold ${badge.className}`}
              >
                <Clock className="h-4 w-4" />
                {badge.label}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-4 py-1.5 text-sm font-semibold text-slate-600">
                <AlertTriangle className="h-4 w-4 text-slate-500" />
                {getPriorityLabel(item.priority)}
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700">
                <GraduationCap className="h-4 w-4" />
                {item.module}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Add to Calendar
            </button>
            <button
              type="button"
              className="rounded-full bg-indigo-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-transform hover:scale-[1.02]"
            >
              Go to Submission
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">
              Description & Requirements
            </h2>

            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p className="text-[15px]">{content.description}</p>

              <div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Learning Objectives
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-[15px]">
                  {content.learningObjectives.map((objective) => (
                    <li key={objective}>{objective}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 text-base font-semibold text-slate-900">
                  Grading Criteria
                </h3>
                <div className="space-y-3 rounded-lg bg-slate-50 p-4">
                  {content.gradingCriteria.map((line) => (
                    <div
                      key={line.label}
                      className="flex items-center justify-between gap-4 text-[15px]"
                    >
                      <span>{line.label}</span>
                      <span className="font-bold text-slate-700">
                        {line.weight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <Card className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">
              Reference Materials
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {content.resources.map((resource) => {
                const icon =
                  resource.variant === "pdf" ? (
                    <FileText className="h-5 w-5" />
                  ) : (
                    <ExternalLink className="h-5 w-5" />
                  );

                return (
                  <button
                    key={resource.id}
                    type="button"
                    className="group flex items-center rounded-xl border border-slate-200 p-4 text-left transition-all hover:border-indigo-600/60 hover:bg-indigo-50/40"
                  >
                    <span
                      className={
                        resource.variant === "pdf"
                          ? "mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700"
                          : "mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700"
                      }
                    >
                      {icon}
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-slate-900">
                        {resource.title}
                      </span>
                      <span className="block truncate text-sm text-slate-500">
                        {resource.meta}
                      </span>
                    </span>

                    {resource.variant === "pdf" ? (
                      <Download className="h-5 w-5 text-slate-400 transition group-hover:text-indigo-600" />
                    ) : (
                      <ExternalLink className="h-5 w-5 text-slate-400 transition group-hover:text-indigo-600" />
                    )}
                  </button>
                );
              })}
            </div>
          </Card>

          <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <MessageSquare className="h-7 w-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">
              Faculty Feedback
            </h3>
            <p className="mt-2 max-w-sm text-sm text-slate-500">
              No feedback available yet. Once you submit and the instructor
              grades your work, comments will appear here.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
            <div className="h-2 bg-indigo-600" />
            <div className="p-6">
              <h2 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Assignment Details
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <CalendarDays className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Due Date</p>
                    <p className="font-semibold text-slate-900">
                      {formatDueDate(item.dueDate)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Due Time</p>
                    <p className="font-semibold text-slate-900">
                      {item.timeLabel === "Done" ? "11:59 PM" : item.timeLabel}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Course Module</p>
                    <p className="font-semibold text-slate-900">
                      {content.courseUnitLabel}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Card className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                Submission Status
              </h2>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600">
                Not submitted
              </span>
            </div>

            <label
              htmlFor="deadline-upload"
              className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 p-8 text-center transition-all hover:border-indigo-500/60 hover:bg-indigo-50/40"
            >
              <UploadCloud className="mb-3 h-9 w-9 text-slate-400 transition group-hover:text-indigo-600" />
              <p className="font-semibold text-slate-900">Drag & Drop Files</p>
              <p className="mt-1 text-xs text-slate-500">
                PDF, DOCX up to 10MB
              </p>
              <input id="deadline-upload" className="hidden" type="file" />
            </label>

            <button
              type="button"
              className="mt-6 w-full rounded-xl bg-indigo-600 py-4 font-bold text-white shadow-md shadow-indigo-200 transition-all active:scale-95 hover:shadow-indigo-200/80"
            >
              Submit Assignment
            </button>

            <p className="mt-4 text-center text-[10px] text-slate-500">
              By submitting, you agree to the Academic Integrity Policy.
            </p>
          </Card>

          <Card className="rounded-xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
            <h2 className="mb-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
              Your Progress
            </h2>

            <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className={`h-full rounded-full bg-indigo-600 ${progressWidthClass(content.progressPercent)}`}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-500">{content.progressLabel}</span>
              <span className="text-indigo-600">12/18</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
