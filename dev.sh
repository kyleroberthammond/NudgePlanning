#!/usr/bin/env bash
# Starts backend (Adonis) and frontend (Vite) together for local testing.
# Ctrl+C stops both.

set -euo pipefail
root="$(cd "$(dirname "$0")" && pwd)"

cleanup() {
  trap - EXIT INT TERM
  [[ -n "${backend_pid:-}" ]] && kill "$backend_pid" 2>/dev/null || true
  [[ -n "${frontend_pid:-}" ]] && kill "$frontend_pid" 2>/dev/null || true
  wait 2>/dev/null || true
}
trap cleanup EXIT INT TERM

(cd "$root/backend" && npm run dev) &
backend_pid=$!

(cd "$root/frontend" && npm run dev) &
frontend_pid=$!

echo "backend  → http://localhost:3333  (pid $backend_pid)"
echo "frontend → http://localhost:5173  (pid $frontend_pid)"
echo "Ctrl+C to stop both."

wait
