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

**Projects**

- A project is just a name, start date, due date, and status (`Not Started`, `In Progress`,
  `On Hold`, `Completed`) — each user only sees their own
- `/projects` has a List/Kanban toggle (preference remembered per-browser); the Kanban board
  supports drag-and-drop between columns to change status
- Press <kbd>C</kbd> anywhere on the page (not while typing in a field) to open the
  "new project" form

Tasks, boards per project, etc. aren't built yet — that's next.

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

### Android app (Capacitor)

`frontend/android` is a [Capacitor](https://capacitorjs.com) wrapper around the same React
app, so it stays in sync with the web build rather than being a separate codebase.

```sh
cd frontend
npm run build      # produces dist/
npx cap sync android   # copies dist/ into the Android project + updates native plugins
npx cap open android   # opens the project in Android Studio
```

Run the app from Android Studio (or `cd android && ./gradlew assembleDebug` if you have the
Android SDK set up without Studio). Repeat the `build` + `sync` steps after every frontend
change you want reflected in the app.

#### Push notifications

Push is wired end to end (device registration → backend storage → Firebase Cloud Messaging)
but needs a Firebase project to actually deliver anything, since FCM is Google's delivery
mechanism and there's no way around having credentials for it:

1. Create a Firebase project at https://console.firebase.google.com (free tier is fine).
2. Add an Android app to it with package name `com.nudgeplanning.app`.
3. Download the generated `google-services.json` and place it at
   `frontend/android/app/google-services.json` (see
   `google-services.json.example` in that folder for the shape — this real file is
   gitignored since it's per-developer/per-project, not a secret to share around casually).
4. In Firebase Console, go to Project settings → Service accounts → Generate new private
   key. That JSON gives you `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL` and
   `FIREBASE_PRIVATE_KEY` — set those in `backend/.env` (see `.env.example`; the private key
   has literal `\n` sequences in it, which is fine, they get unescaped at runtime).
5. Rebuild the Android app (`npm run build && npx cap sync android`) so the new
   `google-services.json` gets picked up, then run it on a device or emulator with Google
   Play services.

Once a signed-in user opens the app, it requests notification permission, registers with
FCM, and POSTs the resulting token to `POST /api/v1/account/device-tokens`. The "Send test
notification" button in the header hits `POST /api/v1/account/push-test`, which sends a push
to every device registered for the current user via `PushNotificationService` — useful for
confirming the whole pipeline works before building any real notification-triggering
features on top of it.

## API surface (v1)

All routes are prefixed with `/api/v1`.

| Method | Path              | Auth | Description                          |
| ------ | ----------------- | ---- | ------------------------------------- |
| POST   | `/auth/signup`     | No   | Create an account, returns a token    |
| POST   | `/auth/login`      | No   | Log in, returns a token               |
| GET    | `/account/profile` | Yes  | Current user                          |
| POST   | `/account/logout`  | Yes  | Revoke the current token              |
| GET    | `/projects`        | Yes  | List the current user's projects      |
| POST   | `/projects`        | Yes  | Create a project                      |
| PUT    | `/projects/:id`    | Yes  | Update a project (full or partial)    |
| DELETE | `/projects/:id`    | Yes  | Delete a project                      |
| POST   | `/account/device-tokens`       | Yes  | Register this device's push token       |
| DELETE | `/account/device-tokens/:token` | Yes  | Unregister a device's push token        |
| POST   | `/account/push-test`           | Yes  | Send a test push to the user's devices  |

Authenticated requests send `Authorization: Bearer <token>`. A project's `startDate` and
`dueDate` are plain `"YYYY-MM-DD"` strings or `null`; `status` is one of `not_started`,
`in_progress`, `on_hold`, `completed`.

## Tech choices

- **AdonisJS "api" starter kit** — REST API with both token and session auth guards
  pre-wired; token guard (`api`) is the default, which suits a decoupled SPA frontend.
- **SQLite for local dev** — zero setup; swap to Postgres/MySQL in `config/database.ts`
  when deploying.
- **Token auth over sessions** — the frontend is a separate origin/app, so a bearer token
  in `localStorage` is simpler than cross-origin session cookies. CORS is wide open in
  dev (`config/cors.ts`) and locked down (empty allowlist) by default in production.
