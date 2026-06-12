import type { Course } from "@/components/courses/types";
import CourseOverviewPage from "@/components/courses/overview/CourseOverviewPage";

const OVERVIEW_COURSE: Course = {
  id: "course-intro-quantum-computing",
  code: "CS",
  title: "Introduction to Quantum Computing",
  description:
    "Dive into the fascinating world of quantum mechanics and its revolutionary application to computing.",
  category: "Computer Science",
  lifecycle: "Active",
  publishStatus: "Published",
  students: 15420,
  rating: 4.9,
  modules: 12,
  updatedAt: "2026-04-19",
  thumbnailSrc: "/courses/quantum.svg",
  avatarUrls: [],
};

export default function AdminCoursesPage() {
  return (
    <div className="-m-6 md:-m-10">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-0 md:px-12 lg:px-20">
        <CourseOverviewPage course={OVERVIEW_COURSE} />
      </div>
    </div>
  );
}
