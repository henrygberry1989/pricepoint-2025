'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ProgressBar } from '@/components/progress-bar'

export default function OnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    company_url: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const { error } = await supabase.from('new_submissions').insert([
        {
          email: formData.email,
          company_url: formData.company_url,
          flow_source: 'bonus'
        }
      ])

      if (error) throw error

      router.push('/bonus/onboarding/bottleneck')
    } catch (err) {
      console.error('Error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F9F9] p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <ProgressBar currentStep={1} totalSteps={3} />
        
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl mb-8">Let's get started with your redesign</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Company URL</label>
              <input
                type="url"
                required
                value={formData.company_url}
                onChange={(e) => setFormData(prev => ({ ...prev, company_url: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
              />
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#EA592D] text-white py-4 px-8 rounded-lg hover:bg-[#d54d26] transition-colors fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto"
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
