'use client'

import { useEffect, useState } from 'react'
import { Inter, Instrument_Serif } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })
const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export default function CalendarStep() {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      window.location.href = 'https://calendly.com/henryberry801/30-min-call'
    }
  }, [countdown])

  // Generate calendar data
  const generateCalendar = () => {
    const days = []
    let date = 1
    
    // Generate 5 weeks
    for (let week = 0; week < 5; week++) {
      const weekDays = []
      for (let day = 0; day < 7; day++) {
        if ((week === 0 && day < 3) || date > 31) { // First week starts on 4th day
          weekDays.push({ date: '', available: false })
        } else {
          // Randomly make 3 days per week available
          const isAvailable = day < 5 && Math.random() < 0.6 && weekDays.filter(d => d.available).length < 3
          weekDays.push({ date: date.toString(), available: isAvailable })
          date++
        }
      }
      days.push(weekDays)
    }
    return days
  }

  const calendar = generateCalendar()

  return (
    <div className="w-full max-w-2xl mx-auto px-4 text-center min-h-screen pt-24 pb-12">
      <h1 className={`${instrumentSerif.className} text-3xl md:text-4xl font-semibold mb-12`}>
        Book a Call to get a walkthrough of your redesign
      </h1>

      {/* Calendar Container */}
      <div className="bg-white rounded-xl shadow-sm p-12 relative">
        {/* Blur Overlay */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center rounded-xl">
          <p className={`${instrumentSerif.className} text-xl text-gray-800 mb-4`}>
            Redirecting you to booking page in
          </p>
          <div className={`${instrumentSerif.className} text-7xl md:text-8xl font-bold text-[#FF4405] animate-bounce`}>
            {countdown}
          </div>
        </div>

        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-4 mb-4">
          {DAYS.map(day => (
            <div key={day} className={`${inter.className} text-sm font-medium text-gray-600`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendar.flat().map((day, i) => (
            <div
              key={i}
              className={`aspect-square flex items-center justify-center rounded-full text-sm
                ${day.available 
                  ? 'bg-[#FFF5F2] text-[#FF4405] font-medium cursor-pointer hover:bg-[#FFEBE5]' 
                  : day.date 
                    ? 'text-gray-400'
                    : ''
                }`}
            >
              {day.date}
            </div>
          ))}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div className="h-full bg-[#FF4405] w-full" />
      </div>
    </div>
  )
}
