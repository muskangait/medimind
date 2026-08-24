import { useState, useEffect } from 'react'
import { Pill, Plus, Clock, Calendar, CheckCircle, XCircle, X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import toast from 'react-hot-toast'

const frequencies = [
  'Once daily', 'Twice daily', 'Thrice daily',
  'Every 6 hours', 'Every 8 hours', 'Weekly', 'As needed'
]

const MedicationsPage = () => {
  const [medications, setMedications] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    dosage: '',
    frequency: 'Once daily',
    startDate: '',
    endDate: '',
    instructions: '',
    prescribedBy: ''
  })

  useEffect(() => {
    fetchMedications()
  }, [])

  const fetchMedications = async () => {
  try {
    setLoading(true)

    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      toast.error('Please login first')
      setMedications([])
      return
    }

    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) throw error

    const formattedMedications = (data || []).map(med => ({
      id: med.id,
      name: med.name,
      dosage: med.dosage,
      frequency: med.frequency,
      startDate: med.start_date,
      endDate: med.end_date,
      instructions: med.instructions,
      prescribedBy: med.prescribed_by,
      active: med.is_active
    }))

    setMedications(formattedMedications)

  } catch (error) {
    console.error('FETCH MEDICATIONS ERROR:', error)
    toast.error(error.message || 'Failed to load medications')
  } finally {
    setLoading(false)
  }
}

  const handleAdd = async () => {
  if (!form.name || !form.dosage || !form.startDate) {
    toast.error('Please fill required fields')
    return
  }

  setSubmitting(true)

  try {
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser()

    if (userError) throw userError

    if (!user) {
      toast.error('Please login first')
      return
    }

    const { error } = await supabase
      .from('medications')
      .insert({
        user_id: user.id,
        name: form.name,
        dosage: form.dosage,
        frequency: form.frequency,
        start_date: form.startDate,
        end_date: form.endDate || null,
        instructions: form.instructions || null,
        prescribed_by: form.prescribedBy || null,
        is_active: true
      })

    if (error) throw error

    toast.success('Medication added!')

    setShowForm(false)

    setForm({
      name: '',
      dosage: '',
      frequency: 'Once daily',
      startDate: '',
      endDate: '',
      instructions: '',
      prescribedBy: ''
    })

    await fetchMedications()

  } catch (error) {
    console.error('ADD MEDICATION ERROR:', error)
    toast.error(error.message || 'Failed to add medication')
  } finally {
    setSubmitting(false)
  }
}

  const handleDeactivate = async (id) => {
  try {
    const { error } = await supabase
      .from('medications')
      .update({
        is_active: false
      })
      .eq('id', id)

    if (error) throw error

    toast.success('Medication stopped')

    await fetchMedications()

  } catch (error) {
    console.error('DEACTIVATE MEDICATION ERROR:', error)
    toast.error(error.message || 'Failed to update medication')
  }
}
  const activeMeds = medications.filter(m => m.active)
  const inactiveMeds = medications.filter(m => !m.active)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medications</h1>
          <p className="text-gray-500 text-sm mt-1">Track your medications and reminders</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} />
          Add Medication
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Active', value: activeMeds.length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Completed', value: inactiveMeds.length, color: 'text-gray-600', bg: 'bg-gray-50' },
          { label: 'Total', value: medications.length, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label} Medications</p>
          </div>
        ))}
      </div>

      {/* Active Medications */}
      <div>
        <h2 className="font-semibold text-gray-900 mb-3">Active Medications</h2>
        {loading ? (
          <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 animate-pulse h-20" />
            ))}
          </div>
        ) : activeMeds.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 border border-gray-100 text-center">
            <Pill size={40} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No active medications</p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-3 text-blue-600 text-sm font-medium hover:underline"
            >
              Add your first medication
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {activeMeds.map(med => (
              <div key={med.id} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Pill size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{med.name}</h3>
                      <p className="text-sm text-gray-500">{med.dosage}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock size={12} />
                          {med.frequency}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Calendar size={12} />
                          Started: {med.startDate}
                        </div>
                      </div>
                      {med.instructions && (
                        <p className="text-xs text-gray-400 mt-1">{med.instructions}</p>
                      )}
                      {med.prescribedBy && (
                        <p className="text-xs text-blue-600 mt-1">Prescribed by: {med.prescribedBy}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <CheckCircle size={12} />
                      Active
                    </span>
                    <button
                      onClick={() => handleDeactivate(med.id)}
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <XCircle size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inactive Medications */}
      {inactiveMeds.length > 0 && (
        <div>
          <h2 className="font-semibold text-gray-900 mb-3">Completed Medications</h2>
          <div className="space-y-3">
            {inactiveMeds.map(med => (
              <div key={med.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100 opacity-60">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-xl flex items-center justify-center">
                    <Pill size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-600">{med.name} — {med.dosage}</p>
                    <p className="text-xs text-gray-400">{med.frequency}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400 bg-gray-200 px-2 py-1 rounded-full">
                    Stopped
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Medication Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">Add Medication</h3>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medication Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder="e.g. Metformin"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dosage <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.dosage}
                  onChange={(e) => setForm({...form, dosage: e.target.value})}
                  placeholder="e.g. 500mg"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={form.frequency}
                  onChange={(e) => setForm({...form, frequency: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                >
                  {frequencies.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm({...form, startDate: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm({...form, endDate: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                <input
                  type="text"
                  value={form.instructions}
                  onChange={(e) => setForm({...form, instructions: e.target.value})}
                  placeholder="e.g. Take after meals"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prescribed By</label>
                <input
                  type="text"
                  value={form.prescribedBy}
                  onChange={(e) => setForm({...form, prescribedBy: e.target.value})}
                  placeholder="e.g. Dr. Sharma"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={submitting}
                className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
              >
                {submitting ? 'Adding...' : 'Add Medication'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicationsPage