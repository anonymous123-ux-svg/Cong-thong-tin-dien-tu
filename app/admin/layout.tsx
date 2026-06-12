"use client";

import type { ReactNode } from "react";
import { useSelectedLayoutSegments } from "next/navigation";

import AdminShell from "../../components/layout/AdminShell";
import FocusedWorkspaceShell from "../../components/layout/FocusedWorkspaceShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const segments = useSelectedLayoutSegments();

  // Refactored: Reliable segment checking instead of full URL splitting
  const isAssignmentWorkspaceRoute = segments[0] === "courses" && segments[1] === "assignments";

  if (isAssignmentWorkspaceRoute) {
    return <FocusedWorkspaceShell>{children}</FocusedWorkspaceShell>;
  }

  return <AdminShell>{children}</AdminShell>;
}
