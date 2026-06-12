import Image from "next/image";
import Link from "next/link";
import { Layers, MoreVertical } from "lucide-react";

import type { Course } from "./types";

function lifecycleBadge(lifecycle: Course["lifecycle"]) {
  switch (lifecycle) {
    case "Completed":
      return "bg-secondary-container/60 text-secondary";
    case "Active":
      return "bg-primary/10 text-primary";
    case "Draft":
      return "bg-surface-container-high text-outline";
  }
}

export default function CourseCard({ course }: { course: Course }) {
  return (
    <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link
        href={`/admin/courses/${course.id}`}
        className="relative h-40 block"
        aria-label={`Open ${course.title}`}
      >
        <Image
          src={course.thumbnailSrc}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover"
          priority={Boolean(course.featured)}
        />

        <span
          className={
            "absolute top-3 right-3 text-[10px] font-extrabold uppercase tracking-[0.18em] rounded-full px-3 py-1 " +
            lifecycleBadge(course.lifecycle)
          }
        >
          {course.lifecycle.toUpperCase()}
        </span>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-sm font-extrabold text-on-surface leading-snug">
            <Link
              href={`/admin/courses/${course.id}`}
              className="hover:underline"
            >
              {course.title}
            </Link>
          </h3>

          <button
            type="button"
            className="h-8 w-8 rounded-full flex items-center justify-center text-outline hover:bg-surface-container-low"
            aria-label="More"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex -space-x-2">
            {course.avatarUrls.slice(0, 3).map((url, idx) => (
              <Image
                key={`${course.id}-avatar-${idx}`}
                src={url}
                alt=""
                width={24}
                height={24}
                className="h-6 w-6 rounded-full border-2 border-surface-container-lowest object-cover"
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-outline">
            <Layers className="h-4 w-4" />
            <span className="text-[10px] font-bold uppercase tracking-[0.18em]">
              {course.modules} Modules
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
