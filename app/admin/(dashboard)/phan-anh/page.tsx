import { layDanhSachPhanAnh } from "@/lib/actions/admin"
import PhanAnhTable from "@/components/admin/PhanAnhTable"

export default async function AdminPhanAnhPage() {
  const phanAnh = await layDanhSachPhanAnh()

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800">Phản ánh kiến nghị</h1>
      <p className="mt-1 text-sm text-slate-500">
        Nội dung và tệp đính kèm do người dân gửi qua mục &quot;Phản ánh kiến nghị&quot;.
      </p>

      <div className="mt-6">
        <PhanAnhTable phanAnh={phanAnh} />
      </div>
    </div>
  )
}
