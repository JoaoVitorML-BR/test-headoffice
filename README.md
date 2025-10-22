# 🚀 Test Head Office - Full Stack Application

Sistema completo de gerenciamento de agentes com autenticação JWT, desenvolvido com NestJS e React.

## 📦 Estrutura do Monorepo

```
test-headoffice/
├── backend-agents/     # API REST com NestJS + MongoDB
└── frontend-agents/    # Interface React (em desenvolvimento)
```

## 🔧 Tecnologias

### Backend
- **NestJS** - Framework Node.js
- **MongoDB** + **Mongoose** - Banco de dados
- **JWT** - Autenticação
- **Swagger** - Documentação da API
- **Docker** - Containerização

### Frontend (em breve)
- **React** + **TypeScript**
- **React Hook Form** - Gerenciamento de formulários
- **Axios** - Requisições HTTP

## 🚀 Como Rodar

### Backend

```bash
cd backend-agents
npm install
npm run docker:up
```

A API estará em: `http://localhost:3000`
Documentação: `http://localhost:3000/api/docs`

### Frontend (em desenvolvimento)

```bash
cd frontend-agents
npm install
npm start
```

## 📝 Branches

- `main` - Branch principal (produção)
- `feature/database-config` - Configuração MongoDB
- `feature/agents-crud` - CRUD de agentes
- `feature/auth-jwt` - Autenticação JWT
- `feature/swagger-docs` - Documentação Swagger
- `feature/frontend` - Interface React

## 👤 Autor

**JoaoVitorML-BR**