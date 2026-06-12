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

    if (!email || !password) {
      return { error: "Vui lòng điền đầy đủ email và mật khẩu." };
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { error: "Email đã được sử dụng. Vui lòng chọn email khác." };
    }

    // Hash password
    const bcrypt = await import("bcryptjs");
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user and ENFORCE STUDENT role
    await prisma.user.create({
      data: {
        email,
        passwordHash,
        role: "STUDENT", // ENFORCED ROLE
      },
    });

    return { success: true };
  } catch (err: any) {
    console.error("REGISTER ERROR:", err);
    return { error: err.message || "Đã xảy ra lỗi hệ thống." };
  }
}
