import type { Course } from "../types";
import AboutCourse from "./AboutCourse";
import AIInsightsCard from "./AIInsightsCard";
import CourseBreadcrumb from "./CourseBreadcrumb";
import CourseHero from "./CourseHero";
import CourseSidebar from "./CourseSidebar";
import CourseTabs from "./CourseTabs";
import CurriculumSection from "./CurriculumSection";
import MobileBottomNav from "./MobileBottomNav";

export default function CourseDetailsView({ course }: { course: Course }) {
  return (
    <>
      <CourseBreadcrumb
        items={[
          { label: "Curriculum", href: "/admin/courses" },
          { label: course.category, href: "/admin/courses" },
          { label: "Neural Networks" },
        ]}
      />

      <CourseHero
        title={course.title}
        instructorName="Dr. Aris Thorne"
        instructorTitle="Senior Research Lead at AI Research Lab"
        instructorAvatarUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDuK9TR2bnrqoTmhh2heXy_G4kpLl6JP85PiNq5oeBFxMwPr8ethZxrZTwRGpaxqP7AGOSLg3-wXWp-yajVcVByLam11xqaqihbFliZiTE4tssANeqH27aYRDAmgDKCG4pfWV3GJbUIknhMyNeKTiCoCZ4d28X5b7iO5LRfdV_JxYJvvImADiNzsw5kqWfRmB5epOZE_oN0dNHenedxket98MbtlWSm7korvujGwloXjoJ_WrxzdMtEXEMyW8_9-FWWzH0IbkjlBu4u"
        progressPercent={64}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <CourseTabs studentsCount={course.students} />

          <div className="space-y-12">
            <AboutCourse />
            <CurriculumSection />
          </div>
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            <CourseSidebar
              enrolledLabel={`${course.students.toLocaleString()} Academic Scholars`}
            />
            <AIInsightsCard />
          </div>
        </aside>
      </div>

      <MobileBottomNav />
    </>
  );
}
