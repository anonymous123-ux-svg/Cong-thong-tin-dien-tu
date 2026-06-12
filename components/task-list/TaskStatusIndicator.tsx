import type { TaskStatus } from "./types";

export default function TaskStatusIndicator({
  status,
}: {
  status: TaskStatus;
}) {
  const dotClassName =
    status === "In Progress"
      ? "bg-indigo-500 animate-pulse"
      : status === "Completed"
        ? "bg-emerald-500"
        : "bg-slate-300";

  const labelClassName =
    status === "Planning" ? "text-on-surface-variant" : "text-on-surface";

  return (
    <div className="flex items-center gap-2">
      <div className={`h-2 w-2 rounded-full ${dotClassName}`} />
      <span className={`text-sm font-medium ${labelClassName}`}>{status}</span>
    </div>
  );
}
