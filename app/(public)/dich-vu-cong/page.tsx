import Link from "next/link"
import { auth } from "@/auth"
import { layDanhSachDichVu } from "@/lib/actions/dich-vu"
import PortalHeader from "@/components/portal/PortalHeader"
import PortalFooter from "@/components/portal/PortalFooter"

export default async function DichVuCongPage() {
  const [session, dichVuList] = await Promise.all([auth(), layDanhSachDichVu()])
  const traCuuHref = session?.user ? "/tra-cuu" : "/login"

  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader active="dich-vu-cong" />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#1567c8]">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-700">Dịch vụ công trực tuyến</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800">Dịch vụ công trực tuyến</h1>
        <p className="mt-1 text-sm text-slate-500">
          Danh sách thủ tục hành chính có thể thực hiện trực tuyến toàn trình hoặc một phần.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dichVuList.map((d) => (
            <div
              key={d.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eef3fb] text-[#1567c8]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M9 13h6M9 17h6" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                  {d.mucDo}
                </span>
              </div>
              <div className="mt-3 font-semibold text-slate-800">{d.ten}</div>
              <div className="text-sm text-slate-500">{d.coQuan}</div>
              <div className="mt-1 text-xs text-slate-400">{d.linhVuc}</div>
              <Link
                href={traCuuHref}
                className="mt-3 inline-block text-sm font-medium text-[#1567c8] hover:underline"
              >
                Nộp / Tra cứu →
              </Link>
            </div>
          ))}
        </div>
      </main>

      <PortalFooter />
    </div>
  )
}
