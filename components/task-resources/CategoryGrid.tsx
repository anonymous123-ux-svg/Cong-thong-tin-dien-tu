"use client";

import { RESOURCE_CATEGORIES } from "./mockData";

export default function CategoryGrid() {
  return (
    <section className="md:col-span-12">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {RESOURCE_CATEGORIES.map((c) => {
          const Icon = c.icon;

          return (
            <div
              key={c.id}
              className="group cursor-pointer rounded-3xl border border-transparent bg-white p-6 transition hover:border-[#3333CC]/10 hover:shadow-lg"
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
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#3333CC]/10 text-[#3333CC] transition group-hover:bg-[#3333CC] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="font-bold text-slate-900">{c.title}</h4>
              <p className="mt-1 text-xs text-slate-500">{c.countLabel}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
