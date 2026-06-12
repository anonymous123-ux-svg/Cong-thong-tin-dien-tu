import CourseCard from "./CourseCard";
import type { Course } from "./types";

export default function CourseGrid({
  courses,
  view,
}: {
  courses: Course[];
  view: "grid" | "list";
}) {
  return (
    <section
      className={
        view === "list"
          ? "grid grid-cols-1 gap-4"
          : "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
      }
    >
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </section>
  );
}
