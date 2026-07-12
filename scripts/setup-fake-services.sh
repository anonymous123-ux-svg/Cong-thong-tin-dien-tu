#!/bin/bash
# =============================================================================
#  setup-fake-services.sh — Honeypot mở nhiều port DỊCH VỤ GIẢ (banner cho nmap)
# -----------------------------------------------------------------------------
#  File DUY NHẤT, tự chứa: nhúng luôn engine Python, cài systemd service để
#  chạy NGẦM và TỰ KHỞI ĐỘNG LẠI SAU KHI REBOOT.
#
#  Đặc điểm:
#    - Mở NHIỀU port dịch vụ giả (FTP/SMTP/MySQL/Redis/RDP/...) với banner để
#      nmap -sV fingerprint được.
#    - TỰ ĐỘNG BỎ QUA mọi port đang được dịch vụ THẬT chiếm trên server này
#      (bind thất bại -> skip), nên không đụng 22/80/3000 hay bất kỳ port nào
#      đang mở sẵn.
#
#  Cách dùng:
#     sudo bash setup-fake-services.sh            # cài + bật + chạy ngay
#     sudo bash setup-fake-services.sh uninstall  # gỡ service
#     systemctl status fake-services              # xem trạng thái
#     journalctl -u fake-services -f              # xem log realtime
#
#  CHỈ dùng cho mục đích giáo dục / CTF / red team trong môi trường được phép.
# =============================================================================
set -euo pipefail

SERVICE_NAME="fake-services"
INSTALL_DIR="/opt/fake-services"
ENGINE="$INSTALL_DIR/fake_services.py"
UNIT="/etc/systemd/system/${SERVICE_NAME}.service"

if [ "$(id -u)" != "0" ]; then
    echo "[!] Script này cần quyền root. Chạy: sudo bash setup-fake-services.sh"
    exit 1
fi

# ---------------------------------------------------------------------------
#  Gỡ cài đặt
# ---------------------------------------------------------------------------
if [ "${1:-}" = "uninstall" ]; then
    echo "[*] Đang gỡ ${SERVICE_NAME}..."
    systemctl disable --now "$SERVICE_NAME" 2>/dev/null || true
    rm -f "$UNIT"
    systemctl daemon-reload
    rm -rf "$INSTALL_DIR"
    echo "[+] Đã gỡ ${SERVICE_NAME}."
    exit 0
fi

echo "[*] Cài đặt honeypot dịch vụ giả -> ${INSTALL_DIR}"
mkdir -p "$INSTALL_DIR"

# ---------------------------------------------------------------------------
#  Ghi engine Python (nhúng thẳng vào script này)
# ---------------------------------------------------------------------------
cat > "$ENGINE" << 'PYEOF'
#!/usr/bin/env python3
"""
fake_services.py — Mở nhiều port ảo với banner dịch vụ giả để nmap fingerprint.
Chỉ dùng thư viện chuẩn Python, không phụ thuộc gì thêm.

Điểm quan trọng: nếu một port đã được DỊCH VỤ THẬT chiếm, bind sẽ thất bại và
port đó tự động bị BỎ QUA -> honeypot không bao giờ đụng dịch vụ đang mở sẵn.
"""

import socket
import threading
import sys
import signal

# port -> banner giả (thứ nmap đọc để đoán dịch vụ). Danh sách rộng, các port
# đang mở sẵn trên server (22/80/3000/...) sẽ tự bị skip khi bind thất bại.
DEFAULT_SERVICES = {
    21:    b"220 (vsFTPd 3.0.5)\r\n",                              # FTP
    23:    b"\xff\xfd\x18\xff\xfd\x1f Ubuntu login: ",            # Telnet
    25:    b"220 mail.local ESMTP Postfix\r\n",                    # SMTP
    53:    b"",                                                     # DNS (mở port)
    110:   b"+OK POP3 ready\r\n",                                  # POP3
    111:   b"",                                                     # rpcbind
    135:   b"",                                                     # MSRPC
    139:   b"",                                                     # NetBIOS
    143:   b"* OK IMAP4rev1 Service Ready\r\n",                    # IMAP
    389:   b"",                                                     # LDAP
    443:   b"",                                                     # HTTPS
    445:   b"",                                                     # SMB
    465:   b"220 mail.local ESMTP\r\n",                            # SMTPS
    587:   b"220 mail.local ESMTP Postfix\r\n",                    # Submission
    993:   b"",                                                     # IMAPS
    995:   b"",                                                     # POP3S
    1433:  b"",                                                     # MSSQL
    1521:  b"",                                                     # Oracle
    2049:  b"",                                                     # NFS
    2181:  b"",                                                     # Zookeeper
    3306:  b"\x4a\x00\x00\x00\x0a5.7.42-log\x00",                  # MySQL
    3389:  b"",                                                     # RDP
    5432:  b"",                                                     # PostgreSQL
    5601:  b"HTTP/1.1 200 OK\r\nServer: kibana\r\n\r\n",           # Kibana
    5900:  b"RFB 003.008\n",                                       # VNC
    5985:  b"",                                                     # WinRM
    6379:  b"-ERR unknown command\r\n",                            # Redis
    8080:  b"HTTP/1.1 200 OK\r\nServer: Apache/2.4.52\r\n\r\n",    # HTTP-alt
    8443:  b"",                                                     # HTTPS-alt
    9000:  b"",                                                     # PHP-FPM / misc
    9092:  b"",                                                     # Kafka
    9200:  b"HTTP/1.1 200 OK\r\nContent-Type: application/json\r\n\r\n",  # Elasticsearch
    11211: b"",                                                     # Memcached
    15672: b"HTTP/1.1 200 OK\r\nServer: RabbitMQ\r\n\r\n",         # RabbitMQ mgmt
    27017: b"",                                                     # MongoDB
}

stop = threading.Event()


def handle_client(conn, banner):
    """Gửi banner rồi đọc/đáp cầm chừng để nmap -sV có gì mà đọc."""
    try:
        if banner:
            conn.sendall(banner)
        conn.settimeout(2)
        try:
            data = conn.recv(1024)
            if data and banner:
                conn.sendall(banner)
        except socket.timeout:
            pass
    except OSError:
        pass
    finally:
        try:
            conn.close()
        except OSError:
            pass


def serve_port(port, banner):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    try:
        s.bind(("0.0.0.0", port))
    except PermissionError:
        print(f"[!] Port {port}: cần quyền root", flush=True)
        return
    except OSError as e:
        # Port đang được dịch vụ thật chiếm -> bỏ qua, không đụng vào.
        print(f"[-] Port {port}: bỏ qua ({e})", flush=True)
        return
    s.listen(50)
    s.settimeout(1)
    print(f"[+] Đang mở port {port}", flush=True)
    while not stop.is_set():
        try:
            conn, _ = s.accept()
        except socket.timeout:
            continue
        except OSError:
            break
        threading.Thread(
            target=handle_client, args=(conn, banner), daemon=True
        ).start()
    s.close()


def main():
    args = sys.argv[1:]
    if args:
        services = {int(a): DEFAULT_SERVICES.get(int(a), b"") for a in args}
    else:
        services = dict(DEFAULT_SERVICES)

    def on_sig(*_):
        print("\n[*] Đang dừng...", flush=True)
        stop.set()

    signal.signal(signal.SIGINT, on_sig)
    signal.signal(signal.SIGTERM, on_sig)

    for port, banner in sorted(services.items()):
        threading.Thread(
            target=serve_port, args=(port, banner), daemon=True
        ).start()

    print(f"[*] Đã cố mở {len(services)} port dịch vụ giả "
          f"(port đang dùng sẽ tự bị bỏ qua).", flush=True)

    try:
        while not stop.is_set():
            stop.wait(1)
    finally:
        stop.set()
        print("[*] Đã đóng tất cả port.", flush=True)


if __name__ == "__main__":
    main()
PYEOF
chmod +x "$ENGINE"

PYTHON="$(command -v python3)"
if [ -z "$PYTHON" ]; then
    echo "[!] Không tìm thấy python3. Cài: apt-get install -y python3"
    exit 1
fi

# ---------------------------------------------------------------------------
#  Tạo systemd unit -> chạy ngầm + tự bật khi reboot
# ---------------------------------------------------------------------------
echo "[*] Tạo systemd service ${SERVICE_NAME}..."
cat > "$UNIT" << EOF
[Unit]
Description=Fake services honeypot (banner cho nmap - lab)
After=network.target

[Service]
Type=simple
ExecStart=${PYTHON} ${ENGINE}
Restart=on-failure
RestartSec=3
# Đợi network sẵn sàng để bind cổng ổn định sau khi boot
ExecStartPre=/bin/sleep 2

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable "$SERVICE_NAME" >/dev/null 2>&1
systemctl restart "$SERVICE_NAME"

sleep 3
echo ""
if systemctl is-active --quiet "$SERVICE_NAME"; then
    echo "[+] ${SERVICE_NAME} đang chạy NGẦM và sẽ tự bật lại sau REBOOT."
else
    echo "[!] ${SERVICE_NAME} chưa chạy. Xem: journalctl -u ${SERVICE_NAME} -n 30"
    exit 1
fi

echo ""
echo "  Trạng thái : sudo systemctl status ${SERVICE_NAME}"
echo "  Log        : sudo journalctl -u ${SERVICE_NAME} -f"
echo "  Gỡ bỏ      : sudo bash setup-fake-services.sh uninstall"
echo ""
echo "  Thử scan từ máy khác:  nmap -sV <IP-server>"
