"use client"
import Link from "next/link";

type Props = {
  role: "admin" | "lecturer" | "student"
}

export default function TopNavbar({ role }: Props) {
  const roleLabel = {
    admin: "Admin Panel",
    lecturer: "Lecturer Panel",
    student: "Student Portal",
  }

  return (
    <nav
      className="
        fixed top-0
        left-64        /* Bắt đầu bên phải sidebar */
        w-[calc(100%-16rem)] /* Trừ đi width của sidebar */
        h-16 bg-white border-b flex items-center justify-between px-8 z-50
      "
    >

      {/* Left */}
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold text-indigo-700">
          Academic Curator
        </span>
        <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-semibold">
          {roleLabel[role]}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <span className="material-symbols-outlined cursor-pointer text-gray-600 hover:text-indigo-600">
          search
        </span>
        <span className="material-symbols-outlined cursor-pointer text-gray-600 hover:text-indigo-600">
          notifications
        </span>
        <Link href={`/${role}/settings`} className="flex items-center gap-5">
          <span className="material-symbols-outlined cursor-pointer text-gray-600 hover:text-indigo-600">
            settings
          </span>
          <div className="w-9 h-9 rounded-full bg-indigo-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-600 transition">
            <img
              src="https://api.dicebear.com/7.x/initials/svg?seed=User"
              alt="avatar"
            />
          </div>
        </Link>
      </div>

    </nav>
  )
}