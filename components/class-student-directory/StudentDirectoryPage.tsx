"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  Mail,
  MoreVertical,
  Plus,
} from "lucide-react";

type StudentStatus = "excellent" | "stable" | "atRisk";

type StudentDirectoryRow = {
  id: string;
  name: string;
  email: string;
  attendancePercent: number;
  avgScore: number;
  progressPercent: number;
  status: StudentStatus;
  lastActiveLabel: string;
};

const STATUS_STYLE: Record<
  StudentStatus,
  { label: string; bg: string; color: string }
> = {
  excellent: { label: "Excellent", bg: "#D1FAE5", color: "#059669" },
  stable: { label: "Stable", bg: "#EEF2FF", color: "#4338CA" },
  atRisk: { label: "At Risk", bg: "#FEE2E2", color: "#EF4444" },
};

const PAGE_SIZE = 10;

const FIRST_NAMES = [
  "Alex",
  "Elena",
  "Jordan",
  "Maya",
  "Liam",
  "Sofia",
  "Noah",
  "Emma",
  "Daniel",
  "Ava",
  "Marcus",
  "Sarah",
  "Leo",
  "Nia",
  "Amina",
  "Robert",
  "James",
  "Elena",
  "Chen",
  "Patel",
];

const LAST_NAMES = [
  "Rivera",
  "Vance",
  "Smith",
  "Chen",
  "Park",
  "Khan",
  "Lin",
  "Wong",
  "Cho",
  "Morris",
  "Miller",
  "Tan",
  "Nakamura",
  "Thompson",
  "Rahman",
  "Brooks",
  "Doherty",
  "Morozov",
  "Rodriguez",
  "Patel",
];

function lastActiveLabelForIndex(index: number) {
  const minutes = (index * 7) % 60;
  const hours = (index * 5) % 12;
  const days = (index * 3) % 7;
  if (index % 5 === 0) return `${Math.max(2, minutes)}m ago`;
  if (index % 5 === 1) return `${Math.max(1, hours)}h ago`;
  return `${Math.max(1, days)}d ago`;
}

function statusForMetrics(
  avgScore: number,
  progressPercent: number,
): StudentStatus {
  if (avgScore < 70 || progressPercent < 60) return "atRisk";
  if (avgScore >= 90 && progressPercent >= 85) return "excellent";
  return "stable";
}

function generateStudents(total: number): StudentDirectoryRow[] {
  return Array.from({ length: total }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length];
    const last = LAST_NAMES[(i * 3) % LAST_NAMES.length];
    const name = `${first} ${last}`;
    const email = `${first[0].toLowerCase()}${last.toLowerCase()}${
      (i % 7) + 1
    }@university.edu`;

    const attendancePercent = 68 + ((i * 9) % 33); // 68..100
    const progressPercent = 35 + ((i * 11) % 66); // 35..100
    const avgScore = 55 + ((i * 13) % 46) + (i % 3) * 0.3; // 55..100-ish
    const status = statusForMetrics(avgScore, progressPercent);

    return {
      id: `student-${i + 1}`,
      name,
      email,
      attendancePercent,
      avgScore: Math.min(100, avgScore),
      progressPercent,
      status,
      lastActiveLabel: lastActiveLabelForIndex(i),
    };
  });
}

const STUDENTS = generateStudents(124);

function clampPercent(value: number) {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, value));
}

export default function StudentDirectoryPage() {
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());
  const selectAllRef = useRef<HTMLInputElement | null>(null);

  const totalStudents = STUDENTS.length;
  const totalPages = Math.max(1, Math.ceil(totalStudents / PAGE_SIZE));

  const currentPage = Math.min(totalPages, Math.max(1, page));
  const pageStudents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return STUDENTS.slice(start, start + PAGE_SIZE);
  }, [currentPage]);

  const visibleIds = useMemo(
    () => pageStudents.map((s) => s.id),
    [pageStudents],
  );

  const allVisibleSelected =
    visibleIds.length > 0 && visibleIds.every((id) => selectedIds.has(id));
  const someVisibleSelected = visibleIds.some((id) => selectedIds.has(id));

  useEffect(() => {
    if (!selectAllRef.current) return;
    selectAllRef.current.indeterminate =
      someVisibleSelected && !allVisibleSelected;
  }, [someVisibleSelected, allVisibleSelected]);

  const showingStart = (currentPage - 1) * PAGE_SIZE + 1;
  const showingEnd = Math.min(currentPage * PAGE_SIZE, totalStudents);

  const pageItems = useMemo(() => {
    if (totalPages <= 5)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    const items: Array<number | "ellipsis"> = [];
    const pushEllipsis = () => {
      if (items[items.length - 1] !== "ellipsis") items.push("ellipsis");
    };

    items.push(1);

    if (currentPage > 3) pushEllipsis();

    const middle = [currentPage - 1, currentPage, currentPage + 1].filter(
      (p) => p > 1 && p < totalPages,
    );

    for (const p of middle) {
      if (!items.includes(p)) items.push(p);
    }

    if (currentPage < totalPages - 2) pushEllipsis();

    items.push(totalPages);
    return items;
  }, [currentPage, totalPages]);

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#0F172A]">
      <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        {/* Directory Header */}
        <div className="mb-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <nav className="mb-2 flex items-center gap-2 text-xs font-semibold tracking-widest text-[#4338CA]/60 uppercase">
                <span>Courses</span>
                <span className="text-[#0F172A]-variant">›</span>
                <span>CS-402</span>
              </nav>
              <h1 className="text-4xl font-bold tracking-tight text-[#0F172A]">
                Student Directory: CS-402
              </h1>
              <p className="mt-2 text-lg text-[#0F172A]-variant">
                Manage and monitor academic performance for Advanced Algorithms.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F172A]-variant" />
                <select
                  aria-label="Status filter"
                  className="appearance-none rounded-full bg-white py-3 pl-11 pr-10 text-sm font-medium shadow-sm outline-none ring-1 ring-[#E2E8F0] focus:ring-2 focus:ring-[#4338CA]/10"
                  defaultValue="all"
                >
                  <option value="all">Status: All Students</option>
                  <option value="top">Top Tier</option>
                  <option value="on-track">On Track</option>
                  <option value="risk">At Risk</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0F172A]-variant" />
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full bg-[#4338CA] px-6 py-3 font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                <Plus className="h-4 w-4" />
                Enroll Student
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="flex flex-col gap-1 rounded-xl bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]-variant">
              Total Students
            </span>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#0F172A]">124</span>
              <span className="mb-1 text-sm font-medium text-[#10B981]">
                +4 this week
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]-variant">
              Avg. Attendance
            </span>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#0F172A]">94.2%</span>
              <span className="mb-1 text-sm font-medium text-[#0F172A]-variant">
                Target: 90%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]-variant">
              Avg. Grade
            </span>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#4338CA]">88.5</span>
              <span className="mb-1 text-sm font-medium text-[#10B981]">
                ↑ 2.1%
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 rounded-xl bg-white p-6 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]-variant">
              Completion Rate
            </span>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-[#0F172A]">76%</span>
              <span className="mb-1 text-sm font-medium text-[#0F172A]-variant">
                Project Phase 1
              </span>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <section className="overflow-hidden rounded-xl bg-white shadow-sm">
          {/* Table Controls */}
          <div className="flex items-center justify-between gap-4 bg-[#F8F9FC] px-6 py-4">
            <div className="flex flex-wrap items-center gap-4">
              <label className="inline-flex items-center gap-2">
                <input
                  ref={selectAllRef}
                  type="checkbox"
                  aria-label="Select all students"
                  className="rounded border-slate-300 text-[#4338CA] focus:ring-[#4338CA]/20"
                  checked={allVisibleSelected}
                  onChange={() => {
                    setSelectedIds((prev) => {
                      const next = new Set(prev);
                      if (allVisibleSelected) {
                        for (const id of visibleIds) next.delete(id);
                        return next;
                      }
                      for (const id of visibleIds) next.add(id);
                      return next;
                    });
                  }}
                />
                <span className="text-sm font-medium text-[#0F172A]-variant">
                  Select All
                </span>
              </label>
              <div className="h-4 w-px bg-[#E2E8F0]" />
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-[#4338CA] transition hover:bg-[#EEF2FF]"
              >
                <Mail className="h-4 w-4" />
                Message
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-bold text-[#0F172A]-variant transition hover:bg-[#F1F5F9]"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>

            <p className="text-sm font-medium text-[#0F172A]-variant">
              Showing {showingStart}-{showingEnd} of {totalStudents} students
            </p>
          </div>

          <div className="w-full overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-[#F1F5F9] bg-[#F1F5F9]">
                  {[
                    "Student",
                    "Attendance %",
                    "Avg Score",
                    "Progress",
                    "Status",
                    "Last Active",
                    "",
                  ].map((label, idx) => (
                    <th
                      key={label}
                      className={
                        idx === 2
                          ? "px-6 py-4 text-center text-[10px] font-bold uppercase tracking-widest text-[#0F172A]-variant"
                          : "px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-[#0F172A]-variant"
                      }
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F1F5F9]">
                {pageStudents.map((student) => {
                  const attendance = clampPercent(student.attendancePercent);
                  const progress = clampPercent(student.progressPercent);
                  const status = STATUS_STYLE[student.status];
                  const scoreToneClassName =
                    student.status === "atRisk"
                      ? "text-[#EF4444]"
                      : "text-[#4338CA]";

                  const isSelected = selectedIds.has(student.id);

                  return (
                    <tr
                      key={student.id}
                      className="group transition-colors hover:bg-[#EEF2FF]"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            aria-label={`Select ${student.name}`}
                            className="rounded border-slate-300 text-[#4338CA] focus:ring-[#4338CA]/20"
                            checked={isSelected}
                            onChange={(e) => {
                              const checked = e.currentTarget.checked;
                              setSelectedIds((prev) => {
                                const next = new Set(prev);
                                if (checked) next.add(student.id);
                                else next.delete(student.id);
                                return next;
                              });
                            }}
                          />
                          <div className="h-10 w-10 rounded-full bg-[#C7D2FE]" />
                          <div>
                            <div className="text-sm font-bold text-[#0F172A]">
                              {student.name}
                            </div>
                            <div className="text-xs text-[#0F172A]-variant">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="text-sm font-semibold text-[#0F172A]">
                          {attendance}%
                        </div>
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                          <div
                            className={
                              student.status === "atRisk"
                                ? "h-full rounded-full bg-[#EF4444]"
                                : "h-full rounded-full bg-[#10B981]"
                            }
                            style={{ width: `${attendance}%` }}
                          />
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex flex-col items-center">
                          <span
                            className={`text-sm font-bold ${scoreToneClassName}`}
                          >
                            {student.avgScore.toFixed(1)}
                          </span>
                          <div className="mt-1 flex h-6 w-16 items-end gap-0.5">
                            {[0.6, 0.75, 0.65, 0.9].map((h, i) => (
                              <div
                                key={i}
                                className={
                                  student.status === "atRisk"
                                    ? i === 3
                                      ? "w-full rounded-t-sm bg-[#EF4444]"
                                      : "w-full rounded-t-sm bg-[#EF4444]-container"
                                    : i === 3
                                      ? "w-full rounded-t-sm bg-[#4338CA]"
                                      : "w-full rounded-t-sm bg-[#818CF8]"
                                }
                                style={{ height: `${Math.round(h * 100)}%` }}
                              />
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#F1F5F9]">
                            <div
                              className={
                                student.status === "atRisk"
                                  ? "h-full rounded-full bg-[#EF4444]"
                                  : "h-full rounded-full bg-[#4338CA]"
                              }
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold text-[#0F172A]-variant">
                            {progress}%
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={
                            "inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                          }
                        >
                          {status.label}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-sm font-medium text-[#0F172A]-variant">
                        {student.lastActiveLabel}
                      </td>

                      <td className="px-6 py-5 text-right">
                        <button
                          type="button"
                          aria-label="Row actions"
                          className="rounded-lg p-2 text-[#0F172A]-variant transition-colors hover:text-[#4338CA]"
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

          {/* Pagination */}
          <div className="flex items-center justify-between border-t border-[#F1F5F9] px-6 py-5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#0F172A]-variant transition-colors hover:text-[#4338CA]"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {pageItems.map((item, idx) => {
                if (item === "ellipsis") {
                  return (
                    <span
                      key={`ellipsis-${idx}`}
                      className="mx-1 text-xs text-[#0F172A]-variant"
                    >
                      ...
                    </span>
                  );
                }

                const active = item === currentPage;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPage(item)}
                    className={
                      active
                        ? "h-8 w-8 rounded-full bg-[#4338CA] text-xs font-bold text-white"
                        : "h-8 w-8 rounded-full text-xs font-bold text-[#0F172A]-variant hover:bg-[#F1F5F9]"
                    }
                    aria-current={active ? "page" : undefined}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="inline-flex items-center gap-1 text-sm font-bold text-[#4338CA] transition-colors hover:opacity-80"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </section>

        {/* Footer Meta */}
        <footer className="mt-12 mb-8 flex flex-col items-center justify-between gap-6 border-t border-slate-200 pt-8 text-xs font-medium text-[#0F172A]-variant md:flex-row">
          <p>
            © 2024 The Academic Curator. University Learning Management System
            v4.2.1
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              className="transition-colors hover:text-[#4338CA]"
            >
              Terms of Service
            </button>
            <button
              type="button"
              className="transition-colors hover:text-[#4338CA]"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="transition-colors hover:text-[#4338CA]"
            >
              Accessibility Standards
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
