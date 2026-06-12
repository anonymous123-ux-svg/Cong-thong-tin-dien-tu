import Image from "next/image";

import { TEAM_AVAILABILITY } from "./mockData";

export default function TeamAvailabilityCard() {
  return (
    <section className="col-span-12 rounded-3xl border border-slate-200/40 bg-white p-6 shadow-sm lg:col-span-4">
      <h3 className="mb-6 text-lg font-bold text-slate-900">
        Team Availability
      </h3>

      <div className="space-y-6">
        {TEAM_AVAILABILITY.map((m) => (
          <div key={m.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={m.avatarUrl}
                alt={m.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-slate-900">{m.name}</p>
                <p className="text-[10px] font-medium tracking-wide text-slate-500 uppercase">
                  {m.role}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              {m.slots.map((slot, idx) => (
                <span
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  className={
                    slot === "free"
                      ? "h-4 w-3 rounded-sm bg-emerald-200"
                      : "h-4 w-3 rounded-sm bg-red-100"
                  }
                  title={slot === "free" ? "Free" : "Busy"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
