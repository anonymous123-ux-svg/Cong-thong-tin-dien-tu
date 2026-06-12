"use client";

import { useMemo, useState } from "react";
import { Download, ListFilter, Search } from "lucide-react";

import StudentRosterTable from "./StudentRosterTable";
import type { Student } from "./types";

type TabKey = "Student Roster" | "Gradebook" | "Course Materials";

const TABS: TabKey[] = ["Student Roster", "Gradebook", "Course Materials"];

export default function ClassTabs({ students }: { students: Student[] }) {
  const [tab, setTab] = useState<TabKey>("Student Roster");
  const [query, setQuery] = useState("");

  const filteredStudents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return students;

    return students.filter((student) => {
      const name = student.name.toLowerCase();
      const id = student.studentIdLabel.toLowerCase();
      return name.includes(q) || id.includes(q);
    });
  }, [query, students]);

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_20px_40px_rgba(21,28,39,0.06)] overflow-hidden">
      <div className="flex border-b border-surface-container">
        {TABS.map((key) => {
          const active = tab === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={
                active
                  ? "px-8 py-5 text-sm font-bold border-b-2 border-indigo-600 text-indigo-600 bg-surface-container-low/30"
                  : "px-8 py-5 text-sm font-bold text-slate-400 hover:text-indigo-600 transition-colors"
              }
            >
              {key}
            </button>
          );
        })}
      </div>

      <div className="p-8">
        {tab === "Student Roster" ? (
          <>
            <div className="flex justify-between items-center mb-8 gap-4">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20"
                  placeholder="Search by name or student ID..."
                  type="text"
                />
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  type="button"
                  className="p-3 bg-surface-container-low rounded-full text-slate-600 hover:bg-surface-container transition-colors"
                  aria-label="Filter"
                >
                  <ListFilter className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="p-3 bg-surface-container-low rounded-full text-slate-600 hover:bg-surface-container transition-colors"
                  aria-label="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>

            <StudentRosterTable students={filteredStudents} />
          </>
        ) : (
          <div className="h-72" />
        )}
      </div>
    </div>
  );
}
