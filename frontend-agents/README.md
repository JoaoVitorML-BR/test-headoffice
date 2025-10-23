# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

# Frontend - HeadOffice Agents Management

Frontend application for managing agents with authentication and role-based access control.

## 🚀 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Zustand** - State management
- **React Query** - Server state management
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📁 Project Structure

```
src/
├── api/           # Axios configuration and API clients
├── components/    # Reusable React components
├── pages/         # Page components (Login, Dashboard, Agents, Users)
├── hooks/         # Custom React hooks
├── store/         # Zustand stores (auth, etc)
├── types/         # TypeScript type definitions
├── utils/         # Helper functions
├── routes/        # Route configuration
└── App.tsx        # Main app component
```

## 🔧 Environment Variables

Create a `.env` file based on `.env.example`:

```env
VITE_API_URL=http://localhost:3001/api/v1
```

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 🏗️ Build

```bash
npm run build
```

## 🎨 Features

- ✅ JWT Authentication
- ✅ Protected Routes
- ✅ Role-based Access Control (ADMIN, USER)
- ✅ Agents CRUD
- ✅ Users CRUD (Admin only)
- ✅ Form validation with Zod
- ✅ Responsive design with TailwindCSS
- ✅ Loading states and error handling
- ✅ Token refresh and auto-logout

## 📝 API Integration

The frontend connects to the NestJS backend at `http://localhost:3001/api/v1`

### Available Endpoints:

- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /users` - List users (Admin only)
- `POST /users` - Create user (Admin only)
- `PATCH /users/:id` - Update user (Admin only)
- `DELETE /users/:id` - Delete user (Admin only)
- `GET /agents` - List agents
- `POST /agents` - Create agent
- `PATCH /agents/:id` - Update agent
- `DELETE /agents/:id` - Delete agent


You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
