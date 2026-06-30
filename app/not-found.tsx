import Link from "next/link"
import EmblemStar from "@/components/portal/EmblemStar"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f4f6fb] px-6 text-center">
      <EmblemStar size={64} />
      <h1 className="mt-6 text-6xl font-black text-[#0b4ea2]">404</h1>
      <p className="mt-2 text-lg text-slate-600">
        Không tìm thấy trang bạn yêu cầu.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-md bg-[#1567c8] px-6 py-2.5 font-semibold text-white transition hover:bg-[#0b4ea2]"
      >
        Về trang chủ
      </Link>
    </main>
  )
}
