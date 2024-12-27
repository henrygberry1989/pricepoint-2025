'use client'

import { useState, useEffect } from 'react'

const LOADING_STEPS = [
  {
    id: 1,
    title: 'Getting started',
    steps: [
      { text: 'Searching {url}...', description: 'Analyzing your website structure' },
      { text: 'Analyzing homepage...', description: 'Checking content and layout' },
      { text: 'Checking Wayback Machine...', description: 'Finding previous A/B tests' },
      { text: 'Scanning pricing page...', description: 'Analyzing pricing strategy' },
      { text: 'Scanning for labour illusion...', description: 'Checking user experience' },
      { text: 'Identifying CTAs...', description: 'Analyzing conversion elements' },
    ]
  }
]

interface Props {
  url: string;
  onComplete: () => void;
}

export default function GraderLoadingSequence({ url, onComplete }: Props) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [dots, setDots] = useState('')

  // Animate the loading dots
  useEffect(() => {
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)

    return () => clearInterval(dotsInterval)
  }, [])

  // Progress through the steps
  useEffect(() => {
    if (currentStepIndex >= LOADING_STEPS[0].steps.length) {
      onComplete()
      return
    }

    const timer = setTimeout(() => {
      setCurrentStepIndex(prev => prev + 1)
    }, 2000) // Each step takes 2 seconds

    return () => clearTimeout(timer)
  }, [currentStepIndex, onComplete])

  return (
    <div className="fixed inset-0 bg-[#F9F9F9] flex items-center justify-center z-50">
      <div className="max-w-2xl w-full mx-4">
        <h2 className="font-['Instrument_Serif'] text-2xl text-[#F15A2B] text-center mb-2">
          Analyzing your website
        </h2>
        <p className="font-['Instrument_Serif'] text-center mb-8 text-gray-600">
          Please wait while we analyze your website
        </p>

        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="space-y-6">
            {LOADING_STEPS[0].steps.map((step, index) => {
              const isActive = index === currentStepIndex
              const isComplete = index < currentStepIndex
              
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0
                    ${isComplete ? 'bg-[#F15A2B]' : isActive ? 'border-2 border-[#F15A2B]' : 'border-2 border-gray-200'}`}>
                    {isComplete && (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className={`font-['Instrument_Serif'] ${isActive || isComplete ? 'text-[#F15A2B]' : 'text-gray-400'}`}>
                      {step.text.replace('{url}', url)}{isActive ? dots : ''}
                    </p>
                    <p className={`text-sm ${isActive || isComplete ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
