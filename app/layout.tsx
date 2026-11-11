import type { Metadata, Viewport } from 'next'
import './globals.css'
import { StoreProvider } from '@/components/storefront/store-provider'
import { StorefrontShell } from '@/components/storefront/storefront-shell'
import { store } from '@/src/config/store'
import type { CSSProperties } from 'react'

export const metadata: Metadata = {
  title: { default: `${store.name} | Winter 2026 Collection`, template: `%s | ${store.name}` },
  description: 'Shop heavyweight hoodies, relaxed tees and everyday layers at Double Figure. Discover the Winter 2026 collection, delivered across Pakistan.',
  applicationName: store.name,
  openGraph: { title: `${store.name} | Winter 2026 Collection`, description: 'Heavyweight hoodies and easy layers, made for the cold.', type: 'website' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: store.colors.background, width: 'device-width', initialScale: 1, maximumScale: 5 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-PK" data-scroll-behavior="smooth" style={{ '--store-background': store.colors.background, '--store-text': store.colors.text, '--store-accent': store.colors.accent, '--store-border': store.colors.border, '--store-sale': store.colors.sale } as CSSProperties}><body className="antialiased"><StoreProvider><StorefrontShell>{children}</StorefrontShell></StoreProvider></body></html>
}
