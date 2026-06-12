import Link from "next/link";
import {
  CheckCircle2,
  ChevronLeft,
  Download,
  Settings2,
  Sparkles,
} from "lucide-react";

type AiInsightsHeaderProps = {
  classTitle: string;
  lastSyncedLabel: string;
  optimalTrendLabel: string;
};

export default function AiInsightsHeader({
  classTitle,
  lastSyncedLabel,
  optimalTrendLabel,
}: AiInsightsHeaderProps) {
  return (
    <header
      className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
      aria-label={`AI cohort insights for ${classTitle}`}
    >
      <div>
        <Link
          href="/class/classes"
          className="mb-4 inline-flex cursor-pointer items-center gap-1 rounded-full border border-gray-200 bg-white/50 px-3 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-indigo-600"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back to Classes
        </Link>

        <div className="mb-2 flex items-center gap-2 text-indigo-600">
          <Sparkles className="h-4 w-4" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-[0.2em]">
            Artificial Intelligence Core
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          AI Cohort Insights
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            {optimalTrendLabel}
          </span>
          <span className="text-sm italic text-gray-400">
            {lastSyncedLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export Analysis
        </button>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition-opacity hover:opacity-90"
        >
          <Settings2 className="h-4 w-4" aria-hidden="true" />
          Model Settings
        </button>
      </div>
    </header>
  );
}
