import { Award, Lightbulb, Medal, Zap } from "lucide-react";

import type { Achievement } from "./types";

type Props = {
  achievement: Achievement;
};

function IconForAchievement({ icon }: { icon: Achievement["icon"] }) {
  if (icon === "medal") return <Medal className="h-8 w-8" aria-hidden="true" />;
  if (icon === "zap") return <Zap className="h-8 w-8" aria-hidden="true" />;
  if (icon === "award") return <Award className="h-8 w-8" aria-hidden="true" />;
  return <Lightbulb className="h-8 w-8" aria-hidden="true" />;
}

function toneClasses(tone: Achievement["tone"]) {
  if (tone === "secondary") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (tone === "tertiary") {
    return "bg-amber-100 text-amber-700";
  }

  return "bg-slate-100 text-slate-500";
}

export default function AchievementCard({ achievement }: Props) {
  const locked = Boolean(achievement.isLocked);

  return (
    <div
      className={
        locked
          ? "rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 opacity-50 grayscale"
          : "rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100 transition-transform hover:-translate-y-1"
      }
    >
      <div
        className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${toneClasses(
          achievement.tone,
        )}`}
      >
        <IconForAchievement icon={achievement.icon} />
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-slate-900">
          {achievement.title}
        </h4>
        <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
          {achievement.subtitle}
        </p>
      </div>
    </div>
  );
}
