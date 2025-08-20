# Feature Development Guide

Use this guide when adding new features to ensure consistency and maintainability.

## 1. Plan

- Define the scope and API contract.
- Identify entities, forms, and routes.

## 2. Scaffold

```
features/
  your-feature/
    components/
    hooks/
    services/
    store/
```

- Place shared primitives in `components/ui`.
- Place route pages under `app/your-feature/...` and export `metadata`.

## 3. Data & Services

- Implement HTTP calls in `services/your-feature-service.ts` using `lib/axios`.
- Create React Query hooks in `features/your-feature/hooks/`.

## 4. Forms

- Define Zod schemas.
- Use `BaseFormComponent` and `FormField` for inputs/selects.

## 5. State

- Prefer React Query for server state.
- Use Zustand only for local UI state.

## 6. Components

- Build small, reusable components.
- Follow singleton patterns when sharing expensive single-instance resources.

## 7. Metadata

- Add route metadata in `lib/metadata.ts`.
- Export `metadata` from the route layout using helpers in `lib/generate-page-metadata`.

## 8. Testing & Quality

- Ensure lints pass.
- Keep files small and focused.
- Avoid breaking architecture rules in `.cursorrules`.

## 9. Docs

- Update `docs/` with a short note on the new feature and architecture decisions.
