'use client'

import { Inter, Instrument_Serif } from 'next/font/google'
import { RedesignFormData } from '../types'

const inter = Inter({ subsets: ['latin'] })
const instrumentSerif = Instrument_Serif({ 
  weight: ['400'],
  subsets: ['latin'],
})

interface Props {
  formData: RedesignFormData;
  onUpdate: (data: Partial<RedesignFormData>) => void;
  onNext: () => void;
}

export default function URLEmailStep({ formData, onUpdate, onNext }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  const handleUrlChange = (value: string) => {
    // Add https:// if no protocol is specified
    let url = value
    if (url && !/^https?:\/\//i.test(url)) {
      url = 'https://' + url
    }
    onUpdate({ company_url: url })
  }

  const isFormValid = () => {
    return formData.company_url && formData.email
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 pb-24">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="company_url" className={`${inter.className} block text-sm font-medium text-gray-700 mb-1`}>
            Company Website
          </label>
          <input
            type="text"
            id="company_url"
            required
            placeholder="your-company.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-lg"
            value={formData.company_url}
            onChange={(e) => handleUrlChange(e.target.value)}
            pattern="^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$"
          />
        </div>

        <div>
          <label htmlFor="email" className={`${inter.className} block text-sm font-medium text-gray-700 mb-1`}>
            Work Email
          </label>
          <input
            type="email"
            id="email"
            required
            placeholder="you@company.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-lg"
            value={formData.email}
            onChange={(e) => onUpdate({ email: e.target.value })}
          />
        </div>
      </form>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200">
        <div className="h-full bg-[#FF4405] w-[15%]" />
      </div>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4">
        <button
          onClick={onNext}
          disabled={!isFormValid()}
          className={`${instrumentSerif.className} w-full max-w-md mx-auto bg-[#FF4405] text-white rounded-lg py-4 px-6 text-lg font-medium hover:bg-[#E63D04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed block`}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
