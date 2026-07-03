#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

DEFAULT_DB_PORT="${DB_PORT:-5432}"
DEFAULT_DB_NAME="${DB_NAME:-dichvucong}"
DEFAULT_DB_USER="${DB_USER:-postgres}"
DEFAULT_DB_PASSWORD="${DB_PASSWORD:-postgres}"
DEFAULT_APP_HOST="${APP_HOST:-127.0.0.1}"
AUTH_SECRET="${AUTH_SECRET:-k8sJ3mP9xR2vL5nQ7wF0yT4uA6bD1eH}"

info() {
  printf '[setup] %s\n' "$1"
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    printf '[setup] Missing required command: %s\n' "$1" >&2
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
  info "Creating .env from .env.example"
  cp .env.example .env
fi

read -r -p "Nhap IP/hostname cua database server PostgreSQL: " DB_HOST
if [ -z "$DB_HOST" ]; then
  printf '[setup] Database server IP/hostname is required.\n' >&2
  exit 1
fi

DB_PORT="$(prompt_default "PostgreSQL port" "$DEFAULT_DB_PORT")"
DB_NAME="$(prompt_default "Database name" "$DEFAULT_DB_NAME")"
DB_USER_NAME="$(prompt_default "Database user" "$DEFAULT_DB_USER")"
DB_PASSWORD_VALUE="$(prompt_default "Database password" "$DEFAULT_DB_PASSWORD")"
APP_HOST_VALUE="$(prompt_default "APP_HOST cua may chay lab" "$DEFAULT_APP_HOST")"
DATABASE_URL="postgresql://${DB_USER_NAME}:${DB_PASSWORD_VALUE}@${DB_HOST}:${DB_PORT}/${DB_NAME}"

info "Writing PostgreSQL server configuration to .env"
set_env "DATABASE_URL" "\"${DATABASE_URL}\""
set_env "AUTH_SECRET" "\"${AUTH_SECRET}\""
set_env "APP_HOST" "${APP_HOST_VALUE}"
set_env "AUTH_TRUST_HOST" "true"
set_env "DB_INTERNAL_HOST" "${DB_HOST}"
set_env "DB_USER" "readonly_auditor"
set_env "DB_PASS" "Learning@2026!"

if [ ! -d node_modules ]; then
  info "Installing npm dependencies"
  npm install
fi

info "Checking database connection through Prisma"
if ! npx prisma db execute --stdin <<SQL
SELECT 1;
SQL
then
  printf '[setup] Cannot connect to PostgreSQL server.\n' >&2
  printf '[setup] Check that %s:%s is reachable, database "%s" exists, and the credentials are correct.\n' "$DB_HOST" "$DB_PORT" "$DB_NAME" >&2
  exit 1
fi

info "Pushing Prisma schema"
npx prisma db push

info "Seeding lab data"
npm run db:seed

info "Done. Start the app with: npm run dev"
info "Open: http://${APP_HOST_VALUE}:3000"
