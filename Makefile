.PHONY: help setup setup-web setup-ssh extract test bruteforce clean start stop status logs

# Cores para output
GREEN=\033[0;32m
BLUE=\033[0;34m
YELLOW=\033[1;33m
NC=\033[0m

help:
	@echo "$(BLUE)Security Lab - React2Shell Web Vulnerable$(NC)"
	@echo ""
	@echo "$(GREEN)Targets disponíveis:$(NC)"
	@echo "  $(YELLOW)setup$(NC)              - Setup completo do lab (webserver + SSH + credenciais)"
	@echo "  $(YELLOW)setup-web$(NC)          - Setup apenas do webserver (Apache + Node.js)"
	@echo "  $(YELLOW)setup-ssh$(NC)          - Setup apenas do SSH (OpenSSH + usuários)"
	@echo "  $(YELLOW)extract$(NC)            - Extrair credenciais expostas do /backup"
	@echo "  $(YELLOW)test$(NC)               - Testar configuração do lab"
	@echo "  $(YELLOW)bruteforce$(NC)         - Executar bruteforce SSH"
	@echo "  $(YELLOW)start$(NC)              - Iniciar aplicação (npm start)"
	@echo "  $(YELLOW)stop$(NC)               - Parar aplicação"
	@echo "  $(YELLOW)status$(NC)             - Ver status dos serviços"
	@echo "  $(YELLOW)logs$(NC)               - Ver logs do setup"
	@echo "  $(YELLOW)clean$(NC)              - Limpar arquivos temporários"
	@echo ""
	@echo "$(BLUE)Exemplos:$(NC)"
	@echo "  make setup                    # Setup completo com todas as etapas"
	@echo "  make setup && make start      # Setup + iniciar aplicação"
	@echo "  make test                     # Verificar se tudo está funcionando"
	@echo ""

setup: check-root
	@echo "$(GREEN)[*] Executando setup completo do lab...$(NC)"
	@sudo bash setup-full-lab.sh
	@echo "$(GREEN)[+] Setup concluído!$(NC)"
	@echo ""
	@echo "$(YELLOW)Próximos passos:$(NC)"
	@echo "  make start          - Iniciar a aplicação"
	@echo "  make test           - Testar configuração"
	@echo ""

setup-web: check-root
	@echo "$(GREEN)[*] Instalando webserver (Apache + Node.js)...$(NC)"
	@sudo bash setup-webserver.sh

setup-ssh: check-root
	@echo "$(GREEN)[*] Instalando SSH...$(NC)"
	@sudo bash setup-ssh.sh

extract:
	@echo "$(GREEN)[*] Extraindo credenciais expostas...$(NC)"
	@bash extract-credentials.sh
	@echo "$(GREEN)[+] Credenciais extraídas com sucesso!$(NC)"

test:
	@echo "$(GREEN)[*] Testando lab setup...$(NC)"
	@bash test-lab.sh

bruteforce:
	@echo "$(GREEN)[*] Iniciando bruteforce SSH...$(NC)"
	@bash bruteforce-ssh.sh localhost 22

start:
	@echo "$(GREEN)[*] Iniciando aplicação Next.js...$(NC)"
	@npm start

stop:
	@echo "$(YELLOW)[*] Parando serviços...$(NC)"
	@pkill -f "npm start" || true
	@pkill -f "node" || true
	@echo "$(GREEN)[+] Serviços parados.$(NC)"

status:
	@echo "$(BLUE)Status dos Serviços:$(NC)"
	@echo ""
	@echo "Apache2:"
	@sudo systemctl status apache2 --no-pager | grep "Active:" || echo "  Desativado"
	@echo ""
	@echo "SSH:"
	@sudo systemctl status ssh --no-pager | grep "Active:" || echo "  Desativado"
	@echo ""
	@echo "Next.js (porta 3000):"
	@lsof -i :3000 >/dev/null 2>&1 && echo "  ✓ Rodando" || echo "  ✗ Parado"
	@echo ""
	@echo "Apache Proxy (porta 80):"
	@curl -s -o /dev/null -w "  HTTP Status: %{http_code}\n" http://localhost/ || echo "  ✗ Não respondendo"

logs:
	@echo "$(BLUE)Setup Log:$(NC)"
	@test -f setup-lab.log && tail -50 setup-lab.log || echo "Arquivo log não encontrado"

clean:
	@echo "$(YELLOW)[*] Limpando arquivos temporários...$(NC)"
	@rm -f setup-lab.log
	@rm -rf .next
	@echo "$(GREEN)[+] Limpeza concluída.$(NC)"

check-root:
	@if [ "$$(id -u)" != "0" ]; then \
		echo "$(RED)[!] Este comando requer sudo. Execute:$(NC)"; \
		echo "    sudo make setup"; \
		exit 1; \
	fi

.DEFAULT_GOAL := help
