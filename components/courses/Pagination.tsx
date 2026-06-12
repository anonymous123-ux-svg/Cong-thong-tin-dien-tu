"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  onPageChange,
}: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(totalItems, page * pageSize);

  const visiblePages = Array.from(
    { length: Math.min(3, totalPages) },
    (_, i) => {
      if (totalPages <= 3) return i + 1;
      if (page === 1) return i + 1;
      if (page === totalPages) return totalPages - 2 + i;
      return page - 1 + i;
    },
  );

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="text-xs text-outline">
        Showing {start} to {end} of {totalItems} results
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="h-8 w-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-low disabled:opacity-50"
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {visiblePages.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            className={
              p === page
                ? "h-8 w-8 rounded-full bg-primary text-on-primary text-xs font-extrabold"
                : "h-8 w-8 rounded-full bg-surface-container-low text-on-surface-variant text-xs font-bold hover:bg-surface-container-high"
            }
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        ))}

        <button
          type="button"
          className="h-8 w-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-low disabled:opacity-50"
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
