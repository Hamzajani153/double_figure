'use client'

import Link from 'next/link'
import { Check, PackageCheck } from 'lucide-react'
import { useStore } from './store-provider'
import { formatPrice } from '@/src/lib/store-utils'

export function OrderConfirmation({ orderNumber }: { orderNumber: string }) {
  const { lastOrder, lastOrderItems } = useStore()
  const order = lastOrder?.id === orderNumber ? lastOrder : null
  const lines = order ? lastOrderItems : []
  return <section className="success-page"><nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Order confirmed</span></nav><div className="success-mark"><Check /></div><p className="eyebrow">THANK YOU FOR YOUR ORDER</p><h1 className="page-title">That&apos;s a good fit.</h1><p className="static-page lead">Your order is in. We&apos;ll send you a confirmation and delivery updates as it makes its way to you.</p><div className="order-number"><strong>Order number</strong><br />{orderNumber || 'DF—'}{order && <><div className="summary-line" style={{ marginTop: 14 }}><span>Delivery to</span><strong>{order.customer.name}</strong></div><div className="summary-line"><span>Payment</span><strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : order.paymentMethod}</strong></div><div className="summary-line summary-total"><span>Total paid</span><strong>{formatPrice(order.total)}</strong></div></>}</div>{lines.length > 0 && <div className="next-steps"><h2>In your order</h2>{lines.map((line) => <p key={line.variantId}>{line.product.name} · {line.quantity} × {formatPrice(line.product.price)}</p>)}</div>}<div className="next-steps"><PackageCheck size={22} color="#1F3D2B" /><h2>What happens next?</h2><p>Our team will confirm your order, carefully pack your pieces and share tracking details as soon as they&apos;re on the way.</p></div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 24 }}><Link className="button button-dark" href="/track-order">Track your order</Link><Link className="button" href="/collections/all">Keep exploring</Link></div></section>
}
