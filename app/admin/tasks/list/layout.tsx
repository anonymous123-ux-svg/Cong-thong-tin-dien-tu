import type { ReactNode } from "react";

import TaskListHeader from "@/components/task-list/TaskListHeader";
import TaskListProvider from "@/components/task-list/TaskListProvider";
import TaskListToolbar from "@/components/task-list/TaskListToolbar";
import { TASK_LIST_HEADER_TEAM } from "@/components/task-list/mockData";

export default function TaskListLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TaskListHeader
        members={TASK_LIST_HEADER_TEAM.members}
        extraCount={TASK_LIST_HEADER_TEAM.extraCount}
      />

      <TaskListProvider>
        <TaskListToolbar />
        {children}
      </TaskListProvider>
    </>
  );
}
