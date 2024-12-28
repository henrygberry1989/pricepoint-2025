'use client'

import { useEffect, useState } from 'react'
import { Instrument_Serif } from 'next/font/google'
import { ProgressBar } from '@/components/progress-bar'

const instrumentSerif = Instrument_Serif({ 
  weight: '400',
  subsets: ['latin'],
})

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
        
        <h1 className={`text-3xl mt-12 mb-8 ${instrumentSerif.className}`}>Book a Call to get a walkthrough of your redesigns</h1>

        <div className="bg-white rounded-lg p-6 shadow-sm relative overflow-hidden">
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <p className={`text-xl mb-4 ${instrumentSerif.className}`}>Redirecting you to booking page in</p>
            <p className={`text-6xl font-bold text-[#EA592D] animate-bounce ${instrumentSerif.className}`}>
              {countdown}
            </p>
          </div>
          
          <div className="grid grid-cols-7 gap-4 text-center">
            <div className="font-medium">MON</div>
            <div className="font-medium">TUE</div>
            <div className="font-medium">WED</div>
            <div className="font-medium">THU</div>
            <div className="font-medium">FRI</div>
            <div className="font-medium">SAT</div>
            <div className="font-medium">SUN</div>

            {/* Week 1 */}
            <div className="p-2">1</div>
            <div className="p-2">2</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">3</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">4</div>
            <div className="p-2">5</div>

            {/* Week 2 */}
            <div className="p-2">6</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">7</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">8</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">9</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">10</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">11</div>
            <div className="p-2">12</div>

            {/* Week 3 */}
            <div className="p-2">13</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">14</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">15</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">16</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">17</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">18</div>
            <div className="p-2">19</div>

            {/* Week 4 */}
            <div className="p-2">20</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">21</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">22</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">23</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">24</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">25</div>
            <div className="p-2">26</div>

            {/* Week 5 */}
            <div className="p-2">27</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">28</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">29</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">30</div>
            <div className="p-2 rounded-full bg-[#EA592D]/10 text-[#EA592D]">31</div>
          </div>
        </div>
      </div>
    </main>
  )
}
