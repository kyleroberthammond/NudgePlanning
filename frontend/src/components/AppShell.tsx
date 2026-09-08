import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { sendTestPush } from '../lib/pushTokens'

export function AppShell() {
  const { user, logout } = useAuth()
  const [pushStatus, setPushStatus] = useState<string | null>(null)

  async function handleTestPush() {
    setPushStatus('Sending…')
    try {
      const { sent } = await sendTestPush()
      setPushStatus(
        sent > 0 ? `Sent to ${sent} device${sent === 1 ? '' : 's'}.` : 'No devices registered yet.',
      )
    } catch (error) {
      setPushStatus(error instanceof Error ? error.message : 'Failed to send.')
    }
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <span className="brand">NudgePlanning</span>
        {user && (
          <div className="user">
            {pushStatus && <span className="push-status">{pushStatus}</span>}
            <button className="link" onClick={() => void handleTestPush()}>
              Send test notification
            </button>
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
