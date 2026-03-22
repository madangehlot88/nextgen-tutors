import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/client'

const boards = [
  { name: 'CBSE', desc: 'Complete science coaching for Classes 6-12 following CBSE curriculum', color: 'from-blue-500 to-blue-700' },
  { name: 'ICSE', desc: 'In-depth science preparation aligned with ICSE syllabus', color: 'from-green-500 to-green-700' },
  { name: 'GSEB', desc: 'Gujarat Board science subjects with expert local tutors', color: 'from-orange-500 to-orange-700' },
  { name: 'JEE Mains & Advanced', desc: 'Physics, Chemistry & Math coaching for IIT aspirants', color: 'from-purple-500 to-purple-700' },
  { name: 'NEET', desc: 'Biology, Physics & Chemistry preparation for medical entrance', color: 'from-red-500 to-red-700' },
  { name: 'Foundation', desc: 'Strong foundation building for Classes 6-10 in all science subjects', color: 'from-teal-500 to-teal-700' },
  { name: 'Olympiad', desc: 'Specialized preparation for Science & Math Olympiad competitions', color: 'from-amber-500 to-amber-700' },
]

export default function LandingPage() {
  const [inquiry, setInquiry] = useState({ name: '', email: '', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    try {
      await api.post('/inquiries', inquiry)
      setSubmitted(true)
      setInquiry({ name: '', email: '', phone: '', message: '' })
    } catch {
      setError('Failed to submit. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-28 md:h-36 mx-auto mb-6 rounded-lg shadow-lg" />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              NextGen Coaching Classes
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-4">
              JEE | NEET | Foundation | Olympiad
            </p>
            <p className="text-lg text-blue-200 mb-10">
              NextGen learning for Next-Level Results. Expert coaching for CBSE, ICSE, GSEB & competitive exams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/student" className="bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-50 transition shadow-lg">
                Register as Student
              </Link>
              <Link to="/register/tutor" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition">
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose NextGen Coaching Classes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Tutors', desc: 'Qualified and experienced science tutors handpicked for quality teaching.', icon: '🎓' },
              { title: 'All Boards Covered', desc: 'CBSE, ICSE, GSEB curriculum plus competitive exam preparation.', icon: '📚' },
              { title: 'Personalized Learning', desc: 'One-on-one attention to help every student reach their potential.', icon: '🎯' },
            ].map((item) => (
              <div key={item.title} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards */}
      <section id="boards" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Boards & Competitive Exams</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <div key={board.name} className={`bg-gradient-to-br ${board.color} text-white p-8 rounded-xl shadow-lg hover:scale-105 transition-transform`}>
                <h3 className="text-2xl font-bold mb-3">{board.name}</h3>
                <p className="text-white/90">{board.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Subjects We Teach</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Physics', 'Chemistry', 'Biology', 'Mathematics', 'Science (General)'].map((s) => (
              <span key={s} className="bg-white border border-gray-200 px-6 py-3 rounded-full text-gray-700 font-medium shadow-sm">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry */}
      <section id="contact" className="py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Have a Question? Contact Us</h2>
          {submitted ? (
            <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl text-center">
              <p className="text-lg font-semibold">Thank you for your inquiry!</p>
              <p className="mt-2">We'll get back to you soon.</p>
              <button onClick={() => setSubmitted(false)} className="mt-4 text-green-600 underline">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 p-8 rounded-xl shadow-sm space-y-5">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                <input type="text" required value={inquiry.name} onChange={e => setInquiry({ ...inquiry, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input type="email" required value={inquiry.email} onChange={e => setInquiry({ ...inquiry, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" value={inquiry.phone} onChange={e => setInquiry({ ...inquiry, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                <textarea required rows={4} value={inquiry.message} onChange={e => setInquiry({ ...inquiry, message: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
