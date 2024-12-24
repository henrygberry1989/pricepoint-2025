'use client'

import { useMemo } from 'react'

// Static available days - varied across different days each week for January 2025
const AVAILABLE_DAYS = new Set([
  2,  // Tuesday Week 1
  4,  // Thursday Week 1
  7,  // Sunday Week 2
  9,  // Tuesday Week 2
  12, // Friday Week 2
  15, // Monday Week 3
  17, // Wednesday Week 3
  19, // Friday Week 3
  21, // Sunday Week 4
  23, // Tuesday Week 4
  25, // Thursday Week 4
  28, // Sunday Week 5
  30, // Tuesday Week 5
  31, // Wednesday Week 5
])

export function Calendar() {
  const weeks = useMemo(() => {
    const daysInMonth = 31
    const firstDayOfMonth = 3 // Wednesday for January 2025
    const weeks = []
    let days = []
    
    // Add empty cells for days before the 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<td key={`empty-${i}`} className="p-2"></td>)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isAvailable = AVAILABLE_DAYS.has(day)
      days.push(
        <td key={day} className="p-2">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              isAvailable
                ? 'bg-[#EA592D]/10 text-[#EA592D] cursor-pointer hover:bg-[#EA592D]/20'
                : 'text-gray-500'
            }`}
          >
            {day}
          </div>
        </td>
      )
      
      if ((day + firstDayOfMonth) % 7 === 0 || day === daysInMonth) {
        weeks.push(<tr key={day}>{days}</tr>)
        days = []
      }
    }
    
    return weeks
  }, [])

  return (
    <div className="relative">
      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm z-10"></div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-xl font-medium text-gray-900">January 2025</h2>
          <button className="text-gray-600 hover:text-gray-800">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-2 text-sm font-medium text-gray-600">SUN</th>
              <th className="p-2 text-sm font-medium text-gray-600">MON</th>
              <th className="p-2 text-sm font-medium text-gray-600">TUE</th>
              <th className="p-2 text-sm font-medium text-gray-600">WED</th>
              <th className="p-2 text-sm font-medium text-gray-600">THU</th>
              <th className="p-2 text-sm font-medium text-gray-600">FRI</th>
              <th className="p-2 text-sm font-medium text-gray-600">SAT</th>
            </tr>
          </thead>
          <tbody>{weeks}</tbody>
        </table>
      </div>
    </div>
  )
}
