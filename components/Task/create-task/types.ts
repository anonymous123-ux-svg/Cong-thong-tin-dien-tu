export type TaskPriority = "low" | "medium" | "high";

export type CreateTaskFormState = {
  title: string;
  description: string;
  assignedClass: string;
  deadline: string;
  priority: TaskPriority;
  attachments: File[];
};
