import Link from "next/link";

import ModuleProgressCard from "./ModuleProgressCard";
import type { ModuleProgress } from "./types";

type Props = {
  courseId: string;
  modules: ModuleProgress[];
};

export default function ModuleCompletionSection({ courseId, modules }: Props) {
  return (
    <section>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          Module Completion
        </h3>
        <Link
          href={`/admin/courses/${courseId}/curriculum`}
          className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-50"
        >
          View Syllabus
        </Link>
      </div>

      <div className="space-y-4">
        {modules.map((module) => (
          <ModuleProgressCard key={module.id} module={module} />
        ))}
      </div>
    </section>
  );
}
