import { Check, Lock, Play } from "lucide-react";

import { cn } from "@/lib/utils";
import type { ModuleProgress } from "./types";

type Props = {
  module: ModuleProgress;
};

function StatusIcon({ status }: { status: ModuleProgress["status"] }) {
  if (status === "completed") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check className="h-5 w-5" aria-hidden="true" />
      </div>
    );
  }

  if (status === "inProgress") {
    return (
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
        <Play className="h-5 w-5 fill-white" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
      <Lock className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}

export default function ModuleProgressCard({ module }: Props) {
  const isLocked = module.status === "locked";
  const percentLabel = `${module.percent}%`;

  const progressValueTone =
    module.status === "completed" ? "emerald" : "indigo";

  return (
    <div
      className={
        isLocked
          ? "flex items-center gap-6 rounded-xl bg-slate-50 p-6 opacity-60"
          : "flex items-center gap-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
      }
    >
      <StatusIcon status={module.status} />

      <div className="min-w-0 flex-1">
        <h4 className="truncate text-base font-medium text-slate-900">
          {module.title}
        </h4>
        <p className="mt-1 truncate text-sm text-slate-500">
          {module.subtitle}
        </p>
      </div>

      <div className="shrink-0 text-right">
        <p
          className={
            module.status === "completed"
              ? "text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-emerald-700"
              : module.status === "inProgress"
                ? "text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-indigo-600"
                : "text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
          }
        >
          {percentLabel}
        </p>

        <progress
          value={module.percent}
          max={100}
          aria-label={`${module.title} completion`}
          className={cn(
            "mt-2 h-2 w-32 overflow-hidden rounded-full bg-slate-100",
            "[&::-webkit-progress-bar]:bg-slate-100",
            "[&::-webkit-progress-value]:rounded-full",
            "[&::-moz-progress-bar]:rounded-full",
            progressValueTone === "emerald"
              ? "[&::-webkit-progress-value]:bg-emerald-600 [&::-moz-progress-bar]:bg-emerald-600"
              : "[&::-webkit-progress-value]:bg-indigo-600 [&::-moz-progress-bar]:bg-indigo-600",
          )}
        />
      </div>
    </div>
  );
}
