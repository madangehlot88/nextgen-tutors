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
    `px-4 py-2 rounded-lg font-medium transition ${tab === t ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/logo.jpeg" alt="NextGen Coaching Classes" className="h-10 rounded" />
            <span className="text-lg font-bold text-gray-900">Admin Dashboard</span>
          </div>
          <button onClick={logout} className="text-gray-600 hover:text-red-600 transition font-medium">Logout</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Tutors</p>
            <p className="text-3xl font-bold text-blue-600">{stats.tutors}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Students</p>
            <p className="text-3xl font-bold text-green-600">{stats.students}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <p className="text-sm text-gray-500">Total Inquiries</p>
            <p className="text-3xl font-bold text-purple-600">{stats.inquiries}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-6">
          <button onClick={() => setTab('tutors')} className={tabStyle('tutors')}>Tutors</button>
          <button onClick={() => setTab('students')} className={tabStyle('students')}>Students</button>
          <button onClick={() => setTab('inquiries')} className={tabStyle('inquiries')}>Inquiries</button>
        </div>

        {/* Tables */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          {tab === 'tutors' && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Contact</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Subject</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Experience</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Class</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tutors.map(t => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{t.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{t.contactNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{t.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{t.subject}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{t.experienceYears} yrs</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{t.classToTeach}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{new Date(t.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete('tutors', t.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
                {tutors.length === 0 && <tr><td colSpan={8} className="px-4 py-8 text-center text-gray-400">No tutor registrations yet</td></tr>}
              </tbody>
            </table>
          )}

          {tab === 'students' && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Contact</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Class</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Subject</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{s.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.contactNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.className}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{s.subject}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{new Date(s.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete('students', s.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No student registrations yet</td></tr>}
              </tbody>
            </table>
          )}

          {tab === 'inquiries' && (
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Name</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Phone</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Message</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500">Date</th>
                  <th className="px-4 py-3 text-sm font-medium text-gray-500"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inquiries.map(i => (
                  <tr key={i.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{i.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{i.email}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{i.phone || '-'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600 max-w-xs truncate">{i.message}</td>
                    <td className="px-4 py-3 text-sm text-gray-400">{new Date(i.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete('inquiries', i.id)} className="text-red-500 hover:text-red-700 text-sm">Delete</button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-400">No inquiries yet</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
