import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Guards nested routes, redirecting signed-out visitors to /login. */
export function ProtectedRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}

/** Keeps signed-in users away from /login and /signup. */
export function GuestRoute() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/dashboard" replace />

  return <Outlet />
}
