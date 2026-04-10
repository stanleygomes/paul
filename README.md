# Paul - Task Assistant

## 🌟 About the Project

Paul is here to help you achieve your goals, one task at a time.

## 🛠️ Tech Stack

### Monorepo

- **Tool:** Turborepo
- **Package Management:** npm
- **Linting:** ESLint
- **Formatting:** Prettier
- **TypeScript:** Shared configurations
- **Runtime**: Node.js v24.x

## 🏛️ Architecture

## 📁 Monorepo Structure

This Turborepo includes the following apps:

### Apps (`/apps`)

- `core-api`: consolidated backend service (authentication, domain logic, and AI features).
- `web-ui`: primary web app built with Next.js.
- `desktop`: Electron desktop client.
- `cli`: terminal client for authentication, tasks, and projects.

Each app/package is 100% [TypeScript](https://www.typescriptlang.org/).

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
| `pnpm run app:core`    | Starts only `core-api`.                           |
| `pnpm run app:desktop` | Starts desktop (Electron).                        |
| `pnpm run build`       | Builds all workspaces.                            |
| `pnpm run lint`        | Runs lint across all workspaces.                  |
| `pnpm run check`       | `format:check + lint + check-types`.              |
| `pnpm run fix`         | `format + lint:fix + check-types`.                |

## 🔧 Environment Variables

Each app has its own template:

- `apps/core-api/.env.template`
- `apps/web-ui/.env.template`

Copy the template for the desired app to `.env` and fill in the values.

## 🤝 How to Contribute

1. Fork the project
2. Create a branch for your feature (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is under the MIT license. See the `LICENSE` file for details.

## 🔗 Useful Links

- [Turborepo Docs](https://turborepo.dev/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel](https://vercel.com)

Made with 🔥 by Lumen HQ
