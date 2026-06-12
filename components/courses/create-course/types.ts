export type EnrollmentType = "paid" | "free";

export type CourseLevel =
  | ""
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Post-Doctoral";

export type CreateCourseFormState = {
  title: string;
  category: string;
  level: CourseLevel;
  description: string;
  enrollmentType: EnrollmentType;
  price: string;
  coverImageUrl: string | null;
};
