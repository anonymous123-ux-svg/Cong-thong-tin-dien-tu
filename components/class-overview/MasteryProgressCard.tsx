type ProgressRingProps = {
  percent: number;
  radius: number;
  strokeWidth: number;
  opacity?: number;
};

function ProgressRing({
  percent,
  radius,
  strokeWidth,
  opacity = 1,
}: ProgressRingProps) {
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percent / 100) * circumference;

  return (
    <circle
      cx="50"
      cy="50"
      r={radius}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray={circumference}
      strokeDashoffset={dashOffset}
      strokeOpacity={opacity}
    />
  );
}

type MasteryProgressCardProps = {
  masteryPercent: number;
  coreConceptsPercent: number;
  appliedSkillsPercent: number;
};

export default function MasteryProgressCard({
  masteryPercent,
  coreConceptsPercent,
  appliedSkillsPercent,
}: MasteryProgressCardProps) {
  return (
    <section className="flex flex-col justify-between rounded-3xl bg-indigo-600 p-8 text-white shadow-xl shadow-indigo-200">
      <div>
        <h3 className="mb-2 text-xl font-bold">Mastery Progress</h3>
        <p className="mb-8 text-sm opacity-80">
          Section-wide competency target
        </p>
      </div>

      <div className="relative flex justify-center py-4">
        <div className="relative h-48 w-48">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="8"
            />
            <ProgressRing
              percent={masteryPercent}
              radius={45}
              strokeWidth={8}
            />

            <circle
              cx="50"
              cy="50"
              r="35"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="8"
            />
            <ProgressRing
              percent={appliedSkillsPercent}
              radius={35}
              strokeWidth={8}
              opacity={0.6}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">{masteryPercent}%</span>
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">
              Mastery
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white" />
            <span className="font-medium">Core Concepts</span>
          </div>
          <span className="font-bold">{coreConceptsPercent}%</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-white/60" />
            <span className="font-medium">Applied Skills</span>
          </div>
          <span className="font-bold">{appliedSkillsPercent}%</span>
        </div>
      </div>
    </section>
  );
}
