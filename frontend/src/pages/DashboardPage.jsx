import { Activity, TrendingUp, Stethoscope, Pill, FileText, Heart, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts'

const healthData = [
  { day: 'Mon', heartRate: 72, bp: 120 },
  { day: 'Tue', heartRate: 75, bp: 118 },
  { day: 'Wed', heartRate: 70, bp: 122 },
  { day: 'Thu', heartRate: 68, bp: 119 },
  { day: 'Fri', heartRate: 74, bp: 121 },
  { day: 'Sat', heartRate: 71, bp: 117 },
  { day: 'Sun', heartRate: 73, bp: 120 },
]

const quickActions = [
  { label: 'Analyze Symptoms',  icon: Activity,    path: '/symptoms',    color: 'bg-blue-50 text-blue-600 hover:bg-blue-100' },
  { label: 'Risk Prediction',   icon: TrendingUp,  path: '/predictions', color: 'bg-green-50 text-green-600 hover:bg-green-100' },
  { label: 'Find Doctors',      icon: Stethoscope, path: '/doctors',     color: 'bg-purple-50 text-purple-600 hover:bg-purple-100' },
  { label: 'My Medications',    icon: Pill,        path: '/medications', color: 'bg-orange-50 text-orange-600 hover:bg-orange-100' },
  { label: 'Medical Reports',   icon: FileText,    path: '/reports',     color: 'bg-red-50 text-red-600 hover:bg-red-100' },
]

const stats = [
  { label: 'Heart Rate',    value: '72 bpm',  icon: Heart,        color: 'text-red-500',    bg: 'bg-red-50' },
  { label: 'Blood Pressure',value: '120/80',  icon: Activity,     color: 'text-blue-500',   bg: 'bg-blue-50' },
  { label: 'Risk Level',    value: 'Low',     icon: AlertCircle,  color: 'text-green-500',  bg: 'bg-green-50' },
  { label: 'Medications',   value: '2 Active',icon: Pill,         color: 'text-purple-500', bg: 'bg-purple-50' },
]

const DashboardPage = () => {
  const navigate = useNavigate()
  const { profile } = useAuthStore()

  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {greeting}, {profile?.full_name?.split(' ')[0] || 'there'} 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here's your health overview for today
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-IN', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Heart Rate Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Heart Rate — This Week</h3>
          <p className="text-sm text-gray-500 mb-4">Average: 71.9 bpm</p>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={healthData}>
              <defs>
                <linearGradient id="heartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[60, 85]} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '13px' }}
              />
              <Area type="monotone" dataKey="heartRate" stroke="#3b82f6" strokeWidth={2} fill="url(#heartGradient)" dot={{ fill: '#3b82f6', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Blood Pressure Chart */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-1">Blood Pressure — This Week</h3>
          <p className="text-sm text-gray-500 mb-4">Systolic average: 119.6 mmHg</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[110, 130]} />
              <Tooltip
                contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '13px' }}
              />
              <Line type="monotone" dataKey="bp" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.path)}
              className={`flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 ${action.color}`}
            >
              <action.icon size={24} />
              <span className="text-xs font-medium text-center leading-tight">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { title: 'Symptom Analysis', desc: 'Headache, fatigue — Low severity', time: '2 hours ago', color: 'bg-blue-500' },
            { title: 'Medication Taken', desc: 'Metformin 500mg — Morning dose', time: 'Today 8:00 AM', color: 'bg-green-500' },
            { title: 'Appointment Booked', desc: 'Dr. Rajesh Sharma — Tomorrow 10 AM', time: 'Yesterday', color: 'bg-purple-500' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className={`w-2 h-2 ${item.color} rounded-full mt-2 flex-shrink-0`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 truncate">{item.desc}</p>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DashboardPage