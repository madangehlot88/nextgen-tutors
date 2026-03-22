import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NG</span>
              </div>
              <span className="text-lg font-bold text-white">Nextgen Tutors</span>
            </div>
            <p className="text-sm">Expert science tutoring for CBSE, ICSE, GSEB, JEE Mains & Advanced, and NEET.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/register/student" className="hover:text-white transition">Register as Student</Link></li>
              <li><Link to="/register/tutor" className="hover:text-white transition">Become a Tutor</Link></li>
              <li><a href="#contact" className="hover:text-white transition">Contact Us</a></li>
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
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Nextgen Tutors for Science. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
