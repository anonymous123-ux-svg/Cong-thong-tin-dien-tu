"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lock,
  PlayCircle,
} from "lucide-react";

import type { CurriculumModule } from "./types";

function getDefaultModules(): CurriculumModule[] {
  return [
    {
      id: "m01",
      indexLabel: "01",
      title: "Foundations of Backpropagation",
      meta: "4 Lessons • 45m",
      state: "expanded",
      lessons: [
        {
          id: "l01",
          title: "Gradient Descent Variations",
          duration: "12:30",
          status: "completed",
        },
        {
          id: "l02",
          title: "Vanishing Gradient Problem",
          duration: "15:45",
          status: "completed",
        },
      ],
    },
    {
      id: "m02",
      indexLabel: "02",
      title: "CNNs and Image Processing",
      meta: "6 Lessons • 2h 15m",
      state: "collapsed",
    },
    {
      id: "m03",
      indexLabel: "03",
      title: "Transformers and Attention",
      meta: "Active Module • 8 Lessons • 3h 45m",
      state: "active",
      lessons: [
        {
          id: "l03",
          title: "Self-Attention Mechanisms",
          duration: "Live Now",
          status: "live",
        },
        {
          id: "l04",
          title: "Positional Encoding",
          duration: "22:00",
          status: "locked",
        },
      ],
    },
  ];
}

export default function CurriculumSection() {
  const initial = useMemo(() => getDefaultModules(), []);
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const map: Record<string, boolean> = {};
    for (const m of initial) {
      map[m.id] = m.state === "expanded" || m.state === "active";
    }
    return map;
  });

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold tracking-tight">
          Detailed Curriculum
        </h3>
        <span className="text-sm font-semibold text-primary">
          12 Modules • 48 Lessons
        </span>
      </div>

      <div className="space-y-4">
        {initial.map((module) => {
          const isOpen = Boolean(expanded[module.id]);
          const isActive = module.state === "active";

          return (
            <div
              key={module.id}
              className={
                isActive
                  ? "bg-white rounded-3xl overflow-hidden border border-primary/20"
                  : "bg-surface-container-lowest rounded-3xl overflow-hidden shadow-[0px_10px_30px_rgba(21,28,39,0.03)] border border-transparent hover:border-primary/10 transition-all"
              }
            >
              <button
                type="button"
                onClick={() =>
                  setExpanded((prev) => ({ ...prev, [module.id]: !isOpen }))
                }
                className={
                  isActive
                    ? "w-full p-6 flex items-center justify-between cursor-pointer bg-primary-container text-white"
                    : "w-full p-6 flex items-center justify-between cursor-pointer"
                }
              >
                <div className="flex items-center gap-4">
                  <div
                    className={
                      isActive
                        ? "h-10 w-10 flex items-center justify-center bg-white/20 text-white font-bold rounded-xl text-sm"
                        : "h-10 w-10 flex items-center justify-center bg-indigo-50 text-primary font-bold rounded-xl text-sm"
                    }
                  >
                    {module.indexLabel}
                  </div>

                  <div className="text-left">
                    <h4
                      className={
                        isActive ? "font-bold" : "font-bold text-on-surface"
                      }
                    >
                      {module.title}
                    </h4>
                    <p
                      className={
                        isActive
                          ? "text-xs opacity-80 mt-0.5"
                          : "text-xs text-slate-500 mt-0.5"
                      }
                    >
                      {module.meta}
                    </p>
                  </div>
                </div>

                {isOpen ? (
                  <ChevronUp
                    className={
                      isActive
                        ? "h-5 w-5"
                        : "h-5 w-5 text-slate-400 hover:text-primary transition-colors"
                    }
                  />
                ) : (
                  <ChevronDown
                    className={
                      isActive
                        ? "h-5 w-5"
                        : "h-5 w-5 text-slate-400 hover:text-primary transition-colors"
                    }
                  />
                )}
              </button>

              {isOpen && module.lessons?.length ? (
                <div
                  className={
                    isActive ? "p-4 space-y-2" : "px-6 pb-6 pt-0 space-y-3"
                  }
                >
                  {module.lessons.map((lesson) => {
                    if (lesson.status === "live") {
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <PlayCircle className="h-5 w-5 text-primary" />
                            <span className="text-sm font-bold text-primary">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-primary">
                            {lesson.duration}
                          </span>
                        </div>
                      );
                    }

                    if (lesson.status === "locked") {
                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer opacity-60"
                        >
                          <div className="flex items-center gap-3">
                            <Lock className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-slate-400">
                            {lesson.duration}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-medium text-slate-700">
                            {lesson.title}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-slate-400">
                          {lesson.duration}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
