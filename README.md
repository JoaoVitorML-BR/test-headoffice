# 🏢 HeadOffice - Sistema de Gestão de Funcionários

Sistema completo para administradores gerenciarem agentes (funcionários) com autenticação JWT, controle de roles e filtros avançados.

## 🎯 Propósito

Plataforma onde **1 ADMINISTRADOR** gerencia múltiplos **AGENTES** (funcionários), com:
- ✅ Controle de acesso baseado em roles (ADMIN/AGENT)
- ✅ CRUD completo de agentes
- ✅ Filtros por nome, status, departamento e cargo
- ✅ Autenticação JWT segura
- ✅ Interface moderna e responsiva

## 📦 Estrutura do Monorepo

```
test-headoffice/
├── backend-agents/     # API REST (NestJS + MongoDB)
└── frontend-agents/    # Interface Web (React + TypeScript)
```

## 🔧 Stack Tecnológico

### Backend
- **NestJS** - Framework Node.js robusto
- **MongoDB** + **Mongoose** - Banco NoSQL
- **JWT** - Autenticação stateless
- **Swagger** - Documentação automática
- **Docker** - Containerização

### Frontend
- **React 18** + **TypeScript** - UI type-safe
- **TailwindCSS** - Estilização moderna
- **Zustand** - Gerenciamento de estado
- **React Router v6** - Navegação
- **Axios** - Client HTTP
- **Zod** - Validação de schemas

## 🚀 Quick Start

### 1️⃣ Backend (API)

```bash
cd backend-agents
npm install
npm run docker:up
```

**API:** `http://localhost:3001`  
**Swagger:** `http://localhost:3001/api/docs`

**Login Padrão:**
- Email: `admin@headoffice.com`
- Senha: `Admin@123`

### 2️⃣ Frontend

```bash
cd frontend-agents
npm install
npm run dev
```

**App:** `http://localhost:5173`

## 📋 Funcionalidades

### 👤 Administrador (Acesso ao Sistema)
- ✅ Criar, editar e deletar agentes (funcionários)
- ✅ Gerenciar usuários do sistema (outros admins)
- ✅ Visualizar dashboard com estatísticas
- ✅ Filtrar agentes por nome, status, departamento e cargo
- ✅ Visualizar histórico completo de agentes

### 👥 Agente (Registro de Dados)
> **Nota:** Agentes são **registros de funcionários**, não possuem login no sistema.

Os agentes possuem:
- 📋 Informações cadastrais (nome, email, telefone)
- 💼 Dados profissionais (cargo, departamento)
- 📅 Data de contratação
- ✅ Status (ativo/inativo)

**Apenas administradores** têm acesso ao sistema para gerenciar esses dados.

## 🌿 Branches Principais

- `main` - Produção estável
- `dev` - Desenvolvimento ativo

## 👨‍� Autor

**João Vitor ML** - [GitHub](https://github.com/JoaoVitorML-BR)

---

⭐ **Feito com NestJS, React e muito ☕**