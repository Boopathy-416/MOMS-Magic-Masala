import { useMemo, useState } from "react"
import { bestSellers } from "../../data/product.js"
import ProductCard from "./ProductCard.jsx"
import Reveal from "../Reveal.jsx"
import Button from "../ui/Button.jsx"
import { cn } from "../../lib/utils.js"

// const filters = ["All", "Chicken", "Mutton", "Fish", "Seafood", "Eggs", "Marinated"]

const filters = [
  "All",
  "Spice Powders",
  "Blended Masalas",
  "Biryani Masalas",
  "Curry Masalas",
  "Special Mixes",
  "Combo Packs",
]

export default function BestSellers() {
  const [active, setActive] = useState("All")
  const [visible, setVisible] = useState(8)

  const filtered = useMemo(() => {
    const list =
      active === "All"
        ? bestSellers
        : bestSellers.filter((p) => p.category === active)
    // duplicate to simulate a fuller catalogue for "load more"
    return [...list, ...list.map((p) => ({ ...p, id: p.id + "-b" }))]
  }, [active])

  const shown = filtered.slice(0, visible)

  return (
    <section className="bg-secondary/40 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-accent">
              Customer favourites
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight sm:text-4xl">
              Best Sellers
            </h2>
          </div>
          <div className="no-scrollbar -mx-4 flex w-screen gap-2 overflow-x-auto px-4 sm:mx-0 sm:w-auto sm:flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActive(f)
                  setVisible(8)
                }}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
                  active === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:bg-muted"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {shown.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {visible < filtered.length && (
          <div className="mt-10 flex justify-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setVisible((v) => v + 8)}
            >
              Load more products
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
