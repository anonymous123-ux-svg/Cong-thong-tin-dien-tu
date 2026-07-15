import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/dichvutracuu",
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.dichVuNoiBo.deleteMany({})
  await prisma.phanAnh.deleteMany({})
  await prisma.dichVu.deleteMany({})
  await prisma.hoSo.deleteMany({})
  await prisma.user.deleteMany({})

  const passwordHash = await bcrypt.hash("password123", 10)

  // Tài khoản cán bộ quản trị
  const canBo = await prisma.user.create({
    data: {
      email: "canbo@dichvutracuu.gov.vn",
      hoTen: "Nguyễn Văn Cán Bộ",
      passwordHash,
      role: "CAN_BO",
    },
  })

  // Tài khoản quản trị viên hệ thống (trang /admin — không có link điều hướng, chỉ tìm được bằng fuzzing)
  const admin = await prisma.user.create({
    data: {
      email: "admin@dichvutracuu.gov.vn",
      hoTen: "Quản trị viên hệ thống",
      passwordHash,
      role: "ADMIN",
    },
  })

  // Tài khoản công dân mẫu (dùng để đăng nhập và tra cứu)
  const congDan = await prisma.user.create({
    data: {
      email: "congdan@dichvutracuu.gov.vn",
      hoTen: "Trần Thị Công Dân",
      passwordHash,
      role: "CONG_DAN",
    },
  })

  // Hồ sơ dịch vụ tra cứu mẫu
  const seedHoSo = [
    {
      maHoSo: "000.00.01.H29-240115-0001",
      thuTuc: "Cấp đổi giấy phép lái xe",
      coQuan: "Sở Giao thông Vận tải",
      linhVuc: "Giao thông vận tải",
      nguoiNop: "Trần Thị Công Dân",
      tinhTrang: "Đã trả kết quả",
      ngayTiepNhan: new Date("2026-01-15T08:30:00Z"),
      ngayHenTra: new Date("2026-01-22T17:00:00Z"),
      ownerId: congDan.id,
    },
    {
      maHoSo: "000.00.01.H29-260310-0420",
      thuTuc: "Đăng ký khai sinh",
      coQuan: "UBND Phường Bến Nghé",
      linhVuc: "Tư pháp - Hộ tịch",
      nguoiNop: "Trần Thị Công Dân",
      tinhTrang: "Đang xử lý",
      ngayTiepNhan: new Date("2026-03-10T09:15:00Z"),
      ngayHenTra: new Date("2026-03-13T17:00:00Z"),
      ownerId: congDan.id,
    },
    {
      maHoSo: "000.00.01.H29-260520-1188",
      thuTuc: "Cấp giấy chứng nhận quyền sử dụng đất",
      coQuan: "Văn phòng Đăng ký đất đai",
      linhVuc: "Đất đai",
      nguoiNop: "Lê Văn A",
      tinhTrang: "Chờ bổ sung hồ sơ",
      ngayTiepNhan: new Date("2026-05-20T14:00:00Z"),
      ngayHenTra: new Date("2026-06-20T17:00:00Z"),
      ownerId: null,
    },
  ]

  for (const h of seedHoSo) {
    await prisma.hoSo.create({ data: h })
  }

  // Danh mục dịch vụ tra cứu trực tuyến (trang /dich-vu-tra-cuu)
  const seedDichVu = [
    { ten: "Cấp đổi giấy phép lái xe", coQuan: "Bộ Giao thông Vận tải", linhVuc: "Giao thông vận tải" },
    { ten: "Đăng ký khai sinh", coQuan: "Bộ Tư pháp", linhVuc: "Tư pháp - Hộ tịch" },
    { ten: "Cấp phiếu lý lịch tư pháp", coQuan: "Sở Tư pháp", linhVuc: "Tư pháp - Hộ tịch" },
    { ten: "Đăng ký kết hôn", coQuan: "UBND cấp xã", linhVuc: "Tư pháp - Hộ tịch" },
    { ten: "Thông báo lưu trú", coQuan: "Bộ Công an", linhVuc: "An ninh trật tự" },
    { ten: "Cấp giấy chứng nhận quyền sử dụng đất", coQuan: "Bộ TN&MT", linhVuc: "Đất đai" },
    { ten: "Đăng ký thành lập hộ kinh doanh", coQuan: "Sở Kế hoạch Đầu tư", linhVuc: "Kế hoạch - Đầu tư" },
    { ten: "Cấp hộ chiếu phổ thông", coQuan: "Bộ Công an", linhVuc: "Xuất nhập cảnh" },
    { ten: "Đăng ký tạm trú, tạm vắng", coQuan: "Công an cấp xã", linhVuc: "An ninh trật tự" },
  ]
  for (const d of seedDichVu) {
    await prisma.dichVu.create({ data: d })
  }

  // Thông tin dịch vụ nội bộ (FTP/SSH) — dữ liệu GIẢ LẬP cho mục tiêu post-exploitation
  // trong lab (chỉ xem được tại /admin/dich-vu-noi-bo sau khi đăng nhập bằng vai trò ADMIN).
  await prisma.dichVuNoiBo.createMany({
    data: [
      {
        loaiDichVu: "FTP",
        hostname: "ftp-noibo.dichvutracuu.lab",
        port: 21,
        username: "svc_hoso_ftp",
        matKhau: "Lab_Ftp_2026!",
        ghiChu: "Kho lưu trữ hồ sơ scan của cán bộ tiếp nhận.",
        userId: canBo.id,
      },
      {
        loaiDichVu: "SSH",
        hostname: "app-backend.dichvutracuu.lab",
        port: 22,
        username: "svc_deploy",
        matKhau: "Lab_Ssh_Deploy_2026!",
        ghiChu: "Tài khoản CI/CD dùng để deploy ứng dụng cổng dịch vụ tra cứu.",
        userId: admin.id,
      },
      {
        loaiDichVu: "SSH",
        hostname: "db-internal.dichvutracuu.lab",
        port: 22,
        username: "svc_db_admin",
        matKhau: "Lab_Db_Admin_2026!",
        ghiChu: "Tài khoản quản trị PostgreSQL nội bộ — mục tiêu pivot.",
        userId: admin.id,
      },
    ],
  })

  console.log("Seeding finished.")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
