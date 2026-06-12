import type { ClassItem, LectureItem } from "./types";

export const CLASS_ITEMS: ClassItem[] = [
  {
    id: "ph-202",
    code: "PH-202",
    codeTone: "indigo",
    title: "Advanced Physics: Quantum Mechanics",
    lecturerName: "Dr. Sarah Aris",
    lecturerRole: "Lead Physicist",
    avatarUrl: "https://i.pravatar.cc/120?img=32",
    students: 124,
    schedule: "Mon, Wed, Fri",
    progress: 78,
    progressTone: "primary",
  },
  {
    id: "cs-101",
    code: "CS-101",
    codeTone: "emerald",
    title: "Data Structures & Algorithm Design",
    lecturerName: "Prof. Marcus Chen",
    lecturerRole: "Senior Engineer",
    avatarUrl: "https://i.pravatar.cc/120?img=12",
    students: 210,
    schedule: "Tue, Thu",
    progress: 45,
    progressTone: "primary",
  },
  {
    id: "ba-305",
    code: "BA-305",
    codeTone: "amber",
    title: "Financial Ethics & Corporate Responsibility",
    lecturerName: "Dr. Elena Rodriguez",
    lecturerRole: "Ethics Board Chair",
    avatarUrl: "https://i.pravatar.cc/120?img=47",
    students: 88,
    schedule: "Wednesday",
    progress: 92,
    progressTone: "secondary",
  },
];

export const LECTURES: LectureItem[] = [
  {
    id: "lec-1",
    month: "OCT",
    day: "24",
    title: "Thermodynamics Lab",
    meta: "PH-202 • 09:00 AM - 11:30 AM",
    mode: "IN PERSON",
  },
  {
    id: "lec-2",
    month: "OCT",
    day: "25",
    title: "Recursion & Logic",
    meta: "CS-101 • 02:00 PM - 03:30 PM",
    mode: "VIRTUAL",
  },
];
