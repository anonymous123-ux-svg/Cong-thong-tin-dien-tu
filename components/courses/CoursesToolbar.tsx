"use client";

import { Filter, LayoutGrid, List } from "lucide-react";

type Tab = "All" | "Drafts" | "Published" | "Archived";
type ViewMode = "grid" | "list";

type Props = {
  tab: Tab;
  onTabChange: (value: Tab) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  view: ViewMode;
  onViewChange: (value: ViewMode) => void;
  categories: string[];
};

export default function CoursesToolbar({
  tab,
  onTabChange,
  category,
  onCategoryChange,
  view,
  onViewChange,
  categories,
}: Props) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
      <div className="lg:col-span-6 bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-surface-container-low flex items-center justify-center">
          <Filter className="h-4 w-4 text-outline" />
        </div>

        <div className="flex items-center gap-1 flex-wrap">
          {(["All", "Drafts", "Published", "Archived"] as const).map(
            (value) => (
              <button
                key={value}
                type="button"
                onClick={() => onTabChange(value)}
                className={
                  value === tab
                    ? "px-3 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold"
                    : "px-3 py-2 rounded-full text-outline text-xs font-semibold hover:bg-surface-container-low"
                }
              >
                {value}
              </button>
            ),
          )}
        </div>
      </div>

      <div className="lg:col-span-4 bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-outline">
          Category
        </div>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="border-none bg-surface-container-low rounded-full py-2 px-3 text-sm focus:ring-2 focus:ring-primary"
          aria-label="Category"
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-4 shadow-sm flex items-center justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-outline">
          View Mode
        </div>

        <div className="flex items-center bg-surface-container-low rounded-full p-1">
          <button
            type="button"
            onClick={() => onViewChange("grid")}
            className={
              view === "grid"
                ? "h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center"
                : "h-8 w-8 rounded-full text-outline flex items-center justify-center hover:bg-surface-container-high"
            }
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => onViewChange("list")}
            className={
              view === "list"
                ? "h-8 w-8 rounded-full bg-primary text-on-primary flex items-center justify-center"
                : "h-8 w-8 rounded-full text-outline flex items-center justify-center hover:bg-surface-container-high"
            }
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
