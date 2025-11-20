import { useEffect, useState } from 'react'

export default function MetricsCounter({ value = 0, duration = 1200, className = '' }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let raf
    const start = performance.now()

    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(eased * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return (
    <span className={`font-mono tabular-nums tracking-tight ${className}`}>{display.toLocaleString()}</span>
  )
}
