import type {
  AnalyticsBreakdownRow,
  AnalyticsKpi,
  AnalyticsProductivityMember,
  CompletionVelocityPoint,
  WorkloadTeamRow,
} from "./types";

export const ANALYTICS_KPIS: AnalyticsKpi[] = [
  {
    id: "completion",
    label: "Completion Rate",
    value: "84.2%",
    deltaLabel: "12%",
    deltaTone: "up",
  },
  {
    id: "efficiency",
    label: "Member Efficiency",
    value: "4.2",
    deltaLabel: "5.4%",
    deltaTone: "up",
    footer: "tasks/day",
  },
  {
    id: "health",
    label: "AI Health Score",
    value: "A+",
    deltaLabel: "0.8%",
    deltaTone: "up",
    emphasis: "primary",
    footer: "AI predicted: Excellent",
  },
  {
    id: "forecast",
    label: "Forecasted Finish",
    value: "Oct 24, 2024",
    deltaLabel: "2d",
    deltaTone: "down",
  },
];

export const COMPLETION_VELOCITY: CompletionVelocityPoint[] = [
  { id: "p1", predictedPercent: 30, actualPercent: 25 },
  { id: "p2", predictedPercent: 50, actualPercent: 45 },
  { id: "p3", predictedPercent: 70, actualPercent: 68 },
  {
    id: "p4",
    predictedPercent: 90,
    actualPercent: 84,
    showTodayCallout: true,
  },
  { id: "p5", predictedPercent: 95, actualPercent: null },
];

export const PRODUCTIVITY_MEMBERS: AnalyticsProductivityMember[] = [
  {
    id: "m1",
    name: "Sarah Jenkins",
    scoreLabel: "92%",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC9aR4kWw0MSMpdVZlQloJzTl5AgT1U12VzeuTkupnXiPXrlIfNElMxEQKTvFFhfcCMNejfCtsf37tKOQRPaWkdUIvQE4g1p2SBJTXFk6prVXQvUAzzPSc_HvvEs5lJSrbBeXBf5hrNp6LCZs3ZU-jYNT-hIN9p-DO_oeYDke5w_lkGGKXZbJtauBOt7guOvvt6edFpiV7KqRHFLkS7yFpKXNSMcQXw0wJhI7v16C-GIIJEsKxVlJf50_aTtdpACUg3K7Onr36gtcqp",
  },
  {
    id: "m2",
    name: "David Chen",
    scoreLabel: "88%",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA-ltDVBXlNqzZ5kSjc7aMqB9X36sHHtf-74datUgv4U2dfJFvDxSjhoc9escbgqrBfbz9GeeF8_wgBIoZlyQFFP6VDpz4KTYDLc45wpJzLKg8LWkkscp3-UkNyvLeh8DcGlunAYF8FrbvRIiKfVQ_3GhwHIWSTinX4v3slGTUxCYoYiXTXNzkrfnJo5PowKTqSBH_NoAC189OZpFrS7C9x5TsZQ4uCbObG3UP1qjEj7gqRtJWkgFBPaicEdVuF3lVf40TdAj9HujIq",
  },
  {
    id: "m3",
    name: "Dr. Rodriguez",
    scoreLabel: "85%",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCMoQj6EYrlKC0Z6IZ1YHhCtKDeUHSeBdYAo3KTS77-37QZZKDALkvLq9Lk-zHFo3FXkcI8U5BfSCXukXdIUHDSbv2wi-m79ePkq1-ugWyn-nHbDGQr2SqkQNP-mizhtDBdHMLk4dBwNfzbVHWOWHF4TJrhldpBmw5DdQEQkwaQRaKbRFuHl6pdLTOwX09m4Jx1WP-V9AId-vNFQcfMqWf3wfbB74W6vJ1MCsFotnxxV9v_pAIodhSN-JPUMIsDxW-FzJ-LVI4Tg7Ut",
  },
];

export const WORKLOAD_TEAMS: WorkloadTeamRow[] = [
  { id: "t1", label: "Core Research Team", percent: 82, tone: "warning" },
  { id: "t2", label: "Data Analysis Unit", percent: 45, tone: "success" },
  {
    id: "t3",
    label: "Review & Publication",
    percent: 95,
    tone: "danger",
    flag: "OVER CAPACITY",
  },
];

export const BREAKDOWN_ROWS: AnalyticsBreakdownRow[] = [
  {
    id: "b1",
    title: "Literature Review Phase II",
    subtitle: "Neural Pathways",
    status: "Completed",
    timeSpent: "24.5 hrs",
    complexity: 2,
    owner: {
      name: "James Wilson",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD2yN1r8gJHzcKmVP97miAx3gNI4T3k0BD-TG10jNN0rsAdKjltwpYrdC1yGwDNNfwNU1C_PWpQn460F8sChFJ5X8vsDXkNcNvxfLlnq5IeHUkZN13yoo3YkCsiieGbiCnAUU45SZ2j4iEv5iZIMThHOUKUfbYwnfqvHe2CSU2XmPrT4auk69tq1iRX1j8K25H1kNurhep2g9rKl0yXuuSFmblpkfIkXkKl4eRZ9vEUXs6_lV9NT9gg0ct_rrPXbGmvPZqTRIe9gP_P",
    },
    trendTone: "success",
  },
  {
    id: "b2",
    title: "Statistical Modeling A1",
    subtitle: "Climate Resilience",
    status: "In Progress",
    timeSpent: "12.2 hrs",
    complexity: 3,
    owner: {
      name: "Sarah Jenkins",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6-aaAJIxJn-_g-tMzuFgq4ID1VYlaQ1ROU73njHG1d9EcDYRmdDwd0gmLFHwtAyf0T88rqsztNAeWuidxLUisPzI6Dc-UAicsRHxgUfexTxAmz9HUc6Hes7ztES7xEnLqowPjesCpBOruRTfCl9tyEH-7NXtevt2VJw4Yx3BTsNHPJU3k-ddpMvz6Em9ud8cyVAFAxPlJWVX62XdHpOg3lLRFNJpEqXIJn-4rzTCJXKqDi2vUk4r3jzpsVlS8VGJxjdKYqgeZtqhm",
    },
    trendTone: "primary",
  },
  {
    id: "b3",
    title: "Peer Review Coordination",
    subtitle: "Genome Mapping",
    status: "Paused",
    timeSpent: "0.0 hrs",
    complexity: 1,
    owner: {
      name: "Dr. Rodriguez",
      avatarUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCMoQj6EYrlKC0Z6IZ1YHhCtKDeUHSeBdYAo3KTS77-37QZZKDALkvLq9Lk-zHFo3FXkcI8U5BfSCXukXdIUHDSbv2wi-m79ePkq1-ugWyn-nHbDGQr2SqkQNP-mizhtDBdHMLk4dBwNfzbVHWOWHF4TJrhldpBmw5DdQEQkwaQRaKbRFuHl6pdLTOwX09m4Jx1WP-V9AId-vNFQcfMqWf3wfbB74W6vJ1MCsFotnxxV9v_pAIodhSN-JPUMIsDxW-FzJ-LVI4Tg7Ut",
    },
    trendTone: "danger",
  },
];

export const AI_INSIGHT_TEXT =
  "Task completion is 14% higher during morning hours. Recommend shifting deep-work research tasks to 9AM - 12PM for maximum efficiency.";
