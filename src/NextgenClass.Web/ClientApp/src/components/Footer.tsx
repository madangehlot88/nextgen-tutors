import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-blue-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-12 rounded" />
            </div>
            <p className="text-sm text-blue-200/80">NextGen learning for Next-Level Results. Expert coaching for JEE, NEET, Foundation & Olympiad.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register/student" className="hover:text-brand-orange-light transition">Register as Student</Link></li>
              <li><Link to="/register/tutor" className="hover:text-brand-orange-light transition">Become a Tutor</Link></li>
              <li><a href="#contact" className="hover:text-brand-orange-light transition">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Boards & Exams</h3>
            <ul className="space-y-2 text-sm">
              <li>CBSE</li>
              <li>ICSE</li>
              <li>GSEB</li>
              <li>JEE Mains & Advanced</li>
              <li>NEET</li>
              <li>Foundation & Olympiad</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-blue-200/20 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NextGen Coaching Classes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
