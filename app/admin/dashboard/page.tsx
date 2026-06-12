import StatsCards from "../components/StatsCards"
import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { connection } from "next/server"

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

export default async function AdminDashboard() {
  await connection();
  const [userCount, courseCount, submissionCount] = await Promise.all([
    prisma.user.count(),
    prisma.course.count(),
    prisma.submission.count(),
  ])

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
          Dashboard
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl">
          Overview of your academic platform.
        </p>
      </div>

      <StatsCards 
        userCount={userCount} 
        courseCount={courseCount} 
        submissionCount={submissionCount} 
      />
    </div>
  )
}