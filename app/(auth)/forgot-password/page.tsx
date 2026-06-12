import ForgotPasswordCard from "@/components/auth/forgot-password/ForgotPasswordCard"

export default function ForgotPasswordPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-[#f9f9ff] p-6">

      {/* Background blur blobs */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="absolute top-[60%] -right-[5%] w-[30%] h-[40%] rounded-full bg-green-400/10 blur-[100px]" />

      </div>

      <ForgotPasswordCard />

    </main>
  )
}