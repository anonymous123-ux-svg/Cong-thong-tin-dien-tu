import AchievementsSection from "./AchievementsSection";
import {
  achievements,
  modulesProgress,
  progressSummary,
  timeSpent,
} from "./mockData";
import ModuleCompletionSection from "./ModuleCompletionSection";
import ProgressSummaryCard from "./ProgressSummaryCard";
import TimeSpentCard from "./TimeSpentCard";

type Props = {
  courseId: string;
  courseTitle: string;
};

export default function CourseMyProgressPage({ courseId, courseTitle }: Props) {
  return (
    <div className="w-full max-w-7xl space-y-16 px-4 py-8 md:px-6 md:py-10 lg:px-8 lg:py-12">
      <header className="space-y-4">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-indigo-700">
          Performance Dashboard
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          My Progress
        </h1>
      </header>

      <section className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-8">
          <ProgressSummaryCard
            courseTitle={courseTitle}
            summary={progressSummary}
          />
        </div>
        <div className="md:col-span-4">
          <TimeSpentCard timeSpent={timeSpent} />
        </div>
      </section>

      <ModuleCompletionSection courseId={courseId} modules={modulesProgress} />
      <AchievementsSection achievements={achievements} />
    </div>
  );
}
