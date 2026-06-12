export type ScheduleViewMode = "Month" | "Week" | "Day";

export type ScheduleStatCard = {
  id: string;
  label: string;
  value: string;
  badge?: {
    label: string;
    tone: "success" | "warning" | "danger" | "neutral";
    icon?: "trendingUp" | "verified";
  };
  iconTone: "primary" | "tertiary" | "danger" | "success";
  icon: "assignment" | "pending" | "eventBusy" | "check";
};

export type CalendarLegendItem = {
  id: string;
  label: string;
  tone: "primary" | "success" | "tertiary";
};

export type CalendarTask = {
  id: string;
  day: number;
  label: string;
  tone: "primary" | "success" | "danger";
};

export type AgendaItem = {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  tone: "primary" | "success" | "tertiary" | "muted";
  completed?: boolean;
};

export type ProgressSegment = {
  id: string;
  label: string;
  percent: number;
  tone: "success" | "primary" | "tertiary" | "danger";
};

export type GanttTask = {
  id: string;
  label: string;
  tone: "primary" | "success" | "tertiary" | "muted";
  startOffsetPercent: number;
  widthPercent: number;
  progressLabel: string;
  progressToneText?: "onPrimary" | "onTertiary" | "onSurface";
};

export type TeamAvailabilityMember = {
  id: string;
  name: string;
  role: string;
  avatarUrl: string;
  slots: ("free" | "busy")[];
};

export type UpcomingDeadline = {
  id: string;
  day: string;
  month: string;
  title: string;
  subtitle: string;
  tone: "danger" | "tertiary" | "primary";
};

export type BreakdownRow = {
  id: string;
  taskName: string;
  module: string;
  status: "Active" | "Complete" | "In Review";
  assigneeAvatarUrl: string;
  dates: string;
  progressPercent: number;
  progressTone: "primary" | "success" | "tertiary";
  priority: "High" | "Low" | "Med";
  priorityTone: "danger" | "muted" | "tertiary";
};
