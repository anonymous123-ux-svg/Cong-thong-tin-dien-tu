import { Filter, Plus } from "lucide-react";

export default function ClassDashboardHeader() {
  return (
    <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <span className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-widest text-blue-600">
          Curation Hub
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-on-surface">
          Active Learning Paths
        </h1>
        <p className="mt-2 max-w-[60ch] text-sm text-on-surface-variant">
          Welcome back, Dr. Aris. You have 3 lectures scheduled for today across
          your primary curriculum.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-white px-4 py-2.5 text-sm font-semibold text-on-surface transition hover:bg-surface-bright"
        >
          <Filter className="h-4 w-4" />
          Filter
        </button>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          New Class
        </button>
      </div>
    </header>
  );
}
