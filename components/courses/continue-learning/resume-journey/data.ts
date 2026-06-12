import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import {
  Brain,
  CheckCircle2,
  ClipboardList,
  Code,
  Download,
  FilePenLine,
  Flame,
  Lightbulb,
  Lock,
  MessageSquare,
  Play,
  PlayCircle,
  Send,
  Trophy,
  Video,
} from "lucide-react";

export type LucideIcon = ComponentType<LucideProps>;

export type QuickAction = {
  id: string;
  label: string;
  Icon: LucideIcon;
};

export type ContinueWatchingItem = {
  id: string;
  title: string;
  subtitle: string;
  durationLabel: string;
  progressPercent: number;
  imageSrc?: string;
  imageAlt?: string;
  variant?: "default" | "viewAll";
};

export type Achievement = {
  id: string;
  label: string;
  Icon: LucideIcon;
  tone: "primary" | "tertiary" | "secondary" | "neutral";
  locked?: boolean;
};

export type LearningStat = {
  id: string;
  label: string;
  value: string;
  progressPercent: number;
  Icon: LucideIcon;
  tone: "primary" | "secondary";
};

export type Deadline = {
  id: string;
  title: string;
  dueLabel: string;
  tone: "danger" | "warning";
  Icon: LucideIcon;
};

export type QuizOption = {
  id: string;
  label: string;
};

export type UpcomingLesson = {
  id: string;
  title: string;
  meta: string;
  locked?: boolean;
  Icon: LucideIcon;
};

export type RecentQuestion = {
  id: string;
  question: string;
  previewAnswer: string;
};

export type DiscussionThread = {
  id: string;
  title: string;
  meta: string;
  avatarSrc: string;
  avatarAlt: string;
};

export const RESUME_JOURNEY = {
  moduleTitle: "Module 4: Quantum Entanglement & Superposition",
  upNextTitle: "Understanding Bell States",
  videoTimeLabel: "14:22 / 28:00",
  videoProgressPercent: 51,
  videoThumbnailSrc:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDq24GKYP7zUQdVPG9IU4mYvk1YOtyKhK4AJsqwrGUz4cq6_ptyod-ScOD1Fl7RvP58y7HlJHtIEbmR4tp0Cn7ZdGn56gQETMe7TFMBK-g41CbWzTIBEPon6cJ_Eypcrxh_oBxIVp6Eed4BarOI1XZ2QMLzm5XZBTUciihsIY5tXjzg9bJ6-AIjU5mA6ta1skLI97vcLx0ZPRR178gfY5HE6m1Qmx3h6RvIpeEMITy9YhPQmQn3H6WebzQ6gJ_c_jO8Buzau_Q_8sQu",
  videoThumbnailAlt:
    "Abstract rendering of quantum waves glowing in dark space",
  streakDays: 5,
};

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "qa-notes", label: "Review Notes", Icon: FilePenLine },
  { id: "qa-res", label: "Resources", Icon: Download },
  { id: "qa-ask", label: "Ask Instructor", Icon: MessageSquare },
  { id: "qa-complete", label: "Mark Complete", Icon: CheckCircle2 },
];

export const CONTINUE_WATCHING: ContinueWatchingItem[] = [
  {
    id: "cw-1",
    title: "Quantum Gates Deep Dive",
    subtitle: "Module 3",
    durationLabel: "12:05",
    progressPercent: 80,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVDtY53rNnQc_NmwzUZHPKMgl_lLrhdDvCnbGP2sBKfDAf-5g3c5Pv2ueORyjHBHAvZR3OP0mtb48lcY_j6iIyWvNBk-PkgPjQcgJ50rrOB8oKH890yZBxe3Rt3cYoklLNSl-k884HcmuNFCbkL296IfGcL8rEdqJtB5iwIQLKRSOTOx8QzAL8jr0Op6VBi025y22p5qZSGzUId5tfLec25R9xSVYSoIrf3d0M-zpgBD102a-hubYVXUouuR1myMzbPSERKPDRFgz_",
    imageAlt: "Quantum circuit diagram on dark background",
  },
  {
    id: "cw-2",
    title: "Linear Algebra Review",
    subtitle: "Prerequisites",
    durationLabel: "45:10",
    progressPercent: 25,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDxn02SMYDV7qFtWY2zMbAa0HCcJUDUOm61J9fkpWadxWpHmaE_56fsRzc_9p2CmxjmakaeqKXWO23KfnUz5rSCanMEOtRhKiqVniyZPoP8u1Ag1ihfrKtXJja8dOqZK4diWKhsdhknNDF2EGWpSJKJScEUtNDztPWJG_AQ92l6EXriXfxUkfjficCb2s39kqjHFPsF7nOylZ6CYtkA_34StN8NO5dgW4NSWET7oaQ33JfGReNyUxfUuZmIIJNMROnyOLzrWbnek332",
    imageAlt: "Abstract mathematical equations",
  },
  {
    id: "cw-3",
    title: "Superposition Basics",
    subtitle: "Module 2",
    durationLabel: "18:40",
    progressPercent: 62,
    imageSrc:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAtdIb2KlKl3XOx_043wVFkPBP2RzGtvwcNlKOGcDfW6et_9ZvpEklxP-EsakT7oOsswWOPbm9WQK2p8vlrUCGk7-cq0j4x-ZuCjbOnxYNKSDrY1DFg2Yx3wPYfSCeLB5KKKD9UUwRqYykAcKWR9CPAzckONgHfk2WzdkaYMaQumkf6zvj8QaqAB-xYrXMbQ8DTR_YPgcI_nEJtE-af0BXYdM6wuWvFRYs9juapAXi6LQChKihRP3oRabLPTR-Ux_A9M39bqcZlfqfz",
    imageAlt: "Neon abstract wave visualization",
  },
  {
    id: "cw-view",
    title: "View All History",
    subtitle: "See your past viewing",
    durationLabel: "",
    progressPercent: 0,
    variant: "viewAll",
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: "ach-1", label: "Completed Module 3", Icon: Trophy, tone: "tertiary" },
  { id: "ach-2", label: "5-Day Streak", Icon: Flame, tone: "tertiary" },
  { id: "ach-3", label: "Perfect Quiz", Icon: Brain, tone: "primary" },
  {
    id: "ach-4",
    label: "Qubit Master",
    Icon: Lock,
    tone: "neutral",
    locked: true,
  },
];

export const INSTRUCTOR_NOTE = {
  title: "Instructor Note",
  body: "Before resuming the video, ensure you have reviewed the previous section on the Hadamard gate. The concepts of entanglement build heavily on creating localized superpositions first. Have your notes ready!",
  Icon: Lightbulb,
};

export const LEARNING_STATS: LearningStat[] = [
  {
    id: "ls-1",
    label: "Total Time",
    value: "12h 45m",
    progressPercent: 65,
    Icon: Video,
    tone: "primary",
  },
  {
    id: "ls-2",
    label: "Lessons",
    value: "24/32",
    progressPercent: 75,
    Icon: CheckCircle2,
    tone: "secondary",
  },
  {
    id: "ls-3",
    label: "Module Progress",
    value: "45%",
    progressPercent: 45,
    Icon: ClipboardList,
    tone: "primary",
  },
];

export const UPCOMING_DEADLINES: Deadline[] = [
  {
    id: "dl-1",
    title: "Problem Set 3",
    dueLabel: "Due Tomorrow, 11:59 PM",
    tone: "danger",
    Icon: ClipboardList,
  },
  {
    id: "dl-2",
    title: "Midterm Project Proposal",
    dueLabel: "Due in 3 days",
    tone: "warning",
    Icon: ClipboardList,
  },
];

export const KNOWLEDGE_CHECK = {
  question: "What happens to a qubit when it is measured?",
  options: [
    { id: "q1", label: "It splits into two states." },
    { id: "q2", label: "It collapses to 0 or 1." },
    { id: "q3", label: "It remains in superposition." },
  ] satisfies QuizOption[],
};

export const UPCOMING_LESSONS: UpcomingLesson[] = [
  {
    id: "ul-1",
    title: "Quantum Teleportation Protocol",
    meta: "18 min",
    Icon: PlayCircle,
  },
  {
    id: "ul-2",
    title: "Lab: Implementing Bell States",
    meta: "Practical Exercise",
    locked: true,
    Icon: Code,
  },
  {
    id: "ul-3",
    title: "Module 4 Knowledge Check",
    meta: "Quiz • 10 Qs",
    locked: true,
    Icon: Brain,
  },
];

export const INSTRUCTOR_QA = {
  instructorName: "Dr. Sarah Chen",
  instructorMeta: "Typically replies in 2 hrs",
  instructorAvatarSrc: "https://i.pravatar.cc/80?img=11",
  instructorAvatarAlt: "Instructor avatar",
  recentQuestions: [
    {
      id: "rq-1",
      question: "Why do we use the CNOT gate here?",
      previewAnswer:
        "Great question! The CNOT gate creates the entanglement between...",
    },
    {
      id: "rq-2",
      question: "Difference between phi and psi states?",
      previewAnswer: "Phi states have correlated parity, while...",
    },
  ] satisfies RecentQuestion[],
  SendIcon: Send,
};

export const DISCUSSION_THREADS: DiscussionThread[] = [
  {
    id: "dt-1",
    title: "Study group for Midterm?",
    meta: "Started by Alex M. • 12 replies",
    avatarSrc: "https://i.pravatar.cc/80?img=32",
    avatarAlt: "Student avatar",
  },
  {
    id: "dt-2",
    title: "Struggling with Dirac notation",
    meta: "Started by Jamie T. • 5 replies",
    avatarSrc: "https://i.pravatar.cc/80?img=47",
    avatarAlt: "Student avatar",
  },
];

export const ICONS = {
  Play,
  Send,
};
