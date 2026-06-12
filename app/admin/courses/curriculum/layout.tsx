import type { ReactNode } from "react";

import CurriculumShell from "@/components/courses/curriculum/CurriculumShell";

export default function CoursesCurriculumLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="-mx-6 md:-mx-10">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-0 md:px-12 lg:px-20">
        <CurriculumShell>{children}</CurriculumShell>
      </div>
    </div>
  );
}
