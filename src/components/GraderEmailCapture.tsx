'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface Props {
  onSubmit: (email: string) => void;
}

export default function GraderEmailCapture({ onSubmit }: Props) {
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value

    try {
      // Create initial submission in admin table
      const { error } = await supabase
        .from('new_submissions')
        .insert([
          {
            email,
            company_url: localStorage.getItem('company_url') || '',
            objective: 'Looking for New Growth Channels', // Default objective
            metric_goal: 'Increase Revenue',  // Default goal
            completed: false,
            is_read: false
          }
        ])

      if (error) {
        console.error('Error creating submission:', error)
        return
      }

      onSubmit(email)
      router.push('/grader/results')
    } catch (error) {
      console.error('Error in form submission:', error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-xl w-full mx-4 text-center">
        <h2 className="font-['Instrument_Serif'] text-3xl text-[#F15A2B] mb-4">
          Your grades are ready!
        </h2>
        <p className="font-['Instrument_Serif'] text-xl mb-8">
          Enter your email to view results
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="p-4 rounded-lg border-2 border-[#F15A2B] focus:outline-none focus:border-[#F15A2B] bg-white"
            required
          />
          <button 
            type="submit"
            className="font-['Instrument_Serif'] text-xl bg-[#F15A2B] text-white px-8 py-4 rounded-lg hover:bg-[#d14a21] transition-colors shadow-lg"
          >
            View Results
          </button>
        </form>
      </div>
    </div>
  )
}
