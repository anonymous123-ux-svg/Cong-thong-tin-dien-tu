import type { NextAuthConfig } from "next-auth"

/**
 * Edge-compatible auth config (no Node.js-only imports).
 * Used by middleware to validate sessions without importing pg/bcrypt.
 * Full provider config with DB logic lives in auth.ts.
 *
 * Routing model for the Cổng Dịch vụ công portal:
 *  - Public routes: "/", "/login", "/register"
 *  - Everything else (including the vulnerable "/tra-cuu" lookup) requires login.
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
        nextUrl.pathname === "/register"

      // Already authenticated users skip the auth pages and go to lookup.
      if (nextUrl.pathname === "/login" || nextUrl.pathname === "/register") {
        if (isLoggedIn) {
          return Response.redirect(new URL("/tra-cuu", nextUrl))
        }
        return true
      }

      if (isPublicRoute) return true

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
