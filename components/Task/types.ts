export type TaskPriority = "High" | "Medium" | "Low";

export type Assignment = {
  id: string;
  title: string;
  priority: TaskPriority;
  dueText: string;
  completion: number;
  progressWidthClassName: string;
  barColorClassName: string;
};

export type LearningResource = {
  id: string;
  title: string;
  meta: string;
  type: "book" | "video";
};
