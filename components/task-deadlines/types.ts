export type DeadlinePriority = "High" | "Medium" | "Low";

export type DeadlineStatus = "Overdue" | "Due Soon" | "Active" | "Completed";

export type DeadlineCategory = "Critical" | "Major" | "Regular";

export type DeadlineItem = {
  id: string;
  /** ISO date: YYYY-MM-DD */
  dueDate: string;
  dateLabel: string;
  timeLabel: string;
  taskName: string;
  module: string;
  priority: DeadlinePriority;
  status: DeadlineStatus;
  calendarCategory?: DeadlineCategory;
};
