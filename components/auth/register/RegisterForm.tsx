"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Input from "../../ui/Input"
import Button from "../../ui/Button"
import RoleSelector from "./RoleSelector"
import PasswordStrength from "./PasswordStrength"
import { registerAccount } from "@/lib/actions/register"
import Toast from "../../ui/Toast"

export default function RegisterForm() {
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ text: "Mật khẩu xác nhận không khớp.", type: "error" });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const result = await registerAccount(formData);
      
      if (result.error) {
        setMessage({ text: result.error, type: "error" });
        setLoading(false);
        return;
      }
      
      setMessage({ text: "Đăng ký thành công! Đang chuyển hướng...", type: "success" });
      
      // Redirect after 1.5s
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      
    } catch (err: any) {
      setMessage({ text: err.message || "Đã xảy ra lỗi đăng ký.", type: "error" });
      setLoading(false);
    }
  }

  return (
    <section className="w-full md:w-1/2 p-8 sm:p-16 flex flex-col justify-center relative">

      <div className="max-w-md w-full mx-auto">

        <header className="mb-10">

          <h2 className="text-3xl font-bold mb-2 text-gray-800">
            Create Account
          </h2>

          <p className="text-gray-500">
            Start your journey with Academic Curator today.
          </p>

        </header>

        <form className="space-y-6" onSubmit={handleSubmit}>

          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Email Address"
            type="email"
            placeholder="you@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div>

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <PasswordStrength />

          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Fake RoleSelector that won't actually affect the DB */}
          <RoleSelector />

          <Button loading={loading}>
            Create Account
          </Button>

        </form>

        <footer className="mt-10 text-center">

          <p className="text-gray-500">

            Already have an account?

            <a
              href="/login"
              className="text-indigo-600 font-bold ml-1 hover:underline"
            >
              Sign In
            </a>

          </p>

        </footer>

      </div>
      
      {/* Toast Notification */}
      {message && (
        <div className="absolute top-8 right-8 z-50">
          <Toast message={message.text} type={message.type} />
        </div>
      )}

    </section>
  )
}