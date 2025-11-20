import { useState } from 'react'

export default function CTAForm({ onSubmit }) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(email)
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400/40"
        required
      />
      <button
        type="submit"
        className="rounded-xl bg-blue-500/90 hover:bg-blue-500 px-5 py-3 text-white font-medium shadow-lg shadow-blue-500/20 transition-colors"
      >
        Get Early Access
      </button>
    </form>
  )
}
