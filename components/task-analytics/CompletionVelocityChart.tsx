import { COMPLETION_VELOCITY } from "./mockData";

const GRIDLINE_TOP_CLASS = [
  { id: 20, className: "top-[80%]" },
  { id: 40, className: "top-[60%]" },
  { id: 60, className: "top-[40%]" },
  { id: 80, className: "top-[20%]" },
];

const HEIGHT_CLASS: Record<number, string> = {
  25: "h-[25%]",
  30: "h-[30%]",
  45: "h-[45%]",
  50: "h-[50%]",
  68: "h-[68%]",
  70: "h-[70%]",
  84: "h-[84%]",
  90: "h-[90%]",
  95: "h-[95%]",
};

function PercentBar({
  percent,
  variant,
}: {
  percent: number;
  variant: "actual" | "predicted";
}) {
  const heightClassName = HEIGHT_CLASS[percent] ?? "h-full";

  if (variant === "predicted") {
    return (
      <div
        className={`w-8 ${heightClassName} border border-[#2D2DE8]/30 border-dashed bg-[#2D2DE8]/10`}
      />
    );
  }

  return <div className={`w-8 ${heightClassName} bg-[#2D2DE8]`} />;
}

export default function CompletionVelocityChart() {
  return (
    <section className="rounded-xl border border-slate-100 bg-white p-8 shadow-sm lg:col-span-7">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold">Completion Velocity</h3>
          <p className="mt-1 text-xs text-slate-500">
            Actual vs Predicted progression through task milestones
          </p>
        </div>

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm bg-[#2D2DE8]" />
            <span className="text-xs font-medium">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border border-[#2D2DE8]/40 border-dashed bg-[#2D2DE8]/20" />
            <span className="text-xs font-medium">Predicted</span>
          </div>
        </div>
      </div>

      <div className="flex h-72 gap-4">
        <div className="flex w-8 flex-col justify-between py-2 text-xs font-bold text-slate-500">
          <span>100%</span>
          <span>80%</span>
          <span>60%</span>
          <span>40%</span>
          <span>20%</span>
          <span>0%</span>
        </div>

        <div className="relative flex-1 border-b border-l border-slate-200 px-4 pb-2">
          {GRIDLINE_TOP_CLASS.map((line) => (
            <div
              key={line.id}
              className={`pointer-events-none absolute left-0 right-0 border-t border-slate-100 ${line.className}`}
            />
          ))}

          <div className="absolute inset-0 flex items-end justify-around px-8">
            {COMPLETION_VELOCITY.map((p) => (
              <div
                key={p.id}
                className="relative flex h-full flex-col items-center justify-end gap-1"
              >
                {p.showTodayCallout && (
                  <div className="absolute -top-10 z-10 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] text-white shadow-lg">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-sm bg-[#2D2DE8]" />
                      <span>Today: 84.2%</span>
                    </div>
                  </div>
                )}

                <PercentBar percent={p.predictedPercent} variant="predicted" />
                {p.actualPercent !== null ? (
                  <PercentBar percent={p.actualPercent} variant="actual" />
                ) : (
                  <div className="h-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
