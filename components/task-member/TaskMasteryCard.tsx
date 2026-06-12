import type { TaskMemberDetail } from "./types";

function getCircleMetrics(percent: number) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percent / 100);
  return {
    radius,
    circumference,
    dashOffset,
  };
}

export default function TaskMasteryCard({
  detail,
}: {
  detail: TaskMemberDetail;
}) {
  const { radius, circumference, dashOffset } = getCircleMetrics(
    detail.syncRatePercent,
  );

  return (
    <section
      className="rounded-2xl p-8 text-white shadow-xl"
      style={{
        background: "linear-gradient(135deg, #2D2DE8 0%, #1a1ab8 100%)",
      }}
    >
      <h3 className="mb-6 text-xl font-bold">Task Mastery</h3>

      <div className="mb-8 flex items-center justify-center">
        <div className="relative h-40 w-40">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="white"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-black">
              {detail.syncRatePercent}%
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase opacity-80">
              Sync Rate
            </span>
          </div>
        </div>
      </div>

      <p className="mb-6 text-sm leading-relaxed opacity-90">
        Your team is performing {detail.aboveBenchmarkPercent}% above the
        departmental benchmark for this module.
      </p>

      <button
        type="button"
        className="w-full rounded-full bg-white py-3 font-bold text-[#2D2DE8] transition-opacity hover:opacity-90"
      >
        View Analytics
      </button>
    </section>
  );
}
