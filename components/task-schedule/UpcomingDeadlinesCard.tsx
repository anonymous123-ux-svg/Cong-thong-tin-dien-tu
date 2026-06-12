import { UPCOMING_DEADLINES } from "./mockData";
import type { UpcomingDeadline } from "./types";

function ToneClasses(tone: UpcomingDeadline["tone"]) {
  if (tone === "danger") return "bg-red-100 text-red-600";
  if (tone === "tertiary") return "bg-amber-100 text-amber-700";
  return "bg-indigo-100 text-indigo-700";
}

export default function UpcomingDeadlinesCard() {
  return (
    <section className="col-span-12 rounded-3xl border border-slate-200/40 bg-white p-6 shadow-sm lg:col-span-4">
      <h3 className="mb-6 text-lg font-bold text-slate-900">
        Upcoming Deadlines
      </h3>

      <div className="space-y-4">
        {UPCOMING_DEADLINES.map((d) => (
          <div
            key={d.id}
            className="group flex gap-4 rounded-2xl bg-slate-50/60 p-3 transition hover:bg-slate-100"
          >
            <div
              className={`flex h-fit flex-col items-center justify-center rounded-xl px-3 py-1 ${ToneClasses(d.tone)}`}
            >
              <span className="text-xs font-black">{d.day}</span>
              <span className="text-[8px] font-bold uppercase">{d.month}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-900 transition group-hover:text-indigo-700">
                {d.title}
              </span>
              <span className="text-xs text-slate-500">{d.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
