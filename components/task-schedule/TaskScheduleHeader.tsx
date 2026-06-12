"use client";

import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { useTaskSchedule } from "./TaskScheduleProvider";
import type { ScheduleViewMode } from "./types";

const MODES: ScheduleViewMode[] = ["Month", "Week", "Day"];

export default function TaskScheduleHeader() {
  const { viewMode, setViewMode, monthLabel, goPrevMonth, goNextMonth } =
    useTaskSchedule();

  return (
    <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <span className="text-[10px] font-bold tracking-[0.2em] text-indigo-700 uppercase">
          Schedule
        </span>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
          Task Schedule
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage institutional timelines and course milestones for April 2025.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center rounded-xl bg-slate-100 p-1">
          {MODES.map((mode) => {
            const isActive = viewMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setViewMode(mode)}
                className={
                  isActive
                    ? "rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-sm"
                    : "px-4 py-1.5 text-xs font-medium text-slate-500 transition hover:text-slate-900"
                }
              >
                {mode}
              </button>
            );
          })}
        </div>

        <div className="flex items-center rounded-xl bg-slate-100 px-2">
          <button
            type="button"
            onClick={goPrevMonth}
            aria-label="Previous month"
            className="rounded-lg p-2 text-slate-500 transition hover:text-slate-900"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-4 text-sm font-semibold text-slate-900">
            {monthLabel}
          </span>
          <button
            type="button"
            onClick={goNextMonth}
            aria-label="Next month"
            className="rounded-lg p-2 text-slate-500 transition hover:text-slate-900"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
        >
          <Plus className="h-4 w-4" />
          New Task
        </button>
      </div>
    </header>
  );
}
