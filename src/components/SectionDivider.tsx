export function SectionDivider() {
  return (
    <div className="w-full flex justify-center py-8">
      <div className="w-full max-w-4xl flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
        </div>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50"></div>
      </div>
    </div>
  )
}
