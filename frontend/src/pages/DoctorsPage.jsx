import { useState, useEffect } from 'react'
import { Stethoscope, Star, MapPin, Clock, Phone, Calendar, Search, Filter } from 'lucide-react'
import { doctorAPI, appointmentAPI } from '../services/api'
import toast from 'react-hot-toast'

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [booking, setBooking] = useState(false)
  const [appointmentData, setAppointmentData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'in_person',
    reason: ''
  })

  useEffect(() => {
    fetchDoctors()
  }, [])

  useEffect(() => {
    let result = doctors
    if (search) {
      result = result.filter(d =>
        d.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        d.specialization?.toLowerCase().includes(search.toLowerCase()) ||
        d.city?.toLowerCase().includes(search.toLowerCase())
      )
    }
    if (specialization) {
      result = result.filter(d => d.specialization === specialization)
    }
    setFiltered(result)
  }, [search, specialization, doctors])

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAll()
      setDoctors(response.data.data || [])
      setFiltered(response.data.data || [])
    } catch (error) {
      toast.error('Failed to load doctors')
    } finally {
      setLoading(false)
    }
  }

  const handleBookAppointment = async () => {
    if (!appointmentData.appointmentDate || !appointmentData.appointmentTime) {
      toast.error('Please select date and time')
      return
    }
    setBooking(true)
    try {
      await appointmentAPI.book({
        doctorId: selectedDoctor.id,
        ...appointmentData
      })
      toast.success('Appointment booked successfully!')
      setSelectedDoctor(null)
      setAppointmentData({
        appointmentDate: '',
        appointmentTime: '',
        appointmentType: 'in_person',
        reason: ''
      })
    } catch (error) {
      toast.error('Booking failed. Please try again.')
    } finally {
      setBooking(false)
    }
  }

  const specializations = [...new Set(doctors.map(d => d.specialization).filter(Boolean))]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Find Doctors</h1>
        <p className="text-gray-500 text-sm mt-1">Book appointments with top specialists</p>
      </div>

      {/* Search + Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors, specialization, city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <select
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
        >
          <option value="">All Specializations</option>
          {specializations.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Doctors Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
              <div className="h-3 bg-gray-100 rounded mb-2" />
              <div className="h-3 bg-gray-100 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
          <Stethoscope size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No doctors found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all">

              {/* Doctor Info */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-lg">
                    {doctor.fullName?.charAt(0) || 'D'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">{doctor.fullName}</h3>
                  <p className="text-blue-600 text-sm">{doctor.specialization}</p>
                  <p className="text-gray-500 text-xs">{doctor.qualification}</p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin size={14} className="text-gray-400" />
                  {doctor.hospitalName} — {doctor.city}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} className="text-gray-400" />
                  {doctor.experienceYears} years experience
                </div>
                <div className="flex items-center gap-2">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
                  <span className="text-xs text-gray-400">({doctor.totalReviews} reviews)</span>
                </div>
              </div>

              {/* Fee + Book */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500">Consultation Fee</p>
                  <p className="font-semibold text-gray-900">₹{doctor.consultationFee}</p>
                </div>
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-gray-900 text-lg mb-1">Book Appointment</h3>
            <p className="text-blue-600 text-sm mb-5">{selectedDoctor.fullName} — {selectedDoctor.specialization}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={appointmentData.appointmentDate}
                  onChange={(e) => setAppointmentData({...appointmentData, appointmentDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <select
                  value={appointmentData.appointmentTime}
                  onChange={(e) => setAppointmentData({...appointmentData, appointmentTime: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select time</option>
                  {['09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
                    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={appointmentData.appointmentType}
                  onChange={(e) => setAppointmentData({...appointmentData, appointmentType: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="in_person">In Person</option>
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason (optional)</label>
                <textarea
                  value={appointmentData.reason}
                  onChange={(e) => setAppointmentData({...appointmentData, reason: e.target.value})}
                  placeholder="Brief reason for visit..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleBookAppointment}
                disabled={booking}
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                {booking ? 'Booking...' : `Book — ₹${selectedDoctor.consultationFee}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DoctorsPage