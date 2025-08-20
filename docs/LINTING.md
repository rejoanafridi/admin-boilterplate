# Linting and Code Formatting

This document explains the linting and code formatting setup for the project.

## ESLint Configuration

ESLint is configured in `.eslintrc.json` with the following key features:

### Extends
- `next/core-web-vitals`: Next.js recommended rules with Core Web Vitals
- `plugin:@typescript-eslint/recommended`: TypeScript recommended rules
- `prettier`: Prettier integration to avoid conflicts

### Plugins
- `@typescript-eslint`: TypeScript-specific linting rules
- `prettier`: Prettier integration

### Key Rules
- `prettier/prettier`: Enforces Prettier formatting
- `@typescript-eslint/no-unused-vars`: Warns about unused variables (ignores vars starting with `_`)
- `@typescript-eslint/no-explicit-any`: Warns about using `any` type
- `no-console`: Warns about console statements (allows console.warn and console.error)
- `import/order`: Enforces consistent import ordering

## Prettier Configuration

Prettier is configured in `.prettierrc` with the following settings:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always",
  "endOfLine": "lf",
  "bracketSpacing": true
}
```

## Usage

### Running Linting

```bash
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix
```

### Running Formatting

```bash
# Format all files
npm run format

# Check formatting without changing files
npm run format:check
```

## Integration with Editor

### VS Code

For the best development experience with VS Code:

1. Install the ESLint and Prettier extensions
2. Add the following to your settings.json:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

## Git Hooks (Optional Future Enhancement)

Consider adding Husky and lint-staged to run linting and formatting on commit:

```bash
npm install --save-dev husky lint-staged
```

Then configure in package.json:

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  }
}
```
