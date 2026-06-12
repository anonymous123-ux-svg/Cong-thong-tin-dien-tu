"use server"

import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export async function deleteUser(id: string) {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized: Authentication required.");
  }
  
  const userRole = (session.user as any)?.role;
  if (userRole !== "ADMIN") {
    throw new Error("Forbidden: Only admins can delete users.");
  }

  // Prevent admin from deleting themselves
  if (session.user.id === id) {
    throw new Error("Cannot delete your own admin account.");
  }

  await prisma.user.delete({
    where: { id }
  });

  revalidatePath('/admin/users');
  return { success: true };
}
