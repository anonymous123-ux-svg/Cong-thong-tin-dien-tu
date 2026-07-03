import { layDanhSachNguoiDung } from "@/lib/actions/admin"
import NguoiDungTable from "@/components/admin/NguoiDungTable"

export default async function AdminNguoiDungPage() {
  const nguoiDung = await layDanhSachNguoiDung()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Quản lý người dùng</h1>
      <p className="mt-1 text-sm text-slate-500">
        Danh sách tài khoản đã đăng ký trên cổng dịch vụ công.
      </p>

      <div className="mt-6">
        <NguoiDungTable nguoiDung={nguoiDung} />
      </div>
    </div>
  )
}
