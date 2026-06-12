"use client";

import { cn } from "@/lib/utils";
import { WEEK_SCHEDULE_EVENTS, WEEK_SCHEDULE_TIMELINE } from "./mockData";
import type {
  ScheduleDay,
  WeekScheduleEvent,
  WeekScheduleEventVariant,
} from "./types";

// ─── Colour map per variant ───────────────────────────────────────────────────
const VARIANT_BG: Record<WeekScheduleEventVariant, string> = {
  primary: "#3730A3", // deep indigo  — online / lecture
  tertiary: "#92400E", // amber-brown  — quiz / office hours
  secondary: "#065F46", // emerald      — lab / in-person
};

// ─── Time helpers ─────────────────────────────────────────────────────────────
/** "13:30" → 810 (minutes since midnight) */
function hhmm(str: string): number {
  const [hh, mm] = str.split(":").map(Number);
  return (hh ?? 0) * 60 + (mm ?? 0);
}

const { startHour, hourHeightPx } = WEEK_SCHEDULE_TIMELINE;
const DAY_START_MIN = startHour * 60;
const DAY_END_HOUR = startHour + WEEK_SCHEDULE_TIMELINE.totalHours;
const TOTAL_H = WEEK_SCHEDULE_TIMELINE.totalHours * hourHeightPx;
const HOURS = Array.from(
  { length: WEEK_SCHEDULE_TIMELINE.totalHours },
  (_, i) => startHour + i,
);

function topPx(startMin: number) {
  return ((startMin - DAY_START_MIN) / 60) * hourHeightPx;
}
function heightPx(durMin: number) {
  return Math.max((durMin / 60) * hourHeightPx, 36);
}

function formatHour(h: number) {
  const p = h < 12 ? "AM" : "PM";
  const d = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${d} ${p}`;
}

// ─── Current-time red indicator ───────────────────────────────────────────────
function NowLine() {
  const nowMin = hhmm(WEEK_SCHEDULE_TIMELINE.currentTime);
  const top = topPx(nowMin);
  return (
    <div
      className="pointer-events-none absolute inset-x-0 z-20 flex items-center"
      style={{ top }}
    >
      <div className="h-2.5 w-2.5 shrink-0 rounded-full border-2 border-white bg-red-500 shadow" />
      <div className="h-px flex-1 bg-red-500" />
    </div>
  );
}

// ─── Overlap resolver ─────────────────────────────────────────────────────────
type Positioned = {
  event: WeekScheduleEvent;
  colOffset: number;
  colTotal: number;
};

function resolveOverlaps(events: WeekScheduleEvent[]): Positioned[] {
  const sorted = [...events].sort(
    (a, b) => hhmm(a.startTime) - hhmm(b.startTime),
  );
  const result: Positioned[] = [];
  const groups: WeekScheduleEvent[][] = [];

  for (const ev of sorted) {
    const start = hhmm(ev.startTime);
    const end = hhmm(ev.endTime);
    const group = groups.find((g) =>
      g.some((e) => start < hhmm(e.endTime) && end > hhmm(e.startTime)),
    );
    if (group) group.push(ev);
    else groups.push([ev]);
  }

  for (const group of groups) {
    group.forEach((ev, i) =>
      result.push({ event: ev, colOffset: i, colTotal: group.length }),
    );
  }
  return result;
}

// ─── Single event block ───────────────────────────────────────────────────────
function EventBlock({ event, colOffset, colTotal }: Positioned) {
  const startMin = hhmm(event.startTime);
  const endMin = hhmm(event.endTime);
  const top = topPx(startMin);
  const height = heightPx(endMin - startMin);
  const bg = VARIANT_BG[event.variant];

  return (
    <div
      className="absolute overflow-hidden rounded-lg cursor-pointer transition-opacity hover:opacity-90"
      style={{
        top,
        height,
        left: `calc(${(colOffset / colTotal) * 100}% + 2px)`,
        width: `calc(${100 / colTotal}% - 4px)`,
        backgroundColor: bg,
        color: "#fff",
        zIndex: 10,
      }}
    >
      <div className="h-full w-full overflow-hidden p-1.5 flex flex-col gap-0.5">
        {/* Time */}
        <span className="shrink-0 text-[9px] font-semibold leading-tight opacity-75 truncate">
          {event.label}
        </span>

        {/* Title */}
        <span
          className="text-[11px] font-bold leading-tight"
          style={
            {
              display: "-webkit-box",
              WebkitLineClamp: height > 80 ? 4 : height > 52 ? 2 : 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              wordBreak: "break-word",
            } as React.CSSProperties
          }
        >
          {event.title}
        </span>

        {/* Badge (e.g. "Ongoing") */}
        {event.badge && height >= 72 && (
          <span className="mt-auto shrink-0 text-[8px] font-bold uppercase tracking-widest opacity-75">
            {event.badge}
          </span>
        )}

        {/* Participants avatars */}
        {event.participants &&
          event.participants.length > 0 &&
          height >= 80 && (
            <div className="mt-auto flex shrink-0 items-center gap-0.5">
              {event.participants.slice(0, 3).map((p) => (
                <img
                  key={p.id}
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-5 w-5 rounded-full border border-white/40 object-cover"
                />
              ))}
            </div>
          )}
      </div>
    </div>
  );
}

// ─── Day column ───────────────────────────────────────────────────────────────
function DayColumn({
  events,
  isToday,
}: {
  events: WeekScheduleEvent[];
  isToday: boolean;
}) {
  const positioned = resolveOverlaps(events);

  return (
    <div
      className="relative border-l border-gray-100"
      style={{ height: TOTAL_H }}
    >
      {/* Hour grid lines */}
      {HOURS.map((h) => (
        <div
          key={h}
          className="absolute inset-x-0 border-t border-gray-100"
          style={{ top: topPx(h * 60) }}
        />
      ))}

      {isToday && <NowLine />}

      {positioned.map((p) => (
        <EventBlock key={p.event.id} {...p} />
      ))}
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function WeeklyScheduleGrid({
  days,
  activeDayId,
  onDayChange,
}: {
  days: ScheduleDay[];
  activeDayId: string;
  onDayChange: (id: string) => void;
}) {
  // Build map: dayId → events
  const eventMap = new Map<string, WeekScheduleEvent[]>(
    days.map((d) => [d.id, []]),
  );
  WEEK_SCHEDULE_EVENTS.forEach((ev) => {
    eventMap.get(ev.dayId)?.push(ev);
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-white">
      {/* Day header */}
      <div
        className="grid border-b border-gray-100"
        style={{ gridTemplateColumns: "52px repeat(7, 1fr)" }}
      >
        <div />
        {days.map((day) => {
          const active = day.id === activeDayId;
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onDayChange(day.id)}
              className="flex flex-col items-center gap-1 py-3 transition-colors hover:bg-gray-50"
            >
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                {day.weekdayShort}
              </span>
              <div
                className={cn(
                  "cursor-pointer flex h-8 w-8 items-center justify-center rounded-lg text-sm font-semibold",
                  active ? "text-white" : "text-gray-600 hover:bg-gray-100",
                )}
                style={active ? { backgroundColor: "#4338CA" } : {}}
              >
                {day.dayOfMonth}
              </div>
              {active && (
                <div
                  className="h-1 w-1 rounded-full"
                  style={{ backgroundColor: "#4338CA" }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Scrollable grid */}
      <div className="overflow-y-auto">
        <div
          className="relative grid"
          style={{
            gridTemplateColumns: "52px repeat(7, 1fr)",
            height: TOTAL_H,
          }}
        >
          {/* Hour labels */}
          <div className="relative border-r border-gray-100">
            {HOURS.map((h) => (
              <div
                key={h}
                className="absolute right-2 text-[10px] font-semibold text-gray-400"
                style={{ top: topPx(h * 60) - 7 }}
              >
                {formatHour(h)}
              </div>
            ))}
          </div>

          {/* Day columns */}
          {days.map((day) => (
            <DayColumn
              key={day.id}
              events={eventMap.get(day.id) ?? []}
              isToday={day.id === activeDayId}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
