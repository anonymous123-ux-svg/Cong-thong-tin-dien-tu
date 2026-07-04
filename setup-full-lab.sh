#!/bin/bash
# =============================================================================
#  Setup completo do lab React2Shell-Web-Vulnerable
#  - Apache webserver (proxy Next.js + diretório /backup exposto)
#  - OpenSSH server + usuário admin do repo (senha vinda do rockyou)
# -----------------------------------------------------------------------------
#  Uso APENAS educacional / CTF / red team em ambiente autorizado.
# =============================================================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

if [ "$(id -u)" != "0" ]; then
    echo "[!] Este script precisa de root. Execute: sudo bash setup-full-lab.sh"
    exit 1
fi

echo "========================================================"
echo "  [1/2] Configurando o webserver (Apache + Next.js + /backup)"
echo "========================================================"
bash "$SCRIPT_DIR/setup-webserver.sh"

echo ""
echo "========================================================"
echo "  [2/2] Configurando o SSH (OpenSSH + usuário admin)"
echo "========================================================"
bash "$SCRIPT_DIR/setup-ssh.sh"

echo ""
echo "========================================================"
echo "  [+] Lab configurado com sucesso!"
echo "========================================================"
echo ""
echo "  A aplicação Next.js já está rodando (serviço systemd 'nextjs-lab')"
echo "      sudo systemctl status nextjs-lab"
echo ""
echo "  Superfície exposta:"
echo "      Web  : http://localhost/            (portal)"
echo "      Leak : http://localhost/backup/     (directory listing)"
echo "      SSH  : ssh dpradmin@localhost       (senha no rockyou)"
