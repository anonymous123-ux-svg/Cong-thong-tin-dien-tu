import { layThongKeTongQuan } from "@/lib/actions/admin"

export default async function AdminDashboardPage() {
  const { soNguoiDung, soPhanAnh, soDichVuNoiBo } = await layThongKeTongQuan()

  const cards = [
    { label: "Người dùng", value: soNguoiDung },
    { label: "Phản ánh kiến nghị", value: soPhanAnh },
    { label: "Dịch vụ nội bộ (FTP/SSH)", value: soDichVuNoiBo },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Tổng quan</h1>
      <p className="mt-1 text-sm text-slate-500">
        Bảng điều khiển quản trị Cổng Dịch vụ tra cứu.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="text-sm text-slate-500">{c.label}</div>
            <div className="mt-1 text-3xl font-bold text-slate-800">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
