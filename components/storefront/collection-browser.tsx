'use client'

import { useMemo, useState } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Product } from '@/src/types'
import { ProductCard } from './product-card'

const sizes = ['S', 'M', 'L', 'XL']
const colors = [{ name: 'Olive', hex: '#56624c' }, { name: 'Stone', hex: '#d4d0c7' }, { name: 'Black', hex: '#252624' }, { name: 'White', hex: '#fff' }]

export function CollectionBrowser({ products }: { products: Product[] }) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [maxPrice, setMaxPrice] = useState(7000)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [sort, setSort] = useState('featured')
  const [visibleCount, setVisibleCount] = useState(8)
  const [filterOpen, setFilterOpen] = useState(false)
  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      const hasSize = selectedSizes.length === 0 || product.sizes.some((size) => selectedSizes.includes(size) && product.variants.some((variant) => variant.size === size && variant.available))
      const hasColor = selectedColors.length === 0 || product.colors.some((color) => selectedColors.includes(color.name))
      const inStock = !inStockOnly || product.variants.some((variant) => variant.available)
      return hasSize && hasColor && product.price <= maxPrice && inStock
    })
    if (sort === 'price-low') list.sort((a, b) => a.price - b.price)
    if (sort === 'price-high') list.sort((a, b) => b.price - a.price)
    if (sort === 'newest') list.sort((a, b) => Number(b.tags.includes('New')) - Number(a.tags.includes('New')))
    return list
  }, [products, selectedSizes, selectedColors, maxPrice, inStockOnly, sort])
  function toggle(list: string[], setter: (next: string[]) => void, item: string) { setter(list.includes(item) ? list.filter((entry) => entry !== item) : [...list, item]) }
  const filters = <aside className="filter-sidebar" aria-label="Filter products"><div className="filter-group"><h3>Size</h3>{sizes.map((size) => <label key={size}><input type="checkbox" checked={selectedSizes.includes(size)} onChange={() => toggle(selectedSizes, setSelectedSizes, size)} />{size}</label>)}</div><div className="filter-group"><h3>Colour</h3><div className="filter-colors">{colors.map((color) => <button key={color.name} className="filter-color" style={{ backgroundColor: color.hex }} aria-label={`${selectedColors.includes(color.name) ? 'Remove' : 'Filter by'} ${color.name}`} aria-pressed={selectedColors.includes(color.name)} onClick={() => toggle(selectedColors, setSelectedColors, color.name)} />)}</div></div><div className="filter-group"><h3>Price up to Rs. {maxPrice.toLocaleString('en-PK')}</h3><input aria-label="Maximum price" type="range" min="1500" max="7000" step="250" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))} /><div className="collection-results">Rs. 1,500 — Rs. 7,000</div></div><div className="filter-group"><h3>Availability</h3><label><input type="checkbox" checked={inStockOnly} onChange={(event) => setInStockOnly(event.target.checked)} />In stock</label></div></aside>
  return <div className="collection-layout"><div className="collection-toolbar"><span className="collection-results">{filtered.length} pieces</span><button className="filter-button" onClick={() => setFilterOpen(true)}><SlidersHorizontal size={14} /> Filters</button><label>Sort <select aria-label="Sort products" value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Featured</option><option value="newest">New arrivals</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></select></label></div><div className="filter-layout"><div className="filter-desktop">{filters}</div><div>{filtered.length ? <div className="product-grid">{filtered.slice(0, visibleCount).map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><h2>No pieces found</h2><p>Try a different size or colour.</p><button className="text-link" onClick={() => { setSelectedSizes([]); setSelectedColors([]); setMaxPrice(7000); setInStockOnly(false) }}>Clear filters</button></div>}{filtered.length > visibleCount && <div className="load-more"><Button variant="outline" className="button" onClick={() => setVisibleCount((count) => count + 4)}>Load more</Button></div>}</div></div>{filterOpen && <div className="drawer-backdrop" onMouseDown={(event) => { if (event.currentTarget === event.target) setFilterOpen(false) }}><section className="mobile-filter-panel" role="dialog" aria-modal="true" aria-labelledby="mobile-filter-title"><div className="mobile-filter-head"><h2 id="mobile-filter-title">Filters</h2><button className="icon-button" aria-label="Close filters" onClick={() => setFilterOpen(false)}><X /></button></div>{filters}<button className="button button-dark button-full mobile-filter-apply" onClick={() => setFilterOpen(false)}>Show {filtered.length} pieces</button></section></div>}</div>
}
