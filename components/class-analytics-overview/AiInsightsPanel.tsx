import { AlertTriangle, Brain, TrendingUp, UserSearch } from "lucide-react";
import type { AiInsightItem } from "./types";

function InsightIcon({ icon }: { icon: AiInsightItem["icon"] }) {
  const className = "h-4 w-4";
  if (icon === "warning") return <AlertTriangle className={className} />;
  if (icon === "trend") return <TrendingUp className={className} />;
  return <UserSearch className={className} />;
}

export default function AiInsightsPanel({
  insights,
}: {
  insights: AiInsightItem[];
}) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl p-6 text-white"
      style={{
        backgroundColor: "#3730A3",
        boxShadow: "0 12px 32px rgba(55,48,163,0.35)",
      }}
    >
      {/* decorative blur blob */}
      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full blur-2xl"
        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2">
          <Brain className="h-5 w-5" aria-hidden="true" />
          <h4 className="text-lg font-bold">Curator AI Insights</h4>
        </div>

        {/* Insight items */}
        <div className="space-y-3">
          {insights.map((item) => (
            <div
              key={item.id}
              className="rounded-xl p-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.10)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 opacity-80" aria-hidden="true">
                  <InsightIcon icon={item.icon} />
                </span>
                <p className="text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          className="mt-6 w-full cursor-pointer rounded-xl py-3 text-xs font-bold uppercase tracking-widest transition-opacity hover:opacity-90"
          style={{ backgroundColor: "#ffffff", color: "#3730A3" }}
        >
          Generate Full Report
        </button>
      </div>
    </section>
  );
}
