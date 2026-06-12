export type StatTone = "success" | "neutral" | "danger";

export type StatIconKey = "students" | "attendance" | "performance" | "alerts";

export type StatCard = {
  id: string;
  label: string;
  value: string;
  badge: string;
  badgeTone: StatTone;
  icon: StatIconKey;
};

export type SectionRow = {
  id: string;
  name: string;
  instructor: {
    initials: string;
    name: string;
    tone: "primary" | "primaryContainer";
  };
  occupancy: {
    current: number;
    max: number;
    tone: "secondary" | "primary";
  };
  schedule: string;
  status: {
    label: string;
    tone: "secondary" | "primary";
  };
};

export type RiskTone = "critical" | "high" | "medium";

export type AtRiskStudent = {
  id: string;
  initials: string;
  name: string;
  tone: RiskTone;
  note: string;
};

export type UpcomingEvent = {
  id: string;
  month: string;
  day: string;
  title: string;
  meta: string;
};

export type RecentActivityItem = {
  id: string;
  avatarUrl: string;
  name: string;
  action: string;
  timeAgo: string;
  badge: {
    label: string;
    tone: "secondary" | "primary";
  };
};
