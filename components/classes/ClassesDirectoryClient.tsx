"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus } from "lucide-react";

import type { ClassDirectoryItem, ClassesFilterKey } from "./types";
import ClassGrid from "./ClassGrid";
import Pagination from "./Pagination";

type ClassesDirectoryClientProps = {
  items: ClassDirectoryItem[];
};

const FILTERS: Array<{ key: ClassesFilterKey; label: string }> = [
  { key: "active", label: "Active Classes" },
  { key: "archived", label: "Archived" },
  { key: "upcoming", label: "Upcoming" },
];

export default function ClassesDirectoryClient({
  items,
}: ClassesDirectoryClientProps) {
  const [filter, setFilter] = useState<ClassesFilterKey>("active");

  const filteredItems = useMemo(() => {
    if (filter === "archived") {
      return items.filter((item) => item.status.label === "ARCHIVED");
    }
    if (filter === "upcoming") {
      return items.filter((item) => item.status.label === "UPCOMING");
    }
    return items;
  }, [filter, items]);

  return (
    <section>
      <div className="mb-8 flex flex-wrap items-center gap-3">
        {/* Filter pills */}
        <div className="flex items-center gap-2">
          {FILTERS.map((tab) => {
            const active = tab.key === filter;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setFilter(tab.key)}
                className={
                  active
                    ? "cursor-pointer rounded-full bg-indigo-700 px-5 py-2 text-sm font-semibold text-white shadow-md transition-all"
                    : "cursor-pointer rounded-full px-5 py-2 text-sm font-semibold text-slate-600 transition-all hover:bg-slate-100"
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* All Faculties dropdown */}
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-50"
        >
          All Faculties
          <ChevronDown className="h-4 w-4 text-slate-400" />
        </button>

        {/* New Class button */}
        <Link
          href="/class/classes/newClass"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-700 px-6 py-2 text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all hover:bg-indigo-800 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          New Class
        </Link>
      </div>

      <ClassGrid items={filteredItems} />

      <div className="mt-12">
        <Pagination current={1} total={12} />
      </div>
    </section>
  );
}
