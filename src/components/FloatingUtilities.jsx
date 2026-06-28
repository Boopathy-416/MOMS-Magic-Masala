import { useEffect, useState } from "react"
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion"
import { ArrowUp, MessageCircleCheck } from "lucide-react"

export default function FloatingUtilities() {
  const [showTop, setShowTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[110] h-1 origin-left bg-accent"
      />

      {/* WhatsApp */}
      <a
        href="https://wa.me/916382593232"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-24 right-4 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-success p-3 text-white shadow-lg shadow-success/30 transition-transform hover:scale-110 lg:bottom-6"
      > 
        <MessageCircleCheck size={24} />
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-40 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-lg transition-transform hover:scale-110 lg:bottom-24"
          >
            <ArrowUp size={22}  />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
