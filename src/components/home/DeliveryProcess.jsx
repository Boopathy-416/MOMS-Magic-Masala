import { motion } from "framer-motion"
import { MousePointerClick, ShoppingCart, Scissors, Package, Truck } from "lucide-react"
import Reveal from "../Reveal.jsx"

const steps = [
  {
    icon: MousePointerClick,
    title: "Choose Your Masalas",
    desc: "Browse and select your favorite homemade spice blends.",
  },
  {
    icon: ShoppingCart,
    title: "Place Your Order",
    desc: "Checkout securely in just a few simple steps.",
  },
  {
    icon: Scissors,
    title: "Freshly Prepared",
    desc: "Handcrafted in small batches using traditional recipes.",
  },
  {
    icon: Package,
    title: "Carefully Packed",
    desc: "Freshly packed in hygienic, sealed packaging to preserve flavor.",
  },
  {
    icon: Truck,
    title: "Doorstep Delivery",
    desc: "Fresh homemade masalas delivered safely to your doorstep.",
  },
]

export default function DeliveryProcess() {
  return (
    <section className="bg-secondary/40 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            How it works
          </p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            From order to doorstep in 5 steps
          </h2>
        </Reveal>

        <div className="relative grid gap-8 md:grid-cols-5 md:gap-4">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-border md:block" />
          {steps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative flex flex-col items-center text-center"
              >
                <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg">
                  <Icon size={26} />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-4 font-serif text-base font-bold">{s.title}</h3>
                <p className="mt-1 max-w-[180px] text-xs leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
