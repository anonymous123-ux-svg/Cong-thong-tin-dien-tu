import { CheckCircle2, CircleDashed, Lock } from "lucide-react";

import CurriculumLessonRow from "./CurriculumLessonRow";
import type { CurriculumModule } from "./types";

type Props = {
  module: CurriculumModule;
};

export default function CurriculumModuleCard({ module }: Props) {
  const isCompleted = module.state === "completed";
  const isInProgress = module.state === "inProgress";
  const isLocked = module.state === "locked";

  const sectionClassName = isInProgress
    ? "relative overflow-hidden rounded-xl bg-white p-8 shadow-[0px_20px_40px_rgba(21,28,39,0.04)] ring-1 ring-[#3D52A0]/10"
    : isLocked
      ? "rounded-xl bg-slate-50/50 p-8 opacity-75"
      : "rounded-xl bg-white p-8 transition-all duration-300 hover:bg-slate-50 hover:shadow-[0px_20px_40px_rgba(21,28,39,0.06)]";

  const statusLabelClassName = isCompleted
    ? "block mb-2 text-label-md font-label font-semibold uppercase tracking-widest text-[#16A34A]"
    : isInProgress
      ? "block mb-2 text-label-md font-label font-semibold uppercase tracking-widest text-[#3D52A0]"
      : "block mb-2 text-label-md font-label font-semibold uppercase tracking-widest text-slate-400";

  const pillClassName = isCompleted
    ? "flex items-center gap-2 rounded-full bg-[#16A34A]/10 px-3 py-1 text-sm font-medium text-[#16A34A]"
    : isInProgress
      ? "flex items-center gap-2 rounded-full bg-[#3D52A0]/10 px-3 py-1 text-sm font-medium text-[#3D52A0]"
      : "flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-400";

  const pillIcon = isCompleted
    ? CheckCircle2
    : isInProgress
      ? CircleDashed
      : Lock;

  return (
    <section className={sectionClassName} id={module.id}>
      {isInProgress ? (
        <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#3D52A0] to-[#8697C4]" />
      ) : null}

      <div className="mb-6 flex items-start justify-between">
        <div>
          <span className={statusLabelClassName}>
            Module {module.index} •{" "}
            {isCompleted
              ? "Completed"
              : isInProgress
                ? "In Progress"
                : "Locked"}
          </span>
          <h3 className="text-title-lg font-headline font-medium text-slate-900">
            {module.title}
          </h3>
        </div>

        <div className={pillClassName}>
          <span className="sr-only">Progress</span>
          {(() => {
            const Icon = pillIcon;
            return <Icon className="h-4.5 w-4.5" aria-hidden="true" />;
          })()}
          <span>{module.progressLabel}</span>
        </div>
      </div>

      {module.lessons && module.lessons.length > 0 ? (
        <div className="flex flex-col gap-4">
          {module.lessons.map((lesson) => (
            <CurriculumLessonRow key={lesson.id} lesson={lesson} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
