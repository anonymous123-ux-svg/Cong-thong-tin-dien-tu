import { Filter, ChevronDown } from "lucide-react";

export default function AssignmentsHeader({
  courseTitle,
}: {
  courseTitle?: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          Assignments
        </h2>
        <p className="max-w-2xl text-base text-slate-500 md:text-lg">
          Manage your coursework, track deadlines, and review feedback for{" "}
          {courseTitle ?? "this course"}.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
        >
          <Filter className="h-4 w-4" aria-hidden="true" />
          Filter
        </button>

        <div className="relative">
          <select className="cursor-pointer appearance-none rounded-full border border-slate-200 bg-white py-2 pl-4 pr-10 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:border-[#3D52A0] focus:ring-2 focus:ring-[#3D52A0]">
            <option>Sort by: Due Date</option>
            <option>Sort by: Status</option>
            <option>Sort by: Module</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
