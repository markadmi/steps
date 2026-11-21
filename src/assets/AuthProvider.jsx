import { useState } from 'react'
import { AuthContext } from './auth-context.js'

const SESSION_KEY = 'steps-demo-session'

function isValidUser(value) {
  return value !== null
    && typeof value === 'object'
    && typeof value.email === 'string'
    && typeof value.name === 'string'
    && (value.avatar === null || typeof value.avatar === 'string')
}

function loadSession() {
  try {
    const storedSession = sessionStorage.getItem(SESSION_KEY)
    if (!storedSession) return { user: null, error: '' }

    const user = JSON.parse(storedSession)
    if (!isValidUser(user)) throw new Error('تنسيق الجلسة غير صالح.')
    return { user, error: '' }
  } catch {
    return { user: null, error: 'تعذر استعادة جلسة الدخول من هذا المتصفح.' }
  }
}

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(loadSession)

  function signIn(user) {
    const normalizedUser = {
      name: user.name || user.email,
      email: user.email.trim(),
      avatar: user.avatar || null,
    }

    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(normalizedUser))
    } catch {
      throw new Error('تعذر بدء جلسة الدخول في هذا المتصفح.')
    }

    setSession({ user: normalizedUser, error: '' })
  }

  function signOut() {
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      throw new Error('تعذر إنهاء جلسة الدخول.')
    }

    setSession({ user: null, error: '' })
  }

  return (
    <AuthContext.Provider
      value={{
        user: session.user,
        error: session.error,
        isAuthenticated: Boolean(session.user),
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
