import { ProductGridSkeleton } from '@/components/storefront/product-skeleton'

export default function LoadingProduct() {
  return <section className="product-detail" aria-label="Loading product"><div className="product-skeleton product-skeleton-detail"><div className="skeleton-photo" /><div><div className="skeleton-line" /><div className="skeleton-line skeleton-line-short" /></div></div><ProductGridSkeleton /></section>
}
