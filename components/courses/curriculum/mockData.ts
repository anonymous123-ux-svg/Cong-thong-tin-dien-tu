import type { CurriculumModule } from "./types";

export const curriculumModulesMock: CurriculumModule[] = [
  {
    id: "module-1",
    index: 1,
    title: "Foundations of Quantum Mechanics",
    state: "completed",
    progressLabel: "6/6",
    lessons: [
      {
        id: "lesson-1-1",
        title: "Welcome to the Quantum Realm",
        meta: "Video • 12 mins",
        kind: "video",
        status: "completed",
      },
      {
        id: "lesson-1-2",
        title: "Linear Algebra Refresher",
        meta: "Reading • 25 mins",
        kind: "reading",
        status: "completed",
      },
    ],
  },
  {
    id: "module-2",
    index: 2,
    title: "Qubits and Superposition",
    state: "inProgress",
    progressLabel: "2/5",
    lessons: [
      {
        id: "lesson-2-1",
        title: "Understanding the Qubit",
        meta: "Video • 18 mins",
        kind: "video",
        status: "completed",
      },
      {
        id: "lesson-2-2",
        title: "Knowledge Check: Superposition states",
        meta: "Quiz • 10 mins",
        kind: "quiz",
        status: "active",
        ctaLabel: "Resume",
      },
      {
        id: "lesson-2-3",
        title: "Bloch Sphere Visualization",
        meta: "Reading • 15 mins",
        kind: "reading",
        status: "locked",
      },
    ],
  },
  {
    id: "module-3",
    index: 3,
    title: "Quantum Gates and Circuits",
    state: "locked",
    progressLabel: "0/8",
  },
  {
    id: "module-4",
    index: 4,
    title: "Entanglement",
    state: "locked",
    progressLabel: "0/7",
  },
];
