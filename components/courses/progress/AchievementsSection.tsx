import AchievementCard from "./AchievementCard";
import type { Achievement } from "./types";

type Props = {
  achievements: Achievement[];
};

export default function AchievementsSection({ achievements }: Props) {
  return (
    <section>
      <h3 className="mb-8 text-2xl font-semibold tracking-tight text-slate-900">
        Recent Achievements
      </h3>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {achievements.map((achievement) => (
          <AchievementCard key={achievement.id} achievement={achievement} />
        ))}
      </div>
    </section>
  );
}
