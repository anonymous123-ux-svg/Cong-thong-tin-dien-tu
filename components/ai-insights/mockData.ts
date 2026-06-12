import type { AiCohortInsightsData } from "./types";

export function getAiCohortInsightsMock(
  classTitle: string,
): AiCohortInsightsData {
  return {
    classTitle,
    lastSyncedLabel: "Last synchronized: 2 mins ago",
    optimalTrendLabel: "Optimal Performance Trend",
    predictionTargetLabel: "Prediction Target: 92%",
    weeks: [
      { label: "W1", barHeight: 55, dotOffset: 18 },
      { label: "W2", barHeight: 68, dotOffset: 28 },
      { label: "W3", barHeight: 80, dotOffset: 36 },
      {
        label: "CURRENT",
        barHeight: 92,
        dotOffset: 46,
        isCurrent: true,
      },
      { label: "W5", barHeight: 80, dotOffset: 40, faded: true },
      { label: "W6", barHeight: 86, dotOffset: 42, faded: true },
    ],
    heatmap: {
      periodLabel: "Last 14 Days",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      grid: [
        [1, 2, 3, 1, 2, 1, 1],
        [2, 3, 4, 2, 4, 2, 1],
        [3, 4, 3, 1, 3, 1, 2],
        [4, 3, 2, 1, 2, 1, 1],
        [1, 2, 3, 1, 2, 1, 1],
      ],
    },
    sentiment: {
      score: 8.4,
      label: "Highly Positive Sentiment",
      quote:
        '"Students show high enthusiasm for Quantum Electrodynamics module. Interaction frequency is 24% above baseline."',
    },
    recommendations: {
      title: "AI Recommendations",
      items: [
        {
          tone: "primary",
          tagLabel: "Content Adjustment",
          title: "Increase 'Special Relativity' Depth",
          description:
            "Class-wide mastery is 15% higher than predicted. Recommend introducing complex Minkowski space problems earlier.",
        },
        {
          tone: "error",
          tagLabel: "Intervention Needed",
          title: "Redesign Quiz: Wave Mechanics",
          description:
            "AI detected structural bias in Question 4. 80% of top performers failed due to semantic ambiguity.",
        },
      ],
      synthesis: {
        title: "New Resource Synthesis",
        description:
          "Synthesizing personalized study paths for 5 divergent learner groups based on current engagement spikes.",
      },
    },
    atRisk: {
      title: "At-Risk Early Warning System",
      subtitle:
        "Proactive identification of students requiring immediate lecturer intervention",
      highAlertCount: 4,
      monitoringCount: 12,
      students: [
        {
          name: "Marcus Thorne",
          studentId: "PHYS-0021",
          avatarUrl: "https://i.pravatar.cc/80?img=15",
          engagementTone: "critical",
          engagementPercent: 22,
          reasoningTags: [
            { label: "Declining quiz consistency", tone: "danger" },
            { label: "Resource inactivity: 10 days", tone: "neutral" },
          ],
          currentGradePercent: 54.2,
          actionLabel: "Schedule Check-in",
        },
        {
          name: "Elena Rodriguez",
          studentId: "PHYS-0145",
          avatarUrl: "https://i.pravatar.cc/80?img=32",
          engagementTone: "warning",
          engagementPercent: 45,
          reasoningTags: [
            { label: "Low resource interaction", tone: "warn" },
            { label: "Discussion outlier", tone: "neutral" },
          ],
          currentGradePercent: 71.8,
          actionLabel: "Send Reminder",
        },
      ],
    },
  };
}
