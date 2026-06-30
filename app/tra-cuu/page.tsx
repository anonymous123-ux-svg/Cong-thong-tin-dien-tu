import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import PortalHeader from "@/components/portal/PortalHeader"
import PortalFooter from "@/components/portal/PortalFooter"
import TraCuuForm from "@/components/portal/TraCuuForm"

export default async function TraCuuPage() {
  // Chức năng tra cứu chỉ dành cho người dùng đã đăng nhập.
  const session = await auth()
  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader active="tra-cuu" />

      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#1567c8]">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-700">Tra cứu hồ sơ</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800">Tra cứu hồ sơ</h1>
        <p className="mt-1 text-sm text-slate-500">
          Nhập mã hồ sơ để tra cứu tình trạng giải quyết thủ tục hành chính của bạn.
        </p>

        <div className="mt-6">
          <TraCuuForm />
        </div>
      </main>

      <PortalFooter />
    </div>
  )
}
