import { cn } from "@/lib/utils";

export default function ProgressRing({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clampedValue = Math.min(100, Math.max(0, value));
  const radius = 58;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clampedValue / 100);

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <svg className="h-32 w-32 -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="transparent"
          stroke="#E5E7EB"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={radius}
          fill="transparent"
          stroke="#4338CA"
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
