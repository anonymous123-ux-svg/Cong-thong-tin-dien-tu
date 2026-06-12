import { Download, Eye } from "lucide-react";

type ClassOverviewHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ClassOverviewHeader({
  title,
  subtitle,
}: ClassOverviewHeaderProps) {
  return (
    <header className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <h1 className="mb-1 text-3xl font-bold tracking-tight text-slate-900">
          {title}
        </h1>
        <p className="font-medium text-slate-500">{subtitle}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-indigo-600 px-6 py-2.5 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50"
        >
          <Download className="h-4 w-4" />
          Download Report
        </button>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-indigo-300 active:scale-95"
        >
          <Eye className="h-4 w-4" />
          View Assignments
        </button>
      </div>
    </header>
  );
}
