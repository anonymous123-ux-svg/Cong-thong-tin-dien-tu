import type { ClassDetail } from "./types";

export const CLASS_DETAIL: ClassDetail = {
  code: "PH-202",
  levelLabel: "Undergraduate",
  title: "Advanced Physics",
  lecturerLine: "Dr. Aris Thorne • Theoretical Physics Dept.",
  heroImageUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuC1HVm_sdggg7obBoITd94wu-NnPYVVpgJhAZVsnhyQlazOeg33Yb18_qvrAJ8UyakvZNtIcH96g1-6BM2cY1twA9EFvknC7AEjwqBhlJGrQ4wWHql5Hj-TCqnS2kFYiBpvigYX_zoRg9P8r0fPhlLTCQ_yso2RirRNBhBzpDkiswQJaZqbc0i3OrsVLy_H80c8d5lup8TP5Dekaap4WeuVPbU2WTXT-t_6NeBzdt8RqtAFysVSUDPUB_GXiWIws-2Wb4SfxeFL6wtz",
  description:
    "This course provides a rigorous exploration of quantum mechanics, electromagnetism, and statistical thermodynamics. Designed for second-year physics majors, we focus on the mathematical frameworks that define our understanding of the universe at both the cosmic and subatomic scales.",
  learningObjectives: [
    "Master Schrödinger's equation",
    "Apply Maxwell's equations to circuits",
    "Understand entropy and thermodynamics",
  ],
  prerequisites:
    "Completion of PH-101 and Calculus III with a minimum grade of B+.",
  meetings: [
    {
      id: "meeting-1",
      month: "Oct",
      day: "24",
      title: "Quantum Tunneling Lecture",
      location: "Hall B",
      timeRange: "10:00 AM - 11:30 AM",
    },
    {
      id: "meeting-2",
      month: "Oct",
      day: "26",
      title: "Electromagnetism Lab",
      location: "Lab 402",
      timeRange: "02:00 PM - 05:00 PM",
    },
  ],
  lecturer: {
    name: "Dr. Aris Thorne",
    titleLine: "PhD, Theoretical Physics",
    bio: "Specializing in quantum field theory and high-energy particle physics with over 15 years of academic research experience.",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDs1f-VAIThuXjR6re4KeoTcLLRgBOLLqE-zspeBmKdFAtq1sh3SOZ6J0w_SEq5lcLb7p3I8Sv6MyLp-jk3lHy0bad7TYohrnMprjxo_5D_6OLUru6bCygqghVc1z_poYfKisy7eF_LQ2HqQvAFlVeqhq5jHVloaYDCdBBgP-OYtDkVIuoh2IdOaqH5NKl3LCDd54jrH6j6x4Ad3qC8DfTYs9BSfstKWylUylOSZe0bVCKqAq6Imf0EY26jckjl2qxARoQJWtunUBDe",
  },
  resources: [
    {
      id: "res-1",
      kind: "book",
      title: "University Physics v14",
      subtitle: "Hugh D. Young & Roger A. Freedman",
    },
    {
      id: "res-2",
      kind: "pdf",
      title: "Quantum Mechanics Intro",
      subtitle: "PDF • 12.4 MB",
    },
    {
      id: "res-3",
      kind: "lab",
      title: "Safety Manual Lab-01",
      subtitle: "Mandatory Reading",
    },
  ],
  stats: {
    students: 42,
    avgGrade: 3.8,
  },
};
