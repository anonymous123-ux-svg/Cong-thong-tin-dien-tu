import type { ReactNode } from "react";

import TaskMemberHeader from "@/components/task-member/TaskMemberHeader";
import { getTaskMemberDetail } from "@/components/task-member/mockData";

export default async function TaskMemberLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ taskId: string }>;
}) {
  const { taskId } = await params;
  const detail = getTaskMemberDetail(taskId);

  return (
    <>
      <TaskMemberHeader detail={detail} />
      {children}
    </>
  );
}
