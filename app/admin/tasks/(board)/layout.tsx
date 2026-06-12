import type { ReactNode } from "react";

import TaskHeader from "@/components/Task/TaskHeader";

export default function TasksBoardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <TaskHeader />
      {children}
    </>
  );
}
