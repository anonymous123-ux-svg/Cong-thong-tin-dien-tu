import Link from "next/link";

import { cn } from "@/lib/utils";

import type { ClassDetailTabKey } from "./types";

const TABS: Array<{ key: ClassDetailTabKey; label: string }> = [
  { key: "overview", label: "Overview" },
  { key: "roster", label: "Roster" },
  { key: "schedule", label: "Schedule" },
];

export default function ClassTabs({
  activeTab,
}: {
  activeTab: ClassDetailTabKey;
}) {
  return (
    <div className="mb-8 flex gap-10 border-b border-slate-200">
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;
        const href =
          tab.key === "overview"
            ? "/class/class-detail"
            : tab.key === "schedule"
              ? "/class/schedule"
              : `/class/class-detail?tab=${tab.key}`;

        return (
          <Link
            key={tab.key}
            href={href}
            className={cn(
              "pb-4 text-sm transition-colors",
              isActive
                ? "border-b-2 border-indigo-700 font-bold text-indigo-700"
                : "font-medium text-slate-500 hover:text-indigo-700",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
