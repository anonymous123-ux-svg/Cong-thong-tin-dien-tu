import type { ReactNode } from "react"
import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { logout } from "@/lib/actions/auth"

const navItems = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/nguoi-dung", label: "Quản lý người dùng" },
  { href: "/admin/phan-anh", label: "Phản ánh kiến nghị" },
  { href: "/admin/dich-vu-noi-bo", label: "Hạ tầng nội bộ" },
]

/**
 * Khu vực quản trị (/admin) — KHÔNG có liên kết ở bất kỳ menu điều hướng công
 * khai nào của cổng dịch vụ công. Route này chỉ được phát hiện bằng cách dò
 * quét đường dẫn (gobuster/ffuf/dirb...), đúng với kịch bản huấn luyện Red Team
 * của lab. Việc bảo vệ vẫn dựa trên xác thực + phân quyền ADMIN thật sự bên
 * dưới — bảo mật không dựa vào việc "giấu" đường dẫn.
 */
export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }
  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <aside className="flex w-64 shrink-0 flex-col bg-slate-900 text-slate-100">
        <div className="border-b border-white/10 px-5 py-5">
          <div className="text-xs uppercase tracking-wide text-slate-400">
            Quản trị hệ thống
          </div>
          <div className="font-bold">Cổng Dịch vụ công</div>
        </div>

        <nav className="flex-1 px-2 py-4 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 font-medium hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 px-3 py-4 text-sm">
          <div className="mb-2 truncate px-3 text-xs text-slate-400">
            {session.user.email}
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="w-full rounded-md bg-white/10 px-3 py-2 text-left font-medium hover:bg-white/20"
            >
              Đăng xuất
            </button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
