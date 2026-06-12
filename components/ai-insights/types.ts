export type AiInsightWeek = {
  label: string;
  barHeight: number; // 0..100
  dotOffset: number; // 0..100 (percentage from bottom)
  isCurrent?: boolean;
  faded?: boolean;
};

export type AiRecommendationTone = "primary" | "error" | "neutral";

export type AiRecommendation = {
  tone: AiRecommendationTone;
  tagLabel: string;
  title: string;
  description: string;
};

export type AtRiskTone = "critical" | "warning";

export type AtRiskStudent = {
  name: string;
  studentId: string;
  avatarUrl: string;
  engagementTone: AtRiskTone;
  engagementPercent: number;
  reasoningTags: Array<{ label: string; tone: "danger" | "neutral" | "warn" }>;
  currentGradePercent: number;
  actionLabel: string;
};

export type AiCohortInsightsData = {
  classTitle: string;
  lastSyncedLabel: string;
  optimalTrendLabel: string;
  predictionTargetLabel: string;
  weeks: AiInsightWeek[];
  heatmap: {
    periodLabel: string;
    days: string[];
    grid: number[][]; // [row][col] 0..4
  };
  sentiment: {
    score: number;
    label: string;
    quote: string;
  };
  recommendations: {
    title: string;
    items: AiRecommendation[];
    synthesis: {
      title: string;
      description: string;
    };
  };
  atRisk: {
    title: string;
    subtitle: string;
    highAlertCount: number;
    monitoringCount: number;
    students: AtRiskStudent[];
  };
};
