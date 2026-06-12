import Link from "next/link"

export default function ForgotPasswordCard() {
  return (
    <div className="max-w-md w-full">

      {/* Logo */}

      <div className="flex flex-col items-center mb-10">

        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-4">

          <span className="material-symbols-outlined text-white text-3xl">
            school
          </span>

        </div>

        <h1 className="text-2xl font-extrabold text-gray-900">
          The Academic Curator
        </h1>

      </div>

      {/* Card */}

      <div className="bg-white rounded-3xl p-10 shadow-lg border">

        {/* Icon */}

        <div className="flex justify-center mb-6">

          <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center">

            <span className="material-symbols-outlined text-indigo-600 text-4xl">
              lock_reset
            </span>

          </div>

        </div>

        {/* Title */}

        <div className="text-center mb-8">

          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Forgot password?
          </h2>

          <p className="text-gray-500 text-sm">
            Enter your email to receive a password reset link
          </p>

        </div>

        {/* Form */}

        <form className="space-y-6">

          <div>

            <label className="text-xs font-bold uppercase text-gray-500">
              Institutional Email
            </label>

            <div className="relative mt-2">

              <span className="material-symbols-outlined absolute left-3 top-3 text-gray-400">
                mail
              </span>

              <input
                type="email"
                placeholder="name@university.edu"
                className="w-full rounded-xl border px-10 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
              />

            </div>

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition"
          >

            Send Reset Link

            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>

          </button>

        </form>

        {/* Back to login */}

        <div className="mt-10 pt-6 border-t text-center">

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:underline"
          >

            <span className="material-symbols-outlined text-[18px]">
              chevron_left
            </span>

            Sign In

          </Link>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-12 text-center">

        <p className="text-xs text-gray-400 font-medium">
          SECURED BY ACADEMIC CURATOR AUTH™
        </p>

      </div>

    </div>
  )
}