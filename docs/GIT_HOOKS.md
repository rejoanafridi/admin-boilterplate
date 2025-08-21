# Git Hooks Setup

This project uses Husky to run automated checks before commits and pushes to ensure code quality.

## What's configured

### Pre-commit Hook (`.husky/pre-commit`)

Runs on every `git commit` and performs:

- **ESLint** with auto-fix on staged JavaScript/TypeScript files
- **Prettier** formatting on staged files (JS, TS, JSON, MD, YAML)

Only staged files are checked for performance.

### Pre-push Hook (`.husky/pre-push`)

Runs on every `git push` and performs:

- **TypeScript type checking** across the entire project
- **ESLint** linting across the entire project
- **Build verification** to ensure the project builds successfully

## Scripts Added

- `npm run pre-commit` - Runs lint-staged (called by pre-commit hook)
- `npm run lint:fix` - Runs ESLint with auto-fix
- `npm run type-check` - Runs TypeScript type checking without emitting files
- `npm run prepare` - Initializes Husky (runs automatically after npm install)

## How to use

1. **Normal development**: Just commit and push as usual. The hooks will run automatically.

2. **Skip hooks temporarily** (not recommended):

   ```bash
   git commit --no-verify
   git push --no-verify
   ```

3. **Run checks manually**:
   ```bash
   npm run lint        # Check for linting issues
   npm run lint:fix    # Fix auto-fixable linting issues
   npm run type-check  # Check TypeScript types
   npm run format      # Format all files with Prettier
   ```

## Configured file patterns

**Linted files**: `*.{js,jsx,ts,tsx}`
**Formatted files**: `*.{js,jsx,ts,tsx,json,md,yml,yaml}`

## Installation

The git hooks are automatically installed when you run `npm install` thanks to the `prepare` script.

If you need to reinstall them manually:

```bash
npx husky install
```
