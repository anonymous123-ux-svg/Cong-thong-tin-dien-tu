import type { ReactNode } from "react";

import TaskScheduleProvider from "@/components/task-schedule/TaskScheduleProvider";
import TaskScheduleHeader from "@/components/task-schedule/TaskScheduleHeader";
import StatStrip from "@/components/task-schedule/StatStrip";

export default function TaskScheduleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TaskScheduleProvider>
      <TaskScheduleHeader />
      <StatStrip />
      {children}
    </TaskScheduleProvider>
  );
}
