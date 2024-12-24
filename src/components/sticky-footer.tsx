'use client'

interface StickyFooterProps {
  children: React.ReactNode
}

export function StickyFooter({ children }: StickyFooterProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#F9F8F6] border-t border-gray-200 p-4 md:hidden">
      <div className="container mx-auto max-w-md">
        {children}
      </div>
    </div>
  )
}
