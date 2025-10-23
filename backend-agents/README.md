# 🚀 Backend Agents - API REST com NestJS

API REST para gerenciamento de agentes com autenticação JWT, MongoDB e documentação Swagger.

## 📋 Tecnologias

- **Node.js** v20+
- **NestJS** - Framework backend
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **Docker** - Containerização

## 🔧 Pré-requisitos

- Node.js 20+ instalado
- Docker e Docker Compose instalados
- Git instalado

## 📦 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/JoaoVitorML-BR/test-headoffice
cd backend-agents
```

### 2. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações.

### 3. Instale as dependências

```bash
npm install
```

## � Executando o Projeto

```bash
npm run docker:up
```

Este comando irá:
- ✅ Subir o MongoDB em container Docker
- ✅ Subir a API NestJS em container Docker
- ✅ Criar automaticamente o usuário admin padrão
- ✅ Disponibilizar a API em `http://localhost:3001`

## 🔐 Usuário Administrador Padrão

Na primeira execução, o sistema cria automaticamente um usuário administrador:

```
📧 Email: admin@headoffice.com
🔑 Password: Admin@123
```

⚠️ **IMPORTANTE:** Altere a senha padrão após o primeiro login!

## 📚 Documentação da API (Swagger)

Após iniciar a aplicação, acesse:

```
http://localhost:3001/api/docs
```

## 📁 Estrutura do Projeto

```
backend-agents/
├── src/
│   ├── agents/          # Módulo de agentes (CRUD)
│   ├── auth/            # Módulo de autenticação (JWT)
│   ├── common/          # Código compartilhado
│   ├── config/          # Configurações
│   ├── database/        # Configuração do banco
│   ├── app.module.ts    # Módulo principal
│   └── main.ts          # Entry point
├── test/                # Testes E2E
├── docker-compose.yml   # Orquestração Docker
├── Dockerfile           # Build da aplicação
└── .env.example         # Exemplo de variáveis de ambiente
```

## 🔐 Modelo de Agente

```typescript
{
  nome: string,
  email: string,
  telefone: string,
  cargo: string,
  departamento: string,
  status: 'ativo' | 'inativo',
  role: 'admin' | 'user' | 'enterprise',
  dataCadastro: Date
}
```

## 🚀 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run docker:up` | Sobe MongoDB + API em containers |
| `npm run docker:down` | Para os containers |
| `npm run docker:logs` | Visualiza logs da aplicação |

## 📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👤 Autor

**JoaoVitorML-BR**

---

⭐ Feito com NestJS e MongoDB
