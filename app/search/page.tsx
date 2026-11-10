import { getProducts } from '@/src/api'
import { SearchExperience } from '@/components/storefront/search-experience'

export const metadata = { title: 'Search' }

export default async function SearchPage() {
  const products = await getProducts()
  return <SearchExperience products={products} />
}
