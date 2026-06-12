import Link from "next/link";
import { Plus } from "lucide-react";

export default function NewQuickTaskFab() {
  return (
    <Link
      href="/admin/tasks/create"
      aria-label="New Quick Task"
      className="group fixed bottom-10 right-10 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-700 text-white shadow-2xl shadow-indigo-700/40 transition active:scale-95"
    >
      <Plus className="h-8 w-8" />

      <span className="pointer-events-none absolute right-20 translate-x-4 whitespace-nowrap rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100">
        New Quick Task
      </span>
    </Link>
  );
}
