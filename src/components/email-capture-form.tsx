'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

export function EmailCaptureForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { error } = await supabase
        .from('new_submissions')
        .insert([{
          email,
          created_at: new Date().toISOString(),
          completed: false
        }])

      if (error) {
        console.error('Error submitting email:', error)
        toast.error('Something went wrong. Please try again.')
        return
      }

      router.push('/funnel-1/onboarding/trusted')
    } catch (error) {
      console.error('Error submitting email:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work email"
            required
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EA592D] focus:border-transparent"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-4 px-6 py-3 bg-[#EA592D] text-white font-semibold rounded-lg hover:bg-[#d54d24] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Get Access for $0'}
          </button>
        </div>
      </form>
    </div>
  )
}
