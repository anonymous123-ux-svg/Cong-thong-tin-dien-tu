import Card from "@/components/ui/Card";

import type { CategoryProgress } from "./types";

type Props = {
  overallPercent: number;
  categories: CategoryProgress[];
};

function bulletClassName(tone: CategoryProgress["tone"]) {
  switch (tone) {
    case "primary":
      return "bg-indigo-700";
    case "success":
      return "bg-emerald-500";
    case "muted":
    default:
      return "bg-slate-200";
  }
}

export default function CategoryProgressCard({
  overallPercent,
  categories,
}: Props) {
  const r = 40;
  const circumference = 2 * Math.PI * r;

  // Arc 1: Homework (primary/indigo) = 45%
  // Arc 2: Exams (success/emerald) = 30%
  // Projects (muted) not drawn
  const homeworkPercent =
    categories.find((c) => c.tone === "primary")?.percent ?? 0;
  const examsPercent =
    categories.find((c) => c.tone === "success")?.percent ?? 0;

  const homeworkOffset = circumference * (1 - homeworkPercent / 100);
  const examsOffset =
    circumference * (1 - (homeworkPercent + examsPercent) / 100);

  return (
    <Card className="flex flex-col items-center p-8">
      <h2 className="mb-10 w-full text-lg font-bold text-slate-900">
        Category Progress
      </h2>

      <div className="relative mb-10 h-52 w-52">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
          {/* Track */}
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            className="text-slate-100"
          />

          {/* Exams arc (emerald) — drawn first so indigo sits on top at start */}
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={examsOffset}
            className="text-emerald-500"
          />

          {/* Homework arc (indigo) — drawn second, starts at 0 */}
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={homeworkOffset}
            className="text-indigo-700"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-extrabold text-slate-900">
            {overallPercent}%
          </span>
          <span className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Overall
          </span>
        </div>
      </div>

      <div className="w-full space-y-4 px-2">
        {categories.map((category) => (
          <div
            key={category.label}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${bulletClassName(category.tone)}`}
                aria-hidden="true"
              />
              <span className="text-xs font-bold text-slate-700">
                {category.label}
              </span>
            </div>

            <span className="text-xs font-extrabold text-slate-900">
              {category.percent}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
