'use client'

import { Inter, Instrument_Serif } from 'next/font/google'
import { RedesignFormData } from '../types'

const inter = Inter({ subsets: ['latin'] })
const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

const BUDGET_OPTIONS = [
  '$0',
  '$0-1k / Month',
  '$1 - $5k / Month',
  '$5k - $25k / Month',
  '$25k+ Month'
]

interface Props {
  formData: RedesignFormData;
  onUpdate: (data: Partial<RedesignFormData>) => void;
  onNext: () => void;
}

export default function BudgetStep({ formData, onUpdate, onNext }: Props) {
  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24">
      <h2 className={`${instrumentSerif.className} text-2xl md:text-3xl text-center mb-8`}>
        What's{' '}
        <span className="text-[#FF4405] font-semibold">your budget</span>
        {' '}to solve this?
      </h2>

      <div className="space-y-4">
        {BUDGET_OPTIONS.map((option) => (
          <button
            key={option}
            className={`w-full p-5 rounded-lg border text-lg bg-white ${
              formData.budget === option
                ? 'border-[#FF4405] bg-[#FFF5F2] text-[#FF4405]'
                : 'border-gray-200 hover:border-[#FF4405] hover:bg-[#FFF5F2]'
            } transition-colors text-left ${instrumentSerif.className}`}
            onClick={() => onUpdate({ budget: option })}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div className="h-full bg-[#FF4405] w-2/3" />
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4">
        <button
          onClick={onNext}
          disabled={!formData.budget}
          className={`${instrumentSerif.className} w-full max-w-md mx-auto bg-[#FF4405] text-white rounded-lg py-4 px-6 text-lg font-medium hover:bg-[#E63D04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed block`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
