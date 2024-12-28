export default function RedesignLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      {children}
    </div>
  )
}
