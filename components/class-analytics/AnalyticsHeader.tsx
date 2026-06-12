import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";

export default function AnalyticsHeader({
  title,
  subtitle,
  classId,
}: {
  title: string;
  subtitle: string;
  classId: string;
}) {
  return (
    <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <Link
          href={`/class/classes/${classId}/members`}
          className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Member
        </Link>

        <h1 className="text-[2.75rem] font-bold leading-tight tracking-tight text-on-surface sm:text-[3.5rem]">
          {title} <span className="italic text-indigo-300">Analytics</span>
        </h1>
        <p className="mt-2 max-w-[70ch] text-slate-500">{subtitle}</p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-full bg-slate-100 px-6 py-2.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
        >
          Export CSV
        </button>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white"
        >
          <Share2 className="h-4 w-4" aria-hidden="true" />
          Share Insights
        </button>
      </div>
    </header>
  );
}
