'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function SaleEventBanner() {
  const [remaining, setRemaining] = useState(0)
  useEffect(() => {
    const target = Date.now() + 5 * 24 * 60 * 60 * 1000
    const update = () => setRemaining(Math.max(0, target - Date.now()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])
  const days = Math.floor(remaining / 86400000)
  const hours = Math.floor((remaining % 86400000) / 3600000)
  const minutes = Math.floor((remaining % 3600000) / 60000)
  const seconds = Math.floor((remaining % 60000) / 1000)
  return <section className="sale-event-banner"><div><p className="eyebrow">A LITTLE SOMETHING OFF</p><h2>Good things, at a good price.</h2><p>Save up to 30% on selected everyday pieces.</p></div><div className="sale-clock" aria-label={`${days} days ${hours} hours ${minutes} minutes remaining`}><span><strong>{String(days).padStart(2, '0')}</strong>days</span><span><strong>{String(hours).padStart(2, '0')}</strong>hrs</span><span><strong>{String(minutes).padStart(2, '0')}</strong>min</span><span><strong>{String(seconds).padStart(2, '0')}</strong>sec</span></div><Link className="button button-light" href="/collections/sale">Shop the sale</Link></section>
}
