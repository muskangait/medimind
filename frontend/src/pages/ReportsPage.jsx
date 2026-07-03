import { useState, useEffect } from 'react'
import { FileText, Upload, Loader, CheckCircle, AlertCircle, X } from 'lucide-react'
import { analyzeReport } from '../services/groqService'
import toast from 'react-hot-toast'

const ReportsPage = () => {
  const [reportText, setReportText] = useState('')
  const [reportName, setReportName] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {
    if (!reportText.trim()) {
      toast.error('Please paste your report content')
      return
    }
    if (!reportName.trim()) {
      toast.error('Please enter report name')
      return
    }
    setLoading(true)
    setResult(null)
    try {
      const analysis = await analyzeReport(reportText)
      setResult(analysis)
      toast.success('Report analyzed successfully!')
    } catch (error) {
      toast.error('Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const urgencyConfig = {
    routine: { color: 'text-green-600', bg: 'bg-green-50', label: 'Routine Follow-up' },
    soon:    { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Follow-up Soon' },
    urgent:  { color: 'text-red-600', bg: 'bg-red-50', label: 'Urgent Attention Required' },
  }

  const statusConfig = {
    normal:     { color: 'text-green-600', bg: 'bg-green-50' },
    abnormal:   { color: 'text-red-600', bg: 'bg-red-50' },
    borderline: { color: 'text-yellow-600', bg: 'bg-yellow-50' },
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Report Analyzer</h1>
        <p className="text-gray-500 text-sm mt-1">
          Paste your medical report and get AI-powered analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Input */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" />
              Report Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="e.g. Blood Test Report - June 2026"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Report Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="Paste your medical report content here...

Example:
Hemoglobin: 11.2 g/dL (Normal: 13.5-17.5)
WBC Count: 9500 /μL (Normal: 4500-11000)
Platelet Count: 180000 /μL (Normal: 150000-400000)
Blood Glucose: 126 mg/dL (Normal: 70-100)
..."
                  rows={12}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <><Loader size={18} className="animate-spin" /> Analyzing with AI...</>
                ) : (
                  <><Upload size={18} /> Analyze Report</>
                )}
              </button>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <h4 className="font-medium text-blue-900 mb-2 text-sm">💡 Tips for best results</h4>
            <ul className="space-y-1 text-xs text-blue-700">
              <li>• Include all parameter values with their normal ranges</li>
              <li>• Include the test date and lab name if available</li>
              <li>• Works with blood tests, urine tests, lipid profiles etc.</li>
              <li>• More detail = better AI analysis</li>
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {!result && !loading && (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Report Analyzer</h3>
              <p className="text-gray-500 text-sm">
                Paste your medical report on the left and click Analyze to get AI insights.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
                <FileText size={28} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Analyzing Report...</h3>
              <p className="text-gray-500 text-sm">AI is reading your report. Please wait.</p>
            </div>
          )}

          {result && (
            <div className="space-y-4">

              {/* Overall Assessment */}
              <div className={`rounded-2xl p-4 border ${
                result.urgency_level ? urgencyConfig[result.urgency_level]?.bg : 'bg-gray-50'
              } border-gray-200`}>
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className={
                    result.urgency_level ? urgencyConfig[result.urgency_level]?.color : 'text-gray-500'
                  } />
                  <div>
                    <p className="font-semibold text-gray-900">{result.overall_assessment}</p>
                    {result.urgency_level && (
                      <span className={`text-xs font-medium ${urgencyConfig[result.urgency_level]?.color}`}>
                        {urgencyConfig[result.urgency_level]?.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Key Findings */}
              {result.key_findings?.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-4">Key Findings</h3>
                  <div className="space-y-3">
                    {result.key_findings.map((finding, i) => (
                      <div key={i} className="flex items-start justify-between p-3 rounded-xl bg-gray-50">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{finding.parameter}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{finding.interpretation}</p>
                        </div>
                        <div className="text-right ml-3">
                          <p className="text-sm font-semibold text-gray-900">{finding.value}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                            statusConfig[finding.status]?.color
                          } ${statusConfig[finding.status]?.bg}`}>
                            {finding.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Abnormal Values */}
              {result.abnormal_values?.length > 0 && (
                <div className="bg-red-50 rounded-2xl p-4 border border-red-100">
                  <h3 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                    <AlertCircle size={16} />
                    Abnormal Values
                  </h3>
                  <div className="space-y-1">
                    {result.abnormal_values.map((val, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-red-700">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        {val}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations?.length > 0 && (
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
                  <div className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        {rec}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-xs text-gray-500 text-center">
                  ⚕️ This AI analysis is for informational purposes only. Always consult a qualified doctor for medical advice.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReportsPage