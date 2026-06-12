"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Card from "@/components/ui/Card";
import type { DeadlineCategory } from "./types";

export type CalendarDate = { year: number; month: number; day: number };

type MiniCalendarCardProps = {
  value?: CalendarDate | null;
  onChange?: (value: CalendarDate | null) => void;
};

// Deadline dots per day (day number → category)
const DEADLINE_DOTS: Record<number, DeadlineCategory[]> = {
  6: ["Critical"],
  18: ["Regular"],
  22: ["Major", "Major"],
  25: ["Critical"],
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DOT_COLOR: Record<DeadlineCategory, string> = {
  Critical: "bg-red-500",
  Major: "bg-amber-400",
  Regular: "bg-indigo-500",
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  // 0=Sun, convert to Mon-start: Mon=0..Sun=6
  const day = new Date(year, month, 1).getDay();
  return (day + 6) % 7;
}

export default function MiniCalendarCard({
  value,
  onChange,
}: MiniCalendarCardProps) {
  const today = new Date();
  const isControlled = value !== undefined;
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const prevMonthDays = getDaysInMonth(
    viewYear,
    viewMonth - 1 < 0 ? 11 : viewMonth - 1,
  );

  const goToPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
    if (!isControlled) setSelectedDay(null);
    onChange?.(null);
  };

  const goToNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
    if (!isControlled) setSelectedDay(null);
    onChange?.(null);
  };

  const isToday = (day: number) =>
    day === today.getDate() &&
    viewMonth === today.getMonth() &&
    viewYear === today.getFullYear();

  const selectCell = (cell: {
    day: number;
    type: "prev" | "current" | "next";
  }) => {
    if (cell.type === "current") {
      if (!isControlled) setSelectedDay(cell.day);
      onChange?.({ year: viewYear, month: viewMonth, day: cell.day });
      return;
    }

    if (cell.type === "prev") {
      const nextMonth = viewMonth === 0 ? 11 : viewMonth - 1;
      const nextYear = viewMonth === 0 ? viewYear - 1 : viewYear;
      setViewMonth(nextMonth);
      setViewYear(nextYear);
      if (!isControlled) setSelectedDay(cell.day);
      onChange?.({ year: nextYear, month: nextMonth, day: cell.day });
      return;
    }

    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    setViewMonth(nextMonth);
    setViewYear(nextYear);
    if (!isControlled) setSelectedDay(cell.day);
    onChange?.({ year: nextYear, month: nextMonth, day: cell.day });
  };

  // Build calendar grid: 6 rows × 7 cols
  const cells: Array<{ day: number; type: "prev" | "current" | "next" }> = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, type: "prev" });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, type: "current" });
  }
  while (cells.length % 7 !== 0) {
    cells.push({
      day: cells.length - daysInMonth - firstDay + 1,
      type: "next",
    });
  }

  return (
    <Card className="rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-800">
          {MONTHS[viewMonth]} {viewYear}
        </h4>
        <div className="flex gap-0.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={goToPrev}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={goToNext}
            className="rounded-md p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Day-of-week headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span
            key={i}
            className="text-[10px] font-bold uppercase tracking-widest text-slate-400"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {cells.map((cell, idx) => {
          const isCurrent = cell.type === "current";
          const dots = isCurrent ? (DEADLINE_DOTS[cell.day] ?? []) : [];
          const todayDay = isToday(cell.day) && isCurrent;
          const effectiveSelected = isControlled
            ? (value ?? null)
            : selectedDay;
          const selected = isCurrent
            ? typeof effectiveSelected === "number"
              ? effectiveSelected === cell.day
              : effectiveSelected
                ? effectiveSelected.year === viewYear &&
                  effectiveSelected.month === viewMonth &&
                  effectiveSelected.day === cell.day
                : false
            : false;

          return (
            <button
              key={idx}
              type="button"
              aria-label={
                cell.type === "current"
                  ? `Select day ${cell.day}`
                  : cell.type === "prev"
                    ? `Go to previous month, day ${cell.day}`
                    : `Go to next month, day ${cell.day}`
              }
              onClick={() => selectCell(cell)}
              className={[
                "relative mx-auto flex h-7 w-7 flex-col items-center justify-center rounded-full text-xs font-semibold transition-all",
                !isCurrent
                  ? "text-slate-300 hover:bg-slate-100"
                  : selected
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : todayDay
                      ? "text-slate-800 ring-2 ring-indigo-200 hover:bg-slate-100"
                      : "text-slate-700 hover:bg-slate-100",
              ].join(" ")}
            >
              {cell.day}
              {dots.length > 0 && (
                <span className="absolute -bottom-0.5 left-1/2 flex -translate-x-1/2 gap-0.5">
                  {dots.map((cat, di) => (
                    <span
                      key={di}
                      className={`h-1 w-1 rounded-full ${DOT_COLOR[cat]}`}
                    />
                  ))}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-5">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Critical Deadlines
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Major Milestone
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 rounded-full bg-indigo-500" />
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            Regular Task
          </span>
        </div>
      </div>
    </Card>
  );
}
