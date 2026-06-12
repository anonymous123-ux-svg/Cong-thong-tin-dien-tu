import { PROGRESS_SEGMENTS } from "./mockData";
import type { ProgressSegment } from "./types";

function ToneDot(tone: ProgressSegment["tone"]) {
  if (tone === "success") return "bg-emerald-600";
  if (tone === "tertiary") return "bg-red-100";
  if (tone === "danger") return "bg-pink-100";
  return "bg-indigo-700";
}

export default function TaskProgressCard() {
  const r = 70;
  const c = 2 * Math.PI * r;

  const done =
    PROGRESS_SEGMENTS.find((s) => s.tone === "success")?.percent ?? 45;
  const active =
    PROGRESS_SEGMENTS.find((s) => s.tone === "primary")?.percent ?? 30;

  const global = 70;

  // Arc 1 (emerald/done): starts at top (0), covers done% of circumference
  const doneOffset = c * (1 - done / 100);

  // Arc 2 (indigo/active): starts right after done arc
  // strokeDashoffset trick: shift by -(done/100 * c) using a rotate on the element
  const activeArcLength = c * (active / 100);
  const activeOffset = c - activeArcLength;
  const activeRotateDeg = (done / 100) * 360;

  return (
    <section className="rounded-3xl border border-slate-200/40 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-bold text-slate-900">Task Progress</h3>

      <div className="relative mb-6 flex items-center justify-center">
        <svg className="h-40 w-40 -rotate-90" viewBox="0 0 160 160">
          {/* Track */}
          <circle
            cx="80"
            cy="80"
            r={r}
            strokeWidth="12"
            stroke="currentColor"
            className="text-slate-100"
            fill="transparent"
          />

          {/* Done arc (emerald) — starts at top */}
          <circle
            cx="80"
            cy="80"
            r={r}
            strokeWidth="12"
            stroke="currentColor"
            className="text-emerald-600"
            fill="transparent"
            strokeDasharray={c}
            strokeDashoffset={doneOffset}
            strokeLinecap="round"
          />

          {/* Active arc (indigo) — starts right after done arc */}
          <circle
            cx="80"
            cy="80"
            r={r}
            strokeWidth="12"
            stroke="currentColor"
            className="text-indigo-700"
            fill="transparent"
            strokeDasharray={c}
            strokeDashoffset={activeOffset}
            strokeLinecap="round"
            style={{
              transform: `rotate(${activeRotateDeg}deg)`,
              transformOrigin: "80px 80px",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-black tracking-tighter text-slate-900">
            {global}%
          </span>
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            Global
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PROGRESS_SEGMENTS.map((s) => (
          <div key={s.id} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${ToneDot(s.tone)}`} />
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">
                {s.label}
              </p>
              <p className="text-xs font-bold text-slate-900">{s.percent}%</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
