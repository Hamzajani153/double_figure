'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { trackOrder } from '@/src/api'
import type { Order } from '@/src/types'

const statuses: Order['status'][] = ['Placed', 'Confirmed', 'Packed', 'Shipped', 'Delivered']

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [phone, setPhone] = useState('')
  const [order, setOrder] = useState<Order | undefined>()
  const [submitted, setSubmitted] = useState(false)
  const [busy, setBusy] = useState(false)
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    const found = await trackOrder(orderNumber.trim(), `+92${phone.replace(/\s/g, '')}`)
    setOrder(found)
    setSubmitted(true)
    setBusy(false)
  }
  const current = order ? statuses.indexOf(order.status) : -1
  return <section className="track-page"><nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Track order</span></nav><p className="eyebrow">A LITTLE UPDATE</p><h1 className="page-title">Where&apos;s my order?</h1><p className="static-page lead">Enter your order number and the mobile number used at checkout.</p><form className="track-form" onSubmit={submit}><div className="form-grid"><div className="form-field"><label htmlFor="tracking-number">Order number</label><input id="tracking-number" value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} placeholder="DF12345678" required /></div><div className="form-field"><label htmlFor="tracking-phone">Mobile number</label><div className="phone-input-wrap"><span className="phone-prefix">+92</span><input id="tracking-phone" type="tel" inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="3001234567" required /></div></div><div className="form-field full"><button className="button button-dark" disabled={busy}>{busy ? 'Looking it up…' : 'Track order'}</button></div></div></form>{submitted && !order && <div className="next-steps" role="status"><h2>We couldn&apos;t find that order.</h2><p>Double-check the order number and mobile number, or <Link href="/contact"><u>get in touch</u></Link> and we&apos;ll help.</p></div>}{order && <section className="timeline" aria-label="Order status timeline"><p className="eyebrow">ORDER {order.id}</p>{statuses.map((status, index) => <div className={`timeline-step ${index <= current ? 'is-complete' : ''}`} key={status}><div className="timeline-dot">{index <= current ? <Check size={13} /> : index + 1}</div><div><h3>{status}</h3><p>{index < current ? 'Complete' : index === current ? 'In progress' : 'Coming up'}</p></div></div>)}</section>}</section>
}
