import { Sparkles } from "lucide-react";

import { AI_INSIGHT_TEXT } from "./mockData";

export default function AiInsightCard() {
  return (
    <section className="rounded-xl border border-[#2D2DE8]/10 bg-[#2D2DE8]/5 p-5">
      <div className="mb-2 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-[#2D2DE8]" />
        <h4 className="text-xs font-bold tracking-tight text-[#2D2DE8] uppercase">
          AI Insight
        </h4>
      </div>
      <p className="text-xs leading-relaxed text-slate-700">
        {AI_INSIGHT_TEXT}
      </p>
    </section>
  );
}
