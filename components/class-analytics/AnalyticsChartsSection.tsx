import type { AnalyticsCharts } from "./types";

function heightClass(pct: number) {
  if (pct === 40) return "h-[40%]";
  if (pct === 45) return "h-[45%]";
  if (pct === 50) return "h-[50%]";
  if (pct === 55) return "h-[55%]";
  if (pct === 60) return "h-[60%]";
  if (pct === 65) return "h-[65%]";
  if (pct === 70) return "h-[70%]";
  if (pct === 75) return "h-[75%]";
  if (pct === 80) return "h-[80%]";
  if (pct === 85) return "h-[85%]";
  if (pct === 90) return "h-[90%]";
  if (pct === 95) return "h-[95%]";
  if (pct === 100) return "h-[100%]";
  return "h-full";
}

function widthClass(pct: number) {
  if (pct === 24) return "w-[24%]";
  if (pct === 42) return "w-[42%]";
  if (pct === 18) return "w-[18%]";
  if (pct === 16) return "w-[16%]";
  return "w-0";
}

export default function AnalyticsChartsSection({
  charts,
}: {
  charts: AnalyticsCharts;
}) {
  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 rounded-xl bg-white p-8 shadow-[0px_20px_40px_rgba(21,28,39,0.03)] border border-slate-100">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h4 className="text-xl font-semibold text-slate-800">
              Attendance &amp; Engagement Trends
            </h4>
            <p className="text-sm text-slate-400">
              Activity volume over the last 30 days
            </p>
          </div>
          <select
            defaultValue={charts.attendance.rangeLabel}
            className="rounded-full bg-slate-100 px-4 py-2 text-xs font-bold text-slate-600 focus:ring-indigo-500/20"
          >
            <option>{charts.attendance.rangeLabel}</option>
            <option>Last 90 Days</option>
          </select>
        </div>

        <div className="relative flex h-64 items-end gap-1">
          <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
            <div className="h-0 w-full border-b border-slate-100" />
            <div className="h-0 w-full border-b border-slate-100" />
            <div className="h-0 w-full border-b border-slate-100" />
            <div className="h-0 w-full border-b border-slate-100" />
          </div>

          {charts.attendance.bars.map((b, idx) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              className={`group relative flex-1 ${heightClass(b.basePct)} rounded-t-sm bg-indigo-100`}
            >
              <div
                className={`absolute bottom-0 w-full ${heightClass(b.fillPct)} rounded-t-sm bg-indigo-600`}
                aria-hidden="true"
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
          <span>{charts.attendance.xLabels[0]}</span>
          <span>{charts.attendance.xLabels[1]}</span>
          <span>{charts.attendance.xLabels[2]}</span>
        </div>
      </div>

      <div className="rounded-xl bg-white p-8 shadow-[0px_20px_40px_rgba(21,28,39,0.03)] border border-slate-100">
        <h4 className="mb-6 text-xl font-semibold text-slate-800">
          Grade Distribution
        </h4>

        <div className="space-y-6">
          {charts.gradeDistribution.entries.map((e) => (
            <div key={e.label}>
              <div className="mb-2 flex justify-between text-xs font-bold uppercase">
                <span>{e.label}</span>
                <span>{e.pct}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className={`h-full ${widthClass(e.pct)} ${e.barClassName}`}
                  aria-hidden="true"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-500 italic">
            Median grade:{" "}
            <span className="font-bold text-slate-800">
              {charts.gradeDistribution.medianValueLabel}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
