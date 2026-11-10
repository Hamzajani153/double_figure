'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { formatPrice } from '@/src/lib/store-utils'
import { store } from '@/src/config/store'
import { useStore } from './store-provider'

export function CartDrawer() {
  const { cart, cartOpen, openCart, changeQuantity, removeFromCart } = useStore()
  const count = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  useEffect(() => {
    if (!cartOpen) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') openCart(false) }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = '' }
  }, [cartOpen, openCart])
  if (!cartOpen) return null
  const remaining = Math.max(0, store.freeShippingThreshold - subtotal)
  return <div className="drawer-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) openCart(false) }}><section className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title"><div className="drawer-heading"><div><p className="eyebrow">YOUR BAG · {count} {count === 1 ? 'ITEM' : 'ITEMS'}</p><h2 id="cart-title">A good choice.</h2></div><button className="icon-button" onClick={() => openCart(false)} aria-label="Close shopping bag"><X /></button></div>
    {remaining > 0 && <div className="shipping-progress"><p>Add {formatPrice(remaining)} for free delivery</p><div className="progress-track"><span style={{ width: `${Math.min(100, subtotal / store.freeShippingThreshold * 100)}%` }} /></div></div>}
    <div className="drawer-items">{cart.length === 0 ? <div className="empty-state"><p>Your bag is taking a breather.</p><Link className="text-link" href="/collections/all" onClick={() => openCart(false)}>Explore new arrivals <span>→</span></Link></div> : cart.map((line) => <div className="cart-line" key={line.variantId}><Link href={`/products/${line.product.slug}`} onClick={() => openCart(false)}><img src={line.product.images[0]} alt={line.product.name} /></Link><div className="cart-line-info"><Link href={`/products/${line.product.slug}`} onClick={() => openCart(false)}>{line.product.name}</Link><p>{line.product.variants.find((variant) => variant.id === line.variantId)?.color} · {line.product.variants.find((variant) => variant.id === line.variantId)?.size}</p><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => changeQuantity(line.variantId, -1)}><Minus /></button><span>{line.quantity}</span><button aria-label="Increase quantity" onClick={() => changeQuantity(line.variantId, 1)}><Plus /></button></div></div><div className="cart-line-price"><strong>{formatPrice(line.product.price * line.quantity)}</strong><button onClick={() => removeFromCart(line.variantId)} className="remove-link">Remove</button></div></div>)}</div>
    {cart.length > 0 && <div className="drawer-footer"><div className="subtotal-row"><span>Subtotal</span><strong>{formatPrice(subtotal)}</strong></div><p>Shipping and discounts calculated at checkout.</p><Link className="button button-dark button-full" href="/checkout" onClick={() => openCart(false)}>Continue to checkout</Link><Link className="drawer-continue" href="/collections/all" onClick={() => openCart(false)}>Continue shopping</Link></div>}</section></div>
}
