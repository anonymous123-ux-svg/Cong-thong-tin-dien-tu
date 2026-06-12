import type { ReactNode } from "react";

export default function CourseDiscussionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
