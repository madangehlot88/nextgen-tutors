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

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all duration-200"

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-lg mx-auto px-4 py-24 text-center">
          <div className="bg-white p-12 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="text-6xl mb-5">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Successful!</h2>
            <p className="text-gray-500 mb-8">Thank you for registering. We'll match you with the best tutor soon.</p>
            <Link to="/" className="inline-flex items-center text-brand-blue font-semibold hover:underline">
              ← Back to Home
            </Link>
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
        <div className="mb-8">
          <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Get Started</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-1">Student Registration</h1>
          <p className="text-gray-500 mt-2">Register to find your perfect science tutor</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-8 md:p-10 rounded-2xl shadow-xl shadow-gray-200/50 space-y-5">
          {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
            <input type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name" className={inputClass} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Contact Number *</label>
            <input type="tel" required value={form.contactNo} onChange={e => setForm({ ...form, contactNo: e.target.value })}
              placeholder="+91 98765 43210" className={inputClass} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class *</label>
              <select required value={form.className} onChange={e => setForm({ ...form, className: e.target.value })} className={inputClass}>
                <option value="">Select Class</option>
                {classes.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Subject *</label>
              <select required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} className={inputClass}>
                <option value="">Select Subject</option>
                {subjects.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <button type="submit"
            className="w-full bg-gradient-to-r from-brand-orange to-brand-gold text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300">
            Register as Student
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}
