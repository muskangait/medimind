import { FileText } from 'lucide-react'

const ReportsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Reports</h1>
        <p className="text-gray-500 text-sm mt-1">Upload and analyze your medical reports with AI</p>
      </div>
      <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FileText size={28} className="text-red-600" />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">Coming on Saturday</h3>
        <p className="text-gray-500 text-sm">AI report analysis with Groq will be added Saturday.</p>
      </div>
    </div>
  )
}

export default ReportsPage