---
name: frontend-ui-architecture
description: Rules for structuring Next.js/React UI code in this monorepo (small components, composition-first pages, maintainability).
---

## When to apply

Apply this skill whenever you are asked to:

- Build or modify UI in any Next.js app (`apps/web-ui`, etc.)
- Create or change `src/app/**/page.tsx` (or `layout.tsx`)
- Implement a new screen/page, form, list, or interactive UI
- Refactor frontend code for readability/maintainability

Keywords: `next`, `nextjs`, `react`, `page.tsx`, `layout.tsx`, `frontend`, `ui`, `screen`, `tailwind`, `component`, `app router`

## Goals

- Keep files **small**, **focused**, and **easy to maintain**
- Don't create “giant components” that contain layout + state + handlers + rendering for everything
- Encourage **composition**: pages orchestrate; components implement details

## Core rules

### 1) Pages are composition-first (thin `page.tsx`)

- `src/app/**/page.tsx` should be as thin as possible.
- Its primary responsibility is to **import and render a Container** from `src/containers`.
- **Logic, state orchestration, and complex composition** should happen inside the **Container**, not the page.
- This maintains a clear boundary between routing (app/) and business/UI orchestration (containers/).

**Rule of thumb:** `page.tsx` should usually be less than 10 lines of code.

### 2) Extract components by responsibility (SRP)

When a UI has distinct parts, extract them into dedicated components. Typical splits:

- `*InputBar` / `*Toolbar` (input + submit actions)
- `*List` (rendering a list)
- `*ListItem` (rendering one item + item-level actions)
- `EmptyState` (when list is empty)
- `*Dialog` / `*Modal` (confirmation, edit, etc.)

Each component should have **one reason to change**.

### 3) Separate UI from stateful orchestration (Containers vs Components)

Prefer this layering:

- **Containers (`src/containers/*`)**:
  - Orchestrate business logic, hooks, and API calls.
  - Compose multiple UI components.
  - Handle redirection and top-level state.
- **Hooks / state orchestration**:
  - e.g. `useTasks()` that wraps actions and helpers.
- **UI components (`src/components/*` or local to container)**:
  - Presentational components that receive props and emit callbacks.

UI components should be as “dumb” as practical:

- receive `value` via props
- call `onToggle`, `onEdit`, `onDelete`, etc.
- avoid owning complex business rules

### 4) Hard limits (pragmatic guardrails)

- Avoid React components > ~150 lines.
- Avoid files that mix:
  - layout/styling
  - state + reducers
  - business rules
  - multiple UI sections
    in a single component.
- If a component needs many callbacks/props, consider grouping props into objects or extracting subcomponents.

### 5) Maintain the project UI style (Neobrutalism)

Follow the existing design rules (see `code-style` skill):

- bold black borders (`border-2` / `border-4`, `border-black`)
- offset hard shadows
- vibrant accents
- keep UI minimal and readable

## Checklist (use before finishing)

- [ ] `page.tsx` is thin (< 10 lines) and only renders a Container
- [ ] Business logic and state orchestration moved to a Container (`src/containers/*`)
- [ ] UI split into smaller presentational components
- [ ] Pure logic extracted to non-React modules when applicable
- [ ] Complex state orchestration moved to a hook (e.g. `useTasks`)
- [ ] No component/container file is excessively large (> ~150 lines)
- [ ] Naming is in English (identifiers + UI strings)
- [ ] **MANDATORY**: All UI labels use `i18n` (no hardcoded text)
- [ ] Neobrutalism styles applied consistently

## Example (high-level)

- `page.tsx`:
  - uses `useTasks()`
  - renders `<TaskList />` and `<TaskInputBar />`
- `TaskList`:
  - maps tasks and renders `<TaskListItem />`
  - shows `<EmptyState />` when needed
- `TaskListItem`:
  - handles item-level UI (](#)

## Self-Improvement

- If the user corrects a UI architecture decision or frontend pattern, **you must update this SKILL.md file** immediately to reflect the new preference.
