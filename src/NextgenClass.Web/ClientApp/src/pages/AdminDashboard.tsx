import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/client'

type Tab = 'tutors' | 'students' | 'inquiries'

interface Stats { tutors: number; students: number; inquiries: number }
interface Tutor { id: number; name: string; contactNo: string; email: string; subject: string; experienceYears: number; classToTeach: string; createdAt: string }
interface Student { id: number; name: string; contactNo: string; className: string; subject: string; createdAt: string }
interface Inquiry { id: number; name: string; email: string; phone: string; message: string; createdAt: string }

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>('tutors')
  const [stats, setStats] = useState<Stats>({ tutors: 0, students: 0, inquiries: 0 })
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const navigate = useNavigate()

  const fetchData = async () => {
    try {
      const [s, t, st, i] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/tutors'),
        api.get('/students'),
        api.get('/inquiries'),
      ])
      setStats(s.data)
      setTutors(t.data)
      setStudents(st.data)
      setInquiries(i.data)
    } catch {
      localStorage.removeItem('token')
      navigate('/admin/login')
    }
  }

  useEffect(() => { fetchData() }, [])

  const handleDelete = async (type: string, id: number) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    await api.delete(`/${type}/${id}`)
    fetchData()
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const tabStyle = (t: Tab) =>
    `px-5 py-2.5 rounded-xl font-medium transition-all duration-200 ${tab === t
      ? 'bg-gradient-to-r from-brand-blue to-brand-blue-light text-white shadow-md shadow-brand-blue/20'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-10 rounded-lg" />
            <span className="text-lg font-bold text-gray-900">Admin Dashboard</span>
          </div>
          <button onClick={logout} className="text-gray-500 hover:text-red-500 font-medium transition-colors duration-200">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Tutors</p>
                <p className="text-3xl font-bold text-brand-blue mt-1">{stats.tutors}</p>
              </div>
              <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-2xl">🎓</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Students</p>
                <p className="text-3xl font-bold text-brand-orange mt-1">{stats.students}</p>
              </div>
              <div className="w-12 h-12 bg-brand-orange/10 rounded-xl flex items-center justify-center text-2xl">📚</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Total Inquiries</p>
                <p className="text-3xl font-bold text-brand-gold mt-1">{stats.inquiries}</p>
              </div>
              <div className="w-12 h-12 bg-brand-gold/10 rounded-xl flex items-center justify-center text-2xl">💬</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setTab('tutors')} className={tabStyle('tutors')}>Tutors</button>
          <button onClick={() => setTab('students')} className={tabStyle('students')}>Students</button>
          <button onClick={() => setTab('inquiries')} className={tabStyle('inquiries')}>Inquiries</button>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {tab === 'tutors' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-brand-blue-50 to-white border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Name</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Contact</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Email</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Subject</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Exp.</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Class</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-blue uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {tutors.map(t => (
                    <tr key={t.id} className="hover:bg-brand-blue-50/30 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{t.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{t.contactNo}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{t.email}</td>
                      <td className="px-5 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue">{t.subject}</span></td>
                      <td className="px-5 py-4 text-sm text-gray-600">{t.experienceYears} yrs</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{t.classToTeach}</td>
                      <td className="px-5 py-4 text-sm text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => handleDelete('tutors', t.id)} className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {tutors.length === 0 && <tr><td colSpan={8} className="px-5 py-12 text-center text-gray-400">No tutor registrations yet</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'students' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-brand-orange-50 to-white border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-orange-dark uppercase tracking-wider">Name</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-orange-dark uppercase tracking-wider">Contact</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-orange-dark uppercase tracking-wider">Class</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-orange-dark uppercase tracking-wider">Subject</th>
                    <th className="px-5 py-4 text-xs font-semibold text-brand-orange-dark uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-brand-orange-50/30 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{s.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{s.contactNo}</td>
                      <td className="px-5 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-orange/10 text-brand-orange">{s.className}</span></td>
                      <td className="px-5 py-4"><span className="text-xs font-medium px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue">{s.subject}</span></td>
                      <td className="px-5 py-4 text-sm text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => handleDelete('students', s.id)} className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">No student registrations yet</td></tr>}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'inquiries' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gradient-to-r from-amber-50 to-white border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold text-amber-700 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-4 text-xs font-semibold text-amber-700 uppercase tracking-wider">Email</th>
                    <th className="px-5 py-4 text-xs font-semibold text-amber-700 uppercase tracking-wider">Phone</th>
                    <th className="px-5 py-4 text-xs font-semibold text-amber-700 uppercase tracking-wider">Message</th>
                    <th className="px-5 py-4 text-xs font-semibold text-amber-700 uppercase tracking-wider">Date</th>
                    <th className="px-5 py-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {inquiries.map(i => (
                    <tr key={i.id} className="hover:bg-amber-50/30 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-gray-900">{i.name}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{i.email}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{i.phone || '-'}</td>
                      <td className="px-5 py-4 text-sm text-gray-600 max-w-xs truncate">{i.message}</td>
                      <td className="px-5 py-4 text-sm text-gray-400">{new Date(i.createdAt).toLocaleDateString()}</td>
                      <td className="px-5 py-4">
                        <button onClick={() => handleDelete('inquiries', i.id)} className="text-red-400 hover:text-red-600 text-sm font-medium transition-colors">Delete</button>
                      </td>
                    </tr>
                  ))}
                  {inquiries.length === 0 && <tr><td colSpan={6} className="px-5 py-12 text-center text-gray-400">No inquiries yet</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
