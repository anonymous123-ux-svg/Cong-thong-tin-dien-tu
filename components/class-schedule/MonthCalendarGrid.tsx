import { cn } from "@/lib/utils";

import { MONTH_CALENDAR_CELLS, MONTH_DAY_LABELS } from "./mockData";
import type {
  MonthCalendarCell,
  MonthCalendarEvent,
  MonthCalendarEventVariant,
} from "./types";

// Colors matching design image:
// blue  → indigo pills  (#EEF2FF bg / #4338CA text)
// green → emerald pills (#D1FAE5 bg / #059669 text)
// orange → amber pills  (#FEF3C7 bg / #D97706 text)
// purple → violet pills (#EDE9FE bg / #7C3AED text)

function eventStyles(variant: MonthCalendarEventVariant): React.CSSProperties {
  if (variant === "blue")
    return { backgroundColor: "#EEF2FF", color: "#4338CA" };
  if (variant === "green")
    return { backgroundColor: "#D1FAE5", color: "#059669" };
  if (variant === "orange")
    return { backgroundColor: "#FEF3C7", color: "#D97706" };
  return { backgroundColor: "#EDE9FE", color: "#7C3AED" };
}

function DayEventPill({ event }: { event: MonthCalendarEvent }) {
  return (
    <div
      className="truncate rounded-md px-2 py-0.5 text-[10px] font-bold"
      style={eventStyles(event.variant)}
    >
      {event.label}
    </div>
  );
}

function buildMonthCells(
  year: number,
  monthIndex: number,
): MonthCalendarCell[] {
  const firstDayOfWeek = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: MonthCalendarCell[] = [];

  for (let i = 0; i < firstDayOfWeek; i += 1) {
    cells.push({ kind: "empty" });
  }

  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber += 1) {
    cells.push({ kind: "day", dayNumber });
  }

  const totalCells = Math.ceil(cells.length / 7) * 7;
  while (cells.length < totalCells) {
    cells.push({ kind: "empty" });
  }

  return cells;
}

export default function MonthCalendarGrid({
  year,
  monthIndex,
}: {
  year: number;
  monthIndex: number;
}) {
  const cells =
    year === 2025 && monthIndex === 3
      ? MONTH_CALENDAR_CELLS
      : buildMonthCells(year, monthIndex);
  const rowCount = Math.ceil(cells.length / 7);

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Day-of-week header */}
      <div className="grid grid-cols-7 border-b border-gray-100 bg-gray-50/60">
        {MONTH_DAY_LABELS.map((label) => (
          <div
            key={label}
            className="py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400"
          >
            {label}
          </div>
        ))}
      </div>

      {/* Calendar cells */}
      <div className="grid grid-cols-7 auto-rows-[140px]">
        {cells.map((cell, index) => {
          const col = index % 7;
          const row = Math.floor(index / 7);
          const isLastCol = col === 6;
          const isLastRow = row === rowCount - 1;

          if (cell.kind === "empty") {
            return (
              <div
                key={`empty-${index}`}
                className={cn(
                  "bg-gray-50/40",
                  !isLastCol && "border-r border-gray-100",
                  !isLastRow && "border-b border-gray-100",
                )}
              />
            );
          }

          const isSelected = cell.isSelected ?? false;

          return (
            <div
              key={`day-${year}-${monthIndex}-${cell.dayNumber}`}
              className={cn(
                "group relative p-3 transition-all hover:bg-indigo-50/30",
                !isLastCol && "border-r border-gray-100",
                !isLastRow && "border-b border-gray-100",
                isSelected && "bg-indigo-50/60",
              )}
              style={
                isSelected
                  ? { boxShadow: "inset 0 0 0 2px rgba(67,56,202,0.2)" }
                  : {}
              }
            >
              {/* Day number */}
              <span
                className={cn(
                  "absolute right-3 top-3 text-sm font-medium",
                  isSelected ? "font-bold" : "text-slate-400",
                )}
                style={isSelected ? { color: "#4338CA" } : {}}
              >
                {cell.dayNumber}
              </span>

              {/* Event pills */}
              {cell.events?.length ? (
                <div className="mt-6 flex flex-col gap-1.5">
                  {cell.events.map((event) => (
                    <DayEventPill key={event.id} event={event} />
                  ))}
                  {cell.moreLabel ? (
                    <div className="px-2 text-[9px] font-semibold text-slate-400">
                      {cell.moreLabel}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
