import { useState } from 'react'
import { TrendingUp, Activity, Heart, Droplets, Loader, AlertCircle, CheckCircle } from 'lucide-react'
import { predictionAPI } from '../services/api'
import toast from 'react-hot-toast'

const diseases = [
  {
    id: 'diabetes',
    label: 'Diabetes',
    icon: Droplets,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    description: 'Predict your risk of developing Type 2 Diabetes'
  },
  {
    id: 'heart',
    label: 'Heart Disease',
    icon: Heart,
    color: 'text-red-600',
    bg: 'bg-red-50',
    description: 'Assess your cardiovascular disease risk'
  },
  {
    id: 'hypertension',
    label: 'Hypertension',
    icon: Activity,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    description: 'Check your risk for high blood pressure'
  },
]

const riskConfig = {
  low:      { color: 'text-green-600',  bg: 'bg-green-50',  border: 'border-green-200',  label: 'Low Risk',       percent: 25 },
  moderate: { color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', label: 'Moderate Risk',  percent: 50 },
  high:     { color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', label: 'High Risk',      percent: 75 },
  very_high:{ color: 'text-red-600',    bg: 'bg-red-50',    border: 'border-red-200',    label: 'Very High Risk', percent: 90 },
}

const PredictionsPage = () => {
  const [selectedDisease, setSelectedDisease] = useState('diabetes')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const [diabetesForm, setDiabetesForm] = useState({
    pregnancies: '', glucose: '', blood_pressure: '',
    skin_thickness: '', insulin: '', bmi: '',
    diabetes_pedigree: '', age: ''
  })

  const [heartForm, setHeartForm] = useState({
    age: '', gender: '1', chest_pain: '0', resting_bp: '',
    cholesterol: '', fasting_bs: '0', resting_ecg: '0',
    max_hr: '', exercise_angina: '0', oldpeak: '', st_slope: '1'
  })

  const [hypertensionForm, setHypertensionForm] = useState({
    age: '', bmi: '', gender: '1', smoking: '0', alcohol: '0',
    physical_activity: '2', salt_intake: '1', stress_level: '',
    family_history: '0', diabetes: '0', cholesterol: ''
  })

  const handlePredict = async () => {
    setLoading(true)
    setResult(null)
    try {
      let response
      if (selectedDisease === 'diabetes') {
        response = await predictionAPI.diabetes(diabetesForm)
      } else if (selectedDisease === 'heart') {
        response = await predictionAPI.heart(heartForm)
      } else {
        response = await predictionAPI.hypertension(hypertensionForm)
      }
      setResult(response.data)
      toast.success('Prediction complete!')
    } catch (error) {
      toast.error('Prediction failed. Make sure ML service is running.')
    } finally {
      setLoading(false)
    }
  }

  const risk = result ? riskConfig[result.risk_level] : null

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Disease Risk Prediction</h1>
       
      </div>

      {/* Disease Selector */}
      <div className="grid grid-cols-3 gap-4">
        {diseases.map((d) => (
          <button
            key={d.id}
            onClick={() => { setSelectedDisease(d.id); setResult(null) }}
            className={`p-4 rounded-2xl border-2 text-left transition-all ${
              selectedDisease === d.id
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-100 bg-white hover:border-blue-200'
            }`}
          >
            <div className={`w-10 h-10 ${d.bg} rounded-xl flex items-center justify-center mb-3`}>
              <d.icon size={20} className={d.color} />
            </div>
            <p className="font-semibold text-gray-900 text-sm">{d.label}</p>
            <p className="text-xs text-gray-500 mt-1">{d.description}</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Form */}
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-900 mb-4">Enter Your Health Data</h3>

          {/* Diabetes Form */}
          {selectedDisease === 'diabetes' && (
            <div className="space-y-3">
              {[
                { key: 'age', label: 'Age', placeholder: '35' },
                { key: 'glucose', label: 'Glucose Level (mg/dL)', placeholder: '120' },
                { key: 'bmi', label: 'BMI', placeholder: '25.5' },
                { key: 'blood_pressure', label: 'Blood Pressure (mmHg)', placeholder: '80' },
                { key: 'insulin', label: 'Insulin (µU/mL)', placeholder: '85' },
                { key: 'skin_thickness', label: 'Skin Thickness (mm)', placeholder: '20' },
                { key: 'pregnancies', label: 'Pregnancies (0 if male)', placeholder: '0' },
                { key: 'diabetes_pedigree', label: 'Diabetes Pedigree Function', placeholder: '0.5' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    value={diabetesForm[field.key]}
                    onChange={(e) => setDiabetesForm({...diabetesForm, [field.key]: e.target.value})}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Heart Disease Form */}
          {selectedDisease === 'heart' && (
            <div className="space-y-3">
              {[
                { key: 'age', label: 'Age', placeholder: '50' },
                { key: 'resting_bp', label: 'Resting Blood Pressure', placeholder: '120' },
                { key: 'cholesterol', label: 'Cholesterol (mg/dL)', placeholder: '200' },
                { key: 'max_hr', label: 'Max Heart Rate', placeholder: '150' },
                { key: 'oldpeak', label: 'ST Depression (Oldpeak)', placeholder: '1.5' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    value={heartForm[field.key]}
                    onChange={(e) => setHeartForm({...heartForm, [field.key]: e.target.value})}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Gender</label>
                <select value={heartForm.gender} onChange={(e) => setHeartForm({...heartForm, gender: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  <option value="1">Male</option>
                  <option value="0">Female</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Exercise Angina</label>
                <select value={heartForm.exercise_angina} onChange={(e) => setHeartForm({...heartForm, exercise_angina: e.target.value})}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </select>
              </div>
            </div>
          )}

          {/* Hypertension Form */}
          {selectedDisease === 'hypertension' && (
            <div className="space-y-3">
              {[
                { key: 'age', label: 'Age', placeholder: '45' },
                { key: 'bmi', label: 'BMI', placeholder: '27' },
                { key: 'stress_level', label: 'Stress Level (1-10)', placeholder: '5' },
                { key: 'cholesterol', label: 'Cholesterol (mg/dL)', placeholder: '200' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                  <input
                    type="number"
                    value={hypertensionForm[field.key]}
                    onChange={(e) => setHypertensionForm({...hypertensionForm, [field.key]: e.target.value})}
                    placeholder={field.placeholder}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              {[
                { key: 'smoking', label: 'Smoking' },
                { key: 'alcohol', label: 'Alcohol' },
                { key: 'family_history', label: 'Family History of Hypertension' },
                { key: 'diabetes', label: 'Has Diabetes' },
              ].map(field => (
                <div key={field.key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                  <select value={hypertensionForm[field.key]}
                    onChange={(e) => setHypertensionForm({...hypertensionForm, [field.key]: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                  </select>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="w-full mt-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <><Loader size={18} className="animate-spin" /> Predicting...</> : <><TrendingUp size={18} /> Predict Risk</>}
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {!result && !loading && (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ready to Predict</h3>
              <p className="text-gray-500 text-sm">Fill in your health data and click Predict Risk.</p>
            </div>
          )}

          {result && risk && (
            <div className="space-y-4">

              {/* Risk Score */}
              <div className={`rounded-2xl p-6 border ${risk.bg} ${risk.border} text-center`}>
                <p className={`text-5xl font-bold ${risk.color} mb-2`}>{result.risk_percentage}%</p>
                <p className={`font-semibold ${risk.color} text-lg`}>{risk.label}</p>
                <p className="text-gray-600 text-sm mt-1">Consult a {result.specialist_type}</p>

                {/* Progress bar */}
                <div className="w-full bg-white rounded-full h-3 mt-4">
                  <div
                    className={`h-3 rounded-full transition-all duration-1000 ${
                      result.risk_level === 'low' ? 'bg-green-500' :
                      result.risk_level === 'moderate' ? 'bg-yellow-500' :
                      result.risk_level === 'high' ? 'bg-orange-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.risk_percentage}%` }}
                  />
                </div>
              </div>

              {/* Model Breakdown */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Model Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Logistic Regression', value: result.lr_probability },
                    { label: 'Random Forest', value: result.rf_probability },
                    { label: 'Ensemble (Final)', value: result.ensemble_probability },
                  ].map((model) => (
                    <div key={model.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{model.label}</span>
                        <span className="font-medium text-gray-900">{(model.value * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${model.value * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                <div className="space-y-2">
                  {result.recommendations?.map((rec, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PredictionsPage