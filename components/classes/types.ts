export type ClassStatusTone = "success" | "neutral";

export type ClassStatus = {
  label: string;
  tone: ClassStatusTone;
};

export type ClassIconKey =
  | "physics"
  | "calculus"
  | "dataStructures"
  | "urbanDesign"
  | "cognitiveNeuro"
  | "worldLiterature";

export type ClassInstructor = {
  name: string;
  avatarUrl: string;
};

export type ClassDirectoryItem = {
  id: string;
  title: string;
  enrolledLabel: string;
  status: ClassStatus;
  icon: ClassIconKey;
  instructor: ClassInstructor;
};

export type ClassesFilterKey = "active" | "archived" | "upcoming";
