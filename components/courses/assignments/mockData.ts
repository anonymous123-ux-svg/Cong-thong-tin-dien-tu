import type { Assignment, FeedbackItem, QuickSubmitConfig } from "./types";

export const ASSIGNMENTS: Assignment[] = [
  {
    id: "assignment-quantum-gates",
    badgeLabel: "Due in 3 days",
    badgeTone: "danger",
    title: "Quantum Gates Implementation",
    moduleLabel: "Module 3 • Practical Exercise",
    description:
      "Implement basic quantum gates (Pauli-X, Y, Z, Hadamard) using Qiskit and demonstrate their effects on single-qubit states. Submit your Jupyter notebook.",
    dueLabel: "Oct 24, 11:59 PM",
    status: "in_progress",
  },
  {
    id: "assignment-bloch-sphere",
    badgeLabel: "Due tomorrow",
    badgeTone: "danger",
    title: "Visualize Bloch Sphere Rotations",
    moduleLabel: "Module 3 • Lab",
    description:
      "Simulate single-qubit rotations and plot Bloch vectors across time steps. Include plots plus a short geometric explanation.",
    dueLabel: "Oct 20, 11:59 PM",
    status: "in_progress",
  },
  {
    id: "assignment-entanglement-analysis",
    badgeLabel: "Next Week",
    badgeTone: "neutral",
    title: "Entanglement Analysis",
    moduleLabel: "Module 4 • Essay",
    description:
      "Analyze a Bell state circuit. Discuss the implications of quantum entanglement in information theory and provide mathematical proofs for non-locality.",
    dueLabel: "Oct 31, 11:59 PM",
    status: "not_started",
  },
  {
    id: "assignment-noise-models",
    badgeLabel: "Opens Friday",
    badgeTone: "neutral",
    title: "Noise Models & Error Mitigation",
    moduleLabel: "Module 5 • Practical Exercise",
    description:
      "Implement a depolarizing noise model, compare ideal vs noisy outcomes, and discuss basic mitigation techniques.",
    dueLabel: "Nov 6, 11:59 PM",
    status: "not_started",
  },
  {
    id: "assignment-qft",
    badgeLabel: "New",
    badgeTone: "neutral",
    title: "Quantum Fourier Transform",
    moduleLabel: "Module 6 • Coding",
    description:
      "Build a QFT circuit, verify correctness with test vectors, and explain how phase kickback appears in the transform.",
    dueLabel: "Nov 13, 11:59 PM",
    status: "not_started",
  },
  {
    id: "assignment-grover",
    badgeLabel: "Review",
    badgeTone: "neutral",
    title: "Grover Search Walkthrough",
    moduleLabel: "Module 6 • Report",
    description:
      "Explain oracle construction, diffusion operator, and expected iteration count. Include a small simulation.",
    dueLabel: "Nov 15, 11:59 PM",
    status: "not_started",
  },
  {
    id: "assignment-linear-algebra",
    title: "Linear Algebra Basics",
    moduleLabel: "Module 1 • Quiz",
    description: "",
    dueLabel: "Submitted on Oct 15",
    status: "submitted",
  },
  {
    id: "assignment-state-tomography",
    title: "State Tomography",
    moduleLabel: "Module 2 • Notebook",
    description:
      "Reconstruct a single-qubit density matrix from measurement statistics and comment on fidelity.",
    dueLabel: "Submitted on Oct 12",
    status: "submitted",
  },
];

export const QUICK_SUBMIT: QuickSubmitConfig = {
  assignmentTitle: "Quantum Gates Implementation",
  acceptedFileTypesLabel: ".ipynb, .pdf, .py",
  submitDisabled: true,
};

export const RECENT_FEEDBACK: FeedbackItem[] = [
  {
    id: "feedback-qubit-superposition",
    title: "Qubit Superposition",
    scoreLabel: "95/100",
    metaLabel: "Module 2 • Graded Oct 10",
    feedbackText:
      '"Excellent work on the visualization portion. Ensure you double-check the normalization constraints in section 3."',
  },
  {
    id: "feedback-basis-change",
    title: "Basis Change & Measurement",
    scoreLabel: "88/100",
    metaLabel: "Module 2 • Graded Oct 6",
    feedbackText:
      '"Good explanation of measurement in different bases. Tighten the link between Bloch sphere angles and measurement probabilities."',
  },
  {
    id: "feedback-unitarity",
    title: "Unitarity Checks",
    scoreLabel: "92/100",
    metaLabel: "Module 1 • Graded Sep 28",
    feedbackText:
      '"Nice derivations. Add one more example showing how composition preserves unitarity."',
  },
  {
    id: "feedback-bell-states",
    title: "Bell States",
    scoreLabel: "90/100",
    metaLabel: "Module 4 • Draft Reviewed",
    feedbackText:
      '"Your circuit is correct. Improve the discussion around correlation vs causation in non-locality interpretations."',
  },
];
