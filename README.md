# Agents 2025 DOPE

A modern monorepo for AI agents built with **Next.js 15**, **TypeScript**, **Turbopack**, and **npm workspaces**.

## 🚀 Project Structure

```
agents-2025-dope/
│
├─ apps/
│  ├─ web/                     # Next.js 15 frontend (Turbopack enabled)
│  │  ├─ src/app/              # App Router pages/UI
│  │  ├─ public/               # Static assets
│  │  ├─ next.config.ts        # Next.js configuration
│  │  └─ package.json
│  │
│  └─ api/                     # Standalone API service (Node + Hono)
│     ├─ src/
│     │  ├─ index.ts           # Server bootstrap
│     │  ├─ routes/            # REST endpoints
│     │  └─ services/          # Business logic
│     └─ package.json
│
├─ packages/
│  ├─ agent/                   # Agent core logic (framework-agnostic)
│  │  ├─ src/
│  │  └─ package.json
│  └─ api-client/              # Typed client for calling API
│     ├─ src/
│     └─ package.json
│
├─ tsconfig.base.json          # Base TypeScript configuration
├─ package.json                # Root package with workspaces
└─ README.md
```

## ✨ Features

- **Next.js 15** with App Router and Turbopack
- **TypeScript** throughout the monorepo
- **npm workspaces** for dependency management
- **Tailwind CSS** for styling
- **ESLint** for code quality
- **Hono** for fast API development
- **Zod** for schema validation

## 🛠 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
npm install
```

This installs dependencies for all workspaces.

### Development

Start all development servers:

```bash
npm run dev
```

Or start individual services:

```bash
# Start Next.js frontend (port 3000)
npm run dev:web

# Start API server (port 3001)
npm run dev:api
```

### Building

Build all packages and applications:

```bash
npm run build:all
```

## 📦 Workspaces

### Frontend App (`@agents-2025-dope/web`)
- **Port**: 3000
- **Tech**: Next.js 15, React 19, TypeScript, Tailwind CSS, Turbopack
- **Location**: `apps/web/`

### API Service (`@agents-2025-dope/api`)
- **Port**: 3001
- **Tech**: Node.js, Hono, TypeScript
- **Location**: `apps/api/`

### Agent Package (`@agents-2025-dope/agent`)
- **Purpose**: Core agent logic and types
- **Location**: `packages/agent/`

### API Client (`@agents-2025-dope/api-client`)
- **Purpose**: Typed client for API communication
- **Location**: `packages/api-client/`

## 🎯 Available Scripts

- `npm run dev` - Start all development servers
- `npm run dev:web` - Start Next.js frontend only
- `npm run dev:api` - Start API server only
- `npm run build` - Build all packages
- `npm run build:all` - Build packages in dependency order
- `npm run lint` - Lint all packages
- `npm run type-check` - Type check all packages

## 🚀 Quick Start

1. **Clone and install**:
   ```bash
   cd agents-2025-dope
   npm install
   ```

2. **Start development**:
   ```bash
   npm run dev
   ```

3. **Visit**:
   - Frontend: http://localhost:3000
   - API: http://localhost:3001/health

## 🏗 Built With Official Tools

This project was bootstrapped with:
- `create-next-app@latest` - Official Next.js project generator
- Latest versions of React 19 and Next.js 15
- Turbopack for ultra-fast development builds

## 📝 License

MIT