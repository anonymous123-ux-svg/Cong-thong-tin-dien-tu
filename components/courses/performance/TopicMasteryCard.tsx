import type { TopicMastery } from "./types";

type Props = {
  topics: TopicMastery[];
};

function polygonPoints(values: number[]) {
  const angleStep = (2 * Math.PI) / values.length;
  const center = 50;
  const maxRadius = 35;

  return values
    .map((value, idx) => {
      const angle = -Math.PI / 2 + idx * angleStep;
      const radius = (value / 100) * maxRadius;
      const x = center + Math.cos(angle) * radius;
      const y = center + Math.sin(angle) * radius;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
}

export default function TopicMasteryCard({ topics }: Props) {
  const values = topics.map((t) => t.value);
  const labels = topics.map((t) => t.label);

  return (
    <section className="flex flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 w-full text-left">
        <h2 className="text-base font-medium text-slate-900">Topic Mastery</h2>
        <p className="mt-1 text-sm text-slate-500">Strengths vs Weaknesses</p>
      </div>

      <div className="relative my-auto h-48 w-48">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 100 100">
          <polygon
            className="stroke-slate-200"
            fill="none"
            strokeWidth="0.5"
            points="50,5 95,27 95,73 50,95 5,73 5,27"
          />
          <polygon
            className="stroke-slate-200"
            fill="none"
            strokeWidth="0.5"
            points="50,20 80,35 80,65 50,80 20,65 20,35"
          />
          <polygon
            className="stroke-slate-200"
            fill="none"
            strokeWidth="0.5"
            points="50,35 65,42.5 65,57.5 50,65 35,57.5 35,42.5"
          />

          <line
            className="stroke-slate-200"
            x1="50"
            y1="50"
            x2="50"
            y2="5"
            strokeWidth="0.5"
          />
          <line
            className="stroke-slate-200"
            x1="50"
            y1="50"
            x2="95"
            y2="27"
            strokeWidth="0.5"
          />
          <line
            className="stroke-slate-200"
            x1="50"
            y1="50"
            x2="95"
            y2="73"
            strokeWidth="0.5"
          />
          <line
            className="stroke-slate-200"
            x1="50"
            y1="50"
            x2="50"
            y2="95"
            strokeWidth="0.5"
          />
          <line
            className="stroke-slate-200"
            x1="50"
            y1="50"
            x2="5"
            y2="73"
            strokeWidth="0.5"
          />
          <line
            className="stroke-slate-200"
            x1="50"
            y1="50"
            x2="5"
            y2="27"
            strokeWidth="0.5"
          />

          <polygon
            className="fill-indigo-600/20 stroke-indigo-600"
            strokeLinejoin="round"
            strokeWidth="1.5"
            points={polygonPoints(values)}
          />
        </svg>

        {/* labels (clockwise) */}
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-indigo-700">
          {labels[0] ?? ""}
        </span>
        <span className="absolute top-1/4 -right-8 text-[10px] text-slate-500">
          {labels[1] ?? ""}
        </span>
        <span className="absolute bottom-1/4 -right-10 text-[10px] text-slate-500">
          {labels[2] ?? ""}
        </span>
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-red-600">
          {labels[3] ?? ""}
        </span>
        <span className="absolute bottom-1/4 -left-10 text-[10px] text-slate-500">
          {labels[4] ?? ""}
        </span>
        <span className="absolute top-1/4 -left-8 text-[10px] text-slate-500">
          {labels[5] ?? ""}
        </span>
      </div>
    </section>
  );
}
