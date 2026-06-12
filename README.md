# 🎯 The Academic Curator — Vulnerable E-Learning Platform

> **⚠️ WARNING: This application is INTENTIONALLY VULNERABLE. It is designed for authorized security training, penetration testing labs, and CTF exercises ONLY. DO NOT deploy in production or on any public-facing network.**

---

## Overview

**The Academic Curator** is a full-featured e-learning platform built with a modern tech stack (Next.js 16 / React 19 / Node.js 24). It has been deliberately implanted with a realistic multi-stage vulnerability chain that allows an attacker to escalate from an unauthenticated user to full Remote Code Execution (RCE) on the server.

This lab is designed to train students in:
- Web application penetration testing methodology
- Burp Suite interception and request manipulation
- Privilege escalation via Mass Assignment
- Command Injection exploitation
- Post-exploitation techniques (credential harvesting, pivoting, persistence)

## Kill Chain

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌───────────┐
│  Register   │───▶│ Mass Assignment  │───▶│ Command         │───▶│  Reverse  │
│  STUDENT    │    │ STUDENT→LECTURER │    │ Injection (RCE) │    │  Shell    │
└─────────────┘    └──────────────────┘    └─────────────────┘    └───────────┘
                                                                        │
                                                                        ▼
                                                                 ┌─────────────┐
                                                                 │  Pivot to   │
                                                                 │ Internal DB │
                                                                 └─────────────┘
```

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.2.4 |
| UI Library | React | 19.x |
| Language | TypeScript (strict) | 5.9 |
| Styling | Tailwind CSS | 4.x |
| Database | PostgreSQL via Prisma | 7.8.0 |
| Auth | NextAuth (Credentials) | v5 |
| ORM Adapter | `@prisma/adapter-pg` | Latest |
| Runtime | Node.js | 24.15.0 |

## Implanted Vulnerabilities

### 🔴 CVE-2025-55182 — React2Shell (Critical)

| Stage | Vulnerability | Location | Impact |
|-------|--------------|----------|--------|
| 1 | **IDOR** | `lib/actions/user.ts` | Modify any user's profile by manipulating `userId` parameter |
| 2 | **Mass Assignment** | `lib/actions/user.ts` | Escalate role from `STUDENT` → `LECTURER` via unsanitized `deepMerge()` |
| 3 | **Command Injection (RCE)** | `app/api/assignments/route.ts` | Execute arbitrary shell commands via unsanitized `logCommand` field passed to `exec()` |

### Supporting Vulnerable Components

| Component | File | Description |
|-----------|------|-------------|
| `deepMerge()` | `lib/utils/unsafeMerge.ts` | Recursive object merge with NO sanitization of `__proto__`, `constructor`, or `prototype` keys |
| Assignment API | `app/api/assignments/route.ts` | REST endpoint that extracts `logCommand` from JSON body and passes it directly to `child_process.exec()` |
| User Profile Action | `lib/actions/user.ts` | Server Action that allows role escalation to LECTURER (blocks ADMIN only) |

### Security Note: React 19 Built-in Protection

React 19's `decodeReply()` function (used by Server Actions) automatically strips `__proto__` keys from incoming data. This means **Prototype Pollution via Server Actions is NOT possible** on Next.js 16. The Command Injection vulnerability in this lab uses a separate REST API endpoint (`/api/assignments`) that bypasses this protection by using standard `JSON.parse`.

## Architecture

```
app/
  (auth)/
    login/           → Login page (NextAuth Credentials)
    register/        → Registration page (enforces STUDENT role)
  admin/
    dashboard/       → Admin dashboard
    users/           → User management (view/delete users by role)
  lecturer/
    dashboard/       → Lecturer workspace
    assignments/     → Assignment management (CRUD + RCE gadget)
  student/
    dashboard/       → Student portal
    settings/        → Profile settings (Mass Assignment entry point)
  api/
    assignments/     → 🔴 VULNERABLE REST API (Command Injection)
    test-register/   → Test endpoint for registration

components/
  ui/                → UI primitives (Button, Card, Input, Toast)
  dashboard/         → Dashboard layout components
  layout/            → Shell layouts (AdminShell, Topbar, Sidebar)
  auth/              → Auth form components

lib/
  actions/
    assignment.ts    → Server Action for assignments (protected by decodeReply)
    user.ts          → 🔴 VULNERABLE: Mass Assignment via deepMerge
    register.ts      → Registration Server Action
    admin.ts         → Admin user management (deleteUser)
  utils/
    unsafeMerge.ts   → 🔴 VULNERABLE: deepMerge without key sanitization

prisma/
  schema.prisma      → User, Course, Assignment models
  seed.ts            → Seeds admin/lecturer/student accounts
```

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@elearning.com` | `password123` |
| Lecturer | `lecturer@elearning.com` | `password123` |
| Student | `student@elearning.com` | `password123` |

## Quick Start

### Prerequisites
- Node.js 24+
- Docker (for PostgreSQL)
- Burp Suite (for exploitation)

### Setup

```bash
# 1. Clone the repository
git clone <repo-url> && cd e-learning-ui

# 2. Install dependencies
npm install

# 3. Start PostgreSQL
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=elearning \
  -p 5432:5432 postgres

# 4. Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and AUTH_SECRET

# 5. Push schema & seed database
npx prisma db push
npx prisma db seed

# 6. Start dev server
npm run dev
```

Open: `http://localhost:3000`

### Environment Variables

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/elearning"
AUTH_SECRET="k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH"

# Internal Infrastructure (Post-Exploitation Target)
DB_INTERNAL_HOST=172.20.0.5
DB_USER=readonly_auditor
DB_PASS=Learning@2026!
```

## Network Topology (Cyber Range)

```
┌───────────────────────────────────────────────┐
│              ATTACKER MACHINE                 │
│         (Kali / Parrot / Ubuntu)              │
│              192.168.95.132                   │
└────────────────────┬──────────────────────────┘
                     │
              ┌──────┴──────┐
              │   FIREWALL  │
              └──────┬──────┘
                     │
┌────────────────────┴──────────────────────────┐
│           PUBLIC SUBNET (10.10.1.0/24)        │
│  ┌──────────────────────────────────────┐     │
│  │  WEB SERVER (192.168.95.128:3000)    │     │
│  │  Next.js 16 / Node.js 24            │     │
│  │  PostgreSQL (localhost:5432)         │     │
│  └──────────────────┬───────────────────┘     │
│                     │                         │
└─────────────────────┼─────────────────────────┘
                      │ (Pivot Required)
┌─────────────────────┼─────────────────────────┐
│         INTERNAL SUBNET (172.20.0.0/24)       │
│  ┌──────────────────┴───────────────────┐     │
│  │  INTERNAL DB (172.20.0.5:5432)       │     │
│  │  PostgreSQL (readonly_auditor)       │     │
│  │  Contains: PII, Financial Records   │     │
│  └──────────────────────────────────────┘     │
└───────────────────────────────────────────────┘
```

## Build for Production

```bash
npx prisma generate
npm run build
npm start
```

## ⚠️ Disclaimer

This application is provided for **educational and authorized security testing purposes only**. Unauthorized access to computer systems is illegal. The authors are not responsible for any misuse of this software. Always obtain proper written authorization before conducting penetration tests.

## License

MIT — For educational use only.
