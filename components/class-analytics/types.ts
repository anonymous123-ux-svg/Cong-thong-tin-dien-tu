export type AnalyticsTopStatIconKey = "users" | "bolt" | "star" | "check";

export type AnalyticsTopStat = {
  icon: AnalyticsTopStatIconKey;
  label: string;
  value: string;
  deltaLabel?: string;
  noteLabel?: string;
};

export type AttendanceBar = {
  basePct: number;
  fillPct: number;
};

export type AttendanceChart = {
  rangeLabel: string;
  bars: AttendanceBar[];
  xLabels: [string, string, string];
};

export type GradeDistributionEntry = {
  label: string;
  pct: number;
  barClassName: string;
};

export type GradeDistribution = {
  entries: GradeDistributionEntry[];
  medianValueLabel: string;
};

export type AtRiskSeverity = "CRITICAL" | "WARNING";

export type AtRiskItem = {
  name: string;
  severity: AtRiskSeverity;
  insight: string;
  avatarUrl: string;
};

export type PerformerBadgeIconKey = "award" | "rocket" | "school" | "trophy";

export type PerformerBadge = {
  icon: PerformerBadgeIconKey;
};

export type PerformerTrend = "up" | "flat";

export type TopPerformer = {
  initials: string;
  name: string;
  masteryLabel: string;
  badges: PerformerBadge[];
  trend: PerformerTrend;
};

export type AnalyticsCharts = {
  attendance: AttendanceChart;
  gradeDistribution: GradeDistribution;
};

export type AnalyticsLower = {
  atRisk: { items: AtRiskItem[]; footerLabel: string };
  topPerformers: { badgeLabel: string; items: TopPerformer[] };
};

export type ClassAnalyticsData = {
  title: string;
  subtitle: string;
  topStats: AnalyticsTopStat[];
  charts: AnalyticsCharts;
  lower: AnalyticsLower;
};
