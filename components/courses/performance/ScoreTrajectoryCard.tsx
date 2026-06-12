import type { ScoreSeriesPoint } from "./types";

type Props = {
  series: ScoreSeriesPoint[];
};

function buildLinePath(values: number[]) {
  if (values.length === 0) return "";
  const stepX = 100 / (values.length - 1);

  return values
    .map((v, idx) => {
      const x = idx * stepX;
      // input value 0..100 maps to y 100..0
      const y = 100 - v;
      return `${idx === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");
}

function buildAreaPath(values: number[]) {
  if (values.length === 0) return "";
  const line = buildLinePath(values);
  return `${line} L100,100 L0,100 Z`;
}

export default function ScoreTrajectoryCard({ series }: Props) {
  const scores = series.map((p) => p.score);
  const classAvg = series.map((p) => p.classAvg);

  return (
    <section className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-indigo-500/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-medium text-slate-900">
            Score Trajectory
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Quizzes &amp; Assignments over time
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-indigo-600" />
          <span className="font-medium text-slate-700">Your Score</span>
          <span className="ml-2 h-2 w-2 rounded-full bg-emerald-600" />
          <span className="font-medium text-slate-700">Class Avg</span>
        </div>
      </div>

      <div className="relative min-h-[250px]">
        <div className="absolute left-0 top-0 bottom-8 flex w-9 flex-col justify-between text-xs text-slate-400">
          <span>100</span>
          <span>75</span>
          <span>50</span>
          <span>25</span>
        </div>

        <div className="absolute inset-0 ml-10 mb-8 overflow-hidden border-b border-l border-slate-200">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-label="Score chart"
          >
            <path d={buildAreaPath(scores)} className="fill-indigo-600/15" />
            <path
              d={buildLinePath(scores)}
              className="stroke-indigo-600"
              fill="none"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
            />
            <path
              d={buildLinePath(classAvg)}
              className="stroke-emerald-600/60"
              fill="none"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="4"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 left-10 right-0 flex justify-between px-2 text-xs text-slate-400">
          {series.map((p) => (
            <span key={p.label}>{p.label}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
