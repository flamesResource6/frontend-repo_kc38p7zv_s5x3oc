import { Suspense } from 'react'
import Scanlines from './Scanlines'
import Starfield from './Starfield'
import MetricsCounter from './MetricsCounter'
import ScrollIndicator from './ScrollIndicator'
import CalculatorPreview from './CalculatorPreview'
import CTAForm from './CTAForm'

export default function Hero() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async (email) => {
    try {
      if (!backendUrl) {
        alert("Thanks! We'll be in touch.")
        return
      }
      const res = await fetch(`${backendUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json().catch(() => ({}))
      const stored = data?.stored ? ' (saved)' : ''
      alert(`Thanks! You're on the list${stored}.`)
    } catch (e) {
      alert("Thanks! Backend is waking up.")
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background visual (lightweight, no external 3D) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/60 to-slate-950" />
        <Starfield className="mix-blend-screen opacity-60" />
        <Scanlines opacity={0.06} />
      </div>

      {/* Content container */}
      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-24 sm:pt-32 sm:pb-32 md:pt-40">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 sm:p-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
            {/* Left copy */}
            <div className="flex-1">
              <p className="text-blue-200/80 font-medium mb-3 tracking-wide uppercase text-xs">Living Sky</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-[600] tracking-tight text-white">
                Calculate solar potential with a 3D sky vibe
              </h1>
              <p className="mt-5 text-white/80 text-lg leading-relaxed max-w-xl">
                A lightweight, visual-first calculator that blends spatial context with accurate metrics. Explore your site, tweak parameters, and see impact instantly.
              </p>

              {/* Metrics */}
              <div className="mt-8 grid grid-cols-3 gap-6 max-w-xl">
                <div>
                  <div className="text-3xl text-white font-semibold">
                    <MetricsCounter value={98} />%
                  </div>
                  <p className="text-white/60 text-sm mt-1">Accuracy vs baseline</p>
                </div>
                <div>
                  <div className="text-3xl text-white font-semibold">
                    <MetricsCounter value={12} />×
                  </div>
                  <p className="text-white/60 text-sm mt-1">Faster scenario runs</p>
                </div>
                <div>
                  <div className="text-3xl text-white font-semibold">
                    <MetricsCounter value={3} />min
                  </div>
                  <p className="text-white/60 text-sm mt-1">To first insight</p>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8">
                <p className="text-white/70 mb-3">Join the early-access list</p>
                <div className="max-w-md">
                  <CTAForm onSubmit={handleSubmit} />
                </div>
              </div>
            </div>

            {/* Right: Interactive calculator preview */}
            <div className="flex-1 w-full">
              <CalculatorPreview />
              <p className="text-white/60 text-sm mt-3">Interactive calculator preview</p>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  )
}
