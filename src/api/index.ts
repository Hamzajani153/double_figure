import { mockProducts } from './mock-data'
import type { Cart, CartItem, Customer, Order, Product } from '@/src/types'

const orders = new Map<string, Order>()

export async function getProducts(options?: { category?: string; query?: string; sort?: string }): Promise<Product[]> {
  await Promise.resolve()
  let products = [...mockProducts]
  if (options?.category && !['all', 'new-in', 'sale', 'winter'].includes(options.category)) {
    const wanted = options.category.replaceAll('-', '').replaceAll(' ', '').toLowerCase()
    products = products.filter((product) => product.category.replaceAll('-', '').replaceAll(' ', '').toLowerCase() === wanted)
  }
  if (options?.category === 'sale') products = products.filter((product) => product.compareAtPrice)
  if (options?.category === 'new-in') products = products.filter((product) => product.tags.includes('New'))
  if (options?.category === 'winter') products = products.filter((product) => product.category === 'Hoodies')
  if (options?.query) {
    const query = options.query.toLowerCase()
    products = products.filter((product) => `${product.name} ${product.category} ${product.tags.join(' ')}`.toLowerCase().includes(query))
  }
  if (options?.sort === 'price-low') products.sort((a, b) => a.price - b.price)
  if (options?.sort === 'price-high') products.sort((a, b) => b.price - a.price)
  if (options?.sort === 'newest') products.sort((a, b) => Number(b.tags.includes('New')) - Number(a.tags.includes('New')))
  return products
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  await Promise.resolve()
  return mockProducts.find((product) => product.slug === slug || product.id === slug)
}

export async function getProductById(id: string) {
  return mockProducts.find((product) => product.id === id)
}

export async function getRecommendations(productId: string): Promise<Product[]> {
  const current = await getProductById(productId)
  return mockProducts.filter((product) => product.id !== productId && product.category === current?.category).slice(0, 4)
}

export async function createOrder(customer: Customer, items: CartItem[], paymentMethod: Order['paymentMethod'], totals: Pick<Order, 'subtotal' | 'discount' | 'shipping' | 'total'>, notes = ''): Promise<Order> {
  await Promise.resolve()
  const order: Order = { id: `DF${Date.now().toString().slice(-8)}`, customer, items, paymentMethod, ...totals, status: 'Placed', createdAt: new Date().toISOString(), ...(notes.trim() ? { notes: notes.trim() } : {}) }
  orders.set(order.id, order)
  return order
}

export async function trackOrder(orderId: string, phone: string): Promise<Order | undefined> {
  await Promise.resolve()
  const order = orders.get(orderId)
  return order?.customer.phone === phone ? order : undefined
}

export async function getOrderSummary(cart: Cart): Promise<{ products: (Product | undefined)[]; count: number }> {
  const products = await Promise.all(cart.items.map((item) => getProductById(item.productId)))
  return { products, count: cart.items.reduce((sum, item) => sum + item.quantity, 0) }
}
