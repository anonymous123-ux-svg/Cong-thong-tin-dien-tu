"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Vui lòng nhập đầy đủ email và mật khẩu.")
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
        throw new Error("Email hoặc mật khẩu không chính xác.")
      }

      window.location.href = "/tra-cuu"
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi không xác định.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm text-rose-700">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Email / Tên đăng nhập
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="congdan@dichvutracuu.gov.vn"
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Mật khẩu
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-[#1567c8] py-2.5 font-semibold text-white transition hover:bg-[#0b4ea2] disabled:opacity-60"
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}
        Đăng nhập
      </button>

      <p className="text-center text-sm text-slate-600">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="font-semibold text-[#1567c8] hover:underline">
          Đăng ký
        </Link>
      </p>
    </form>
  )
}
