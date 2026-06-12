export type ClassItem = {
  id: string;
  code: string;
  codeTone: "indigo" | "emerald" | "amber";
  title: string;
  lecturerName: string;
  lecturerRole: string;
  avatarUrl: string;
  students: number;
  schedule: string;
  progress: number;
  progressTone: "primary" | "secondary";
};

export type LectureItem = {
  id: string;
  month: string;
  day: string;
  title: string;
  meta: string;
  mode: "IN PERSON" | "VIRTUAL";
};
