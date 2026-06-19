import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Cookie } from "lucide-react"
import Button from "./ui/Button.jsx"

export default function CookieConsent() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem("qasai-cookie")) setShow(true)
    }, 1800)
    return () => clearTimeout(t)
  }, [])

  const accept = () => {
    localStorage.setItem("qasai-cookie", "1")
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-24 left-4 z-[60] max-w-sm rounded-3xl border border-border bg-card p-5 shadow-2xl lg:bottom-6"
        >
          <div className="flex items-start gap-3">
            <Cookie size={22} className="mt-0.5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold">We use cookies</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                We use cookies to keep your cart fresh and personalise your
                experience. By continuing you agree to our cookie policy.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="primary" onClick={accept}>
                  Accept
                </Button>
                <Button size="sm" variant="ghost" onClick={accept}>
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
