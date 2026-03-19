# Anix Lab Workspace

<p align="center">
  <b>🚀 Anix Lab (formerly Anix7) — Unified Monorepo Architecture</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Monorepo-Turborepo-blue?style=flat-square" />
  <img src="https://img.shields.io/badge/Package%20Manager-PNPM-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square" />
  <img src="https://img.shields.io/badge/API-Fastify%20%7C%20Socket.IO-green?style=flat-square" />
  <img src="https://img.shields.io/badge/License-CC%20BY--NC%204.0-red?style=flat-square" />
</p>

---

## 📦 Overview

This is the official monorepo for **Anix Lab (formerly Anix7)**, powered by **Turborepo** and **PNPM Workspaces**.

It serves as the centralized codebase for the entire Anix Lab ecosystem — including:

- 🌐 Web applications
- 🔐 Authentication services
- ⚡ API servers
- 📚 Shared libraries & configurations

---

## 🧩 Projects

### 🚀 Applications (Apps)

- **Admin Dashboard** → `apps/admin`
- **Anipic (Image Platform)** → `apps/anipic`
- **Main Website** → `apps/www-website`
- **Tools Platform** → `apps/tools`
- **Short URL Redirect Service** → `apps/i-used-for-short-url`
- **Core Backend Server (API + Socket.IO)** → `apps/core-server`

---

### 📦 Shared Packages

- **Auth Module** → `shared/auth`
  Shared authentication UI components, logic, and client utilities

- **UI Components** → `shared/components`
  Reusable React components (UI, navigation, loaders, error handling, etc.)

- **Configuration** → `shared/config`
  Centralized configs for:
  - ESLint (Flat Config)
  - TypeScript
  - Next.js
  - PostCSS

- **Core Libraries** → `shared/lib`
  - Database layer (MongoDB + multi-connection support)
  - Mongoose models (ImageUpload, ShortUrl, etc.)
  - Email utilities (Nodemailer)
  - Zod validation & helpers

- **Head & SEO Utilities** → `shared/head`
  Metadata, analytics, and theme-related utilities

- **Providers** → `shared/providers`
  Global React providers (e.g., Toast System, context wrappers)

- **Styles** → `shared/styles`
  Global styles, themes, and utility CSS

- **Utilities** → `shared/utils`
  General-purpose helper functions (clipboard, client info, classNames, etc.)

---

## 📁 Project Structure

```
AnixLabWorkspace/
├── apps/
│   ├── admin/                # Admin dashboard (Next.js)
│   ├── anipic/               # Image platform (Next.js)
│   ├── core-server/          # Backend server (Fastify + Socket.IO)
│   ├── i-used-for-short-url/ # Public short URL redirect service
│   ├── tools/                # Tools platform (calculators, utilities, etc.)
│   └── www-website/          # Main website (landing + pages)
│
├── shared/                   # Shared packages across apps
│   ├── auth/                 # Shared auth UI & logic
│   ├── components/           # Reusable UI components
│   ├── config/               # ESLint, TS, Next, PostCSS configs
│   ├── head/                 # SEO, analytics, meta handlers
│   ├── lib/                  # Core libraries
│   │   ├── db/               # Multi-DB connections + models
│   │   ├── mail/             # Email utilities
│   │   └── utils/            # Core helpers
│   ├── providers/            # React providers (Toast, etc.)
│   ├── styles/               # Global styles
│   └── utils/                # General utilities
│
├── .github/workflows/        # CI/CD pipelines
├── ecosystem.config.cjs      # PM2 ecosystem config
├── turbo.json                # Turborepo pipeline config
├── pnpm-workspace.yaml       # Workspace definition
├── package.json              # Root config
└── tsconfig.json             # Root TypeScript config
```

---

## ⚙️ Tech Stack

- **Next.js 16 (App Router)**
- **BetterAuth**
- **MongoDB + Mongoose**
- **Fastify**
- **Socket.IO**
- **Turborepo**
- **PNPM Workspaces**
- **Tailwind CSS v4**
- **ESLint (Flat Config)**
- **PostCSS**

---

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
```

### Run all apps (dev mode)

```bash
pnpm dev
```

### Run specific apps

```bash
pnpm --filter www-website dev
pnpm --filter anipic dev
pnpm --filter api dev
pnpm --filter auth dev
```

### Run multiple apps

```bash
pnpm dev --filter auth --filter tools --filter anipic
pnpm dev --filter www-website --filter api
```

### Build all

```bash
pnpm build
```

### Lint

```bash
pnpm lint
```

### Type Check

```bash
pnpm typecheck
```

### Lint + Type Check

```bash
pnpm check
```

---

## 🌐 Environment Setup

Each application can maintain its own environment configuration:

```
apps/www-website/.env.local
apps/core-server/.env
```

---

## 🎯 Why Monorepo?

- ✅ Unified development workflow
- ✅ Shared **models, auth, utilities, and configs**
- ✅ Faster builds with **Turborepo caching**
- ✅ Centralized tooling (ESLint, Tailwind, PostCSS)
- ✅ Scalable and maintainable architecture
- ✅ Seamless cross-project integration within **Anix Lab ecosystem**

---

## 🏗️ Features

- ⚡ Turborepo task pipeline & caching
- 🎨 Shared Tailwind configuration
- 🔗 Multi-database MongoDB support
- 🔐 Centralized BetterAuth setup
- 📦 Reusable Mongoose models

---

## 📄 License

Licensed under the **Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)** License.

> ⚠️ This project is intended for **educational and personal use only**.
> Commercial or production usage requires explicit permission.

See [`LICENSE`](./LICENSE) for full details.

---

## 🤝 Contribution

Contributions, suggestions, and improvements are welcome.

---

## 👨‍💻 Author

© 2026 [**CodesWithSubham**](https://github.com/CodesWithSubham) — All rights reserved.

---
