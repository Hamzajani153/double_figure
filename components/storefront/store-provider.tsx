'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { Order, Product } from '@/src/types'
import type { ReactNode } from 'react'
import { track } from '@/src/lib/track'

export interface StoreCartLine {
  product: Product
  variantId: string
  quantity: number
}

interface StoreContextValue {
  cart: StoreCartLine[]
  wishlist: Product[]
  couponCode: string
  setCouponCode: (code: string) => void
  lastOrder: Order | null
  lastOrderItems: StoreCartLine[]
  setLastOrder: (order: Order) => void
  cartOpen: boolean
  toastMessage: string
  addToCart: (product: Product, variantId: string, quantity?: number) => void
  changeQuantity: (variantId: string, delta: number) => void
  removeFromCart: (variantId: string) => void
  toggleWishlist: (product: Product) => void
  openCart: (open?: boolean) => void
  clearCart: () => void
}

const StoreContext = createContext<StoreContextValue | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<StoreCartLine[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [lastOrder, setLastOrderState] = useState<Order | null>(null)
  const [lastOrderItems, setLastOrderItems] = useState<StoreCartLine[]>([])
  const [toastMessage, setToastMessage] = useState('')

  function notify(message: string) {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(''), 2800)
  }

  function addToCart(product: Product, variantId: string, quantity = 1) {
    const variant = product.variants.find((entry) => entry.id === variantId)
    if (!variant?.available) {
      notify('This size is currently sold out.')
      return
    }
    setCart((current) => {
      const match = current.find((line) => line.variantId === variantId)
      if (match) return current.map((line) => line.variantId === variantId ? { ...line, quantity: Math.min(line.quantity + quantity, variant.stock) } : line)
      return [...current, { product, variantId, quantity: Math.min(quantity, variant.stock) }]
    })
    track('add_to_cart', { product_id: product.id, variant_id: variantId, quantity })
    notify(`${product.name} added to bag`)
  }

  function changeQuantity(variantId: string, delta: number) {
    setCart((current) => current.map((line) => {
      if (line.variantId !== variantId) return line
      const stock = line.product.variants.find((variant) => variant.id === variantId)?.stock ?? 99
      return { ...line, quantity: Math.max(1, Math.min(stock, line.quantity + delta)) }
    }))
  }

  function removeFromCart(variantId: string) {
    setCart((current) => current.filter((line) => line.variantId !== variantId))
  }

  function toggleWishlist(product: Product) {
    const isSaved = wishlist.some((item) => item.id === product.id)
    setWishlist((current) => isSaved ? current.filter((item) => item.id !== product.id) : [...current, product])
    notify(isSaved ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  const value = useMemo(() => ({ cart, wishlist, couponCode, setCouponCode, lastOrder, lastOrderItems, setLastOrder: (order: Order) => { setLastOrderState(order); setLastOrderItems(cart) }, cartOpen, toastMessage, addToCart, changeQuantity, removeFromCart, toggleWishlist, openCart: (open = true) => setCartOpen(open), clearCart: () => { setCart([]); setCouponCode('') } }), [cart, wishlist, couponCode, lastOrder, lastOrderItems, cartOpen, toastMessage])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used inside StoreProvider')
  return value
}
