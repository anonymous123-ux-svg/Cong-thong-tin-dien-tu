import { BadgeCheck, Sparkles } from "lucide-react";

import type { ClassDetail } from "./types";
import UpcomingMeetings from "./UpcomingMeetings";

export default function OverviewTab({ detail }: { detail: ClassDetail }) {
  return (
    <div className="space-y-10">
      <div>
        <h3 className="mb-4 text-2xl font-bold text-on-surface">
          Course Description
        </h3>
        <p className="max-w-prose text-lg leading-relaxed text-on-surface-variant">
          {detail.description}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-xl bg-surface-container-low p-6">
          <Sparkles className="mb-3 h-5 w-5 text-indigo-600" />
          <h4 className="mb-2 font-bold">Learning Objectives</h4>
          <ul className="space-y-2 text-sm text-on-surface-variant">
            {detail.learningObjectives.map((objective) => (
              <li key={objective} className="flex gap-2">
                <span className="text-indigo-600">•</span>
                <span>{objective}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl bg-emerald-50 p-6">
          <BadgeCheck className="mb-3 h-5 w-5 text-emerald-600" />
          <h4 className="mb-2 font-bold">Prerequisites</h4>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {detail.prerequisites}
          </p>
        </div>
      </div>

      <UpcomingMeetings meetings={detail.meetings} />
    </div>
  );
}
