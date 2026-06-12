import { BadgeCheck } from "lucide-react";

import type { FeedbackItem } from "./types";

export default function RecentFeedbackPanel({
  items,
}: {
  items: FeedbackItem[];
}) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm">
      <h4 className="mb-6 flex items-center gap-2 text-lg font-medium text-slate-900">
        <BadgeCheck className="h-5 w-5 text-[#16A34A]" aria-hidden="true" />
        Recent Feedback
      </h4>

      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.id}
            className="relative border-l-2 border-[#16A34A] pl-4"
          >
            <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-[#16A34A]" />

            <div className="mb-1 flex items-baseline justify-between">
              <h5 className="text-sm font-semibold text-slate-900">
                {item.title}
              </h5>
              <span className="text-lg font-bold text-[#16A34A]">
                {item.scoreLabel}
              </span>
            </div>

            <p className="mb-2 text-xs text-slate-500">{item.metaLabel}</p>
            <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              {item.feedbackText}
            </div>

            <button
              type="button"
              className="mt-2 text-xs font-medium text-[#3D52A0] hover:underline"
            >
              View Full Rubric
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
