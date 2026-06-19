import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { categories } from "../../data/product.js"
import Reveal from "../Reveal.jsx"

export default function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <Reveal className="mx-auto mb-10 max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-accent">
          Shop by category
        </p>
        <h2 className="mt-2 text-balance font-serif text-3xl font-bold tracking-tight sm:text-4xl">
          Everything fresh, in one place
        </h2>
        <p className="mt-3 text-muted-foreground">
          From everyday chicken to premium seafood — handpicked and cut fresh.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((c, i) => (
          <motion.a
            href="/"
            key={c.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={c.image || "/placeholder.svg"}
                alt={c.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 via-transparent to-transparent opacity-60" />
              <span className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <ArrowUpRight size={16} />
              </span>
            </div>
            <div className="p-3 text-center">
              <h3 className="font-serif text-base font-bold">{c.name}</h3>
              <p className="text-xs text-muted-foreground">{c.count} items</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
