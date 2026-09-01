# NudgePlanning

A personal project management app, built the way I want it.

- **`backend/`** — [AdonisJS 6](https://adonisjs.com) REST API (TypeScript, Lucid ORM, SQLite in dev)
- **`frontend/`** — [React](https://react.dev) SPA (Vite + TypeScript + React Router)

The two are separate apps that talk over HTTP: the frontend calls the API with a bearer
token, there's no server-rendered views or shared build step.

## What's here so far

**Auth**

- Sign up, log in, log out (token-based, via `@adonisjs/auth` access tokens)
- A protected app shell in the frontend that redirects to `/login` when signed out
- Session persists across page reloads (token kept in `localStorage`, validated against
  `GET /api/v1/account/profile` on load)

**Projects → Features → Tasks**

- Three levels deep: a project has many features, a feature has many tasks. Each level
  shares the same fields — name, start date, due date, status (`Not Started`, `In Progress`,
  `On Hold`, `Completed`) — and each user only sees their own tree
- Every list (`/projects`, a project's features, a feature's tasks) has a List/Kanban toggle
  (preference remembered per-browser); Kanban supports drag-and-drop between columns to
  change status
- Press <kbd>C</kbd> anywhere on a list page (not while typing in a field) to open the "new"
  form for whatever you're looking at
- Feature and task pages have **comments** (threaded by author) and **attachments** (drag a
  file in, or click to browse; download re-fetches with your auth token since it's not a
  plain static link)
- Breadcrumbs (Project / Feature / Task) on every detail page

**Releases**

- A release belongs to a project and can have features and/or tasks assigned to it (a
  feature/task can only be in one release at a time — reassigning moves it)
- Assign from the release's own page (an "Add items" picker over the project's features/
  tasks) or set a feature/task's Release field directly when creating/editing it from its
  project page
- Deleting a release un-assigns its items rather than deleting them

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

All routes are prefixed with `/api/v1` and require `Authorization: Bearer <token>` unless
noted. `startDate`/`dueDate`/`targetDate` are plain `"YYYY-MM-DD"` strings or `null`.
Project/feature/task `status` is one of `not_started`, `in_progress`, `on_hold`, `completed`;
release `status` is one of `planned`, `in_progress`, `released`.

| Method | Path                              | Description                              |
| ------ | --------------------------------- | ----------------------------------------- |
| POST   | `/auth/signup`                    | Create an account, returns a token (no auth) |
| POST   | `/auth/login`                     | Log in, returns a token (no auth)         |
| GET    | `/account/profile`                | Current user                              |
| POST   | `/account/logout`                 | Revoke the current token                  |
| GET/POST | `/projects`                     | List / create projects                    |
| GET/PUT/DELETE | `/projects/:id`            | A project, with its features/tasks/releases on GET |
| GET/POST | `/projects/:projectId/features` | List / create a project's features        |
| GET/PUT/DELETE | `/features/:id`            | A feature, with its tasks/comments/attachments on GET |
| GET/POST | `/features/:featureId/tasks`    | List / create a feature's tasks           |
| GET/PUT/DELETE | `/tasks/:id`                | A task, with its comments/attachments on GET |
| GET/POST | `/projects/:projectId/releases` | List / create a project's releases        |
| GET/PUT/DELETE | `/releases/:id`             | A release, with its assigned features/tasks on GET |
| GET/POST | `/features/:featureId/comments` and `/tasks/:taskId/comments` | List / add comments |
| DELETE | `/comments/:id`                   | Delete your own comment                   |
| GET/POST | `/features/:featureId/attachments` and `/tasks/:taskId/attachments` | List / upload (multipart) |
| GET    | `/attachments/:id/download`       | Download a file                           |
| DELETE | `/attachments/:id`                | Delete a file                             |

A feature/task's `releaseId` (settable via its own PUT, or via the release's picker) is
`null` when unassigned; setting it validates the release belongs to the same project.

## Tech choices

- **AdonisJS "api" starter kit** — REST API with both token and session auth guards
  pre-wired; token guard (`api`) is the default, which suits a decoupled SPA frontend.
- **SQLite for local dev** — zero setup; swap to Postgres/MySQL in `config/database.ts`
  when deploying.
- **Token auth over sessions** — the frontend is a separate origin/app, so a bearer token
  in `localStorage` is simpler than cross-origin session cookies. CORS is wide open in
  dev (`config/cors.ts`) and locked down (empty allowlist) by default in production.
- **Attachments on local disk** — uploaded files land in `backend/storage/uploads/` (not
  committed; not under `public/`, so downloads always go through the auth-checked route).
  Swap in real object storage (S3, etc.) if this ever needs to run somewhere the local
  disk isn't durable.
- **Comments/attachments are polymorphic, not per-table** — one `comments` table and one
  `attachments` table, each with a `commentable_type`/`attachable_type` column (`feature`
  or `task`) instead of a real foreign key, since SQLite can't FK against "whichever table
  this row happens to point at." Ownership and cleanup on delete are handled in
  `app/services/ownership.ts` and `app/services/cleanup.ts` instead of at the DB level.
