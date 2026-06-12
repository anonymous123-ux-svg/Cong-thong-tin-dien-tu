import type { NextAuthConfig } from "next-auth"

/**
 * Edge-compatible auth config (no Node.js-only imports).
 * Used by middleware to validate sessions without importing pg/bcrypt.
 * Full provider config with DB logic lives in auth.ts.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isPublicRoute = nextUrl.pathname === "/login" || nextUrl.pathname === "/" || nextUrl.pathname === "/register"
      const role = (auth?.user as { role?: string })?.role

      if (isPublicRoute) {
        if (isLoggedIn) {
          if (role === "STUDENT") return Response.redirect(new URL("/student/dashboard", nextUrl))
          if (role === "LECTURER") return Response.redirect(new URL("/lecturer/dashboard", nextUrl))
          return Response.redirect(new URL("/admin/dashboard", nextUrl))
        }
        return true
      }

      if (!isLoggedIn) return false

      if (role === "STUDENT") {
        if (nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/lecturer")) {
          return Response.redirect(new URL("/student/dashboard", nextUrl))
        }
      } else if (role === "LECTURER") {
        if (nextUrl.pathname.startsWith("/admin") || nextUrl.pathname.startsWith("/student")) {
          return Response.redirect(new URL("/lecturer/dashboard", nextUrl))
        }
      }

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
