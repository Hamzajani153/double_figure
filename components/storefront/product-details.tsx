'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MessageCircle, Minus, Plus } from 'lucide-react'
import type { Product } from '@/src/types'
import { cities, store } from '@/src/config/store'
import { formatPrice } from '@/src/lib/store-utils'
import { track } from '@/src/lib/track'
import { useStore } from './store-provider'
import { ProductCard } from './product-card'

export function ProductDetails({ product, recommendations }: { product: Product; recommendations: Product[] }) {
  const [colorName, setColorName] = useState(product.colors[0].name)
  const [size, setSize] = useState(product.variants.find((variant) => variant.color === product.colors[0].name && variant.available)?.size ?? product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [imageIndex, setImageIndex] = useState(0)
  const [city, setCity] = useState('Karachi')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [stockNotification, setStockNotification] = useState('')
  const sizeGuide = useRef<HTMLDialogElement>(null)
  const { addToCart, openCart } = useStore()
  const router = useRouter()
  const activeVariant = useMemo(() => product.variants.find((variant) => variant.color === colorName && variant.size === size), [product.variants, colorName, size])
  const lowStock = activeVariant?.available && activeVariant.stock <= 5 ? activeVariant.stock : 0
  const discount = product.compareAtPrice ? Math.round((1 - product.price / product.compareAtPrice) * 100) : 0

  useEffect(() => { track('product_view', { product_id: product.id, product_name: product.name }) }, [product.id, product.name])
  useEffect(() => { if (sizeGuideOpen) sizeGuide.current?.showModal(); else sizeGuide.current?.close() }, [sizeGuideOpen])

  function add(buyNow = false) {
    if (!activeVariant?.available) return
    addToCart(product, activeVariant.id, quantity)
    if (buyNow) router.push('/checkout')
    else openCart(true)
  }
  function notifyStock() { setStockNotification(`We’ll let you know when size ${size} is back.`) }

  return <>
    <section className="product-detail"><nav className="breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href={`/collections/${product.category.toLowerCase().replaceAll(' ', '-')}`}>{product.category}</Link><span>/</span><span>{product.name}</span></nav>
      <div className="product-detail-grid"><div className="product-gallery"><div className="gallery-thumbnails" aria-label="Product images">{product.images.map((image, index) => <button className="gallery-thumb" key={image + index} aria-label={`View product photo ${index + 1}`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)}><Image src={image} alt="" fill loading="lazy" sizes="70px" unoptimized={false} /></button>)}</div><div className="product-gallery-main"><Image src={product.images[imageIndex]} alt={`${product.name}, ${colorName} colour`} fill priority={imageIndex === 0} sizes="(max-width: 760px) 100vw, 60vw" unoptimized={false} />{discount > 0 && <span className="sale-badge" style={{ position: 'absolute', top: 14, left: 14 }}>-{discount}%</span>}</div></div>
        <div className="product-info"><h1>{product.name}</h1><div className="rating-line"><span className="star-rating" aria-label="4.5 out of 5 stars">★★★★★</span><a href="#reviews">4.5 · {product.reviews.length} reviews</a></div><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.compareAtPrice && <><del>{formatPrice(product.compareAtPrice)}</del><span className="saving-badge">Save {discount}%</span></>}</div><p className="detail-description">{product.description}</p>
          <div className="option-header"><strong>Colour</strong><span>{colorName}</span></div><div className="color-options" aria-label="Choose colour">{product.colors.map((color) => <button className="color-option" key={color.name} aria-label={color.name} aria-pressed={colorName === color.name} onClick={() => setColorName(color.name)}><span style={{ backgroundColor: color.hex }} /></button>)}</div>
          <div className="option-header"><strong>Size</strong><button onClick={() => setSizeGuideOpen(true)}>Size guide</button></div><div className="size-options" aria-label="Choose size">{product.sizes.map((sizeOption) => { const variant = product.variants.find((item) => item.color === colorName && item.size === sizeOption); return <button className="size-option" key={sizeOption} aria-pressed={size === sizeOption} disabled={!variant?.available} onClick={() => setSize(sizeOption)}>{sizeOption}</button> })}</div>{lowStock > 0 && <p className="stock-low">Only {lowStock} left in this size</p>}
          <div className="quantity-row"><span>Quantity</span><div className="quantity-control"><button aria-label="Decrease quantity" onClick={() => setQuantity((value) => Math.max(1, value - 1))}><Minus /></button><span>{quantity}</span><button aria-label="Increase quantity" onClick={() => setQuantity((value) => Math.min(activeVariant?.stock ?? 10, value + 1))}><Plus /></button></div></div>
          {activeVariant?.available ? <div className="product-actions"><button className="button button-dark" onClick={() => add(false)}>Add to bag · {formatPrice(product.price * quantity)}</button><button className="button" onClick={() => add(true)}>Buy now</button></div> : <div className="product-actions"><button className="button button-dark" disabled>Sold out</button><button className="notify-button" onClick={notifyStock}>Notify me when this size is back</button>{stockNotification && <p role="status" className="summary-note">{stockNotification}</p>}</div>}
          <div className="delivery-box"><h3>Delivery estimate</h3><label className="sr-only" htmlFor="delivery-city">Select your city</label><select id="delivery-city" value={city} onChange={(event) => setCity(event.target.value)}>{cities.map((entry) => <option key={entry}>{entry}</option>)}</select><p>Estimated delivery to {city}: 2–5 working days.</p></div>
          <details className="detail-accordion"><summary>Fabric & care <span>+</span></summary><div>Soft, breathable cotton selected for daily wear. Wash inside out with similar colours at 30°C. Do not bleach; line dry in shade.</div></details><details className="detail-accordion"><summary>Returns & exchange <span>+</span></summary><div>Need another size? Request an exchange within 7 days of delivery. Items must be unworn, with original tags attached. <Link className="text-link" href="/returns">Read our exchange policy</Link></div></details><a className="share-link" href={`https://wa.me/${store.whatsappNumber}?text=${encodeURIComponent(`Take a look at ${product.name}`)}`} target="_blank" rel="noreferrer"><MessageCircle size={15} /> Share on WhatsApp</a>
        </div>
      </div>
      <section className="product-row" id="reviews"><div className="section-heading"><div><p className="eyebrow">A FEW GOOD WORDS</p><h2>Reviews</h2></div><span className="star-rating">★★★★★ 4.5</span></div><div className="reviews-layout"><div><div className="reviews-score">4.5</div><p className="star-rating">★★★★★</p><p className="collection-results">Based on {product.reviews.length} reviews</p></div><div>{product.reviews.map((review) => <article className="review-card" key={review.id}><span className="star-rating">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</span><h3>{review.title}</h3><p>{review.body}</p><p>{review.author} · {review.date}</p></article>)}</div></div></section>
      <section className="product-row"><div className="section-heading"><div><p className="eyebrow">GOES WELL WITH</p><h2>Complete the look</h2></div></div><div className="product-grid">{recommendations.slice(0, 4).map((item) => <ProductCard key={item.id} product={item} />)}</div></section>
      <section className="product-row"><div className="section-heading"><div><p className="eyebrow">A SECOND LOOK</p><h2>You might also like</h2></div></div><div className="product-grid">{recommendations.slice(0, 4).map((item) => <ProductCard key={`recent-${item.id}`} product={item} />)}</div></section>
    </section>
    <div className="sticky-add-bar"><span className="sticky-price">{formatPrice(product.price)}</span><button className="button button-dark" onClick={() => add(false)} disabled={!activeVariant?.available}>Add to bag</button></div>
    <dialog ref={sizeGuide} className="size-guide-dialog" aria-labelledby="size-guide-title" onClose={() => setSizeGuideOpen(false)}><div className="dialog-head"><div><p className="eyebrow">FIND YOUR FIT</p><h2 id="size-guide-title">Size guide</h2></div><button className="icon-button" aria-label="Close size guide" onClick={() => setSizeGuideOpen(false)}>×</button></div><p style={{ margin: '16px 20px 0', color: '#666', fontSize: 11 }}>All measurements are garment measurements in inches.</p><table><thead><tr><th>Size</th><th>Chest</th><th>Length</th><th>Shoulder</th></tr></thead><tbody>{['S','M','L','XL'].map((entry, index) => <tr key={entry}><td>{entry}</td><td>{[38,40,42,44][index]}</td><td>{[26,27,28,29][index]}</td><td>{[17,18,19,20][index]}</td></tr>)}</tbody></table></dialog>
  </>
}
