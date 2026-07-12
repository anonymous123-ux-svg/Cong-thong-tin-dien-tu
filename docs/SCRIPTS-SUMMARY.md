# 📋 Sumário dos Scripts de Setup

## 📦 Pacote Completo

Todos os scripts necessários para transformar este repositório em um lab de segurança foram criados:

| Script | Descrição | Requer Root |
|--------|-----------|-----------|
| `setup-full-lab.sh` | ⭐ **Executa tudo** - Setup completo em um comando | ✅ Sim |
| `setup-webserver.sh` | Instala Apache + Node.js + Build Next.js | ✅ Sim |
| `setup-ssh.sh` | Instala SSH + cria usuários com senhas expostas | ✅ Sim |
| `extract-credentials.sh` | Extrai usernames de `/backup` para teste | ❌ Não |
| `test-lab.sh` | Valida que tudo está funcionando | ❌ Não |
| `bruteforce-ssh.sh` | Simula ataque SSH bruteforce | ❌ Não (mas precisa SSH) |
| `Makefile` | Interface simplificada para todos os commands | - |

## 🚀 Como Começar (3 Passos)

### Opção 1: Automático Completo (Recomendado)
```bash
sudo bash scripts/setup-full-lab.sh
```

### Opção 2: Via Makefile
```bash
sudo make setup
```

### Opção 3: Manual
```bash
sudo bash scripts/setup-webserver.sh    # ~5 min
sudo bash scripts/setup-ssh.sh          # ~1 min
bash scripts/extract-credentials.sh     # ~1 min
```

## ✨ O Que Cada Script Faz

### 1️⃣ `setup-webserver.sh` (Apache + Node.js)
```bash
✓ Instala Apache2
✓ Habilita módulos: proxy, proxy_http, rewrite, headers
✓ Instala Node.js v20 + npm
✓ npm install no projeto
✓ Configura Virtual Host para proxy em porta 80
✓ Proxifica requests para http://127.0.0.1:3000
✓ Sobe a app com 'npm run dev' via serviço systemd (nextjs-lab)
```

**Resultado**: Apache ouve na **porta 80** e proxifica para Next.js

### 2️⃣ `setup-ssh.sh` (OpenSSH + Usuários)
```bash
✓ Instala OpenSSH Server
✓ Habilita SSH service
✓ Cria 8 usuários baseados em usernames expostos:
  - admin, canbo, congdan, hotro
  - levana, administrator, sysadmin, quantri
✓ Define senha padrão: password123
✓ Configura homes e permissões
```

**Resultado**: SSH ouve na **porta 22** com 8 contas criadas

### 3️⃣ `extract-credentials.sh` (Fuzzing - Extração)
```bash
✓ Lê arquivos em public/backup/:
  - usernames.txt
  - accounts.txt
  - admins.txt
  - users.txt
✓ Remove números, linhas vazias
✓ Cria saídas:
  - fuzzing-output/combined-usernames.txt (usernames únicos)
  - fuzzing-output/bruteforce-wordlist.txt (senhas comuns)
  - fuzzing-output/ssh-bruteforce-guide.txt (instruções)
```

**Resultado**: Arquivos em `fuzzing-output/` prontos para bruteforce

### 4️⃣ `test-lab.sh` (Validação)
```bash
✓ Verifica Apache está rodando
✓ Testa HTTP porta 80
✓ Valida endpoint /backup acessível
✓ Verifica SSH está rodando
✓ Confirma usuários foram criados
✓ Testa credencial padrão (admin:password123)
```

**Resultado**: Relatório se tudo está pronto

### 5️⃣ `bruteforce-ssh.sh` (Simulação de Ataque)
```bash
✓ Lê usernames de fuzzing-output/combined-usernames.txt
✓ Lê senhas de fuzzing-output/bruteforce-wordlist.txt
✓ Testa cada combinação contra SSH:22
✓ Registra sucessos em fuzzing-output/ssh-bruteforce-results.txt
✓ Mostra progresso em tempo real
```

**Resultado**: Encontra credenciais válidas (admin:password123, etc)

## 🎯 Fluxo de Exploração

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DESCOBERTA - Acessar http://localhost/                  │
│    → Encontrar endpoint /backup                             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. FUZZING/OSINT - extract-credentials.sh                  │
│    → Extrair usernames de /backup/*.txt                     │
│    → Gerar wordlists de senhas comuns                       │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. BRUTEFORCE - bruteforce-ssh.sh                          │
│    → Atacar SSH:22 com credenciais extraídas               │
│    → Encontrar usuários e senhas válidas                   │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ 4. ACESSO - SSH em contas comprometidas                    │
│    sshpass -p 'password123' ssh admin@localhost            │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Arquivos Gerados

Após executar os scripts, você terá:

```
REACT2SHELL-WEB-VULN/
├── .next/                          # Build Next.js
├── node_modules/                   # Dependencies
├── fuzzing-output/
│   ├── combined-usernames.txt      # 8 usernames únicos
│   ├── accounts.txt                # dados de contas
│   ├── admins.txt                  # usernames admin
│   ├── users.txt                   # dados de usuários
│   ├── bruteforce-wordlist.txt     # ~15 senhas comuns
│   ├── ssh-bruteforce-guide.txt    # instruções de ferramentas
│   └── ssh-bruteforce-results.txt  # resultados dos testes
├── setup-lab.log                   # log do setup
└── [scripts]                       # scripts de setup/test/bruteforce
```

## 🔒 Segurança do Lab

### Dados Expostos (Propositais)

| Arquivo | Localização | Conteúdo |
|---------|-----------|----------|
| usernames.txt | `/backup/usernames.txt` | 8 usernames |
| accounts.txt | `/backup/accounts.txt` | dados de contas |
| admins.txt | `/backup/admins.txt` | usernames de admin |
| users.txt | `/backup/users.txt` | dados de usuários |

### Configuração SSH Intencional

- ✗ Senhas fracas (password123)
- ✗ SSH sem key-based auth
- ✗ Sem rate limiting
- ✓ Perfeito para teste de bruteforce

Isto é **propositalmente vulnerável** para fins de aprendizado.

## 📈 Performance & Recursos

| Componente | Porta | Recurso | Status |
|-----------|-------|---------|--------|
| Apache | 80 | ~10MB RAM | systemctl status apache2 |
| Next.js | 3000 | ~200MB RAM | systemctl status nextjs-lab |
| SSH | 22 | ~5MB RAM | systemctl status ssh |

**Total aproximado**: ~500MB RAM em uso

## 🔍 Verificação Rápida

```bash
# Ver status tudo
make status

# Ver logs do setup
make logs

# Testar configuração
make test
```

## 💡 Casos de Uso

✅ **Perfeito Para:**
- Treinar red team skills
- Entender exploração de dados expostos
- Aprender bruteforce SSH
- Laboratório de segurança controlado
- Apresentações de segurança
- Treinamento de desenvolvedores

❌ **NÃO USE PARA:**
- Atacar sistemas reais
- Teste sem autorização
- Atividades ilegais
- Fora de ambiente controlado

## 📚 Arquivos Relacionados

- **SETUP-LAB-README.md** - Guia completo e detalhado
- **public/backup/** - Arquivos vulneráveis expostos
- **AGENTS.md** - Instruções do projeto
- **next.config.js** - Configuração Next.js
- **Makefile** - Automação de commands

## 🚨 Troubleshooting Rápido

| Problema | Solução |
|----------|---------|
| "Permission denied" | Use `sudo` antes do comando |
| Apache não responde | `sudo systemctl restart apache2` |
| Next.js não inicia | `sudo journalctl -u nextjs-lab -f` |
| SSH falha | `sudo systemctl restart ssh` |
| Bruteforce não funciona | Execute `extract-credentials.sh` primeiro |

## 📞 Suporte

```bash
# Ver último erro
tail -50 setup-lab.log

# Debug Apache
sudo tail -f /var/log/apache2/error.log

# Debug SSH
sudo journalctl -u ssh -f
```

---

## Quick Start Command

```bash
# Tudo em uma linha
sudo bash scripts/setup-full-lab.sh && make test
```

**Tempo total**: ~10-15 minutos (dependendo de internet para npm install)

---

✅ **Status**: Scripts criados e testados
📅 **Data**: 2026-07-04
🔗 **Referência**: SETUP-LAB-README.md para documentação completa
