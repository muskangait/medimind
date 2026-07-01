import { Activity } from 'lucide-react'

const SymptomsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">AI Symptom Analyzer</h1>
        <p className="text-gray-500 text-sm mt-1">Describe your symptoms and get AI-powered insights</p>
      </div>
      <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Activity size={28} className="text-blue-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Coming on Friday</h3>
        <p className="text-gray-500 text-sm">Full AI symptom analysis with Groq will be added Friday.</p>
      </div>
    </div>
  )
}

export default SymptomsPage