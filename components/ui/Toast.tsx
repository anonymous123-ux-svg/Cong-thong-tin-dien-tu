import { cn } from "@/lib/utils"

export type ToastProps = {
  message: string
  type?: "success" | "error"
}

export default function Toast({ message, type = "success" }: ToastProps) {
  const isError = type === "error"

  return (
    <div className={cn(
      "fixed top-8 right-8 px-6 py-4 rounded-xl shadow-lg animate-in fade-in slide-in-from-right-4 z-50",
      isError ? "bg-red-100 text-red-800" : "bg-emerald-100 text-emerald-800"
    )}>
      <p className="font-semibold">{isError ? "Lỗi" : "Thành công"}</p>
      <p className="text-sm opacity-80">{message}</p>
    </div>
  )
}