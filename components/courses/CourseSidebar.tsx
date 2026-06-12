"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { COURSES } from "@/components/courses/mockData";
import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FolderOpen,
  GraduationCap,
  Info,
  MessageSquare,
  NotebookPen,
  Play,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  isActive?: (pathname: string) => boolean;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

const RESERVED_COURSE_SEGMENTS = new Set([
  "create-course",
  "curriculum",
  "resources",
  "continue-learning",
  "assignments",
  "notes",
  "my-progress",
  "performance",
  "discussions",
  "instructors",
]);

function getCourseIdFromPathname(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== "admin" || segments[1] !== "courses") return null;

  const maybeCourseId = segments[2];
  if (!maybeCourseId) return null;
  if (RESERVED_COURSE_SEGMENTS.has(maybeCourseId)) return null;

  return maybeCourseId;
}

function buildNavGroups(params: {
  overviewHref: string;
  curriculumHref: string;
  resourcesHref: string;
  continueLearningHref: string;
  assignmentsHref: string;
  notesHref: string;
  myProgressHref: string;
  performanceHref: string;
  discussionsHref: string;
  instructorsHref: string;
}): NavGroup[] {
  const {
    overviewHref,
    curriculumHref,
    resourcesHref,
    continueLearningHref,
    assignmentsHref,
    notesHref,
    myProgressHref,
    performanceHref,
    discussionsHref,
    instructorsHref,
  } = params;

  return [
    {
      title: "Course",
      items: [
        {
          href: overviewHref,
          label: "Overview",
          icon: Info,
          isActive: (pathname) => pathname === overviewHref,
        },
        {
          href: curriculumHref,
          label: "Curriculum",
          icon: BookOpen,
          isActive: (pathname) => pathname.startsWith(curriculumHref),
        },
        {
          href: resourcesHref,
          label: "Resources",
          icon: FolderOpen,
          isActive: (pathname) =>
            resourcesHref !== "#" && pathname.startsWith(resourcesHref),
        },
      ],
    },
    {
      title: "Learning",
      items: [
        {
          href: continueLearningHref,
          label: "Continue Learning",
          icon: PlayCircle,
          isActive: (pathname) =>
            continueLearningHref !== "#" &&
            pathname.startsWith(continueLearningHref),
        },
        {
          href: assignmentsHref,
          label: "Assignments",
          icon: ClipboardList,
          isActive: (pathname) =>
            assignmentsHref !== "#" && pathname.startsWith(assignmentsHref),
        },
        {
          href: notesHref,
          label: "Notes",
          icon: NotebookPen,
          isActive: (pathname) =>
            notesHref !== "#" && pathname.startsWith(notesHref),
        },
      ],
    },
    {
      title: "Progress",
      items: [
        {
          href: myProgressHref,
          label: "My Progress",
          icon: TrendingUp,
          isActive: (pathname) =>
            myProgressHref !== "#" && pathname.startsWith(myProgressHref),
        },
        {
          href: performanceHref,
          label: "Performance",
          icon: BarChart3,
          isActive: (pathname) =>
            performanceHref !== "#" && pathname.startsWith(performanceHref),
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          href: discussionsHref,
          label: "Discussions",
          icon: MessageSquare,
          isActive: (pathname) =>
            discussionsHref !== "#" && pathname.startsWith(discussionsHref),
        },
        {
          href: instructorsHref,
          label: "Instructors",
          icon: GraduationCap,
          isActive: (pathname) =>
            instructorsHref !== "#" && pathname.startsWith(instructorsHref),
        },
      ],
    },
  ];
}

export default function CourseSidebar() {
  const pathname = usePathname();
  const courseId = getCourseIdFromPathname(pathname);
  const defaultCourseId = COURSES[0]?.id;

  const overviewHref = courseId
    ? `/admin/courses/${courseId}`
    : "/admin/courses";
  const curriculumHref = courseId
    ? `${overviewHref}/curriculum`
    : "/admin/courses/curriculum";

  const resourcesHref = courseId
    ? `${overviewHref}/resources`
    : "/admin/courses/resources";

  const continueLearningHref = courseId
    ? `${overviewHref}/continue-learning`
    : "/admin/courses/continue-learning";

  const assignmentsHref = courseId
    ? `${overviewHref}/assignments`
    : "/admin/courses/assignments";

  const notesHref = courseId
    ? `${overviewHref}/notes`
    : defaultCourseId
      ? `/admin/courses/${defaultCourseId}/notes`
      : "/admin/courses";

  const myProgressHref = courseId
    ? `${overviewHref}/my-progress`
    : defaultCourseId
      ? `/admin/courses/${defaultCourseId}/my-progress`
      : "/admin/courses";

  const performanceHref = courseId
    ? `${overviewHref}/performance`
    : defaultCourseId
      ? `/admin/courses/${defaultCourseId}/performance`
      : "/admin/courses";

  const discussionsHref = courseId
    ? `${overviewHref}/discussions`
    : defaultCourseId
      ? `/admin/courses/${defaultCourseId}/discussions`
      : "/admin/courses";

  const instructorsHref = courseId
    ? `${overviewHref}/instructors`
    : defaultCourseId
      ? `/admin/courses/${defaultCourseId}/instructors`
      : "/admin/courses";

  const navGroups = buildNavGroups({
    overviewHref,
    curriculumHref,
    resourcesHref,
    continueLearningHref,
    assignmentsHref,
    notesHref,
    myProgressHref,
    performanceHref,
    discussionsHref,
    instructorsHref,
  });

  return (
    <aside className="sticky top-16 z-40 hidden h-[calc(100vh-4rem)] w-72 shrink-0 overflow-hidden bg-[#f7f7fb] px-5 py-6 md:flex md:flex-col dark:bg-slate-900">
      {/* Nav */}
      <nav className="flex-1 space-y-5 leading-relaxed tracking-tight text-slate-700 dark:text-slate-300 overflow-hidden">
        {navGroups.map((group) => (
          <div key={group.title}>
            <h2 className="px-3 text-[0.6rem] font-bold text-slate-400 uppercase tracking-widest mb-1.5">
              {group.title}
            </h2>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = item.isActive ? item.isActive(pathname) : false;
                const isPlaceholder = item.href === "#";

                const className = active
                  ? "flex items-center gap-3 rounded-xl bg-indigo-100 px-3 py-2 text-indigo-700 font-semibold dark:bg-indigo-900/40 dark:text-indigo-300"
                  : "flex items-center gap-3 rounded-xl px-3 py-2 text-slate-500 transition-colors hover:bg-indigo-50 hover:text-indigo-700 dark:text-slate-400 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-300";

                return (
                  <li key={item.label}>
                    {isPlaceholder ? (
                      <a
                        href="#"
                        onClick={(event) => event.preventDefault()}
                        aria-disabled="true"
                        className={className}
                      >
                        <item.icon
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm">{item.label}</span>
                      </a>
                    ) : (
                      <Link href={item.href} className={className}>
                        <item.icon
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-sm">{item.label}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* CTA Button */}
      <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-slate-700">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 shadow-sm"
        >
          <Play className="h-4 w-4" aria-hidden="true" />
          Resume Last Lecture
        </button>
      </div>
    </aside>
  );
}
