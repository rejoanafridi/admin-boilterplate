# Admin Dashboard Boilerplate

A modern, feature-rich admin dashboard boilerplate built with Next.js, React Query, and Tailwind CSS.

## Features

- 🔐 **Authentication** with token management and cookie persistence
- 🎨 **Theming** with light/dark mode support
- 📊 **Dashboard** with customizable widgets
- 👥 **User Management** with roles and permissions
- 📝 **Form Management** with validation and error handling
- 🔍 **Data Tables** with sorting, filtering, and pagination
- 🌐 **API Integration** with React Query for data fetching
- 📱 **Responsive Design** for all screen sizes

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI**: Tailwind CSS, shadcn/ui components
- **State Management**: 
  - Server State: React Query
  - Client State: Zustand
- **Form Handling**: React Hook Form + Zod
- **Authentication**: JWT with cookie persistence
- **Development Tools**: TypeScript, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/admin-dashboard.git
   cd admin-dashboard
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
admin-boilterplate/
├── app/                    # Next.js App Router
│   ├── auth/               # Authentication routes
│   ├── dashboard/          # Dashboard routes
│   └── layout.tsx          # Root layout
├── components/             # Shared components
│   ├── ui/                 # UI components
│   ├── form/               # Form components
│   └── layout/             # Layout components
├── contexts/               # React contexts
├── features/               # Feature modules
│   └── users/              # User management feature
├── hooks/                  # Custom hooks
├── lib/                    # Utilities
│   ├── axios.ts            # Axios instance
│   ├── cookies.ts          # Cookie management
│   └── utils.ts            # General utilities
├── providers/              # Provider components
├── public/                 # Static assets
├── services/               # API services
├── store/                  # Zustand stores
└── types/                  # TypeScript type definitions
```

## Documentation

- [Architecture Overview](./docs/ARCHITECTURE.md)
- [Component Guidelines](./docs/COMPONENT_GUIDELINES.md)
- [Feature Development](./docs/FEATURE_DEVELOPMENT.md)
- [React Query Setup](./docs/REACT_QUERY.md)
- [Cookie Management](./docs/COOKIES.md)
- [Linting and Formatting](./docs/LINTING.md)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check formatting without changes

## Customization

### Theme

The theme can be customized in `tailwind.config.ts`.

### Components

UI components are based on shadcn/ui and can be customized in `components/ui/`.

### Authentication

Authentication is handled through the AuthContext and can be customized in `contexts/auth-context.tsx`.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://github.com/colinhacks/zod)