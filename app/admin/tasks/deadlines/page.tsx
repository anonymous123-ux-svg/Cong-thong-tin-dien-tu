import AllDeadlinesHeader from "@/components/task-deadlines/AllDeadlinesHeader";
import DeadlineSummaryCards from "@/components/task-deadlines/DeadlineSummaryCards";
import DeadlinesInteractiveSection from "@/components/task-deadlines/DeadlinesInteractiveSection";
import {
  deadlines,
  deadlineModules,
  deadlineSummary,
} from "@/components/task-deadlines/mockData";

export default function DeadlinesPage() {
  return (
    <div className="transition-all duration-300">
      <AllDeadlinesHeader />

      <DeadlineSummaryCards
        overdue={deadlineSummary.overdue}
        dueToday={deadlineSummary.dueToday}
        thisWeek={deadlineSummary.thisWeek}
        completed={deadlineSummary.completed}
      />

      <DeadlinesInteractiveSection
        items={deadlines}
        modules={deadlineModules}
      />
    </div>
  );
}
