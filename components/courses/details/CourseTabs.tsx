"use client";

import { useState } from "react";

import type { CourseTab } from "./types";

type Props = {
  studentsCount: number;
  initialTab?: CourseTab;
};

const TABS: Array<{ value: CourseTab; label: string }> = [
  { value: "Overview", label: "Overview" },
  { value: "Curriculum", label: "Curriculum" },
  { value: "Students", label: "Students" },
  { value: "Resources", label: "Resources" },
  { value: "Reviews", label: "Reviews" },
];

export default function CourseTabs({ studentsCount, initialTab }: Props) {
  const [value, onChange] = useState<CourseTab>(initialTab ?? "Overview");

  return (
    <div className="flex border-b border-slate-100 mb-8 overflow-x-auto">
      {TABS.map((tab) => {
        const label =
          tab.value === "Students"
            ? `Students (${studentsCount.toLocaleString()})`
            : tab.label;

        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => onChange(tab.value)}
            className={
              tab.value === value
                ? "px-6 py-4 text-primary font-bold border-b-2 border-primary whitespace-nowrap"
                : "px-6 py-4 text-slate-400 hover:text-primary font-medium whitespace-nowrap transition-colors"
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
