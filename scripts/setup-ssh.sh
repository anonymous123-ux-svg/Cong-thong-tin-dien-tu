#!/bin/bash
# Cài đặt OpenSSH Server + tài khoản admin của lab
# -----------------------------------------------------------------------------
# LƯU Ý: Script này tạo ra một máy chủ SSH CỐ TÌNH YẾU (mật khẩu nằm trong
# rockyou.txt) để phục vụ huấn luyện red team / CTF trong môi trường được phép.
# KHÔNG dùng cấu hình này cho hệ thống thật.
# -----------------------------------------------------------------------------
set -e

# ----- Cấu hình tài khoản admin -----
# Username này chính là tài khoản admin bị lộ trong /backup/system-accounts.txt
ADMIN_USER="dpradmin"
# Mật khẩu nằm trong wordlist rockyou.txt -> red team brute-force được.
ADMIN_PASS="arsenal"

echo "[*] Bắt đầu cài đặt OpenSSH Server..."

if [ "$(id -u)" != "0" ]; then
    echo "[!] Script cần quyền root. Chạy: sudo bash setup-ssh.sh"
    exit 1
fi

# ----- Cài đặt OpenSSH Server -----
echo "[*] Đang cài đặt openssh-server..."
apt-get update -y
apt-get install -y openssh-server

# ----- Bật xác thực bằng mật khẩu (cần thiết cho lab) -----
echo "[*] Đang bật PasswordAuthentication trong sshd_config..."
SSHD_CONFIG="/etc/ssh/sshd_config"
cp "$SSHD_CONFIG" "${SSHD_CONFIG}.bak.$(date +%s)"
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' "$SSHD_CONFIG"
if ! grep -q '^PasswordAuthentication yes' "$SSHD_CONFIG"; then
    echo "PasswordAuthentication yes" >> "$SSHD_CONFIG"
fi
# Một số hệ thống đặt directive trong drop-in file ghi đè lên file chính
if [ -d /etc/ssh/sshd_config.d ]; then
    echo "PasswordAuthentication yes" > /etc/ssh/sshd_config.d/00-lab.conf
fi

# ----- Tạo tài khoản admin của lab -----
echo "[*] Đang tạo tài khoản admin '${ADMIN_USER}'..."
if id "$ADMIN_USER" &>/dev/null; then
    echo "[i] Tài khoản '${ADMIN_USER}' đã tồn tại, chỉ đặt lại mật khẩu."
else
    useradd -m -s /bin/bash "$ADMIN_USER"
    # Cấp quyền sudo cho admin (phục vụ hậu khai thác / leo thang đặc quyền)
    usermod -aG sudo "$ADMIN_USER"
fi

# Đặt mật khẩu (lấy từ rockyou)
echo "${ADMIN_USER}:${ADMIN_PASS}" | chpasswd

# ----- (Tùy chọn) xác nhận mật khẩu có trong rockyou -----
ROCKYOU=""
for candidate in /usr/share/wordlists/rockyou.txt /usr/share/wordlists/rockyou.txt.gz; do
    [ -f "$candidate" ] && ROCKYOU="$candidate" && break
done
if [ -n "$ROCKYOU" ]; then
    echo "[*] Đang kiểm tra mật khẩu có trong rockyou không..."
    if [[ "$ROCKYOU" == *.gz ]]; then
        zgrep -qxF "$ADMIN_PASS" "$ROCKYOU" && echo "[+] OK: '${ADMIN_PASS}' có trong rockyou." \
            || echo "[!] CẢNH BÁO: '${ADMIN_PASS}' KHÔNG có trong rockyou cục bộ."
    else
        grep -qxF "$ADMIN_PASS" "$ROCKYOU" && echo "[+] OK: '${ADMIN_PASS}' có trong rockyou." \
            || echo "[!] CẢNH BÁO: '${ADMIN_PASS}' KHÔNG có trong rockyou cục bộ."
    fi
else
    echo "[i] Không tìm thấy rockyou.txt cục bộ (mật khẩu '${ADMIN_PASS}' vốn có trong rockyou chuẩn)."
fi

# ----- Khởi động và bật service SSH -----
echo "[*] Đang bật và khởi động lại service SSH..."
systemctl enable ssh 2>/dev/null || systemctl enable sshd 2>/dev/null || true
systemctl restart ssh 2>/dev/null || systemctl restart sshd 2>/dev/null || service ssh restart || true

echo ""
echo "[+] SSH đã được cấu hình thành công!"
echo "    -------------------------------------------------"
echo "    Service : OpenSSH tại 0.0.0.0:22"
echo "    Admin   : ${ADMIN_USER}"
echo "    Mật khẩu: ${ADMIN_PASS}   (có trong rockyou.txt)"
echo "    -------------------------------------------------"
echo ""
echo "    Username '${ADMIN_USER}' bị lộ tại:"
echo "        http://localhost/backup/system-accounts.txt"
echo ""
echo "    Luồng khai thác mong đợi của red team:"
echo "        1. Fuzzing web -> phát hiện /backup"
echo "        2. Đọc system-accounts.txt -> lấy được username '${ADMIN_USER}'"
echo "        3. Brute-force SSH bằng rockyou -> tìm ra mật khẩu"
echo ""
echo "    Kiểm tra nhanh:"
echo "        ssh ${ADMIN_USER}@localhost"
