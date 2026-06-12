export type AnalyticsDateRange =
  | "Last 7 Days"
  | "Last 30 Days"
  | "Last 90 Days";

export type AnalyticsKpi = {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  deltaTone: "up" | "down" | "neutral";
  emphasis?: "primary";
  footer?: string;
};

export type AnalyticsProductivityMember = {
  id: string;
  name: string;
  avatarUrl: string;
  scoreLabel: string;
};

export type AnalyticsBreakdownRow = {
  id: string;
  title: string;
  subtitle: string;
  status: "Completed" | "In Progress" | "Paused";
  timeSpent: string;
  complexity: 1 | 2 | 3;
  owner: {
    name: string;
    avatarUrl: string;
  };
  trendTone: "success" | "primary" | "danger";
};

export type CompletionVelocityPoint = {
  id: string;
  actualPercent: number | null;
  predictedPercent: number;
  showTodayCallout?: boolean;
};

export type WorkloadTeamRow = {
  id: string;
  label: string;
  percent: number;
  tone: "success" | "warning" | "danger";
  flag?: "OVER CAPACITY";
};
