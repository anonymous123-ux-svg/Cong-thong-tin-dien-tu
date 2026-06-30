"use server";

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export async function registerAccount(formData: FormData) {
  try {
    const email = formData.get("email")?.toString().trim();
    const password = formData.get("password")?.toString();
    const hoTen = formData.get("hoTen")?.toString().trim() || null;

    if (!email || !password) {
      return { error: "Vui lòng điền đầy đủ email và mật khẩu." };
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email đã được sử dụng. Vui lòng chọn email khác." };
    }

    // Băm mật khẩu
    const bcrypt = await import("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Tạo tài khoản, BẮT BUỘC vai trò CONG_DAN (công dân)
    await prisma.user.create({
      data: {
        email,
        hoTen,
        passwordHash,
        role: "CONG_DAN", // ENFORCED ROLE
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return { error: err.message || "Đã xảy ra lỗi hệ thống." };
  }
}
