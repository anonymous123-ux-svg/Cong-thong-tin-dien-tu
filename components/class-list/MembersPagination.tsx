"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MembersPagination({
  page,
  pageCount,
  label,
  onPrev,
  onNext,
  onPage,
}: {
  page: number;
  pageCount: number;
  label: string;
  onPrev: () => void;
  onNext: () => void;
  onPage: (page: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-gray-100 bg-white px-6 py-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
        {label}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          disabled={page <= 1}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        </button>

        {Array.from({ length: Math.min(3, pageCount) }).map((_, idx) => {
          const p = idx + 1;
          const active = p === page;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPage(p)}
              className={
                active
                  ? "flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white"
                  : "flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-gray-600 transition-all hover:bg-gray-100"
              }
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={onNext}
          disabled={page >= pageCount}
          className="flex h-8 w-8 items-center justify-center rounded-full transition-all hover:bg-gray-100 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
