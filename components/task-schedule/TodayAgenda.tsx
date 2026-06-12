import { TODAY_AGENDA } from "./mockData";
import type { AgendaItem } from "./types";

function ToneBorder(tone: AgendaItem["tone"]) {
  if (tone === "success") return "border-emerald-500";
  if (tone === "tertiary") return "border-amber-700";
  if (tone === "muted") return "border-slate-300";
  return "border-indigo-700";
}

export default function TodayAgenda() {
  return (
    <section className="rounded-3xl border border-slate-200/40 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900">Today Agenda</h3>
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
          Apr 16
        </span>
      </div>

      <div className="relative space-y-6 before:absolute before:bottom-2 before:left-3 before:top-2 before:w-0.5 before:bg-slate-100">
        {TODAY_AGENDA.map((item) => (
          <div
            key={item.id}
            className={
              item.completed ? "relative pl-8 opacity-50" : "relative pl-8"
            }
          >
            <div
              className={`absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 bg-white ${ToneBorder(item.tone)}`}
            />

            <div className="flex flex-col">
              <span className="mb-1 text-xs font-bold text-slate-500">
                {item.time}
              </span>
              <p className="text-sm font-bold text-slate-900">{item.title}</p>
              <p
                className={
                  item.completed
                    ? "text-[11px] font-bold text-emerald-600"
                    : "text-[11px] text-slate-500"
                }
              >
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
