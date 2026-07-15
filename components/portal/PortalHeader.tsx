import Link from "next/link"
import { auth } from "@/auth"
import { logout } from "@/lib/actions/auth"
import EmblemStar from "./EmblemStar"

export default async function PortalHeader({
  active,
}: {
  active?: "home" | "tra-cuu" | "dich-vu-tra-cuu" | "phan-anh-kien-nghi"
}) {
  const session = await auth()
  const user = session?.user

  return (
    <header className="w-full">
      {/* Thanh quốc gia */}
      <div className="bg-[#a4262c] text-white text-xs">
        <div className="mx-auto max-w-6xl px-4 py-1.5 flex items-center justify-between">
          <span className="font-medium tracking-wide">
            CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
          </span>
          <span className="hidden sm:inline opacity-90">
            Độc lập - Tự do - Hạnh phúc
          </span>
        </div>
      </div>

      {/* Header chính */}
      <div className="bg-gradient-to-r from-[#0b4ea2] to-[#1567c8] text-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <EmblemStar size={48} />
            <div className="leading-tight">
              <div className="flex items-center gap-2 flex-wrap">
                <div className="text-lg sm:text-xl font-bold uppercase tracking-wide">
                  Cổng Dịch vụ tra cứu
                </div>
                <span className="rounded bg-amber-400 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#7a3b00]">
                  Phiên bản diễn tập ATTT
                </span>
              </div>
              <div className="text-[11px] sm:text-xs text-blue-100">
                Kết nối, cung cấp thông tin và dịch vụ tra cứu mọi lúc, mọi nơi
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-3 text-sm">
            {user ? (
              <>
                <span className="hidden sm:inline text-blue-100">
                  Xin chào,{" "}
                  <span className="font-semibold text-white">
                    {user.name || user.email}
                  </span>
                </span>
                <form action={logout}>
                  <button
                    type="submit"
                    className="rounded-md bg-white/15 px-3 py-1.5 font-medium hover:bg-white/25 transition"
                  >
                    Đăng xuất
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-md bg-white px-3 py-1.5 font-semibold text-[#0b4ea2] hover:bg-blue-50 transition"
                >
                  Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="rounded-md border border-white/70 px-3 py-1.5 font-medium hover:bg-white/10 transition"
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Thanh điều hướng */}
      <nav className="bg-[#0a4493] text-white text-sm border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 flex items-center gap-1">
          <Link
            href="/"
            className={`px-4 py-2.5 font-medium hover:bg-white/10 transition ${
              active === "home" ? "bg-white/15" : ""
            }`}
          >
            Trang chủ
          </Link>
          <Link
            href="/tra-cuu"
            className={`px-4 py-2.5 font-medium hover:bg-white/10 transition ${
              active === "tra-cuu" ? "bg-white/15" : ""
            }`}
          >
            Tra cứu hồ sơ
          </Link>
          <Link
            href="/dich-vu-tra-cuu"
            className={`px-4 py-2.5 font-medium hover:bg-white/10 transition ${
              active === "dich-vu-tra-cuu" ? "bg-white/15" : ""
            }`}
          >
            Dịch vụ tra cứu trực tuyến
          </Link>
          <Link
            href="/phan-anh-kien-nghi"
            className={`px-4 py-2.5 font-medium hover:bg-white/10 transition ${
              active === "phan-anh-kien-nghi" ? "bg-white/15" : ""
            }`}
          >
            Phản ánh kiến nghị
          </Link>
        </div>
      </nav>
    </header>
  )
}
