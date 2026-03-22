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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-16 mx-auto mb-4 rounded" />
          <h1 className="text-2xl font-bold text-brand-blue">Admin Login</h1>
          <p className="text-gray-600 mt-1">NextGen Coaching Classes Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm space-y-5">
          {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" required value={username} onChange={e => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none" />
          </div>

          <button type="submit" className="w-full bg-brand-blue text-white py-3 rounded-lg font-semibold hover:bg-brand-blue-dark transition">
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
