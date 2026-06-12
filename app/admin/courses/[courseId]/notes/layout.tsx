import type { ReactNode } from "react";

export default function CourseNotesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="h-[calc(100vh-4rem-5rem)] min-h-0 overflow-hidden">
      {children}
    </div>
  );
}
