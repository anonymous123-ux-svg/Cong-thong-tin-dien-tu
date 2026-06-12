import type { InputHTMLAttributes } from "react"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function Input({
  label,
  className,
  ...props
}: InputProps) {
  return (
    <div>

      <label className="block text-sm font-semibold text-gray-800 uppercase tracking-wider">
        {label}
      </label>

      <input
        {...props}
        className={`w-full mt-2 px-4 py-4 rounded-xl bg-gray-100 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 placeholder:text-gray-400 ${className || ""}`}
      />

    </div>
  )
}