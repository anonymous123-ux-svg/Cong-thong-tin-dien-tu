import { PlusCircle } from "lucide-react";

import type { UpcomingEvent } from "./types";

type UpcomingCardProps = {
  events: UpcomingEvent[];
};

export default function UpcomingCard({ events }: UpcomingCardProps) {
  return (
    <section className="rounded-3xl border border-slate-100 bg-slate-50 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-xl font-bold text-slate-900">Upcoming</h3>
        <button
          type="button"
          aria-label="Add event"
          className="cursor-pointer rounded-full p-2 text-indigo-600 transition-colors hover:bg-white hover:text-indigo-700"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-6">
        {events.map((event) => (
          <div key={event.id} className="group flex gap-4">
            <div className="flex h-14 w-12 flex-col items-center justify-center rounded-2xl border border-slate-100 bg-white shadow-sm transition-transform group-hover:scale-105">
              <span className="text-[10px] font-bold text-slate-400">
                {event.month}
              </span>
              <span className="text-lg font-extrabold text-indigo-600">
                {event.day}
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">{event.title}</p>
              <p className="mt-0.5 text-xs text-slate-500">{event.meta}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="mt-10 w-full cursor-pointer rounded-2xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50"
      >
        View Full Schedule
      </button>
    </section>
  );
}
