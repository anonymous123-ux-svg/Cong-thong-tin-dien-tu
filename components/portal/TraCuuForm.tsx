"use client"

import { useActionState } from "react"
import { traCuuHoSo, type TraCuuState } from "@/lib/actions/lookup"

const initialState: TraCuuState = { ok: true, results: [] }

function TinhTrangBadge({ value }: { value: string }) {
  const v = value.toLowerCase()
  let cls = "bg-slate-100 text-slate-700"
  if (v.includes("đã trả")) cls = "bg-emerald-100 text-emerald-700"
  else if (v.includes("đang xử")) cls = "bg-amber-100 text-amber-700"
  else if (v.includes("bổ sung") || v.includes("chờ")) cls = "bg-rose-100 text-rose-700"
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {value}
    </span>
  )
}

export default function TraCuuForm() {
  const [state, formAction, pending] = useActionState(traCuuHoSo, initialState)

  return (
    <div className="space-y-6">
      {/* Form tra cứu — Server Action là điểm vào của lỗ hổng React2Shell */}
      <form
        action={formAction}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
      >
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <label
              htmlFor="maHoSo"
              className="block text-sm font-semibold text-slate-700"
            >
              Mã hồ sơ <span className="text-rose-500">*</span>
            </label>
            <input
              id="maHoSo"
              name="maHoSo"
              type="text"
              required
              placeholder="Ví dụ: 000.00.01.H29-260310-0420"
              className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
            />
          </div>
          <button
            type="submit"
            disabled={pending}
            className="h-[44px] rounded-md bg-[#1567c8] px-6 font-semibold text-white transition hover:bg-[#0b4ea2] disabled:opacity-60"
          >
            {pending ? "Đang tra cứu..." : "Tra cứu"}
          </button>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Nhập mã hồ sơ đã được cấp khi nộp hồ sơ để tra cứu tình trạng xử lý.
        </p>
      </form>

      {/* Thông báo */}
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

      {/* Kết quả */}
      {state?.results?.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="bg-[#eef3fb] text-left text-slate-700">
                <th className="px-4 py-3 font-semibold">Mã hồ sơ</th>
                <th className="px-4 py-3 font-semibold">Thủ tục</th>
                <th className="px-4 py-3 font-semibold">Cơ quan thực hiện</th>
                <th className="px-4 py-3 font-semibold">Người nộp</th>
                <th className="px-4 py-3 font-semibold">Ngày tiếp nhận</th>
                <th className="px-4 py-3 font-semibold">Ngày hẹn trả</th>
                <th className="px-4 py-3 font-semibold">Tình trạng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {state.results.map((r) => (
                <tr key={r.maHoSo} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-[#0b4ea2]">{r.maHoSo}</td>
                  <td className="px-4 py-3">{r.thuTuc}</td>
                  <td className="px-4 py-3">{r.coQuan}</td>
                  <td className="px-4 py-3">{r.nguoiNop}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.ngayTiepNhan}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.ngayHenTra}</td>
                  <td className="px-4 py-3">
                    <TinhTrangBadge value={r.tinhTrang} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
