import { useEffect, useRef, useState, useCallback } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react"
import { useCart, useWishlist } from "../store/useStore.js"
import { categories } from "../data/product.js"
import { cn } from "../lib/utils.js"
import SearchOverlay from "./SearchOverlay.jsx"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/", mega: true },
  { label: "Offers", href: "/" },
  { label: "About", href: "/" },
  { label: "Contact", href: "/" },
]

export default function Header() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const lastY = useRef(0)

  const cartCount = useCart((s) => s.count())
  const openCart = useCart((s) => s.openCart)
  const wishCount = useWishlist((s) => s.ids.length)

  const onScroll = useCallback(() => {
    const y = window.scrollY
    setScrolled(y > 20)
    if (y > lastY.current && y > 160) setHidden(true)
    else setHidden(false)
    lastY.current = y
  }, [])

  useEffect(() => {
    let ticking = false
    const handler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          onScroll()
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [onScroll])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "sticky top-0 z-50 w-full transition-colors duration-300",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "bg-background"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              className="rounded-full p-2 hover:bg-muted lg:hidden"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={22} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary font-serif text-xl font-bold text-primary-foreground">
                Q
              </span>
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                Qasai
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) =>
              link.mega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setMega(true)}
                  onMouseLeave={() => setMega(false)}
                >
                  <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted">
                    {link.label}
                    <ChevronDown
                      size={15}
                      className={cn("transition-transform", mega && "rotate-180")}
                    />
                  </button>
                  <AnimatePresence>
                    {mega && (
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 top-full w-[640px] -translate-x-1/2 pt-3"
                      >
                        <div className="grid grid-cols-3 gap-2 rounded-3xl border border-border bg-card p-4 shadow-xl shadow-foreground/5">
                          {categories.map((c) => (
                            <Link
                              key={c.id}
                              to="/"
                              className="group flex items-center gap-3 rounded-2xl p-2 transition-colors hover:bg-muted"
                            >
                              <img
                                src={c.image || "/placeholder.svg"}
                                alt={c.name}
                                loading="lazy"
                                className="h-12 w-12 rounded-xl object-cover"
                              />
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {c.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {c.count} items
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  to={link.href}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="rounded-full p-2.5 transition-colors hover:bg-muted"
            >
              <Search size={20} />
            </button>
            <button
              aria-label="Wishlist"
              className="relative hidden rounded-full p-2.5 transition-colors hover:bg-muted sm:block"
            >
              <Heart size={20} />
              {wishCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {wishCount}
                </span>
              )}
            </button>
            <button
              aria-label="Account"
              className="hidden rounded-full p-2.5 transition-colors hover:bg-muted sm:block"
            >
              <User size={20} />
            </button>
            <button
              onClick={openCart}
              aria-label="Cart"
              className="relative rounded-full p-2.5 transition-colors hover:bg-muted"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[70] w-80 max-w-[85vw] bg-card p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="font-serif text-2xl font-bold text-primary">
                  Qasai
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 hover:bg-muted"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((l) => (
                  <Link
                    key={l.label}
                    to={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-base font-semibold text-foreground hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <p className="mt-8 px-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Shop by category
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((c) => (
                  <Link
                    key={c.id}
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 rounded-2xl border border-border p-2"
                  >
                    <img
                      src={c.image || "/placeholder.svg"}
                      alt={c.name}
                      loading="lazy"
                      className="h-9 w-9 rounded-lg object-cover"
                    />
                    <span className="text-sm font-medium">{c.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
