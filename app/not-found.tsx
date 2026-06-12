import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-6">

      <div className="max-w-5xl grid lg:grid-cols-2 gap-16 items-center">

        {/* Illustration */}
        <div className="relative">

          <div className="absolute inset-0 bg-indigo-100 rounded-[2rem] rotate-3 scale-105"></div>

          <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-lg">

            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOb6mYemvDf7HjP5KTYXE9khR-aUR_-YIZNs7tYfrQyKcE35O7rr7nwhQkipqExAwbVE3zmju10BClYJz9Sl-ibrwDHzUk5VN2brTxGEZErcNWVyait0eunFRs5gKPKKCTywD-ZFIAUX34KjQtLT_AeSykfJ0l3Gq-an-pSNXrTx8rc7TPFu4UeQ5oTsu4Lh0ZWbOyZ0Fog3tIb46d1EZMCU67MmjLmLkURB7h4nTezbKeiQ77IN-vKYNK3c81fqbMvfzA4aOQT7Vt"
              alt="Empty library"
              className="w-full h-full object-cover grayscale opacity-90"
            />

          </div>

          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">

            <span className="text-6xl font-black text-indigo-100">
              404
            </span>

          </div>

        </div>

        {/* Content */}
        <div className="space-y-6">

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-xs uppercase tracking-wider">

            <span className="material-symbols-outlined text-sm">
              error
            </span>

            Resource Unreachable

          </div>

          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Lost in the <br />
            <span className="text-indigo-600">
              Stacks?
            </span>
          </h1>

          <p className="text-lg text-slate-500 max-w-md">
            The page you are looking for has been moved or doesn't exist.
            Our curators are restructuring this section of the archive.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <Link
              href="/admin/dashboard"
              className="px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition"
            >
              Back to Dashboard
            </Link>

            <Link
              href="/help"
              className="px-6 py-3 border border-indigo-200 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition"
            >
              Visit Help Center
            </Link>

          </div>

        </div>

      </div>

    </main>
  )
}