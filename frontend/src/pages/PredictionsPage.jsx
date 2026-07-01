import { TrendingUp } from 'lucide-react'

const PredictionsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Disease Risk Prediction</h1>
        <p className="text-gray-500 text-sm mt-1">ML-powered risk analysis for diabetes, heart disease and hypertension</p>
      </div>
      <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <TrendingUp size={28} className="text-green-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Coming on Friday</h3>
        <p className="text-gray-500 text-sm">ML models for risk prediction will be added Friday.</p>
      </div>
    </div>
  )
}

export default PredictionsPage