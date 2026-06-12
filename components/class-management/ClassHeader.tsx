import { Mail, Plus } from "lucide-react";

import type { ClassSummary } from "./types";

export default function ClassHeader({ summary }: { summary: ClassSummary }) {
  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <nav className="flex gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
          <span>Management</span>
          <span>/</span>
          <span className="text-indigo-600">{summary.cohortLabel}</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-on-background">
          {summary.title}
        </h1>

        <p className="text-slate-500 mt-2 max-w-2xl font-medium">
          {summary.subtitle}
        </p>
      </div>

      <div className="flex gap-3">
  <button
    type="button"
    className="bg-slate-100 text-slate-600 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-slate-200 transition-colors"
  >
    <Mail className="h-5 w-5" />
    Message Class
  </button>

  <button
    type="button"
    className="bg-indigo-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:shadow-lg transition-all active:scale-95"
  >
    <Plus className="h-5 w-5" />
    New Assignment
  </button>
</div>
    </header>
  );
}
