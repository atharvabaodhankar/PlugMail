import { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../lib/firebase'

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
      await signInWithPopup(auth, provider)
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
