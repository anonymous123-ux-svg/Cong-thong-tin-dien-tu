"use client"

import { useState } from "react"

interface Props {
  onComplete: (otp: string) => void
}

export default function OTPInput({ onComplete }: Props) {

  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const handleChange = (value: string, index: number) => {

    if (!/^[0-9]?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`)
      next?.focus()
    }

    const code = newOtp.join("")
    if (code.length === 6) {
      onComplete(code)
    }
  }

  return (
    <div className="flex justify-between gap-2">

      {otp.map((digit, i) => (
        <input
          key={i}
          id={`otp-${i}`}
          value={digit}
          maxLength={1}
          onChange={(e) => handleChange(e.target.value, i)}
          className="w-12 h-14 text-center text-2xl font-bold rounded-xl bg-slate-100 text-indigo-600 focus:ring-2 focus:ring-indigo-600 outline-none"
        />
      ))}

    </div>
  )
}