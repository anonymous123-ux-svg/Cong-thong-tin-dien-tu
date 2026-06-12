import type { ResourceUsageItem, ResourceUsageKey } from "./types";

const COLORS: Record<
  ResourceUsageKey,
  { stroke: string; dot: string; track: string }
> = {
  videos: { stroke: "#4338CA", dot: "#4338CA", track: "#EEF2FF" },
  pdfs: { stroke: "#818CF8", dot: "#818CF8", track: "#EEF2FF" },
  quizzes: { stroke: "#CBD5E1", dot: "#CBD5E1", track: "#EEF2FF" },
};

type Props = {
  items: ResourceUsageItem[];
};

export default function ResourceUsageCard({ items }: Props) {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  const sanitizedItems = items.map((item) => ({
    ...item,
    percent: Number.isFinite(item.percent) ? Math.max(0, item.percent) : 0,
  }));

  const centerLabel = (() => {
    if (sanitizedItems.length === 0) return "";

    const top = sanitizedItems.reduce((best, cur) =>
      cur.percent > best.percent ? cur : best,
    );

    if (top.key === "videos") return "Video";
    return top.label;
  })();

  const segments = sanitizedItems.reduce<
    {
      key: ResourceUsageKey;
      label: string;
      percent: number;
      dashOffset: number;
      dashLength: number;
    }[]
  >((acc, item) => {
    if (item.percent <= 0) return acc;

    const dashOffset = acc.reduce((sum, seg) => sum + seg.dashLength, 0);
    const dashLength = (item.percent / 100) * circumference;
    acc.push({
      key: item.key,
      label: item.label,
      percent: item.percent,
      dashOffset,
      dashLength,
    });
    return acc;
  }, []);
  return (
    <section
      className="rounded-2xl p-6"
      style={{ backgroundColor: "#ffffff", border: "1px solid #F1F5F9" }}
    >
      <h4
        className="mb-6 text-sm font-bold uppercase tracking-wider"
        style={{ color: "#94A3B8" }}
      >
        Resource Usage
      </h4>

      <div className="flex items-center gap-6">
        {/* Donut chart */}
        <div className="relative h-24 w-24 shrink-0">
          <svg
            className="h-full w-full -rotate-90 transform"
            aria-hidden="true"
          >
            {/* Track */}
            <circle
              cx="48"
              cy="48"
              r="38"
              fill="transparent"
              stroke={COLORS.videos.track}
              strokeWidth="8"
            />

            {segments.map((seg) => (
              <circle
                key={seg.key}
                cx="48"
                cy="48"
                r={radius}
                fill="transparent"
                stroke={COLORS[seg.key].stroke}
                strokeWidth="8"
                strokeDasharray={`${seg.dashLength} ${circumference - seg.dashLength}`}
                strokeDashoffset={-seg.dashOffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold" style={{ color: "#0F172A" }}>
              {centerLabel || ""}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-2.5">
          {sanitizedItems.map((item) => (
            <div key={item.key} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: COLORS[item.key].dot }}
              />
              <span className="text-xs" style={{ color: "#64748B" }}>
                {item.label} ({item.percent}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
