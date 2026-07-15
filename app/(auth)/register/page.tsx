import PortalHeader from "@/components/portal/PortalHeader"
import PortalFooter from "@/components/portal/PortalFooter"
import RegisterForm from "@/components/portal/RegisterForm"
import EmblemStar from "@/components/portal/EmblemStar"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <EmblemStar size={56} />
            <h1 className="mt-3 text-xl font-bold text-slate-800">
              Đăng ký tài khoản
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Tạo tài khoản công dân để sử dụng dịch vụ tra cứu trực tuyến.
            </p>
          </div>

          <RegisterForm />
        </div>
      </main>

      <PortalFooter />
    </div>
  )
}
