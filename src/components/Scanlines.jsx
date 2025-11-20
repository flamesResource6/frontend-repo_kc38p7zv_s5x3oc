export default function Scanlines({ opacity = 0.08 }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:100%_2px]"
      style={{ opacity }}
    />
  )
}
