"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"

export default function AdminLoginForm() {
  const params = useSearchParams()
  const forbidden = params.get("error") === "forbidden"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(
    forbidden
      ? "Tài khoản của bạn không có quyền quản trị (ADMIN)."
      : ""
  )

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.")
      return
    }

    try {
      setLoading(true)
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error("Tên đăng nhập hoặc mật khẩu không chính xác.")
      }

      // Chuyển vào khu vực quản trị. Nếu tài khoản không phải ADMIN,
      // layout /admin sẽ bật ngược lại đây kèm ?error=forbidden.
      window.location.href = "/admin"
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-rose-500/40 bg-rose-500/10 px-4 py-2.5 text-sm text-rose-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-300">
          Tên đăng nhập
        </label>
        <input
          type="text"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@dichvutracuu.gov.vn"
          className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300">
          Mật khẩu
        </label>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-md border border-slate-700 bg-slate-950/60 px-3 py-2.5 text-slate-100 placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-sky-600 py-2.5 font-semibold text-white transition hover:bg-sky-500 disabled:opacity-60"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        Đăng nhập quản trị
      </button>
    </form>
  )
}
