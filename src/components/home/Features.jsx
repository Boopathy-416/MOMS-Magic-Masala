import { motion } from "framer-motion"
import { Sun, ChefHat, Thermometer, CreditCard, Rocket } from "lucide-react"
import Reveal from "../Reveal.jsx"

const features = [
  { icon: Sun, title: "Fresh Daily", desc: "Sourced and cut every single morning." },
  { icon: ChefHat, title: "Expert Butchers", desc: "Skilled hands, precise restaurant-grade cuts." },
  { icon: Thermometer, title: "Temperature Controlled", desc: "Cold-chain maintained from cut to door." },
  { icon: CreditCard, title: "Secure Payment", desc: "Encrypted checkout with every method." },
  { icon: Rocket, title: "Lightning Delivery", desc: "Express slots across 120+ cities." },
]

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">
            Built on trust
          </p>
          <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
            Quality you can taste, service you can rely on
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
            Every order is handled with restaurant-grade care — from sourcing
            and cutting to packing and delivery. This is meat shopping, done
            right.
          </p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className={
                  "flex gap-4 rounded-3xl border border-border bg-card p-5" +
                  (i === 4 ? " sm:col-span-2" : "")
                }
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                  <Icon size={24} className="text-primary" />
                </span>
                <div>
                  <h3 className="font-serif text-base font-bold">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
