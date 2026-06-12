import Image from "next/image";

import { PRODUCTIVITY_MEMBERS } from "./mockData";

export default function MemberProductivityCard() {
  return (
    <section className="flex-1 rounded-xl border border-slate-100 bg-white p-6 shadow-sm">
      <h3 className="mb-1 text-base font-bold">Member Productivity</h3>
      <p className="mb-6 text-xs text-slate-500">
        Efficiency ratings by researcher
      </p>

      <div className="space-y-4">
        {PRODUCTIVITY_MEMBERS.map((m) => (
          <div key={m.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={m.avatarUrl}
                alt={m.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full object-cover"
              />
              <span className="text-[13px] font-medium text-slate-700">
                {m.name}
              </span>
            </div>
            <span className="text-xs font-bold text-emerald-600">
              {m.scoreLabel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
