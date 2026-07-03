# 🏛️ Cổng Dịch vụ công — Vulnerable Government Service Portal

> **⚠️ CẢNH BÁO: Ứng dụng này CỐ Ý CHỨA LỖ HỔNG. Nó được thiết kế CHỈ cho mục đích huấn luyện an toàn thông tin có ủy quyền, lab pentest và CTF. KHÔNG triển khai trên môi trường thật hoặc mạng công khai.**

---

## Tổng quan

**Cổng Dịch vụ công** mô phỏng giao diện cổng thông tin điện tử dịch vụ công (tham khảo trang Tra cứu hồ sơ của Cổng Dịch vụ công Quốc gia). Ứng dụng được xây dựng trên stack hiện đại (Next.js 15.0.3 / React 19.0.0-rc / Node.js) và **cố ý** cấu hình dễ bị tấn công bởi một trong những lỗ hổng nghiêm trọng nhất của hệ sinh thái React: **React2Shell (CVE-2025-55182)**.

Lab này huấn luyện học viên và Red Team về:
- Phương pháp pentest ứng dụng web
- Hiểu về Server Components và giao thức React Flight
- Khai thác lỗi Insecure Deserialization trong Next.js Server Actions
- Soạn payload cho React2Shell (CVE-2025-55182)

## 🔴 Lỗ hổng: React2Shell (CVE-2025-55182)

Ứng dụng dùng **Next.js 15.0.3** và **React 19.0.0-rc** — các phiên bản dính lỗi deserialization không an toàn ở cách giao thức React Flight (`decodeReply`) xử lý các request Server Action gửi đến.

### Vị trí lỗ hổng (theo yêu cầu lab)

Lỗ hổng nằm trong **chức năng Tra cứu hồ sơ** và **chỉ khai thác được sau khi đăng nhập**:

- Trang `/tra-cuu` được bảo vệ bởi middleware xác thực — phải có session cookie hợp lệ mới truy cập được.
- Form tra cứu gọi Server Action `traCuuHoSo` (xem `lib/actions/lookup.ts`).
- Vì đây là lỗi cấp **framework**, việc giải mã (deserialize) payload `multipart/form-data` xảy ra **trước khi** mã trong `traCuuHoSo` chạy → đạt RCE.

### Luồng tấn công

1. **Đăng ký** tài khoản công dân tại `/register` (hoặc dùng tài khoản mẫu).
2. **Đăng nhập** tại `/login` để lấy `authjs.session-token`.
3. **Lấy Action ID** của `traCuuHoSo` từ trang `/tra-cuu` (hoặc dùng `Next-Action: x` như PoC kOaDT).
4. **Gửi payload React2Shell** `multipart/form-data` tới `POST /tra-cuu` kèm session cookie → RCE.

Tham khảo PoC: https://github.com/kOaDT/poc-cve-2025-55182 — chi tiết khai thác xem `Lab_Walkthrough.md`.

## 🟠 Lỗ hổng bổ sung: Unrestricted File Upload (CWE-434)

Mục **Phản ánh kiến nghị** (`/phan-anh-kien-nghi`, công khai, không cần đăng nhập) cho phép đính kèm **bất kỳ định dạng tệp nào** — không kiểm tra phần mở rộng hay MIME type (xem `lib/actions/phan-anh.ts`). Tệp được lưu trực tiếp vào `public/uploads/phan-anh/` nên có thể truy cập ngay qua URL sau khi gửi.

## 🟠 Lỗ hổng bổ sung: Trang quản trị ẩn + lộ thông tin hạ tầng nội bộ

- Route `/admin` **không có liên kết** ở bất kỳ menu điều hướng nào của giao diện — chỉ có thể phát hiện bằng cách dò quét thư mục (`gobuster`, `ffuf`, `dirb`...) hoặc dò subdomain (`amass`, `subfinder`...). Đây là ví dụ điển hình về "security through obscurity" — ẩn đường dẫn không thay thế được kiểm soát truy cập thật sự.
- Truy cập `/admin` vẫn yêu cầu đăng nhập bằng vai trò `ADMIN` (kiểm tra tại `app/admin/layout.tsx` và trong từng Server Action ở `lib/actions/admin.ts`).
- Sau khi vào được khu vực quản trị, `/admin/dich-vu-noi-bo` lộ thông tin kết nối **FTP/SSH nội bộ** (host, username, mật khẩu) theo từng người dùng dịch vụ — mục tiêu post-exploitation để pivot sang hạ tầng backend, tương tự luồng lộ `.env` đã mô tả ở trên.
- Kịch bản escalation gợi ý: khai thác React2Shell → đọc `.env` → pivot Postgres nội bộ → tự nâng quyền tài khoản đang chiếm được lên `ADMIN` → fuzz tìm `/admin` → đăng nhập → thu thập credential FTP/SSH tại `/admin/dich-vu-noi-bo` để di chuyển ngang (lateral movement).

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | **15.0.3 (Vulnerable)** |
| UI Library | React | **19.0.0-rc (Vulnerable)** |
| Language | TypeScript (strict) | 5.x |
| Styling | Tailwind CSS | 3.4.x |
| Database | PostgreSQL via Prisma | 6.19.3 |
| Auth | NextAuth (Credentials) | v5 beta |

## Cấu trúc

```text
app/
  (public)/
    page.tsx             → Trang chủ cổng dịch vụ công (công khai)
    dich-vu-cong/         → Danh mục dịch vụ công trực tuyến (công khai)
    phan-anh-kien-nghi/   → 🟠 Gửi phản ánh kiến nghị — Unrestricted File Upload
  (auth)/
    login/              → Đăng nhập
    register/           → Đăng ký (bắt buộc vai trò CONG_DAN)
  tra-cuu/page.tsx      → 🔴 ROUTE DỄ BỊ TẤN CÔNG (yêu cầu đăng nhập)
                          Render form gọi Server Action traCuuHoSo.
  admin/                → 🟠 Khu vực quản trị ẨN (không có link điều hướng, chỉ ADMIN)
    layout.tsx            Guard xác thực + phân quyền ADMIN
    page.tsx              Tổng quan
    nguoi-dung/           Quản lý người dùng (đổi vai trò, xóa)
    phan-anh/             Duyệt nội dung Phản ánh kiến nghị
    dich-vu-noi-bo/       🟠 Lộ credential FTP/SSH nội bộ theo user

lib/actions/
  lookup.ts             → Server Action traCuuHoSo (điểm vào React2Shell)
  register.ts           → Đăng ký (an toàn, ép vai trò CONG_DAN)
  auth.ts               → Đăng xuất
  phan-anh.ts           → Gửi phản ánh kiến nghị (upload không kiểm tra định dạng)
  dich-vu.ts            → Danh mục dịch vụ công trực tuyến
  admin.ts              → Server Actions khu vực quản trị (tự kiểm tra vai trò ADMIN)

components/portal/       → Header, Footer, form đăng nhập/đăng ký/tra cứu/phản ánh
components/admin/        → Bảng quản lý người dùng & phản ánh kiến nghị
```

## Tài khoản mẫu

| Vai trò | Email | Mật khẩu |
|------|-------|----------|
| Công dân | `congdan@dichvucong.gov.vn` | `password123` |
| Cán bộ | `canbo@dichvucong.gov.vn` | `password123` |
| Quản trị viên (`/admin`) | `admin@dichvucong.gov.vn` | `password123` |

> Bạn cũng có thể tự đăng ký một tài khoản công dân mới tại `/register`.

## Khởi chạy nhanh

### Yêu cầu
- Node.js 18.18+ (lab chạy được trên Node cũ; Prisma đã ghim 6.19.3)
- Docker (cho PostgreSQL)
- Burp Suite (để khai thác)

### Cài đặt

```bash
# 1. Cài dependencies (React RC xung đột peer → dùng --legacy-peer-deps, cảnh báo là bình thường)
npm install --legacy-peer-deps

# 2. Khởi động PostgreSQL
docker compose up -d

# 3. Cấu hình môi trường
cp .env.example .env

# 4. Đẩy schema & seed dữ liệu
npx prisma db push
npx prisma db seed

# 5. Chạy server
npm run dev
```

Mở `http://localhost:3000` (hoặc `http://<APP_HOST>:3000` khi truy cập qua LAN).
