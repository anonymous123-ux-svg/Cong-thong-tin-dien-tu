import { PINNED_TASKS } from "./mockData";

function ToneBar(tone: "primary" | "success" | "muted") {
  if (tone === "success") return "bg-emerald-500";
  if (tone === "muted") return "bg-slate-300";
  return "bg-[#3333CC]";
}

export default function PinnedTasksCard() {
  return (
    <section className="rounded-3xl bg-white p-8 md:col-span-4">
      <h3 className="mb-6 text-lg font-bold text-slate-900 sm:text-xl">
        Pinned Tasks
      </h3>

      <div className="space-y-6">
        {PINNED_TASKS.map((t) => (
          <div key={t.id} className="flex gap-4">
            <div
              className={`h-12 w-1 shrink-0 rounded-full ${ToneBar(t.tone)}`}
            />
            <div>
              <h5 className="text-sm font-bold text-slate-900">{t.title}</h5>
              <p className="mt-1 text-xs text-slate-500">{t.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
