#!/bin/bash
# Setup apenas do Apache (proxy reverso para o Next.js)
# Este script configura SOMENTE o servidor web Apache.
# A aplicação Next.js deve ser iniciada manualmente com `npm run dev`
# (o Apache faz proxy da porta 80 para a porta 3000).

set -e

# Diretório do projeto = diretório onde este script está (funciona em qualquer host)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[*] Iniciando setup do Apache..."
echo "[*] Diretório do projeto: ${PROJECT_DIR}"

# Atualizar sistema
echo "[*] Atualizando repositórios do sistema..."
apt-get update -y

# Instalar Apache2
echo "[*] Instalando Apache2..."
apt-get install -y apache2

# Habilitar módulos necessários
a2enmod proxy
a2enmod proxy_http
a2enmod rewrite
a2enmod headers
a2enmod autoindex   # necessário para a listagem de diretório em /backup

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

    # Proxy para a aplicação Next.js (iniciada manualmente com `npm run dev`)
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
echo ""
echo "Próximo passo: inicie a aplicação manualmente no diretório do projeto:"
echo "  cd ${PROJECT_DIR}"
echo "  npm run dev"
echo ""
echo "O Apache fará o proxy da porta 80 para a aplicação na porta 3000."
