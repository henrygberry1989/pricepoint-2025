'use client'

import { useRouter } from 'next/navigation'

interface Props {
  onSubmit: (email: string) => void;
}

export default function GraderEmailCapture({ onSubmit }: Props) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const email = form.email.value
    onSubmit(email)
    router.push('/grader/results')
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
