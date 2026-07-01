import { Menu, Bell, Search } from 'lucide-react'
import { useState } from 'react'
import useAuthStore from '../../store/authStore'

const Navbar = ({ onMenuClick }) => {
  const { profile } = useAuthStore()
  const [showNotifications, setShowNotifications] = useState(false)

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6">
      
      {/* Left side */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 w-64">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-gray-600 outline-none w-full placeholder-gray-400"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 z-50">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="p-4">
                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl mb-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Medication Reminder</p>
                    <p className="text-xs text-gray-500">Time to take your evening dose</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 bg-gray-300 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Appointment Tomorrow</p>
                    <p className="text-xs text-gray-500">Dr. Rajesh Sharma at 10:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer">
          <span className="text-white font-semibold text-sm">
            {profile?.full_name?.charAt(0)?.toUpperCase() || 'U'}
          </span>
        </div>
      </div>
    </header>
  )
}

export default Navbar