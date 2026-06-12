"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  current: number;
  total: number;
};

export default function Pagination({ current, total }: PaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        aria-label="Previous page"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-indigo-700 text-sm font-bold text-white shadow-md"
      >
        {current}
      </button>

      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100"
      >
        2
      </button>
      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100"
      >
        3
      </button>

      <span className="px-2 text-slate-400">...</span>

      <button
        type="button"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-sm font-bold text-slate-600 transition-colors hover:bg-slate-100"
      >
        {total}
      </button>

      <button
        type="button"
        aria-label="Next page"
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:bg-slate-50"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
