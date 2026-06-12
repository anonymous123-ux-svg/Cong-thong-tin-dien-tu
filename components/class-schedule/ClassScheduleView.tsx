"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  FlaskConical,
  MapPin,
  PlayCircle,
  Video,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { SCHEDULE_DAYS, SCHEDULE_TITLE, TIMELINE_ROWS } from "./mockData";
import type { ScheduleMode, TimelineEvent, TimelineRow } from "./types";
import WeeklyScheduleGrid from "@/components/class-schedule/WeeklyScheduleGrid";
import MonthCalendarGrid from "./MonthCalendarGrid";

function formatMonthLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function shiftMonth(date: Date, delta: number) {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function TimelineMetaIcon({
  icon,
  className,
}: {
  icon: TimelineEvent["metaLeft"]["icon"];
  className?: string;
}) {
  const Icon =
    icon === "clock"
      ? Clock
      : icon === "video"
        ? Video
        : icon === "science"
          ? FlaskConical
          : MapPin;

  return <Icon className={cn("h-4 w-4", className)} />;
}

function EventCard({ event }: { event: TimelineEvent }) {
  if (event.kind === "online") {
    return (
      <div
        className="relative rounded-2xl border-l-4 p-6"
        style={{ borderColor: "#4338CA", backgroundColor: "#EEF2FF" }}
      >
        <div
          className="absolute -left-1 top-6 h-2 w-2 animate-ping rounded-full"
          style={{ backgroundColor: "#4338CA" }}
        />
        <div className="flex items-start justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{ backgroundColor: "#C7D2FE", color: "#4338CA" }}
              >
                Online
              </span>
              <span
                className="text-[10px] font-medium"
                style={{ color: "#4338CA" }}
              >
                Ongoing now
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <TimelineMetaIcon icon={event.metaLeft.icon} />
                {event.metaLeft.label}
              </div>
              {event.metaRight && (
                <div className="flex items-center gap-1.5">
                  <TimelineMetaIcon icon={event.metaRight.icon} />
                  {event.metaRight.label}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (event.kind === "quiz") {
    return (
      <div
        className="rounded-2xl border-l-4 bg-gray-50/50 p-6 opacity-75"
        style={{ borderColor: "#D97706" }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span
                className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
                style={{ backgroundColor: "#FEF3C7", color: "#D97706" }}
              >
                Quiz
              </span>
              <CheckCircle2 className="h-5 w-5" style={{ color: "#10B981" }} />
            </div>
            <h3 className="truncate text-base font-bold text-gray-900">
              {event.title}
            </h3>
            <p className="mt-1 text-xs text-gray-500">{event.metaLeft.label}</p>
          </div>
          <span
            className="shrink-0 text-xs font-semibold"
            style={{ color: "#10B981" }}
          >
            Completed
          </span>
        </div>
      </div>
    );
  }

  if (event.kind === "in-person") {
    return (
      <div
        className="rounded-2xl border-l-4 p-6"
        style={{ borderColor: "#10B981", backgroundColor: "#F0FDF4" }}
      >
        <div className="mb-2 flex items-center gap-2">
          <span
            className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
            style={{ backgroundColor: "#D1FAE5", color: "#059669" }}
          >
            In-Person
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <TimelineMetaIcon icon={event.metaLeft.icon} />
            {event.metaLeft.label}
          </div>
          {event.metaRight && (
            <div className="flex items-center gap-1.5">
              <TimelineMetaIcon icon={event.metaRight.icon} />
              {event.metaRight.label}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border-l-4 p-6"
      style={{ borderColor: "#FB923C", backgroundColor: "#FFF7ED" }}
    >
      <div className="mb-2 flex items-center gap-2">
        <span
          className="rounded px-2 py-0.5 text-[10px] font-bold uppercase"
          style={{ backgroundColor: "#FFEDD5", color: "#EA580C" }}
        >
          Consultation
        </span>
      </div>
      <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
      <p className="mt-2 text-xs text-gray-500">{event.metaLeft.label}</p>
    </div>
  );
}

function TimelineRowView({ row }: { row: TimelineRow }) {
  if (row.type === "slot") {
    return (
      <div className="grid grid-cols-[80px_1fr] items-start gap-6">
        <span className="py-1 text-xs font-bold text-gray-400">
          {row.timeLabel}
        </span>
        <div className="mt-3 h-px bg-gray-100" />
      </div>
    );
  }

  if (row.type === "break") {
    return (
      <div className="grid grid-cols-[80px_1fr] items-start gap-6">
        <span className="py-1 text-xs font-bold text-gray-400">
          {row.timeLabel}
        </span>
        <div className="flex items-center gap-4 py-1">
          <div className="h-px flex-1 border-t border-dashed border-slate-200" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">
            {row.label}
          </span>
          <div className="h-px flex-1 border-t border-dashed border-slate-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="relative grid grid-cols-[80px_1fr] items-start gap-6">
      <span className="py-1 text-xs font-bold text-gray-400">
        {row.timeLabel}
      </span>
      <EventCard event={row.event} />
    </div>
  );
}

export default function ClassScheduleView({
  mode,
  onModeChange,
  onJoinLiveLecture,
}: {
  mode: ScheduleMode;
  onModeChange: (mode: ScheduleMode) => void;
  onJoinLiveLecture?: () => void;
}) {
  const [monthCursor, setMonthCursor] = useState(() => new Date(2025, 3, 1));
  const [activeDayId, setActiveDayId] = useState(
    SCHEDULE_DAYS.find((d) => d.isActive)?.id ?? SCHEDULE_DAYS[0]?.id ?? "sun",
  );

  const days = useMemo(
    () =>
      SCHEDULE_DAYS.map((day) => ({
        ...day,
        isActive: day.id === activeDayId,
      })),
    [activeDayId],
  );

  return (
    <>
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                {mode === "month"
                  ? formatMonthLabel(monthCursor)
                  : SCHEDULE_TITLE.monthLabel}
              </h2>

              {mode === "month" ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      setMonthCursor((prev) => shiftMonth(prev, -1))
                    }
                    className="cursor-pointer rounded-full p-2 text-slate-500 transition-colors hover:bg-gray-100"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setMonthCursor((prev) => shiftMonth(prev, 1))
                    }
                    className="cursor-pointer rounded-full p-2 text-slate-500 transition-colors hover:bg-gray-100"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              ) : null}
            </div>
            <p className="text-sm font-medium text-gray-500">
              {SCHEDULE_TITLE.semesterLabel} • {SCHEDULE_TITLE.weekLabel}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-full bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => onModeChange("day")}
                className={cn(
                  "cursor-pointer rounded-full px-6 py-2 text-xs font-bold transition-all",
                  mode === "day"
                    ? "bg-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800",
                )}
                style={mode === "day" ? { color: "#4338CA" } : {}}
              >
                Day
              </button>
              <button
                type="button"
                onClick={() => onModeChange("week")}
                className={cn(
                  "cursor-pointer rounded-full px-6 py-2 text-xs font-medium transition-all",
                  mode === "week"
                    ? "bg-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800",
                )}
                style={mode === "week" ? { color: "#4338CA" } : {}}
              >
                Week
              </button>
              <button
                type="button"
                onClick={() => onModeChange("month")}
                className={cn(
                  "cursor-pointer rounded-full px-6 py-2 text-xs font-medium transition-all",
                  mode === "month"
                    ? "bg-white shadow-sm"
                    : "text-gray-500 hover:text-gray-800",
                )}
                style={mode === "month" ? { color: "#4338CA" } : {}}
              >
                Month
              </button>
            </div>

            <button
              type="button"
              onClick={onJoinLiveLecture}
              className="cursor-pointer inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              style={{ backgroundColor: "#4338CA" }}
              aria-label="Join live lecture"
            >
              <PlayCircle className="h-4 w-4" />
              Join Live Lecture
            </button>
          </div>
        </div>

        {mode === "day" ? (
          <div className="no-scrollbar flex items-center justify-between overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day.id}
                type="button"
                onClick={() => setActiveDayId(day.id)}
                className="group flex min-w-[70px] cursor-pointer flex-col items-center gap-2 p-2"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  {day.weekdayShort}
                </span>
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-semibold transition-all",
                    day.isActive
                      ? "text-white"
                      : "hover:bg-gray-100 text-gray-700",
                  )}
                  style={
                    day.isActive
                      ? {
                          backgroundColor: "#4338CA",
                          boxShadow: "0 4px 14px rgba(67,56,202,0.3)",
                        }
                      : {}
                  }
                >
                  {day.dayOfMonth}
                </div>
                {day.isActive && (
                  <div
                    className="mt-1 h-1 w-1 rounded-full"
                    style={{ backgroundColor: "#4338CA" }}
                  />
                )}
              </button>
            ))}
          </div>
        ) : null}
      </section>

      <section
        className={cn(
          "relative flex-1 overflow-hidden shadow-sm rounded-2xl bg-white",
          mode !== "week" && mode !== "month" ? "p-8" : "",
        )}
      >
        {mode === "month" ? (
          <MonthCalendarGrid
            year={monthCursor.getFullYear()}
            monthIndex={monthCursor.getMonth()}
          />
        ) : mode === "week" ? (
          <WeeklyScheduleGrid
            days={days}
            activeDayId={activeDayId}
            onDayChange={setActiveDayId}
          />
        ) : (
          <>
            <div className="space-y-12">
              {TIMELINE_ROWS.map((row) => (
                <TimelineRowView key={row.id} row={row} />
              ))}
            </div>

            <div className="pointer-events-none absolute left-20 right-0 top-52 z-10 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full border-2 border-white bg-red-500 shadow-sm" />
              <div className="h-0.5 flex-1 bg-red-500" />
            </div>
          </>
        )}
      </section>
    </>
  );
}
