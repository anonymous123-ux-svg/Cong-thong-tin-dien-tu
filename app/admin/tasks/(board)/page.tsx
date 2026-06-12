import TaskFilters from "@/components/Task/TaskFilters";
import TaskQuickEntry from "@/components/Task/TaskQuickEntry";
import TaskList from "@/components/Task/TaskList";

export default function AdminTasksPage() {
  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      <div className="space-y-8 lg:col-span-8">
        <TaskQuickEntry />
        <TaskList />
      </div>

      <TaskFilters />
    </div>
  );
}
