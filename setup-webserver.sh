#!/bin/bash
# Setup Apache + Node.js + Next.js deployment
# Este script configura o servidor web Apache para executar a aplicação Next.js

set -e

# Diretório do projeto = diretório onde este script está (funciona em qualquer host)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[*] Iniciando setup do Apache + Next.js..."
echo "[*] Diretório do projeto: ${PROJECT_DIR}"

# Atualizar sistema
echo "[*] Atualizando repositórios do sistema..."
apt-get update -y

# Instalar Apache2 e módulos necessários
echo "[*] Instalando Apache2..."
apt-get install -y apache2

# Habilitar módulos necessários
a2enmod proxy
a2enmod proxy_http
a2enmod rewrite
a2enmod headers
a2enmod autoindex   # necessário para a listagem de diretório em /backup

# Instalar Node.js e npm (se não estiver instalado)
if ! command -v node &> /dev/null; then
    echo "[*] Instalando Node.js e npm..."
    apt-get install -y curl
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# Instalar dependências do projeto
echo "[*] Instalando dependências do projeto..."
cd "$PROJECT_DIR"
npm install

# Publicar os arquivos de "backup" expostos (vulnerabilidade simulada)
echo "[*] Publicando diretório /backup exposto..."
BACKUP_SRC="$PROJECT_DIR/public/backup"
BACKUP_WEB="/var/www/backup"
mkdir -p "$BACKUP_WEB"
cp -f "$BACKUP_SRC"/*.txt "$BACKUP_WEB"/ 2>/dev/null || true
chown -R www-data:www-data "$BACKUP_WEB"
chmod -R 755 "$BACKUP_WEB"

# Criar arquivo de configuração do Apache para o Next.js
echo "[*] Configurando Virtual Host do Apache..."
cat > /etc/apache2/sites-available/nextjs-app.conf << 'EOF'
<VirtualHost *:80>
    ServerName localhost
    ServerAdmin admin@localhost

    # --- Diretório /backup EXPOSTO (vulnerabilidade: directory listing) ---
    # Servido diretamente pelo Apache (fora do proxy) com listagem habilitada.
    Alias /backup /var/www/backup
    <Directory /var/www/backup>
        Options +Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
        IndexOptions FancyIndexing HTMLTable NameWidth=* SuppressColumnSorting
    </Directory>
    # Excluir /backup do proxy para o Next.js (precisa vir ANTES do ProxyPass /)
    ProxyPass /backup !

    # Proxy para a aplicação Next.js
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    # Headers necessários
    RequestHeader set X-Forwarded-Proto "http"
    RequestHeader set X-Forwarded-For "%{REMOTE_ADDR}s"

    # Logs
    ErrorLog ${APACHE_LOG_DIR}/nextjs-app-error.log
    CustomLog ${APACHE_LOG_DIR}/nextjs-app-access.log combined
</VirtualHost>
EOF

# Desabilitar site padrão
a2dissite 000-default

# Habilitar novo site
a2ensite nextjs-app

# Testar configuração do Apache
echo "[*] Testando configuração do Apache..."
apache2ctl configtest

# Reiniciar Apache
echo "[*] Reiniciando Apache..."
systemctl restart apache2

# Rodar a aplicação Next.js em modo dev como serviço systemd
# (o "npm start"/"next start" exige um build de produção que falha
# nesta versão custom do Next.js; "next dev" funciona direto do código-fonte)
echo "[*] Configurando serviço systemd para 'npm run dev'..."
RUN_USER="${SUDO_USER:-root}"
NODE_BIN_DIR="$(dirname "$(command -v node)")"

cat > /etc/systemd/system/nextjs-lab.service << EOF
[Unit]
Description=Next.js lab app (npm run dev)
After=network.target

[Service]
Type=simple
User=${RUN_USER}
WorkingDirectory=${PROJECT_DIR}
Environment=PATH=${NODE_BIN_DIR}:/usr/bin:/bin
Environment=PORT=3000
ExecStart=$(command -v npm) run dev
Restart=on-failure
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now nextjs-lab

echo "[*] Aguardando a aplicação subir em 127.0.0.1:3000..."
for i in $(seq 1 30); do
    if curl -s -o /dev/null "http://127.0.0.1:3000/"; then
        echo "[+] Next.js respondendo em 127.0.0.1:3000!"
        break
    fi
    sleep 1
done

echo "[+] Apache configurado com sucesso na porta 80!"
echo "[+] Aplicação Next.js rodando via systemd (serviço 'nextjs-lab')"
echo ""
echo "Comandos úteis:"
echo "  sudo systemctl status nextjs-lab"
echo "  sudo journalctl -u nextjs-lab -f"
