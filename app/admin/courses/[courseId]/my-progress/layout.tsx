import type { ReactNode } from "react";

export default function CourseMyProgressLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-full">{children}</div>;
}
