import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Award, Truck, Zap, ShieldCheck, IndianRupee } from "lucide-react"
import Reveal from "../Reveal.jsx"

const reasons = [
  {
    icon: Award,
    title: "Premium Ingredients",
    desc: "Made with carefully selected spices for authentic flavor.",
  },
  {
    icon: Truck,
    title: "Fresh Delivery",
    desc: "Freshly prepared, securely packed and delivered to your doorstep.",
  },
  {
    icon: Zap,
    title: "Quick Delivery",
    desc: "Fast doorstep delivery so your favorite masalas arrive fresh.",
  },
  {
    icon: ShieldCheck,
    title: "100% Homemade",
    desc: "Handcrafted in hygienic kitchens with traditional recipes.",
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
    desc: "Premium homemade quality at honest everyday prices.",
  },
]


const stats = [
  { value: 50000, suffix: "+", label: "Happy Families" },
  { value: 100, suffix: "+", label: "Homemade Recipes" },
  { value: 4.9, suffix: "/5", label: "Customer Rating", decimals: 1 },
  { value: 99, suffix: "%", label: "Freshly Prepared Orders" },
]

function Counter({ value, suffix, decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const duration = 1500
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(value * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])

  const formatted =
    decimals > 0
      ? display.toFixed(decimals)
      : Math.round(display).toLocaleString("en-IN")

  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  )
}

export default function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          Why Mom's Magic
        </p>
        <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Homemade Goodness in Every Spoonful
        </h2>
        <p className="mt-3 text-muted-foreground">
  Crafted with traditional recipes, premium spices, and the authentic taste of home delivered fresh to your doorstep.
</p>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {reasons.map((r, i) => {
          const Icon = r.icon
          return (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col items-center rounded-3xl border border-border bg-card p-5 text-center"
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
              >
                <Icon size={26} />
              </motion.span>
              <h3 className="mt-4 font-serif text-base font-bold">{r.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {r.desc}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Stats */}
      <div className="mt-12 grid grid-cols-2 gap-4 rounded-[2rem] bg-primary p-8 text-primary-foreground sm:grid-cols-4 lg:p-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="mt-1 text-sm text-primary-foreground/80">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
