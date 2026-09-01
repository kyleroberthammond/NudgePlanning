import { useAuth } from '../context/AuthContext'

/**
 * Placeholder landing page after login. The actual project-management
 * features (projects, tasks, boards, etc.) get built out from here.
 */
export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div>
      <h1>Welcome{user?.fullName ? `, ${user.fullName}` : ''} 👋</h1>
      <p>You're logged in. This is where your projects will live.</p>

      <div className="empty-state">
        <p>No projects yet — project management features are coming next.</p>
      </div>
    </div>
  )
}
