import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <nav className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-100/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-10 group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAdmin && (
              <>
                <a href="#boards" className="text-gray-600 hover:text-brand-blue font-medium transition-colors duration-200">Boards</a>
                <a href="#contact" className="text-gray-600 hover:text-brand-blue font-medium transition-colors duration-200">Contact</a>
                <Link to="/register/tutor" className="text-gray-600 hover:text-brand-blue font-medium transition-colors duration-200">Become a Tutor</Link>
                <Link to="/register/student"
                  className="bg-gradient-to-r from-brand-orange to-brand-gold text-white px-5 py-2.5 rounded-full font-semibold hover:shadow-lg hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300">
                  Register as Student
                </Link>
              </>
            )}
            {isAdmin && (
              <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}
                className="text-gray-600 hover:text-red-500 font-medium transition-colors duration-200">Logout</button>
            )}
          </div>

          {/* Mobile */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition">
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 space-y-1 border-t border-gray-100 pt-3">
            {!isAdmin && (
              <>
                <a href="#boards" className="block py-2.5 px-3 rounded-lg text-gray-600 hover:bg-brand-blue-50 hover:text-brand-blue transition" onClick={() => setOpen(false)}>Boards</a>
                <a href="#contact" className="block py-2.5 px-3 rounded-lg text-gray-600 hover:bg-brand-blue-50 hover:text-brand-blue transition" onClick={() => setOpen(false)}>Contact</a>
                <Link to="/register/tutor" className="block py-2.5 px-3 rounded-lg text-gray-600 hover:bg-brand-blue-50 hover:text-brand-blue transition" onClick={() => setOpen(false)}>Become a Tutor</Link>
                <Link to="/register/student" className="block py-2.5 px-3 rounded-lg bg-gradient-to-r from-brand-orange to-brand-gold text-white font-semibold text-center mt-2" onClick={() => setOpen(false)}>Register as Student</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
