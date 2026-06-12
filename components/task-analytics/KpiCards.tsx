import { ArrowDown, ArrowUp, Sparkles } from "lucide-react";

import { ANALYTICS_KPIS } from "./mockData";

function Delta({
  tone,
  label,
}: {
  tone: "up" | "down" | "neutral";
  label: string;
}) {
  if (tone === "up") {
    return (
      <span className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
        <ArrowUp className="h-3.5 w-3.5" />
        {label}
      </span>
    );
  }

  if (tone === "down") {
    return (
      <span className="flex items-center gap-0.5 text-xs font-bold text-red-500">
        <ArrowDown className="h-3.5 w-3.5" />
        {label}
      </span>
    );
  }

  return <span className="text-xs font-bold text-slate-500">{label}</span>;
}

export default function KpiCards() {
  return (
    <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {ANALYTICS_KPIS.map((kpi) => {
        const cardClassName =
          kpi.emphasis === "primary"
            ? "border-2 border-[#2D2DE8]/30"
            : "border border-slate-100";

        return (
          <div
            key={kpi.id}
            className={`flex h-40 flex-col justify-between rounded-xl bg-white p-6 shadow-sm ${cardClassName}`}
          >
            <div>
              <div className="flex items-start justify-between">
                <p
                  className={
                    kpi.emphasis === "primary"
                      ? "text-sm font-semibold text-[#2D2DE8]"
                      : "text-sm font-semibold text-slate-500"
                  }
                >
                  {kpi.label}
                </p>
                <Delta tone={kpi.deltaTone} label={kpi.deltaLabel} />
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <h3
                  className={
                    kpi.id === "forecast"
                      ? "text-2xl font-bold text-slate-900"
                      : "text-[32px] font-bold text-slate-900"
                  }
                >
                  {kpi.value}
                </h3>
                {kpi.id === "efficiency" && (
                  <span className="text-sm font-normal text-slate-500">
                    {kpi.footer}
                  </span>
                )}
                {kpi.id === "health" && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700">
                    Optimal
                  </span>
                )}
              </div>
            </div>

            {kpi.id === "health" && kpi.footer && (
              <p className="flex items-center gap-1 text-xs text-slate-500">
                <Sparkles className="h-3.5 w-3.5 text-[#2D2DE8]" />
                {kpi.footer}
              </p>
            )}
          </div>
        );
      })}
    </section>
  );
}
