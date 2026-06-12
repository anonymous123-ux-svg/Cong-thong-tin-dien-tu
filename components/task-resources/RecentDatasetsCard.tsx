"use client";

import { ArrowRight, MoreVertical } from "lucide-react";

import { RESOURCE_DATASETS } from "./mockData";
import { useTaskResources } from "./TaskResourcesProvider";

function ToneClasses(tone: "indigo" | "green" | "amber") {
  if (tone === "green") return "bg-emerald-100 text-emerald-700";
  if (tone === "amber") return "bg-amber-100 text-amber-700";
  return "bg-indigo-100 text-[#3333CC]";
}

export default function RecentDatasetsCard() {
  const { query } = useTaskResources();

  const normalizedQuery = query.trim().toLowerCase();
  const visible = normalizedQuery
    ? RESOURCE_DATASETS.filter((d) =>
        d.title.toLowerCase().includes(normalizedQuery),
      )
    : RESOURCE_DATASETS;

  return (
    <section className="rounded-3xl bg-white p-8 shadow-sm md:col-span-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          Recent Datasets
        </h3>
        <button
          type="button"
          onClick={() => {
            // Template behavior: no-op.
          }}
          className="inline-flex items-center gap-1 text-sm font-bold text-[#3333CC] transition hover:underline"
        >
          View all <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        {visible.map((d) => {
          const Icon = d.icon;
          const tone = ToneClasses(d.tone);

          return (
            <div
              key={d.id}
              className="flex cursor-pointer items-center gap-4 rounded-2xl bg-slate-50 p-5 transition hover:bg-slate-100 hover:shadow-md"
              role="button"
              tabIndex={0}
              onClick={() => {
                // Template behavior: no-op.
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // Template behavior: no-op.
                }
              }}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="truncate font-bold text-slate-900">{d.title}</h4>
                <p className="mt-0.5 text-sm text-slate-500">{d.subtitle}</p>
              </div>

              <div className="flex items-center gap-2">
                {d.verified && (
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                    Verified
                  </span>
                )}
                <button
                  type="button"
                  aria-label="More options"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="rounded-full p-2 text-slate-400 transition hover:bg-white hover:text-[#3333CC]"
                >
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}

        {visible.length === 0 && (
          <p className="text-sm text-slate-500">
            No datasets match your search.
          </p>
        )}
      </div>
    </section>
  );
}
