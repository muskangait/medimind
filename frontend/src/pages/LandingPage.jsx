import { useNavigate } from 'react-router-dom'
import { Heart, Activity, Shield, Clock, Star, ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  {
    icon: Activity,
    title: 'AI Symptom Analyzer',
    description: 'Describe your symptoms and get AI-powered insights about possible conditions and precautions.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Shield,
    title: 'Disease Risk Prediction',
    description: 'ML models predict your risk for diabetes, heart disease and hypertension with accuracy.',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Heart,
    title: 'Doctor Booking',
    description: 'Find and book appointments with top specialists near you in just a few clicks.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Clock,
    title: 'Medication Reminders',
    description: 'Never miss a dose with smart medication tracking and timely reminders.',
    color: 'bg-purple-50 text-purple-600',
  },
]

const stats = [
  { value: '50K+', label: 'Patients Served' },
  { value: '500+', label: 'Doctors Available' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '24/7', label: 'AI Support' },
]

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Heart size={16} className="text-white" />
          </div>
          <span className="text-xl font-bold text-gray-900">MediMind</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Star size={14} />
          AI-Powered Health Intelligence Platform
        </div>
        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Your Health,{' '}
          <span className="text-blue-600">Smarter</span>
          <br />
          Than Ever Before
        </h1>
        <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          MediMind combines AI and machine learning to analyze symptoms, predict disease risks,
          connect you with doctors, and track your medications — all in one place.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => navigate('/register')}
            className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Start For Free
            <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-all"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-blue-200 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            A complete health management platform built for the modern patient.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-blue-100 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                <feature.icon size={22} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-gray-500 mb-8">
            Join thousands of patients already using MediMind to make smarter health decisions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            {['No credit card required', 'Free forever plan', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-gray-600">
                <CheckCircle size={16} className="text-green-500" />
                {item}
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate('/register')}
            className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
              <Heart size={12} className="text-white" />
            </div>
            <span className="font-semibold text-gray-900">MediMind</span>
          </div>
          <p className="text-sm text-gray-400">© 2026 MediMind. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage