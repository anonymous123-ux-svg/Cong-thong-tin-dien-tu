import InstructorNotesCard from "./InstructorNotesCard";
import {
  instructorNotes,
  peerDistributionBars,
  peerDistributionLabels,
  performanceSummary,
  scoreSeries,
  topicMastery,
} from "./mockData";
import OverallStandingCard from "./OverallStandingCard";
import PeerDistributionCard from "./PeerDistributionCard";
import ScoreTrajectoryCard from "./ScoreTrajectoryCard";
import TopicMasteryCard from "./TopicMasteryCard";

type Props = {
  courseId: string;
  courseTitle: string;
};

export default function CoursePerformancePage({ courseTitle }: Props) {
  return (
    <div className="w-full max-w-7xl space-y-8 px-3 py-8 md:px-4 md:py-10 lg:px-6 lg:py-12">
      <header className="space-y-2 pb-2">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Performance Analytics
        </h1>
        <p className="max-w-[70ch] text-sm leading-relaxed text-slate-500">
          A detailed overview of your academic standing, strengths, and areas
          for improvement in {courseTitle}.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ScoreTrajectoryCard series={scoreSeries} />
        </div>

        <TopicMasteryCard topics={topicMastery} />

        <InstructorNotesCard notes={instructorNotes} />

        <section className="lg:col-span-2 grid grid-cols-1 gap-6 md:grid-cols-2">
          <OverallStandingCard summary={performanceSummary} />
          <PeerDistributionCard
            bars={peerDistributionBars}
            highlightIndex={4}
            labels={peerDistributionLabels}
          />
        </section>
      </div>
    </div>
  );
}
