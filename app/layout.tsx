import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StoreProvider } from '@/components/storefront/store-provider'
import { StorefrontShell } from '@/components/storefront/storefront-shell'
import { store } from '@/src/config/store'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: { default: `${store.name} — Everyday, well made`, template: `%s | ${store.name}` },
  description: 'Modern everyday clothing for boys and young men. Discover relaxed hoodies, drop shoulder tees, shirts and t-shirts, delivered across Pakistan.',
  applicationName: store.name,
  openGraph: { title: store.name, description: 'Good clothes for growing into yourself.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: store.colors.background, width: 'device-width', initialScale: 1, maximumScale: 5 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-PK" data-scroll-behavior="smooth" style={{ '--store-background': store.colors.background, '--store-text': store.colors.text, '--store-accent': store.colors.accent, '--store-border': store.colors.border, '--store-sale': store.colors.sale } as CSSProperties}><body className="antialiased"><StoreProvider><StorefrontShell>{children}</StorefrontShell></StoreProvider></body></html>
}
