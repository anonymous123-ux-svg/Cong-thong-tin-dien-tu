"use server";

import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Ensures the user is authenticated as STUDENT and returns their ID.
 */
async function requireStudent() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  if (session.user.role !== "STUDENT") {
    throw new Error("Forbidden: Not a student");
  }
  return session.user.id;
}

/**
 * Gets courses the student is enrolled in.
 * Auto-enrolls in mock courses if the student has no enrollments for demo purposes.
 */
export async function getStudentCourses() {
  const studentId = await requireStudent();

  let enrollments = await prisma.enrollment.findMany({
    where: { studentId },
  });

  // Demo auto-enrollment if none exist
  if (enrollments.length === 0) {
    const courses = await prisma.course.findMany({ take: 2 });
    for (const course of courses) {
      await prisma.enrollment.create({
        data: {
          studentId,
          courseId: course.id,
        },
      });
    }
    enrollments = await prisma.enrollment.findMany({
      where: { studentId },
    });
  }

  // Fetch actual course details
  const courseIds = enrollments.map((e) => e.courseId);
  const enrolledCourses = await prisma.course.findMany({
    where: {
      id: { in: courseIds },
    },
  });

  return enrolledCourses;
}

/**
 * Gets assignments for a specific course, including the student's latest submission status if any.
 */
export async function getStudentAssignments(courseId?: string) {
  const studentId = await requireStudent();

  // If courseId is not provided, fetch assignments for all enrolled courses
  let courseIds = [courseId].filter(Boolean) as string[];
  if (courseIds.length === 0) {
    const enrollments = await prisma.enrollment.findMany({ where: { studentId } });
    courseIds = enrollments.map(e => e.courseId);
  }

  const assignments = await prisma.assignment.findMany({
    where: {
      courseId: { in: courseIds }
    },
    orderBy: { dueDate: 'desc' }
  });

  return assignments;
}

/**
 * Gets assignment details and the user's submission history.
 */
export async function getAssignmentDetails(assignmentId: string) {
  const studentId = await requireStudent();

  const assignment = await prisma.assignment.findUnique({
    where: { id: assignmentId }
  });

  if (!assignment) throw new Error("Assignment not found");

  const submissions = await prisma.submission.findMany({
    where: {
      assignmentId,
      studentId
    },
    orderBy: { submittedAt: 'desc' }
  });

  return { assignment, submissions };
}

/**
 * Submits an assignment.
 */
export async function submitAssignment(assignmentId: string, fileUrl: string) {
  const studentId = await requireStudent();

  await prisma.submission.create({
    data: {
      assignmentId,
      studentId,
      fileUrl,
    }
  });

  revalidatePath(`/student/assignments/${assignmentId}`);
  return { success: true };
}
