import RegisterHero from "@/components/auth/register/RegisterHero"
import RegisterForm from "@/components/auth/register/RegisterForm"

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f9f9ff] p-6">

      <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-[2rem] shadow-sm overflow-hidden">

        <RegisterHero />

        <RegisterForm />

      </div>

    </main>
  )
}