'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function MetricGoalPage() {
  const router = useRouter()
  const [value, setValue] = useState(36)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleContinue = async () => {
    setIsSubmitting(true)

    try {
      const { data: submissions, error: fetchError } = await supabase
        .from('new_submissions')
        .select('id')
        .eq('completed', false)
        .order('created_at', { ascending: false })
        .limit(1)

      if (fetchError) {
        console.error('Error fetching submission:', fetchError)
        toast.error('Something went wrong. Please try again.')
        return
      }

      if (!submissions || submissions.length === 0) {
        console.error('No incomplete submission found')
        toast.error('Please enter your email first.')
        router.push('/funnel-1')
        return
      }

      const { error: updateError } = await supabase
        .from('new_submissions')
        .update({ metric_goal: `${value}%` })
        .eq('id', submissions[0].id)

      if (updateError) {
        console.error('Error updating submission:', updateError)
        toast.error('Something went wrong. Please try again.')
        return
      }

      router.push('/funnel-1/onboarding/company-url')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6]">
      <div className="container mx-auto px-4 pt-4">
        {/* Header with Logo and Progress Bar */}
        <div className="flex items-center mb-10">
          <div className="w-32">
            <Image
              src="/images/pricepoint-logo.png"
              alt="Pricepoint"
              width={128}
              height={34}
              priority
            />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="flex gap-2 w-96">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full flex-1 ${i <= 1 ? 'bg-[#EA592D]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="max-w-3xl mx-auto text-center mt-20">
          <h1 className="text-4xl font-playfair mb-2">
            How much are you <span className="text-[#EA592D]">looking to improve</span>
          </h1>
          <h1 className="text-4xl font-playfair mb-4">
            this metric <span className="text-[#EA592D]">in the next 90 days?</span>
          </h1>

          <div className="mt-32 mb-32 relative">
            {/* Percentage Display */}
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-24 border-2 border-[#EA592D] rounded-lg px-8 py-2 bg-white">
              <div className="text-4xl font-bold">{value}.0</div>
              <div className="text-sm text-gray-600">Percent</div>
            </div>

            {/* Gradient Slider */}
            <div className="relative">
              <input
                type="range"
                min="5"
                max="80"
                value={value}
                onChange={(e) => setValue(parseInt(e.target.value))}
                className="w-full h-2 appearance-none bg-gradient-to-r from-[#EA592D] via-yellow-400 to-green-400 rounded-lg cursor-pointer"
                style={{
                  WebkitAppearance: 'none',
                }}
              />
              <style jsx>{`
                input[type='range']::-webkit-slider-thumb {
                  -webkit-appearance: none;
                  appearance: none;
                  width: 24px;
                  height: 24px;
                  border-radius: 50%;
                  background: white;
                  border: 2px solid #EA592D;
                  cursor: pointer;
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }
              `}</style>
            </div>
          </div>

          <button
            onClick={handleContinue}
            disabled={isSubmitting}
            className="fixed bottom-8 right-8 bg-[#EA592D] text-white px-8 py-3 rounded-lg hover:bg-[#d54d24] transition-colors disabled:opacity-50 inline-flex items-center"
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  )
}
