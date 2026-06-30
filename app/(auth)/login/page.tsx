import PortalHeader from "@/components/portal/PortalHeader"
import PortalFooter from "@/components/portal/PortalFooter"
import LoginForm from "@/components/portal/LoginForm"
import EmblemStar from "@/components/portal/EmblemStar"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PortalHeader />

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <EmblemStar size={56} />
            <h1 className="mt-3 text-xl font-bold text-slate-800">
              Đăng nhập Cổng Dịch vụ công
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Sử dụng tài khoản để truy cập và tra cứu hồ sơ.
            </p>
          </div>

          <LoginForm />
        </div>
      </main>

      <PortalFooter />
    </div>
  )
}
