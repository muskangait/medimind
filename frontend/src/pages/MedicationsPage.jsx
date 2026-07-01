import { Pill } from 'lucide-react'

const MedicationsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
        <p className="text-gray-500 text-sm mt-1">Track your medications and set reminders</p>
      </div>
      <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Pill size={28} className="text-orange-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Coming on Saturday</h3>
        <p className="text-gray-500 text-sm">Medication tracking and reminders will be added Saturday.</p>
      </div>
    </div>
  )
}

export default MedicationsPage