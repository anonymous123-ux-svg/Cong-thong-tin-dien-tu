import type { ReactNode } from "react";

import TaskResourcesProvider from "@/components/task-resources/TaskResourcesProvider";
import TaskResourcesHeader from "@/components/task-resources/TaskResourcesHeader";

export default function TaskResourcesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TaskResourcesProvider>
      <div className="mx-auto w-full max-w-6xl space-y-10">
        <TaskResourcesHeader />
        {children}
      </div>
    </TaskResourcesProvider>
  );
}
