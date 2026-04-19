import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import ApiKeysPage from './pages/ApiKeysPage'
import GmailAccountsPage from './pages/GmailAccountsPage'
import TemplatesPage from './pages/TemplatesPage'
import PlaygroundPage from './pages/PlaygroundPage'
import AnalyticsPage from './pages/AnalyticsPage'
import DocsPage from './pages/DocsPage'
import LandingPage from './pages/LandingPage'

/** Shows a full-screen spinner while Firebase resolves auth state on first load */
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#E5E7EB] border-t-[#0A84FF] animate-spin" />
        <p className="text-sm font-body text-[#6B7280]">Loading…</p>
      </div>
    </div>
  )
}

/** Redirects unauthenticated users to /login */
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (!user)   return <Navigate to="/login" replace />
  return children
}

/** Redirects already-logged-in users away from /login */
function PublicRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return <LoadingScreen />
  if (user)    return <Navigate to="/dashboard" replace />
  return children
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><LoginPage /></PublicRoute>} />

      <Route path="/" element={<LandingPage />} />

      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard"  element={<OverviewPage />} />
        <Route path="/keys"       element={<ApiKeysPage />} />
        <Route path="/accounts"   element={<GmailAccountsPage />} />
        <Route path="/templates"  element={<TemplatesPage />} />
        <Route path="/playground" element={<PlaygroundPage />} />
        <Route path="/analytics"  element={<AnalyticsPage />} />
        <Route path="/docs"       element={<DocsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
