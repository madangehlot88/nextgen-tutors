import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import api from '../api/client'

const boards = [
  { name: 'CBSE', desc: 'Complete science coaching for Classes 6-12 following CBSE curriculum', icon: '📘' },
  { name: 'ICSE', desc: 'In-depth science preparation aligned with ICSE syllabus', icon: '📗' },
  { name: 'GSEB', desc: 'Gujarat Board science subjects with expert local tutors', icon: '📙' },
  { name: 'JEE Mains & Advanced', desc: 'Physics, Chemistry & Math coaching for IIT aspirants', icon: '🚀' },
  { name: 'NEET', desc: 'Biology, Physics & Chemistry preparation for medical entrance', icon: '🔬' },
  { name: 'Foundation', desc: 'Strong foundation building for Classes 6-10 in all science subjects', icon: '🏗️' },
  { name: 'Olympiad', desc: 'Specialized preparation for Science & Math Olympiad competitions', icon: '🏆' },
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

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue focus:bg-white outline-none transition-all duration-200"

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-blue-dark via-brand-blue to-brand-blue-light animate-gradient text-white">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-brand-blue-light/30 rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="text-center max-w-3xl mx-auto animate-fade-in-up">
            <div className="inline-block mb-8">
              <img src="/logo.jpeg" alt="NextGen Coaching Classes"
                className="h-28 md:h-36 mx-auto rounded-2xl shadow-2xl shadow-black/30 ring-2 ring-white/20" />
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              NextGen
              <span className="bg-gradient-to-r from-brand-orange-light via-brand-gold to-brand-orange bg-clip-text text-transparent"> Coaching </span>
              Classes
            </h1>
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/20 mb-6">
              <span className="font-semibold text-brand-orange-light">JEE</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="font-semibold text-brand-orange-light">NEET</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="font-semibold text-brand-orange-light">Foundation</span>
              <span className="w-1 h-1 rounded-full bg-white/50"></span>
              <span className="font-semibold text-brand-orange-light">Olympiad</span>
            </div>
            <p className="text-lg md:text-xl text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              NextGen learning for Next-Level Results. Expert coaching for CBSE, ICSE, GSEB & competitive exams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register/student"
                className="group bg-gradient-to-r from-brand-orange to-brand-gold text-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl shadow-brand-orange/30 hover:shadow-2xl hover:shadow-brand-orange/40 hover:-translate-y-1 transition-all duration-300">
                Register as Student
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link to="/register/tutor"
                className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/20 hover:-translate-y-1 transition-all duration-300">
                Become a Tutor
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 80L60 68C120 56 240 32 360 24C480 16 600 24 720 32C840 40 960 48 1080 44C1200 40 1320 24 1380 16L1440 8V80H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Why Choose NextGen Coaching?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Expert Tutors', desc: 'Qualified and experienced science tutors handpicked for quality teaching.', icon: '🎓', gradient: 'from-brand-blue/10 to-brand-blue-light/10' },
              { title: 'All Boards Covered', desc: 'CBSE, ICSE, GSEB curriculum plus competitive exam preparation.', icon: '📚', gradient: 'from-brand-orange/10 to-brand-gold/10' },
              { title: 'Personalized Learning', desc: 'One-on-one attention to help every student reach their potential.', icon: '🎯', gradient: 'from-brand-blue-light/10 to-brand-orange/10' },
            ].map((item) => (
              <div key={item.title}
                className={`group bg-gradient-to-br ${item.gradient} p-8 rounded-2xl border border-gray-100 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300`}>
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards */}
      <section id="boards" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Programs</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Boards & Competitive Exams</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {boards.map((board) => (
              <div key={board.name}
                className="group relative bg-white border border-gray-100 p-6 rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-blue-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{board.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors duration-300">{board.name}</h3>
                  <p className="text-sm text-gray-500 group-hover:text-blue-100 transition-colors duration-300 leading-relaxed">{board.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-20 bg-gradient-to-br from-brand-blue-50 to-brand-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-brand-orange font-semibold text-sm uppercase tracking-wider">Curriculum</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-12">Subjects We Teach</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'Physics', emoji: '⚛️' },
              { name: 'Chemistry', emoji: '🧪' },
              { name: 'Biology', emoji: '🧬' },
              { name: 'Mathematics', emoji: '📐' },
              { name: 'Science', emoji: '🔭' },
            ].map((s) => (
              <span key={s.name}
                className="group bg-white border border-gray-200 px-6 py-3.5 rounded-full text-gray-700 font-medium shadow-sm hover:shadow-md hover:border-brand-blue/30 hover:-translate-y-0.5 transition-all duration-200 cursor-default">
                <span className="mr-2 group-hover:scale-110 inline-block transition-transform">{s.emoji}</span>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Inquiry */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-brand-blue font-semibold text-sm uppercase tracking-wider">Get in Touch</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Have a Question?</h2>
          </div>
          {submitted ? (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-10 rounded-2xl text-center">
              <div className="text-5xl mb-4">✅</div>
              <p className="text-xl font-bold text-green-800">Thank you for your inquiry!</p>
              <p className="mt-2 text-green-600">We'll get back to you soon.</p>
              <button onClick={() => setSubmitted(false)}
                className="mt-6 text-brand-blue font-semibold hover:underline">Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}
              className="bg-white border border-gray-100 p-8 md:p-10 rounded-2xl shadow-xl shadow-gray-200/50 space-y-5">
              {error && <p className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">{error}</p>}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
                <input type="text" required value={inquiry.name} onChange={e => setInquiry({ ...inquiry, name: e.target.value })}
                  placeholder="Your full name" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <input type="email" required value={inquiry.email} onChange={e => setInquiry({ ...inquiry, email: e.target.value })}
                  placeholder="you@example.com" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                <input type="tel" value={inquiry.phone} onChange={e => setInquiry({ ...inquiry, phone: e.target.value })}
                  placeholder="+91 98765 43210" className={inputClass} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Message *</label>
                <textarea required rows={4} value={inquiry.message} onChange={e => setInquiry({ ...inquiry, message: e.target.value })}
                  placeholder="How can we help you?" className={inputClass} />
              </div>
              <button type="submit"
                className="w-full bg-gradient-to-r from-brand-orange to-brand-gold text-white py-3.5 rounded-xl font-semibold text-lg shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/30 hover:-translate-y-0.5 transition-all duration-300">
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
