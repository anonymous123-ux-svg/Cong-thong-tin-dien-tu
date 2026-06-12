import ResetPasswordCard from "@/components/auth/reset-password/ResetPasswordCard"

export default function ResetPasswordPage() {

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-6">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="flex flex-col items-center mb-10">

          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">

            <span className="material-symbols-outlined text-white text-3xl">
              lock_reset
            </span>

          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            Reset Your Password
          </h1>

          <p className="text-gray-500 text-center max-w-sm">
            Enter a new password for your account.
          </p>

        </div>

        <ResetPasswordCard />

      </div>

    </main>
  )
}