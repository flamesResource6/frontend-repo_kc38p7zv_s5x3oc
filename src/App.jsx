import Hero from './components/Hero'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      {/* Placeholder section below for scroll */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-2xl font-semibold mb-2">What’s inside</h2>
          <p className="text-white/70 max-w-2xl">A streamlined 3D hero, glassmorphic container, animated metrics, and a CTA wired to the backend hello endpoint. We’ll hook up the full calculator next.</p>
        </div>
      </section>
    </div>
  )
}

export default App
