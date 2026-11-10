import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getProducts } from '@/src/api'
import { CollectionBrowser } from '@/components/storefront/collection-browser'

const titles: Record<string, string> = { all: 'Shop all', 'new-in': 'New arrivals', hoodies: 'Hoodies', 'drop-shoulder': 'Drop shoulder', shirts: 'Shirts', 't-shirts': 'T-shirts', winter: 'Winter layers', sale: 'The sale edit' }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return { title: titles[slug] ?? 'Shop' }
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!titles[slug]) notFound()
  const products = await getProducts({ category: slug })
  return <><div className="collection-header"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>{titles[slug]}</span></nav><h1>{titles[slug]}</h1><p>Thoughtful everyday pieces, made to live in.</p></div><CollectionBrowser products={products} /></>
}
