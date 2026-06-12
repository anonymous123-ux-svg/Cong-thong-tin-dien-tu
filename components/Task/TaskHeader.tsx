import Link from "next/link";
import { Plus } from "lucide-react";

export default function TaskHeader() {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div>
        <h2 className="text-4xl font-bold tracking-tight text-on-background">
          Task Board
        </h2>

        <p className="mt-1 text-on-surface-variant">
          Manage your coursework and laboratory deadlines.
        </p>
      </div>

      <Link
        href="/admin/tasks/create"
        className="inline-flex items-center gap-2 rounded-full bg-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
      >
        <Plus className="h-4 w-4" />
        New Task
      </Link>
    </div>
  );
}
