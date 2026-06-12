import { AlertTriangle, ArrowDown, ArrowUpDown } from "lucide-react";

import type { TaskPriority } from "./types";

export default function TaskPriorityBadge({
  priority,
}: {
  priority: TaskPriority;
}) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
        <AlertTriangle className="h-3.5 w-3.5" />
        High
      </span>
    );
  }

  if (priority === "Medium") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-600">
        <ArrowUpDown className="h-3.5 w-3.5" />
        Medium
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-600">
      <ArrowDown className="h-3.5 w-3.5" />
      Low
    </span>
  );
}
