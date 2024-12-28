'use client'

import { useEffect, useState } from 'react'
import { ProgressBar } from '@/components/progress-bar'

export default function CalendarPage() {
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
    <main className="min-h-screen bg-[#F9F9F9] p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <ProgressBar currentStep={3} totalSteps={3} />
        
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <p className="text-xl mb-4">Redirecting you to booking page in</p>
            <p className="text-6xl font-bold text-[#EA592D] animate-bounce">
              {countdown}
            </p>
          </div>

          <h1 className="text-3xl mb-8">Book a Call</h1>
          <p className="text-xl mb-8">Receive a walkthrough of your redesign</p>
          
          <div className="w-full h-96 bg-gray-100 rounded-lg"></div>
        </div>
      </div>
    </main>
  )
}
