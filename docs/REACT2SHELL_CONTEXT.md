# React2Shell (CVE-2025-55182) Lab — Bối cảnh kiến trúc
**Cập nhật:** 30/06/2026
**Dự án:** dichvutracuu-portal (Cyber Range Lab — Cổng Dịch vụ tra cứu)

## 1. Trạng thái & Kiến trúc
Ứng dụng mô phỏng **Cổng Dịch vụ tra cứu** (tham khảo trang Tra cứu hồ sơ của Cổng Dịch vụ tra cứu Quốc gia), được vũ khí hóa làm mục tiêu Red Team.

*   **Framework:** Next.js 15.0.3 (React 19.0.0-rc) — *cố ý dính CVE-2025-55182*
*   **Database:** PostgreSQL (Prisma 6.19.3 + `@prisma/adapter-pg`)
*   **Auth:** NextAuth v5 (Credentials + bcryptjs)
*   **Routing/RBAC:** `middleware.ts` + `auth.config.ts`

### Route công khai vs bảo vệ
*   **Công khai:** `/`, `/login`, `/register`
*   **Bảo vệ (yêu cầu đăng nhập):** `/tra-cuu` ← chứa lỗ hổng

## 2. Lỗ hổng (Kill Chain)

### Giai đoạn 1: Lấy quyền truy cập (Đăng nhập bắt buộc)
*   Đăng ký công dân tại `/register` (ép vai trò `CONG_DAN` phía server) hoặc dùng tài khoản mẫu.
*   Đăng nhập tại `/login` để lấy `authjs.session-token`.
*   Cookie này cần thiết để vượt qua middleware bảo vệ `/tra-cuu`.

### Giai đoạn 2: Insecure Deserialization cấp framework (React2Shell)
*   **Điểm vào:** Server Action `traCuuHoSo` trên route `/tra-cuu` (`lib/actions/lookup.ts`).
*   **Bản chất:** Lỗi nằm trong React Flight deserializer (`decodeReply`) của Next.js 15.0.3 / React 19.0.0-rc — KHÔNG phải lỗi tầng ứng dụng.
*   **Cơ chế:** Truy cập thuộc tính bằng bracket notation đi xuyên prototype chain → chạm tới `constructor` → lấy Global `Function` constructor → thực thi code trong `_prefix`.
*   Việc deserialize xảy ra **trước khi** thân hàm `traCuuHoSo` chạy → RCE.

### Giai đoạn 3: Post-Exploitation
*   `cat .env` để lộ thông tin hạ tầng nội bộ (`DB_INTERNAL_HOST`, `DB_USER`, `DB_PASS`).
*   Pivot bằng Chisel/SSH tunnel tới PostgreSQL nội bộ.

### Giai đoạn 4: Leo thang đặc quyền & Di chuyển ngang (bổ sung)
*   Từ pivot Postgres nội bộ (giai đoạn 3), attacker có thể `UPDATE "User" SET role='ADMIN'` cho tài khoản đang chiếm được.
*   Recon bằng `gobuster`/`ffuf`/`dirb` (wordlist thông dụng, ví dụ `common.txt` có sẵn `admin`) để phát hiện route `/admin` — route này **không** có liên kết ở bất kỳ menu điều hướng nào của UI.
*   Đăng nhập `/admin` bằng tài khoản đã được nâng quyền → khu vực quản trị cho phép quản lý người dùng (`/admin/nguoi-dung`) và duyệt nội dung "Phản ánh kiến nghị" (`/admin/phan-anh`).
*   `/admin/dich-vu-noi-bo` lộ credential FTP/SSH nội bộ theo từng user — mục tiêu di chuyển ngang tiếp theo.
*   Song song, mục "Phản ánh kiến nghị" (`/phan-anh-kien-nghi`, công khai) chấp nhận tệp đính kèm mọi định dạng (Unrestricted File Upload — CWE-434), tệp được lưu ngay trong `public/uploads/phan-anh/` nên truy cập được trực tiếp qua URL sau khi gửi.

## 3. PoC tham khảo
https://github.com/kOaDT/poc-cve-2025-55182 — payload `multipart/form-data` với `then/_response/_prefix/constructor`. Chi tiết: `Lab_Walkthrough.md`.

## 4. File chính

| File | Vai trò |
|---|---|
| `lib/actions/lookup.ts` | Server Action `traCuuHoSo` — điểm vào React2Shell (có auth gate) |
| `app/tra-cuu/page.tsx` | Route bảo vệ chứa form tra cứu |
| `components/portal/TraCuuForm.tsx` | Form client gọi Server Action (useActionState) |
| `lib/actions/register.ts` | Đăng ký an toàn (ép vai trò CONG_DAN) |
| `auth.config.ts` | Middleware RBAC (public: `/`, `/login`, `/register`, `/dich-vu-tra-cuu`, `/phan-anh-kien-nghi`) |
| `.env` | Chứa credential nội bộ để pivot |
| `lib/actions/phan-anh.ts` | Server Action `guiPhanAnh` — Unrestricted File Upload (CWE-434) |
| `app/admin/layout.tsx` | Guard vai trò ADMIN cho khu vực quản trị ẨN (không link điều hướng) |
| `lib/actions/admin.ts` | Server Actions quản trị — quản lý user, phản ánh, và `/admin/dich-vu-noi-bo` (credential FTP/SSH) |

## 5. Lệnh hữu ích
*   Dev: `npm run dev`
*   Build: `npm run build`
*   Trích Action ID: `cat .next/server/server-reference-manifest.json | grep -B5 "traCuuHoSo"`
*   Listener: `nc -lvnp 4444`
