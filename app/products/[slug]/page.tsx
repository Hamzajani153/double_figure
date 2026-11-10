import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProduct, getRecommendations } from '@/src/api'
import { ProductDetails } from '@/components/storefront/product-details'
import { store } from '@/src/config/store'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProduct(slug)
  return product ? { title: product.name, description: product.description, openGraph: { title: product.name, description: product.description, images: [product.images[0]] } } : { title: 'Product not found' }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProduct(slug)
  if (!product) notFound()
  const recommendations = await getRecommendations(product.id)
  const jsonLd = { '@context': 'https://schema.org', '@type': 'Product', name: product.name, description: product.description, image: product.images, brand: { '@type': 'Brand', name: store.name }, offers: { '@type': 'Offer', priceCurrency: store.currency, price: product.price, availability: product.variants.some((variant) => variant.available) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock' } }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /><ProductDetails product={product} recommendations={recommendations} /></>
}
