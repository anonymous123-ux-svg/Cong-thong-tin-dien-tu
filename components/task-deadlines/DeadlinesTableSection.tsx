"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";

import DeadlinesTable from "./DeadlinesTable";
import type { DeadlineItem, DeadlinePriority, DeadlineStatus } from "./types";

type Props = {
  items: DeadlineItem[];
  modules: string[];
  selectedDateIso?: string | null;
};

const PRIORITY_OPTIONS: Array<DeadlinePriority> = ["High", "Medium", "Low"];
const STATUS_OPTIONS: Array<DeadlineStatus> = [
  "Overdue",
  "Due Soon",
  "Active",
  "Completed",
];

export default function DeadlinesTableSection({
  items,
  modules,
  selectedDateIso,
}: Props) {
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState<DeadlinePriority | "">("");
  const [module, setModule] = useState<string>("");
  const [status, setStatus] = useState<DeadlineStatus | "">("");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery = normalizedQuery
        ? item.taskName.toLowerCase().includes(normalizedQuery)
        : true;
      const matchesPriority = priority ? item.priority === priority : true;
      const matchesModule = module ? item.module === module : true;
      const matchesStatus = status ? item.status === status : true;
      const matchesDate = selectedDateIso
        ? item.dueDate === selectedDateIso
        : true;

      return (
        matchesQuery &&
        matchesPriority &&
        matchesModule &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [items, module, priority, query, selectedDateIso, status]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4">
        <div className="relative min-w-60 flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by task name..."
            aria-label="Search by task name"
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            type="text"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="relative w-48">
            <select
              value={priority}
              onChange={(e) =>
                setPriority((e.target.value as DeadlinePriority | "") ?? "")
              }
              aria-label="Filter by priority"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-600 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Priority</option>
              {PRIORITY_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative w-48">
            <select
              value={module}
              onChange={(e) => setModule(e.target.value)}
              aria-label="Filter by module"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-600 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">All Modules</option>
              {modules.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>

          <div className="relative w-48">
            <select
              value={status}
              onChange={(e) =>
                setStatus((e.target.value as DeadlineStatus | "") ?? "")
              }
              aria-label="Filter by status"
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-medium text-slate-600 shadow-sm outline-none transition focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Status</option>
              {STATUS_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
        </div>
      </div>

      <DeadlinesTable items={filteredItems} />
    </div>
  );
}
