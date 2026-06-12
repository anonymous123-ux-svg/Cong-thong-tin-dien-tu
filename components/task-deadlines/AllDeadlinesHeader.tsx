import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

export default function AllDeadlinesHeader() {
  return (
    <header className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        <div className="flex flex-col items-start gap-3">
          <Link
            href="/admin/tasks/overview"
            className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Overview
          </Link>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            All Deadlines
          </h1>
        </div>

        <p className="mt-2 max-w-[70ch] font-medium text-slate-500">
          Monitor and manage every academic milestone across your active
          modules.
        </p>
      </div>

      <Link
        href="/admin/tasks/deadlines/create"
        className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Create Deadline
      </Link>
    </header>
  );
}
