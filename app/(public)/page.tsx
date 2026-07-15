import Link from "next/link"
import { auth } from "@/auth"
import PortalHeader from "@/components/portal/PortalHeader"
import PortalFooter from "@/components/portal/PortalFooter"

const dichVuNoiBat = [
  { ten: "Cấp đổi giấy phép lái xe", coQuan: "Bộ Giao thông Vận tải" },
  { ten: "Đăng ký khai sinh", coQuan: "Bộ Tư pháp" },
  { ten: "Cấp phiếu lý lịch tư pháp", coQuan: "Sở Tư pháp" },
  { ten: "Đăng ký kết hôn", coQuan: "UBND cấp xã" },
  { ten: "Thông báo lưu trú", coQuan: "Bộ Công an" },
  { ten: "Cấp giấy chứng nhận quyền sử dụng đất", coQuan: "Bộ TN&MT" },
]

export default async function PublicHomePage() {
  const session = await auth()
  const traCuuHref = session?.user ? "/tra-cuu" : "/login"

  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader active="home" />

      {/* Hero + tra cứu nhanh */}
      <section className="bg-gradient-to-b from-[#1567c8] to-[#0b4ea2] text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Cổng Dịch vụ tra cứu
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-blue-100">
            Nơi người dân và doanh nghiệp thực hiện, theo dõi và tra cứu hồ sơ
            thủ tục hành chính trực tuyến.
          </p>

          <div className="mx-auto mt-8 max-w-2xl rounded-xl bg-white p-2 shadow-lg">
            <div className="flex flex-col gap-2 sm:flex-row">
              <div className="flex-1 rounded-lg bg-slate-50 px-4 py-3 text-left text-sm text-slate-500">
                Tra cứu tình trạng hồ sơ theo mã hồ sơ...
              </div>
              <Link
                href={traCuuHref}
                className="rounded-lg bg-[#a4262c] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#8c1f24]"
              >
                Tra cứu hồ sơ
              </Link>
            </div>
          </div>
          {!session?.user && (
            <p className="mt-3 text-xs text-blue-100">
              Vui lòng <Link href="/login" className="underline font-semibold">đăng nhập</Link> để
              sử dụng chức năng tra cứu hồ sơ.
            </p>
          )}
        </div>
      </section>

      {/* Dịch vụ nổi bật */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="text-xl font-bold text-slate-800">Dịch vụ tra cứu nổi bật</h2>
        <p className="mt-1 text-sm text-slate-500">
          Các thủ tục hành chính được người dân sử dụng nhiều nhất.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dichVuNoiBat.map((d) => (
            <div
              key={d.ten}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#eef3fb] text-[#1567c8]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6M9 13h6M9 17h6" />
                </svg>
              </div>
              <div className="mt-3 font-semibold text-slate-800">{d.ten}</div>
              <div className="text-sm text-slate-500">{d.coQuan}</div>
              <Link
                href={traCuuHref}
                className="mt-3 inline-block text-sm font-medium text-[#1567c8] hover:underline"
              >
                Nộp / Tra cứu →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <PortalFooter />
    </div>
  )
}
