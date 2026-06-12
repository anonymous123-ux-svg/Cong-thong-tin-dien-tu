export type ClassDetailTabKey = "overview" | "roster" | "schedule";

export type Meeting = {
  id: string;
  month: string;
  day: string;
  title: string;
  location: string;
  timeRange: string;
};

export type Resource = {
  id: string;
  kind: "book" | "pdf" | "lab";
  title: string;
  subtitle: string;
};

export type Lecturer = {
  name: string;
  titleLine: string;
  bio: string;
  avatarUrl: string;
};

export type ClassDetail = {
  code: string;
  levelLabel: string;
  title: string;
  lecturerLine: string;
  heroImageUrl: string;
  description: string;
  learningObjectives: string[];
  prerequisites: string;
  meetings: Meeting[];
  lecturer: Lecturer;
  resources: Resource[];
  stats: {
    students: number;
    avgGrade: number;
  };
};
