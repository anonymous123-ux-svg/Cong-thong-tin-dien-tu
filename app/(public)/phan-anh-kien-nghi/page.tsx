import Link from "next/link"
import PortalHeader from "@/components/portal/PortalHeader"
import PortalFooter from "@/components/portal/PortalFooter"
import PhanAnhForm from "@/components/portal/PhanAnhForm"

export default function PhanAnhKienNghiPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader active="phan-anh-kien-nghi" />

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-500">
          <Link href="/" className="hover:text-[#1567c8]">
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-700">Phản ánh kiến nghị</span>
        </div>
      </div>

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-800">Phản ánh kiến nghị</h1>
        <p className="mt-1 text-sm text-slate-500">
          Gửi phản ánh, kiến nghị về quy định hành chính hoặc chất lượng phục vụ tới cơ quan có thẩm quyền.
        </p>

        <div className="mt-6">
          <PhanAnhForm />
        </div>
      </main>

      <PortalFooter />
    </div>
  )
}
