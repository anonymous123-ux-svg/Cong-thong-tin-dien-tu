import type { DeadlinePriority } from "../types";

export type DeadlineGradingItem = {
  label: string;
  weight: string;
};

export type DeadlineResource = {
  id: string;
  title: string;
  meta: string;
  variant: "pdf" | "link";
  href?: string;
};

export type DeadlineDetailContent = {
  description: string;
  learningObjectives: string[];
  gradingCriteria: DeadlineGradingItem[];
  resources: DeadlineResource[];
  courseUnitLabel: string;
  progressPercent: number;
  progressLabel: string;
};

export const DEADLINE_DETAIL_CONTENT: Record<string, DeadlineDetailContent> = {
  "qm-pset-4": {
    description:
      "This assignment focuses on the application of the Schrödinger equation to one-dimensional potentials, specifically looking at the finite square well and the harmonic oscillator models.",
    learningObjectives: [
      "Master the derivation of energy levels for finite potential wells.",
      "Apply Dirac notation to state vector manipulations.",
      "Analyze the orthogonality of Hermite polynomials in the context of the quantum harmonic oscillator.",
    ],
    gradingCriteria: [
      { label: "Mathematical Rigor & Derivations", weight: "40%" },
      { label: "Physical Interpretation of Results", weight: "30%" },
      { label: "Clarity of Notation & Diagrams", weight: "30%" },
    ],
    resources: [
      {
        id: "pset-pdf",
        title: "Problem Set #4 PDF",
        meta: "2.4 MB • Syllabus Attached",
        variant: "pdf",
      },
      {
        id: "sim-link",
        title: "Interactive Sim: Potential Wells",
        meta: "External Simulation Tool",
        variant: "link",
      },
    ],
    courseUnitLabel: "Unit 3: Wave Mechanics",
    progressPercent: 65,
    progressLabel: "65% of assignments completed",
  },
};

export function getPriorityLabel(priority: DeadlinePriority) {
  return `Priority: ${priority}`;
}
