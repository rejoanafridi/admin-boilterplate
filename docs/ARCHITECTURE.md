# Frontend Architecture Overview

This document outlines the clean architecture and folder structure for the frontend.

## High-level Structure

```
admin-boilterplate/
  app/                    # Next.js app router (routes, layouts, pages)
  components/             # Shared components (ui, layout, form)
  contexts/               # React contexts (auth, theme)
  features/               # Feature-first modules (users, etc.)
  hooks/                  # Reusable hooks
  lib/                    # Utilities, axios, metadata utils
  providers/              # Global providers (AppProviders)
  services/               # API services (auth, user)
  store/                  # Zustand stores
  docs/                   # Documentation
  scripts/                # Maintenance scripts
```

## Principles

- Feature-first organization: each feature owns its UI, hooks, services, and state.
- Shared UI stays generic in `components/ui`.
- Global concerns (providers, contexts) are centralized.
- Network boundaries: services call HTTP via `lib/axios`.
- Forms standardized via `components/form/form-management`.

## Providers

- `providers/app-providers.tsx` composes:
  - React Query `QueryClientProvider` (singleton)
  - `ThemeProvider`
  - `AuthProvider`
  - `RouteMetadataProvider`

## Data Layer

- Use `@tanstack/react-query` for server state with caching, retries, and devtools.
- Colocate queries/mutations within features, abstract HTTP in `services/`.

## State Management

- Use Zustand stores for simple UI/client state (`store/`).
- Avoid duplicating server state in Zustand.

## Forms

- Zod schemas for validation.
- `BaseFormComponent` + `FormField` for declarative forms.

## Routing & Metadata

- App Router with route layouts.
- Route-based metadata via `lib/metadata.ts` and helpers.
- Client updates via `RouteMetadataProvider`.

## Extending the App

- Create a new folder under `features/your-feature` with `components/`, `hooks/`, `services/`, `store/`.
- Add routes under `app/` as needed; export `metadata` from route layout.
- Update docs when adding new modules.

## Quality

- Lint & typecheck clean.
- Small components, composition > inheritance.
- Reuse patterns and singletons where applicable.
