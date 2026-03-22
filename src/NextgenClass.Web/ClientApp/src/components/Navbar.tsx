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
            <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-10" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAdmin && (
              <>
                <a href="#boards" className="text-gray-600 hover:text-brand-blue transition">Boards</a>
                <a href="#contact" className="text-gray-600 hover:text-brand-blue transition">Contact</a>
                <Link to="/register/tutor" className="text-gray-600 hover:text-brand-blue transition">Become a Tutor</Link>
                <Link to="/register/student" className="bg-brand-orange text-white px-4 py-2 rounded-lg hover:bg-brand-orange-dark transition">
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
                <Link to="/register/student" className="block py-2 text-brand-orange font-semibold" onClick={() => setOpen(false)}>Register as Student</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
