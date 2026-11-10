import { ProductGridSkeleton } from '@/components/storefront/product-skeleton'

export default function LoadingCollection() {
  return <section className="collection-layout" aria-label="Loading collection"><div className="skeleton-line" style={{ width: 210, height: 36, margin: '32px 0' }} /><ProductGridSkeleton /></section>
}
