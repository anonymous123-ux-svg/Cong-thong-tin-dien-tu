import { Plus } from "lucide-react";

import type { SectionRow } from "./types";

function statusClassName(tone: SectionRow["status"]["tone"]) {
  return tone === "secondary"
    ? "bg-teal-100 text-teal-700"
    : "bg-indigo-100 text-indigo-700";
}

function instructorBadgeClassName(tone: SectionRow["instructor"]["tone"]) {
  return tone === "primary"
    ? "bg-indigo-100 text-indigo-700"
    : "bg-indigo-50 text-indigo-600";
}

function occupancyBarClassName(tone: SectionRow["occupancy"]["tone"]) {
  return tone === "secondary" ? "bg-teal-500" : "bg-indigo-600";
}

function occupancyWidthClassName(percent: number) {
  if (percent >= 90) return "w-[95%]";
  if (percent >= 70) return "w-[70%]";
  if (percent >= 50) return "w-[50%]";
  return "w-[30%]";
}

type AvailableSectionsCardProps = {
  rows: SectionRow[];
};

export default function AvailableSectionsCard({
  rows,
}: AvailableSectionsCardProps) {
  return (
    <section className="w-full rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Available Sections
          </h3>
          <p className="text-sm text-slate-500">
            Live monitoring of active class capacity
          </p>
        </div>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 text-sm font-bold text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
        >
          <Plus className="h-4 w-4" />
          Create New Section
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3 text-left">
          <thead>
            <tr className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <th className="pb-2 pl-4">Class Name</th>
              <th className="pb-2">Instructor</th>
              <th className="pb-2">Occupancy</th>
              <th className="pb-2">Schedule</th>
              <th className="pb-2 pr-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {rows.map((row) => {
              const percent = Math.round(
                (row.occupancy.current / row.occupancy.max) * 100,
              );
              const widthClassName = occupancyWidthClassName(percent);

              return (
                <tr
                  key={row.id}
                  className="group cursor-pointer bg-slate-50 transition-colors hover:bg-slate-100"
                >
                  <td className="rounded-l-2xl py-4 pl-4 font-bold text-slate-900">
                    {row.name}
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${instructorBadgeClassName(row.instructor.tone)}`}
                      >
                        {row.instructor.initials}
                      </div>
                      <span>{row.instructor.name}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-full max-w-25 overflow-hidden rounded-full bg-slate-200">
                        <div
                          className={`h-full ${occupancyBarClassName(row.occupancy.tone)} ${widthClassName}`}
                        />
                      </div>
                      <span className="font-medium text-slate-600">
                        {row.occupancy.current}/{row.occupancy.max}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 text-slate-500">{row.schedule}</td>
                  <td className="rounded-r-2xl py-4 pr-4 text-right">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-bold ${statusClassName(row.status.tone)}`}
                    >
                      {row.status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
