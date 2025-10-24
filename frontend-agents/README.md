# 🎨 Frontend - HeadOffice Interface

Interface web moderna e responsiva para gerenciamento de agentes (funcionários) com autenticação JWT e filtros avançados.

## 🎯 Propósito

Dashboard administrativo onde gestores controlam agentes/funcionários com:
- ✅ Login seguro com JWT
- ✅ Filtros em tempo real (nome, status, departamento, cargo)
- ✅ CRUD completo de agentes
- ✅ Componentes desacoplados e reutilizáveis
- ✅ Design responsivo e moderno

## � Stack

- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Utility-first CSS
- **React Router v6** - Roteamento
- **Axios** - HTTP Client
- **Zustand** - State Management
- **Zod** - Schema Validation
- **React Hook Form** - Form handling

## 🚀 Quick Start

### Pré-requisitos
- Node.js 20+
- Backend rodando em `http://localhost:3001`

### Instalação

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

**App:** `http://localhost:5173`

### Build para Produção

```bash
npm run build
npm run preview  # Preview da build
```

## 📁 Arquitetura

```
src/
├── features/              # Features modulares
│   ├── agents/           # Módulo de agentes
│   │   ├── components/   # AgentsFilters, etc
│   │   ├── pages/        # AgentsList, AgentForm
│   │   ├── services/     # agents.service.ts
│   │   ├── types/        # agent.ts, agent-filters.ts
│   │   └── schemas/      # Validação Zod
│   └── users/            # Módulo de usuários
├── api/                  # Axios config
├── components/           # Componentes globais
│   └── PrivateRoute.tsx  # Proteção de rotas
├── pages/                # Páginas principais
│   ├── Login.tsx
│   └── Dashboard.tsx
├── routes/               # Configuração de rotas
├── store/                # Zustand stores
│   └── authStore.ts
└── schemas/              # Validações globais
```

## 🔐 Autenticação

### Fluxo JWT

1. Login → Backend retorna token
2. Token armazenado no Zustand store
3. Axios interceptor injeta token em requests
4. `PrivateRoute` protege rotas autenticadas
5. Auto-logout em 401/403

### Rotas Protegidas

```typescript
<PrivateRoute>
  <AgentsList />
</PrivateRoute>
```

## 🔍 Sistema de Filtros

### Componente Desacoplado

```typescript
<AgentsFilters
  filters={filters}
  onFilterChange={handleFilterChange}
  onApply={handleApplyFilters}
  onClear={handleClearFilters}
/>
```

### Filtros Disponíveis
- **Busca** - Nome, email, cargo, departamento
- **Status** - Ativo/Inativo
- **Departamento** - Texto livre
- **Cargo** - Texto livre

## 🛠️ Scripts

```bash
npm run dev          # Desenvolvimento (Vite)
npm run build        # Build produção
```

## 🌐 Integração com API

### Base URL
```typescript
// api/axios.ts
baseURL: 'http://localhost:3001'
```

### Serviços

```typescript
// features/agents/services/agents.service.ts
agentsService.getAll(filters)    // GET /agents?search=...
agentsService.getById(id)        // GET /agents/:id
agentsService.create(data)       // POST /agents
agentsService.update(id, data)   // PATCH /agents/:id
agentsService.delete(id)         // DELETE /agents/:id
```

## 📦 Tipos TypeScript

### Agent
```typescript
interface Agent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: AgentStatus;
  hireDate?: string;
}
```

### AgentFilters
```typescript
interface AgentFilters {
  search?: string;
  status?: AgentStatus;
  department?: string;
  position?: string;
}
```

## 🔒 Segurança

- ✅ JWT em header Authorization
- ✅ Validação de forms com Zod
- ✅ Sanitização de inputs
- ✅ CORS habilitado no backend
- ✅ Rotas protegidas por roles

## 📝 Variáveis de Ambiente

Crie `.env` baseado em `.env.example`:

```env
VITE_API_URL=http://localhost:3001
```

---

⭐ **Desenvolvido com React + TypeScript + TailwindCSS**
