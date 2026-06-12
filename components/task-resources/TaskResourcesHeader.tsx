"use client";

import { Search, Upload } from "lucide-react";

import { useTaskResources } from "./TaskResourcesProvider";

export default function TaskResourcesHeader() {
  const { query, setQuery } = useTaskResources();

  return (
    <header className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="space-y-2">
        <span className="text-xs font-bold tracking-[0.2em] text-[#3333CC] uppercase">
          Repository
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Task Resources
        </h1>
        <p className="max-w-xl text-base text-slate-500 sm:text-lg">
          Central hub for academic datasets, technical documentation, and
          experimental derivations.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search repository..."
            className="h-12 w-full rounded-full bg-slate-100 pl-11 pr-6 text-sm text-slate-700 outline-none transition focus:ring-2 focus:ring-[#3333CC]/20 sm:w-72"
          />
        </div>

        <button
          type="button"
          onClick={() => {
            // Template behavior: no-op.
          }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#3333CC] px-6 text-sm font-bold text-white transition hover:shadow-xl"
        >
          <Upload className="h-4 w-4" />
          Upload
        </button>
      </div>
    </header>
  );
}
