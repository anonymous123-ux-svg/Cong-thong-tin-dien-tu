import { clamp } from "@/lib/utils";

type Props = {
  percent: number;
  label: string;
  sublabel: string;
};

export default function CircularProgressRing({
  percent,
  label,
  sublabel,
}: Props) {
  const resolved = clamp(percent, 0, 100);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - resolved / 100);

  return (
    <div className="relative h-48 w-48 shrink-0">
      <svg
        className="h-full w-full -rotate-90"
        viewBox="0 0 100 100"
        aria-label={label}
      >
        <circle
          className="text-slate-100"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
        />
        <circle
          className="text-indigo-600"
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold tracking-tight text-slate-900">
          {Math.round(resolved)}%
        </span>
        <span className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {sublabel}
        </span>
      </div>
    </div>
  );
}
