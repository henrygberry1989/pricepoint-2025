'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { StickyFooter } from '@/components/sticky-footer'

export default function RecommendationsPage() {
  const router = useRouter()

  const handleContinue = () => {
    router.push('/funnel-1/onboarding/score')
  }

  const ContinueButton = () => (
    <button
      onClick={handleContinue}
      className="w-full inline-flex items-center justify-center px-8 py-3 rounded-lg bg-[#EA592D] text-white hover:bg-[#d54d24] transition-colors"
    >
      Continue
      <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </button>
  )

  return (
    <main className="min-h-screen bg-[#F9F8F6] pb-24 md:pb-12">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-playfair text-gray-900 mb-8 md:mb-12 px-4">
            Instead, getting better at monetisation effectively{' '}
            <span className="text-[#EA592D]">fixes all your growth problems</span>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-8 md:mb-16">
            {/* Step 1 */}
            <div className="text-center space-y-4 bg-white p-6 rounded-lg md:bg-transparent md:p-0">
              <div className="w-16 h-16 rounded-full bg-[#EA592D]/10 flex items-center justify-center mx-auto">
                <span className="text-[#EA592D] text-xl font-medium">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-playfair text-gray-900">
                Improve Monetisation
              </h3>
              <p className="text-gray-600">
                Optimize your pricing and packaging
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-4 bg-white p-6 rounded-lg md:bg-transparent md:p-0">
              <div className="w-16 h-16 rounded-full bg-[#EA592D]/10 flex items-center justify-center mx-auto">
                <span className="text-[#EA592D] text-xl font-medium">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-playfair text-gray-900">
                Generate More
              </h3>
              <p className="text-gray-600">
                Increase revenue per customer
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-4 bg-white p-6 rounded-lg md:bg-transparent md:p-0">
              <div className="w-16 h-16 rounded-full bg-[#EA592D]/10 flex items-center justify-center mx-auto">
                <span className="text-[#EA592D] text-xl font-medium">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-playfair text-gray-900">
                Outspend Competition
              </h3>
              <p className="text-gray-600">
                Invest more in sustainable growth
              </p>
            </div>
          </div>

          {/* Desktop Continue Button */}
          <div className="hidden md:block">
            <ContinueButton />
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <StickyFooter>
        <ContinueButton />
      </StickyFooter>
    </main>
  )
}
