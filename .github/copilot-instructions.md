**Purpose**

This file gives short, actionable guidance for AI coding agents working on this repository so they can be immediately productive.

**Big Picture**

- **Monorepo layout:** three main apps: frontend in [client](client/README.md), backend in [server](server/README.md), and mobile in [mobile](mobile/README.md). Central orchestration via [docker-compose.yml](docker-compose.yml).
- **Backend:** Bun runtime + Express + Mongoose. Key code lives under [server/src](server/src) (models, controllers, routes). Configuration and secrets come from `server/.env` (see `MONGO_URI`, `JWT_SECRET`). See [server/package.json](server/package.json) for scripts.
- **Frontend:** Next.js (App Router) in [client/app](client/app), Tailwind v4 + shadcn UI, state via Zustand stores in [store](store). Scripts and tests are in [client/package.json](client/package.json).
- **Mobile:** Expo app in [mobile/app] with file-based routing for native flows.

**How to run (developer workflows)**

- Full stack via Docker Compose: `docker-compose up --build` (root [docker-compose.yml](docker-compose.yml)).
- Backend (preferred runtime: Bun):
  - Install: `cd server && bun install`
  - Dev: `cd server && bun --watch src/app.ts` (see `dev` script in [server/package.json](server/package.json)).
  - Build: `cd server && bun build ./src/app.ts --outdir ./dist` (see `build` script).
  - Tests: `cd server && bun run test` (Jest + Supertest; CI runs tests with an ephemeral MongoDB).
- Frontend (Next.js):
  - Install & run: `cd client && bun install && bun run dev` OR `npm run dev`.
  - Tests: `cd client && bun run test` (Vitest configured; see [client/package.json](client/package.json)).

**CI notes**

- CI sets up Bun and runs `bun install` and `bun run test` for both server and client (see [.github/workflows/ci.yml](.github/workflows/ci.yml)). Use the same commands locally to reproduce CI failures.
- Backend CI uses a local MongoDB service and sets `MONGO_URI` to `mongodb://localhost:27017/test_db` during tests.

**Project-specific conventions & patterns**

- Runtime: prefer `bun` where scripts are available (server uses Bun explicitly). CI and package.json rely on Bun — emulate CI by using Bun locally.
- Server structure: database schemas in [server/src/models], route wiring in [server/src/routes], controllers in [server/src/controllers]. When changing API surface, update types and tests under `server/tests`.
- Frontend: App Router under [client/app]; shared UI primitives live in [client/components] and `components/ui`. Form handling uses React Hook Form + Zod — look for Zod schemas near forms (e.g., `components/form.tsx`).
- State: Zustand stores live at top-level `store/` (e.g., [store/useAuthStore.ts](store/useAuthStore.ts)). Update these when adding auth or global state behaviors.

**Integration points & external deps**

- MongoDB: connection string via `MONGO_URI` (Docker Compose exposes `mongodb` service). Tests use `mongodb-memory-server` or CI-provided Mongo.
- Auth: JWT tokens; server uses `JWT_SECRET` environment var.
- AI/Gen: server has `@google/generative-ai` in dependencies — check controllers that call external AI services before changing request/response contracts.

**Files to check when editing features**

- API changes: update [server/src/routes] and [server/src/controllers], then modify or add tests in `server/tests`.
- DB schemas: [server/src/models]
- Frontend pages/layouts: [client/app] and components in [client/components] + `components/ui`
- Shared stores and hooks: [store] and `client/components/AuthProvider.tsx`.

**Quick examples**

- Reproduce CI backend tests locally:
  - `cd server && bun install && MONGO_URI=mongodb://localhost:27017/test_db JWT_SECRET=test bun run test`
- Start full dev stack with Docker for integration testing:
  - `docker-compose up --build` (then client at http://localhost:3000, server at http://localhost:5000)

**What NOT to assume**

- Do not assume Node.js-only workflows — many scripts and CI expect Bun.
- Do not assume a hosted DB; local dev often uses Docker or `.env`-backed MongoDB.

**If you make changes**

- Run the relevant tests: `cd server && bun run test` or `cd client && bun run test`.
- Update or add unit/integration tests under `server/tests` or `client/__tests__`.

Feedback: If any section is unclear or you want me to surface other files (examples of controllers, a specific store, or test patterns), tell me which area to expand.
