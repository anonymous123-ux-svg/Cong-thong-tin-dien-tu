import { assignments } from "./mockData";
import TaskAssignmentItem from "./TaskAssignmentItem";

export default function TaskList() {
  return (
    <div className="space-y-4">
      <div className="mb-2 flex items-center justify-between px-1">
        <h4 className="text-lg font-bold">Active Assignments</h4>
        <button type="button" className="text-sm font-medium text-indigo-600">
          View Calendar
        </button>
      </div>

      {assignments.map((assignment) => (
        <TaskAssignmentItem key={assignment.id} assignment={assignment} />
      ))}
    </div>
  );
}
