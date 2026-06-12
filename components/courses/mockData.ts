import type { Course } from "./types";

export type CourseListStatus = "Active" | "Draft";

export type CourseManagementListItem = {
  id: string;
  title: string;
  code: string;
  createdLabel: string;
  category: string;
  status: CourseListStatus;
  students: number;
  rating: number | null;
  iconKey: "biotech" | "terminal" | "history";
};

export type CourseManagementFeaturedPath = {
  badgeLabel: string;
  title: string;
  description: string;
  progressPercent: number;
  progressWidthClassName: string;
  imageSrc: string;
  imageAlt: string;
};

export type CourseManagementSideCard = {
  title: string;
  description: string;
  studentsLabel: string;
};

export const COURSE_MANAGEMENT_FEATURED_PATH: CourseManagementFeaturedPath = {
  badgeLabel: "TRENDING",
  title: "Quantum Mechanics Foundations",
  description:
    "Advanced theoretical framework covering wave-particle duality and Schrödinger equations.",
  progressPercent: 68,
  progressWidthClassName: "w-[68%]",
  imageSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD4VR85jgs3Q4aMe4g7sBoWmSwmNdKZx63miTw3ilExH02gtKnmZCh3pQGhKPM1BVZXANb7s4J4uM3mbdgv2WtnSA37uxPWjjJ4bdU7POQtTTuvL95Xpv05wraQPny0R3TNqrKNqsFAgsrxyOOHlPas6NIK1vljH3te7MUDXsZTWw7o4uASBYxAemUlRY03sLptsgTkMXSGKJF8pos-usEUTP9wfyVZPrfCRaF6lSwKIXncFkMDEDdgHTsrh_DoyvwHTRcJ8jvfc4Pf",
  imageAlt:
    "Abstract 3D visualization of atomic particles and wave functions with indigo and teal lines",
};

export const COURSE_MANAGEMENT_SIDE_CARD: CourseManagementSideCard = {
  title: "Linear Algebra I",
  description:
    "Matrices, vector spaces, and linear transformations for engineers.",
  studentsLabel: "84 Students Enrolled",
};

export const COURSE_MANAGEMENT_TOTAL_COURSES = 42;

export const COURSE_MANAGEMENT_COURSES: CourseManagementListItem[] = [
  {
    id: "course-modern-astrophysics",
    title: "Modern Astrophysics",
    code: "AST-405",
    createdLabel: "Created 12 Oct",
    category: "Sciences",
    status: "Active",
    students: 1240,
    rating: 4.9,
    iconKey: "biotech",
  },
  {
    id: "course-computational-physics",
    title: "Computational Physics",
    code: "CP-301",
    createdLabel: "Created 05 Sep",
    category: "Technology",
    status: "Active",
    students: 856,
    rating: 4.7,
    iconKey: "terminal",
  },
  {
    id: "course-history-of-science",
    title: "History of Science",
    code: "HIS-102",
    createdLabel: "Created 20 Aug",
    category: "Humanities",
    status: "Draft",
    students: 0,
    rating: null,
    iconKey: "history",
  },
];

const BASE_COURSES: Course[] = [
  {
    id: "course-quantum-foundations",
    code: "QM",
    title: "Quantum Mechanics: Foundations of Modern Reality",
    description:
      "Explore the paradoxical nature of subatomic particles and the...",
    category: "Quantum Physics",
    lifecycle: "Active",
    publishStatus: "Published",
    students: 1248,
    rating: 4.9,
    modules: 12,
    updatedAt: "2026-03-12",
    thumbnailSrc: "/courses/quantum.svg",
    avatarUrls: [
      "https://i.pravatar.cc/80?img=32",
      "https://i.pravatar.cc/80?img=12",
      "https://i.pravatar.cc/80?img=7",
    ],
    featured: true,
  },
  {
    id: "course-cognitive-synthesis",
    code: "CS",
    title: "Advanced Cognitive Psychology: Neural Synthesis",
    description:
      "A deep dive into the human brain's information processing capabilities...",
    category: "Cognitive Science",
    lifecycle: "Completed",
    publishStatus: "Published",
    students: 850,
    rating: 4.7,
    modules: 8,
    updatedAt: "2026-02-26",
    thumbnailSrc: "/courses/cognitive.svg",
    avatarUrls: [
      "https://i.pravatar.cc/80?img=24",
      "https://i.pravatar.cc/80?img=47",
    ],
    featured: true,
  },
  {
    id: "course-advanced-neural-networks",
    code: "NN",
    title: "Advanced Neural Networks & Deep Learning Architectures",
    description:
      "Transformers, attention, and generative modeling for research-grade systems...",
    category: "Computer Science",
    lifecycle: "Active",
    publishStatus: "Published",
    students: 1240,
    rating: 4.9,
    modules: 12,
    updatedAt: "2026-03-21",
    thumbnailSrc: "/courses/quantum.svg",
    avatarUrls: [
      "https://i.pravatar.cc/80?img=19",
      "https://i.pravatar.cc/80?img=41",
    ],
    featured: false,
  },
  {
    id: "course-linguistic-architecture",
    code: "LA",
    title: "Linguistic Architecture: Evolution of Semantics",
    description:
      "Analyzing the structural foundations of global languages and their...",
    category: "Linguistics",
    lifecycle: "Draft",
    publishStatus: "Draft",
    students: 0,
    rating: null,
    modules: 15,
    updatedAt: "2026-03-02",
    thumbnailSrc: "/courses/linguistic.svg",
    avatarUrls: ["https://i.pravatar.cc/80?img=19"],
    featured: true,
  },
  {
    id: "course-linear-algebra-logic",
    code: "LA",
    title: "Linear Algebra & Logic",
    description: "Vector spaces, proofs, and reasoning for ML and beyond...",
    category: "Mathematics",
    lifecycle: "Active",
    publishStatus: "In Review",
    students: 850,
    rating: 4.7,
    modules: 10,
    updatedAt: "2026-02-10",
    thumbnailSrc: "/courses/quantum.svg",
    avatarUrls: [
      "https://i.pravatar.cc/80?img=3",
      "https://i.pravatar.cc/80?img=41",
    ],
  },
  {
    id: "course-ancient-history-nile",
    code: "AH",
    title: "Ancient History: The Nile",
    description: "Empires, trade, and culture along the river Nile...",
    category: "History",
    lifecycle: "Draft",
    publishStatus: "Draft",
    students: 0,
    rating: null,
    modules: 6,
    updatedAt: "2026-01-18",
    thumbnailSrc: "/courses/linguistic.svg",
    avatarUrls: [],
  },
  {
    id: "course-ai-ethics",
    code: "AE",
    title: "AI Ethics & Governance",
    description: "Practical ethics, policy, and responsible deployment...",
    category: "AI",
    lifecycle: "Active",
    publishStatus: "Archived",
    students: 603,
    rating: 4.6,
    modules: 9,
    updatedAt: "2025-12-02",
    thumbnailSrc: "/courses/cognitive.svg",
    avatarUrls: ["https://i.pravatar.cc/80?img=32"],
  },
];

export const COURSES: Course[] = Array.from({ length: 42 }, (_, i) => {
  const base = BASE_COURSES[i % BASE_COURSES.length];
  return {
    ...base,
    id: `${base.id}-${i + 1}`,
    title: base.title,
    updatedAt: base.updatedAt,
  };
});

export function getCourseById(courseId: string): Course | undefined {
  return COURSES.find((c) => c.id === courseId);
}
