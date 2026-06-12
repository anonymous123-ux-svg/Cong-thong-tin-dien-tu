import type { ModuleNode, NoteMeta } from "./types";

export const pinnedNotes: NoteMeta[] = [
  {
    id: "note-pinned-1",
    title: "Quantum Superposition Core Principles",
    excerpt:
      "Understanding how qubits exist in multiple states simultaneously is fundamental to...",
    pinned: true,
    updatedAt: "Oct 24, 2023",
  },
];

export const modules: ModuleNode[] = [
  {
    id: "module-1",
    title: "Module 1: Foundations",
    iconTone: "primary",
    items: [
      { id: "note-1", title: "Linear Algebra Review" },
      { id: "note-2", title: "Complex Numbers in Quantum" },
    ],
  },
  {
    id: "module-2",
    title: "Module 2: Qubits & Gates",
    iconTone: "muted",
    items: [
      { id: "note-3", title: "Bloch Sphere Visualization" },
      { id: "note-4", title: "Pauli Gates & Hadamard" },
    ],
  },
];

export const initialActiveNote: NoteMeta = {
  id: "note-1",
  title: "Linear Algebra Review: Matrices & Vectors",
  excerpt:
    "To understand quantum mechanics at a computational level, a solid grasp of linear algebra is non-negotiable...",
  moduleId: "module-1",
  moduleLabel: "Module 1: Foundations",
  updatedAt: "Oct 24, 2023",
};
