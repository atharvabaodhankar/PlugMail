import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../lib/firebase'
import { API_URL } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    setError(null)
    try {
      const result = await signInWithPopup(auth, provider)
      // Sync user to backend
      const token = await result.user.getIdToken()
      await fetch(`${API_URL}/user/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }).catch(err => console.error('Failed to sync user with backend:', err))
    } catch (err) {
      // User closed popup — not really an error
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        setError(err.message)
      }
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  /**
   * Get the Firebase ID token to send to your backend as:
   * Authorization: Bearer <token>
   */
  const getIdToken = async () => {
    if (!user) return null
    return user.getIdToken()
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signInWithGoogle, logout, getIdToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
