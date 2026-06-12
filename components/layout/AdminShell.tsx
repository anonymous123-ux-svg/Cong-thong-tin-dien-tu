"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CourseSidebar from "@/components/courses/CourseSidebar";
import CourseCreatorSidebar from "@/components/courses/create-course/CourseCreatorSidebar";
import TaskSidebar from "../Task/TaskSidebar";

type AdminShellProps = {
  children: ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();
  const isTasksRoute = pathname.startsWith("/admin/tasks");
  const isTaskMemberRoute = pathname.startsWith("/admin/tasks/members");
  const isTaskDeadlinesRoute = pathname.startsWith("/admin/tasks/deadlines");
  const isCoursesRoute = pathname.startsWith("/admin/courses");
  const isCreateCourseRoute = pathname.startsWith(
    "/admin/courses/create-course",
  );
  const isCreateClassRoute = pathname.startsWith(
    "/admin/class-management/create-class",
  );

  const sidebar =
    isCreateClassRoute ? null : isTaskMemberRoute ? null : isTaskDeadlinesRoute ? null : isTasksRoute ? (
      <TaskSidebar />
    ) : isCreateCourseRoute ? (
      <CourseCreatorSidebar />
    ) : isCoursesRoute ? (
      <CourseSidebar />
    ) : (
      <Sidebar />
    );

  return (
    <div className="min-h-screen flex bg-background text-on-surface">
      {sidebar}

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <main className="flex-1 min-w-0 bg-background overflow-y-auto pt-16 pb-20">
          {children}
        </main>
      </div>
    </div>
  );
}
