import { ArrowUpDown, ChevronDown, SlidersHorizontal } from "lucide-react";

type Props = {
  filters: readonly string[];
  sortOptions: readonly string[];
};

export default function DiscussionFiltersBar({ filters, sortOptions }: Props) {
  const activeFilter = filters[0] ?? "All Topics";

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="no-scrollbar flex w-full gap-2 overflow-x-auto sm:w-auto">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;

            const className = isActive
              ? "shrink-0 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700"
              : "shrink-0 rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100";

            return (
              <button key={filter} type="button" className={className}>
                {filter}
              </button>
            );
          })}
        </div>

        <div className="flex w-full items-center justify-between gap-3 text-sm text-slate-600 sm:w-auto sm:justify-end">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">Sort</span>
          </div>

          <div className="relative">
            <ArrowUpDown
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <ChevronDown
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <select className="h-10 w-full appearance-none rounded-full border border-slate-200 bg-white pl-9 pr-9 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-indigo-200 focus:ring-2 focus:ring-indigo-500/20">
              {sortOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
