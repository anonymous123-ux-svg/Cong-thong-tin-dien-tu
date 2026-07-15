#!/usr/bin/env bash
set -euo pipefail

DEFAULT_DB_PORT="${DB_PORT:-5432}"
DEFAULT_DB_NAME="${DB_NAME:-dichvutracuu}"
DEFAULT_DB_USER="${LAB_DB_USER:-postgres}"
DEFAULT_DB_PASSWORD="${LAB_DB_PASSWORD:-postgres}"

# Tài khoản CHỈ-ĐỌC (readonly_auditor) — đây chính là cặp thông tin bị lộ trong
# file .env của máy app (DB_USER / DB_PASS). Người tấn công sau khi RCE và đọc
# .env sẽ dùng cặp này để pivot vào PostgreSQL nội bộ. Giá trị mặc định BẮT BUỘC
# phải khớp với .env.example và scripts/setup-lab-server-postgres.sh.
AUDITOR_USER_VALUE="${LAB_AUDITOR_USER:-readonly_auditor}"
AUDITOR_PASSWORD_VALUE="${LAB_AUDITOR_PASSWORD:-Learning@2026!}"

info() {
  printf '[install-db] %s\n' "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf '[install-db] Thiếu lệnh bắt buộc: %s\n' "$1" >&2
    exit 1
  fi
}

prompt_default() {
  local prompt="$1"
  local default_value="$2"
  local answer

  read -r -p "${prompt} [${default_value}]: " answer
  printf '%s' "${answer:-$default_value}"
}

if [ "$(id -u)" -eq 0 ]; then
  SUDO=""
else
  require_command sudo
  SUDO="sudo"
fi

if ! command -v apt-get >/dev/null 2>&1; then
  printf '[install-db] Script này hỗ trợ server Ubuntu/Debian có apt-get.\n' >&2
  exit 1
fi

read -r -p "Nhập IP/CIDR của máy app được phép kết nối DB (VD: 192.168.95.128/32): " APP_CLIENT_CIDR
if [ -z "$APP_CLIENT_CIDR" ]; then
  printf '[install-db] Bắt buộc phải nhập IP/CIDR của máy app.\n' >&2
  exit 1
fi

DB_PORT_VALUE="$(prompt_default "Cổng PostgreSQL" "$DEFAULT_DB_PORT")"
DB_NAME_VALUE="$(prompt_default "Tên database" "$DEFAULT_DB_NAME")"
DB_USER_VALUE="$(prompt_default "User database" "$DEFAULT_DB_USER")"
DB_PASSWORD_VALUE="$(prompt_default "Mật khẩu database" "$DEFAULT_DB_PASSWORD")"

info "Đang cài đặt các gói PostgreSQL trên máy database này"
$SUDO apt-get update
$SUDO DEBIAN_FRONTEND=noninteractive apt-get install -y postgresql postgresql-contrib

require_command psql

PG_CONF="$(find /etc/postgresql -path '*/main/postgresql.conf' -print -quit)"
PG_HBA="$(find /etc/postgresql -path '*/main/pg_hba.conf' -print -quit)"

if [ -z "$PG_CONF" ] || [ -z "$PG_HBA" ]; then
  printf '[install-db] Không tìm thấy file cấu hình chính của PostgreSQL.\n' >&2
  exit 1
fi

info "Đang cấu hình PostgreSQL để lắng nghe kết nối từ máy app từ xa"
$SUDO sed -i "s/^#\?listen_addresses\s*=.*/listen_addresses = '*'/" "$PG_CONF"
$SUDO sed -i "s/^#\?port\s*=.*/port = ${DB_PORT_VALUE}/" "$PG_CONF"

HBA_LINE="host    ${DB_NAME_VALUE}    ${DB_USER_VALUE}    ${APP_CLIENT_CIDR}    scram-sha-256"
if ! $SUDO grep -Fqx "$HBA_LINE" "$PG_HBA"; then
  printf '%s\n' "$HBA_LINE" | $SUDO tee -a "$PG_HBA" >/dev/null
fi

# pg_hba cho tài khoản chỉ-đọc readonly_auditor (cùng subnet với máy app, vì
# người tấn công đã có foothold trên máy app khi đọc được .env).
AUDITOR_HBA_LINE="host    ${DB_NAME_VALUE}    ${AUDITOR_USER_VALUE}    ${APP_CLIENT_CIDR}    scram-sha-256"
if ! $SUDO grep -Fqx "$AUDITOR_HBA_LINE" "$PG_HBA"; then
  printf '%s\n' "$AUDITOR_HBA_LINE" | $SUDO tee -a "$PG_HBA" >/dev/null
fi

info "Đang tạo database và user (app: ${DB_USER_VALUE}, chỉ-đọc: ${AUDITOR_USER_VALUE})"
$SUDO -u postgres psql \
  -v ON_ERROR_STOP=1 \
  -v db_name="$DB_NAME_VALUE" \
  -v db_user="$DB_USER_VALUE" \
  -v db_password="$DB_PASSWORD_VALUE" \
  -v auditor_user="$AUDITOR_USER_VALUE" \
  -v auditor_password="$AUDITOR_PASSWORD_VALUE" <<'SQL'
SELECT format('CREATE DATABASE %I', :'db_name')
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = :'db_name') \gexec

SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'db_user', :'db_password')
WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = :'db_user') \gexec

SELECT format('ALTER ROLE %I LOGIN PASSWORD %L', :'db_user', :'db_password') \gexec
SELECT format('GRANT ALL PRIVILEGES ON DATABASE %I TO %I', :'db_name', :'db_user') \gexec

-- Tài khoản chỉ-đọc readonly_auditor (thông tin bị lộ trong .env)
SELECT format('CREATE ROLE %I LOGIN PASSWORD %L', :'auditor_user', :'auditor_password')
WHERE NOT EXISTS (SELECT FROM pg_roles WHERE rolname = :'auditor_user') \gexec

SELECT format('ALTER ROLE %I LOGIN PASSWORD %L', :'auditor_user', :'auditor_password') \gexec
SELECT format('GRANT CONNECT ON DATABASE %I TO %I', :'db_name', :'auditor_user') \gexec
SQL

$SUDO -u postgres psql -v ON_ERROR_STOP=1 -d "$DB_NAME_VALUE" \
  -v db_user="$DB_USER_VALUE" \
  -v auditor_user="$AUDITOR_USER_VALUE" <<'SQL'
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SELECT format('GRANT ALL ON SCHEMA public TO %I', :'db_user') \gexec
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO :"db_user";
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO :"db_user";

-- readonly_auditor: CHỈ được SELECT (mô phỏng tài khoản kiểm toán chỉ-đọc).
-- Cấp cho các bảng đã tồn tại...
SELECT format('GRANT USAGE ON SCHEMA public TO %I', :'auditor_user') \gexec
SELECT format('GRANT SELECT ON ALL TABLES IN SCHEMA public TO %I', :'auditor_user') \gexec
SELECT format('GRANT SELECT ON ALL SEQUENCES IN SCHEMA public TO %I', :'auditor_user') \gexec
-- ...và cho cả bảng do app (role db_user) tạo về sau qua `prisma db push`,
-- nhờ default privileges gắn theo role tạo bảng.
ALTER DEFAULT PRIVILEGES FOR ROLE :"db_user" IN SCHEMA public GRANT SELECT ON TABLES TO :"auditor_user";
ALTER DEFAULT PRIVILEGES FOR ROLE :"db_user" IN SCHEMA public GRANT SELECT ON SEQUENCES TO :"auditor_user";
SQL

info "Đang khởi động lại PostgreSQL"
$SUDO systemctl enable postgresql
$SUDO systemctl restart postgresql
$SUDO systemctl --no-pager --full status postgresql >/dev/null

if command -v ufw >/dev/null 2>&1 && $SUDO ufw status | grep -qi '^Status: active'; then
  info "Đang mở PostgreSQL qua ufw cho ${APP_CLIENT_CIDR}"
  $SUDO ufw allow from "$APP_CLIENT_CIDR" to any port "$DB_PORT_VALUE" proto tcp
fi

SERVER_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"

info "PostgreSQL đã sẵn sàng trên server này."
info "Dùng DATABASE_URL sau đây từ máy app:"
info "postgresql://${DB_USER_VALUE}:${DB_PASSWORD_VALUE}@${SERVER_IP:-<DATABASE_SERVER_IP>}:${DB_PORT_VALUE}/${DB_NAME_VALUE}"
info ""
info "Tài khoản CHỈ-ĐỌC (post-exploitation, khớp DB_USER/DB_PASS trong .env):"
info "  psql -h ${SERVER_IP:-<DATABASE_SERVER_IP>} -p ${DB_PORT_VALUE} -U ${AUDITOR_USER_VALUE} -d ${DB_NAME_VALUE}"
info "  mật khẩu: ${AUDITOR_PASSWORD_VALUE}"
