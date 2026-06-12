import {
  AT_RISK_STUDENTS,
  CLASS_OVERVIEW_META,
  RECENT_ACTIVITY,
  SECTIONS,
  STAT_CARDS,
  UPCOMING_EVENTS,
} from "./mockData";
import AtRiskStudentsCard from "./AtRiskStudentsCard";
import AttendanceTrendCard from "./AttendanceTrendCard";
import AvailableSectionsCard from "./AvailableSectionsCard";
import ClassOverviewHeader from "./ClassOverviewHeader";
import EngagementTrendCard from "./EngagementTrendCard";
import InstructorInsightCard from "./InstructorInsightCard";
import MasteryProgressCard from "./MasteryProgressCard";
import RecentActivityCard from "./RecentActivityCard";
import StatsGrid from "./StatsGrid";
import UpcomingCard from "./UpcomingCard";

export default function ClassOverviewPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1400px] p-4 md:p-8">
        <ClassOverviewHeader
          title={CLASS_OVERVIEW_META.title}
          subtitle={CLASS_OVERVIEW_META.subtitle}
        />

        <StatsGrid stats={STAT_CARDS} />

        <InstructorInsightCard />

        <div className="flex flex-col gap-8">
          <AvailableSectionsCard rows={SECTIONS} />
          <AtRiskStudentsCard students={AT_RISK_STUDENTS} />

          <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
            <div className="space-y-8 xl:col-span-8">
              <AttendanceTrendCard />
              <EngagementTrendCard />
            </div>

            <div className="space-y-8 xl:col-span-4">
              <UpcomingCard events={UPCOMING_EVENTS} />
              <MasteryProgressCard
                masteryPercent={85}
                coreConceptsPercent={92}
                appliedSkillsPercent={78}
              />
            </div>
          </div>

          <RecentActivityCard items={RECENT_ACTIVITY} />
        </div>
      </div>
    </div>
  );
}
