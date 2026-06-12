import type { CategoryItem, ResourceItem, StarredModule } from "./types";

const AVATARS = {
  alistair:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCDzkYxPRMk3sqazpg6qPJtyqND4ggguKp5-PoGtlFXXXOJgu3jsCUpk2W1Wl0ipFdooIZzdEMBKX7znwQ24YOhuA46d60VdJXk6QvBcDfCLQJ5MHBjQlYTGS25WV6L_fkadPtcYa8hIp9NN5YsuDr10GcaMrklOfkzz14p9DNj25r62wyeEhmi5iANgc3giLbbRVQpEGbufU3DiN3Ec1t7T5d1lNkjDGosVk71k0FfbQTf2_pklMH3IS__X6MrLnglpgxQJaYk61cM",
  sarah:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA3vas8IGm68KeYAawgmuISZ1Z_5Xh5y5nRBBRqnvXtr9SCOLTlURX2iD9K7F6TNYPmDanuLH3136VGhm-HpoSeMHhXKyrWgtJBRg5m8fSKzu0gfCMXM8j081DazSiXsx_KiJ-OEuOzFoxxJV4j95AFls38v4BEnqtfZUR07aFQD5VWytLZ_E1fU9vrAPo0XUt28RLaTqWUfYOHE48fhUnLvmSZFR-2EPvBaNpMEuu1mmp86uoWpmYs9NWZpVZsUKaZT6v1VQyAbCS2",
  robert:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAZYCzpVq3PnYjbYaubSeNRfxsAjs0TVLpH1KysBFxV9q1dvXdivcw4sbd2mVYzQYdOimRv-Wj0jWL8Sgc5t7ZSy1K_ZTfnULZ2ctXd6qPIafFC4eD4Xpy0DVRPh7p-OLhStHTINU7yj5gSM7U6jRLlhaiCvszhEa08hC5iz3lUN3MDmVUnQEOgz6h8EgonA2m8JeFfPV5CmAJxKgsM595ZWc3clay_aJmxND6_S7lk-9pu6CvxyvLIuiiJWWWQohZ_JMTpqTM5mE47",
  pravatar11: "https://i.pravatar.cc/80?img=11",
  pravatar12: "https://i.pravatar.cc/80?img=12",
  pravatar13: "https://i.pravatar.cc/80?img=13",
  pravatar14: "https://i.pravatar.cc/80?img=14",
  pravatar15: "https://i.pravatar.cc/80?img=15",
  pravatar16: "https://i.pravatar.cc/80?img=16",
} as const;

export const RESOURCE_CATEGORIES: CategoryItem[] = [
  { key: "all", label: "All Resources", count: 24 },
  { key: "lectures", label: "Lectures" },
  { key: "assignments", label: "Assignments" },
  { key: "research", label: "Research Papers" },
  { key: "datasets", label: "Datasets" },
];

export const STARRED_MODULES: StarredModule[] = [
  {
    id: "quantum-ethics",
    label: "Quantum Ethics",
    dotColorClassName: "bg-primary",
  },
  {
    id: "neuro-linguistics",
    label: "Neuro-Linguistics",
    dotColorClassName: "bg-secondary",
  },
];

export const MOCK_RESOURCES: ResourceItem[] = [
  {
    id: "res-quantum-spin",
    kind: "pdf",
    category: "research",
    title: "Advanced Quantum Mechanics: Fundamentals of Particle Spin",
    description:
      "A comprehensive guide covering the mathematical derivations of electron spin states in three-dimensional space.",
    tags: [{ label: "Physics" }, { label: "Module 04" }],
    author: {
      kind: "avatar",
      name: "Dr. Alistair Vance",
      avatarUrl: AVATARS.alistair,
    },
    updatedLabel: "Updated 2 days ago",
  },
  {
    id: "res-neuro-lecture",
    kind: "video",
    category: "lectures",
    title: "Neuroscience Lecture: The Plasticity of Memory Systems",
    description:
      "Video recording of the guest lecture by Dr. Sarah Chen on synaptic strengthening and LTP mechanisms.",
    tags: [{ label: "Neurobiology" }, { label: "Lecture 12" }],
    author: {
      kind: "avatar",
      name: "Dr. Sarah Chen",
      avatarUrl: AVATARS.sarah,
    },
    updatedLabel: "Added 1 week ago",
  },
  {
    id: "res-ai-ethics-rubric",
    kind: "doc",
    category: "assignments",
    title: "Ethics of Artificial Intelligence: Fall 2024 Final Rubric",
    description:
      "Detailed grading criteria for the semester-end research paper on algorithmic bias and social impact.",
    tags: [{ label: "Ethics" }, { label: "Final" }],
    author: {
      kind: "initials",
      name: "James Doherty",
      initials: "JD",
    },
    updatedLabel: "Added 3 days ago",
  },
  {
    id: "res-gdp-dataset",
    kind: "dataset",
    category: "datasets",
    title: "Macroeconomic Dataset: GDP Trends 1990-2023",
    description:
      "A curated spreadsheet of global GDP fluctuations across major economic zones with inflation adjustments.",
    tags: [{ label: "Economics" }, { label: "Research" }],
    author: {
      kind: "avatar",
      name: "Prof. Robert Miller",
      avatarUrl: AVATARS.robert,
    },
    updatedLabel: "Added yesterday",
  },
  {
    id: "res-linear-algebra-notes",
    kind: "pdf",
    category: "research",
    title: "Linear Algebra Essentials: Eigenvalues & Diagonalization",
    description:
      "Concise notes with worked examples for eigenvectors, diagonalization, and applications in quantum systems.",
    tags: [{ label: "Mathematics" }, { label: "Notes" }],
    author: {
      kind: "avatar",
      name: "Dr. Amina Rahman",
      avatarUrl: AVATARS.pravatar12,
    },
    updatedLabel: "Updated 4 days ago",
  },
  {
    id: "res-ml-lecture-08",
    kind: "video",
    category: "lectures",
    title: "Machine Learning Lecture 08: Regularization & Generalization",
    description:
      "A deep dive into L1/L2 regularization, bias-variance tradeoff, and practical model selection.",
    tags: [{ label: "AI" }, { label: "Lecture 08" }],
    author: {
      kind: "avatar",
      name: "Prof. Leo Nakamura",
      avatarUrl: AVATARS.pravatar13,
    },
    updatedLabel: "Added 2 weeks ago",
  },
  {
    id: "res-statistics-assignment-02",
    kind: "doc",
    category: "assignments",
    title: "Statistics Assignment 02: Hypothesis Testing Practice",
    description:
      "Problem set covering p-values, confidence intervals, and common pitfalls in interpreting results.",
    tags: [{ label: "Statistics" }, { label: "Assignment" }],
    author: { kind: "initials", name: "Maya Brooks", initials: "MB" },
    updatedLabel: "Added 5 days ago",
  },
  {
    id: "res-climate-dataset-2020",
    kind: "dataset",
    category: "datasets",
    title: "Climate Signals Dataset: Temperature Anomalies 1980–2020",
    description:
      "Time-series dataset of global temperature anomalies with regional breakdown and metadata.",
    tags: [{ label: "Climate" }, { label: "Dataset" }],
    author: {
      kind: "avatar",
      name: "Dr. Elena Morozov",
      avatarUrl: AVATARS.pravatar14,
    },
    updatedLabel: "Updated last week",
  },
  {
    id: "res-nlp-paper-transformers",
    kind: "pdf",
    category: "research",
    title: "Transformer Architectures: Attention Mechanisms in Practice",
    description:
      "A practical research summary of transformer variants, training tricks, and evaluation patterns.",
    tags: [{ label: "NLP" }, { label: "Research" }],
    author: {
      kind: "avatar",
      name: "Dr. Sarah Chen",
      avatarUrl: AVATARS.sarah,
    },
    updatedLabel: "Updated 6 days ago",
  },
  {
    id: "res-neuro-lab-handout",
    kind: "doc",
    category: "assignments",
    title: "Neuroscience Lab Handout: Synaptic Plasticity Experiment",
    description:
      "Lab instructions, safety notes, and reporting rubric for the synaptic plasticity session.",
    tags: [{ label: "Neurobiology" }, { label: "Lab" }],
    author: { kind: "initials", name: "S. Patel", initials: "SP" },
    updatedLabel: "Added 1 day ago",
  },
  {
    id: "res-econometrics-lecture-03",
    kind: "video",
    category: "lectures",
    title: "Econometrics Lecture 03: OLS Assumptions & Diagnostics",
    description:
      "Covers OLS assumptions, multicollinearity checks, and interpreting residual plots.",
    tags: [{ label: "Economics" }, { label: "Lecture 03" }],
    author: {
      kind: "avatar",
      name: "Prof. Robert Miller",
      avatarUrl: AVATARS.robert,
    },
    updatedLabel: "Added 3 weeks ago",
  },
  {
    id: "res-data-viz-guide",
    kind: "pdf",
    category: "research",
    title: "Data Visualization Guide: Choosing the Right Chart",
    description:
      "A compact guide to selecting charts, avoiding misleading visuals, and improving readability.",
    tags: [{ label: "Analytics" }, { label: "Guide" }],
    author: {
      kind: "avatar",
      name: "Alex Rivera",
      avatarUrl: AVATARS.pravatar15,
    },
    updatedLabel: "Updated 3 days ago",
  },
  {
    id: "res-chemistry-lecture-12",
    kind: "video",
    category: "lectures",
    title: "Organic Chemistry Lecture 12: Reaction Mechanisms Overview",
    description:
      "Key reaction mechanisms with examples, shortcuts for memorization, and exam tips.",
    tags: [{ label: "Chemistry" }, { label: "Lecture 12" }],
    author: {
      kind: "avatar",
      name: "Dr. Nia Thompson",
      avatarUrl: AVATARS.pravatar16,
    },
    updatedLabel: "Added 6 days ago",
  },
  {
    id: "res-ethics-case-study-pack",
    kind: "doc",
    category: "assignments",
    title: "AI Ethics Case Study Pack: Fairness & Accountability",
    description:
      "Case prompts and discussion questions focused on fairness metrics and real-world tradeoffs.",
    tags: [{ label: "Ethics" }, { label: "Case Study" }],
    author: { kind: "initials", name: "James Doherty", initials: "JD" },
    updatedLabel: "Updated yesterday",
  },
  {
    id: "res-physics-problem-set-07",
    kind: "doc",
    category: "assignments",
    title: "Advanced Physics Problem Set 07: Wave Functions",
    description:
      "Problem set focusing on wave function normalization, expectation values, and operators.",
    tags: [{ label: "Physics" }, { label: "Problem Set" }],
    author: {
      kind: "avatar",
      name: "Dr. Alistair Vance",
      avatarUrl: AVATARS.alistair,
    },
    updatedLabel: "Added 4 days ago",
  },
  {
    id: "res-linguistics-dataset",
    kind: "dataset",
    category: "datasets",
    title: "Language Corpus: Annotated Sentences (Sample Set)",
    description:
      "A compact annotated corpus for POS tagging and parsing experiments with baseline splits.",
    tags: [{ label: "Linguistics" }, { label: "Corpus" }],
    author: {
      kind: "avatar",
      name: "Neuro-Linguistics Lab",
      avatarUrl: AVATARS.pravatar11,
    },
    updatedLabel: "Updated 2 weeks ago",
  },
  {
    id: "res-biology-lecture-05",
    kind: "video",
    category: "lectures",
    title: "Molecular Biology Lecture 05: DNA Repair Pathways",
    description:
      "An overview of DNA repair mechanisms and how cells respond to replication stress.",
    tags: [{ label: "Biology" }, { label: "Lecture 05" }],
    author: {
      kind: "avatar",
      name: "Dr. Elena Morozov",
      avatarUrl: AVATARS.pravatar14,
    },
    updatedLabel: "Added 2 days ago",
  },
  {
    id: "res-econ-dataset-inflation",
    kind: "dataset",
    category: "datasets",
    title: "Inflation Indicators Dataset: Monthly CPI (2000–2025)",
    description:
      "Monthly CPI indicators with region tags, revision notes, and seasonally-adjusted series.",
    tags: [{ label: "Economics" }, { label: "CPI" }],
    author: {
      kind: "avatar",
      name: "Prof. Robert Miller",
      avatarUrl: AVATARS.robert,
    },
    updatedLabel: "Updated 5 days ago",
  },
  {
    id: "res-quantum-reading-list",
    kind: "pdf",
    category: "research",
    title: "Quantum Mechanics Reading List: Core Papers & Commentary",
    description:
      "Curated reading list with brief commentary and suggested progression for deeper study.",
    tags: [{ label: "Physics" }, { label: "Reading" }],
    author: {
      kind: "avatar",
      name: "Dr. Alistair Vance",
      avatarUrl: AVATARS.alistair,
    },
    updatedLabel: "Added 3 weeks ago",
  },
  {
    id: "res-data-science-rubric",
    kind: "doc",
    category: "assignments",
    title: "Data Science Project Rubric: Modeling & Communication",
    description:
      "Evaluation rubric covering feature engineering, model validation, and narrative clarity.",
    tags: [{ label: "Data" }, { label: "Rubric" }],
    author: { kind: "initials", name: "R. Singh", initials: "RS" },
    updatedLabel: "Updated 2 days ago",
  },
  {
    id: "res-psych-lecture-09",
    kind: "video",
    category: "lectures",
    title: "Cognitive Psychology Lecture 09: Memory Consolidation",
    description:
      "Covers consolidation theory, sleep effects, and modern experiments on memory formation.",
    tags: [{ label: "Psychology" }, { label: "Lecture 09" }],
    author: {
      kind: "avatar",
      name: "Dr. Sarah Chen",
      avatarUrl: AVATARS.sarah,
    },
    updatedLabel: "Added 8 days ago",
  },
  {
    id: "res-finance-dataset-returns",
    kind: "dataset",
    category: "datasets",
    title: "Finance Dataset: Historical Returns (Sample Portfolio)",
    description:
      "Daily returns for a sample portfolio with sector labels, volatility, and drawdown markers.",
    tags: [{ label: "Finance" }, { label: "Returns" }],
    author: {
      kind: "avatar",
      name: "Alex Rivera",
      avatarUrl: AVATARS.pravatar15,
    },
    updatedLabel: "Added 10 days ago",
  },
  {
    id: "res-research-methods-guide",
    kind: "pdf",
    category: "research",
    title: "Research Methods Primer: From Question to Publication",
    description:
      "A structured primer on research questions, methods selection, and writing reproducible results.",
    tags: [{ label: "Research" }, { label: "Methods" }],
    author: {
      kind: "avatar",
      name: "Dr. Amina Rahman",
      avatarUrl: AVATARS.pravatar12,
    },
    updatedLabel: "Updated 1 week ago",
  },
  {
    id: "res-assignments-style-guide",
    kind: "doc",
    category: "assignments",
    title: "Submission Style Guide: Formatting & Citations",
    description:
      "Submission checklist for formatting, citations, file naming, and academic integrity notes.",
    tags: [{ label: "Guidelines" }, { label: "Citations" }],
    author: { kind: "initials", name: "Academic Office", initials: "AO" },
    updatedLabel: "Added 2 months ago",
  },
];
