export default function ScrollIndicator() {
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-blue-200/70 text-xs tracking-widest uppercase">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-blue-400 animate-pulse" />
        Scroll
      </div>
    </div>
  )
}
