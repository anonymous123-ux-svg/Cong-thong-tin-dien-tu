import { Check, CircleHelp, FileText, Lock, PlayCircle } from "lucide-react";

import type { CurriculumLesson } from "./types";

const KIND_ICON = {
  video: PlayCircle,
  reading: FileText,
  quiz: CircleHelp,
} as const;

type Props = {
  lesson: CurriculumLesson;
};

export default function CurriculumLessonRow({ lesson }: Props) {
  const Icon = KIND_ICON[lesson.kind];

  const isLocked = lesson.status === "locked";
  const isCompleted = lesson.status === "completed";
  const isActive = lesson.status === "active";

  const wrapperClassName = isActive
    ? "group flex cursor-pointer items-center justify-between rounded-lg border border-[#3D52A0]/20 bg-[#3D52A0]/5 p-4"
    : "group flex cursor-pointer items-center justify-between rounded-lg bg-white p-4 transition-colors hover:bg-slate-50";

  const metaClassName = isActive
    ? "mt-0.5 text-sm text-[#3D52A0]/70"
    : "mt-0.5 text-sm text-slate-500";

  return (
    <div
      className={
        isLocked
          ? "flex items-center justify-between rounded-lg bg-white p-4 opacity-60 grayscale-50"
          : wrapperClassName
      }
    >
      <div className="flex items-center gap-4">
        <Icon
          className={
            isActive
              ? "h-5 w-5 text-[#3D52A0]"
              : isCompleted
                ? "h-5 w-5 text-[#16A34A]"
                : "h-5 w-5 text-slate-400"
          }
          aria-hidden="true"
        />

        <div>
          <h4
            className={
              isActive
                ? "text-body-lg font-medium text-[#3D52A0]"
                : "text-body-lg font-medium text-slate-800 transition-colors group-hover:text-[#3D52A0]"
            }
          >
            {lesson.title}
          </h4>
          <p className={metaClassName}>{lesson.meta}</p>
        </div>
      </div>

      {isActive && lesson.ctaLabel ? (
        <button
          type="button"
          className="rounded-full bg-[#3D52A0] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2D3F80]"
        >
          {lesson.ctaLabel}
        </button>
      ) : isLocked ? (
        <Lock className="h-5 w-5 text-slate-400" aria-hidden="true" />
      ) : isCompleted ? (
        <Check className="h-5 w-5 text-[#16A34A]" aria-hidden="true" />
      ) : null}
    </div>
  );
}
