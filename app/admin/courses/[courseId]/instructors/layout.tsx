import type { ReactNode } from "react";

export default function CourseInstructorsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
