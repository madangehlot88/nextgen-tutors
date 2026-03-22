import { Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TutorRegistration from './pages/TutorRegistration'
import StudentRegistration from './pages/StudentRegistration'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register/tutor" element={<TutorRegistration />} />
      <Route path="/register/student" element={<StudentRegistration />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
