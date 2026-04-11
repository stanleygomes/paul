---
name: monorepo-architecture
description: Workspace layout, app boundaries, and dependency rules for the Turborepo monorepo.
---

## When to apply

Apply this skill whenever you are asked to:

- Add a new app or package to the monorepo
- Move code between workspaces
- Decide where a piece of logic should live
- Configure Turborepo tasks or workspace dependencies
- Review cross-package imports

Keywords: `monorepo`, `turborepo`, `workspace`, `package`, `boundary`, `dependency`, `apps`, `packages`

## Workspace layout

```
paul/
├── apps/
│   ├── core-api/    # Consolidated service — Fastify, PostgreSQL, Google AI Studio, Resend, RS256 JWT
│   ├── desktop/     # Desktop application — Electron
│   └── web-ui/      # Primary frontend — Next.js 16, React 19, TailwindCSS 4
├── packages/
│   ├── entities/           # @paul/entities — shared domain entities and types
│   ├── eslint-config/      # @paul/eslint-config — shared ESLint rules
│   ├── typescript-config/  # @paul/typescript-config — shared tsconfig bases
│   ├── ui/                 # @paul/ui — shared Neobrutalism UI components
│   ├── utils/              # @paul/utils — shared general utilities
│   ├── node-utils/         # @paul/node-utils — Node.js specific utilities
│   ├── search-ranker/      # @paul/search-ranker — ranking logic
│   ├── http/               # @paul/http — HTTP client abstraction
│   └── ...
```

## Dependency rules

- **`apps/*`** may depend on **`packages/*`** — never the other way around.
- **`packages/*`** must not depend on **`apps/*`**.
- Cross-app dependencies are **not allowed** — shared logic must be extracted to a package.
- All shared packages are scoped under `@paul/*`.

## Internal app architecture (for `apps/api` and `apps/auth-api`)

Each backend app follows a layered architecture:

```
src/
├── domain/        # Pure business logic — entities, errors, ports (interfaces), factories, mappers
├── application/   # Use cases (each exposes a single execute() method)
└── infra/         # Framework-specific — routes, DB clients, external services, DI providers
```

Dependency direction: `infra` → `application` → `domain` (never reversed).

## Turborepo task pipeline

Defined in `turbo.json`:

| Task          | Dependencies                  | Notes                |
| ------------- | ----------------------------- | -------------------- |
| `build`       | `^build` (dependencies first) | Outputs: `.next/**`  |
| `lint`        | `^lint`                       |                      |
| `check-types` | `^check-types`                |                      |
| `dev`         | —                             | Persistent, no cache |

## Commands

```bash
# Run all apps in dev mode
npm run dev

# Run a single app
npm run app:core       # core-api
npm run app:web        # web-ui
npm run app:desktop    # desktop

# Build everything
npm run build

# Run Turborepo for a specific workspace
npx turbo run build --filter=api
npx turbo run lint --filter=auth-api
```

## Adding a new shared package

1. Create `packages/<name>/` with `package.json` naming it `@paul/<name>`.
2. Add `"@paul/<name>": "file:../packages/<name>"` to the consuming app's `package.json`.
3. Export from `packages/<name>/src/index.ts`.
4. Reference the shared `packages/typescript-config/` in the package's `tsconfig.json`.

## Checklist

- [ ] New code placed in the correct layer (`domain` / `application` / `infra`)
- [ ] Shared logic lives in `packages/` not duplicated across apps
- [ ] No `apps/*` → `apps/*` imports
- [ ] New package uses `@paul/<name>` scope and a `src/index.ts` entry point
- [ ] New UI code follows **Neobrutalism** aesthetics
- [ ] `turbo.json` updated if a new task is introduced

## Self-Improvement

- If the user corrects a workspace boundary or dependency rule, **you must update this SKILL.md file** immediately to reflect the new preference.
