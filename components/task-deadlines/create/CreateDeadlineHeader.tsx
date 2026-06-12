import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function CreateDeadlineHeader() {
  return (
    <header className="mb-10">
      <div className="mb-6 flex justify-start">
        <Link
          href="/admin/tasks/schedule"
          className="group inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Schedule</span>
        </Link>
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create New Deadline
        </h1>
        <p className="mt-2 text-lg font-medium text-slate-500">
          Define your milestones and stay ahead of your schedule.
        </p>
      </div>
    </header>
  );
}
