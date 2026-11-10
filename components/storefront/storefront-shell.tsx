'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { navigation, footerGroups, store } from '@/src/config/store'
import { useStore } from './store-provider'
import { CartDrawer } from './cart-drawer'

const messages = store.announcementMessages

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [consent, setConsent] = useState(true)
  const pathname = usePathname()
  const { cart, wishlist, openCart, toastMessage } = useStore()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const desktopNavigation = navigation.filter((item) => ['New In', 'Men', 'Sale'].includes(item.label))
  const menCategories = navigation.filter((item) => !['New In', 'Men', 'Sale'].includes(item.label))

  useEffect(() => {
    const timer = window.setInterval(() => setMessageIndex((current) => (current + 1) % messages.length), 4500)
    return () => window.clearInterval(timer)
  }, [])

  function cycleMessage() {
    setMessageIndex((current) => (current + 1) % messages.length)
  }

  return (
    <>
      <div className="announcement-bar">
        <button type="button" aria-label="Show next store announcement" onClick={cycleMessage}>{messages[messageIndex]}</button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={cycleMessage}>Shop the latest <ArrowRight size={12} aria-hidden="true" /></button>
      </div>
      <header className="site-header">
        <div className="header-main">
          <button className="icon-button mobile-menu-button" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
          <Link className="brand-mark" href="/" aria-label={`${store.name} home`}><span className="brand-symbol" aria-hidden="true"><img className="brand-logo" src={store.logoSrc} alt="" /></span><span className="brand-name" aria-hidden="true"><span>DOUBLE</span><span>FIGURE</span></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {desktopNavigation.map((item) => <div className="nav-item" key={item.label}><Link href={item.href} aria-haspopup={item.label === 'Men' ? 'true' : undefined} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>{item.label === 'Men' && <div className="mega-menu"><div><p className="eyebrow">SHOP MEN</p>{menCategories.slice(0, 4).map((category) => <Link key={category.label} href={category.href}>{category.label}</Link>)}</div><div><p className="eyebrow">MORE TO EXPLORE</p>{menCategories.slice(4).map((category) => <Link key={category.label} href={category.href}>{category.label}</Link>)}<Link href="/collections/new-in">New arrivals</Link><Link href="/collections/all">Shop everything</Link></div><Link className="mega-feature" href="/collections/new-in"><img src="/images/df-campaign.png" alt="" /><span>Made for the in-between <b>Explore new in →</b></span></Link></div>}</div>)}
          </nav>
          <div className="header-actions">
            <Link href="/search" aria-label="Search products" className="icon-button"><Search /></Link>
            <Link href="/account" aria-label="Your account" className="icon-button desktop-only"><UserRound /></Link>
            <Link href="/account?tab=wishlist" aria-label={`Wishlist, ${wishlist.length} saved items`} className="icon-button desktop-only icon-counter"><Heart />{wishlist.length > 0 && <span>{wishlist.length}</span>}</Link>
            <button type="button" aria-label={`Shopping bag, ${cartCount} items`} className="icon-button icon-counter" onClick={() => openCart(true)}><ShoppingBag />{cartCount > 0 && <span>{cartCount}</span>}</button>
          </div>
        </div>
        {mobileMenu && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map((item) => <Link key={item.label} href={item.href} onClick={() => setMobileMenu(false)}>{item.label}<ArrowRight size={15} /></Link>)}<Link href="/account" onClick={() => setMobileMenu(false)}>My account<ArrowRight size={15} /></Link></nav>}
      </header>
      <main>{children}</main>
      <section className="newsletter-band" aria-labelledby="newsletter-heading">
        <div><p className="eyebrow">A NOTE FROM US</p><h2 id="newsletter-heading">Good things, occasionally.</h2><p>New drops, early access and a little something for your next order.</p></div>
        <NewsletterForm />
      </section>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand"><Link className="brand-mark footer-logo" href="/" aria-label={`${store.name} home`}><span className="brand-symbol" aria-hidden="true"><img className="brand-logo" src={store.logoSrc} alt="" /></span><span className="brand-name" aria-hidden="true"><span>DOUBLE</span><span>FIGURE</span></span></Link><p>{store.tagline}</p><div className="social-links"><a href="https://instagram.com" aria-label="Instagram">Instagram</a><a href={`https://wa.me/${store.whatsappNumber}`} aria-label="WhatsApp">WhatsApp</a></div></div>
          {footerGroups.map((group) => <div className="footer-group" key={group.title}><h3>{group.title}</h3>{group.links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</div>)}
          <div className="footer-group"><h3>We are here</h3><a href="mailto:hello@doublefigure.pk">hello@doublefigure.pk</a><p>Monday — Saturday<br />10am — 6pm PKT</p></div>
        </div>
        <div className="footer-bottom"><span>© 2026 {store.name}. Made in Pakistan.</span><span>{store.currency} · Pakistan</span></div>
      </footer>
      <a className="whatsapp-float" href={`https://wa.me/${store.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with Double Figure on WhatsApp"><span>WhatsApp</span><span className="whatsapp-glyph" aria-hidden="true">W</span></a>
      {consent && <aside className="consent-banner" aria-label="Cookie preferences"><p>We use essential cookies to keep your bag and preferences. <Link href="/privacy-policy">Learn more</Link></p><div><button onClick={() => setConsent(false)}>Decline</button><button className="consent-accept" onClick={() => setConsent(false)}>Accept</button></div></aside>}
      {toastMessage && <div role="status" className="toast-message">{toastMessage}</div>}
      <CartDrawer />
    </>
  )
}

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)
  return submitted ? <p className="newsletter-success" role="status">You&apos;re on the list. Talk soon.</p> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe to newsletter"><ArrowRight /></button></form>
}
