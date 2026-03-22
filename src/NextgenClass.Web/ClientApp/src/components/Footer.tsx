import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-gray-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center mb-5">
              <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-14 rounded-lg shadow-md" />
            </div>
            <p className="text-sm leading-relaxed text-gray-500">NextGen learning for Next-Level Results. Expert coaching for JEE, NEET, Foundation & Olympiad.</p>
            <div className="flex space-x-3 mt-5">
              <span className="w-2 h-2 rounded-full bg-brand-blue"></span>
              <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
              <span className="w-2 h-2 rounded-full bg-brand-gold"></span>
            </div>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/register/student" className="hover:text-brand-orange-light transition-colors duration-200">Register as Student</Link></li>
              <li><Link to="/register/tutor" className="hover:text-brand-orange-light transition-colors duration-200">Become a Tutor</Link></li>
              <li><a href="#contact" className="hover:text-brand-orange-light transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Boards & Exams</h3>
            <div className="flex flex-wrap gap-2">
              {['CBSE', 'ICSE', 'GSEB', 'JEE', 'NEET', 'Foundation', 'Olympiad'].map(b => (
                <span key={b} className="text-xs px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400">{b}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-gray-600">
          <p>&copy; {new Date().getFullYear()} NextGen Coaching Classes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
