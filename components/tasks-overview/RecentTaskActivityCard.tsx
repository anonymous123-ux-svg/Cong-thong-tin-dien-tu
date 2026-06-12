import Image from "next/image";
import { CheckCircle2, PlusCircle } from "lucide-react";

import Card from "@/components/ui/Card";

import type { RecentActivity } from "./types";

export default function RecentTaskActivityCard({
  rows,
}: {
  rows: RecentActivity[];
}) {
  return (
    <Card className="p-8">
      <h2 className="mb-8 text-lg font-bold text-slate-900">
        Recent Task Activity
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50 text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <th className="pb-5">Activity</th>
              <th className="pb-5">Contributor</th>
              <th className="pb-5">Category</th>
              <th className="pb-5">Timestamp</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {rows.map((row) => {
              const Icon = row.type === "completed" ? CheckCircle2 : PlusCircle;
              const iconClassName =
                row.type === "completed"
                  ? "text-emerald-600"
                  : "text-indigo-700";

              return (
                <tr
                  key={row.id}
                  className="group transition-colors hover:bg-slate-50"
                >
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${iconClassName}`} />
                      <span className="text-sm font-medium text-slate-900">
                        {row.description}
                      </span>
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 overflow-hidden rounded-full bg-slate-100">
                        <Image
                          src={row.contributor.avatarUrl}
                          alt={row.contributor.name}
                          width={28}
                          height={28}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-900">
                        {row.contributor.name}
                      </span>
                    </div>
                  </td>

                  <td className="py-5">
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tight text-slate-500">
                      {row.category}
                    </span>
                  </td>

                  <td className="py-5 text-xs font-medium text-slate-400">
                    {row.timestamp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
