import Image from "next/image";
import { ArrowRight, Award, BarChart3, Clock, Play, Users } from "lucide-react";

type Props = {
  enrolledLabel: string;
};

export default function CourseSidebar({ enrolledLabel }: Props) {
  return (
    <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-[0px_20px_40px_rgba(21,28,39,0.06)] border border-primary/5">
      <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6">
        <Image
          alt="Neural network visualization"
          src="/courses/neural.svg"
          fill
          sizes="(max-width: 1024px) 100vw, 420px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <button
            type="button"
            className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-primary shadow-xl hover:scale-110 transition-transform"
            aria-label="Play preview"
          >
            <Play className="h-8 w-8 fill-primary" />
          </button>
        </div>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Enrolled</span>
          </div>
          <span className="font-bold text-on-surface">{enrolledLabel}</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <Clock className="h-5 w-5" />
            <span className="text-sm font-medium">Duration</span>
          </div>
          <span className="font-bold text-on-surface">24.5 Total Hours</span>
        </div>

        <div className="flex justify-between items-center pb-4 border-b border-slate-50">
          <div className="flex items-center gap-2 text-slate-500">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm font-medium">Difficulty</span>
          </div>
          <span className="font-bold text-on-surface">Advanced Master</span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-slate-500">
            <Award className="h-5 w-5" />
            <span className="text-sm font-medium">Credits</span>
          </div>
          <span className="font-bold text-on-surface">4.0 ECTS</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-primary text-on-primary py-4 rounded-full font-bold shadow-lg shadow-primary/25 hover:bg-primary-container transition-all active:scale-95 flex items-center justify-center gap-2"
      >
        Resume Learning
        <ArrowRight className="h-5 w-5" />
      </button>

      <p className="text-center text-xs text-slate-400 mt-6 font-medium">
        30-Day Research Satisfaction Guarantee
      </p>
    </div>
  );
}
