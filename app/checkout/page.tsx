'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cities, store } from '@/src/config/store'
import { useStore } from '@/components/storefront/store-provider'
import { calculateCart, formatPrice } from '@/src/lib/store-utils'
import { createOrder } from '@/src/api'
import { track } from '@/src/lib/track'
import { CardBrandBadges, CheckoutPaymentDetails } from '@/components/storefront/checkout-payment-details'
import type { PaymentMethod } from '@/src/types'

const payments: { id: PaymentMethod; name: string }[] = [
  { id: 'card', name: 'Credit card' },
  { id: 'cod', name: 'Cash on Delivery (COD)' },
  { id: 'bank_transfer', name: 'Direct Bank Transfer' },
]

type ShippingMethod = 'standard' | 'express'

const shippingOptions: { id: ShippingMethod; name: string; description: string; price: number }[] = [
  { id: 'standard', name: 'Standard Delivery', description: 'Delivery within 2–5 business days', price: 300 },
  { id: 'express', name: 'Express Delivery', description: 'Delivery within 1–2 business days.', price: 500 },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart, couponCode, setLastOrder } = useStore()
  const [phone, setPhone] = useState('')
  const [phoneConfirmed, setPhoneConfirmed] = useState(false)
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [city, setCity] = useState('Karachi')
  const [area, setArea] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [orderNotes, setOrderNotes] = useState('')
  const [codAgreed, setCodAgreed] = useState(false)
  const [payment, setPayment] = useState<PaymentMethod>('card')
  const [shippingMethod, setShippingMethod] = useState<ShippingMethod>('standard')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [otpSent, setOtpSent] = useState(false)
  const [resendIn, setResendIn] = useState(30)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const trackedCheckout = useRef(false)
  useEffect(() => {
    if (cart.length > 0 && !trackedCheckout.current) {
      track('begin_checkout', { item_count: cart.length, total: cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0) })
      trackedCheckout.current = true
    }
  }, [cart])
  useEffect(() => {
    if (!otpSent || resendIn <= 0) return
    const timer = window.setTimeout(() => setResendIn((remaining) => remaining - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [otpSent, resendIn])
  const items = useMemo(() => cart.map((line) => ({ productId: line.product.id, variantId: line.variantId, quantity: line.quantity })), [cart])
  const cartTotals = calculateCart(items, cart.map((line) => line.product), couponCode)
  const shipping = shippingMethod === 'standard' ? 300 : 500
  const totals = { ...cartTotals, shipping, total: cartTotals.total - cartTotals.shipping + shipping }

  function validate() {
    const next: Record<string, string> = {}
    if (!/^3\d{9}$/.test(phone.replace(/\s/g, ''))) next.phone = 'Enter a valid Pakistani mobile number, e.g. 3001234567.'
    if (!name.trim()) next.name = 'Please enter your full name.'
    if (!city) next.city = 'Please select a city.'
    if (!area.trim()) next.area = 'Please enter your area.'
    if (address.trim().length < 8) next.address = 'Please enter a complete delivery address.'
    if (email && !/^\S+@\S+\.\S+$/.test(email)) next.email = 'Enter a valid email address.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function placeOrder() {
    if (submitting || cart.length === 0 || !validate()) return
    if (payment === 'cod' && !codAgreed) {
      setErrors((current) => ({ ...current, codAgreement: 'Please confirm the COD delivery agreement.' }))
      return
    }
    if (payment === 'cod' && !phoneConfirmed) {
      if (!otpSent) { setOtpSent(true); setResendIn(30); return }
      if (!/^\d{6}$/.test(otp)) { setErrors((current) => ({ ...current, otp: 'Enter the 6-digit code sent to your phone.' })); return }
      if (otp !== '123456') { setErrors((current) => ({ ...current, otp: 'That code does not match. Try 123456 for this demo.' })); return }
      setPhoneConfirmed(true)
      return
    }
    setSubmitting(true)
    try {
      const order = await createOrder({ name, phone: `+92${phone}`, email }, items, payment, totals, orderNotes)
      track('purchase', { order_id: order.id, total: order.total, currency: store.currency })
      setLastOrder(order)
      clearCart()
      router.push(`/order/success?order=${order.id}`)
    } finally { setSubmitting(false) }
  }

  if (cart.length === 0) return <section className="checkout-page"><h1 className="page-title">Checkout</h1><div className="empty-state"><h2>Your bag is empty.</h2><Link className="button button-dark" href="/collections/all">Shop the collection</Link></div></section>

  return <section className="checkout-page"><nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/cart">Your bag</Link><span>/</span><span>Checkout</span></nav><h1 className="page-title">Almost yours.</h1><div className="checkout-grid"><div>
    <section className="checkout-section"><h2>1. Your mobile number</h2><p>We&apos;ll use this to confirm your order and keep you updated.</p><div className="form-field"><label htmlFor="phone">Mobile number</label><div className="phone-input-wrap"><span className="phone-prefix">+92</span><input id="phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="300 1234567" value={phone} onChange={(event) => { setPhone(event.target.value.replace(/[^\d\s]/g, '').slice(0, 12)); setErrors((current) => ({ ...current, phone: '' })) }} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} /></div>{errors.phone && <p className="field-error" id="phone-error">{errors.phone}</p>}</div></section>
    <section className="checkout-section"><h2>2. Delivery details</h2><div className="form-grid"><div className="form-field"><label htmlFor="name">Full name</label><input id="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} aria-invalid={Boolean(errors.name)} />{errors.name && <p className="field-error">{errors.name}</p>}</div><div className="form-field"><label htmlFor="city">City</label><input id="city" list="pakistani-cities" value={city} onChange={(event) => setCity(event.target.value)} aria-invalid={Boolean(errors.city)} /><datalist id="pakistani-cities">{cities.map((item) => <option key={item} value={item} />)}</datalist>{errors.city && <p className="field-error">{errors.city}</p>}</div><div className="form-field"><label htmlFor="area">Area / neighbourhood</label><input id="area" autoComplete="address-level3" value={area} onChange={(event) => setArea(event.target.value)} aria-invalid={Boolean(errors.area)} />{errors.area && <p className="field-error">{errors.area}</p>}</div><div className="form-field"><label htmlFor="email">Email <span className="collection-results">(optional)</span></label><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-invalid={Boolean(errors.email)} />{errors.email && <p className="field-error">{errors.email}</p>}</div><div className="form-field full"><label htmlFor="address">Full address</label><textarea id="address" autoComplete="street-address" placeholder="House, street, block and any helpful directions" value={address} onChange={(event) => setAddress(event.target.value)} aria-invalid={Boolean(errors.address)} />{errors.address && <p className="field-error">{errors.address}</p>}</div><div className="form-field full"><label htmlFor="cart-notes">Cart notes <span className="collection-results">(optional)</span></label><textarea id="cart-notes" value={orderNotes} onChange={(event) => setOrderNotes(event.target.value)} placeholder="Add delivery instructions or request the open parcel policy" /></div></div></section>
    <section className="checkout-section"><h2>Shipping method</h2><div className="shipping-options">{shippingOptions.map((option) => <label className="shipping-option" key={option.id}><input type="radio" name="shippingMethod" value={option.id} checked={shippingMethod === option.id} onChange={() => setShippingMethod(option.id)} /><span className="shipping-option-copy"><strong>{option.name}</strong><span>{option.description}</span></span><strong className="shipping-price">Rs {option.price.toFixed(2)}</strong></label>)}</div></section><section className="checkout-section"><h2>Payment</h2><p className="checkout-payment-intro">Your billing address should match your shipping address. Card fields below are a visual preview only.</p><div className="payment-options">{payments.map((option) => <div className={`payment-option-group ${payment === option.id ? 'is-selected' : ''}`} key={option.id}><label className="payment-option-label"><input type="radio" name="payment" value={option.id} checked={payment === option.id} onChange={() => { setPayment(option.id); setOtpSent(false); setPhoneConfirmed(false); setOtp(''); setCodAgreed(false); setErrors((current) => ({ ...current, codAgreement: '', otp: '' })) }} /><span className="payment-option-name">{option.name}</span>{option.id === 'card' && <CardBrandBadges />}</label>{payment === option.id && <CheckoutPaymentDetails payment={payment} codAgreed={codAgreed} onCodAgreementChange={(agreed) => { setCodAgreed(agreed); setErrors((current) => ({ ...current, codAgreement: '' })) }} codAgreementError={errors.codAgreement} />}</div>)}</div></section>
    {payment === 'cod' && otpSent && !phoneConfirmed && <section className="checkout-section otp-box"><h3>Confirm your number</h3><p>Enter the 6-digit code sent to +92 {phone}. Demo code: 123456.</p><label className="sr-only" htmlFor="otp">Six digit verification code</label><input id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={otp} onChange={(event) => { setOtp(event.target.value.replace(/\D/g, '').slice(0, 6)); setErrors((current) => ({ ...current, otp: '' })) }} aria-invalid={Boolean(errors.otp)} />{errors.otp && <p className="field-error">{errors.otp}</p>}<button className="otp-resend" disabled={resendIn > 0} onClick={() => { setResendIn(30); setOtp('') }}>Resend code {resendIn > 0 ? `in ${resendIn}s` : ''}</button></section>}
    <button className="button button-dark place-order" onClick={placeOrder} disabled={submitting || payment === 'card'}>{submitting ? 'Placing your order…' : payment === 'card' ? 'Pay now' : payment === 'cod' && otpSent && !phoneConfirmed ? 'Confirm mobile number' : 'Place order · ' + formatPrice(totals.total)}</button>{payment === 'card' && <p className="summary-note card-payment-status">This visual preview does not accept or process card details.</p>}<p className="summary-note">By placing your order, you agree to our <Link href="/terms"><u>terms of service</u></Link>.</p>
  </div><aside className={`checkout-summary ${summaryOpen ? 'is-expanded' : ''}`}><button className="mobile-summary-toggle" onClick={() => setSummaryOpen(!summaryOpen)}>Order summary <span>{formatPrice(totals.total)} {summaryOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}</span></button><h2>Order summary</h2><div className="checkout-summary-body">{cart.map((line) => <div className="checkout-summary-line" key={line.variantId}><img src={line.product.images[0]} alt={line.product.name} /><div><strong>{line.product.name}</strong><span>Qty {line.quantity} · {line.product.variants.find((variant) => variant.id === line.variantId)?.size}</span></div><strong>{formatPrice(line.product.price * line.quantity)}</strong></div>)}<div className="summary-line"><span>Subtotal</span><strong>{formatPrice(totals.subtotal)}</strong></div><div className="summary-line"><span>Delivery</span><strong>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</strong></div><div className="summary-line summary-total"><span>Total</span><strong>{formatPrice(totals.total)}</strong></div></div></aside></div></section>
}
