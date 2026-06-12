import type { ReactNode } from "react";

export default function CoursePerformanceLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
