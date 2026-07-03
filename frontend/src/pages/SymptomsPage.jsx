import { useState } from 'react'
import { Activity, Plus, X, Loader, AlertCircle, CheckCircle, User, Heart } from 'lucide-react'
import { analyzeSymptoms } from '../services/groqService'
import toast from 'react-hot-toast'

const commonSymptoms = [
  'Headache', 'Fever', 'Cough', 'Fatigue', 'Nausea',
  'Chest Pain', 'Shortness of Breath', 'Dizziness', 'Back Pain',
  'Joint Pain', 'Sore Throat', 'Vomiting', 'Diarrhea', 'Abdominal Pain',
  'Loss of Appetite', 'Weight Loss', 'Night Sweats', 'Swelling'
]

const severityConfig = {
  low:      { color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200',  label: 'Low Severity' },
  moderate: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Moderate Severity' },
  high:     { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'High Severity' },
  critical: { color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    label: 'Critical - Seek Help Now' },
}

const SymptomsPage = () => {
  const [symptoms, setSymptoms] = useState([])
  const [customSymptom, setCustomSymptom] = useState('')
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [lifestyle, setLifestyle] = useState({
    smoking: false,
    alcohol: false,
    exercise: 'moderate',
    diet: 'balanced',
    sleep_hours: 7,
    stress_level: 'moderate'
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const addSymptom = (symptom) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms([...symptoms, symptom])
    }
  }

  const removeSymptom = (symptom) => {
    setSymptoms(symptoms.filter(s => s !== symptom))
  }

  const addCustomSymptom = () => {
    if (customSymptom.trim() && !symptoms.includes(customSymptom.trim())) {
      setSymptoms([...symptoms, customSymptom.trim()])
      setCustomSymptom('')
    }
  }

  const handleAnalyze = async () => {
    if (symptoms.length === 0) {
      toast.error('Please add at least one symptom')
      return
    }
    if (!age || !gender) {
      toast.error('Please fill in age and gender')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const analysis = await analyzeSymptoms({ symptoms, age, gender, lifestyle })
      setResult(analysis)
      toast.success('Analysis complete!')
    } catch (error) {
      toast.error('Analysis failed. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const severity = result ? severityConfig[result.severity] : null

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Symptom Analyzer</h1>
        <p className="text-gray-500 text-sm mt-1">
          Describe your symptoms and get AI-powered insights
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT — Input */}
        <div className="space-y-5">

          {/* Patient Info */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-600" />
              Patient Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  min="1" max="120"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={18} className="text-blue-600" />
              Symptoms
            </h3>

            {/* Selected symptoms */}
            {symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {symptoms.map(s => (
                  <span key={s} className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium">
                    {s}
                    <button onClick={() => removeSymptom(s)}>
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Custom symptom input */}
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={customSymptom}
                onChange={(e) => setCustomSymptom(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomSymptom()}
                placeholder="Type a symptom..."
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addCustomSymptom}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm hover:bg-blue-700"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Common symptoms */}
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map(s => (
                <button
                  key={s}
                  onClick={() => addSymptom(s)}
                  disabled={symptoms.includes(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all
                    ${symptoms.includes(s)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Lifestyle */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Heart size={18} className="text-blue-600" />
              Lifestyle Factors
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Smoking</span>
                <button
                  onClick={() => setLifestyle({...lifestyle, smoking: !lifestyle.smoking})}
                  className={`w-12 h-6 rounded-full transition-colors ${lifestyle.smoking ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${lifestyle.smoking ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Alcohol</span>
                <button
                  onClick={() => setLifestyle({...lifestyle, alcohol: !lifestyle.alcohol})}
                  className={`w-12 h-6 rounded-full transition-colors ${lifestyle.alcohol ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${lifestyle.alcohol ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>
              <div>
                <label className="text-sm text-gray-700">Exercise Level</label>
                <select
                  value={lifestyle.exercise}
                  onChange={(e) => setLifestyle({...lifestyle, exercise: e.target.value})}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="none">None</option>
                  <option value="light">Light</option>
                  <option value="moderate">Moderate</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">Stress Level</label>
                <select
                  value={lifestyle.stress_level}
                  onChange={(e) => setLifestyle({...lifestyle, stress_level: e.target.value})}
                  className="w-full mt-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                >
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 disabled:opacity-50 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader size={20} className="animate-spin" />
                Analyzing with AI...
              </>
            ) : (
              <>
                <Activity size={20} />
                Analyze Symptoms
              </>
            )}
          </button>
        </div>

        {/* RIGHT — Results */}
        <div className="space-y-4">
          {!result && !loading && (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity size={28} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Analysis Ready</h3>
              <p className="text-gray-500 text-sm">Fill in your symptoms and click Analyze to get AI-powered insights.</p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Activity size={28} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analyzing...</h3>
              <p className="text-gray-500 text-sm">AI is analyzing your symptoms. Please wait.</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">

              {/* Severity Badge */}
              <div className={`rounded-2xl p-4 border ${severity.bg} ${severity.border}`}>
                <div className="flex items-center gap-3">
                  <AlertCircle size={24} className={severity.color} />
                  <div>
                    <p className={`font-semibold ${severity.color}`}>{severity.label}</p>
                    <p className="text-sm text-gray-600">Specialist: {result.specialist_referral}</p>
                  </div>
                </div>
                {result.emergency_warning && (
                  <p className="mt-2 text-sm text-red-600 font-medium">⚠️ {result.emergency_warning}</p>
                )}
              </div>

              {/* Probable Conditions */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Probable Conditions</h3>
                <div className="space-y-4">
                  {result.probable_conditions?.map((condition, i) => (
                    <div key={i} className="border border-gray-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{condition.name}</h4>
                        <span className="text-sm font-semibold text-blue-600">{condition.confidence}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
                        <div
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${condition.confidence}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{condition.description}</p>
                      <div className="space-y-1">
                        {condition.precautions?.map((p, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle size={12} className="text-green-500 mt-0.5 flex-shrink-0" />
                            {p}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {result.immediate_recommendations?.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>

              {/* General Advice */}
              <div className="bg-blue-50 rounded-2xl p-5 border border-blue-100">
                <h3 className="font-semibold text-blue-900 mb-2">General Advice</h3>
                <p className="text-sm text-blue-800">{result.general_advice}</p>
                <p className="text-xs text-blue-600 mt-3 font-medium">
                  ⚕️ This is AI-generated information. Always consult a qualified doctor for medical advice.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SymptomsPage