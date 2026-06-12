"use client";

import { useMemo, useState } from "react";

import {
  Filter,
  FlaskConical,
  MoreVertical,
  ScrollText,
  Search,
  Star,
  Terminal,
} from "lucide-react";

import type { CourseManagementListItem } from "./mockData";

const PAGE_SIZE = 3;

function statusDotClassName(status: CourseManagementListItem["status"]) {
  return status === "Active" ? "bg-emerald-500" : "bg-slate-400";
}

function statusTextClassName(status: CourseManagementListItem["status"]) {
  return status === "Active" ? "text-emerald-600" : "text-slate-500";
}

function iconBadge(item: CourseManagementListItem) {
  switch (item.iconKey) {
    case "biotech":
      return {
        bg: "bg-indigo-50",
        fg: "text-indigo-600",
        Icon: FlaskConical,
      };
    case "terminal":
      return {
        bg: "bg-emerald-50",
        fg: "text-emerald-600",
        Icon: Terminal,
      };
    case "history":
      return {
        bg: "bg-orange-50",
        fg: "text-orange-600",
        Icon: ScrollText,
      };
  }
}

type Props = {
  courses: CourseManagementListItem[];
  totalCourses: number;
};

export default function DetailedCourseList({ courses, totalCourses }: Props) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(q));
  }, [courses, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paged = useMemo(() => {
    const safePage = Math.max(1, Math.min(totalPages, page));
    const start = (safePage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, totalPages]);

  const safePage = Math.max(1, Math.min(totalPages, page));

  return (
    <section>
      <div className="bg-surface-container-lowest rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-container-low">
          <h3 className="text-xl font-semibold">Detailed Course List</h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                <Search className="h-4 w-4" />
              </span>
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-full text-sm w-full md:w-64 focus:ring-2 focus:ring-indigo-700/20"
                placeholder="Search courses..."
                type="text"
              />
            </div>

            <button
              type="button"
              className="p-2 bg-surface-container-low text-slate-600 rounded-full hover:bg-surface-container-high transition-colors"
              aria-label="Filter"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/50 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Students</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-8 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-low">
              {paged.map((course) => {
                const badge = iconBadge(course);

                return (
                  <tr
                    key={course.id}
                    className="group hover:bg-surface-container-low/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div
                          className={
                            "h-10 w-10 rounded-lg flex items-center justify-center " +
                            badge.bg +
                            " " +
                            badge.fg
                          }
                        >
                          <badge.Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-bold text-on-surface">
                            {course.title}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {course.code} • {course.createdLabel}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-sm text-slate-600">
                        {course.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={
                            "h-1.5 w-1.5 rounded-full " +
                            statusDotClassName(course.status)
                          }
                        />
                        <span
                          className={
                            "text-sm font-medium " +
                            statusTextClassName(course.status)
                          }
                        >
                          {course.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <span className="text-sm font-semibold">
                        {course.students.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      {course.rating == null ? (
                        <div className="flex items-center gap-1 text-slate-300">
                          <Star className="h-4 w-4" />
                          <span className="text-sm font-bold">--</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-orange-500">
                          <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                          <span className="text-sm font-bold">
                            {course.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-indigo-700 transition-all"
                        aria-label="More"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-slate-50/50 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Showing {paged.length} of {totalCourses} courses
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-4 py-2 text-xs font-bold text-slate-400 bg-white rounded-lg border border-slate-200 disabled:opacity-60"
            >
              Previous
            </button>
            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-4 py-2 text-xs font-bold text-indigo-700 bg-white rounded-lg border border-indigo-200 shadow-sm disabled:opacity-60"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
