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

def _http(status, headers, body=b"", version=b"1.1", close=True):
    """Dựng một HTTP response hợp lệ (có Content-Length) để nmap -sV đọc ra
    Server/version rõ ràng thay vì đoán mò. close=False bỏ header Connection
    (cần cho vài chữ ký nmap yêu cầu Content-Length ngay trước body)."""
    lines = [b"HTTP/" + version + b" " + status]
    lines += headers
    lines.append(b"Content-Length: %d" % len(body))
    if close:
        lines.append(b"Connection: close")
    return b"\r\n".join(lines) + b"\r\n\r\n" + body


# Reply kiểu Redis INFO: nmap khớp "redis_version:" -> hiện đúng version.
_REDIS_INFO = (
    b"# Server\r\nredis_version:7.0.11\r\nredis_mode:standalone\r\n"
    b"os:Linux 6.6.0 x86_64\r\narch_bits:64\r\n"
)
_REDIS = b"$%d\r\n%s\r\n" % (len(_REDIS_INFO), _REDIS_INFO)

# Body JSON của Elasticsearch (nmap khớp "You Know, for Search" + number).
_ES_BODY = (
    b'{\n  "name" : "es-node-01",\n  "cluster_name" : "elasticsearch",\n'
    b'  "cluster_uuid" : "kQ3lE1n2Rf6wSx9pZ0aBcd",\n'
    b'  "version" : {\n    "number" : "7.17.9",\n'
    b'    "build_flavor" : "default",\n    "build_type" : "deb",\n'
    b'    "lucene_version" : "8.11.1",\n'
    b'    "minimum_wire_compatibility_version" : "6.8.0",\n'
    b'    "minimum_index_compatibility_version" : "6.0.0-beta1"\n  },\n'
    b'  "tagline" : "You Know, for Search"\n}\n'
)
# nmap khớp Elasticsearch REST API: BẮT BUỘC "HTTP/1.0" và Content-Length phải
# đứng NGAY trước body (không chèn Connection ở giữa).
_ES = _http(b"200 OK",
            [b"content-type: application/json; charset=UTF-8"],
            _ES_BODY, version=b"1.0", close=False)

# Reply "stats" của Memcached: nmap khớp "STAT version X" -> hiện đúng version.
_MEMCACHED = (
    b"STAT pid 2114\r\nSTAT uptime 360421\r\nSTAT time 1700000000\r\n"
    b"STAT version 1.6.18\r\nSTAT pointer_size 64\r\nEND\r\n"
)

# port -> banner giả CÓ VERSION (thứ nmap -sV đọc để đoán dịch vụ + phiên bản).
# Danh sách rộng; port đang mở sẵn (22/80/3000/...) sẽ tự bị skip khi bind lỗi.
# Ghi chú: giao thức nhị phân/TLS thuần (SMB/LDAP/RDP/Oracle/HTTPS...) không thể
# giả version chỉ bằng banner tĩnh nên để trống -> nmap sẽ hiện tcpwrapped.
DEFAULT_SERVICES = {
    21:    b"220 (vsFTPd 3.0.5)\r\n",                              # FTP
    23:    b"\xff\xfd\x18\xff\xfd\x1f Ubuntu 22.04.3 LTS login: ", # Telnet
    25:    b"220 mail.dichvutracuu.local ESMTP Postfix (Ubuntu)\r\n",  # SMTP
    53:    b"",                                                     # DNS (nhị phân)
    110:   b"+OK Dovecot (Ubuntu) ready.\r\n",                     # POP3
    111:   b"",                                                     # rpcbind (RPC)
    135:   b"",                                                     # MSRPC (nhị phân)
    139:   b"",                                                     # NetBIOS (nhị phân)
    143:   b"* OK [CAPABILITY IMAP4rev1 SASL-IR LOGIN-REFERRALS ID ENABLE IDLE LITERAL+] Dovecot (Ubuntu) ready.\r\n",  # IMAP
    389:   b"",                                                     # LDAP (nhị phân)
    443:   b"",                                                     # HTTPS (TLS)
    445:   b"",                                                     # SMB (nhị phân)
    465:   b"220 mail.dichvutracuu.local ESMTP Postfix (Ubuntu)\r\n", # SMTPS
    587:   b"220 mail.dichvutracuu.local ESMTP Postfix (Ubuntu)\r\n", # Submission
    993:   b"",                                                     # IMAPS (TLS)
    995:   b"",                                                     # POP3S (TLS)
    1433:  b"",                                                     # MSSQL (nhị phân)
    1521:  b"",                                                     # Oracle (nhị phân)
    2049:  b"",                                                     # NFS (RPC)
    2181:  b"Zookeeper version: 3.7.1-standalone, built on 2023-01-15\n",  # Zookeeper
    3306:  b"\x4a\x00\x00\x00\x0a5.7.42-log\x00",                  # MySQL
    3389:  b"",                                                     # RDP (nhị phân)
    5432:  b"",                                                     # PostgreSQL (nhị phân)
    5601:  _http(b"302 Found", [b"location: /login?next=%2F",
                                b"kbn-name: kibana",
                                b"kbn-version: 7.17.9",
                                b"content-type: text/html; charset=utf-8"]),  # Kibana
    5900:  b"RFB 003.008\n",                                       # VNC
    5985:  _http(b"404 Not Found",
                 [b"Content-Type: text/html; charset=us-ascii",
                  b"Server: Microsoft-HTTPAPI/2.0"]),               # WinRM
    6379:  _REDIS,                                                  # Redis
    8080:  _http(b"200 OK", [b"Server: nginx/1.24.0 (Ubuntu)",
                             b"Content-Type: text/html"],
                 b"<html><body><h1>It works!</h1></body></html>\n"),  # HTTP-alt
    8443:  b"",                                                     # HTTPS-alt (TLS)
    9000:  _http(b"200 OK", [b"Server: gunicorn/20.1.0",
                             b"Content-Type: text/html"],
                 b"<html><title>Portainer</title></html>\n"),      # HTTP misc
    9092:  b"",                                                     # Kafka (nhị phân)
    9200:  _ES,                                                    # Elasticsearch
    11211: _MEMCACHED,                                             # Memcached
    15672: _http(b"200 OK",
                 [b"Server: MochiWeb/1.5.1 (Any of you quaids got a smint?)",
                  b"Date: Mon, 12 Jul 2026 00:00:00 GMT",
                  b"Content-Type: text/html"],
                 b"<!DOCTYPE html><html><head><title>RabbitMQ Management</title>"
                 b"</head><body></body></html>\n", version=b"1.0"),  # RabbitMQ
    27017: b"",                                                     # MongoDB (nhị phân)
}

stop = threading.Event()


def handle_client(conn, banner):
    """Gửi banner ĐÚNG MỘT LẦN khi kết nối cho nmap -sV đọc.
    Gửi một lần (không gửi lặp) để response không nhân đôi làm nmap khớp sai."""
    try:
        if banner:
            conn.sendall(banner)
        conn.settimeout(2)
        try:
            conn.recv(1024)  # đọc probe của nmap để nó không reset sớm
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
# Khởi động SAU các dịch vụ THẬT (Apache/Next.js/SSH/PostgreSQL) để chúng bind
# cổng của mình trước; honeypot chỉ mở những cổng còn trống (bind-skip).
# After trên unit không tồn tại sẽ được bỏ qua an toàn.
After=network-online.target apache2.service nextjs-lab.service ssh.service sshd.service postgresql.service
Wants=network-online.target

[Service]
Type=simple
ExecStart=${PYTHON} ${ENGINE}
Restart=on-failure
RestartSec=3

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
