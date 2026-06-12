"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Search, Settings, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/admin/dashboard", label: "Admin" },
  { href: "/lecturer/dashboard", label: "Lecturer" },
  { href: "/student/dashboard", label: "Student" },
];

export default function Topbar() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/80 shadow-[0px_20px_40px_rgba(21,28,39,0.06)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex h-16 items-center justify-between gap-4 px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tighter text-indigo-600 transition hover:text-indigo-500 dark:text-indigo-400"
          >
            The Academic Curator
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href) && item.href !== "/" || pathname === item.href;

              const linkClassName = isActive
                ? "relative inline-flex -translate-y-1 items-center text-base font-bold text-indigo-600 transition-transform after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-current after:opacity-100 after:content-[''] dark:text-indigo-400"
                : "relative inline-flex items-center text-sm font-medium text-slate-500 transition-colors after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-current after:opacity-0 after:transition-opacity after:content-[''] hover:text-indigo-600 hover:after:opacity-100 dark:text-slate-400 dark:hover:text-indigo-400";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={linkClassName}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="relative w-full max-w-md"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              aria-label="Search"
              placeholder="Search..."
              className="h-9 w-full rounded-full border border-slate-200 bg-white/70 pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm outline-none transition focus:border-indigo-200 focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-200"
            />
          </form>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-lg p-2 text-slate-500 transition-all hover:bg-indigo-50/50 hover:text-indigo-600 active:scale-95 dark:text-slate-300 dark:hover:bg-indigo-900/20"
          >
            <Bell className="h-5 w-5" />
          </button>

          <Link
            href="/admin/settings"
            aria-label="Settings"
            className="rounded-lg p-2 text-slate-500 transition-all hover:bg-indigo-50/50 hover:text-indigo-600 active:scale-95 dark:text-slate-300 dark:hover:bg-indigo-900/20"
          >
            <Settings className="h-5 w-5" />
          </Link>

          <button
            type="button"
            onClick={() => logout()}
            aria-label="Logout"
            className="rounded-lg p-2 text-red-500 transition-all hover:bg-red-50 hover:text-red-600 active:scale-95 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-5 w-5" />
          </button>

          <Link href="/admin/settings" className="ml-2 h-10 w-10 overflow-hidden rounded-full border-2 border-primary-fixed bg-slate-200 transition-transform hover:scale-105">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=Admin"
              alt="Profile picture"
              className="h-full w-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
