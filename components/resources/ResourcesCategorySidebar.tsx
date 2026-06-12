"use client";

import {
  Database,
  FileText,
  LayoutGrid,
  PlaySquare,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CategoryItem, ResourceCategoryKey, StarredModule } from "./types";

const CATEGORY_ICON: Record<ResourceCategoryKey, typeof LayoutGrid> = {
  all: LayoutGrid,
  lectures: PlaySquare,
  assignments: ClipboardList,
  research: FileText,
  datasets: Database,
};

// Dot colours for starred modules
const STARRED_DOT: Record<string, string> = {
  "quantum-ethics": "#4338CA", // indigo
  "neuro-linguistics": "#10B981", // emerald
};

type ResourcesCategorySidebarProps = {
  categories: CategoryItem[];
  starredModules: StarredModule[];
  activeCategory: ResourceCategoryKey;
  onCategoryChange: (category: ResourceCategoryKey) => void;
};

export default function ResourcesCategorySidebar({
  categories,
  starredModules,
  activeCategory,
  onCategoryChange,
}: ResourcesCategorySidebarProps) {
  return (
    <aside className="w-56 shrink-0 self-start">
      {/* Categories */}
      <div className="space-y-1">
        <h4
          className="mb-3 px-4 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#94A3B8" }}
        >
          Categories
        </h4>

        {categories.map((category) => {
          const Icon = CATEGORY_ICON[category.key];
          const isActive = category.key === activeCategory;

          return (
            <button
              key={category.key}
              type="button"
              onClick={() => onCategoryChange(category.key)}
              className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition-colors"
              style={
                isActive
                  ? { backgroundColor: "#4338CA", color: "#ffffff" }
                  : { color: "#64748B" }
              }
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = "#4338CA";
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = "#64748B";
              }}
            >
              <span className="flex flex-1 items-center gap-2">
                <Icon className="h-[18px] w-[18px]" />
                {category.label}
              </span>

              {isActive && typeof category.count === "number" ? (
                <span
                  className="rounded-md px-1.5 py-0.5 text-[10px] font-bold"
                  style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  {category.count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Starred modules */}
      <div className="mt-8 space-y-1">
        <h4
          className="mb-3 px-4 text-[10px] font-bold uppercase tracking-widest"
          style={{ color: "#94A3B8" }}
        >
          Starred Modules
        </h4>

        {starredModules.map((module) => (
          <button
            key={module.id}
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 text-left text-sm font-medium transition-colors"
            style={{ color: "#64748B" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#4338CA")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: STARRED_DOT[module.id] ?? "#4338CA" }}
              aria-hidden="true"
            />
            {module.label}
          </button>
        ))}
      </div>
    </aside>
  );
}
