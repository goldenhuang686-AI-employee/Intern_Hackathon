import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import DeckView from './pages/DeckView'
import StudyMode from './pages/StudyMode'
import GenerateCards from './pages/GenerateCards'

// Redirects unauthenticated users to /login
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="page-container">Loading…</div>
  if (!user) return <Navigate to="/login" replace />
  return children
}

// Redirects already-authenticated users away from auth pages
function GuestRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return <div className="page-container">Loading…</div>
  if (user) return <Navigate to="/dashboard" replace />
  return children
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/login" element={
          <GuestRoute><Login /></GuestRoute>
        } />
        <Route path="/signup" element={
          <GuestRoute><Signup /></GuestRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/deck/:id" element={
          <ProtectedRoute><DeckView /></ProtectedRoute>
        } />
        <Route path="/deck/:id/study" element={
          <ProtectedRoute><StudyMode /></ProtectedRoute>
        } />
        <Route path="/deck/:id/generate" element={
          <ProtectedRoute><GenerateCards /></ProtectedRoute>
        } />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
