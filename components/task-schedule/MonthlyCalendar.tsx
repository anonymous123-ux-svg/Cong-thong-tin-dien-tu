import { CALENDAR_LEGEND, CALENDAR_TASKS } from "./mockData";

const DAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"] as const;

function ToneDot(tone: "primary" | "success" | "tertiary") {
  if (tone === "success") return "bg-emerald-500";
  if (tone === "tertiary") return "bg-amber-700";
  return "bg-indigo-700";
}

function TaskTone(taskTone: "primary" | "success" | "danger") {
  if (taskTone === "success") return "bg-emerald-50 text-emerald-700";
  if (taskTone === "danger") return "bg-amber-50 text-amber-700";
  return "bg-indigo-50 text-indigo-700";
}

type DayCell = {
  key: string;
  dayNumber: number;
  muted?: boolean;
  today?: boolean;
};

const GRID: DayCell[] = [
  { key: "d0", dayNumber: 31, muted: true },
  { key: "d1", dayNumber: 1 },
  { key: "d2", dayNumber: 2 },
  { key: "d3", dayNumber: 3 },
  { key: "d4", dayNumber: 4 },
  { key: "d5", dayNumber: 5, muted: true },
  { key: "d6", dayNumber: 6, muted: true },
  { key: "d7", dayNumber: 14 },
  { key: "d8", dayNumber: 15 },
  { key: "d9", dayNumber: 16, today: true },
  { key: "d10", dayNumber: 17 },
  { key: "d11", dayNumber: 18 },
  { key: "d12", dayNumber: 19, muted: true },
  { key: "d13", dayNumber: 20, muted: true },
  { key: "d14", dayNumber: 21, muted: true },
  { key: "d15", dayNumber: 22, muted: true },
  { key: "d16", dayNumber: 23, muted: true },
  { key: "d17", dayNumber: 24, muted: true },
  { key: "d18", dayNumber: 25, muted: true },
  { key: "d19", dayNumber: 26, muted: true },
  { key: "d20", dayNumber: 27, muted: true },
];

export default function MonthlyCalendar() {
  return (
    <section className="col-span-12 overflow-hidden rounded-3xl border border-slate-200/40 bg-white shadow-sm lg:col-span-8">
      <div className="flex items-center justify-between border-b border-slate-100 bg-white p-6">
        <h3 className="text-lg font-bold text-slate-900">Monthly Calendar</h3>
        <div className="flex items-center gap-2">
          {CALENDAR_LEGEND.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${ToneDot(item.tone)}`} />
              <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/40 py-3 text-center">
        {DAYS.map((d) => (
          <div
            key={d}
            className={
              d === "SAT" || d === "SUN"
                ? "bg-slate-50/60 text-[11px] font-bold text-slate-500"
                : "text-[11px] font-bold text-slate-500"
            }
          >
            {d}
          </div>
        ))}
      </div>

      <div className="grid h-[500px] grid-cols-7 border-t border-slate-100">
        {GRID.map((cell, idx) => {
          const tasks = CALENDAR_TASKS.filter((t) => t.day === cell.dayNumber);
          const showRightBorder = (idx + 1) % 7 !== 0;

          return (
            <div
              key={cell.key}
              className={
                `min-h-[100px] p-2 ` +
                (showRightBorder ? "border-r " : "") +
                "border-b border-slate-100/60" +
                (cell.muted ? " bg-slate-50/40" : "") +
                (cell.today ? " relative bg-indigo-50/50" : "")
              }
            >
              <div className="flex flex-col items-end">
                <span
                  className={
                    cell.today
                      ? "mb-2 text-xs font-bold text-indigo-700"
                      : cell.muted
                        ? "mb-2 text-xs font-semibold text-slate-400"
                        : "mb-2 text-xs font-semibold text-slate-900"
                  }
                >
                  {cell.dayNumber}
                </span>

                {cell.today && (
                  <span className="absolute left-2 top-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-700 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-700" />
                  </span>
                )}

                <div className="w-full space-y-2">
                  {tasks.map((t) => (
                    <div
                      key={t.id}
                      className={`w-full truncate rounded-lg p-1.5 text-[10px] font-bold ${TaskTone(t.tone)}`}
                    >
                      {t.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
