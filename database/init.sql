-- =============================================================================
-- dichvutracuu — PostgreSQL Init Script
-- Dùng để khởi tạo schema + seed data cho bài lab React2Shell (CVE-2025-55182)
--
-- Cách dùng:
--   psql -U postgres -d dichvutracuu -f database/init.sql
--
-- Hoặc trong container:
--   docker exec -i dichvutracuu-db psql -U postgres -d dichvutracuu < database/init.sql
--
-- LƯU Ý: Script này dùng pgcrypto để tạo bcrypt hash trực tiếp trong SQL.
--         Nếu extension chưa có, chạy dòng đầu tiên với quyền superuser.
-- =============================================================================

-- 0. Extension pgcrypto (cần quyền superuser lần đầu)
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =============================================================================
-- 1. DỌN SẠCH (idempotent — an toàn khi chạy lại)
-- =============================================================================
DROP TABLE IF EXISTS "HoSo" CASCADE;
DROP TABLE IF EXISTS "User"  CASCADE;
DROP TYPE  IF EXISTS "Role"  CASCADE;

-- =============================================================================
-- 2. KIỂU DỮ LIỆU
-- =============================================================================
CREATE TYPE "Role" AS ENUM ('CONG_DAN', 'CAN_BO', 'ADMIN');

-- =============================================================================
-- 3. BẢNG User
-- =============================================================================
CREATE TABLE "User" (
    "id"           TEXT    NOT NULL,
    "email"        TEXT    NOT NULL,
    "hoTen"        TEXT,
    "passwordHash" TEXT    NOT NULL,
    "role"         "Role"  NOT NULL DEFAULT 'CONG_DAN',
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- =============================================================================
-- 4. BẢNG HoSo (Hồ sơ dịch vụ tra cứu)
-- =============================================================================
CREATE TABLE "HoSo" (
    "id"            TEXT             NOT NULL,
    "maHoSo"        TEXT             NOT NULL,
    "thuTuc"        TEXT             NOT NULL,
    "coQuan"        TEXT             NOT NULL,
    "linhVuc"       TEXT             NOT NULL,
    "nguoiNop"      TEXT             NOT NULL,
    "tinhTrang"     TEXT             NOT NULL,
    "ngayTiepNhan"  TIMESTAMP(3)     NOT NULL,
    "ngayHenTra"    TIMESTAMP(3)     NOT NULL,
    "ownerId"       TEXT,
    CONSTRAINT "HoSo_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "HoSo_maHoSo_key" ON "HoSo"("maHoSo");

ALTER TABLE "HoSo"
    ADD CONSTRAINT "HoSo_ownerId_fkey"
    FOREIGN KEY ("ownerId")
    REFERENCES "User"("id")
    ON DELETE SET NULL
    ON UPDATE CASCADE;

-- =============================================================================
-- 5. SEED DATA
--    Mật khẩu tất cả tài khoản: password123
--    Hash được tính bằng pgcrypto: crypt('password123', gen_salt('bf', 10))
-- =============================================================================

-- 5a. Tài khoản cán bộ quản trị
INSERT INTO "User" ("id", "email", "hoTen", "passwordHash", "role")
VALUES (
    'user_canbo_001',
    'canbo@dichvutracuu.gov.vn',
    'Nguyễn Văn Cán Bộ',
    crypt('password123', gen_salt('bf', 10)),
    'CAN_BO'
);

-- 5b. Tài khoản công dân mẫu (dùng để đăng nhập và tra cứu hồ sơ)
INSERT INTO "User" ("id", "email", "hoTen", "passwordHash", "role")
VALUES (
    'user_congdan_001',
    'congdan@dichvutracuu.gov.vn',
    'Trần Thị Công Dân',
    crypt('password123', gen_salt('bf', 10)),
    'CONG_DAN'
);

-- 5c. Hồ sơ dịch vụ tra cứu mẫu
INSERT INTO "HoSo" (
    "id", "maHoSo", "thuTuc", "coQuan", "linhVuc",
    "nguoiNop", "tinhTrang", "ngayTiepNhan", "ngayHenTra", "ownerId"
) VALUES
(
    'hoso_001',
    '000.00.01.H29-240115-0001',
    'Cấp đổi giấy phép lái xe',
    'Sở Giao thông Vận tải',
    'Giao thông vận tải',
    'Trần Thị Công Dân',
    'Đã trả kết quả',
    '2026-01-15 08:30:00'::TIMESTAMP,
    '2026-01-22 17:00:00'::TIMESTAMP,
    'user_congdan_001'
),
(
    'hoso_002',
    '000.00.01.H29-260310-0420',
    'Đăng ký khai sinh',
    'UBND Phường Bến Nghé',
    'Tư pháp - Hộ tịch',
    'Trần Thị Công Dân',
    'Đang xử lý',
    '2026-03-10 09:15:00'::TIMESTAMP,
    '2026-03-13 17:00:00'::TIMESTAMP,
    'user_congdan_001'
),
(
    'hoso_003',
    '000.00.01.H29-260520-1188',
    'Cấp giấy chứng nhận quyền sử dụng đất',
    'Văn phòng Đăng ký đất đai',
    'Đất đai',
    'Lê Văn A',
    'Chờ bổ sung hồ sơ',
    '2026-05-20 14:00:00'::TIMESTAMP,
    '2026-06-20 17:00:00'::TIMESTAMP,
    NULL
);

-- =============================================================================
-- 6. KIỂM TRA KẾT QUẢ
-- =============================================================================
SELECT
    u."email",
    u."hoTen",
    u."role",
    COUNT(h."id") AS so_ho_so
FROM "User" u
LEFT JOIN "HoSo" h ON h."ownerId" = u."id"
GROUP BY u."email", u."hoTen", u."role"
ORDER BY u."role";

SELECT '=== Init hoàn thành ===' AS status;
