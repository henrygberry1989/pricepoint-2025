'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Calendar } from '@/components/calendar'

export default function SuccessPage() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          window.location.href = 'https://calendly.com/henryberry801/30-min-call'
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <main className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[#EA592D] text-lg mb-4">
          You Qualify for a Free Strategy Call
        </p>
        
        <h1 className="text-3xl font-playfair mb-8">
          Receive Tailored Insights from 5+ Hours of Research Just For You
        </h1>

        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6 mb-8 relative">
          {/* Countdown overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Redirecting you to booking page in</p>
              <div className="text-6xl font-bold text-[#EA592D] animate-bounce">
                {countdown}
              </div>
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            Get direct feedback on growth strategies from billion-dollar SaaS companies that would work best for your business.
          </p>

          <Calendar />

          <div className="space-y-4">
            <h2 className="text-lg font-medium">A little about me:</h2>
            <ul className="list-disc text-left pl-6 space-y-2">
              <li>Former venture capitalist with extensive experience in Growth</li>
              <li>Helped scale an affiliate marketplace to 30M+ users</li>
              <li>B2B SaaS pricing and growth consultant</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium">What we'll cover:</h2>
            <ul className="list-disc text-left pl-6 space-y-2">
              <li><span className="font-medium">Top Growth Hacks:</span> Tailored recommendations for your business size and model</li>
              <li><span className="font-medium">LTV Optimization:</span> Quick wins to improve pricing and retention</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}
