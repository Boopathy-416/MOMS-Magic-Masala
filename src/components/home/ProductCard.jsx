import { memo, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Eye, Plus, Star } from "lucide-react"
import { useCart, useWishlist } from "../../store/useStore.js"
import { formatPrice } from "../../lib/utils.js"
import { cn } from "../../lib/utils.js"

function ProductCard({ product }) {
  const [loaded, setLoaded] = useState(false)
  const addItem = useCart((s) => s.addItem)
  const wished = useWishlist((s) => s.ids.includes(product.id))
  const toggleWish = useWishlist((s) => s.toggle)

  const off = Math.round(((product.mrp - product.price) / product.mrp) * 100)

  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!loaded && <div className="shimmer absolute inset-0" />}
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-primary px-2.5 py-1 text-[11px] font-bold text-primary-foreground">
              {product.badge}
            </span>
          )}
          {off > 0 && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[11px] font-bold text-accent-foreground">
              {off}% OFF
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => toggleWish(product.id)}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur transition-colors hover:bg-card"
        >
          <Heart
            size={17}
            className={cn(
              "transition-colors",
              wished ? "fill-primary text-primary" : "text-foreground"
            )}
          />
        </button>

        {/* Quick view on hover */}
        <div className="absolute inset-x-3 bottom-3 translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button className="flex w-full items-center justify-center gap-2 rounded-full bg-card/95 py-2 text-sm font-semibold backdrop-blur hover:bg-card">
            <Eye size={16} /> Quick View
          </button>
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
            <span className="rounded-full bg-card px-4 py-1.5 text-sm font-bold text-destructive">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
            <Star size={13} className="fill-accent text-accent" />
            {product.rating}
          </span>
        </div>
        <h3 className="mt-1 font-serif text-base font-bold leading-snug">
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground">{product.weight}</p>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <span className="text-lg font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.mrp > product.price && (
              <span className="ml-1.5 text-sm text-muted-foreground line-through">
                {formatPrice(product.mrp)}
              </span>
            )}
          </div>
          <button
            disabled={!product.inStock}
            onClick={() => addItem(product)}
            aria-label={`Add ${product.name} to cart`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-[#681919] active:scale-90 disabled:opacity-40"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default memo(ProductCard)
