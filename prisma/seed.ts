import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/dichvucong",
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.hoSo.deleteMany({})
  await prisma.user.deleteMany({})

  const passwordHash = await bcrypt.hash("password123", 10)

  // Tài khoản cán bộ quản trị
  await prisma.user.create({
    data: {
      email: "canbo@dichvucong.gov.vn",
      hoTen: "Nguyễn Văn Cán Bộ",
      passwordHash,
      role: "CAN_BO",
    },
  })

  // Tài khoản công dân mẫu (dùng để đăng nhập và tra cứu)
  const congDan = await prisma.user.create({
    data: {
      email: "congdan@dichvucong.gov.vn",
      hoTen: "Trần Thị Công Dân",
      passwordHash,
      role: "CONG_DAN",
    },
  })

  // Hồ sơ dịch vụ công mẫu
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
