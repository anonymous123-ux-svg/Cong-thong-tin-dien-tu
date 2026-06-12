import type { ClassDirectoryItem } from "./types";

export const CLASSES_DIRECTORY_ITEMS: ClassDirectoryItem[] = [
  {
    id: "advanced-physics",
    title: "Advanced Physics",
    enrolledLabel: "42 Students",
    status: { label: "IN SESSION", tone: "success" },
    icon: "physics",
    instructor: {
      name: "Dr. Elena Rodriguez",
      avatarUrl: "https://i.pravatar.cc/80?img=32",
    },
  },
  {
    id: "calculus-ii",
    title: "Calculus II",
    enrolledLabel: "128 Students",
    status: { label: "WAITLIST", tone: "neutral" },
    icon: "calculus",
    instructor: {
      name: "Prof. Julian Vane",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
    },
  },
  {
    id: "data-structures",
    title: "Data Structures",
    enrolledLabel: "85 Students",
    status: { label: "IN SESSION", tone: "success" },
    icon: "dataStructures",
    instructor: {
      name: "Dr. Sarah Chen",
      avatarUrl: "https://i.pravatar.cc/80?img=47",
    },
  },
  {
    id: "urban-design-1",
    title: "Urban Design I",
    enrolledLabel: "30 Students",
    status: { label: "ACTIVE", tone: "neutral" },
    icon: "urbanDesign",
    instructor: {
      name: "Prof. Marcus Thorne",
      avatarUrl: "https://i.pravatar.cc/80?img=8",
    },
  },
  {
    id: "cognitive-neuro",
    title: "Cognitive Neuro",
    enrolledLabel: "56 Students",
    status: { label: "ACTIVE", tone: "neutral" },
    icon: "cognitiveNeuro",
    instructor: {
      name: "Dr. Amara Okafor",
      avatarUrl: "https://i.pravatar.cc/80?img=20",
    },
  },
  {
    id: "world-literature",
    title: "World Literature",
    enrolledLabel: "92 Students",
    status: { label: "ACTIVE", tone: "neutral" },
    icon: "worldLiterature",
    instructor: {
      name: "Prof. Arthur Sterling",
      avatarUrl: "https://i.pravatar.cc/80?img=22",
    },
  },
  {
    id: "empty-class",
    title: "Empty Class (Test)",
    enrolledLabel: "0 Students",
    status: { label: "ACTIVE", tone: "neutral" },
    icon: "worldLiterature",
    instructor: {
      name: "TBD Instructor",
      avatarUrl: "https://i.pravatar.cc/80?img=13",
    },
  },
];
