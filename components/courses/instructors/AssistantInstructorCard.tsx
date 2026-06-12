import Image from "next/image";
import { Clock, Link2 } from "lucide-react";

import type { CourseInstructor } from "./types";

type Props = {
  instructor: CourseInstructor;
};

export default function AssistantInstructorCard({ instructor }: Props) {
  return (
    <div className="col-span-1 flex flex-col rounded-xl border border-gray-100 bg-white p-6 shadow-[0px_20px_40px_rgba(21,28,39,0.06)] transition-all hover:bg-gray-50">
      <div className="mb-4 flex items-start gap-4">
        <Image
          src={instructor.avatarUrl}
          alt={instructor.name}
          width={64}
          height={64}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div className="min-w-0">
          <span className="text-xs font-semibold uppercase tracking-widest text-teal-600">
            {instructor.roleLabel}
          </span>
          <h3 className="truncate text-lg font-medium text-gray-900">
            {instructor.name}
          </h3>
        </div>
      </div>

      <p className="mb-6 flex-1 text-sm text-gray-500">{instructor.bio}</p>

      <div className="mt-auto border-t border-gray-100 pt-4">
        <div className="mb-4 flex items-center gap-2 text-xs text-gray-400">
          <Clock className="h-4 w-4" aria-hidden="true" />
          <span>{instructor.availabilityLabel}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Link"
              className="text-gray-400 transition-colors hover:text-gray-700"
            >
              <Link2 className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <button
            type="button"
            className="rounded-full px-3 py-1.5 text-sm font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
          >
            {instructor.primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
