import { PrismaClient } from "@prisma/client"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const pool = new Pool({ connectionString: process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/elearning" })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.user.deleteMany({})
  await prisma.assignment.deleteMany({})
  await prisma.course.deleteMany({})

  const passwordHash = await bcrypt.hash("password123", 10)

  // Seed default users
  await prisma.user.create({
    data: {
      email: "admin@elearning.com",
      passwordHash,
      role: "ADMIN"
    }
  })

  await prisma.user.create({
    data: {
      email: "lecturer@elearning.com",
      passwordHash,
      role: "LECTURER"
    }
  })

  await prisma.user.create({
    data: {
      email: "student@elearning.com",
      passwordHash,
      role: "STUDENT"
    }
  })
  
  const course = await prisma.course.create({
    data: {
      id: "mock-course-phy402",
      title: "Advanced Physics PHY-402",
      description: "Advanced Physics module",
      instructorId: "inst-1"
    }
  })

  const seed = [
    {
      id: "a1",
      title: "Quantum Entanglement Lab",
      courseId: course.id,
      dueDate: new Date("2023-10-24T23:59:00Z"),
      metadata: {
        module: "Module 04: Non-locality",
        type: "Lab",
        dueTime: "23:59",
        submissionsDone: 84,
        submissionsTotal: 128,
        status: "Published"
      }
    },
    {
      id: "a2",
      title: "Bell's Inequality Derivation",
      courseId: course.id,
      dueDate: new Date("2023-10-28T23:59:00Z"),
      metadata: {
        module: "Module 03: Foundations",
        type: "Homework",
        dueTime: "23:59",
        submissionsDone: 15,
        submissionsTotal: 128,
        status: "Published"
      }
    },
    {
      id: "a3",
      title: "Mid-Term Assessment Phase II",
      courseId: course.id,
      dueDate: new Date("2023-11-05T10:00:00Z"),
      metadata: {
        module: "General Proficiency",
        type: "Quiz",
        dueTime: "10:00",
        submissionsDone: 0,
        submissionsTotal: 128,
        status: "Draft"
      }
    }
  ]

  for (const s of seed) {
    await prisma.assignment.create({ data: s })
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
