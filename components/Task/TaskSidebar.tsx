"use client";

import Link from "next/link";
import {
  BarChart3,
  CalendarDays,
  FolderOpen,
  HelpCircle,
  LayoutGrid,
  ListChecks,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";

const TASK_NAV_ITEMS = [
  { href: "/admin/tasks/overview", label: "Overview", icon: LayoutGrid },
  { href: "/admin/tasks/list", label: "Task List", icon: ListChecks },
  { href: "/admin/tasks/schedule", label: "Schedule", icon: CalendarDays },
  { href: "/admin/tasks/resources", label: "Resources", icon: FolderOpen },
  { href: "/admin/tasks/analytics", label: "Analytics", icon: BarChart3 },
];

export default function TaskSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-slate-50 px-4 py-6 md:flex md:flex-col dark:border-slate-800 dark:bg-slate-950">
      <div className="px-4 py-2">
        <h2 className="text-lg font-black text-slate-900">Advanced Physics</h2>
        <p className="mt-1 text-xs font-semibold tracking-widest text-slate-500 uppercase">
          Academic Curator
        </p>
      </div>

      <nav className="mt-6 flex-1 space-y-1">
        {TASK_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href !== "#" &&
            (pathname === item.href || pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={
                isActive
                  ? "flex items-center gap-3 rounded-full bg-indigo-100 px-4 py-2 text-base font-semibold text-indigo-700"
                  : "flex items-center gap-3 rounded-full px-4 py-2 text-base font-semibold text-slate-500 transition-colors hover:bg-indigo-50"
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4">
        <Link
          href="/admin/tasks/create"
          className="block w-full rounded-full bg-indigo-700 py-3 text-center font-bold text-white shadow-lg shadow-indigo-200 transition-transform duration-150 active:scale-[0.98]"
        >
          Create New Task
        </Link>
      </div>

      <div className="mt-6 space-y-1 border-t border-slate-200/50 pt-6">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-full px-4 py-2 text-base font-semibold text-slate-500 transition-colors hover:bg-indigo-50"
        >
          <HelpCircle className="h-4 w-4" />
          Help Center
        </button>
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-full px-4 py-2 text-base font-semibold text-slate-500 transition-colors hover:bg-indigo-50"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
