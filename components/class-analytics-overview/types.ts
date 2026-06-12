export type KpiTone = "primary" | "secondary" | "warning" | "purple";

export type KpiItem = {
  id: string;
  label: string;
  value: string;
  deltaLabel: string;
  deltaTone: "up" | "down";
  tone: KpiTone;
};

export type StudentStatusTone = "excellent" | "atRisk" | "stable";

export type StudentRow = {
  id: string;
  initials: string;
  name: string;
  attendanceLabel: string;
  avgScoreLabel: string;
  completedLabel: string;
  statusLabel: string;
  statusTone: StudentStatusTone;
};

export type AiInsightItem = {
  id: string;
  icon: "warning" | "trend" | "search";
  text: string;
};

export type PopularContentItem = {
  id: string;
  kind: "video" | "doc";
  title: string;
  meta: string;
};

export type HeatmapCellTone = "empty" | "low" | "mid" | "high" | "veryHigh";

export type ResourceUsageKey = "videos" | "pdfs" | "quizzes";

export type ResourceUsageItem = {
  key: ResourceUsageKey;
  label: string;
  percent: number;
};

export type ClassAnalyticsOverviewData = {
  title: string;
  subtitle: string;
  kpis: KpiItem[];
  students: StudentRow[];
  aiInsights: AiInsightItem[];
  popularContent: PopularContentItem[];
  heatmap: HeatmapCellTone[];
  resourceUsage: ResourceUsageItem[];
};
