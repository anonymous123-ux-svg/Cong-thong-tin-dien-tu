import type { Assignment, LearningResource } from "./types";

export const assignments: Assignment[] = [
  {
    id: "a1",
    title: "Thermodynamics Mid-term Report",
    priority: "High",
    dueText: "Due in 2 days • Nov 14, 2024",
    completion: 65,
    progressWidthClassName: "w-[65%]",
    barColorClassName: "bg-indigo-700",
  },
  {
    id: "a2",
    title: "Lab Session: Particle Acceleration Analysis",
    priority: "Medium",
    dueText: "Due in 5 days • Nov 17, 2024",
    completion: 30,
    progressWidthClassName: "w-[30%]",
    barColorClassName: "bg-emerald-500",
  },
  {
    id: "a3",
    title: "Weekly Reading: Astrophysics Journal",
    priority: "Low",
    dueText: "Due in 1 week • Nov 21, 2024",
    completion: 90,
    progressWidthClassName: "w-[90%]",
    barColorClassName: "bg-slate-400",
  },
];

export const learningResources: LearningResource[] = [
  {
    id: "r1",
    title: "Quantum Mechanics Syllabus",
    meta: "PDF • 2.4 MB",
    type: "book",
  },
  {
    id: "r2",
    title: "Introduction to Relativity",
    meta: "MP4 • 15:30 min",
    type: "video",
  },
];
