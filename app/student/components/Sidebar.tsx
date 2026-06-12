"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Sidebar() {

  const pathname = usePathname()

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-2 rounded-full text-sm ${
      pathname === path
        ? "bg-indigo-100 text-indigo-700"
        : "text-slate-600 hover:bg-indigo-50"
    }`

  return (
    <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-indigo-50/30 flex-col p-6 pt-24">

      <div className="mb-8 px-4">
        <h2 className="text-lg font-bold text-indigo-700">
          The Path
        </h2>

        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">
          Mastery & Achievement
        </p>
      </div>

      <nav className="flex flex-col gap-1 flex-1">

        <Link href="/student/dashboard" className={linkClass("/student/dashboard")}>
          <span className="material-symbols-outlined">school</span>
          My Learning
        </Link>

        <Link href="/student/assignments" className={linkClass("/student/assignments")}>
          <span className="material-symbols-outlined">assignment</span>
          Assignments
        </Link>

        <Link href="/student/resources" className={linkClass("/student/resources")}>
          <span className="material-symbols-outlined">menu_book</span>
          Resources
        </Link>

        <Link href="/student/messages" className={linkClass("/student/messages")}>
          <span className="material-symbols-outlined">chat_bubble</span>
          Messages
        </Link>

        <Link href="/student/support" className={linkClass("/student/support")}>
          <span className="material-symbols-outlined">help_outline</span>
          Support
        </Link>

      </nav>

      <button className="bg-indigo-600 text-white rounded-full py-3 font-semibold text-sm shadow mt-6">
        Create Course
      </button>

      <button className="flex items-center gap-2 text-slate-600 hover:text-red-600 mt-4">
        <span className="material-symbols-outlined">logout</span>
        Log Out
      </button>

    </aside>
  )
}