import { cn } from "@/lib/utils";

type Props = {
  bars: number[];
  highlightIndex: number;
};

const HEIGHT_CLASS_BY_PERCENT: Record<number, string> = {
  0: "h-[0%]",
  10: "h-[10%]",
  20: "h-[20%]",
  30: "h-[30%]",
  50: "h-[50%]",
  60: "h-[60%]",
  85: "h-[85%]",
  100: "h-[100%]",
};

export default function PeerDistributionBars({ bars, highlightIndex }: Props) {
  return (
    <div className="relative flex flex-1 items-end justify-center gap-2 pt-4">
      {bars.map((height, idx) => {
        const isHighlight = idx === highlightIndex;
        const heightClass = HEIGHT_CLASS_BY_PERCENT[height] ?? "h-[0%]";

        return (
          <div
            key={`${idx}-${height}`}
            className={cn(
              "w-8 rounded-t-sm transition-colors",
              heightClass,
              isHighlight
                ? "group relative bg-indigo-600 shadow-sm"
                : "bg-slate-200 hover:bg-indigo-200/70",
            )}
          >
            {isHighlight && (
              <div className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                You are here
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-200" />
    </div>
  );
}
