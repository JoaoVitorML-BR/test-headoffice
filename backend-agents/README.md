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
git clone <seu-repositorio>
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

## 🐳 Rodando com Docker

### Subir todos os serviços (MongoDB + API)

```bash
npm run docker:up
```

## 💻 Rodando Localmente (sem Docker)

### 1. Certifique-se que o MongoDB está rodando localmente

```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

### 2. Atualize o MONGODB_URI no .env

```env
MONGODB_URI=mongodb://localhost:27017/agents_db
```

### 3. Execute em modo desenvolvimento

```bash
npm run start:dev
```

A API estará disponível em: `http://localhost:3000`

## 📚 Documentação da API (Swagger)

Após iniciar a aplicação, acesse:

```
http://localhost:3000/api/docs
```

## 🧪 Testes

```bash
# Testes unitários
npm run test

# Testes em watch mode
npm run test:watch

# Cobertura de testes
npm run test:cov

# Testes E2E
npm run test:e2e
```

## 🔍 Lint

```bash
# Executar lint
npm run lint

# Formatar código
npm run format
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
| `npm run start` | Inicia a aplicação |
| `npm run start:dev` | Inicia em modo desenvolvimento (hot-reload) |
| `npm run start:prod` | Inicia em modo produção |
| `npm run build` | Build da aplicação |
| `npm run lint` | Executa o linter |
| `npm run test` | Executa os testes |
| `npm run docker:up` | Sobe os containers Docker |
| `npm run docker:down` | Para os containers Docker |
| `npm run docker:logs` | Visualiza logs da aplicação |

## 📝 Licença

Este projeto está sob a licença UNLICENSED.

## 👤 Autor

**JoaoVitorML-BR**

---

⭐ Feito com NestJS e MongoDB
