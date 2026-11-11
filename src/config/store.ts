export const store = {
  name: 'Double Figure',
  shortName: 'DF',
  tagline: 'Good clothes for growing into yourself.',
  currency: 'PKR',
  currencySymbol: 'Rs.',
  logoSrc: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Double%20Figure%20Minimalist%20Logo-tsViGKq034EwmjYiuAtO3cQsYMhlkX.png',
  colors: { background: '#FAFAF8', text: '#111111', accent: '#1F3D2B', border: '#e4e4df', sale: '#a33f38' },
  accent: '#1F3D2B',
  whatsappNumber: '923001234567',
  saleEndsAt: '2026-12-31T23:59:59+05:00',
  freeShippingThreshold: 5000,
  shippingFee: 250,
}

export const navigation = [
  { label: 'New In', href: '/collections/new-in' },
  { label: 'Men', href: '/collections/all' },
  { label: 'Hoodies', href: '/collections/hoodies' },
  { label: 'Drop Shoulder', href: '/collections/drop-shoulder' },
  { label: 'Shirts', href: '/collections/shirts' },
  { label: 'T-Shirts', href: '/collections/t-shirts' },
  { label: 'Winter', href: '/collections/winter' },
  { label: 'Sale', href: '/collections/sale' },
]

export const cities = [
  'Abbottabad', 'Bahawalpur', 'Faisalabad', 'Gujranwala', 'Hyderabad',
  'Islamabad', 'Karachi', 'Lahore', 'Multan', 'Peshawar', 'Quetta',
  'Rawalpindi', 'Sialkot',
]

export const footerGroups = [
  { title: 'Help', links: [{ label: 'Track order', href: '/track-order' }, { label: 'Shipping policy', href: '/shipping-policy' }, { label: 'FAQs', href: '/faq' }, { label: 'Returns & exchange', href: '/returns' }, { label: 'Contact us', href: '/contact' }] },
  { title: 'Explore', links: [{ label: 'About Double Figure', href: '/about' }, { label: 'Size guide', href: '/size-guide' }, { label: 'Shop all', href: '/collections/all' }] },
  { title: 'Information', links: [{ label: 'Privacy policy', href: '/privacy-policy' }, { label: 'Terms of service', href: '/terms' }] },
]
