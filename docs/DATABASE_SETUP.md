# Hướng dẫn thiết lập Database — React2Shell Lab

Tài liệu này hướng dẫn cách khởi tạo và kết nối PostgreSQL cho bài lab **React2Shell (CVE-2025-55182)**.

---

## Tổng quan kiến trúc

```
Next.js App (port 3000)
    │
    │  DATABASE_URL (env)
    ▼
PostgreSQL (port 5432)
    └── database: dichvucong
        ├── User    (tài khoản đăng nhập)
        └── HoSo    (hồ sơ dịch vụ công — dữ liệu tra cứu)
```

**Stack:**
- PostgreSQL 16 (Docker hoặc bare-metal)
- Prisma 6.19.3 + `@prisma/adapter-pg` (driver-based adapter)
- Không dùng Prisma Migrate truyền thống — schema được push qua `prisma db push`

---

## Cách 1 — Docker Compose (khuyến nghị)

### Yêu cầu
- Docker Engine ≥ 24
- Docker Compose v2

### Bước 1: Khởi động container PostgreSQL

```bash
docker compose up -d
```

Container `dichvucong-db` sẽ chạy PostgreSQL 16 tại `localhost:5432`.

Kiểm tra:
```bash
docker compose ps
# dichvucong-db   running   0.0.0.0:5432->5432/tcp
```

### Bước 2: Cấu hình biến môi trường

```bash
cp .env.example .env
```

Mở `.env` và đặt các giá trị:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dichvucong"
AUTH_SECRET="k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH"
APP_HOST=<IP-máy-chạy-app>
AUTH_TRUST_HOST=true
```

> Thay `<IP-máy-chạy-app>` bằng địa chỉ IP thực của máy (VD: `192.168.95.128`).

### Bước 3: Cài dependencies

```bash
npm install
```

### Bước 4: Tạo schema database

```bash
npx prisma db push
```

Lệnh này đọc `prisma/schema.prisma` và tạo các bảng `User`, `HoSo`, kiểu enum `Role` trong database.

### Bước 5: Seed dữ liệu mẫu

```bash
npm run db:seed
# hoặc
npx prisma db seed
```

Sau khi chạy, database có:

| Email | Mật khẩu | Vai trò |
|---|---|---|
| `congdan@dichvucong.gov.vn` | `password123` | CONG_DAN |
| `canbo@dichvucong.gov.vn` | `password123` | CAN_BO |

Kèm theo 3 hồ sơ mẫu để tra cứu (mã `000.00.01.H29-...`).

### Bước 6: Chạy ứng dụng

```bash
npm run dev
# hoặc build production
npm run build && npm start
```

Truy cập: `http://<APP_HOST>:3000`

---

## Cách 2 — SQL thuần (init.sql)

Dùng khi không muốn dùng Prisma CLI hoặc cần khởi tạo lại schema nhanh.

### Yêu cầu thêm

Extension `pgcrypto` (để hash bcrypt trong SQL):
```sql
-- Chạy một lần với tài khoản superuser trong psql
CREATE EXTENSION IF NOT EXISTS pgcrypto;
```

### Bước 1: Khởi động PostgreSQL (Docker hoặc bare-metal)

```bash
# Docker
docker compose up -d

# Bare-metal (Ubuntu/Debian)
sudo systemctl start postgresql
sudo -u postgres createdb dichvucong
```

### Bước 2: Chạy init.sql

```bash
# Qua Docker
docker exec -i dichvucong-db psql -U postgres -d dichvucong < database/init.sql

# Bare-metal
psql -U postgres -d dichvucong -f database/init.sql
```

Script `database/init.sql` sẽ:
1. Tạo extension `pgcrypto`
2. Xóa và tạo lại bảng `User`, `HoSo`, kiểu `Role`
3. Insert seed data với password hash bcrypt tính bằng `crypt()`
4. In bảng kiểm tra kết quả

### Bước 3: Cấu hình `.env` và chạy app

Thực hiện Bước 2, 3, 6 như Cách 1.

> **Lưu ý:** Sau khi chạy `init.sql`, bỏ qua `npx prisma db push` và `npx prisma db seed` vì schema và data đã có sẵn.

---

## Kiểm tra kết nối

### Từ terminal (psql)

```bash
# Qua Docker
docker exec -it dichvucong-db psql -U postgres -d dichvucong

# Kiểm tra bảng
\dt

# Xem danh sách user
SELECT email, role FROM "User";
```

### Kết quả mong đợi

```
             email              |   role
--------------------------------+----------
 congdan@dichvucong.gov.vn      | CONG_DAN
 canbo@dichvucong.gov.vn        | CAN_BO
(2 rows)
```

### Từ ứng dụng Next.js

Đăng nhập tại `http://<APP_HOST>:3000/login` với:
- Email: `congdan@dichvucong.gov.vn`
- Mật khẩu: `password123`

Sau đó vào `/tra-cuu` và tra cứu mã hồ sơ `000.00.01.H29-260310-0420`.

---

## Cấu trúc Schema

### Bảng `User`

| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | TEXT (PK) | CUID |
| `email` | TEXT (UNIQUE) | Email đăng nhập |
| `hoTen` | TEXT (nullable) | Họ tên đầy đủ |
| `passwordHash` | TEXT | Bcrypt hash (cost 10) |
| `role` | Role enum | `CONG_DAN` / `CAN_BO` / `ADMIN` |

### Bảng `HoSo`

| Cột | Kiểu | Mô tả |
|---|---|---|
| `id` | TEXT (PK) | CUID |
| `maHoSo` | TEXT (UNIQUE) | Mã hồ sơ tra cứu |
| `thuTuc` | TEXT | Tên thủ tục hành chính |
| `coQuan` | TEXT | Cơ quan tiếp nhận |
| `linhVuc` | TEXT | Lĩnh vực |
| `nguoiNop` | TEXT | Tên người nộp |
| `tinhTrang` | TEXT | Trạng thái hồ sơ |
| `ngayTiepNhan` | TIMESTAMP | Ngày tiếp nhận |
| `ngayHenTra` | TIMESTAMP | Ngày hẹn trả |
| `ownerId` | TEXT (FK → User, nullable) | Chủ sở hữu hồ sơ |

---

## Xử lý sự cố

### Lỗi: `P1001 Can't reach database server`

```bash
# Kiểm tra container có đang chạy không
docker compose ps

# Xem log PostgreSQL
docker compose logs postgres
```

### Lỗi: `P3009 migrate found failed migrations`

Database có migration state không đồng bộ. Reset sạch:
```bash
docker compose down -v      # xóa volume pgdata
docker compose up -d        # khởi động lại
npx prisma db push          # tạo lại schema
npx prisma db seed          # seed lại
```

### Lỗi: `role "postgres" does not exist` (bare-metal)

```bash
sudo -u postgres psql -c "CREATE ROLE postgres SUPERUSER LOGIN PASSWORD 'postgres';"
sudo -u postgres psql -c "CREATE DATABASE dichvucong OWNER postgres;"
```

### Reset database về trạng thái ban đầu

```bash
# Cách nhanh nhất
docker compose down -v && docker compose up -d
npx prisma db push && npx prisma db seed
```

---

## Thông tin kết nối tóm tắt

| Thông số | Giá trị |
|---|---|
| Host | `localhost` (hoặc IP máy target) |
| Port | `5432` |
| Database | `dichvucong` |
| User | `postgres` |
| Password | `postgres` |
| Connection string | `postgresql://postgres:postgres@localhost:5432/dichvucong` |

### Tài khoản chỉ-đọc `readonly_auditor` (mục tiêu post-exploitation)

`scripts/install-postgres-db-server.sh` còn tạo thêm một role **chỉ-đọc** khớp đúng
với cặp `DB_USER` / `DB_PASS` bị lộ trong `.env` của máy app. Sau khi RCE và đọc
`.env`, người tấn công dùng cặp này để pivot vào PostgreSQL nội bộ và đọc (SELECT)
toàn bộ bảng `User`, `HoSo` — nhưng **không** ghi/sửa được.

| Thông số | Giá trị |
|---|---|
| User | `readonly_auditor` |
| Password | `Learning@2026!` |
| Quyền | `CONNECT` + `SELECT` trên toàn bộ bảng schema `public` (kể cả bảng tạo sau) |

```bash
# Từ máy app (đã có sẵn postgresql-client nhờ setup-webserver.sh)
psql -h <DB_INTERNAL_HOST> -p 5432 -U readonly_auditor -d dichvucong
# password: Learning@2026!
```
