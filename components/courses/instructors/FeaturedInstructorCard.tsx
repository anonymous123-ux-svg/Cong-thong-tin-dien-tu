import Image from "next/image";
import { AtSign, BriefcaseBusiness, CalendarCheck } from "lucide-react";

import type { CourseInstructor } from "./types";

type Props = {
  instructor: CourseInstructor;
};

export default function FeaturedInstructorCard({ instructor }: Props) {
  return (
    <div className="col-span-1 rounded-xl border border-gray-100 bg-white p-8 shadow-[0px_20px_40px_rgba(21,28,39,0.06)] transition-all hover:bg-gray-50 md:col-span-2 lg:col-span-2">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="shrink-0">
          <Image
            src={instructor.avatarUrl}
            alt={instructor.name}
            width={192}
            height={192}
            className="h-32 w-32 rounded-xl object-cover md:h-48 md:w-48"
            priority
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <div className="mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {instructor.roleLabel}
            </span>
            <h3 className="mt-1 text-2xl font-semibold text-gray-900">
              {instructor.name}
            </h3>
          </div>

          <p className="mb-6 max-w-[60ch] text-sm leading-relaxed text-gray-500 md:text-base">
            {instructor.bio}
          </p>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              <span>{instructor.availabilityLabel}</span>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Email"
                className="flex items-center justify-center rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <AtSign className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                aria-label="Work"
                className="flex items-center justify-center rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                className="rounded-full bg-indigo-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-800"
              >
                {instructor.primaryActionLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
