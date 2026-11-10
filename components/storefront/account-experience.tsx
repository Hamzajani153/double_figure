'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useStore } from './store-provider'
import { ProductCard } from './product-card'

const tabs = ['Sign in', 'My orders', 'Addresses', 'Wishlist']

export function AccountExperience({ initialTab }: { initialTab: string }) {
  const [tab, setTab] = useState(initialTab)
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const { wishlist } = useStore()
  return <section className="account-page"><nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>My account</span></nav><p className="eyebrow">YOUR DOUBLE FIGURE</p><h1 className="page-title">A little space for you.</h1><div className="account-tabs" role="tablist" aria-label="Account sections">{tabs.map((item) => <button key={item} role="tab" aria-selected={tab === item} onClick={() => setTab(item)}>{item}</button>)}</div>{tab === 'Sign in' ? <div className="account-panel"><h2 style={{ marginTop: 0, fontSize: 18, fontWeight: 500 }}>Sign in with your mobile</h2><p className="summary-note">We&apos;ll send a one-time code. No password to remember.</p><div className="form-field"><label htmlFor="account-phone">Mobile number</label><div className="phone-input-wrap"><span className="phone-prefix">+92</span><input id="account-phone" type="tel" inputMode="numeric" value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, '').slice(0, 10))} placeholder="3001234567" /></div></div>{otpSent && <div className="form-field" style={{ marginTop: 14 }}><label htmlFor="account-otp">6-digit code</label><input id="account-otp" inputMode="numeric" value={otp} maxLength={6} onChange={(event) => setOtp(event.target.value.replace(/\D/g, '').slice(0, 6))} placeholder="123456" /></div>}<button className="button button-dark button-full" style={{ marginTop: 18 }} onClick={() => { if (!otpSent) setOtpSent(true); else setMessage(otp === '123456' ? 'Signed in for this demo.' : 'For this demo, enter 123456.') }}>{otpSent ? 'Verify code' : 'Send code'}</button>{message && <p role="status" className="summary-note">{message}</p>}</div> : tab === 'Wishlist' ? wishlist.length ? <><p className="collection-results">{wishlist.length} saved {wishlist.length === 1 ? 'piece' : 'pieces'}</p><div className="product-grid">{wishlist.map((product) => <ProductCard key={product.id} product={product} />)}</div></> : <div className="empty-state"><h2>Your wishlist is waiting.</h2><p>Tap the heart on a piece to save it for later.</p><Link className="button" href="/collections/all">Find your fit</Link></div> : tab === 'My orders' ? <div className="account-panel"><h2 style={{ marginTop: 0, fontSize: 16, fontWeight: 500 }}>Recent orders</h2><p>Sign in with the number you used at checkout to see your order history.</p><Link href="/track-order" className="text-link">Track an order →</Link></div> : <div className="account-panel"><h2 style={{ marginTop: 0, fontSize: 16, fontWeight: 500 }}>Saved addresses</h2><p>Sign in to keep your delivery details handy for next time.</p><button className="button" onClick={() => setTab('Sign in')}>Sign in to continue</button></div>}</section>
}
