import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Truck, Leaf, Clock, Star } from "lucide-react"
import Button from "../ui/Button.jsx"
import { useCart } from "../../store/useStore.js"

const badges = [
  { icon: Leaf, label: "No Preservatives" },
  { icon: Truck, label: "Free Delivery ₹599+" },
  { icon: Clock, label: "Cut Fresh Daily" },
]

const floatChips = [
  { label: "Chicken", top: "12%", left: "6%", delay: 0 },
  { label: "Mutton", top: "70%", left: "2%", delay: 0.4 },
  { label: "Fresh Fish", top: "16%", right: "8%", delay: 0.8 },
]

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  const openCart = useCart((s) => s.openCart)

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:px-8 lg:py-16">
        {/* Copy */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 order-2 lg:order-1"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
            <Star size={14} className="fill-accent text-accent" />
            Rated 4.8/5 by 50,000+ families
          </span>

          <h1 className="mt-5 font-serif text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Farm Fresh Meat,
            <span className="block text-primary">Delivered Daily.</span>
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Premium chicken, mutton, fish & seafood — hygienically cut after you
            order and delivered cold to your door. Never frozen, always fresh.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button size="lg" variant="primary">
              Shop Now
              <ArrowRight size={18} />
            </Button>
            <Button size="lg" variant="outline" onClick={openCart}>
              View Offers
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((b) => {
              const Icon = b.icon
              return (
                <div key={b.label} className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <span className="text-sm font-medium">{b.label}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Image */}
        <div className="relative order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border border-border bg-secondary"
          >
            {!loaded && <div className="shimmer absolute inset-0" />}
            <img
              src="/images/hero-meat.png"
              alt="Assortment of fresh raw meats, fish and eggs on a wooden board"
              width={800}
              height={800}
              fetchPriority="high"
              onLoad={() => setLoaded(true)}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Floating chips */}
          {floatChips.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: [0, -10, 0] }}
              transition={{
                opacity: { duration: 0.6, delay: 0.6 + c.delay },
                y: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: c.delay,
                },
              }}
              style={{ top: c.top, left: c.left, right: c.right }}
              className="absolute hidden rounded-2xl border border-border bg-card/90 px-4 py-2 text-sm font-semibold shadow-lg backdrop-blur sm:block"
            >
              {c.label}
            </motion.div>
          ))}

          {/* Discount tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-primary-foreground shadow-xl"
          >
            <span className="font-serif text-lg font-bold">10% OFF</span>
            <span className="text-xs">on first order · FRESH10</span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
