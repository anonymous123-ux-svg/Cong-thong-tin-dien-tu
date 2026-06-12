import CircularProgressRing from "./CircularProgressRing";
import type { ProgressSummary } from "./types";

type Props = {
  courseTitle: string;
  summary: ProgressSummary;
};

export default function ProgressSummaryCard({ courseTitle, summary }: Props) {
  return (
    <section className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-col items-center gap-10 md:flex-row">
        <CircularProgressRing
          percent={summary.percentComplete}
          label="Course completion"
          sublabel="COMPLETED"
        />

        <div className="w-full flex-1 space-y-6">
          <div>
            <h3 className="text-lg font-medium text-slate-900">
              {courseTitle}
            </h3>
            <p className="mt-2 max-w-prose text-sm leading-relaxed text-slate-500">
              {summary.estimatedCompletionNote}
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <p className="text-2xl font-semibold text-slate-900">
                {summary.lessonsDone}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                LESSONS DONE
              </p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-900">
                {summary.lessonsRemaining}
              </p>
              <p className="mt-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-500">
                REMAINING
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
