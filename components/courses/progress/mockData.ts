import type {
  Achievement,
  ModuleProgress,
  ProgressSummary,
  TimeSpent,
} from "./types";

export const progressSummary: ProgressSummary = {
  percentComplete: 75,
  lessonsDone: 32,
  lessonsRemaining: 10,
  estimatedCompletionNote:
    "You are on track to complete this course by October 15th. Keep up the excellent pace.",
};

export const timeSpent: TimeSpent = {
  totalHours: 42,
  deltaHoursThisWeek: 5,
};

export const modulesProgress: ModuleProgress[] = [
  {
    id: "module-1",
    title: "1. Quantum Mechanics Fundamentals",
    subtitle: "Superposition, Entanglement, and Interference",
    status: "completed",
    percent: 100,
  },
  {
    id: "module-2",
    title: "2. Quantum Gates and Circuits",
    subtitle: "Pauli Gates, Hadamard, and CNOT",
    status: "inProgress",
    percent: 45,
  },
  {
    id: "module-3",
    title: "3. Quantum Algorithms",
    subtitle: "Shor's Algorithm and Grover's Search",
    status: "locked",
    percent: 0,
  },
];

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Quiz Master",
    subtitle: "100% ON 3 QUIZZES",
    tone: "tertiary",
    icon: "medal",
  },
  {
    id: "ach-2",
    title: "Fast Learner",
    subtitle: "5 MODULES IN 1 WK",
    tone: "secondary",
    icon: "zap",
  },
  {
    id: "ach-3",
    title: "Algorithm Ace",
    subtitle: "LOCKED",
    tone: "muted",
    isLocked: true,
    icon: "award",
  },
  {
    id: "ach-4",
    title: "Circuit Designer",
    subtitle: "LOCKED",
    tone: "muted",
    isLocked: true,
    icon: "lightbulb",
  },
];
