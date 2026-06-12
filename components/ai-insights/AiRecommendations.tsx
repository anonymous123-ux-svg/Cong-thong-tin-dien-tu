import { ArrowRight, Sparkles } from "lucide-react";

import type { AiRecommendation, AiRecommendationTone } from "./types";

type AiRecommendationsProps = {
  title: string;
  items: AiRecommendation[];
  synthesis: {
    title: string;
    description: string;
  };
};

function toneClasses(tone: AiRecommendationTone) {
  if (tone === "error") return "text-red-500";
  if (tone === "primary") return "text-indigo-600";
  return "text-gray-500";
}

function toneHoverClasses(tone: AiRecommendationTone) {
  if (tone === "error") return "group-hover:text-red-500";
  if (tone === "primary") return "group-hover:text-indigo-600";
  return "group-hover:text-gray-500";
}

export default function AiRecommendations({
  title,
  items,
  synthesis,
}: AiRecommendationsProps) {
  return (
    <section className="col-span-12 rounded-3xl bg-gray-50 p-8 shadow-sm lg:col-span-5">
      <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
        <Sparkles className="h-5 w-5 text-indigo-600" aria-hidden="true" />
        {title}
      </h2>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.tagLabel}-${item.title}`}
            className="group cursor-pointer rounded-2xl bg-white p-5 transition-shadow hover:shadow-md"
          >
            <div className="mb-2 flex items-start justify-between gap-6">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider ${toneClasses(item.tone)}`}
              >
                {item.tagLabel}
              </span>
              <ArrowRight
                className={`h-4 w-4 text-gray-300 transition-colors ${toneHoverClasses(item.tone)}`}
                aria-hidden="true"
              />
            </div>
            <h4 className="mb-1 text-sm font-semibold text-gray-900">
              {item.title}
            </h4>
            <p className="text-xs text-gray-500">{item.description}</p>
          </div>
        ))}

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-600" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
              {synthesis.title}
            </span>
          </div>
          <p className="text-xs leading-relaxed text-gray-500">
            {synthesis.description}
          </p>
        </div>
      </div>
    </section>
  );
}
