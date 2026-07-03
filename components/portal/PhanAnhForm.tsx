"use client"

import { useActionState } from "react"
import { guiPhanAnh, type PhanAnhState } from "@/lib/actions/phan-anh"

const initialState: PhanAnhState = { ok: true }

export default function PhanAnhForm() {
  const [state, formAction, pending] = useActionState(guiPhanAnh, initialState)

  return (
    <div className="space-y-6">
      <form
        action={formAction}
        className="space-y-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="hoTen" className="block text-sm font-semibold text-slate-700">
              Họ và tên
            </label>
            <input
              id="hoTen"
              name="hoTen"
              type="text"
              placeholder="Nguyễn Văn A"
              className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
              Email liên hệ
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="ban@example.com"
              className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
            />
          </div>
        </div>

        <div>
          <label htmlFor="tieuDe" className="block text-sm font-semibold text-slate-700">
            Tiêu đề <span className="text-rose-500">*</span>
          </label>
          <input
            id="tieuDe"
            name="tieuDe"
            type="text"
            required
            placeholder="Tóm tắt nội dung phản ánh, kiến nghị"
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
          />
        </div>

        <div>
          <label htmlFor="noiDung" className="block text-sm font-semibold text-slate-700">
            Nội dung <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="noiDung"
            name="noiDung"
            required
            rows={5}
            placeholder="Mô tả chi tiết phản ánh, kiến nghị của bạn..."
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
          />
        </div>

        <div>
          <label htmlFor="tepDinhKem" className="block text-sm font-semibold text-slate-700">
            Tệp đính kèm
          </label>
          <input
            id="tepDinhKem"
            name="tepDinhKem"
            type="file"
            className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 outline-none file:mr-3 file:rounded-md file:border-0 file:bg-[#eef3fb] file:px-3 file:py-1.5 file:font-medium file:text-[#1567c8]"
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Chấp nhận mọi định dạng tệp (hình ảnh, văn bản, video, nén...).
          </p>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[#1567c8] px-6 py-2.5 font-semibold text-white transition hover:bg-[#0b4ea2] disabled:opacity-60"
        >
          {pending ? "Đang gửi..." : "Gửi phản ánh"}
        </button>
      </form>

      {state?.message && (
        <div
          className={`rounded-md border px-4 py-3 text-sm ${
            state.ok
              ? "border-blue-200 bg-blue-50 text-blue-800"
              : "border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {state.message}
        </div>
      )}
    </div>
  )
}
