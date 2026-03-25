---
applyTo: "**"
---

## Project Overview

lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum

### Technology Stack

- **Language**: TypeScript 5.9.2
- **Monorepo**: Turborepo 2.8
- **Runtime**: Node.js 22+
- **Backend**: Express 5.1 / Fastify 5.4
- **Frontend**: Next.js 16.1.6 (React 19) + TailwindCSS 4
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7
- **UI Design**: [Neobrutalism](https://www.neobrutalism.dev) (High contrast, bold borders, hard shadows)

### Project Structure

```
essence-tube/
├── apps/
│   ├── api/                          # Backend API
│   │   └── src/
│   │       ├── domain/               # Core business logic (framework-agnostic)
│   │       │   ├── entities/         # Entity interfaces (user, video, channel, playlist, token)
│   │       │   ├── errors/           # Custom error classes
│   │       │   ├── factories/        # Object factories
│   │       │   ├── mappers/          # Entity transformation mappers
│   │       │   └── port/             # Repository & service interfaces
│   │       │       ├── auth/         # Auth service interfaces
│   │       │       ├── databases/    # Repository interfaces (user, token)
│   │       │       └── services/     # External service interfaces (partner media, oauth)
│   │       ├── application/          # Application layer
│   │       │   └── usecases/         # Use case classes (single execute() method)
│   │       └── infra/                # Infrastructure layer
│   │           ├── auth/             # Auth implementations
│   │           ├── config/           # Environment & config management
│   │           ├── database/         # MongoDB & Redis implementations
│   │           ├── logger/           # Pino logging
│   │           ├── providers/        # Dependency injection providers
│   │           ├── services/         # Google Auth, YouTube API clients
│   │           └── web/              # HTTP server layer
│   │               ├── fastify/      # Fastify routes & middleware
│   │               └── vercel/       # Vercel serverless functions
│   ├── ui/                           # Frontend (Next.js)
│   │   └── src/
│   │       ├── app/                  # Next.js app router
│   │       ├── config/               # Frontend configuration
│   │       ├── models/               # Frontend data models
│   │       ├── modules/              # Feature modules (feed, video, settings, login, etc.)
│   │       ├── services/             # API clients, utilities
│   │       ├── shared/               # Reusable components
│   │       └── style/                # Global styles
│   └── core-ai-ui/                      # Alternative Frontend (Next.js with Hero UI)
│       └── src/
│           ├── app/                  # Next.js app router
│           ├── config/               # Frontend configuration
│           ├── models/               # Frontend data models
│           ├── services/             # API clients, utilities
│           ├── shared/               # Reusable components
│           └── style/                # Global styles
├── packages/                         # Shared packages
│   ├── eslint-config/                # Shared ESLint configuration
│   ├── typescript-config/            # Shared TypeScript configuration
│   ├── ui/                           # Shared UI components
│   └── utils/                        # Shared utilities (e.g., date formatting)
```

## Global Code Rules

- Write concise, objective code — no inline comments; use clear names and method extraction instead.
- Apply **SRP** and **OCP** (SOLID): each class has one responsibility; extend via new classes, not by modifying existing ones.
- All code, identifiers, and UI labels must be in **English**.
- All UI development must follow the **Neobrutalism** design system ([neobrutalism.dev](https://www.neobrutalism.dev)).
- Shared UI components are managed centrally in [`packages/ui`](file:///media/stan_silva/Partition_3/projects/_personal/done/packages/ui) (`@done/ui`). Use Shadcn with Neobrutalism variants.
- Prefer existing shared packages (`@done/*`) over duplicating logic across apps.

## Skills available

Detailed, task-specific guidance lives in `.github/skills/`. The agent loads a skill when the task matches its keywords.

| Skill                     | Path                                            | When to use                                           |
| ------------------------- | ----------------------------------------------- | ----------------------------------------------------- |
| **testing**               | `.github/skills/testing/SKILL.md`               | Writing or reviewing unit tests                       |
| **observability**         | `.github/skills/observability/SKILL.md`         | Adding or reviewing log statements                    |
| **code-style**            | `.github/skills/code-style/SKILL.md`            | Lint, format, or style questions                      |
| **monorepo-architecture** | `.github/skills/monorepo-architecture/SKILL.md` | Workspace layout, package boundaries, Turborepo tasks |
