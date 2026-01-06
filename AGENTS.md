# AGENTS.md - Privora Jewelry E-commerce

## Commands
- **Dev**: `pnpm dev` or `npm run dev`
- **Build**: `pnpm build` or `npm run build`
- **Lint**: `pnpm lint` or `npm run lint`
- **No test framework configured**

## Architecture
- **Next.js 16** App Router with React 19, TypeScript, Tailwind CSS v4
- **Route groups**: `app/(auth)/` for auth pages, `app/(main)/` for main app pages
- **Components**: `components/ui/` (shadcn/radix primitives), `app/components/` (app-specific)
- **Hooks**: `hooks/` - React Query hooks (use-auth, use-cart, use-products, etc.)
- **Services**: `services/` - API layer (auth-service, cart-service, product-service, etc.)
- **Lib**: `lib/utils.ts` exports `cn()` for class merging

## Code Style
- Use `"use client"` directive for client components
- Imports: `@/*` path alias for project root (e.g., `@/components/ui/button`)
- UI: Radix UI + shadcn components, Lucide icons, Headless UI for complex components
- Styling: Tailwind CSS with `cn()` helper for conditional classes
- State: React Query (`@tanstack/react-query`) for server state, `useState` for local state
- Types: TypeScript strict mode; define types inline or import from `services/`
- Naming: PascalCase components, camelCase functions/variables, kebab-case files

## API Integration Pattern
- Services call `NEXT_PUBLIC_API_URL` (default: `http://localhost:8018/api/v1`)
- All API calls include `X-Device-Id` header from `lib/device-storage.ts`
- Use `credentials: "include"` for cookie-based auth
- Services transform backend responses to frontend types
- Hooks wrap services with React Query for caching/mutations
