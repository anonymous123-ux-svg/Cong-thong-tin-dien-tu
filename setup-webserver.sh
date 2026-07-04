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

# Build da aplicação Next.js
echo "[*] Fazendo build da aplicação Next.js..."
npm run build

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

echo "[+] Apache configurado com sucesso na porta 80!"
echo "[+] Próximo passo: Iniciar a aplicação Next.js com 'npm start'"
echo ""
echo "Para iniciar manualmente a aplicação:"
echo "  cd $PROJECT_DIR"
echo "  npm start"
