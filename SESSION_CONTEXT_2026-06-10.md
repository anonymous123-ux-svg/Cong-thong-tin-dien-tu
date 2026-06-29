# E-Learning UI — Session Context Snapshot
**Date:** 2026-06-10  
**Project:** `/home/tcus/Desktop/RedT/Project/e-learning-ui`  
**Corpus:** `quoclam2111/e-learning-ui`

---

## 1. Project Overview

An e-learning platform ("The Academic Curator") built as a **Security Training Lab** — a realistic web app with **intentionally planted vulnerabilities** for pentesting/red-teaming exercises.

### Tech Stack

| Component | Version / Detail |
|---|---|
| Framework | **Next.js 16.2.4** (Turbopack) |
| Runtime | Node.js 24.15.0 |
| ORM | **Prisma 7.8.0** with `@prisma/adapter-pg` + `pg` Pool |
| Auth | **next-auth 5.0.0-beta.31** (Credentials provider) |
| Password Hashing | **bcryptjs 3.0.3** |
| Styling | **Tailwind CSS** + `clsx` + `tailwind-merge` |
| Database | **PostgreSQL** (local, `postgresql://postgres:postgres@localhost:5432/elearning`) |

### Critical Architecture Notes

- **PrismaClient initialization** in this project **requires** the `PrismaPg` adapter pattern:
  ```ts
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });
  ```
  Using `new PrismaClient()` without the adapter **will fail**.

- **Middleware** (`middleware.ts`) uses an **Edge-compatible** auth config from `auth.config.ts`. It does **NOT** import `pg` or `bcrypt` (those are Node.js-only). Full provider config lives in `auth.ts`.

- The **`"use server"` directive** in Next.js 16 Server Actions catches thrown errors and strips their messages for security. To pass error details to the client, **return `{ error: string }` objects** instead of `throw new Error()`.

- **`bcryptjs` dynamic import**: In Server Actions, use `const bcrypt = await import("bcryptjs")` instead of top-level `import bcrypt from "bcryptjs"` to avoid edge-runtime issues.

---

## 2. Database Schema (Prisma)

File: [schema.prisma](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/prisma/schema.prisma)

```prisma
enum Role { STUDENT, LECTURER, ADMIN }

model User {
  id           String @id @default(cuid())
  email        String @unique
  passwordHash String
  role         Role
}

model Course {
  id, title, description, instructorId
}

model Assignment {
  id, title, courseId, dueDate, metadata (Json?)
}

model Enrollment {
  id, studentId, courseId, enrolledAt
}

model Submission {
  id, assignmentId, studentId, fileUrl, submittedAt, grade (Float?), metadata (Json?)
}
```

> [!IMPORTANT]
> The `User` model has **NO** `fullName` field. Registration collects fullName in the UI for realism but does not persist it.

---

## 3. Authentication & Middleware

### [auth.config.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/auth.config.ts) — Edge-compatible config

- **Public routes**: `/login`, `/`, `/register`
- Unauthenticated users on protected routes → redirected to `/login`
- Role-based routing after login:
  - `STUDENT` → `/student/dashboard`
  - `LECTURER` → `/lecturer/dashboard`
  - `ADMIN` → `/admin/dashboard`
- Role isolation: Students blocked from `/admin/*` and `/lecturer/*`, etc.
- JWT callback injects `role` and `id` into token
- Session callback exposes `role` and `id` on `session.user`

### [auth.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/auth.ts) — Full auth with DB

- Credentials provider with Prisma `findUnique` + `bcrypt.compare`
- Returns `{ id, email, role }` on successful auth

### [middleware.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/middleware.ts)

- Matcher: all routes except static assets and API
- Deprecated `middleware` convention warning (Next.js 16 prefers `proxy`)

---

## 4. Intentional Vulnerabilities (Security Lab)

> [!CAUTION]
> These vulnerabilities are **BY DESIGN** for the pentesting lab. **DO NOT FIX** them.

### 4.1 IDOR — [user.ts:18-31](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/user.ts#L18-L31)

`updateUserProfile(userId, updateData)` trusts the client-provided `userId` instead of enforcing `session.user.id`. Any authenticated user can update any other user's profile.

### 4.2 Mass Assignment via Prototype Pollution — [user.ts:37-49](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/user.ts#L37-L49)

Uses `deepMerge()` from [unsafeMerge.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/utils/unsafeMerge.ts) which **intentionally lacks `__proto__` / `constructor` sanitization**. An attacker can send `{ "role": "LECTURER" }` to escalate privileges. `ADMIN` escalation is explicitly blocked (reset to original role).

### 4.3 Prototype Pollution → RCE Path — [unsafeMerge.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/utils/unsafeMerge.ts)

The `deepMerge` function has no key filtering — `__proto__`, `constructor`, `prototype` all pass through, enabling Prototype Pollution attacks.

---

## 5. Completed Work Phases

### Phase 1-3: Admin Module Upgrade
- Replaced hardcoded mock data in Admin Dashboard (`/admin/dashboard`) with real Prisma queries
- Replaced hardcoded mock data in Admin Users (`/admin/users`) with real Prisma queries
- Navigation cleanup in `Sidebar.tsx` and `Topbar.tsx`

### Phase 4: Flexible Metadata & Assignment System
- Added `metadata Json?` field to Assignment and Submission models
- Implemented `deepMerge` (intentionally vulnerable) for recursive metadata merging
- Assignment Server Actions in [assignment.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/assignment.ts)

### Phase 5: Password Management
- Implemented [changePassword](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/user.ts#L64-L91) in `user.ts`
  - Validates current password with bcrypt
  - Hashes new password before storing
  - Authorization: user can only change own password (or ADMIN can change any)
- Updated [ProfileSettings.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/dashboard/ProfileSettings.tsx) with password change form
  - Accepts `user` as prop (no `useSession` inside — avoids static rendering issues)
  - Auto-logout via `signOut()` after successful password change
- Settings pages pass session data as props:
  - [/admin/settings/page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/admin/settings/page.tsx)
  - [/lecturer/settings/page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/lecturer/settings/page.tsx)

### Phase 5.5: Real-World Registration
- Created [register.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/register.ts) — **isolated** from `user.ts` to preserve vulnerabilities
  - Email duplicate check via `prisma.user.findUnique`
  - Password hashing with `bcryptjs` (dynamic import)
  - **Hardcoded `role: "STUDENT"`** — ignores any client-supplied role
  - Returns `{ success: true }` or `{ error: string }` (no `throw`)
- Updated [RegisterForm.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/auth/register/RegisterForm.tsx)
  - State management for email, password, confirmPassword, fullName
  - Client-side confirm-password validation
  - Toast feedback for success/error
  - Auto-redirect to `/login` after 1.5s on success
  - `RoleSelector` component is cosmetic only (value ignored by backend)
- **Fixed** `/register` blocked by middleware — added to `isPublicRoute` in `auth.config.ts`

### Misc Fixes (Today)
- Fixed React warning in [lecturer/exams/edit/page.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/app/lecturer/exams/edit/page.tsx): replaced `<option selected>` with `<select defaultValue="Medium">`
- Cleaned up test files: `test-register.ts`, `test-register-env.ts`, `test-user-env.ts`, `test-bcrypt-import.ts` (in project root — can be deleted)

---

## 6. Server Actions Inventory

| File | Functions | Status |
|---|---|---|
| [register.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/register.ts) | `registerAccount` | ✅ Secure, isolated |
| [user.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/user.ts) | `updateUserProfile`, `changePassword` | ⚠️ updateUserProfile is intentionally vulnerable |
| [assignment.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/assignment.ts) | Assignment CRUD + metadata merge | ⚠️ Uses unsafeMerge |
| [auth.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/auth.ts) | Auth-related actions | ✅ |
| [student.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/student.ts) | Student-specific actions | ✅ |
| [lecturer.ts](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/lib/actions/lecturer.ts) | Lecturer-specific actions | ✅ |

---

## 7. Key Component Map

| Component | Path | Notes |
|---|---|---|
| ProfileSettings | [ProfileSettings.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/dashboard/ProfileSettings.tsx) | Shared by admin & lecturer settings pages. Accepts `user` prop. |
| RegisterForm | [RegisterForm.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/auth/register/RegisterForm.tsx) | Client component with real server action integration |
| LoginForm | [LoginForm.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/auth/login/LoginForm.tsx) | Uses `signIn("credentials")`, redirects to `/admin/dashboard` on success |
| RoleSelector | [RoleSelector.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/auth/register/RoleSelector.tsx) | Cosmetic only — backend ignores its value |
| PasswordStrength | [PasswordStrength.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/auth/register/PasswordStrength.tsx) | Static UI indicator (not wired to actual strength calc) |
| Button | [Button.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/ui/Button.tsx) | Shared button with `loading` spinner state |
| Input | [Input.tsx](file:///home/tcus/Desktop/RedT/Project/e-learning-ui/components/ui/Input.tsx) | Shared input with `label` prop |
| Toast | `components/ui/Toast.tsx` | Shared toast notification |

---

## 8. Route Structure (80 pages)

### Auth Routes (public)
- `/login` → `app/(auth)/login/page.tsx`
- `/register` → `app/(auth)/register/page.tsx`
- `/forgot-password`, `/reset-password`, `/verify-otp`

### Admin Routes (role: ADMIN)
- `/admin/dashboard` — Real Prisma data (user count, course count, etc.)
- `/admin/users` — Real user table from DB
- `/admin/settings` — ProfileSettings with password change
- `/admin/courses/*` — Course management (nested dynamic routes)
- `/admin/tasks/*` — Task management (board, list, deadlines, analytics)
- `/admin/analytics`, `/admin/class-management`, `/admin/class-dashboard`

### Lecturer Routes (role: LECTURER)
- `/lecturer/dashboard`, `/lecturer/courses`, `/lecturer/assignments`
- `/lecturer/exams/*` — Create, Edit, Delete, Library
- `/lecturer/settings` — ProfileSettings with password change
- `/lecturer/analytics`, `/lecturer/tasks`

### Student Routes (role: STUDENT)
- `/student/dashboard`, `/student/courses`, `/student/assignments/*`
- `/student/settings`, `/student/analytics`, `/student/messages`
- `/student/ai-insights`

### Other
- `/class/*` — Class management module
- `/ai-insights/classes/[classId]`, `/analytics/classes/[classId]`
- `/members/classes/[classId]/members/[memberId]/edit`

---

## 9. Environment Variables

File: `.env`

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/elearning"
AUTH_SECRET="k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH"

# Internal Infrastructure (Post-Exploitation Target)
DB_INTERNAL_HOST=172.20.0.5
DB_USER=readonly_auditor
DB_PASS=Learning@2026!
```

> [!NOTE]
> The `DB_INTERNAL_*` variables are intentional red herring / post-exploitation targets for the security lab scenario.

---

## 10. Known Issues & Tech Debt

| Issue | Status | Notes |
|---|---|---|
| `PasswordStrength` component is static (always shows "Strong") | 🔴 Not wired | Needs real strength calculation based on password input |
| `LoginForm` always redirects to `/admin/dashboard` regardless of role | 🟡 Minor | Middleware handles correct redirection after, but initial redirect is wrong |
| Deprecated `middleware` convention warning | 🟡 Info | Next.js 16 prefers `proxy` — cosmetic warning only |
| Test files in project root | 🟡 Cleanup | `test-register.ts`, `test-register-env.ts`, `test-user-env.ts`, `test-bcrypt-import.ts` — safe to delete |
| `app/api/test-register/route.ts` | 🟡 Cleanup | Test API route created during debugging — should be removed |
| `fullName` collected but not stored | 🟡 Schema gap | Prisma `User` model has no `fullName` field |
| `RoleSelector` value ignored but shown | ✅ By design | Part of the security lab (demonstrates client-side trust issues) |

---

## 11. Build Status

```
✓ npm run build — PASS (as of 2026-06-10)
✓ Compiled successfully in 11.2s
✓ TypeScript check passed in 9.4s
✓ 60/60 pages generated
```

---

## 12. Strict Rules for Future Sessions

1. **NEVER modify `lib/actions/user.ts`** (especially `updateUserProfile`) — the IDOR and Mass Assignment vulnerabilities are intentional lab scenarios.
2. **NEVER modify `lib/utils/unsafeMerge.ts`** — the Prototype Pollution vulnerability is intentional.
3. **Always use the `PrismaPg` adapter pattern** when initializing PrismaClient.
4. **Always hash passwords with bcryptjs** before storing.
5. **Always enforce `role: "STUDENT"` server-side** for new registrations — never trust client input for role.
6. **Return error objects** from Server Actions instead of throwing errors (Next.js 16 strips thrown error messages).
7. **Use dynamic `import("bcryptjs")`** inside Server Actions instead of top-level imports.
8. **Read `node_modules/next/dist/docs/`** before using any Next.js API — version 16 has breaking changes from training data.
