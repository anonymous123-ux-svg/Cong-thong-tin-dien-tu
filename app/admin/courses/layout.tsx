"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();

  const isAssignmentWorkspaceRoute =
    (segments[0] === "assignments" && segments.length === 2) ||
    (segments[1] === "assignments" && segments.length === 3);

  if (isAssignmentWorkspaceRoute) {
    return <>{children}</>;
  }

  return <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">{children}</div>;
}
