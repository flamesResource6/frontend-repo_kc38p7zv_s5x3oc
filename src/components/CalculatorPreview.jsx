import { useMemo, useRef, useState } from 'react'

export default function CalculatorPreview() {
  const [tilt, setTilt] = useState(25) // panel tilt degrees
  const [azimuth, setAzimuth] = useState(180) // 0=N,90=E,180=S,270=W
  const [irradiance, setIrradiance] = useState(4.8) // kWh/m^2/day baseline
  const [area, setArea] = useState(18) // m^2

  // Simple pseudo model for quick feedback
  const estimate = useMemo(() => {
    const tiltFactor = 1 - Math.abs(tilt - 30) / 120 // peak near 30deg
    const facingSouthFactor = 1 - Math.min(Math.abs(azimuth - 180), 180) / 240 // peak at south
    const k = Math.max(0.5, tiltFactor * 0.9 + facingSouthFactor * 0.6)
    const dailyKWh = irradiance * area * 0.18 * k // 18% eff
    const monthlyKWh = dailyKWh * 30
    return {
      daily: Math.max(0, dailyKWh),
      monthly: Math.max(0, monthlyKWh),
      score: Math.round(Math.min(100, (k / 1.5) * 100)),
    }
  }, [tilt, azimuth, irradiance, area])

  // Card interactivity: subtle parallax on pointer
  const cardRef = useRef(null)
  let rafId = useRef(0)

  const handlePointerMove = (e) => {
    const el = cardRef.current
    if (!el) return
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      const rx = (py - 0.5) * 10
      const ry = (0.5 - px) * 10
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`
    })
  }

  const handlePointerLeave = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transform = 'rotateX(0deg) rotateY(0deg)'
  }

  return (
    <div className="w-full">
      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden" style={{ perspective: '900px' }}>
        <div
          ref={cardRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="aspect-[4/3] w-full rounded-xl bg-slate-900/60 ring-1 ring-white/10 transition-transform duration-150 ease-out will-change-transform cursor-pointer shadow-xl">
          {/* pseudo scene */}
          <Scene tilt={tilt} azimuth={azimuth} score={estimate.score} />
        </div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-400/10" />
      </div>

      {/* Controls */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <LabeledSlider label="Tilt" value={tilt} setValue={setTilt} min={0} max={60} unit="°" />
        <LabeledSlider label="Azimuth" value={azimuth} setValue={setAzimuth} min={0} max={360} unit="°" />
        <LabeledSlider label="Irradiance" value={irradiance} setValue={setIrradiance} min={2.5} max={7} step={0.1} unit="kWh/m²·day" />
        <LabeledSlider label="Array Area" value={area} setValue={setArea} min={5} max={40} step={1} unit="m²" />
      </div>

      {/* Mini metrics */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <p className="text-white/60">Daily</p>
          <p className="text-white text-lg font-semibold">{estimate.daily.toFixed(1)} kWh</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <p className="text-white/60">Monthly</p>
          <p className="text-white text-lg font-semibold">{Math.round(estimate.monthly)} kWh</p>
        </div>
        <div className="rounded-xl bg-white/5 border border-white/10 p-3">
          <p className="text-white/60">Score</p>
          <div className="h-2 rounded bg-white/10 overflow-hidden mt-2">
            <div className="h-full bg-gradient-to-r from-emerald-400 to-blue-500" style={{ width: `${estimate.score}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function LabeledSlider({ label, value, setValue, min, max, step = 1, unit }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <p className="text-white/80 text-sm">{label}</p>
        <p className="text-white/60 text-xs">{value}{unit ? ` ${unit}` : ''}</p>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
        className="w-full accent-blue-500"
      />
    </div>
  )
}

function Scene({ tilt, azimuth, score }) {
  // Simple 2D scene with sun position and panel orientation
  const sunTop = 20 + Math.sin((azimuth / 180) * Math.PI) * 30
  const sunLeft = 20 + Math.cos((azimuth / 180) * Math.PI) * 50
  return (
    <div className="relative w-full h-full">
      {/* sun */}
      <div
        className="absolute w-16 h-16 rounded-full"
        style={{
          top: `${sunTop}%`,
          left: `${sunLeft}%`,
          background: 'radial-gradient(circle, rgba(253,224,71,0.95), rgba(253,224,71,0.2))',
          boxShadow: '0 0 40px rgba(253,224,71,0.6)'
        }}
      />
      {/* panel */}
      <div className="absolute inset-x-8 bottom-6 h-24" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg border border-white/10 shadow-2xl"
          style={{ transform: `rotateX(${tilt}deg)` }}
        />
      </div>
      {/* energy bars */}
      <div className="absolute right-4 top-4 w-2 rounded bg-white/10 overflow-hidden">
        <div className="bg-emerald-400 w-full transition-all" style={{ height: `${score}%` }} />
      </div>
    </div>
  )
}
