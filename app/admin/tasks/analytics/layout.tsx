import type { ReactNode } from "react";

import TaskAnalyticsProvider from "@/components/task-analytics/TaskAnalyticsProvider";
import TaskAnalyticsHeader from "@/components/task-analytics/TaskAnalyticsHeader";

export default function TaskAnalyticsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TaskAnalyticsProvider>
      <TaskAnalyticsHeader />
      {children}
    </TaskAnalyticsProvider>
  );
}
