import type { NextAuthConfig } from "next-auth"

/**
 * Edge-compatible auth config (no Node.js-only imports).
 * Used by middleware to validate sessions without importing pg/bcrypt.
 * Full provider config with DB logic lives in auth.ts.
 *
 * Routing model for the Cổng Dịch vụ công portal:
 *  - Public routes: "/", "/login", "/register", "/dich-vu-cong", "/phan-anh-kien-nghi"
 *  - Everything else (including the vulnerable "/tra-cuu" lookup and "/admin") requires login.
 *  - "/admin" additionally requires the ADMIN role — that finer-grained check is enforced
 *    in app/admin/layout.tsx (not here), so an authenticated non-admin gets a 403 instead of
 *    being bounced back to /login. Note "/admin" is intentionally NOT linked from any nav —
 *    it is only reachable if discovered (e.g. via directory fuzzing with gobuster/ffuf).
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublicRoute =
        nextUrl.pathname === "/" ||
        nextUrl.pathname === "/login" ||
        nextUrl.pathname === "/register" ||
        nextUrl.pathname === "/admin/login" ||
        nextUrl.pathname === "/dich-vu-cong" ||
        nextUrl.pathname === "/phan-anh-kien-nghi" ||
        // Thư mục backup bị lộ ("nhạy cảm") — cố ý cho truy cập ẩn danh để
        // học viên dò/tải file bằng ffuf/gobuster. Đây là lỗ hổng chủ đích.
        nextUrl.pathname.startsWith("/backup")

      // Already authenticated users skip the auth pages and go to lookup.
      if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
        if (isLoggedIn) {
          return Response.redirect(new URL("/tra-cuu", nextUrl))
        }
        return true
      }

      if (isPublicRoute) return true

      // Khu vực quản trị: khách chưa đăng nhập → về trang đăng nhập quản trị
      // riêng (/admin/login), không dùng trang đăng nhập công dân. Kiểm tra
      // vai trò ADMIN được thực thi trong app/admin/(dashboard)/layout.tsx.
      if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) return Response.redirect(new URL("/admin/login", nextUrl))
        return true
      }

      // Protected routes (e.g. /tra-cuu) — citizens must be logged in.
      if (!isLoggedIn) return false

      return true
    },
    jwt({ token, user }) {
      if (user) {
        // @ts-expect-error role exists on our custom user object
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        session.user.id = token.sub || (token.id as string)
      }
      return session
    },
  },
  providers: [], // Providers added in auth.ts with full DB config
} satisfies NextAuthConfig
