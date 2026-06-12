import { ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react";

type Props = {
  progressPercent: number;
};

export default function CourseOverviewSidebar({ progressPercent }: Props) {
  const clamped = Math.max(0, Math.min(100, progressPercent));

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl p-6 shadow-md sticky top-24">
        <h3 className="font-semibold text-lg font-medium text-slate-800 mb-2">
          Your Progress
        </h3>

        <div className="flex justify-between items-end mb-2">
          <span className="text-3xl font-bold text-indigo-600 tracking-tighter">
            {clamped}%
          </span>
          <span className="font-normal text-xs text-slate-800-variant mb-1">
            Completed
          </span>
        </div>

        <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
          <progress
            value={clamped}
            max={100}
            className="w-full h-2 rounded-full overflow-hidden accent-indigo-600"
          />
        </div>

        <div className="bg-slate-50 rounded-lg p-4 mb-6">
          <p className="font-medium text-xs uppercase text-slate-800-variant mb-1 tracking-wider">
            Next Up
          </p>
          <p className="font-semibold font-medium text-sm text-slate-800">
            Module 4 - Quantum Gates
          </p>
        </div>

        <button
          type="button"
          className="w-full bg-indigo-600 text-white rounded-full py-3 px-4 font-medium font-semibold hover:bg-indigo-600-container transition-colors shadow-sm flex items-center justify-center gap-2"
        >
          Continue Learning
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-base font-semibold text-slate-800 mb-4">
          Course Overview
        </h3>

        <ul className="space-y-4">
          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
              <BookOpen className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-normal text-xs text-slate-800-variant">
                Total Content
              </p>
              <p className="font-semibold text-sm font-medium text-slate-800">
                24 Lessons
              </p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-600">
              <Clock className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-normal text-xs text-slate-800-variant">
                Duration
              </p>
              <p className="font-semibold text-sm font-medium text-slate-800">
                12h 45m
              </p>
            </div>
          </li>

          <li className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-indigo-500">
              <TrendingUp className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div>
              <p className="font-normal text-xs text-slate-800-variant">
                Avg. Completion
              </p>
              <p className="font-semibold text-sm font-medium text-slate-800">
                85% Success Rate
              </p>
            </div>
          </li>
        </ul>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-base font-semibold text-slate-800 mb-4">
          Recent Activity
        </h3>

        <div className="relative border-l border-slate-200 ml-3 space-y-6">
          <div className="relative pl-6">
            <div className="absolute w-3 h-3 bg-indigo-400 rounded-full -left-[6.5px] top-1.5 border-2 border-white" />
            <p className="font-semibold text-sm font-medium text-slate-800">
              Completed Module 3 Quiz
            </p>
            <p className="font-normal text-xs text-slate-800-variant mt-0.5">
              2 days ago • Score: 95%
            </p>
          </div>

          <div className="relative pl-6">
            <div className="absolute w-3 h-3 bg-slate-200 rounded-full -left-[6.5px] top-1.5 border-2 border-white" />
            <p className="font-semibold text-sm font-medium text-slate-800">
              Watched: Intro to Qubits
            </p>
            <p className="font-normal text-xs text-slate-800-variant mt-0.5">
              4 days ago
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="font-semibold text-base font-semibold text-slate-800 mb-4">
          Upcoming Schedule
        </h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="bg-red-100 text-red-700 rounded px-2 py-1 flex flex-col items-center justify-center min-w-12">
              <span className="font-medium text-[10px] uppercase">Nov</span>
              <span className="font-semibold text-sm font-bold">12</span>
            </div>
            <div>
              <p className="font-semibold text-sm font-medium text-slate-800">
                Live Q&amp;A Session
              </p>
              <p className="font-normal text-xs text-slate-800-variant mt-0.5">
                2:00 PM EST via Zoom
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
            <div className="bg-slate-200 text-slate-800-variant rounded px-2 py-1 flex flex-col items-center justify-center min-w-12">
              <span className="font-medium text-[10px] uppercase">Nov</span>
              <span className="font-semibold text-sm font-bold">15</span>
            </div>
            <div>
              <p className="font-semibold text-sm font-medium text-slate-800">
                Assignment Due
              </p>
              <p className="font-normal text-xs text-slate-800-variant mt-0.5">
                Circuit Design Project
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
