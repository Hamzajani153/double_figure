'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/src/types'
import { ProductCard } from './product-card'

export function HomeBestSellers({ products }: { products: Product[] }) {
  const [tab, setTab] = useState('Top picks')
  const choices = ['Top picks', 'Trending', 'New']
  const visible = useMemo(() => {
    const filtered = tab === 'Top picks' ? products.filter((product) => product.featured) : tab === 'Trending' ? products.filter((product) => product.tags.includes('Trending') || product.tags.includes('Bestseller')) : products.filter((product) => product.tags.includes('New'))
    return (filtered.length ? filtered : products).slice(0, 4)
  }, [tab, products])
  return <section className="section" aria-labelledby="bestsellers-heading"><div className="section-heading"><div><p className="eyebrow">THE ONES YOU KEEP REACHING FOR</p><h2 id="bestsellers-heading">Best sellers</h2></div><div className="product-tabs" role="tablist" aria-label="Product selection">{choices.map((choice) => <button key={choice} role="tab" aria-selected={tab === choice} onClick={() => setTab(choice)}>{choice}</button>)}</div></div><div className="product-grid">{visible.map((product) => <ProductCard key={product.id} product={product} />)}</div><div className="load-more"><Link className="text-link" href="/collections/all">See everything <ArrowRight size={13} /></Link></div></section>
}
