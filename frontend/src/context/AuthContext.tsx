import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { api, getToken, setToken } from '../lib/api'
import { initPushNotifications, teardownPushNotifications } from '../lib/pushNotifications'
import type { AuthPayload, User } from '../types'

interface AuthContextValue {
  user: User | null
  /** True while the initial "am I already logged in?" check is in flight. */
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (
    fullName: string,
    email: string,
    password: string,
    passwordConfirmation: string,
  ) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadCurrentUser() {
      if (!getToken()) {
        setLoading(false)
        return
      }

      try {
        const profile = await api.get<User>('/account/profile')
        if (!cancelled) setUser(profile)
        void initPushNotifications()
      } catch {
        // Token missing/expired/invalid — drop it and treat as signed out.
        setToken(null)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadCurrentUser()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { token, user: loggedInUser } = await api.post<AuthPayload>('/auth/login', {
      email,
      password,
    })
    setToken(token)
    setUser(loggedInUser)
    void initPushNotifications()
  }, [])

  const signup = useCallback(
    async (fullName: string, email: string, password: string, passwordConfirmation: string) => {
      const { token, user: newUser } = await api.post<AuthPayload>('/auth/signup', {
        fullName,
        email,
        password,
        passwordConfirmation,
      })
      setToken(token)
      setUser(newUser)
      void initPushNotifications()
    },
    [],
  )

  const logout = useCallback(async () => {
    await teardownPushNotifications()
    try {
      await api.post('/account/logout')
    } catch {
      // Even if the server call fails, still clear local state below.
    } finally {
      setToken(null)
      setUser(null)
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
