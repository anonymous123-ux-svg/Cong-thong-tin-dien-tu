import Image from "next/image";

import type { RecentActivityItem } from "./types";

function badgeClassName(tone: RecentActivityItem["badge"]["tone"]) {
  return tone === "secondary"
    ? "bg-teal-100 text-teal-700"
    : "bg-indigo-100 text-indigo-700";
}

type RecentActivityCardProps = {
  items: RecentActivityItem[];
};

export default function RecentActivityCard({ items }: RecentActivityCardProps) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <h3 className="mb-8 text-xl font-bold text-slate-900">
        Recent Class Activity
      </h3>

      <div className="space-y-1">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 rounded-2xl px-4 py-4 transition-colors hover:bg-slate-50"
          >
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
              <Image
                src={item.avatarUrl}
                alt={`${item.name} profile`}
                width={40}
                height={40}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-900">
                {item.name}{" "}
                <span className="font-normal text-slate-500">
                  {item.action}
                </span>
              </p>
              <p className="text-[11px] font-medium text-slate-400">
                {item.timeAgo}
              </p>
            </div>

            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${badgeClassName(item.badge.tone)}`}
            >
              {item.badge.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
