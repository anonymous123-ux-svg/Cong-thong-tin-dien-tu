import ComprehensiveBreakdownTable from "@/components/task-schedule/ComprehensiveBreakdownTable";
import GanttTimeline from "@/components/task-schedule/GanttTimeline";
import MonthlyCalendar from "@/components/task-schedule/MonthlyCalendar";
import QuickActionsBar from "@/components/task-schedule/QuickActionsBar";
import TaskProgressCard from "@/components/task-schedule/TaskProgressCard";
import TeamAvailabilityCard from "@/components/task-schedule/TeamAvailabilityCard";
import TodayAgenda from "@/components/task-schedule/TodayAgenda";
import UpcomingDeadlinesCard from "@/components/task-schedule/UpcomingDeadlinesCard";

export default function TaskSchedulePage() {
  return (
    <>
      <section className="mb-8 grid grid-cols-12 gap-8">
        <MonthlyCalendar />

        <div className="col-span-12 flex flex-col gap-8 lg:col-span-4">
          <TodayAgenda />
          <TaskProgressCard />
        </div>

        <GanttTimeline />
        <TeamAvailabilityCard />
        <UpcomingDeadlinesCard />
      </section>

      <ComprehensiveBreakdownTable />
      <QuickActionsBar />
    </>
  );
}
