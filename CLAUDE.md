## Project Overview

This is a application built with:

- Nextjs (AppRouter) with RSC,
- Typescript,
- Tailwind
- Drizzle ORM
- local development
- Postgres in Docker
- without an ORM container inside Next (Next runs on the host)

## Development Rules

- Always use TypeScript strict mode
- Run tests before committing
- Follow ESLint configuration
- Use conventional commit messages
- Write tests for new features
- Always use context7 MCP
- All components are located in the folder `/components`.
- Each component is located in a separate folder named after the component. Inside this folder is a component file with the same name and `index.tsx` with the export of this component.

## Architecture Patterns

- Service layer for business logic
- Controller layer for API endpoints
- Middleware for cross-cutting concerns
- Types folder for TypeScript interfaces

## Common Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Run linter
- `npm run format` - Run prettier with write
- `npm run format:check` - Run prettier with check

## Working with Specs/

When implementing features:

1. Read the specification in specs/[feature-name].md
2. Follow the implementation prompts exactly
3. Update the spec with any changes made
4. Mark completed items with [x]
