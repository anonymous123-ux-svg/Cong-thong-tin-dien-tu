"use client"

import { useState } from "react"
import Link from "next/link"
import { registerAccount } from "@/lib/actions/register"

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null)

  const [hoTen, setHoTen] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (password !== confirmPassword) {
      setMessage({ text: "Mật khẩu xác nhận không khớp.", type: "error" })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("hoTen", hoTen)
      formData.append("email", email)
      formData.append("password", password)

      const result = await registerAccount(formData)

      if (result?.error) {
        setMessage({ text: result.error, type: "error" })
        setLoading(false)
        return
      }

      setMessage({ text: "Đăng ký thành công! Đang chuyển đến trang đăng nhập...", type: "success" })
      setTimeout(() => {
        window.location.href = "/login"
      }, 1500)
    } catch (err: any) {
      setMessage({ text: err?.message || "Đã xảy ra lỗi đăng ký.", type: "error" })
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {message && (
        <div
          className={`rounded-md border px-4 py-2.5 text-sm ${
            message.type === "error"
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : "border-emerald-200 bg-emerald-50 text-emerald-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-slate-700">Họ và tên</label>
        <input
          type="text"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Email <span className="text-rose-500">*</span>
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Mật khẩu <span className="text-rose-500">*</span>
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="mt-1.5 w-full rounded-md border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-[#1567c8] focus:ring-2 focus:ring-[#1567c8]/30"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700">
          Xác nhận mật khẩu <span className="text-rose-500">*</span>
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        Đăng ký tài khoản
      </button>

      <p className="text-center text-sm text-slate-600">
        Đã có tài khoản?{" "}
        <Link href="/login" className="font-semibold text-[#1567c8] hover:underline">
          Đăng nhập
        </Link>
      </p>
    </form>
  )
}
