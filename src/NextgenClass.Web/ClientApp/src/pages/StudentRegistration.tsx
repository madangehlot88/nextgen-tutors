import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/client'

const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Science (General)']
const classes = ['6th', '7th', '8th', '9th', '10th', '11th', '12th', 'JEE Mains', 'JEE Advanced', 'NEET']

export default function StudentRegistration() {
  const [form, setForm] = useState({ name: '', contactNo: '', className: '', subject: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/students', form)
      setSubmitted(true)
    } catch {
      setError('Registration failed. Please try again.')
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-20 text-center">
          <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">Thank you for registering. We'll match you with the best tutor soon.</p>
            <Link to="/" className="text-brand-blue font-semibold hover:underline">Back to Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-brand-blue mb-2">Student Registration</h1>
        <p className="text-gray-600 mb-8">Register to find your perfect science tutor</p>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm space-y-5">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
            <input type="tel" required value={form.contactNo} onChange={e => setForm({ ...form, contactNo: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
            <select required value={form.className} onChange={e => setForm({ ...form, className: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none">
              <option value="">Select Class</option>
              {classes.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue outline-none">
              <option value="">Select Subject</option>
              {subjects.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <button type="submit" className="w-full bg-brand-orange text-white py-3 rounded-lg font-semibold hover:bg-brand-orange-dark transition">
            Register as Student
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
