"use client"

import { useTransition } from "react"
import type { Role } from "@prisma/client"
import { capNhatVaiTroNguoiDung, xoaNguoiDung } from "@/lib/actions/admin"

export type NguoiDungRow = {
  id: string
  email: string
  hoTen: string | null
  role: Role
}

const ROLES: Role[] = ["CONG_DAN", "CAN_BO", "ADMIN"]

export default function NguoiDungTable({ nguoiDung }: { nguoiDung: NguoiDungRow[] }) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[720px] text-sm">
        <thead>
          <tr className="bg-slate-50 text-left text-slate-700">
            <th className="px-4 py-3 font-semibold">Email</th>
            <th className="px-4 py-3 font-semibold">Họ tên</th>
            <th className="px-4 py-3 font-semibold">Vai trò</th>
            <th className="px-4 py-3 font-semibold">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {nguoiDung.map((u) => (
            <tr key={u.id} className="hover:bg-slate-50">
              <td className="px-4 py-3 font-medium text-slate-800">{u.email}</td>
              <td className="px-4 py-3">{u.hoTen || "—"}</td>
              <td className="px-4 py-3">
                <select
                  defaultValue={u.role}
                  disabled={isPending}
                  onChange={(e) =>
                    startTransition(() => {
                      capNhatVaiTroNguoiDung(u.id, e.target.value as Role)
                    })
                  }
                  className="rounded-md border border-slate-300 px-2 py-1.5 text-slate-800"
                >
                  {ROLES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </td>
              <td className="px-4 py-3">
                <button
                  disabled={isPending}
                  onClick={() => {
                    if (confirm(`Xóa người dùng ${u.email}?`)) {
                      startTransition(() => {
                        xoaNguoiDung(u.id)
                      })
                    }
                  }}
                  className="rounded-md bg-rose-50 px-3 py-1.5 font-medium text-rose-700 hover:bg-rose-100 disabled:opacity-60"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
