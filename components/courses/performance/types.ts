export type ScoreSeriesPoint = {
  label: string;
  score: number;
  classAvg: number;
};

export type TopicMastery = {
  label: string;
  value: number; // 0..100
  tone?: "primary" | "error" | "muted";
};

export type InstructorNote = {
  id: string;
  body: string;
  authorName?: string;
  authorAvatarUrl?: string;
};

export type StandingMetric = {
  label: string;
  valueLabel: string;
  percent: number; // 0..100
  tone: "primary" | "secondary";
};

export type PerformanceSummary = {
  standingPercent: number;
  standingDeltaThisWeek: number;
  metrics: StandingMetric[];
};
