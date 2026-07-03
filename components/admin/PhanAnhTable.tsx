"use client"

import { useTransition } from "react"
import { xoaPhanAnh } from "@/lib/actions/admin"

export type PhanAnhRow = {
  id: string
  tieuDe: string
  noiDung: string
  hoTen: string | null
  email: string | null
  tenTepDinhKem: string | null
  duongDanTep: string | null
  trangThai: string
  createdAt: Date
  user: { email: string } | null
}

export default function PhanAnhTable({ phanAnh }: { phanAnh: PhanAnhRow[] }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="space-y-3">
      {phanAnh.map((p) => (
        <div key={p.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold text-slate-800">{p.tieuDe}</div>
              <div className="mt-1 text-xs text-slate-400">
                {p.user?.email || p.email || "Ẩn danh"} ·{" "}
                {new Date(p.createdAt).toLocaleString("vi-VN")}
              </div>
            </div>
            <button
              disabled={isPending}
              onClick={() => {
                if (confirm("Xóa phản ánh này?")) {
                  startTransition(() => {
                    xoaPhanAnh(p.id)
                  })
                }
              }}
              className="shrink-0 rounded-md bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-60"
            >
              Xóa
            </button>
          </div>
          <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{p.noiDung}</p>
          {p.duongDanTep && (
            <a
              href={p.duongDanTep}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-medium text-[#1567c8] hover:underline"
            >
              📎 {p.tenTepDinhKem}
            </a>
          )}
        </div>
      ))}
    </div>
  )
}
