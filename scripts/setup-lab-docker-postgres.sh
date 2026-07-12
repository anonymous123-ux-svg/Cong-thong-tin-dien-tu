#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DB_HOST="${DB_HOST:-localhost}"
DB_PORT="${DB_PORT:-5432}"
DB_NAME="${DB_NAME:-dichvucong}"
DB_USER="${DB_USER:-postgres}"
DB_PASSWORD="${DB_PASSWORD:-postgres}"
APP_HOST="${APP_HOST:-127.0.0.1}"
AUTH_SECRET="${AUTH_SECRET:-k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH}"
DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

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

require_command docker
require_command npm
require_command npx

if [ ! -f .env ]; then
  info "Đang tạo .env từ .env.example"
  cp .env.example .env
fi

info "Đang ghi cấu hình PostgreSQL Docker cục bộ vào .env"
set_env "DATABASE_URL" "\"${DATABASE_URL}\""
set_env "AUTH_SECRET" "\"${AUTH_SECRET}\""
set_env "APP_HOST" "${APP_HOST}"
set_env "AUTH_TRUST_HOST" "true"
set_env "DB_INTERNAL_HOST" "172.20.0.5"
set_env "DB_USER" "readonly_auditor"
set_env "DB_PASS" "Learning@2026!"

# React 19-rc xung đột peer với @welldone-software/why-did-you-render (peer react@^19),
# nên bắt buộc dùng --legacy-peer-deps. Prisma đã ghim ^6.19.3 (hỗ trợ Node >=18.18).
if [ ! -d node_modules ]; then
  info "Đang cài đặt npm dependencies (React RC -> --legacy-peer-deps)"
  npm install --legacy-peer-deps
fi

info "Đang tạo Prisma Client"
npx prisma generate

info "Đang khởi động PostgreSQL bằng Docker Compose"
docker compose up -d db

info "Đang chờ PostgreSQL chấp nhận kết nối"
for attempt in $(seq 1 30); do
  if docker compose exec -T db pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; then
    break
  fi

  if [ "$attempt" -eq 30 ]; then
    printf '[setup] PostgreSQL không sẵn sàng kịp thời.\n' >&2
    docker compose ps
    exit 1
  fi

  sleep 2
done

info "Đang đẩy Prisma schema"
npx prisma db push

info "Đang seed dữ liệu lab"
npm run db:seed

info "Hoàn tất. Khởi động app bằng: npm run dev"
info "Mở: http://${APP_HOST}:3000"
