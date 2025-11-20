import { useEffect, useRef } from 'react'

export default function Starfield({ density = 160, className = '' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const stars = new Array(density).fill(0).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random() * 0.8 + 0.2,
      r: Math.random() * 1.2 + 0.2,
      s: Math.random() * 0.6 + 0.2,
    }))

    let raf
    const render = () => {
      ctx.clearRect(0, 0, width, height)
      for (const star of stars) {
        star.x += star.s
        if (star.x > width) star.x = 0
        ctx.globalAlpha = star.z
        ctx.fillStyle = '#A5B4FC'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(render)
    }
    render()

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [density])

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />
}
