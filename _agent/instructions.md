---
applyTo: "**"
---

## Project Overview

**Paul** is a productivity-focused monorepo for task and project management. It includes a robust authentication service, AI-powered features, and a high-performance web interface.

### Technology Stack

- **Language**: TypeScript 5.9.2
- **Monorepo**: Turborepo 2.8
- **Runtime**: Node.js 22+
- **Backend**: Fastify 5.4 / Express 5.1 (Auth API)
- **Frontend**: Next.js 16.1.6 (React 19) + TailwindCSS 4
- **ORM**: Drizzle ORM (PostgreSQL for Auth, LibSQL/SQLite for Core AI)
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7
- **UI Design**: [Neobrutalism](https://www.neobrutalism.dev) (High contrast, bold borders, hard shadows)

### Project Structure

```
paul/
├── apps/
│   ├── auth-api/                     # Email authentication service (OTP + JWT RS256)
│   ├── core-ai-api/                  # AI-powered features (Fastify + Google AI Studio)
│   ├── desktop/                      # Electron-based desktop application
│   └── web-ui/                       # Primary Next.js web interface
├── packages/
│   ├── entities/                     # Shared domain entities and types
│   ├── eslint-config/                # Shared ESLint configuration
│   ├── http/                         # Shared HTTP client abstractions
│   ├── node-utils/                   # Node.js specific utility functions
│   ├── search-ranker/                # Logic for ranking and searching
│   ├── typescript-config/            # Shared TypeScript configuration
│   ├── ui/                           # Shared Neobrutalism UI components (@paul/ui)
│   └── utils/                        # Shared general utilities
```

## Global Code Rules

- Write concise, objective code — no inline comments; use clear names and method extraction instead.
- Apply **SRP** and **OCP** (SOLID): each class has one responsibility; extend via new classes, not by modifying existing ones.
- All code, identifiers, and UI labels must be in **English**.
- All UI development must follow the **Neobrutalism** design system ([neobrutalism.dev](https://www.neobrutalism.dev)).
- Shared UI components are managed centrally in [`packages/ui`](file:///media/stan_silva/Partition_3/projects/_personal/paul/packages/ui) (`@paul/ui`). Use Shadcn with Neobrutalism variants.
- Prefer existing shared packages (`@paul/*`) over duplicating logic across apps.

## Skills available

Detailed, task-specific guidance lives in `_agent/skills/`. The agent loads a skill when the task matches its keywords.

| Skill                     | Path                                           | When to use                                           |
| ------------------------- | ---------------------------------------------- | ----------------------------------------------------- |
| **testing**               | `_agent/skills/testing/SKILL.md`               | Writing or reviewing unit tests                       |
| **observability**         | `_agent/skills/observability/SKILL.md`         | Adding or reviewing log statements                    |
| **code-style**            | `_agent/skills/code-style/SKILL.md`            | Lint, format, or style questions                      |
| **monorepo-architecture** | `_agent/skills/monorepo-architecture/SKILL.md` | Workspace layout, package boundaries, Turborepo tasks |
| **frontend-ui**           | `_agent/skills/frontend-ui/SKILL.md`           | Building or refactoring Next.js/React UI code         |
