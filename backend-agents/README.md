# � Backend - HeadOffice API

API REST robusta para gerenciamento de agentes (funcionários) com autenticação JWT, roles e filtros avançados.

## 🎯 Propósito

Backend da plataforma HeadOffice onde administradores gerenciam agentes/funcionários com controle de acesso baseado em roles.

## 📋 Stack

- **NestJS** - Framework TypeScript para Node.js
- **MongoDB** + **Mongoose** - Banco de dados NoSQL
- **JWT** - Autenticação stateless
- **Passport** - Estratégias de autenticação
- **Swagger/OpenAPI** - Documentação interativa
- **Class Validator** - Validação de DTOs
- **Docker** - Containerização

## � Quick Start

### Pré-requisitos
- Node.js 20+
- Docker & Docker Compose

### Instalação

```bash
# Instalar dependências
npm install

# Subir MongoDB + API em containers
npm run docker:up
```

**API:** `http://localhost:3001`  
**Swagger:** `http://localhost:3001/api/docs`

### Credenciais Padrão

```
Email: admin@headoffice.com
Senha: Admin@123
```

## 📁 Estrutura

```
src/
├── agents/              # CRUD de agentes + filtros
│   ├── dto/            # Data Transfer Objects
│   ├── schemas/        # Mongoose schemas
│   └── agents.service.ts
├── auth/                # Autenticação JWT
│   ├── guards/         # Guards de autenticação
│   ├── strategies/     # Passport strategies
│   └── auth.service.ts
├── users/               # Gestão de usuários
├── common/              # Enums, decorators, etc
├── database/            # Configuração MongoDB
└── seed/                # Seed do admin padrão
```

## 🔐 Roles e Permissões

| Role | Permissões |
|------|-----------|
| **ADMIN** | Criar/editar/deletar agentes e usuários |
| **AGENT** | Visualizar agentes, editar próprio perfil |

## � Modelo de Dados

### Agent (Agente/Funcionário)
```typescript
{
  name: string;           // Nome completo
  email: string;          // Email único
  phone: string;          // Telefone
  position: string;       // Cargo
  department: string;     // Departamento
  status: 'active' | 'inactive';
  hireDate?: Date;        // Data de contratação
}
```

### User (Usuário do Sistema)
```typescript
{
  name: string;
  email: string;
  password: string;       // Hash bcrypt
  role: 'ADMIN' | 'AGENT';
}
```

## � Endpoints Principais

### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Login (retorna JWT)

### Agentes (🔒 Requer autenticação)
- `GET /agents` - Listar com filtros
- `GET /agents/:id` - Buscar por ID
- `POST /agents` - Criar (🔐 ADMIN)
- `PATCH /agents/:id` - Atualizar (🔐 ADMIN)
- `DELETE /agents/:id` - Deletar (🔐 ADMIN)

**Filtros disponíveis:**
- `?search=` - Busca por nome, email, cargo, departamento
- `?status=` - Filtrar por status (active/inactive)
- `?department=` - Filtrar por departamento
- `?position=` - Filtrar por cargo

### Usuários (🔐 ADMIN only)
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🛠️ Scripts

```bash
# Desenvolvimento
npm run docker:up          # Subir containers
npm run docker:down        # Parar containers
npm run docker:logs        # Ver logs
```

## 🐳 Docker

O `docker-compose.yml` sobe:
- **MongoDB** (porta 27017)
- **API NestJS** (porta 3001)

Volumes persistentes garantem que dados não sejam perdidos.

## � Documentação

Acesse o Swagger após subir a API:

```
http://localhost:3001/api/docs
```

Interface interativa para testar todos os endpoints com autenticação JWT.

## 🔒 Segurança

- ✅ Senhas hasheadas com bcrypt (salt 10)
- ✅ JWT com expiração configurável
- ✅ Guards para proteção de rotas
- ✅ CORS configurado
- ✅ Helmet para headers seguros
- ✅ Validação de DTOs com class-validator

## � Variáveis de Ambiente

Crie um `.env` baseado no `.env.example`:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/headoffice

# JWT
JWT_SECRET=seu-secret-super-seguro
JWT_EXPIRES_IN=1d

# API
PORT=3001
```

---

⭐ **Desenvolvido com NestJS**