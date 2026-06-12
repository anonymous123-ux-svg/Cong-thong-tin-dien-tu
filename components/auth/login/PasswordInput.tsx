"use client"

import { useState } from "react"

export interface PasswordInputProps {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function PasswordInput({ value, onChange }: PasswordInputProps) {

    const [show, setShow] = useState(false)

    return (
        <div className="relative mt-2">

            <input
                type={show ? "text" : "password"}
                value={value}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-gray-300
                text-gray-900 placeholder:text-gray-400
                bg-white
                focus:ring-2 focus:ring-indigo-500
                focus:border-indigo-500
                outline-none pr-12"
            />

            <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-700"
            >
                {show ? "🙈" : "👁"}
            </button>

        </div>
    )
}