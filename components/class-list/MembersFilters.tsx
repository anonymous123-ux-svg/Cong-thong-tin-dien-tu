"use client";

import { ChevronDown, Search, ArrowUpDown } from "lucide-react";

export type MembersFiltersValue = {
  query: string;
  role: string;
  status: string;
  tag: string;
};

export default function MembersFilters({
  value,
  onChange,
  onToggleSort,
}: {
  value: MembersFiltersValue;
  onChange: (next: MembersFiltersValue) => void;
  onToggleSort: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={value.query}
            onChange={(e) => onChange({ ...value, query: e.target.value })}
            placeholder="Search students..."
            aria-label="Search students"
            className="w-full rounded-full border border-gray-200 bg-white py-3 pl-12 pr-4 text-sm text-gray-900 placeholder:text-gray-400 transition-all focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={value.role}
              onChange={(e) => onChange({ ...value, role: e.target.value })}
              className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2.5 px-6 pr-10 text-sm font-medium text-gray-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              aria-label="Filter by role"
            >
              <option value="">Role</option>
              <option value="Student">Student</option>
              <option value="TA">TA</option>
              <option value="Lecturer">Lecturer</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={value.status}
              onChange={(e) => onChange({ ...value, status: e.target.value })}
              className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2.5 px-6 pr-10 text-sm font-medium text-gray-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              aria-label="Filter by status"
            >
              <option value="">Status</option>
              <option value="active">Active</option>
              <option value="inactive">Suspended</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={value.tag}
              onChange={(e) => onChange({ ...value, tag: e.target.value })}
              className="cursor-pointer appearance-none rounded-full border border-gray-200 bg-white py-2.5 px-6 pr-10 text-sm font-medium text-gray-700 focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
              aria-label="Filter by tag"
            >
              <option value="">Tags</option>
              <option value="Top Performer">Top Performer</option>
              <option value="At Risk">At Risk</option>
              <option value="New">New</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onToggleSort}
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-indigo-600"
      >
        <ArrowUpDown className="h-5 w-5" />
        Sort
      </button>
    </div>
  );
}
