import { Bot } from "lucide-react";

export default function InstructorInsightCard() {
  return (
    <section className="mb-8 flex items-start gap-4 rounded-2xl border border-indigo-100 bg-indigo-50 p-6 shadow-sm">
      <div className="shrink-0 rounded-xl bg-indigo-600 p-3 text-white shadow-md">
        <Bot className="h-6 w-6" />
      </div>

      <div>
        <h4 className="mb-1 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-indigo-900">
          Instructor Insight
          <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[10px] font-extrabold text-white">
            AI
          </span>
        </h4>
        <p className="text-sm leading-relaxed text-indigo-800/80">
          <strong className="text-indigo-900">
            Boost Participation in Module 04:
          </strong>{" "}
          Based on recent activity peaks, students are highly engaged with
          visual curation topics. Consider hosting a review session this
          Wednesday to capitalize on this momentum.
        </p>
      </div>
    </section>
  );
}
