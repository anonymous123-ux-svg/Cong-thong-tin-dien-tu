export type ClassSummary = {
  cohortLabel: string;
  title: string;
  subtitle: string;
};

export type PerformanceCard = {
  id: string;
  label: string;
  value: string;
  valueNote?: string;
  variant: "primary" | "secondary" | "neutral";
  progressLabel?: string;
  progressValue?: number;
};

export type StudentStatus = "Top Performer" | "Stable" | "At Risk";

export type Student = {
  id: string;
  name: string;
  studentIdLabel: string;
  avatarUrl: string;
  status: StudentStatus;
  performance: string;
  lastActive: string;
};

export type GradeAlert = {
  id: string;
  tone: "error" | "success";
  title: string;
  subtitle: string;
};

export type ScheduleItem = {
  id: string;
  day: string;
  time: string;
  location: string;
};
