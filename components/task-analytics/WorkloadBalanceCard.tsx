import { WORKLOAD_TEAMS } from "./mockData";
import type { WorkloadTeamRow } from "./types";

const WIDTH_CLASS: Record<number, string> = {
  45: "w-[45%]",
  82: "w-[82%]",
  95: "w-[95%]",
};

function ToneClasses(tone: WorkloadTeamRow["tone"]) {
  if (tone === "success") return "bg-emerald-500";
  if (tone === "danger") return "bg-red-500";
  return "bg-amber-500";
}

function ToneText(tone: WorkloadTeamRow["tone"]) {
  if (tone === "success") return "text-emerald-600";
  if (tone === "danger") return "text-red-500";
  return "text-amber-600";
}

export default function WorkloadBalanceCard() {
  return (
    <section className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold">Workload Balance</h3>
      <p className="mb-8 mt-1 text-xs text-slate-500">
        Current team capacity and resource allocation
      </p>

      <div className="relative space-y-8">
        <div className="absolute bottom-0 left-[80%] top-0 z-0 border-l-2 border-dashed border-slate-300">
          <span className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-slate-500">
            80% LIMIT
          </span>
        </div>

        {WORKLOAD_TEAMS.map((row) => {
          const widthClass = WIDTH_CLASS[row.percent] ?? "w-full";
          const toneClass = ToneClasses(row.tone);
          const toneTextClass = ToneText(row.tone);

          return (
            <div key={row.id} className="relative z-10">
              <div className="mb-2 flex justify-between text-[13px] font-medium">
                <span className="text-slate-700">{row.label}</span>

                {row.flag ? (
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {row.flag}
                    </span>
                    <span className="font-bold text-red-500">
                      {row.percent}%
                    </span>
                  </div>
                ) : (
                  <span className={toneTextClass}>{row.percent}% Capacity</span>
                )}
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${toneClass} ${widthClass}`} />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
