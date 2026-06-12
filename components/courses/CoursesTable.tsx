import type { Course } from "./types";

import Link from "next/link";
import { Pencil, Star, Trash2 } from "lucide-react";

function publishPill(status: Course["publishStatus"]) {
  switch (status) {
    case "Published":
      return "bg-secondary-container/40 text-secondary";
    case "In Review":
      return "bg-primary/10 text-primary";
    case "Draft":
      return "bg-surface-container-high text-outline";
    case "Archived":
      return "bg-surface-container-highest/60 text-on-surface-variant";
  }
}

function initials(code: string) {
  return code.split(/\s+/).join("").slice(0, 2).toUpperCase();
}

export default function CoursesTable({ courses }: { courses: Course[] }) {
  return (
    <section className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 flex items-center justify-between gap-4">
        <h3 className="text-lg font-extrabold text-on-surface">
          Detailed Course List
        </h3>

        <div className="flex items-center gap-6 text-xs font-semibold text-outline">
          <button type="button" className="hover:text-on-surface">
            Export CSV
          </button>
          <button type="button" className="hover:text-on-surface">
            Print PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-surface-container-low">
            <tr className="text-left text-outline">
              <th className="px-6 py-3 font-bold uppercase tracking-wider">
                Course Title
              </th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-3 font-bold uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-surface-container-low/40">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-[10px] font-extrabold">
                      {initials(course.code)}
                    </div>
                    <div className="font-semibold text-on-surface">
                      <Link
                        href={`/admin/courses/${course.id}`}
                        className="hover:underline"
                      >
                        {course.title}
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-on-surface-variant">
                  {course.category}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={
                      "inline-flex items-center rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] " +
                      publishPill(course.publishStatus)
                    }
                  >
                    {course.publishStatus}
                  </span>
                </td>
                <td className="px-6 py-4 font-semibold text-on-surface">
                  {course.students.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {course.rating == null ? (
                    <span className="text-outline">--</span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-semibold text-primary">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      {course.rating.toFixed(1)}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3 text-outline">
                    <button
                      type="button"
                      className="hover:text-on-surface"
                      aria-label="Edit"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="hover:text-on-surface"
                      aria-label="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
