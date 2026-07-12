.PHONY: help setup setup-web setup-ssh extract test bruteforce clean start stop status logs

# Màu cho output
GREEN=\033[0;32m
BLUE=\033[0;34m
YELLOW=\033[1;33m
NC=\033[0m

help:
	@echo "$(BLUE)Security Lab - React2Shell Web Vulnerable$(NC)"
	@echo ""
	@echo "$(GREEN)Các target khả dụng:$(NC)"
	@echo "  $(YELLOW)setup$(NC)              - Cài đặt hoàn chỉnh lab (webserver + SSH + thông tin đăng nhập)"
	@echo "  $(YELLOW)setup-web$(NC)          - Chỉ cài đặt webserver (Apache reverse proxy)"
	@echo "  $(YELLOW)setup-ssh$(NC)          - Chỉ cài đặt SSH (OpenSSH + tài khoản)"
	@echo "  $(YELLOW)extract$(NC)            - Trích xuất thông tin đăng nhập bị lộ từ /backup"
	@echo "  $(YELLOW)test$(NC)               - Kiểm tra cấu hình lab"
	@echo "  $(YELLOW)bruteforce$(NC)         - Chạy bruteforce SSH"
	@echo "  $(YELLOW)start$(NC)              - Khởi động ứng dụng (service nextjs-lab)"
	@echo "  $(YELLOW)stop$(NC)               - Dừng ứng dụng"
	@echo "  $(YELLOW)status$(NC)             - Xem trạng thái các service"
	@echo "  $(YELLOW)logs$(NC)               - Xem log cài đặt"
	@echo "  $(YELLOW)clean$(NC)              - Dọn dẹp file tạm"
	@echo ""
	@echo "$(BLUE)Ví dụ:$(NC)"
	@echo "  make setup                    # Cài đặt hoàn chỉnh tất cả các bước"
	@echo "  make setup && make start      # Cài đặt + khởi động ứng dụng"
	@echo "  make test                     # Kiểm tra mọi thứ có hoạt động không"
	@echo ""

setup: check-root
	@echo "$(GREEN)[*] Đang chạy cài đặt hoàn chỉnh lab...$(NC)"
	@sudo bash scripts/setup-full-lab.sh
	@echo "$(GREEN)[+] Cài đặt hoàn tất! Ứng dụng đang chạy (service nextjs-lab)$(NC)"
	@echo ""
	@echo "$(YELLOW)Các bước tiếp theo:$(NC)"
	@echo "  make test           - Kiểm tra cấu hình"
	@echo ""

setup-web: check-root
	@echo "$(GREEN)[*] Đang cài đặt webserver (Apache reverse proxy)...$(NC)"
	@sudo bash scripts/setup-webserver.sh

setup-ssh: check-root
	@echo "$(GREEN)[*] Đang cài đặt SSH...$(NC)"
	@sudo bash scripts/setup-ssh.sh

extract:
	@echo "$(GREEN)[*] Đang trích xuất thông tin đăng nhập bị lộ...$(NC)"
	@bash scripts/extract-credentials.sh
	@echo "$(GREEN)[+] Trích xuất thông tin đăng nhập thành công!$(NC)"

test:
	@echo "$(GREEN)[*] Đang kiểm tra cài đặt lab...$(NC)"
	@bash scripts/test-lab.sh

bruteforce:
	@echo "$(GREEN)[*] Đang bắt đầu bruteforce SSH...$(NC)"
	@bash scripts/bruteforce-ssh.sh localhost 22

start:
	@echo "$(GREEN)[*] Đang khởi động ứng dụng Next.js (nextjs-lab)...$(NC)"
	@sudo systemctl start nextjs-lab

stop:
	@echo "$(YELLOW)[*] Đang dừng các service...$(NC)"
	@sudo systemctl stop nextjs-lab || true
	@echo "$(GREEN)[+] Đã dừng các service.$(NC)"

status:
	@echo "$(BLUE)Trạng thái các service:$(NC)"
	@echo ""
	@echo "Apache2:"
	@sudo systemctl status apache2 --no-pager | grep "Active:" || echo "  Đã tắt"
	@echo ""
	@echo "SSH:"
	@sudo systemctl status ssh --no-pager | grep "Active:" || echo "  Đã tắt"
	@echo ""
	@echo "Next.js (nextjs-lab):"
	@sudo systemctl status nextjs-lab --no-pager | grep "Active:" || echo "  Đã tắt"
	@echo ""
	@echo "Apache Proxy (cổng 80):"
	@curl -s -o /dev/null -w "  HTTP Status: %{http_code}\n" http://localhost/ || echo "  ✗ Không phản hồi"

logs:
	@echo "$(BLUE)Log cài đặt:$(NC)"
	@test -f setup-lab.log && tail -50 setup-lab.log || echo "Không tìm thấy file log"

clean:
	@echo "$(YELLOW)[*] Đang dọn dẹp file tạm...$(NC)"
	@rm -f setup-lab.log
	@rm -rf .next
	@echo "$(GREEN)[+] Dọn dẹp hoàn tất.$(NC)"

check-root:
	@if [ "$$(id -u)" != "0" ]; then \
		echo "$(RED)[!] Lệnh này cần quyền sudo. Chạy:$(NC)"; \
		echo "    sudo make setup"; \
		exit 1; \
	fi

.DEFAULT_GOAL := help
