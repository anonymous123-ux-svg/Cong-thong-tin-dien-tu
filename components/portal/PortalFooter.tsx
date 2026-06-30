export default function PortalFooter() {
  return (
    <footer className="mt-auto bg-[#0a3a78] text-blue-100">
      <div className="mx-auto max-w-6xl px-4 py-8 grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold text-white mb-2">CỔNG DỊCH VỤ CÔNG</div>
          <p className="leading-relaxed text-blue-200">
            Cơ quan chủ quản: Văn phòng Chính phủ. Kết nối, cung cấp thông tin và
            dịch vụ công mọi lúc, mọi nơi.
          </p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Liên hệ</div>
          <p className="text-blue-200">Tổng đài hỗ trợ: 18001096</p>
          <p className="text-blue-200">Email: hotro@dichvucong.gov.vn</p>
        </div>
        <div>
          <div className="font-semibold text-white mb-2">Thông tin</div>
          <p className="text-blue-200">
            Hệ thống dành cho mục đích huấn luyện an toàn thông tin.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-3 text-center text-xs text-blue-300">
        © {new Date().getFullYear()} Cổng Dịch vụ công. Bản quyền thuộc về cơ quan chủ quản.
      </div>
    </footer>
  )
}
