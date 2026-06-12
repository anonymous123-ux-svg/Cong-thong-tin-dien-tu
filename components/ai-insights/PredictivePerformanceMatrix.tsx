import type { AiInsightWeek } from "./types";

type PredictivePerformanceMatrixProps = {
  weeks: AiInsightWeek[];
  predictionTargetLabel: string;
};

export default function PredictivePerformanceMatrix({
  weeks,
  predictionTargetLabel,
}: PredictivePerformanceMatrixProps) {
  const chartWeeks = weeks.slice(0, 6);

  return (
    <section className="relative col-span-12 overflow-hidden rounded-3xl bg-white p-8 shadow-sm lg:col-span-8">
      <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 -translate-y-10 translate-x-20 rounded-full bg-indigo-50 blur-3xl" />

      <div className="relative mb-10 flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Predictive Performance Matrix
          </h2>
          <p className="text-sm text-gray-500">
            Cross-referencing real-time engagement vs projected grades
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            Engagement
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            Grade Prediction
          </div>
        </div>
      </div>

      <div className="relative flex h-64 items-end justify-between gap-4 px-2">
        {chartWeeks.map((w) => {
          const opacityClass = w.faded ? "opacity-30" : "opacity-100";
          const barHeight = Math.max(0, Math.min(100, w.barHeight));
          const dotOffset = Math.max(0, Math.min(100, w.dotOffset));

          const isCurrent = Boolean(w.isCurrent);

          return (
            <div
              key={w.label}
              className={`flex flex-1 flex-col items-center gap-2 ${opacityClass}`}
            >
              <div
                className={`relative w-full rounded-t-xl bg-gray-50 ${isCurrent ? "border-2 border-dashed border-indigo-200" : ""}`}
                style={{ height: `${(barHeight / 100) * 224}px` }}
              >
                <div
                  className={`absolute bottom-0 w-full rounded-t-xl ${isCurrent ? "bg-indigo-400/40" : "bg-indigo-200/60"}`}
                  style={{ height: `${(barHeight / 100) * 224}px` }}
                />

                <div
                  className={`absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-indigo-600 border-2 border-white shadow-sm ${isCurrent ? "animate-pulse shadow-md" : ""}`}
                  style={{ bottom: `${(dotOffset / 100) * 224}px` }}
                />

                {isCurrent ? (
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] text-white">
                    {predictionTargetLabel}
                  </div>
                ) : null}
              </div>

              <span
                className={
                  isCurrent
                    ? "text-[10px] font-bold text-indigo-600"
                    : "text-[10px] font-bold text-gray-400"
                }
              >
                {w.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
