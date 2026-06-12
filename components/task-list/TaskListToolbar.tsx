"use client";

import { Filter, Search } from "lucide-react";

import { useTaskList } from "./TaskListProvider";
import type { TaskListSortBy } from "./types";

const SORT_OPTIONS: TaskListSortBy[] = ["Due Date", "Priority", "Status"];

export default function TaskListToolbar() {
  const { query, setQuery, sortBy, setSortBy } = useTaskList();

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-outline" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tasks..."
            type="text"
            className="w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-700/20"
          />
        </div>

        <button
          type="button"
          onClick={() => {}}
          className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-on-surface transition-colors hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-sm font-semibold text-outline-variant">
          Sort by:
        </span>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as TaskListSortBy)}
          aria-label="Sort tasks by"
          className="cursor-pointer bg-transparent text-sm font-bold text-indigo-700 outline-none focus:ring-0"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
