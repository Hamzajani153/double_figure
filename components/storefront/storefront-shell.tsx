'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowRight, Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react'
import { navigation, footerGroups, store } from '@/src/config/store'
import { useStore } from './store-provider'
import { CartDrawer } from './cart-drawer'

export function StorefrontShell({ children }: { children: React.ReactNode }) {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [consent, setConsent] = useState(true)
  const pathname = usePathname()
  const { cart, wishlist, openCart, toastMessage } = useStore()
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const desktopNavigation = navigation.filter((item) => item.label !== 'Men')
  const categoryLinks = navigation.filter((item) => ['Hoodies', 'Drop Shoulder', 'Shirts', 'T-Shirts'].includes(item.label))
  const featuredLinks = [
    { label: 'New In', href: '/collections/new-in' },
    { label: 'Winter Edit', href: '/collections/winter' },
    { label: 'Sale', href: '/collections/sale' },
    { label: 'Shop All', href: '/collections/all' },
  ]
  const helpLinks = [
    { label: 'Track your order', href: '/track-order' },
    { label: 'FAQs', href: '/faq' },
    { label: 'Returns and exchange', href: '/returns' },
    { label: 'Size guide', href: '/size-guide' },
  ]

  return (
    <>
      <header className="site-header">
        <div className="header-main">
          <button className="icon-button mobile-menu-button" aria-label={mobileMenu ? 'Close menu' : 'Open menu'} onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X /> : <Menu />}</button>
          <Link className="brand-mark" href="/" aria-label={`${store.name} home`}><span className="brand-symbol" aria-hidden="true"><img className="brand-logo" src={store.logoSrc} alt="" /></span><span className="brand-name" aria-hidden="true"><span>DOUBLE</span><span>FIGURE</span></span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {desktopNavigation.map((item) => <div className={`nav-item${item.label === 'New In' ? ' nav-item-new-in' : ''}`} key={item.label}>
              <Link href={item.href} aria-haspopup={item.label === 'New In' ? 'true' : undefined} aria-controls={item.label === 'New In' ? 'new-in-menu' : undefined} className={pathname === item.href ? 'active' : ''}>{item.label}</Link>
              {item.label === 'New In' && <div className="mega-menu" id="new-in-menu" aria-label="New In navigation">
                <div><p className="eyebrow">Shop by category</p>{categoryLinks.map((category) => <Link key={category.label} href={category.href}>{category.label}</Link>)}</div>
                <div><p className="eyebrow">Featured</p>{featuredLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</div>
                <div><p className="eyebrow">Help</p>{helpLinks.map((link) => <Link key={link.label} href={link.href}>{link.label}</Link>)}</div>
                <Link className="mega-feature" href="/collections/new-in"><img src="/images/df-campaign.png" alt="Two friends wearing relaxed neutral layers on a Lahore street" /><span>The new drop</span></Link>
              </div>}
            </div>)}
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
      <AnnouncementBar />
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
      <a className="whatsapp-float" href={`https://wa.me/${store.whatsappNumber}`} target="_blank" rel="noreferrer" aria-label="Chat with Double Figure on WhatsApp"><span>WhatsApp</span><span className="whatsapp-icon" aria-hidden="true"><img className="whatsapp-logo" src="/images/whatsapp.svg" alt="" width={24} height={24} /></span></a>
      {consent && <aside className="consent-banner" aria-label="Cookie preferences"><p>We use essential cookies to keep your bag and preferences. <Link href="/privacy-policy">Learn more</Link></p><div><button onClick={() => setConsent(false)}>Decline</button><button className="consent-accept" onClick={() => setConsent(false)}>Accept</button></div></aside>}
      {toastMessage && <div role="status" className="toast-message">{toastMessage}</div>}
      <CartDrawer />
    </>
  )
}

function AnnouncementBar() {
  const target = new Date(store.saleEndsAt).getTime()
  const [remaining, setRemaining] = useState(() => Math.max(0, target - Date.now()))

  useEffect(() => {
    const update = () => setRemaining(Math.max(0, target - Date.now()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [target])

  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)

  return <div className="announcement-bar" role="region" aria-label="Winter sale"><span className="announcement-offer">Winter Sale: Up to 30% off</span><span className="announcement-countdown" aria-live="off" suppressHydrationWarning>Ends in {days}d {String(hours).padStart(2, '0')}h {String(minutes).padStart(2, '0')}m {String(seconds).padStart(2, '0')}s</span><Link className="announcement-shop-link" href="/collections/sale">Shop the sale</Link></div>
}

function NewsletterForm() {
  const [submitted, setSubmitted] = useState(false)
  return submitted ? <p className="newsletter-success" role="status">You&apos;re on the list. Talk soon.</p> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true) }}><label className="sr-only" htmlFor="newsletter-email">Email address</label><input id="newsletter-email" type="email" placeholder="Your email address" required /><button type="submit" aria-label="Subscribe to newsletter"><ArrowRight /></button></form>
}
