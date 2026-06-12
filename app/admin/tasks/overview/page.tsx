import CategoryProgressCard from "@/components/tasks-overview/CategoryProgressCard";
import NewQuickTaskFab from "@/components/tasks-overview/NewQuickTaskFab";
import RecentTaskActivityCard from "@/components/tasks-overview/RecentTaskActivityCard";
import StatsGrid from "@/components/tasks-overview/StatsGrid";
import TaskCompletionTrendCard from "@/components/tasks-overview/TaskCompletionTrendCard";
import TaskOverviewHeader from "@/components/tasks-overview/TaskOverviewHeader";
import UpcomingDeadlinesCard from "@/components/tasks-overview/UpcomingDeadlinesCard";
import {
  categoryProgress,
  monthlyTrend,
  recentActivity,
  taskStats,
  upcomingDeadlines,
  weeklyTrend,
  workloadByPriority,
} from "@/components/tasks-overview/mockData";

export default function TaskOverviewPage() {
  return (
    <>
      <TaskOverviewHeader />

      <StatsGrid stats={taskStats} />

      <div className="mb-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TaskCompletionTrendCard
            weekly={weeklyTrend}
            monthly={monthlyTrend}
            workload={workloadByPriority}
          />
        </div>

        <UpcomingDeadlinesCard items={upcomingDeadlines} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTaskActivityCard rows={recentActivity} />
        </div>

        <CategoryProgressCard
          overallPercent={76}
          categories={categoryProgress}
        />
      </div>

      <NewQuickTaskFab />
    </>
  );
}
