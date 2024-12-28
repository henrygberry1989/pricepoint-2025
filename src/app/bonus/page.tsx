'use client'

import { useState } from 'react'
import Image from 'next/image'
import { loadStripe } from '@stripe/stripe-js'
import { Instrument_Serif } from 'next/font/google'

const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function BonusPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handlePurchase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          successUrl: `${window.location.origin}/bonus/onboarding`,
          cancelUrl: `${window.location.origin}/bonus`,
        }),
      })

      const { sessionId } = await response.json()
      const stripe = await stripePromise
      await stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-[#EA592D] text-white text-center py-3 z-50">
        <h1 className="text-lg">HOLIDAY SALE - SAVE $841.00</h1>
      </div>

      <main className="min-h-screen md:pl-0 md:pr-8 p-4 max-w-7xl mx-auto mt-16">
        {/* Mobile View */}
        <div className="md:hidden">
          <h2 className={`${instrumentSerif.className} text-4xl text-left font-normal mb-12`}>
            Monetization-Driven UI<br />
            Redesign + 3 FREE Bonus Items
          </h2>

          <div className="relative h-[400px] mb-12">
            <Image 
              src="/images/bonus/hero-image.png"
              alt="Before and After Comparison"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>

          <div className="mb-8">
            <span className="text-gray-500 line-through text-3xl">$965</span>
            <span className="text-[#EA592D] text-5xl ml-4">$124</span>
          </div>

          <div className="flex items-center gap-2 mb-12">
            <div className="flex text-[#EA592D] text-2xl">
              {'★★★★★'}
            </div>
            <span className="text-lg">4.8</span>
            <span className="text-lg">·</span>
            <span className="text-lg">Trusted by 9,700+ companies</span>
          </div>

          <h3 className="text-3xl font-bold mb-8">YOUR FREE GIFTS!</h3>

          <div className="grid grid-cols-1 gap-6 mb-12">
            <div className="bg-[#EA592D]/15 border-2 border-[#EA592D] rounded-lg p-6">
              <Image 
                src="/images/bonus/bonus-page-redesign.png"
                alt="Bonus Page Redesign"
                width={400}
                height={250}
                className="w-full mb-4"
              />
            </div>
            <div className="bg-[#EA592D]/15 border-2 border-[#EA592D] rounded-lg p-6">
              <Image 
                src="/images/bonus/growth-checklists.png"
                alt="Design Checklists"
                width={400}
                height={250}
                className="w-full mb-4"
              />
            </div>
            <div className="bg-[#EA592D]/15 border-2 border-[#EA592D] rounded-lg p-6">
              <Image 
                src="/images/bonus/consultation-call.png"
                alt="Consultation Call"
                width={400}
                height={250}
                className="w-full mb-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-20 text-center">
            <h4 className="text-xl font-bold">+ 1 BONUS PAGE<br />REDESIGN</h4>
            <h4 className="text-xl font-bold">DESIGN + GROWTH<br />CHECKLISTS (x2)</h4>
            <h4 className="text-xl font-bold">30 MIN<br />CONSULTATION CALL</h4>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-12">
          <div className="relative h-[600px] -ml-8">
            <Image 
              src="/images/bonus/hero-image.png"
              alt="Before and After Comparison"
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-r-lg"
            />
          </div>

          <div className="flex flex-col">
            <h2 className={`${instrumentSerif.className} text-5xl text-left font-normal mb-4`}>
              Monetization-Driven UI<br />
              Redesign + 3 FREE Bonus Items
            </h2>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-[#EA592D]">
                {'★★★★★'}
              </div>
              <span className="text-base">4.8</span>
              <span className="text-base">·</span>
              <span className="text-base">Trusted by 9,700+ companies</span>
            </div>

            <div className="mb-8">
              <span className="text-gray-500 line-through text-2xl">$965</span>
              <span className="text-[#EA592D] text-4xl ml-4">$124</span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#EA592D]/15 border-2 border-[#EA592D] rounded-lg p-4">
                <Image 
                  src="/images/bonus/bonus-page-redesign.png"
                  alt="Bonus Page Redesign"
                  width={400}
                  height={250}
                  className="w-full"
                />
              </div>
              <div className="bg-[#EA592D]/15 border-2 border-[#EA592D] rounded-lg p-4">
                <Image 
                  src="/images/bonus/growth-checklists.png"
                  alt="Design Checklists"
                  width={400}
                  height={250}
                  className="w-full"
                />
              </div>
              <div className="bg-[#EA592D]/15 border-2 border-[#EA592D] rounded-lg p-4">
                <Image 
                  src="/images/bonus/consultation-call.png"
                  alt="Consultation Call"
                  width={400}
                  height={250}
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8 text-center">
              <h4 className="text-sm font-semibold">+ 1 BONUS PAGE<br />REDESIGN</h4>
              <h4 className="text-sm font-semibold">DESIGN + GROWTH<br />CHECKLISTS (x2)</h4>
              <h4 className="text-sm font-semibold">30 MIN<br />CONSULTATION CALL</h4>
            </div>

            <div>
              <button
                onClick={handlePurchase}
                disabled={isLoading}
                className={`w-full bg-[#EA592D] text-white text-xl py-4 px-8 rounded-lg hover:bg-[#d54d26] transition-colors mb-2 ${instrumentSerif.className}`}
              >
                {isLoading ? 'Processing...' : 'CLAIM YOUR BONUS BUNDLE (SAVE $841)'}
              </button>

              <div className="flex items-center justify-center gap-2 text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Footer */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <button
            onClick={handlePurchase}
            disabled={isLoading}
            className={`w-full bg-[#EA592D] text-white text-xl py-4 px-8 rounded-lg hover:bg-[#d54d26] transition-colors mb-4 ${instrumentSerif.className}`}
          >
            {isLoading ? 'Processing...' : 'CLAIM YOUR BONUS BUNDLE (SAVE $841)'}
          </button>

          <div className="flex items-center justify-center gap-2 text-gray-600">
            <svg className="w-6 h-6 text-[#EA592D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Money Back Guarantee</span>
          </div>
        </div>
      </main>
    </>
  )
}
