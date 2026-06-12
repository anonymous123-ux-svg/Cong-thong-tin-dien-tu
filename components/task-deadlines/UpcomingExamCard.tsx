import { Clock } from "lucide-react";

export default function UpcomingExamCard() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-indigo-600 p-6 text-white">
      <div className="relative z-10">
        <h4 className="mb-1 text-lg font-bold">Upcoming Exam</h4>
        <p className="mb-4 text-xs font-medium text-indigo-100 opacity-80">
          Quantum Chromodynamics Final
        </p>

        <div className="mb-6 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-sm font-bold">14d 22h 12m</span>
        </div>

        <button
          type="button"
          className="w-full rounded-lg bg-white py-2.5 text-xs font-bold text-indigo-600 transition-colors hover:bg-indigo-50"
        >
          Study Now
        </button>
      </div>

      <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
    </section>
  );
}
