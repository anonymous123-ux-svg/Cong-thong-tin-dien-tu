#!/bin/bash
# Setup OpenSSH Server + tài khoản admin của lab
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

echo "[*] Iniciando setup do OpenSSH Server..."

if [ "$(id -u)" != "0" ]; then
    echo "[!] Script precisa de root. Execute: sudo bash setup-ssh.sh"
    exit 1
fi

# ----- Instalar OpenSSH Server -----
echo "[*] Instalando openssh-server..."
apt-get update -y
apt-get install -y openssh-server

# ----- Habilitar autenticação por senha (necessário para o lab) -----
echo "[*] Habilitando PasswordAuthentication no sshd_config..."
SSHD_CONFIG="/etc/ssh/sshd_config"
cp "$SSHD_CONFIG" "${SSHD_CONFIG}.bak.$(date +%s)"
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/' "$SSHD_CONFIG"
if ! grep -q '^PasswordAuthentication yes' "$SSHD_CONFIG"; then
    echo "PasswordAuthentication yes" >> "$SSHD_CONFIG"
fi
# Alguns sistemas colocam a diretiva em drop-ins que sobrescrevem o principal
if [ -d /etc/ssh/sshd_config.d ]; then
    echo "PasswordAuthentication yes" > /etc/ssh/sshd_config.d/00-lab.conf
fi

# ----- Criar o usuário admin do lab -----
echo "[*] Criando usuário admin '${ADMIN_USER}'..."
if id "$ADMIN_USER" &>/dev/null; then
    echo "[i] Usuário '${ADMIN_USER}' já existe, apenas redefinindo a senha."
else
    useradd -m -s /bin/bash "$ADMIN_USER"
    # Dá privilégio sudo ao admin (pós-exploração / escalação)
    usermod -aG sudo "$ADMIN_USER"
fi

# Definir a senha (vinda do rockyou)
echo "${ADMIN_USER}:${ADMIN_PASS}" | chpasswd

# ----- (Opcional) confirmar que a senha está no rockyou -----
ROCKYOU=""
for candidate in /usr/share/wordlists/rockyou.txt /usr/share/wordlists/rockyou.txt.gz; do
    [ -f "$candidate" ] && ROCKYOU="$candidate" && break
done
if [ -n "$ROCKYOU" ]; then
    echo "[*] Verificando se a senha está no rockyou..."
    if [[ "$ROCKYOU" == *.gz ]]; then
        zgrep -qxF "$ADMIN_PASS" "$ROCKYOU" && echo "[+] OK: '${ADMIN_PASS}' está no rockyou." \
            || echo "[!] AVISO: '${ADMIN_PASS}' NÃO encontrado no rockyou local."
    else
        grep -qxF "$ADMIN_PASS" "$ROCKYOU" && echo "[+] OK: '${ADMIN_PASS}' está no rockyou." \
            || echo "[!] AVISO: '${ADMIN_PASS}' NÃO encontrado no rockyou local."
    fi
else
    echo "[i] rockyou.txt não encontrado localmente (a senha '${ADMIN_PASS}' faz parte da rockyou padrão)."
fi

# ----- Iniciar e habilitar o serviço SSH -----
echo "[*] Habilitando e reiniciando o serviço SSH..."
systemctl enable ssh 2>/dev/null || systemctl enable sshd 2>/dev/null || true
systemctl restart ssh 2>/dev/null || systemctl restart sshd 2>/dev/null || service ssh restart || true

echo ""
echo "[+] SSH configurado com sucesso!"
echo "    -------------------------------------------------"
echo "    Serviço : OpenSSH em 0.0.0.0:22"
echo "    Admin   : ${ADMIN_USER}"
echo "    Senha   : ${ADMIN_PASS}   (presente no rockyou.txt)"
echo "    -------------------------------------------------"
echo ""
echo "    O username '${ADMIN_USER}' está exposto em:"
echo "        http://localhost/backup/system-accounts.txt"
echo ""
echo "    Fluxo esperado do red team:"
echo "        1. Fuzzing web -> descobre /backup"
echo "        2. Lê system-accounts.txt -> obtém o username '${ADMIN_USER}'"
echo "        3. Brute-force SSH com rockyou -> descobre a senha"
echo ""
echo "    Teste rápido:"
echo "        ssh ${ADMIN_USER}@localhost"
