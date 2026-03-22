import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      const res = await api.post('/auth/login', { username, password })
      localStorage.setItem('token', res.data.token)
      navigate('/admin/dashboard')
    } catch {
      setError('Invalid username or password')
    }
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all duration-200"

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-blue-50 via-white to-brand-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in-up">
          <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-20 mx-auto mb-5 rounded-xl shadow-lg" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
          <p className="text-gray-500 mt-1">NextGen Coaching Classes Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 rounded-2xl shadow-xl shadow-gray-200/50 space-y-5">
          {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)}
              placeholder="Enter username" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              placeholder="Enter password" className={inputClass} />
          </div>

          <button type="submit"
            className="w-full bg-gradient-to-r from-brand-blue to-brand-blue-light text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/30 hover:-translate-y-0.5 transition-all duration-300">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
