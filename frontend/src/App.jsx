import { Routes, Route, Navigate } from 'react-router-dom'
import DashboardLayout from './layouts/DashboardLayout'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import ApiKeysPage from './pages/ApiKeysPage'
import GmailAccountsPage from './pages/GmailAccountsPage'
import TemplatesPage from './pages/TemplatesPage'
import PlaygroundPage from './pages/PlaygroundPage'
import AnalyticsPage from './pages/AnalyticsPage'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<OverviewPage />} />
        <Route path="keys" element={<ApiKeysPage />} />
        <Route path="accounts" element={<GmailAccountsPage />} />
        <Route path="templates" element={<TemplatesPage />} />
        <Route path="playground" element={<PlaygroundPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default App
