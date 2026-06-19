import { useState } from "react"
import { motion } from "framer-motion"
import { Home, LayoutGrid, Search, ShoppingBag, User } from "lucide-react"
import { useCart } from "../store/useStore.js"
import SearchOverlay from "./SearchOverlay.jsx"
import { cn } from "../lib/utils.js"

const tabs = [
  { id: "home", label: "Home", icon: Home },
  { id: "categories", label: "Categories", icon: LayoutGrid },
  { id: "search", label: "Search", icon: Search },
  { id: "cart", label: "Cart", icon: ShoppingBag },
  { id: "account", label: "Account", icon: User },
]

export default function MobileNav() {
  const [active, setActive] = useState("home")
  const [searchOpen, setSearchOpen] = useState(false)
  const openCart = useCart((s) => s.openCart)
  const cartCount = useCart((s) => s.count())

  const handle = (id) => {
    setActive(id)
    if (id === "search") setSearchOpen(true)
    if (id === "cart") openCart()
    if (id === "home" || id === "categories")
      window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden">
        <div className="mx-auto mb-3 flex max-w-sm items-center justify-around rounded-3xl border border-border bg-background/80 px-2 py-2 shadow-xl shadow-foreground/10 backdrop-blur-xl">
          {tabs.map((t) => {
            const Icon = t.icon
            const isActive = active === t.id
            return (
              <button
                key={t.id}
                onClick={() => handle(t.id)}
                className="relative flex flex-1 flex-col items-center gap-0.5 py-1.5"
                aria-label={t.label}
              >
                {isActive && (
                  <motion.span
                    layoutId="mobile-active"
                    className="absolute inset-0 rounded-2xl bg-primary/10"
                    transition={{ type: "spring", damping: 28, stiffness: 350 }}
                  />
                )}
                <span className="relative">
                  <Icon
                    size={22}
                    className={cn(
                      "transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground"
                    )}
                  />
                  {t.id === "cart" && cartCount > 0 && (
                    <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                      {cartCount}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    "relative text-[10px] font-medium transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {t.label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
