# Component Guidelines

## Principles

- Single responsibility: one reason to change.
- Reuse-first mindset; extract shared logic.
- Props are explicit and typed.
- No implicit side effects; side effects in hooks.

## Patterns

- Use function components with hooks.
- Co-locate small components in feature folders.
- Promote generic components to `components/ui`.
- Use slots and composition over prop drilling.

## Naming

- Files and folders: kebab-case.
- Components: PascalCase.
- Hooks: useCamelCase.

## Styling

- Tailwind for utility classes.
- Use `cn` helper from `lib/utils` to combine classes.

## Forms

- Use `FormField` and `BaseFormComponent`.
- Pass `control` and `name`, render inputs/selects.

## Performance

- Memoize expensive lists and items.
- Use `React.memo` selectively.

## Accessibility

- Provide labels and aria attributes where needed.

## Examples

- Inputs via `components/form/input-field.tsx`.
- Selects via `components/ui/select`.
