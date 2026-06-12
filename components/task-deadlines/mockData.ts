import type { DeadlineItem } from "./types";

export const deadlineSummary = {
  overdue: 3,
  dueToday: 2,
  thisWeek: 12,
  completed: 45,
};

export const deadlineModules = [
  "Advanced Physics",
  "Calculus II",
  "Biochemistry",
];

export const deadlines: DeadlineItem[] = [
  {
    id: "qm-pset-4",
    dueDate: "2026-04-06",
    dateLabel: "Apr 6, 2026",
    timeLabel: "11:59 PM",
    taskName: "Quantum Mechanics Problem Set #4",
    module: "Advanced Physics",
    priority: "High",
    status: "Overdue",
    calendarCategory: "Critical",
  },
  {
    id: "vector-calculus-review",
    dueDate: "2026-04-13",
    dateLabel: "Apr 13, 2026",
    timeLabel: "04:00 PM",
    taskName: "Vector Calculus Mid-term Review",
    module: "Calculus II",
    priority: "Medium",
    status: "Due Soon",
    calendarCategory: "Major",
  },
  {
    id: "enzyme-kinetics-lab",
    dueDate: "2026-04-18",
    dateLabel: "Apr 18, 2026",
    timeLabel: "09:00 AM",
    taskName: "Enzyme Kinetics Lab Report",
    module: "Biochemistry",
    priority: "Low",
    status: "Active",
    calendarCategory: "Regular",
  },
  {
    id: "thermo-quiz-1",
    dueDate: "2026-04-25",
    dateLabel: "Apr 25, 2026",
    timeLabel: "Done",
    taskName: "Thermodynamics Quiz 1",
    module: "Advanced Physics",
    priority: "Low",
    status: "Completed",
  },
];
