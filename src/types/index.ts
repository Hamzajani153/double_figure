export type Size = string

export interface Variant {
  id: string
  sku: string
  size: Size
  color: string
  stock: number
  available: boolean
}

export interface Review {
  id: string
  author: string
  rating: number
  title: string
  body: string
  date: string
}

export interface Product {
  id: string
  slug: string
  name: string
  category: 'Hoodies' | 'Drop Shoulder' | 'Shirts' | 'T-Shirts'
  description: string
  price: number
  compareAtPrice?: number
  currency: string
  colors: { name: string; hex: string }[]
  sizes: Size[]
  variants: Variant[]
  images: string[]
  reviews: Review[]
  tags: string[]
  featured?: boolean
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
}

export interface Cart {
  items: CartItem[]
  couponCode?: string
}

export interface Customer {
  id?: string
  name: string
  phone: string
  email?: string
  addresses?: Address[]
}

export interface Address {
  id: string
  city: string
  area: string
  address: string
}

export type OrderStatus = 'Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered'

export interface Order {
  id: string
  customer: Customer
  items: CartItem[]
  paymentMethod: 'cod' | 'card' | 'jazzcash' | 'easypaisa'
  subtotal: number
  discount: number
  shipping: number
  total: number
  status: OrderStatus
  createdAt: string
}

export interface Promotion {
  id: string
  label: string
  discountPercent: number
  startsAt: string
  endsAt: string
}

export interface Coupon {
  code: string
  discountPercent: number
  description: string
}
