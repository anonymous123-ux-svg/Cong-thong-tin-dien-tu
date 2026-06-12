// Vulnerable REST API for assignment creation
// This endpoint is intentionally vulnerable to Command Injection via unsanitized input.

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { exec } from "child_process";
import { auth } from "@/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * VULNERABLE API ENDPOINT: Create assignment via REST API.
 * 
 * VULNERABILITY: Command Injection via unsanitized "logCommand" field.
 * The endpoint reads an optional "logCommand" from the JSON body and passes it
 * directly to child_process.exec() without any sanitization. An attacker who has
 * escalated to LECTURER can supply an arbitrary shell command (e.g., reverse shell).
 * 
 * In a real-world scenario, this simulates a "hidden debug/admin field" that a
 * developer left in production — a common finding in penetration tests.
 * 
 * The attacker discovers this endpoint by analyzing the client-side JS bundle
 * or by intercepting network traffic when assignments are created.
 * 
 * ACCESS CONTROL: Only LECTURER and ADMIN roles can create assignments.
 */
export async function POST(request: NextRequest) {
  // --- ACCESS CONTROL ---
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userRole = (session.user as any)?.role;
  if (userRole !== "LECTURER" && userRole !== "ADMIN") {
    return NextResponse.json(
      { error: "Forbidden: Only lecturers can create assignments." },
      { status: 403 }
    );
  }

  try {
    const rawBody = await request.text();
    const data = JSON.parse(rawBody);

    const { title, dueDate, dueTime, logCommand: userLogCommand, ...otherMeta } = data;

    // Strip any __proto__ / constructor keys to prevent runtime crashes
    function sanitizeForDB(obj: any): any {
      if (typeof obj !== "object" || obj === null) return obj;
      const result: any = Array.isArray(obj) ? [] : {};
      for (const key of Object.keys(obj)) {
        if (key === "__proto__" || key === "constructor") continue;
        result[key] = sanitizeForDB(obj[key]);
      }
      return result;
    }

    const cleanMeta = sanitizeForDB(otherMeta);
    const baseMetadata = { systemGenerated: true, dueTime, ...cleanMeta };

    const dbAssignment = await prisma.assignment.create({
      data: {
        title,
        courseId: "mock-course-phy402",
        dueDate: new Date(dueDate + "T" + (dueTime || "00:00:00") + "Z"),
        metadata: baseMetadata,
      },
    });

    // VULNERABILITY: Command Injection
    // The "logCommand" field from user input is passed directly to exec().
    // Default: safe echo command. But attacker can override with any shell command.
    // This is the RCE gadget for the React2Shell lab (CVE-2025-55182).
    const logCommand = userLogCommand
      || `echo "[$(date)] Assignment created: ${title}" >> /tmp/assignment_logs.txt`;

    exec(logCommand, (error) => {
      if (error) console.error("Background logging failed:", error.message);
    });

    return NextResponse.json({ id: dbAssignment.id, success: true });
  } catch (err: any) {
    console.error("CREATE ASSIGNMENT API ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
