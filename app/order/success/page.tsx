import { OrderConfirmation } from '@/components/storefront/order-confirmation'

export default async function OrderSuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams
  return <OrderConfirmation orderNumber={order ?? ''} />
}
