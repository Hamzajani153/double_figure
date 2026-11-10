import type { CartItem, Product, Variant } from '@/src/types'
import { store } from '@/src/config/store'

export function formatPrice(value: number) {
  return `${store.currencySymbol} ${new Intl.NumberFormat('en-PK').format(value)}`
}

export function getVariant(product: Product, variantId: string): Variant | undefined {
  return product.variants.find((variant) => variant.id === variantId)
}

export function calculateCart(items: CartItem[], products: Product[], couponCode = '') {
  const subtotal = items.reduce((sum, item) => sum + (products.find((product) => product.id === item.productId)?.price ?? 0) * item.quantity, 0)
  const discount = items.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return sum + Math.max(0, (product?.compareAtPrice ?? product?.price ?? 0) - (product?.price ?? 0)) * item.quantity
  }, 0)
  const couponDiscount = couponCode.trim().toUpperCase() === 'FIGURE10' ? Math.round(subtotal * 0.1) : 0
  const shipping = subtotal === 0 || subtotal >= store.freeShippingThreshold ? 0 : store.shippingFee
  return { subtotal, discount: discount + couponDiscount, couponDiscount, shipping, total: subtotal - couponDiscount + shipping }
}

export function getDefaultVariant(product: Product) {
  return product.variants.find((variant) => variant.available) ?? product.variants[0]
}
