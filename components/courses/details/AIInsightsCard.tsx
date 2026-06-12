import { Brain } from "lucide-react";

export default function AIInsightsCard() {
  return (
    <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-3xl">
      <h5 className="font-bold text-on-surface mb-3 flex items-center gap-2">
        <Brain className="h-5 w-5 text-primary" />
        AI Curator Insights
      </h5>
      <p className="text-sm text-slate-600 dark:text-indigo-300 leading-relaxed">
        Based on your previous performance in &quot;Linear Algebra,&quot; we
        suggest spending extra time on Module 3&apos;s attention matrices.
      </p>
      <a
        className="inline-block mt-4 text-xs font-bold text-primary hover:underline"
        href="#"
      >
        View Learning Path Analysis →
      </a>
    </div>
  );
}
