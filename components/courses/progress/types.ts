export type ProgressSummary = {
  percentComplete: number;
  lessonsDone: number;
  lessonsRemaining: number;
  estimatedCompletionNote: string;
};

export type TimeSpent = {
  totalHours: number;
  deltaHoursThisWeek: number;
};

export type ModuleProgressStatus = "completed" | "inProgress" | "locked";

export type ModuleProgress = {
  id: string;
  title: string;
  subtitle: string;
  status: ModuleProgressStatus;
  percent: number;
};

export type Achievement = {
  id: string;
  title: string;
  subtitle: string;
  tone: "tertiary" | "secondary" | "muted";
  isLocked?: boolean;
  icon: "medal" | "zap" | "award" | "lightbulb";
};
