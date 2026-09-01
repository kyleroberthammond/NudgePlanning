import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AppShell() {
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="brand">NudgePlanning</span>
        {user && (
          <div className="user">
            <span className="avatar">{user.initials}</span>
            <button className="link" onClick={() => void logout()}>
              Log out
            </button>
          </div>
        )}
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
