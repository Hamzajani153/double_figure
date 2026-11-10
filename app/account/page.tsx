import type { Metadata } from 'next'
import { AccountExperience } from '@/components/storefront/account-experience'

export const metadata: Metadata = { title: 'My account' }

export default async function AccountPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
  const { tab } = await searchParams
  return <AccountExperience initialTab={tab === 'wishlist' ? 'Wishlist' : 'Sign in'} />
}
