export type CourseTab =
  | "Overview"
  | "Curriculum"
  | "Students"
  | "Resources"
  | "Reviews";

export type CurriculumLesson = {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "live" | "locked";
};

export type CurriculumModule = {
  id: string;
  indexLabel: string;
  title: string;
  meta: string;
  state: "expanded" | "collapsed" | "active";
  lessons?: CurriculumLesson[];
};
