'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { ProgressBar } from '@/components/progress-bar'

const BOTTLENECKS = [
  'Slow Payback Periods',
  'No Profitable Growth Channels',
  'Low Conversion Rates',
  'Improving Onboarding / Aha! Moments',
  'Decrease Churn'
]

export default function BottleneckPage() {
  const router = useRouter()
  const [selectedBottleneck, setSelectedBottleneck] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    if (!selectedBottleneck) {
      setError('Please select a bottleneck')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error: updateError } = await supabase
        .from('new_submissions')
        .update({ objective: selectedBottleneck })
        .eq('flow_source', 'bonus')
        .is('objective', null)
        .order('created_at', { ascending: false })
        .limit(1)

      if (updateError) throw updateError

      router.push('/bonus/onboarding/calendar')
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
        <ProgressBar currentStep={2} totalSteps={3} />
        
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h1 className="text-3xl mb-8">
            What's the biggest <span className="text-[#EA592D] font-semibold">bottleneck</span> to your company's growth?
          </h1>
          
          <div className="space-y-4 mb-8">
            {BOTTLENECKS.map((bottleneck) => (
              <button
                key={bottleneck}
                onClick={() => setSelectedBottleneck(bottleneck)}
                className={`w-full p-4 rounded-lg border text-left transition-colors ${
                  selectedBottleneck === bottleneck
                    ? 'border-[#EA592D] bg-[#EA592D]/10'
                    : 'border-gray-300 hover:border-[#EA592D]'
                }`}
              >
                {bottleneck}
              </button>
            ))}
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <button
            onClick={handleContinue}
            disabled={isLoading}
            className="w-full bg-[#EA592D] text-white py-4 px-8 rounded-lg hover:bg-[#d54d26] transition-colors fixed bottom-4 left-4 right-4 md:relative md:bottom-auto md:left-auto md:right-auto"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </main>
  )
}
