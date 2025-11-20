import { Suspense } from 'react'
import Spline from '@splinetool/react-spline'
import Scanlines from './Scanlines'
import Starfield from './Starfield'
import MetricsCounter from './MetricsCounter'
import ScrollIndicator from './ScrollIndicator'

export default function Hero() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const handleSubmit = async (email) => {
    try {
      const res = await fetch(`${backendUrl || ''}/api/hello`)
      const data = await res.json().catch(() => ({}))
      alert(`Thanks! We'll be in touch.${data?.message ? `\n${data.message}` : ''}`)
    } catch (e) {
      alert('Thanks! Backend is waking up.')
    }
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background 3D scene */}
      <div className="absolute inset-0 -z-10">
        <Suspense fallback={<div className=\"w-full h-full bg-slate-900\" />}> 
          {/* Replace with your Spline scene URL */}
          <Spline scene="https://prod.spline.design/9QhXo3mW5pCw3k5V/scene.splinecode" />
        </Suspense>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/10 to-slate-950/70" />
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
                Calculate solar potential with a 3D sky view
              </h1>
              <p className="mt-5 text-white/80 text-lg leading-relaxed max-w-xl">
                A lightweight, visual-first calculator that blends 3D context with accurate metrics. Explore your site, tweak parameters, and see impact instantly.
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
                  <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e.target[0].value) }} className="flex items-center gap-3">
                    <input
                      type="email"
                      placeholder="Work email"
                      className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
                      required
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-blue-500/90 hover:bg-blue-500 px-5 py-3 text-white font-medium shadow-lg shadow-blue-500/20 transition-colors"
                    >
                      Get updates
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Right visual placeholder for calculator card */}
            <div className="flex-1 w-full">
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 overflow-hidden">
                <div className="aspect-[4/3] w-full rounded-xl bg-slate-900/60 ring-1 ring-white/10" />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-400/10" />
                <div className="absolute -inset-20 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.18),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.18),transparent_35%)]" />
              </div>
              <p className="text-white/60 text-sm mt-3">Interactive calculator preview</p>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </div>
    </section>
  )
}
