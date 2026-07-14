#!/bin/bash
# Chỉ cài đặt Apache (reverse proxy tới Next.js)
# Script này CHỈ cấu hình web server Apache.
# Ứng dụng Next.js phải được khởi động thủ công bằng `npm run dev`
# (Apache làm proxy từ cổng 80 sang cổng 3000).

set -e

# Thư mục dự án = thư mục gốc của repo (script này nằm trong scripts/)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "[*] Bắt đầu cài đặt Apache..."
echo "[*] Thư mục dự án: ${PROJECT_DIR}"

# Cập nhật hệ thống
echo "[*] Đang cập nhật repository của hệ thống..."
apt-get update -y

# Cài đặt Apache2
echo "[*] Đang cài đặt Apache2..."
apt-get install -y apache2

# Cài đặt PostgreSQL client (psql) trên web server.
# Cho phép người tấn công, sau khi RCE và đọc .env, dùng ngay `psql` để pivot
# vào PostgreSQL nội bộ bằng thông tin readonly_auditor bị lộ.
echo "[*] Đang cài đặt PostgreSQL client (psql)..."
apt-get install -y postgresql-client

# Bật các module cần thiết
a2enmod proxy
a2enmod proxy_http
a2enmod rewrite
a2enmod headers
a2enmod autoindex   # cần cho việc liệt kê thư mục tại /backup

# Xuất bản các file "backup" bị lộ (lỗ hổng mô phỏng)
echo "[*] Đang xuất bản thư mục /backup bị lộ..."
BACKUP_SRC="$PROJECT_DIR/public/backup"
BACKUP_WEB="/var/www/backup"
mkdir -p "$BACKUP_WEB"
cp -f "$BACKUP_SRC"/*.txt "$BACKUP_WEB"/ 2>/dev/null || true
chown -R www-data:www-data "$BACKUP_WEB"
chmod -R 755 "$BACKUP_WEB"

# Tạo file cấu hình Apache cho Next.js
echo "[*] Đang cấu hình Virtual Host của Apache..."
cat > /etc/apache2/sites-available/nextjs-app.conf << 'EOF'
<VirtualHost *:80>
    ServerName localhost
    ServerAdmin admin@localhost

    # --- UTF-8: hiển thị đúng nội dung tiếng Việt ---
    # Gửi "; charset=UTF-8" cho trang liệt kê /backup và các file .txt.
    AddDefaultCharset UTF-8
    AddCharset UTF-8 .txt

    # --- Thư mục /backup BỊ LỘ (lỗ hổng: directory listing) ---
    # Do Apache phục vụ trực tiếp (ngoài proxy) với listing được bật.
    Alias /backup /var/www/backup
    <Directory /var/www/backup>
        Options +Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
        IndexOptions FancyIndexing HTMLTable NameWidth=* SuppressColumnSorting
    </Directory>
    # Loại /backup khỏi proxy tới Next.js (phải đặt TRƯỚC ProxyPass /)
    ProxyPass /backup !

    # Proxy tới ứng dụng Next.js (khởi động thủ công bằng `npm run dev`)
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    # Các header cần thiết
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-For "%{REMOTE_ADDR}s"

    # Log
    ErrorLog ${APACHE_LOG_DIR}/nextjs-app-error.log
    CustomLog ${APACHE_LOG_DIR}/nextjs-app-access.log combined
</VirtualHost>
EOF

# Tắt site mặc định
a2dissite 000-default

# Bật site mới
a2ensite nextjs-app

# Kiểm tra cấu hình Apache
echo "[*] Đang kiểm tra cấu hình Apache..."
apache2ctl configtest

# Khởi động lại Apache
echo "[*] Đang khởi động lại Apache..."
systemctl restart apache2

echo "[+] Apache đã được cấu hình thành công trên cổng 80!"
echo ""
echo "Bước tiếp theo: khởi động ứng dụng thủ công trong thư mục dự án:"
echo "  cd ${PROJECT_DIR}"
echo "  npm run dev"
echo ""
echo "Apache sẽ proxy từ cổng 80 sang ứng dụng ở cổng 3000."
