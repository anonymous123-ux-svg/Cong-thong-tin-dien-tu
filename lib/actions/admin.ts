"use server"

import { revalidatePath } from "next/cache"
import { PrismaClient, type Role } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

import { auth } from "@/auth"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

/**
 * Mọi action trong file này chỉ dành cho vai trò ADMIN — trang /admin không được
 * liên kết ở bất kỳ menu điều hướng nào (chỉ tìm thấy qua dò quét thư mục như
 * gobuster/ffuf), nhưng các Server Action vẫn tự kiểm tra quyền độc lập với
 * middleware, theo đúng nguyên tắc phòng thủ theo chiều sâu của lab này.
 */
async function requireAdmin() {
  const session = await auth()
  if (session?.user?.role !== "ADMIN") {
    throw new Error("Yêu cầu quyền quản trị viên.")
  }
  return session
}

export async function layDanhSachNguoiDung() {
  await requireAdmin()
  return prisma.user.findMany({
    orderBy: { email: "asc" },
    select: { id: true, email: true, hoTen: true, role: true },
  })
}

export async function capNhatVaiTroNguoiDung(userId: string, role: Role) {
  await requireAdmin()
  await prisma.user.update({ where: { id: userId }, data: { role } })
  revalidatePath("/admin/nguoi-dung")
}

export async function xoaNguoiDung(userId: string) {
  await requireAdmin()
  await prisma.user.delete({ where: { id: userId } })
  revalidatePath("/admin/nguoi-dung")
}

export async function layDanhSachPhanAnh() {
  await requireAdmin()
  return prisma.phanAnh.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { email: true } } },
  })
}

export async function xoaPhanAnh(id: string) {
  await requireAdmin()
  await prisma.phanAnh.delete({ where: { id } })
  revalidatePath("/admin/phan-anh")
}

export async function layDanhSachDichVuNoiBo() {
  await requireAdmin()
  return prisma.dichVuNoiBo.findMany({
    orderBy: { loaiDichVu: "asc" },
    include: { user: { select: { email: true, hoTen: true } } },
  })
}

export async function layThongKeTongQuan() {
  await requireAdmin()
  const [soNguoiDung, soPhanAnh, soDichVuNoiBo] = await Promise.all([
    prisma.user.count(),
    prisma.phanAnh.count(),
    prisma.dichVuNoiBo.count(),
  ])
  return { soNguoiDung, soPhanAnh, soDichVuNoiBo }
}
