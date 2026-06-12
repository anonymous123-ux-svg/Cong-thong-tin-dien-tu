import { redirect } from "next/navigation";

import { COURSES } from "@/components/courses/mockData";

export default function CoursesNotesIndexPage() {
  const defaultCourseId = COURSES[0]?.id;
  redirect(
    defaultCourseId
      ? `/admin/courses/${defaultCourseId}/notes`
      : "/admin/courses",
  );
}
