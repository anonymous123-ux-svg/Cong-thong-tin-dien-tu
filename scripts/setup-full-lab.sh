#!/bin/bash
# =============================================================================
#  Cài đặt hoàn chỉnh lab React2Shell-Web-Vulnerable
#  - Web server Apache (proxy tới Next.js + thư mục /backup bị lộ)
#  - OpenSSH server + tài khoản admin của repo (mật khẩu nằm trong rockyou)
# -----------------------------------------------------------------------------
#  CHỈ dùng cho mục đích giáo dục / CTF / red team trong môi trường được phép.
# =============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$(id -u)" != "0" ]; then
    echo "[!] Script này cần quyền root. Chạy: sudo bash setup-full-lab.sh"
    exit 1
fi

echo "========================================================"
echo "  [1/2] Cấu hình web server (Apache + Next.js + /backup)"
echo "========================================================"
bash "$SCRIPT_DIR/setup-webserver.sh"

echo ""
echo "========================================================"
echo "  [2/2] Cấu hình SSH (OpenSSH + tài khoản admin)"
echo "========================================================"
bash "$SCRIPT_DIR/setup-ssh.sh"

echo ""
echo "========================================================"
echo "  [+] Lab đã được cấu hình thành công!"
echo "========================================================"
echo ""
echo "  Ứng dụng Next.js đang chạy (service systemd 'nextjs-lab')"
echo "      sudo systemctl status nextjs-lab"
echo ""
echo "  Bề mặt tấn công bị lộ:"
echo "      Web  : http://localhost/            (portal)"
echo "      Leak : http://localhost/backup/     (directory listing)"
echo "      SSH  : ssh dpradmin@localhost       (mật khẩu trong rockyou)"
