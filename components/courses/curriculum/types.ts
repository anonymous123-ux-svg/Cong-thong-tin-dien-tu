export type CurriculumLessonKind = "video" | "reading" | "quiz";
export type CurriculumLessonStatus =
  | "completed"
  | "active"
  | "locked"
  | "available";

export type CurriculumLesson = {
  id: string;
  title: string;
  meta: string;
  kind: CurriculumLessonKind;
  status: CurriculumLessonStatus;
  ctaLabel?: string;
};

export type CurriculumModuleState = "completed" | "inProgress" | "locked";

export type CurriculumModule = {
  id: string;
  index: number;
  title: string;
  state: CurriculumModuleState;
  progressLabel: string;
  lessons?: CurriculumLesson[];
};
