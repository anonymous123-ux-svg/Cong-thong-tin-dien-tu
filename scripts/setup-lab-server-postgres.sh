#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DEFAULT_DB_PORT="${DB_PORT:-5432}"
DEFAULT_DB_NAME="${DB_NAME:-dichvutracuu}"
DEFAULT_DB_USER="${DB_USER:-postgres}"
DEFAULT_DB_PASSWORD="${DB_PASSWORD:-postgres}"
DEFAULT_APP_HOST="${APP_HOST:-127.0.0.1}"
AUTH_SECRET="${AUTH_SECRET:-k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH}"

info() {
  printf '[setup] %s\n' "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf '[setup] Thiếu lệnh bắt buộc: %s\n' "$1" >&2
    exit 1
  fi
}

set_env() {
  local key="$1"
  local value="$2"
  local tmp_file

  tmp_file="$(mktemp)"
  touch .env

  awk -v key="$key" -v replacement="${key}=${value}" '
    BEGIN { found = 0 }
    $0 ~ "^" key "=" {
      print replacement
      found = 1
      next
    }
    { print }
    END {
      if (found == 0) {
        print replacement
      }
    }
  ' .env > "$tmp_file"

  mv "$tmp_file" .env
}

prompt_default() {
  local prompt="$1"
  local default_value="$2"
  local answer

  read -r -p "${prompt} [${default_value}]: " answer
  printf '%s' "${answer:-$default_value}"
}

require_command npm
require_command npx

if [ ! -f .env ]; then
  info "Đang tạo .env từ .env.example"
  cp .env.example .env
fi

read -r -p "Nhập IP/hostname của database server PostgreSQL: " DB_HOST
if [ -z "$DB_HOST" ]; then
  printf '[setup] Bắt buộc phải nhập IP/hostname của database server.\n' >&2
  exit 1
fi

DB_PORT="$(prompt_default "Cổng PostgreSQL" "$DEFAULT_DB_PORT")"
DB_NAME="$(prompt_default "Tên database" "$DEFAULT_DB_NAME")"
DB_USER_NAME="$(prompt_default "User database" "$DEFAULT_DB_USER")"
DB_PASSWORD_VALUE="$(prompt_default "Mật khẩu database" "$DEFAULT_DB_PASSWORD")"
APP_HOST_VALUE="$(prompt_default "APP_HOST của máy chạy lab" "$DEFAULT_APP_HOST")"
DATABASE_URL="postgresql://${DB_USER_NAME}:${DB_PASSWORD_VALUE}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

info "Đang ghi cấu hình PostgreSQL server vào .env"
set_env "DATABASE_URL" "\"${DATABASE_URL}\""
set_env "AUTH_SECRET" "\"${AUTH_SECRET}\""
set_env "APP_HOST" "${APP_HOST_VALUE}"
set_env "AUTH_TRUST_HOST" "true"
set_env "DB_INTERNAL_HOST" "${DB_HOST}"
set_env "DB_USER" "readonly_auditor"
set_env "DB_PASS" "Learning@2026!"

# React 19-rc xung đột peer với @welldone-software/why-did-you-render (peer react@^19),
# nên bắt buộc dùng --legacy-peer-deps khi không có lockfile hợp lệ.
# Prisma đã được ghim ^6.19.3 (hỗ trợ Node >=18.18) để chạy được trên Node cũ của lab.
if [ ! -d node_modules ]; then
  info "Đang cài đặt npm dependencies (React RC -> --legacy-peer-deps)"
  npm install --legacy-peer-deps
fi

info "Đang tạo Prisma Client"
npx prisma generate

info "Đang kiểm tra kết nối database qua Prisma"
# Prisma 6.x yêu cầu --url (hoặc --schema) cho `db execute`; không tự lấy url từ file config.
if ! npx prisma db execute --url "$DATABASE_URL" --stdin <<SQL
SELECT 1;
SQL
then
  printf '[setup] Không kết nối được tới PostgreSQL server.\n' >&2
  printf '[setup] Kiểm tra %s:%s có truy cập được không, database "%s" đã tồn tại chưa, và thông tin đăng nhập có đúng không.\n' "$DB_HOST" "$DB_PORT" "$DB_NAME" >&2
  exit 1
fi

info "Đang đẩy Prisma schema"
npx prisma db push

info "Đang seed dữ liệu lab"
npm run db:seed

info "Hoàn tất. Khởi động app bằng: npm run dev"
info "Mở: http://${APP_HOST_VALUE}:3000"
