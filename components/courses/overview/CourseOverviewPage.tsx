import {
  Award,
  BarChart3,
  BookOpen,
  CalendarDays,
  Clock,
  Flame,
  GraduationCap,
  History,
  LibraryBig,
  PlayCircle,
  Sparkles,
  Target,
} from "lucide-react";

import HorizontalCarousel from "@/components/ui/HorizontalCarousel";
import type { Course } from "../types";

function StatCard(props: { label: string; value: string; subvalue?: string }) {
  const { label, value, subvalue } = props;

  return (
    <div className="min-w-40 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="text-3xl font-bold text-[#3D52A0]">
        {value}{" "}
        {subvalue ? (
          <span className="text-sm font-normal text-slate-500">{subvalue}</span>
        ) : null}
      </p>
    </div>
  );
}

function ProgressBar(props: {
  value: number;
  variant: "primary" | "secondary";
  size?: "sm" | "md";
}) {
  const { value, variant, size = "md" } = props;
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  const heightClass = size === "sm" ? "h-1.5" : "h-2";
  const fillColor = variant === "primary" ? "#3D52A0" : "#16A34A";

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-slate-100 ${heightClass}`}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${clamped}%`, backgroundColor: fillColor }}
      />
    </div>
  );
}

export default function CourseOverviewPage({ course }: { course: Course }) {
  return (
    <div className="space-y-8 py-8">
      <section className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, Dr. Aris
          </h1>
          <p className="text-slate-500">
            Here&apos;s an overview of your academic progress for Fall Semester
            2024.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <StatCard label="Current GPA" value="3.92" />
          <StatCard label="Credits Earned" value="84" subvalue="/ 120" />
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        <div className="space-y-8 xl:col-span-2">
          {/* Continue Learning */}
          <section>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <PlayCircle
                className="h-5 w-5 text-[#3D52A0]"
                aria-hidden="true"
              />
              Continue Learning
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Card 1 - Primary */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0px_4px_20px_rgba(21,28,39,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0px_8px_30px_rgba(21,28,39,0.08)]">
                <div className="relative h-32 bg-gradient-to-tr from-[#3D52A0] to-[#8697C4]">
                  <div className="absolute left-4 top-4 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#3D52A0] shadow-sm">
                    Module 4
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-1 text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#3D52A0]">
                    {course.title}
                  </h3>
                  <p className="mb-4 text-sm text-slate-500">
                    Dr. H. Everett • 12 Lectures Left
                  </p>

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-[#3D52A0]">68%</span>
                    </div>
                    <ProgressBar value={68} variant="primary" />
                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full cursor-pointer rounded-xl bg-[#3D52A0] py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2D3F80]"
                  >
                    Resume Lecture
                  </button>
                </div>
              </div>

              {/* Card 2 - Secondary/Green */}
              <div className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0px_4px_20px_rgba(21,28,39,0.04)] transition-all hover:-translate-y-1 hover:shadow-[0px_8px_30px_rgba(21,28,39,0.08)]">
                <div className="relative h-32 bg-gradient-to-tr from-[#16A34A] to-[#4ADE80]">
                  <div className="absolute left-4 top-4 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-[#16A34A] shadow-sm">
                    Final Project
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-1 text-lg font-semibold text-slate-900 transition-colors group-hover:text-[#3D52A0]">
                    Introduction to Computer Science
                  </h3>
                  <p className="mb-4 text-sm text-slate-500">
                    Prof. A. Turing • Capstone Phase
                  </p>

                  <div className="mt-auto space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-[#16A34A]">92%</span>
                    </div>
                    <ProgressBar value={92} variant="secondary" />
                  </div>

                  <button
                    type="button"
                    className="mt-6 w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-[#3D52A0] transition-colors hover:bg-slate-50"
                  >
                    Continue Work
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Learning Analytics */}
          <section>
            <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <BarChart3
                className="h-5 w-5 text-[#3D52A0]"
                aria-hidden="true"
              />
              Learning Analytics
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_4px_20px_rgba(21,28,39,0.04)] md:col-span-2">
                <h3 className="mb-4 text-sm font-semibold text-slate-500">
                  Study Time (Last 7 Days)
                </h3>
                <div className="h-48 w-full rounded-xl bg-slate-50" />
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3D52A0]/10 text-[#3D52A0]">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">
                      Avg Study Time
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    2h 15m{" "}
                    <span className="text-xs font-normal text-slate-500">
                      / day
                    </span>
                  </p>
                </div>

                <div className="flex flex-1 flex-col justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                      <Target className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <p className="text-sm font-semibold text-slate-500">
                      Completion Rate
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">
                    85%{" "}
                    <span className="text-sm font-semibold text-[#16A34A]">
                      ↑ 5%
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* My Courses */}
          <section>
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="flex items-center gap-2 text-xl font-semibold text-slate-900">
                <LibraryBig
                  className="h-5 w-5 text-[#3D52A0]"
                  aria-hidden="true"
                />
                My Courses
              </h2>

              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                  <input
                    aria-label="Find course"
                    placeholder="Find course..."
                    className="w-48 rounded-full border border-slate-200 bg-white py-1.5 pl-4 pr-4 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-[#3D52A0]"
                  />
                </div>
                <button
                  type="button"
                  className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/10"
                >
                  View All
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                {
                  title: "Linear Algebra",
                  instructor: "Prof. Strang",
                  status: "In Progress",
                  statusClass: "bg-[#3D52A0]/10 text-[#3D52A0]",
                  progress: 45,
                  variant: "primary" as const,
                  thumbClass: "bg-gradient-to-br from-[#3D52A0] to-[#8697C4]",
                },
                {
                  title: "Data Structures",
                  instructor: "Dr. Sedgewick",
                  status: "Completed",
                  statusClass: "bg-[#16A34A]/10 text-[#16A34A]",
                  progress: 100,
                  variant: "secondary" as const,
                  thumbClass: "bg-gradient-to-br from-[#16A34A] to-[#4ADE80]",
                },
                {
                  title: "History of Art",
                  instructor: "Prof. Gombrich",
                  status: "In Progress",
                  statusClass: "bg-[#3D52A0]/10 text-[#3D52A0]",
                  progress: 12,
                  variant: "primary" as const,
                  thumbClass: "bg-gradient-to-br from-[#D97706] to-[#FCD34D]",
                },
                {
                  title: "Microeconomics",
                  instructor: "Dr. Krugman",
                  status: "In Progress",
                  statusClass: "bg-[#3D52A0]/10 text-[#3D52A0]",
                  progress: 78,
                  variant: "primary" as const,
                  thumbClass: "bg-gradient-to-br from-[#DC2626] to-[#FB7185]",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-[0px_4px_20px_rgba(21,28,39,0.04)] transition-all hover:shadow-[0px_8px_30px_rgba(21,28,39,0.08)]"
                >
                  <div
                    className={`h-20 w-20 shrink-0 rounded-xl ${item.thumbClass}`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-start justify-between gap-2">
                      <h3 className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <span
                        className={`whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-bold ${item.statusClass}`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="mb-2 truncate text-xs text-slate-500">
                      {item.instructor}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="flex-1">
                        <ProgressBar
                          value={item.progress}
                          variant={item.variant}
                          size="sm"
                        />
                      </div>
                      <span className="w-8 text-xs font-medium text-slate-500">
                        {item.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recommended for You */}
          <HorizontalCarousel
            title="Recommended for You"
            titleIcon={
              <Sparkles className="h-5 w-5 text-[#D97706]" aria-hidden="true" />
            }
          >
            {[
              {
                level: "Intermediate",
                title: "Machine Learning Basics",
                desc: "Understand the foundational algorithms powering modern AI.",
              },
              {
                level: "Beginner",
                title: "Modern React Patterns",
                desc: "Level up your frontend skills with hooks and context.",
              },
              {
                level: "Advanced",
                title: "Data Science with Python",
                desc: "Master data analysis with real-world datasets.",
              },
              {
                level: "Beginner",
                title: "SQL for Analysts",
                desc: "Write powerful queries from day one.",
              },
              {
                level: "Intermediate",
                title: "System Design Essentials",
                desc: "Build scalable systems with confidence.",
              },
              {
                level: "Advanced",
                title: "Deep Learning in Practice",
                desc: "Train neural networks on cutting-edge tasks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0px_4px_20px_rgba(21,28,39,0.04)] transition-shadow hover:shadow-[0px_8px_30px_rgba(21,28,39,0.08)]"
              >
                <div className="relative h-32 bg-gradient-to-br from-[#1E1B4B] to-[#3730A3]">
                  <div className="absolute bottom-3 left-4 rounded bg-black/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {item.level}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mb-4 text-xs text-slate-500">{item.desc}</p>
                  <button
                    type="button"
                    className="mt-auto w-full cursor-pointer rounded-xl bg-slate-100 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-[#3D52A0] hover:text-white"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </HorizontalCarousel>

          {/* Recent Achievements */}
          <HorizontalCarousel
            title="Recent Achievements"
            titleIcon={
              <Award className="h-5 w-5 text-[#D97706]" aria-hidden="true" />
            }
            action={
              <button
                type="button"
                className="cursor-pointer rounded-full px-3 py-1.5 text-sm font-medium text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/10"
              >
                View All
              </button>
            }
            scrollerClassName="gap-4"
          >
            {[
              {
                title: "Dean's List",
                subtitle: "Spring Semester 2024",
                icon: GraduationCap,
                bgClass: "bg-[#D97706]/10",
                fgClass: "text-[#D97706]",
              },
              {
                title: "Python Mastery",
                subtitle: "Completed 100 hrs",
                icon: BookOpen,
                bgClass: "bg-[#16A34A]/10",
                fgClass: "text-[#16A34A]",
              },
              {
                title: "Perfect Attendance",
                subtitle: "Physics 301",
                icon: CalendarDays,
                bgClass: "bg-[#3D52A0]/10",
                fgClass: "text-[#3D52A0]",
              },
              {
                title: "Streak Starter",
                subtitle: "7-day momentum",
                icon: Flame,
                bgClass: "bg-[#EA580C]/10",
                fgClass: "text-[#EA580C]",
              },
              {
                title: "Analytics Pro",
                subtitle: "Insights unlocked",
                icon: BarChart3,
                bgClass: "bg-[#16A34A]/10",
                fgClass: "text-[#16A34A]",
              },
              {
                title: "On-Time Hero",
                subtitle: "No missed deadlines",
                icon: CalendarDays,
                bgClass: "bg-[#D97706]/10",
                fgClass: "text-[#D97706]",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex w-64 shrink-0 flex-col items-center rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-[0px_4px_20px_rgba(21,28,39,0.04)] transition-shadow hover:shadow-[0px_8px_30px_rgba(21,28,39,0.08)]"
                >
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full shadow-sm ${item.bgClass} ${item.fgClass}`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mb-1 font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500">{item.subtitle}</p>
                </div>
              );
            })}
          </HorizontalCarousel>
        </div>

        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Study Streak */}
          <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#EF4444] p-6 text-white shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
            <div className="absolute -right-6 -top-6 opacity-20">
              <Flame className="h-24 w-24" aria-hidden="true" />
            </div>
            <div className="relative">
              <div className="mb-2 flex items-center gap-2">
                <Flame className="h-5 w-5" aria-hidden="true" />
                <h2 className="text-sm font-semibold uppercase tracking-wider">
                  Study Streak
                </h2>
              </div>
              <p className="mb-1 text-4xl font-bold">5 Days</p>
              <p className="text-sm font-medium opacity-90">
                You&apos;re on fire! Keep it up to reach your 7-day goal.
              </p>
            </div>
          </section>

          {/* Quick Actions */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Sparkles className="h-5 w-5 text-[#3D52A0]" aria-hidden="true" />
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Resume Learning", icon: PlayCircle },
                { label: "Assignments", icon: BookOpen },
                { label: "Open Notes", icon: LibraryBig },
                { label: "Discussions", icon: History },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent bg-slate-50 p-4 text-center text-slate-900 transition-colors hover:border-[#3D52A0]/20 hover:bg-[#3D52A0]/5 hover:text-[#3D52A0]"
                  >
                    <Icon
                      className="mb-2 h-5 w-5 text-slate-400 transition-colors group-hover:text-[#3D52A0]"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Upcoming Deadlines */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <CalendarDays
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
              Upcoming Deadlines
            </h2>

            <div className="space-y-5">
              {[
                {
                  month: "Oct",
                  day: "12",
                  title: "Quantum Mechanics Midterm",
                  meta: "Room 304 • 10:00 AM",
                  variant: "error",
                },
                {
                  month: "Oct",
                  day: "15",
                  title: "CS50 Final Project Proposal",
                  meta: "Online Submission • 11:59 PM",
                  variant: "neutral",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="-mx-3 flex gap-4 rounded-xl p-3 transition-colors hover:bg-slate-50"
                >
                  <div
                    className={
                      item.variant === "error"
                        ? "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-600 shadow-sm"
                        : "flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-100 text-slate-700 shadow-sm"
                    }
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider">
                      {item.month}
                    </span>
                    <span className="text-lg font-black leading-none">
                      {item.day}
                    </span>
                  </div>
                  <div>
                    <h3 className="mb-0.5 text-sm font-semibold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500">
                      {item.meta}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-6 w-full cursor-pointer rounded-xl border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
            >
              View Full Calendar
            </button>
          </section>

          {/* Recent Activity */}
          <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0px_4px_20px_rgba(21,28,39,0.04)]">
            <h2 className="mb-5 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <History className="h-5 w-5 text-slate-400" aria-hidden="true" />
              Recent Activity
            </h2>

            <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-[17px] before:top-2 before:w-0.5 before:bg-slate-100 before:content-['']">
              {[
                {
                  colorClass: "bg-[#16A34A]",
                  title: "Completed Lesson 4.2",
                  meta: "Quantum Physics • 2 hours ago",
                },
                {
                  colorClass: "bg-[#3D52A0]",
                  title: "Submitted Assignment 3",
                  meta: "Linear Algebra • Yesterday",
                },
                {
                  colorClass: "bg-[#D97706]",
                  title: "Earned Badge: Python Basics",
                  meta: "Computer Science • Oct 8",
                },
              ].map((item) => (
                <div key={item.title} className="relative flex gap-4">
                  <div
                    className={`absolute -left-[9px] mt-0.5 h-4 w-4 rounded-full border-4 border-white shadow-sm ${item.colorClass}`}
                    aria-hidden="true"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <p className="text-xs text-slate-500">{item.meta}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="mt-6 w-full cursor-pointer rounded-xl py-2 text-sm font-semibold text-[#3D52A0] transition-colors hover:bg-[#3D52A0]/5"
            >
              View Activity Log
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}
