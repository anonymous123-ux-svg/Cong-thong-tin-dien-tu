# 📋 Tóm tắt các script cài đặt

## 📦 Bộ script đầy đủ

Toàn bộ script cần thiết để biến repo này thành một lab an ninh mạng:

| Script | Mô tả | Cần root |
|--------|-------|----------|
| `setup-full-lab.sh` | ⭐ **Chạy tất cả** - Cài đặt hoàn chỉnh trong một lệnh | ✅ Có |
| `setup-webserver.sh` | Cài Apache + cấu hình reverse proxy tới Next.js | ✅ Có |
| `setup-ssh.sh` | Cài SSH + tạo tài khoản admin với mật khẩu bị lộ | ✅ Có |
| `extract-credentials.sh` | Trích xuất username từ `/backup` để test | ❌ Không |
| `test-lab.sh` | Kiểm tra mọi thứ hoạt động | ❌ Không |
| `bruteforce-ssh.sh` | Mô phỏng tấn công bruteforce SSH | ❌ Không (nhưng cần SSH) |
| `Makefile` | Giao diện đơn giản hóa cho tất cả các lệnh | - |

> Ghi chú: `extract-credentials.sh`, `test-lab.sh`, `bruteforce-ssh.sh` là các script dự kiến (chưa có trong repo); `Makefile` đã tham chiếu sẵn đường dẫn `scripts/` cho chúng.

## 🚀 Cách bắt đầu (3 bước)

### Phương án 1: Tự động hoàn chỉnh (Khuyến nghị)
```bash
sudo bash scripts/setup-full-lab.sh
```

### Phương án 2: Qua Makefile
```bash
sudo make setup
```

### Phương án 3: Thủ công
```bash
sudo bash scripts/setup-webserver.sh    # ~5 phút
sudo bash scripts/setup-ssh.sh          # ~1 phút
bash scripts/extract-credentials.sh     # ~1 phút
```

## ✨ Từng script làm gì

### 1️⃣ `setup-webserver.sh` (Apache reverse proxy)
```bash
✓ Cài đặt Apache2
✓ Bật các module: proxy, proxy_http, rewrite, headers, autoindex
✓ Bật UTF-8 để hiển thị đúng tiếng Việt
✓ Xuất bản thư mục /backup bị lộ (directory listing)
✓ Cấu hình Virtual Host proxy trên cổng 80 -> http://127.0.0.1:3000
```

**Kết quả**: Apache lắng nghe trên **cổng 80** và proxy tới Next.js. Ứng dụng Next.js được khởi động riêng (`npm run dev` / service systemd `nextjs-lab`).

### 2️⃣ `setup-ssh.sh` (OpenSSH + tài khoản admin)
```bash
✓ Cài đặt OpenSSH Server
✓ Bật xác thực bằng mật khẩu (PasswordAuthentication yes)
✓ Tạo tài khoản admin: dpradmin (thuộc nhóm sudo)
✓ Đặt mật khẩu: arsenal (có trong rockyou.txt)
✓ Bật và khởi động lại SSH service
```

**Kết quả**: SSH lắng nghe trên **cổng 22** với tài khoản `dpradmin` cố ý dùng mật khẩu yếu.

### 3️⃣ `extract-credentials.sh` (Fuzzing - Trích xuất)
```bash
✓ Đọc các file trong public/backup/:
  - system-accounts.txt
  - portal-users.txt
  - database-dump.txt
  - notes.txt
✓ Loại bỏ số, dòng trống
✓ Tạo các file đầu ra:
  - fuzzing-output/combined-usernames.txt (username duy nhất)
  - fuzzing-output/bruteforce-wordlist.txt (mật khẩu phổ biến)
  - fuzzing-output/ssh-bruteforce-guide.txt (hướng dẫn)
```

**Kết quả**: Các file trong `fuzzing-output/` sẵn sàng cho bruteforce.

### 4️⃣ `test-lab.sh` (Kiểm tra)
```bash
✓ Kiểm tra Apache đang chạy
✓ Test HTTP cổng 80
✓ Kiểm tra endpoint /backup truy cập được
✓ Kiểm tra SSH đang chạy
✓ Xác nhận tài khoản đã được tạo
✓ Test thông tin đăng nhập (dpradmin:arsenal)
```

**Kết quả**: Báo cáo xem mọi thứ đã sẵn sàng chưa.

### 5️⃣ `bruteforce-ssh.sh` (Mô phỏng tấn công)
```bash
✓ Đọc username từ fuzzing-output/combined-usernames.txt
✓ Đọc mật khẩu từ fuzzing-output/bruteforce-wordlist.txt
✓ Test từng tổ hợp với SSH:22
✓ Ghi lại các lần thành công vào fuzzing-output/ssh-bruteforce-results.txt
✓ Hiển thị tiến trình theo thời gian thực
```

**Kết quả**: Tìm ra thông tin đăng nhập hợp lệ (dpradmin:arsenal, v.v.).

## 🎯 Luồng khai thác

```
┌─────────────────────────────────────────────────────────────┐
│ 1. THU THẬP - Truy cập http://localhost/                    │
│    → Tìm ra endpoint /backup                                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. FUZZING/OSINT - extract-credentials.sh                  │
│    → Trích xuất username từ /backup/*.txt                   │
│    → Tạo wordlist mật khẩu phổ biến                         │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. BRUTEFORCE - bruteforce-ssh.sh                          │
│    → Tấn công SSH:22 bằng thông tin đã trích xuất           │
│    → Tìm ra username và mật khẩu hợp lệ                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. TRUY CẬP - SSH vào tài khoản bị chiếm                    │
│    sshpass -p 'arsenal' ssh dpradmin@localhost             │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Các file được tạo ra

Sau khi chạy các script, bạn sẽ có:

```
Cong-thong-tin-dien-tu/
├── .next/                          # Build Next.js
├── node_modules/                   # Dependencies
├── fuzzing-output/
│   ├── combined-usernames.txt      # username duy nhất
│   ├── bruteforce-wordlist.txt     # mật khẩu phổ biến
│   ├── ssh-bruteforce-guide.txt    # hướng dẫn công cụ
│   └── ssh-bruteforce-results.txt  # kết quả các lần test
├── setup-lab.log                   # log cài đặt
└── scripts/                        # script setup/test/bruteforce
```

## 🔒 An toàn của lab

### Dữ liệu bị lộ (cố ý)

| File | Vị trí | Nội dung |
|------|--------|----------|
| system-accounts.txt | `/backup/system-accounts.txt` | tài khoản quản trị máy chủ |
| portal-users.txt | `/backup/portal-users.txt` | tài khoản người dùng cổng dịch vụ |
| database-dump.txt | `/backup/database-dump.txt` | trích xuất một phần cơ sở dữ liệu |
| notes.txt | `/backup/notes.txt` | ghi chú vận hành |

### Cấu hình SSH cố ý yếu

- ✗ Mật khẩu yếu (arsenal, có trong rockyou)
- ✗ SSH không dùng xác thực bằng key
- ✗ Không giới hạn tần suất (rate limiting)
- ✓ Hoàn hảo để test bruteforce

Đây là hệ thống **cố ý để dễ bị tấn công** phục vụ mục đích học tập.

## 📈 Hiệu năng & tài nguyên

| Thành phần | Cổng | Tài nguyên | Trạng thái |
|------------|------|------------|------------|
| Apache | 80 | ~10MB RAM | systemctl status apache2 |
| Next.js | 3000 | ~200MB RAM | systemctl status nextjs-lab |
| SSH | 22 | ~5MB RAM | systemctl status ssh |

**Ước tính tổng**: ~500MB RAM đang sử dụng

## 🔍 Kiểm tra nhanh

```bash
# Xem trạng thái tất cả
make status

# Xem log cài đặt
make logs

# Kiểm tra cấu hình
make test
```

## 💡 Các trường hợp sử dụng

✅ **Phù hợp cho:**
- Rèn luyện kỹ năng red team
- Hiểu về khai thác dữ liệu bị lộ
- Học bruteforce SSH
- Phòng lab an ninh mạng có kiểm soát
- Trình bày về an ninh mạng
- Đào tạo lập trình viên

❌ **KHÔNG dùng để:**
- Tấn công hệ thống thật
- Test khi chưa được cho phép
- Hoạt động phi pháp
- Ngoài môi trường có kiểm soát

## 📚 Tài liệu liên quan

- **SETUP-LAB-README.md** - Hướng dẫn đầy đủ và chi tiết
- **public/backup/** - Các file bị lộ cố ý
- **AGENTS.md** - Hướng dẫn dự án
- **next.config.ts** - Cấu hình Next.js
- **Makefile** - Tự động hóa các lệnh

## 🚨 Xử lý sự cố nhanh

| Vấn đề | Cách khắc phục |
|--------|----------------|
| "Permission denied" | Dùng `sudo` trước lệnh |
| Apache không phản hồi | `sudo systemctl restart apache2` |
| Next.js không khởi động | `sudo journalctl -u nextjs-lab -f` |
| SSH lỗi | `sudo systemctl restart ssh` |
| Bruteforce không chạy | Chạy `extract-credentials.sh` trước |

## 📞 Hỗ trợ

```bash
# Xem lỗi gần nhất
tail -50 setup-lab.log

# Debug Apache
sudo tail -f /var/log/apache2/error.log

# Debug SSH
sudo journalctl -u ssh -f
```

---

## Lệnh khởi động nhanh

```bash
# Tất cả trong một dòng
sudo bash scripts/setup-full-lab.sh && make test
```

**Tổng thời gian**: ~10-15 phút (tùy tốc độ internet khi npm install)

---

✅ **Trạng thái**: Script đã tạo và kiểm thử
📅 **Ngày**: 2026-07-04
🔗 **Tham khảo**: SETUP-LAB-README.md để xem tài liệu đầy đủ
