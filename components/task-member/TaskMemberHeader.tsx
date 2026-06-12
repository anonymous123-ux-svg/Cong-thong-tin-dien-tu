import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

import type { TaskMemberDetail } from "./types";
import TaskMemberActions from "./TaskMemberActions";

export default function TaskMemberHeader({
  detail,
}: {
  detail: TaskMemberDetail;
}) {
  return (
    <div className="mb-10">
      <Link
        href="/admin/tasks/list"
        className="group mb-6 inline-flex items-center gap-2 font-semibold text-[#2D2DE8] transition-transform hover:translate-x-[-4px]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Task List</span>
      </Link>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold tracking-widest text-gray-600 uppercase">
              {detail.moduleLabel}
            </span>
            <span className="flex items-center gap-1 text-sm font-bold text-green-600">
              <CheckCircle2 className="h-4 w-4" />
              {detail.phaseLabel}
            </span>
          </div>

          <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
            {detail.title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-500">
            {detail.description}
          </p>
        </div>

        <TaskMemberActions />
      </div>
    </div>
  );
}
