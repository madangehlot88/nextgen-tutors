import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">NG</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Nextgen Tutors</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAdmin && (
              <>
                <a href="#boards" className="text-gray-600 hover:text-blue-600 transition">Boards</a>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition">Contact</a>
                <Link to="/register/tutor" className="text-gray-600 hover:text-blue-600 transition">Become a Tutor</Link>
                <Link to="/register/student" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  Register as Student
                </Link>
              </>
            )}
            {isAdmin && (
              <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}
                className="text-gray-600 hover:text-red-600 transition">Logout</button>
            )}
          </div>

          {/* Mobile */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-2">
            {!isAdmin && (
              <>
                <a href="#boards" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>Boards</a>
                <a href="#contact" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>Contact</a>
                <Link to="/register/tutor" className="block py-2 text-gray-600" onClick={() => setOpen(false)}>Become a Tutor</Link>
                <Link to="/register/student" className="block py-2 text-blue-600 font-semibold" onClick={() => setOpen(false)}>Register as Student</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
