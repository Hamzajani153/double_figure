export function ProductGridSkeleton() {
  return <div className="product-grid" aria-label="Loading products" aria-busy="true">{Array.from({ length: 8 }, (_, index) => <div className="product-skeleton" key={index}><div className="skeleton-photo" /><div className="skeleton-line" /><div className="skeleton-line skeleton-line-short" /></div>)}</div>
}
