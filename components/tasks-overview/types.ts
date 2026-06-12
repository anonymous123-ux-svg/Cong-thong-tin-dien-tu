export type TaskPriority = "high" | "medium" | "low";

export type TaskStat = {
  id: string;
  label: string;
  value: number;
  badge?: {
    label: string;
    tone: "success" | "info" | "danger";
  };
  icon: "total" | "active" | "completed" | "deadline";
};

export type TrendMode = "weekly" | "monthly";

export type TrendPoint = {
  label: string;
  percent: number;
  heightClassName: string;
  highlight?: boolean;
};

export type WorkloadByPriority = {
  priority: TaskPriority;
  label: string;
  countLabel: string;
  percent: number;
  widthClassName: string;
};

export type UpcomingDeadline = {
  id: string;
  priority: TaskPriority;
  relativeDue: string;
  title: string;
  dueLabel: string;
};

export type RecentActivity = {
  id: string;
  type: "completed" | "added";
  description: string;
  contributor: {
    name: string;
    avatarUrl: string;
  };
  category: string;
  timestamp: string;
};

export type CategoryProgress = {
  label: string;
  percent: number;
  tone: "primary" | "success" | "muted";
};
