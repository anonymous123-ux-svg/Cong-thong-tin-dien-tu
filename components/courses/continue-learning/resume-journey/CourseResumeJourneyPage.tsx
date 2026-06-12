import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  ChevronLeft,
  Clock,
  Flame,
  HelpCircle,
  Lock,
  NotebookPen,
} from "lucide-react";
import type { ReactNode } from "react";

import ContinueWatchingCarousel from "./ContinueWatchingCarousel";
import {
  ACHIEVEMENTS,
  CONTINUE_WATCHING,
  DISCUSSION_THREADS,
  ICONS,
  INSTRUCTOR_NOTE,
  INSTRUCTOR_QA,
  KNOWLEDGE_CHECK,
  LEARNING_STATS,
  QUICK_ACTIONS,
  RESUME_JOURNEY,
  UPCOMING_DEADLINES,
  UPCOMING_LESSONS,
} from "./data";

function ProgressBar({
  value,
  tone,
}: {
  value: number;
  tone: "primary" | "secondary";
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const fillColor = tone === "secondary" ? "#16A34A" : "#3D52A0";

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full"
        style={{ width: `${clamped}%`, backgroundColor: fillColor }}
      />
    </div>
  );
}

function TonePill({
  tone,
  children,
}: {
  tone: "danger" | "warning";
  children: ReactNode;
}) {
  const className =
    tone === "danger"
      ? "bg-red-100 text-red-600"
      : "bg-amber-100 text-amber-600";

  return (
    <span className={`rounded-md px-2 py-1 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}

export default function CourseResumeJourneyPage({
  courseId,
}: {
  courseId?: string;
}) {
  const backHref = courseId
    ? `/admin/courses/${courseId}/continue-learning`
    : "/admin/courses/continue-learning";

  return (
    <div className="space-y-12 pb-8 pt-2">
      <div>
        <Link
          href={backHref}
          className="inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm transition-all hover:text-[#3D52A0] hover:shadow-md"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Resume Journey
          </h2>
          <p className="mt-2 text-lg font-medium text-slate-500">
            {RESUME_JOURNEY.moduleTitle}
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
            <Flame className="h-5 w-5 text-[#F97316]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Learning Streak
            </p>
            <p className="text-base font-bold text-slate-900">
              {RESUME_JOURNEY.streakDays} Days
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Video section */}
          <section className="group relative flex flex-col gap-6 overflow-hidden rounded-[1.5rem] bg-white p-6 shadow-md transition-all duration-300 hover:bg-slate-50">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#3D52A0]/5 to-[#8697C4]/5 opacity-50" />

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-200 shadow-sm transition-shadow group-hover:shadow-md">
              <Image
                src={RESUME_JOURNEY.videoThumbnailSrc}
                alt={RESUME_JOURNEY.videoThumbnailAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 800px"
                className="object-cover"
                priority
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors hover:bg-black/40">
                <button
                  type="button"
                  aria-label="Play"
                  className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-[#3D52A0]/90 text-white shadow-lg backdrop-blur-sm transition-transform hover:scale-105"
                >
                  <ICONS.Play className="ml-1 h-8 w-8" aria-hidden="true" />
                </button>
              </div>

              <div className="absolute bottom-0 left-0 h-1.5 w-full bg-black/20">
                <div
                  className="h-full bg-[#3D52A0]"
                  style={{ width: `${RESUME_JOURNEY.videoProgressPercent}%` }}
                />
              </div>

              <div className="absolute bottom-4 right-4 rounded bg-black/60 px-2 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {RESUME_JOURNEY.videoTimeLabel}
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#3D52A0]">
                  Up Next in Lesson
                </p>
                <h3 className="text-xl font-semibold leading-tight text-slate-900">
                  {RESUME_JOURNEY.upNextTitle}
                </h3>
              </div>

              <button
                type="button"
                className="whitespace-nowrap rounded-full bg-[#3D52A0] px-8 py-3 font-medium text-white shadow-sm transition-colors hover:bg-[#2D3F80]"
              >
                Resume Video
              </button>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {QUICK_ACTIONS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl bg-white p-4 text-slate-500 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:text-[#3D52A0]"
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </section>

          {/* Quick Notes */}
          <section className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-6 shadow-md">
            <button
              type="button"
              className="group flex cursor-pointer items-center justify-between"
            >
              <h4 className="flex items-center gap-2 text-lg font-medium text-slate-900 transition-colors group-hover:text-[#3D52A0]">
                <NotebookPen
                  className="h-5 w-5 text-[#3D52A0]"
                  aria-hidden="true"
                />
                Quick Notes
              </h4>
              <ChevronDown
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
            </button>

            <textarea
              className="h-32 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-[#3D52A0]"
              placeholder={`Jot down key concepts from '${RESUME_JOURNEY.upNextTitle}' here...`}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="flex items-center gap-1 text-xs text-slate-400">
                Saved just now
              </span>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-xl px-5 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100"
                >
                  Clear
                </button>
                <button
                  type="button"
                  className="rounded-xl bg-[#3D52A0] px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#2D3F80]"
                >
                  Save Note
                </button>
              </div>
            </div>
          </section>

          <ContinueWatchingCarousel items={CONTINUE_WATCHING} />

          {/* Recent Achievements */}
          <section className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-6 shadow-md">
            <h4 className="text-lg font-medium text-slate-900">
              Recent Achievements
            </h4>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {ACHIEVEMENTS.map(({ id, label, Icon, tone, locked }) => {
                const toneClassName = locked
                  ? "border-2 border-dashed border-slate-200 opacity-50"
                  : "bg-slate-50";

                const iconWrapperClassName = locked
                  ? "bg-slate-100 text-slate-400"
                  : tone === "primary"
                    ? "bg-[#3D52A0]/10 text-[#3D52A0]"
                    : tone === "secondary"
                      ? "bg-[#16A34A]/10 text-[#16A34A]"
                      : tone === "tertiary"
                        ? "bg-amber-100 text-amber-500"
                        : "bg-slate-100 text-slate-400";

                return (
                  <div
                    key={id}
                    className={`flex flex-col items-center gap-2 rounded-xl p-3 text-center ${toneClassName}`}
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-full ${iconWrapperClassName}`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <span
                      className={
                        locked
                          ? "text-xs font-semibold text-slate-400"
                          : "text-xs font-semibold text-slate-900"
                      }
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Instructor Note */}
          <section className="rounded-[1.5rem] bg-slate-50 p-8">
            <div className="mb-4 flex items-center gap-3">
              <INSTRUCTOR_NOTE.Icon
                className="h-5 w-5 text-slate-400"
                aria-hidden="true"
              />
              <h4 className="text-lg font-medium text-slate-900">
                {INSTRUCTOR_NOTE.title}
              </h4>
            </div>
            <p className="max-w-[70ch] text-lg leading-relaxed text-slate-500">
              {INSTRUCTOR_NOTE.body}
            </p>
          </section>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          {/* Learning Stats */}
          <section className="rounded-[1.5rem] bg-white p-6 shadow-md">
            <h4 className="text-lg font-medium text-slate-900">
              Learning Stats
            </h4>

            <div className="mt-5 space-y-4">
              {LEARNING_STATS.map(
                ({ id, label, value, progressPercent, Icon, tone }) => (
                  <div key={id}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                        {label}
                      </span>
                      <span className="font-bold text-slate-900">{value}</span>
                    </div>
                    <ProgressBar value={progressPercent} tone={tone} />
                  </div>
                ),
              )}
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section className="rounded-[1.5rem] bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-slate-900">
                Upcoming Deadlines
              </h4>
              <TonePill tone="danger">2 Due Soon</TonePill>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {UPCOMING_DEADLINES.map(({ id, title, dueLabel, tone, Icon }) => {
                const wrapperClassName =
                  tone === "danger"
                    ? "border-red-100 bg-red-50/50"
                    : "border-amber-100 bg-amber-50/50";

                const iconClassName =
                  tone === "danger"
                    ? "bg-red-100 text-red-600"
                    : "bg-amber-100 text-amber-600";

                const dueClassName =
                  tone === "danger" ? "text-red-600" : "text-amber-600";

                return (
                  <div
                    key={id}
                    className={`flex gap-3 rounded-xl border p-3 ${wrapperClassName}`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconClassName}`}
                    >
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-slate-900">
                        {title}
                      </h5>
                      <p
                        className={`mt-0.5 text-xs font-medium ${dueClassName}`}
                      >
                        {dueLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Quick Knowledge Check */}
          <section className="flex flex-col gap-4 rounded-[1.5rem] border-l-4 border-[#3D52A0] bg-white p-6 shadow-md">
            <div className="flex items-center gap-2">
              <HelpCircle
                className="h-5 w-5 text-[#3D52A0]"
                aria-hidden="true"
              />
              <h4 className="text-base font-semibold text-slate-900">
                Quick Knowledge Check
              </h4>
            </div>

            <p className="text-sm font-medium leading-relaxed text-slate-500">
              {KNOWLEDGE_CHECK.question}
            </p>

            <div className="flex flex-col gap-2">
              {KNOWLEDGE_CHECK.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  className="cursor-pointer rounded-lg border border-transparent bg-slate-100 px-4 py-2 text-left text-sm text-slate-700 transition-colors hover:border-[#3D52A0]/20 hover:bg-[#3D52A0]/10 hover:text-[#3D52A0]"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          {/* Upcoming Lessons */}
          <section className="flex flex-col rounded-[1.5rem] bg-white p-6 shadow-md">
            <h4 className="mb-6 text-lg font-medium text-slate-900">
              Upcoming Lessons
            </h4>

            <div className="flex-1 space-y-6">
              {UPCOMING_LESSONS.map(({ id, title, meta, locked, Icon }) => {
                const iconClassName = locked
                  ? "bg-slate-100 text-slate-400"
                  : "bg-[#3D52A0]/10 text-[#3D52A0]";

                const metaIcon = meta.includes("min")
                  ? Clock
                  : meta.toLowerCase().includes("exercise")
                    ? Icon
                    : HelpCircle;

                return (
                  <div
                    key={id}
                    className={`group flex cursor-pointer gap-4 transition-opacity ${locked ? "opacity-70 hover:opacity-100" : ""}`}
                  >
                    <div
                      className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${iconClassName}`}
                    >
                      {locked ? (
                        <Lock className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <h5 className="text-base font-medium text-slate-900 transition-colors group-hover:text-[#3D52A0]">
                        {title}
                      </h5>
                      <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                        {(() => {
                          const MetaIcon = metaIcon;
                          return (
                            <MetaIcon className="h-4 w-4" aria-hidden="true" />
                          );
                        })()}
                        {meta}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              className="mt-6 w-full cursor-pointer rounded-xl border border-slate-200 py-3 font-medium text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/5"
            >
              View Full Curriculum
            </button>
          </section>

          {/* Instructor Q&A */}
          <section className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-6 shadow-md">
            <h4 className="text-lg font-medium text-slate-900">
              Instructor Q&amp;A
            </h4>

            <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
              <Image
                src={INSTRUCTOR_QA.instructorAvatarSrc}
                alt={INSTRUCTOR_QA.instructorAvatarAlt}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h5 className="text-sm font-semibold text-slate-900">
                  {INSTRUCTOR_QA.instructorName}
                </h5>
                <p className="text-xs text-slate-500">
                  {INSTRUCTOR_QA.instructorMeta}
                </p>
              </div>
            </div>

            <div className="relative">
              <input
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-10 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-[#3D52A0]"
                placeholder="Ask a question about this lesson..."
              />
              <button
                type="button"
                aria-label="Send"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/10"
              >
                <ICONS.Send className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2 flex flex-col gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Recent Questions
              </p>
              {INSTRUCTOR_QA.recentQuestions.map((q) => (
                <div key={q.id} className="text-sm">
                  <p className="line-clamp-1 font-medium text-slate-900">
                    {q.question}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                    <span className="font-semibold text-[#3D52A0]">
                      {INSTRUCTOR_QA.instructorName}:
                    </span>{" "}
                    {q.previewAnswer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Class Discussion */}
          <section className="flex flex-col gap-4 rounded-[1.5rem] bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-medium text-slate-900">
                Class Discussion
              </h4>
              <button
                type="button"
                className="text-sm font-medium text-[#3D52A0] hover:underline"
              >
                View all
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {DISCUSSION_THREADS.map((thread) => (
                <div key={thread.id} className="flex items-start gap-3">
                  <Image
                    src={thread.avatarSrc}
                    alt={thread.avatarAlt}
                    width={32}
                    height={32}
                    className="mt-1 h-8 w-8 rounded-full object-cover"
                  />
                  <div>
                    <h5 className="line-clamp-1 text-sm font-semibold text-slate-900">
                      {thread.title}
                    </h5>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {thread.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
