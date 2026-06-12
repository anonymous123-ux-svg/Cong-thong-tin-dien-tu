"use server";

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { deepMerge } from "@/lib/utils/unsafeMerge";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * VULNERABLE ACTION: Update user profile.
 * This action is intentionally vulnerable to IDOR and Mass Assignment.
 */
export async function updateUserProfile(userId: string, updateData: any) {
  const session = await auth();
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  // VULNERABILITY 1: IDOR
  // Logic flaw: We trust the 'userId' provided by the client instead of using session.user.id.
  // There is NO check to ensure the logged-in user is allowed to update this specific userId.
  
  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  // VULNERABILITY 2: Mass Assignment via unsafeMerge
  // Logic flaw: We merge the updateData directly into the user object.
  // Since deepMerge doesn't filter keys, an attacker can pass { "role": "LECTURER" } 
  // to escalate their privileges.
  
  const updatedUser = deepMerge({ ...existingUser }, updateData);

  // Intentional logic flaw: We still allow 'role' to be updated to LECTURER.
  // BUT: We explicitly block ADMIN to keep the lab focused on the intended RCE path.
  let targetRole = updatedUser.role;
  if (targetRole === "ADMIN") {
    targetRole = existingUser.role; // Reset back to original if they try to be ADMIN
  }

  // We only update the database fields that exist in the User model.
  await prisma.user.update({
    where: { id: userId },
    data: {
      email: updatedUser.email,
      role: targetRole, // Restricted escalation point
    },
  });

  revalidatePath("/");
  return { success: true };
}

export async function changePassword(userId: string, currentPass: string, newPass: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");
  
  // Ensure the user is only changing their own password (or they are ADMIN)
  if (session.user.id !== userId && session.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  const bcrypt = await import("bcryptjs");
  const isMatch = await bcrypt.compare(currentPass, user.passwordHash);
  if (!isMatch) {
    throw new Error("Mật khẩu hiện tại không chính xác.");
  }

  const salt = await bcrypt.genSalt(10);
  const newHash = await bcrypt.hash(newPass, salt);

  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash }
  });

  return { success: true };
}
