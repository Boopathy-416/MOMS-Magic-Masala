import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, Trash2, ShoppingBag, Tag, ShieldCheck } from "lucide-react"
import { useCart } from "../store/useStore.js"
import { formatPrice } from "../lib/utils.js"
import Button from "./ui/Button.jsx"

const COUPONS = { FRESH10: 0.1, SPL5: 0.05 }
const DELIVERY = 49
const FREE_OVER = 599
const GST_RATE = 0.05

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, coupon, applyCoupon } =
    useCart()
  const [code, setCode] = useState("")
  const [error, setError] = useState("")

  const subtotal = items.reduce((t, i) => t + i.price * i.qty, 0)
  const discountRate = coupon ? COUPONS[coupon] || 0 : 0
  const discount = Math.round(subtotal * discountRate)
  const taxable = subtotal - discount
  const gst = Math.round(taxable * GST_RATE)
  const delivery = subtotal === 0 || subtotal >= FREE_OVER ? 0 : DELIVERY
  const total = taxable + gst + delivery
  const remaining = Math.max(0, FREE_OVER - subtotal)

  const handleApply = () => {
    const c = code.trim().toUpperCase()
    if (COUPONS[c]) {
      applyCoupon(c)
      setError("")
    } else {
      setError("Invalid coupon code")
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-foreground/50 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-[100] flex w-full max-w-md flex-col bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="flex items-center gap-2 font-serif text-xl font-bold">
                <ShoppingBag size={20} className="text-primary" />
                Your Cart
                <span className="text-sm font-medium text-muted-foreground">
                  ({items.reduce((t, i) => t + i.qty, 0)})
                </span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="rounded-full p-2 hover:bg-muted"
              >
                <X size={22} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                  <ShoppingBag size={32} className="text-muted-foreground" />
                </div>
                <p className="font-serif text-lg font-semibold">Your cart is empty</p>
                <p className="text-sm text-muted-foreground">
                  Add some fresh cuts to get started.
                </p>
                <Button onClick={closeCart} variant="primary">
                  Start shopping
                </Button>
              </div>
            ) : (
              <>
                {remaining > 0 && (
                  <div className="bg-secondary px-5 py-3 text-center text-sm font-medium text-secondary-foreground">
                    Add {formatPrice(remaining)} more for{" "}
                    <span className="font-bold">free delivery</span>
                  </div>
                )}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-3"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          loading="lazy"
                          className="h-20 w-20 shrink-0 rounded-xl object-cover"
                        />
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-semibold leading-tight">
                              {item.name}
                            </p>
                            <button
                              onClick={() => removeItem(item.id)}
                              aria-label="Remove item"
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.weight}
                          </p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-2 rounded-full border border-border">
                              <button
                                onClick={() => updateQty(item.id, item.qty - 1)}
                                aria-label="Decrease quantity"
                                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="w-5 text-center text-sm font-semibold">
                                {item.qty}
                              </span>
                              <button
                                onClick={() => updateQty(item.id, item.qty + 1)}
                                aria-label="Increase quantity"
                                className="flex h-7 w-7 items-center justify-center rounded-full hover:bg-muted"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                            <span className="font-bold text-primary">
                              {formatPrice(item.price * item.qty)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="mt-4">
                    <div className="flex gap-2">
                      <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4">
                        <Tag size={16} className="text-muted-foreground" />
                        <input
                          value={code}
                          onChange={(e) => setCode(e.target.value)}
                          placeholder="Coupon code (try FRESH10)"
                          className="h-11 flex-1 bg-transparent text-sm outline-none"
                        />
                      </div>
                      <Button variant="outline" onClick={handleApply}>
                        Apply
                      </Button>
                    </div>
                    {error && (
                      <p className="mt-1 px-2 text-xs text-destructive">{error}</p>
                    )}
                    {coupon && !error && (
                      <p className="mt-1 px-2 text-xs font-medium text-success">
                        Coupon {coupon} applied!
                      </p>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="border-t border-border bg-card px-5 py-4">
                  <div className="flex flex-col gap-1.5 text-sm">
                    <Row label="Subtotal" value={formatPrice(subtotal)} />
                    {discount > 0 && (
                      <Row
                        label={`Discount (${coupon})`}
                        value={"-" + formatPrice(discount)}
                        accent="text-success"
                      />
                    )}
                    <Row label="GST (5%)" value={formatPrice(gst)} />
                    <Row
                      label="Delivery"
                      value={delivery === 0 ? "FREE" : formatPrice(delivery)}
                      accent={delivery === 0 ? "text-success" : ""}
                    />
                    <div className="my-1 border-t border-dashed border-border" />
                    <div className="flex items-center justify-between text-base font-bold">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(total)}</span>
                    </div>
                  </div>
                  <Button variant="primary" size="lg" className="mt-4 w-full">
                    Proceed to Checkout
                  </Button>
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck size={14} className="text-success" />
                    100% secure payments
                  </p>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Row({ label, value, accent = "" }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={accent || "font-medium"}>{value}</span>
    </div>
  )
}
