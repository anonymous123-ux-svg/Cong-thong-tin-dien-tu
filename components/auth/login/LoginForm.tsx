"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import PasswordInput from "./PasswordInput"
import Button from "../../../components/ui/Button"
import Toast from "../../../components/ui/Toast"

import Link from "next/link"

export default function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

        e.preventDefault()

        if (!email || !password) {
            setError("Please fill all fields")
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
                throw new Error("Invalid credentials")
            }

            // Redirect to root, let middleware route to correct dashboard
            window.location.href = "/"

        } catch (err: unknown) {

            if (err instanceof Error) {
                setError(err.message)
            } else {
                setError("An unexpected error occurred")
            }

        } finally {

            setLoading(false)

        }

    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >

                {/* Email */}

                <div>

                    <label className="text-sm font-semibold text-gray-700">
                        Email Address
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        placeholder="curator@institution.edu"
                        className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-300
                        text-gray-900 placeholder:text-gray-400
                        bg-white
                        focus:ring-2 focus:ring-indigo-500
                        focus:border-indigo-500
                        outline-none"
                    />

                </div>

                {/* Password */}

                <div>

                    <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase">

                        <label className="text-sm font-semibold text-gray-700">Password</label>

                        <Link
                            href="/forgot-password"
                            className="text-sm text-indigo-600 hover:underline"
                        >
                            Forgot password?
                        </Link>

                    </div>

                    <PasswordInput
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    />

                </div>

                {/* Remember */}

                <div className="flex items-center gap-2">

                    <input type="checkbox" />

                    <span className="text-sm text-gray-600">
                        Remember this device
                    </span>

                </div>

                <Button loading={loading}>
                    Sign In
                </Button>

            </form>

            {error && <Toast message={error} type="error" />}
        </>
    )
}