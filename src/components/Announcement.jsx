import { useState } from "react"
import { X } from "lucide-react"

const messages = [
  " Taste the Magic of Homemade Masalas",
  " Authentic flavors for every kitchen",
  " Exclusive offers available every week",
  " Freshly prepared • Carefully packed • Delivered with care",
]

export default function Announcement() {
  const [open, setOpen] = useState(true)
  if (!open) return null
  const loop = [...messages, ...messages]
  return (
    <div className="relative flex items-center overflow-hidden bg-primary text-primary-foreground">
      <div className="flex w-max animate-marquee whitespace-nowrap py-2">
        {loop.map((m, i) => (
          <span key={i} className="mx-8 text-xs font-medium tracking-wide sm:text-sm">
            {m}
          </span>
        ))}
      </div>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-white/10"
      >
        <X size={16} className="hover:text-black" />
      </button>
    </div>
  )
}
