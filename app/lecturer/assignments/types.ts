export type AssignmentStatus = "Published" | "Draft";
export type AssignmentType = "Lab" | "Homework" | "Quiz";

export type Assignment = {
  id: string;
  title: string;
  module: string;
  type: AssignmentType;
  dueDate: string; // ISO: YYYY-MM-DD
  dueTime?: string; // "23:59" (optional)
  submissionsDone: number;
  submissionsTotal: number;
  status: AssignmentStatus;
};