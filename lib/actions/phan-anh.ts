"use server"

import { mkdir, writeFile } from "fs/promises"
import path from "path"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

import { auth } from "@/auth"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "phan-anh")

export type PhanAnhState = {
  ok: boolean
  message?: string
}

/**
 * Gửi phản ánh, kiến nghị của người dân/doanh nghiệp (mục "Phản ánh kiến nghị").
 *
 * ============================================================================
 *  VULNERABLE — Unrestricted File Upload (CWE-434)
 * ============================================================================
 * Tệp đính kèm được lưu trực tiếp vào `public/uploads/phan-anh/` mà KHÔNG kiểm
 * tra phần mở rộng hay MIME type — người dùng có thể đính kèm bất kỳ định dạng
 * tệp nào. Vì thư mục nằm trong `public/`, tệp tải lên có thể được truy cập
 * trực tiếp qua URL `/uploads/phan-anh/<tên-tệp>` ngay sau khi gửi.
 * ============================================================================
 */
export async function guiPhanAnh(
  _prevState: PhanAnhState | null,
  formData: FormData
): Promise<PhanAnhState> {
  const tieuDe = formData.get("tieuDe")?.toString().trim()
  const noiDung = formData.get("noiDung")?.toString().trim()
  const hoTen = formData.get("hoTen")?.toString().trim() || null
  const email = formData.get("email")?.toString().trim() || null
  const file = formData.get("tepDinhKem") as File | null

  if (!tieuDe || !noiDung) {
    return {
      ok: false,
      message: "Vui lòng nhập đầy đủ tiêu đề và nội dung phản ánh.",
    }
  }

  const session = await auth()

  let tenTepDinhKem: string | null = null
  let duongDanTep: string | null = null

  if (file && file.size > 0) {
    await mkdir(UPLOAD_DIR, { recursive: true })
    const originalName = file.name.replace(/[/\\]/g, "_")
    const storedName = `${Date.now()}-${originalName}`
    const buffer = Buffer.from(await file.arrayBuffer())
    await writeFile(path.join(UPLOAD_DIR, storedName), buffer)
    tenTepDinhKem = originalName
    duongDanTep = `/uploads/phan-anh/${storedName}`
  }

  await prisma.phanAnh.create({
    data: {
      tieuDe,
      noiDung,
      hoTen,
      email,
      tenTepDinhKem,
      duongDanTep,
      userId: session?.user?.id ?? null,
    },
  })

  return {
    ok: true,
    message: "Đã ghi nhận phản ánh, kiến nghị của bạn. Cảm ơn bạn đã đóng góp ý kiến.",
  }
}
