export type TaskPriority = "High" | "Medium" | "Low";

export type TaskStatus = "In Progress" | "Completed" | "Planning";

export type TaskTeamMember = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type TaskListRow = {
  id: string;
  title: string;
  subtitle: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDateLabel: string;
  dueDateISO: string;
  team: TaskTeamMember[];
};

export type TaskListSortBy = "Due Date" | "Priority" | "Status";
