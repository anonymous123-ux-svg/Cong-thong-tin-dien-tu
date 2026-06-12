import Image from "next/image";
import { BookOpenText, CircleCheckBig, PlayCircle } from "lucide-react";

import { learningResources } from "./mockData";

export default function TaskFilters() {
  return (
    <div className="space-y-6 lg:col-span-4">
      <section className="relative overflow-hidden rounded-2xl bg-indigo-700 p-8 text-white shadow-xl shadow-indigo-700/30">
        <div className="absolute -bottom-6 -right-4 opacity-20">
          <CircleCheckBig className="h-24 w-24" />
        </div>

        <h3 className="mb-8 text-lg font-bold">Weekly Progress</h3>

        <div className="flex items-center gap-6">
          <div className="relative flex h-24 w-24 items-center justify-center">
            <svg className="h-full w-full -rotate-90" aria-hidden="true">
              <circle
                className="text-indigo-500/30"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="text-white"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
                strokeWidth="8"
              />
            </svg>
            <span className="absolute text-xl font-bold">75%</span>
          </div>

          <div>
            <p className="text-4xl font-bold leading-none">12 / 16</p>
            <p className="mt-1 text-sm font-medium text-indigo-200">
              Tasks Finished
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-200/70">
              In Progress
            </p>
            <p className="text-xl font-bold">04</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-200/70">
              Upcoming
            </p>
            <p className="text-xl font-bold">07</p>
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-surface-container-low p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-slate-500">
          Required Learning
        </h3>

        <div className="space-y-3">
          {learningResources.map((resource) => {
            const Icon = resource.type === "book" ? BookOpenText : PlayCircle;
            const colorClassName =
              resource.type === "book"
                ? "bg-indigo-50 text-indigo-600"
                : "bg-emerald-50 text-emerald-600";

            return (
              <button
                key={resource.id}
                type="button"
                className="flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left transition hover:shadow-md"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClassName}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-bold text-on-background">
                    {resource.title}
                  </span>
                  <span className="block text-[10px] text-slate-400">
                    {resource.meta}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="group relative aspect-video overflow-hidden rounded-2xl shadow-lg">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDv2iIkWngUYK-e0G2QpE81CVitZt47O8mWvsi1TYYazpswdU4enzAIk0nIUHkFri-n8q4TZUJ4cCCGST6z8HUCWjvenLZWujVv7Q-ejR1xLThxrGmUfxSOq1l-JQT7KRCN5VRUZ1PqSpn6JSnfz6zQQvRHXiknc1F9QYDwPAd_nVXJ6Ue3ymD-hPPQVUyhkXhh-9NIArJ3cQ9A27ADkQdnJBXMAutuGg93Z9UweAEA8BvBD-lqfuCuDJnwoZVNkBtC7qaX5_pa-7rE"
          alt="Scientific chalkboard with complex physics equations"
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 30vw"
        />
        <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent p-6">
          <div className="text-white">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-widest opacity-70">
              Focus Topic
            </p>
            <h4 className="text-lg font-bold">String Theory Foundations</h4>
          </div>
        </div>
      </section>
    </div>
  );
}
