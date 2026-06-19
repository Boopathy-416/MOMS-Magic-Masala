import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, TrendingUp, Clock } from "lucide-react"
import { bestSellers } from "../data/product.js"
import { formatPrice } from "../lib/utils.js"

const trending = ["Chicken curry cut", "Mutton boneless", "Salmon", "Prawns", "Tikka"]

export default function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")
  const [recent, setRecent] = useState([])

  useEffect(() => {
    const t = setTimeout(() => setDebounced(query), 250)
    return () => clearTimeout(t)
  }, [query])

  useEffect(() => {
    if (open) {
      try {
        setRecent(JSON.parse(localStorage.getItem("qasai-recent") || "[]"))
      } catch {
        setRecent([])
      }
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose()
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  const results = useMemo(() => {
    if (!debounced.trim()) return []
    const q = debounced.toLowerCase()
    return bestSellers.filter(
      (p) =>
        p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
    )
  }, [debounced])

  const commit = (term) => {
    if (!term.trim()) return
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5)
    setRecent(next)
    localStorage.setItem("qasai-recent", JSON.stringify(next))
    setQuery(term)
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex justify-center bg-foreground/40 px-4 pt-20 backdrop-blur-sm sm:pt-28"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="h-fit w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-5">
              <Search size={20} className="text-muted-foreground" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && commit(query)}
                placeholder="Search chicken, mutton, fish…"
                className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="rounded-full p-2 hover:bg-muted"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-5">
              {results.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {results.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => commit(p.name)}
                      className="flex items-center gap-3 rounded-2xl p-2 text-left hover:bg-muted"
                    >
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        loading="lazy"
                        className="h-12 w-12 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-semibold">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">
                        {formatPrice(p.price)}
                      </span>
                    </button>
                  ))}
                </div>
              ) : debounced.trim() ? (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No results for “{debounced}”
                </p>
              ) : (
                <div className="flex flex-col gap-6">
                  {recent.length > 0 && (
                    <div>
                      <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        <Clock size={14} /> Recent
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {recent.map((r) => (
                          <button
                            key={r}
                            onClick={() => commit(r)}
                            className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted"
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      <TrendingUp size={14} /> Trending
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {trending.map((t) => (
                        <button
                          key={t}
                          onClick={() => commit(t)}
                          className="rounded-full bg-muted px-3 py-1.5 text-sm font-medium hover:bg-secondary"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
