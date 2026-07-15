import { Suspense } from "react"
import AdminLoginForm from "@/components/admin/AdminLoginForm"

export const metadata = {
  title: "Đăng nhập Quản trị — Cổng Dịch vụ tra cứu",
}

/**
 * Trang đăng nhập KHU VỰC QUẢN TRỊ (/admin/login).
 *
 * - Không nằm trong route group (dashboard) nên KHÔNG bị layout ép xác thực.
 * - Được khai báo là public route trong auth.config.ts để middleware không chặn.
 * - Giao diện tách biệt hẳn cổng công dân (nền tối kiểu "console") nhằm mô phỏng
 *   một trang quản trị nội bộ mà kẻ tấn công tìm ra bằng cách dò đường dẫn.
 */
export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-2xl">
            🛡️
          </div>
          <h1 className="mt-4 text-xl font-bold text-slate-100">
            Bảng điều khiển Quản trị
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Cổng Dịch vụ tra cứu · Khu vực dành cho quản trị viên hệ thống
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl shadow-black/40">
          <Suspense fallback={null}>
            <AdminLoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs text-slate-600">
          Chỉ dành cho người dùng có vai trò ADMIN. Mọi truy cập đều được ghi nhật ký.
        </p>
      </div>
    </div>
  )
}
