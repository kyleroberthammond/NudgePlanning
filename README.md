# NudgePlanning

A personal project management app, built the way I want it.

- **`backend/`** — [AdonisJS 6](https://adonisjs.com) REST API (TypeScript, Lucid ORM, SQLite in dev)
- **`frontend/`** — [React](https://react.dev) SPA (Vite + TypeScript + React Router)

The two are separate apps that talk over HTTP: the frontend calls the API with a bearer
token, there's no server-rendered views or shared build step.

## What's here so far

Bootstrapped app skeleton with working auth:

- Sign up, log in, log out (token-based, via `@adonisjs/auth` access tokens)
- A protected dashboard route in the frontend that redirects to `/login` when signed out
- Session persists across page reloads (token kept in `localStorage`, validated against
  `GET /api/v1/account/profile` on load)

Project/task management features are not built yet — that's next.

## Running it locally

You need both processes running at once. Each app pins its Node version via
`.nvmrc` (also at the repo root) — run `nvm use` in a directory before installing
if you use [nvm](https://github.com/nvm-sh/nvm).

### Backend (http://localhost:3333)

```sh
cd backend
cp .env.example .env   # first time only
npm install
node ace generate:key  # first time only, writes APP_KEY into .env
node ace migration:run # first time only, creates backend/tmp/db.sqlite3
npm run dev
```

SQLite works out of the box — nothing else to configure. See `config/database.ts` to
switch to Postgres/MySQL later.

### Frontend (http://localhost:5173)

```sh
cd frontend
cp .env.example .env   # first time only, sets VITE_API_URL
npm install
npm run dev
```

Open http://localhost:5173 — it redirects to `/signup` the first time.

## API surface (v1)

All routes are prefixed with `/api/v1`.

| Method | Path                | Auth | Description                     |
| ------ | ------------------- | ---- | -------------------------------- |
| POST   | `/auth/signup`       | No   | Create an account, returns a token |
| POST   | `/auth/login`        | No   | Log in, returns a token          |
| GET    | `/account/profile`   | Yes  | Current user                     |
| POST   | `/account/logout`    | Yes  | Revoke the current token         |

Authenticated requests send `Authorization: Bearer <token>`.

## Tech choices

- **AdonisJS "api" starter kit** — REST API with both token and session auth guards
  pre-wired; token guard (`api`) is the default, which suits a decoupled SPA frontend.
- **SQLite for local dev** — zero setup; swap to Postgres/MySQL in `config/database.ts`
  when deploying.
- **Token auth over sessions** — the frontend is a separate origin/app, so a bearer token
  in `localStorage` is simpler than cross-origin session cookies. CORS is wide open in
  dev (`config/cors.ts`) and locked down (empty allowlist) by default in production.
