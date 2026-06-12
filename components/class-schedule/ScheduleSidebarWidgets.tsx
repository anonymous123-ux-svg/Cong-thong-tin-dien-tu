import {
  ChevronRight,
  GraduationCap,
  LineChart,
  MessageSquare,
  DoorOpen,
  Users,
  Video,
} from "lucide-react";

import {
  ACADEMIC_EVENTS,
  ATTENDANCE_RATE,
  UPCOMING_DEADLINES,
} from "./mockData";
import ProgressRing from "./ProgressRing";

function DeadlineAccent({
  accent,
}: {
  accent: "error" | "tertiary" | "secondary";
}) {
  const style =
    accent === "error"
      ? { backgroundColor: "#EF4444" }
      : accent === "tertiary"
        ? { backgroundColor: "#D97706" }
        : { backgroundColor: "#10B981" };

  return <div className="h-8 w-1 rounded-full" style={style} />;
}

type ScheduleSidebarWidgetsProps = {
  onJoinCurrentClass?: () => void;
};

export default function ScheduleSidebarWidgets({
  onJoinCurrentClass,
}: ScheduleSidebarWidgetsProps) {
  return (
    <aside className="flex flex-col gap-6">
      {/* Attendance Rate */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-6 flex items-center gap-2 text-sm font-bold text-gray-900">
          <LineChart className="h-5 w-5" style={{ color: "#4338CA" }} />
          Attendance Rate
        </h3>

        <div className="relative flex items-center justify-center">
          <ProgressRing value={ATTENDANCE_RATE.value} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-black text-gray-900">
              {ATTENDANCE_RATE.value.toFixed(1)}%
            </span>
            <span
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#10B981" }}
            >
              {ATTENDANCE_RATE.label}
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] leading-relaxed text-gray-500">
          {ATTENDANCE_RATE.helperText}
        </p>
      </section>

      {/* Upcoming Deadlines */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Upcoming Deadlines
        </h3>
        <div className="space-y-4">
          {UPCOMING_DEADLINES.map((item) => (
            <button
              key={item.id}
              type="button"
              className="cursor-pointer flex w-full items-center gap-4 rounded-xl p-3 text-left transition-colors hover:bg-gray-50"
            >
              <DeadlineAccent accent={item.accent} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-bold text-gray-900">
                  {item.title}
                </p>
                <p
                  className="text-[10px] font-medium"
                  style={{
                    color:
                      item.accent === "error"
                        ? "#EF4444"
                        : item.accent === "tertiary"
                          ? "#D97706"
                          : "#6B7280",
                  }}
                >
                  {item.subtitle}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </button>
          ))}
        </div>
      </section>

      {/* Academic Events */}
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Academic Events
        </h3>
        <div className="space-y-4">
          {ACADEMIC_EVENTS.map((item) => {
            const Icon = item.icon === "graduation" ? GraduationCap : Users;
            const iconStyle =
              item.variant === "primary"
                ? { backgroundColor: "#EEF2FF", color: "#4338CA" }
                : { backgroundColor: "#ECFDF5", color: "#10B981" };

            return (
              <div key={item.id} className="flex gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={iconStyle}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold text-gray-900">
                    {item.title}
                  </p>
                  <p className="text-[10px] text-gray-500">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick Actions */}
      <section
        className="rounded-2xl bg-white p-6 shadow-sm"
        style={{ border: "1px solid rgba(67,56,202,0.1)" }}
      >
        <h3
          className="mb-4 text-xs font-bold uppercase tracking-widest"
          style={{ color: "#4338CA" }}
        >
          Quick Actions
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onJoinCurrentClass}
            className="cursor-pointer col-span-2 flex items-center justify-center gap-3 rounded-2xl p-4 text-xs font-bold text-white transition-all duration-150 hover:scale-[1.02] active:scale-95"
            style={{
              backgroundColor: "#4338CA",
              boxShadow: "0 4px 14px rgba(67,56,202,0.3)",
            }}
          >
            <DoorOpen className="h-5 w-5" />
            Join Current Class
          </button>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-[10px] font-bold transition hover:bg-indigo-50"
            style={{
              border: "1px solid rgba(67,56,202,0.2)",
              color: "#4338CA",
            }}
          >
            <MessageSquare className="h-4 w-4" />
            Message Prof
          </button>

          <button
            type="button"
            className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-center text-[10px] font-bold transition hover:bg-indigo-50"
            style={{
              border: "1px solid rgba(67,56,202,0.2)",
              color: "#4338CA",
            }}
          >
            <Video className="h-4 w-4" />
            Office Hours
          </button>
        </div>
      </section>
    </aside>
  );
}
