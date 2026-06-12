import type { ReactNode } from "react";

export default function CourseOverviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="-m-6 md:-m-10">
      <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-0 md:px-12 lg:px-20">
        {children}
      </div>
    </div>
  );
}
