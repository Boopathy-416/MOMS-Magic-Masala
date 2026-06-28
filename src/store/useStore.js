import { create } from "zustand"
import { persist } from "zustand/middleware"

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      coupon: null,
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      addItem: (product) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === product.id)
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === product.id ? { ...i, qty: i.qty + 1 } : i
              ),
              isOpen: true,
            }
          }
          return { items: [...s.items, { ...product, qty: 1 }], isOpen: true }
        }),
      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      updateQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, qty: Math.max(0, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      applyCoupon: (code) => set({ coupon: code }),
      clearCart: () => set({ items: [], coupon: null }),
      subtotal: () => get().items.reduce((t, i) => t + i.price * i.qty, 0),
      count: () => get().items.reduce((t, i) => t + i.qty, 0),
    }),
    { name: "mom-magic-cart" }
  )
)

export const useWishlist = create(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id)
            ? s.ids.filter((x) => x !== id)
            : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
    }),
    { name: "mom-magic-wishlist" }
  )
)
