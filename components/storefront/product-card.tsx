'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Product } from '@/src/types'
import Image from 'next/image'
import { formatPrice } from '@/src/lib/store-utils'
import { useStore } from './store-provider'

export function ProductCard({ product }: { product: Product }) {
  const { wishlist, toggleWishlist } = useStore()
  const saved = wishlist.some((item) => item.id === product.id)
  const discount = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0
  return <article className="product-card">
    <div className="product-card-photo"><Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`}><Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 760px) 50vw, 25vw" /></Link>
      <div className="product-card-badges">{discount > 0 && <span className="sale-badge">-{discount}%</span>}{product.tags.includes('New') && <span className="new-badge">New</span>}</div>
      <button className={`wishlist-button ${saved ? 'is-saved' : ''}`} onClick={() => toggleWishlist(product)} aria-label={saved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={saved}><Heart fill={saved ? 'currentColor' : 'none'} /></button>
    </div>
    <div className="product-card-copy"><div><p className="product-category">{product.category}</p><Link href={`/products/${product.slug}`} className="product-name">{product.name}</Link></div><p className="product-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <del>{formatPrice(product.compareAtPrice)}</del>}</p></div>
    <div className="swatch-list" aria-label={`${product.colors.length} colours available`}>{product.colors.slice(0, 4).map((color) => <span key={color.name} style={{ backgroundColor: color.hex }} aria-label={color.name} title={color.name} />)}</div>
  </article>
}
