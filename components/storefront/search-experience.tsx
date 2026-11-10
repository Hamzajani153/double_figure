'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import type { Product } from '@/src/types'
import { ProductCard } from './product-card'
import { track } from '@/src/lib/track'

export function SearchExperience({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const results = useMemo(() => products.filter((product) => `${product.name} ${product.category} ${product.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase().trim())), [products, query])
  const suggestions = query ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 4) : []
  function search(value = query) { setQuery(value); setSubmitted(true); track('search', { query: value, results: results.length }) }
  return <section className="search-page"><nav className="breadcrumb"><a href="/">Home</a><span>/</span><span>Search</span></nav><p className="eyebrow">LOOKING FOR SOMETHING?</p><h1 className="page-title">Search the shop.</h1><form onSubmit={(event) => { event.preventDefault(); search() }}><div className="search-input-wrap"><Search size={19} /><label className="sr-only" htmlFor="site-search">Search products</label><input id="site-search" autoFocus value={query} onChange={(event) => { setQuery(event.target.value); setSubmitted(true) }} placeholder="Try hoodies, tees, shirts…" /><button className="button button-dark" type="submit">Search</button></div>{suggestions.length > 0 && <div className="search-suggestions"><p>Suggestions</p>{suggestions.map((product) => <button key={product.id} type="button" onClick={() => search(product.name)}>{product.name}</button>)}</div>}</form>{submitted && <><div className="search-results-heading"><h2>{results.length ? `${results.length} pieces to explore` : 'Nothing came up.'}</h2></div>{results.length ? <div className="product-grid">{results.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><p>Try another search, or start with these popular categories.</p><div className="search-suggestions"><button onClick={() => search('hoodie')}>Hoodies</button><button onClick={() => search('tee')}>T-shirts</button><button onClick={() => search('shirt')}>Shirts</button></div></div>}</>}</section>
}
