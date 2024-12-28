'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Instrument_Serif } from 'next/font/google'
import { supabase } from '@/lib/supabase'
import { ProgressBar } from '@/components/progress-bar'

const instrumentSerif = Instrument_Serif({ 
  weight: '400',
  subsets: ['latin'],
})

function formatUrl(url: string): string {
  // Remove any whitespace
  url = url.trim()
  
  // If no protocol specified, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url
  }
  
  // Remove trailing slashes
  url = url.replace(/\/+$/, '')
  
  return url
}

function isValidUrl(url: string): boolean {
  try {
    // Remove any whitespace
    url = url.trim()
    
    // Add https:// if no protocol specified
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    
    // Try to create a URL object - this validates the URL format
    new URL(url)
    return true
  } catch {
    return false
  }
}

export default function OnboardingPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    company_url: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [urlError, setUrlError] = useState('')

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setFormData(prev => ({ ...prev, company_url: url }))
    
    if (url && !isValidUrl(url)) {
      setUrlError('Please enter a valid URL (e.g., example.com)')
    } else {
      setUrlError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Validate URL
      if (!isValidUrl(formData.company_url)) {
        setError('Please enter a valid company URL')
        setIsLoading(false)
        return
      }

      const formattedUrl = formatUrl(formData.company_url)

      const { error: supabaseError } = await supabase.from('new_submissions').insert([
        {
          email: formData.email,
          company_url: formattedUrl,
          flow_source: 'bonus'
        }
      ])

      if (supabaseError) throw supabaseError

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
          <h1 className={`text-3xl mb-8 ${instrumentSerif.className}`}>Let's get started with your redesign</h1>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Work Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
                placeholder="you@company.com"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Company URL</label>
              <input
                type="text"
                required
                value={formData.company_url}
                onChange={handleUrlChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
                placeholder="example.com"
              />
              {urlError && <p className="text-red-500 mt-1 text-sm">{urlError}</p>}
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <button
              type="submit"
              disabled={isLoading || !!urlError}
              className={`w-full bg-[#EA592D] text-white py-4 px-8 rounded-lg hover:bg-[#d54d26] transition-colors fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto disabled:opacity-50 disabled:cursor-not-allowed ${instrumentSerif.className}`}
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
