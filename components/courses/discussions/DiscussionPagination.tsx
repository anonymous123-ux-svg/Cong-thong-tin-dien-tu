import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
};

export default function DiscussionPagination({
  currentPage,
  totalPages,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  return (
    <div className="flex justify-center pt-2">
      <div className="inline-flex rounded-full bg-white p-1 shadow-sm ring-1 ring-slate-100">
        <button
          type="button"
          aria-label="Previous page"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage;

          const className = isActive
            ? "flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-medium text-white"
            : "flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100";

          return (
            <button key={page} type="button" className={className}>
              {page}
            </button>
          );
        })}

        <button
          type="button"
          aria-label="Next page"
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
