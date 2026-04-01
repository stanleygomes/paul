# Done

Productivity monorepo with authentication, domain/AI APIs, a modern web interface, and a desktop app.

## 🌟 About the Project

**Done** has evolved into a robust platform organized as a **Turborepo**, with shared TypeScript apps and packages to speed up development, standardize architecture, and reuse code across frontend and backend.

## 🛠️ Core Tech Stack

- **Monorepo:** Turborepo
- **Package manager:** pnpm (`pnpm@10.31.0`)
- **Runtime:** Node.js `>=22`
- **Language:** TypeScript
- **Lint/Format:** ESLint + Prettier
- **Web:** Next.js + React + Tailwind CSS
- **APIs:** Fastify + Zod + Drizzle
- **Desktop:** Electron

## 🏛️ Monorepo Architecture

### Apps (`/apps`)

- `auth-api`: authentication service (OTP/JWT, security integrations, and email utilities).
- `core-api`: main domain API.
- `ai-api`: API for AI features.
- `web-ui`: primary web app built with Next.js.
- `desktop`: Electron desktop client.

### Packages (`/packages`)

- `@done/entities`: shared entities and validations.
- `@done/http`: shared HTTP client.
- `@done/node-utils`: Node.js utilities (logger, auth helpers, etc.).
- `@done/search-ranker`: search/ranking logic.
- `@done/ui`: design system and reusable components.
- `@done/utils`: shared utilities.
- `@done/eslint-config`: centralized ESLint configuration.
- `@done/typescript-config`: base TypeScript configurations.

## 🚀 Getting Started

### Prerequisites

- Node.js `>=22`
- pnpm `10.x`

### Installation

```bash
pnpm install
```

### Root Scripts

| Script                 | Description                                       |
| :--------------------- | :------------------------------------------------ |
| `pnpm run dev`         | Starts apps in development mode (except desktop). |
| `pnpm run app:web`     | Starts only `web-ui`.                             |
| `pnpm run app:auth`    | Starts only `auth-api`.                           |
| `pnpm run app:core`    | Starts only `core-api`.                           |
| `pnpm run app:ai`      | Starts only `ai-api`.                             |
| `pnpm run app:desktop` | Starts desktop (Electron).                        |
| `pnpm run build`       | Builds all workspaces.                            |
| `pnpm run lint`        | Runs lint across all workspaces.                  |
| `pnpm run check-types` | Runs type-check across all workspaces.            |
| `pnpm run check`       | `format:check + lint + check-types`.              |
| `pnpm run fix`         | `format + lint:fix + check-types`.                |

## 🔧 Environment Variables

Each app has its own template:

- `apps/auth-api/.env.template`
- `apps/core-api/.env.template`
- `apps/ai-api/.env.template`
- `apps/web-ui/.env.template`

Copy the template for the desired app to `.env` and fill in the values.

## 🤝 Contributing

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'feat: my feature'`)
4. Open a Pull Request

## 📄 License

Distributed under the MIT License. See the `LICENSE` file.
