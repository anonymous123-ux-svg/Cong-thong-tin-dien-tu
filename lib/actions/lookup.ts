"use server"

import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"

import { auth } from "@/auth"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export type HoSoKetQua = {
  maHoSo: string
  thuTuc: string
  coQuan: string
  linhVuc: string
  nguoiNop: string
  tinhTrang: string
  ngayTiepNhan: string
  ngayHenTra: string
}

export type TraCuuState = {
  ok: boolean
  message?: string
  results: HoSoKetQua[]
}

/**
 * Tra cứu hồ sơ dịch vụ công theo mã hồ sơ.
 *
 * ============================================================================
 *  VULNERABLE SERVER ACTION — CVE-2025-55182 (React2Shell)
 * ============================================================================
 * This is a Next.js Server Action exposed on the authenticated "/tra-cuu"
 * route. Because the app runs Next.js 15.0.3 / React 19.0.0-rc, the React
 * Flight protocol deserializer (`decodeReply`) used to parse incoming Server
 * Action payloads is vulnerable to unsafe deserialization.
 *
 * The vulnerability is FRAMEWORK-LEVEL: it triggers while Next.js deserializes
 * the multipart/form-data request body — BEFORE any code in this function runs.
 * An attacker who holds a valid session cookie (i.e. AFTER logging in) can send
 * a crafted multipart payload to `POST /tra-cuu` with this action's
 * `Next-Action` ID and achieve Remote Code Execution.
 *
 * The auth() guard below and the middleware on /tra-cuu mean the exploit is
 * only reachable once authenticated — see Lab_Walkthrough.md.
 * ============================================================================
 */
export async function traCuuHoSo(
  _prevState: TraCuuState | null,
  formData: FormData
): Promise<TraCuuState> {
  // ACCESS CONTROL: chỉ công dân đã đăng nhập mới được tra cứu.
  const session = await auth()
  if (!session?.user) {
    return {
      ok: false,
      message: "Bạn cần đăng nhập để sử dụng chức năng tra cứu hồ sơ.",
      results: [],
    }
  }

  const maHoSo = formData.get("maHoSo")?.toString().trim()

  if (!maHoSo) {
    return {
      ok: false,
      message: "Vui lòng nhập mã hồ sơ cần tra cứu.",
      results: [],
    }
  }

  const records = await prisma.hoSo.findMany({
    where: {
      maHoSo: { contains: maHoSo, mode: "insensitive" },
    },
    orderBy: { ngayTiepNhan: "desc" },
    take: 20,
  })

  if (records.length === 0) {
    return {
      ok: true,
      message: `Không tìm thấy hồ sơ nào khớp với mã “${maHoSo}”.`,
      results: [],
    }
  }

  return {
    ok: true,
    results: records.map((r) => ({
      maHoSo: r.maHoSo,
      thuTuc: r.thuTuc,
      coQuan: r.coQuan,
      linhVuc: r.linhVuc,
      nguoiNop: r.nguoiNop,
      tinhTrang: r.tinhTrang,
      ngayTiepNhan: r.ngayTiepNhan.toISOString().split("T")[0],
      ngayHenTra: r.ngayHenTra.toISOString().split("T")[0],
    })),
  }
}
