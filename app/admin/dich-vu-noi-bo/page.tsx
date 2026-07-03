import { layDanhSachDichVuNoiBo } from "@/lib/actions/admin"

export default async function AdminDichVuNoiBoPage() {
  const dichVuNoiBo = await layDanhSachDichVuNoiBo()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Hạ tầng nội bộ</h1>
      <p className="mt-1 text-sm text-slate-500">
        Thông tin kết nối FTP/SSH nội bộ theo từng người dùng dịch vụ.
      </p>
      <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        ⚠️ Dữ liệu nhạy cảm — chỉ hiển thị cho vai trò ADMIN.
      </div>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-slate-700">
              <th className="px-4 py-3 font-semibold">Loại</th>
              <th className="px-4 py-3 font-semibold">Host</th>
              <th className="px-4 py-3 font-semibold">Port</th>
              <th className="px-4 py-3 font-semibold">Username</th>
              <th className="px-4 py-3 font-semibold">Mật khẩu</th>
              <th className="px-4 py-3 font-semibold">Người dùng liên kết</th>
              <th className="px-4 py-3 font-semibold">Ghi chú</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dichVuNoiBo.map((d) => (
              <tr key={d.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-800">{d.loaiDichVu}</td>
                <td className="px-4 py-3">{d.hostname}</td>
                <td className="px-4 py-3">{d.port}</td>
                <td className="px-4 py-3 font-mono">{d.username}</td>
                <td className="px-4 py-3 font-mono">{d.matKhau}</td>
                <td className="px-4 py-3">{d.user?.email || "—"}</td>
                <td className="px-4 py-3 text-slate-500">{d.ghiChu || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
