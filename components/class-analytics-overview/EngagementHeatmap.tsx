import type { HeatmapCellTone } from "./types";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

// Heatmap colours matching the design (light indigo → deep navy)
const TONE_COLOR: Record<HeatmapCellTone, string> = {
  empty: "#F1F5F9", // slate-100
  low: "#C7D2FE", // indigo-200
  mid: "#818CF8", // indigo-400
  high: "#4338CA", // indigo-700
  veryHigh: "#1E1B4B", // indigo-950 (near-navy)
};

export default function EngagementHeatmap({
  cells,
}: {
  cells: HeatmapCellTone[];
}) {
  return (
    <section
      className="rounded-2xl p-6"
      style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
    >
      <h4
        className="mb-6 text-sm font-bold uppercase tracking-wider"
        style={{ color: "#94A3B8" }}
      >
        Weekly Engagement Heatmap
      </h4>

      <div className="grid grid-cols-7 gap-1">
        {DAYS.map((day, idx) => (
          <div
            key={idx}
            className="text-center text-[8px] font-bold"
            style={{ color: "#94A3B8" }}
          >
            {day}
          </div>
        ))}

        {cells.map((tone, idx) => (
          <div
            key={idx}
            className="aspect-square rounded-sm"
            style={{ backgroundColor: TONE_COLOR[tone] }}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[10px]" style={{ color: "#94A3B8" }}>
          Less active
        </span>
        <div className="flex gap-1" aria-hidden="true">
          <div
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: "#C7D2FE" }}
          />
          <div
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: "#4338CA" }}
          />
          <div
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: "#1E1B4B" }}
          />
        </div>
        <span className="text-[10px]" style={{ color: "#94A3B8" }}>
          Highly active
        </span>
      </div>
    </section>
  );
}
