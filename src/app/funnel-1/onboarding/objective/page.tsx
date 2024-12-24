'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function ObjectivePage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const options = [
    'Improving Pricing & Customer LTV',
    'Improve Onboarding / Aha! Moments',
    'Paid Growth Channels aren\'t Profitable',
    'Decrease Churn',
    'Looking for New Growth Channels'
  ]

  const handleContinue = async () => {
    if (!selectedOption) {
      alert('Please select an objective')
      return
    }

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
        .update({ objective: selectedOption })
        .eq('id', submissions[0].id)

      if (updateError) {
        console.error('Error updating submission:', updateError)
        toast.error('Something went wrong. Please try again.')
        return
      }

      router.push('/funnel-1/onboarding/metric-goal')
    } catch (error) {
      console.error('Error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F9F8F6] relative pb-24">
      <div className="container mx-auto px-4 pt-4">
        {/* Header with Logo and Progress Bar */}
        <div className="flex items-center mb-10">
          <div className="w-32 -ml-4">
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
                  className={`h-1 rounded-full flex-1 ${i === 0 ? 'bg-[#EA592D]' : 'bg-gray-200'}`}
                />
              ))}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-playfair text-center mb-4">
            What is your key objective?
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Select your primary goal and we'll tailor our recommendations accordingly.
          </p>

          <div className="space-y-4">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setSelectedOption(option)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all bg-white ${
                  selectedOption === option
                    ? 'border-[#EA592D] bg-[#EA592D]/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={isSubmitting}
            className="w-full mt-8 px-6 py-3 bg-[#EA592D] text-white font-semibold rounded-lg hover:bg-[#d54d24] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </div>
    </main>
  )
}
