# 🎯 The Academic Curator — Vulnerable E-Learning Platform

> **⚠️ WARNING: This application is INTENTIONALLY VULNERABLE. It is designed for authorized security training, penetration testing labs, and CTF exercises ONLY. DO NOT deploy in production or on any public-facing network.**

---

## Overview

**The Academic Curator** is a full-featured e-learning platform built with a modern tech stack (Next.js 15.0.3 / React 19.0.0-rc / Node.js). It has been deliberately configured to be vulnerable to one of the most critical vulnerabilities in the React ecosystem: **React2Shell (CVE-2025-55182)**.

This lab is designed to train students and Red Teams in:
- Web application penetration testing methodology
- Understanding Server-Side Components and the React Flight Protocol
- Exploiting Insecure Deserialization in Next.js Server Actions
- Payload crafting for React2Shell (CVE-2025-55182)

## 🔴 The Vulnerability: React2Shell (CVE-2025-55182)

This application uses **Next.js 15.0.3** and **React 19.0.0-rc**, versions that are specifically vulnerable to an insecure deserialization flaw in how the React Flight protocol handles incoming Server Action requests (`decodeReply`).

### Attack Vectors

There are two primary ways to exploit this vulnerability in this lab:

**1. Unauthenticated RCE on Public Routes (e.g., `/`)**
If a Server Action is exposed on a public route, an attacker can extract the `Action ID` from the HTML source and send a malicious multipart/form-data payload directly to that route. The payload leverages Prototype Pollution (`__proto__:then`) to trick the JavaScript runtime into executing arbitrary commands via `child_process.execSync`.

**2. Authenticated RCE on Protected Routes (e.g., `/lecturer/assignments`)**
If the target Server Action is on a route protected by middleware (like our Lecturer dashboard), the attacker must first obtain a valid session cookie. 
- The attacker logs in as a Lecturer.
- They extract their `authjs.session-token`.
- They construct the React2Shell payload, ensuring the `Next-Action` header matches the ID of the `createAssignment` action.
- They send the request to `POST /lecturer/assignments` **including the session cookie**.
- The middleware validates the cookie and passes the request to Next.js.
- The insecure deserialization triggers **before** the actual `createAssignment` logic runs, resulting in RCE.

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | **15.0.3 (Vulnerable)** |
| UI Library | React | **19.0.0-rc (Vulnerable)** |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS | 4.x |
| Database | PostgreSQL via Prisma | 7.8.0 |
| Auth | NextAuth (Credentials) | v5 beta |

## Architecture

```text
app/
  (auth)/
    login/           → Login page
  admin/
    dashboard/       → Admin dashboard
  lecturer/
    assignments/     → 🔴 VULNERABLE ROUTE (Requires Lecturer auth)
                       Contains the Server Action that acts as the entry point for React2Shell.
  student/
    dashboard/       → Student portal

lib/
  actions/
    assignment.ts    → Contains `use server` actions. Next.js compiles these and assigns them Action IDs, making the application vulnerable to CVE-2025-55182.
```

## Default Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@elearning.com` | `password123` |
| Lecturer | `lecturer@elearning.com` | `password123` |
| Student | `student@elearning.com` | `password123` |

## Quick Start

### Prerequisites
- Node.js 20+
- Docker (for PostgreSQL)
- Burp Suite (for exploitation)

### Setup

```bash
# 1. Clone the repository
git clone <repo-url> && cd e-learning-ui

# 2. Install dependencies (You might see warnings due to the vulnerable React version - this is expected)
npm install

# 3. Start PostgreSQL (via docker-compose)
docker compose up -d

# 4. Configure environment
cp .env.example .env

# 5. Push schema & seed database
npx prisma db push
npx prisma db seed

# 6. Start dev server
npm run dev
```

Open: `http://localhost:3000`

## ⚠️ Disclaimer

This application is provided for **educational and authorized security testing purposes only**. Unauthorized access to computer systems is illegal. The authors are not responsible for any misuse of this software. Always obtain proper written authorization before conducting penetration tests.

## License

MIT — For educational use only.
