import TaskListTable from "@/components/task-list/TaskListTable";
import TaskMobileBottomNav from "@/components/task-list/TaskMobileBottomNav";
import TaskStatsGrid from "@/components/task-list/TaskStatsGrid";

export default function TaskListPage() {
  return (
    <>
      <TaskListTable />
      <TaskStatsGrid />
      <TaskMobileBottomNav />
    </>
  );
}
