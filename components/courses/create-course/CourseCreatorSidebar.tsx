"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  {
    href: "/admin/courses/create-course",
    label: "Overview",
    icon: LayoutDashboard,
  },
  { href: "#", label: "Content", icon: BookOpen },
  { href: "#", label: "Enrollments", icon: Users },
  { href: "#", label: "Schedule", icon: CalendarDays },
  { href: "#", label: "Instructors", icon: GraduationCap },
  { href: "#", label: "Analytics", icon: BarChart3 },
];

export default function CourseCreatorSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 bg-slate-50 p-4 md:flex md:flex-col">
      <div className="mb-4 px-3 py-4">
        <h3 className="text-lg font-bold text-slate-900">Course Creator</h3>
        <p className="text-xs text-slate-500">Academic Curator Edition</p>
      </div>

      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isPlaceholder = item.href === "#";
          const isActive = item.href !== "#" && pathname.startsWith(item.href);

          const className = isActive
            ? "flex items-center gap-3 rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700"
            : "flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-indigo-50/50";

          return isPlaceholder ? (
            <a
              key={item.label}
              href="#"
              onClick={(event) => event.preventDefault()}
              aria-disabled="true"
              className={className}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </a>
          ) : (
            <Link key={item.label} href={item.href} className={className}>
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto mb-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Status
        </p>
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="text-sm text-slate-600">Draft Mode</span>
        </div>
        <button
          type="button"
          className="w-full rounded-full bg-indigo-700 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-800"
        >
          Publish Course
        </button>
      </div>
    </aside>
  );
}
