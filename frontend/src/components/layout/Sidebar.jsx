import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Activity, TrendingUp, Stethoscope,
  Pill, FileText, LogOut, Heart, X
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import toast from 'react-hot-toast'

const navItems = [
  { path: '/dashboard',   icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/symptoms',    icon: Activity,        label: 'Symptom Analyzer' },
  { path: '/predictions', icon: TrendingUp,      label: 'Risk Prediction' },
  { path: '/doctors',     icon: Stethoscope,     label: 'Find Doctors' },
  { path: '/medications', icon: Pill,            label: 'Medications' },
  { path: '/reports',     icon: FileText,        label: 'Medical Reports' },
]

const Sidebar = ({ isOpen, onClose }) => {
  const { signOut, profile } = useAuthStore()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
    navigate('/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100
        z-30 transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:z-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MediMind</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 mx-3 mt-4 bg-blue-50 rounded-xl">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mb-2">
            <span className="text-white font-semibold text-sm">
              {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <p className="text-sm font-semibold text-gray-900 truncate">
            {profile?.full_name || 'User'}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {profile?.email || ''}
          </p>
        </div>

        {/* Navigation */}
        <nav className="p-3 mt-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl mb-1
                text-sm font-medium transition-all duration-200
                ${isActive
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sign out */}
        <div className="p-3 border-t border-gray-100">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full
                       text-sm font-medium text-red-500 hover:bg-red-50
                       transition-all duration-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar