import type {
  InstructorNote,
  PerformanceSummary,
  ScoreSeriesPoint,
  TopicMastery,
} from "./types";

export const scoreSeries: ScoreSeriesPoint[] = [
  { label: "Wk 1", score: 38, classAvg: 34 },
  { label: "Wk 2", score: 55, classAvg: 48 },
  { label: "Wk 3", score: 46, classAvg: 50 },
  { label: "Wk 4", score: 70, classAvg: 58 },
  { label: "Wk 5", score: 78, classAvg: 62 },
  { label: "Wk 6", score: 92, classAvg: 66 },
];

export const topicMastery: TopicMastery[] = [
  { label: "Qubits", value: 78, tone: "primary" },
  { label: "Gates", value: 72, tone: "muted" },
  { label: "Algorithms", value: 55, tone: "muted" },
  { label: "Error Correction", value: 35, tone: "error" },
  { label: "Cryptography", value: 60, tone: "muted" },
  { label: "Entanglement", value: 66, tone: "muted" },
];

export const instructorNotes: InstructorNote[] = [
  {
    id: "note-1",
    body: '"Excellent grasp of superposition principles shown in Assignment 3. However, review the supplementary materials on Shor\'s Algorithm before the midterm."',
    authorName: "Prof. S. Jenkins",
    authorAvatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwNAXGJGgVOcu0_agD63abeR2ApzjR2SBGAAoy2RDQ6-60TODt7zIZbKBpID8RGaP1s7IlsNORsE8d4WUPVogMHyo_of7w0JrMjkXpOT7I2f8MW6BqqkixJ3ytvWj3I3AFua0fE89SZs0lFDyyVNnUyX7QxpY31NAUM7TjwULrotvEomPMAnZxkMuWecH80dWuNNMvV30qfpaSLZUKadbNurmZZMCIekmkDv6x97j2H6bil-3VfKh5vlwf3A144RDcAgGmGjkR8q40",
  },
  {
    id: "note-2",
    body: '"Solid performance on the quiz. Pay closer attention to decoherence rates in practical scenarios."',
  },
];

export const performanceSummary: PerformanceSummary = {
  standingPercent: 88,
  standingDeltaThisWeek: 4,
  metrics: [
    {
      label: "Completion Rate",
      valueLabel: "100%",
      percent: 100,
      tone: "secondary",
    },
    {
      label: "Percentile Rank",
      valueLabel: "Top 15%",
      percent: 85,
      tone: "primary",
    },
  ],
};

export const peerDistributionBars = [10, 30, 60, 85, 100, 50, 20];
export const peerDistributionLabels = ["< 60", "70", "80", "88", "100"];
