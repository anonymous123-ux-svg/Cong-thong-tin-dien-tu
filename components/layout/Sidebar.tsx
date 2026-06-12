"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BarChart3,
  Calendar,
  FolderOpen,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  Plus,
  Users,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/class/class-dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/class/classes", label: "Classes", icon: Users },
  {
    href: "/class/schedule",
    label: "Schedule",
    icon: Calendar,
  },
  {
    href: "/class/resources",
    label: "Resources",
    icon: FolderOpen,
  },
  {
    href: "/class/analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-slate-50 px-4 py-6 dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col">
      <div className="mb-8 px-2">
        <div className="mb-1 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
              Class Module
            </h2>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Advanced Physics
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const active =
            (item.label === "Overview" &&
              pathname.startsWith("/class/class-dashboard")) ||
            (item.label === "Users" &&
              pathname.startsWith("/admin/users")) ||
            (item.label === "Classes" &&
              pathname.startsWith("/class/classes")) ||
            (item.label === "Schedule" &&
              pathname.startsWith("/class/schedule")) ||
            (item.label === "Resources" &&
              pathname.startsWith("/class/resources")) ||
            (item.label === "Analytics" &&
              pathname.startsWith("/class/analytics"));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                active
                  ? "flex items-center gap-3 rounded-xl bg-indigo-100 p-3 text-sm font-medium text-indigo-700 shadow-sm dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "flex items-center gap-3 rounded-xl p-3 text-sm font-medium text-slate-500 transition-all hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800/60"
              }
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-1 pt-4">
        <div className="mb-4 rounded-2xl bg-indigo-600 p-4 text-white shadow-sm">
          <p className="mb-2 text-xs font-semibold opacity-90">
            Current Progress
          </p>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-3/4 rounded-full bg-white" />
          </div>
          <p className="mt-2 text-right text-[10px] font-medium opacity-90">
            75% Complete
          </p>
        </div>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800/60"
        >
          <HelpCircle className="h-4 w-4" />
          Support
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-xl p-3 text-sm font-medium text-slate-500 transition hover:bg-indigo-50 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-800/60"
        >
          <Archive className="h-4 w-4" />
          Archive
        </button>
      </div>

      <button
        type="button"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-indigo-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
      >
        <Plus className="h-4 w-4" />
        Join Class
      </button>
    </aside>
  );
}
