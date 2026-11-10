import type { Product, Review, Variant } from '@/src/types'
import { store } from '@/src/config/store'

const sizes = ['S', 'M', 'L', 'XL']
const reviewSet: Review[] = [
  { id: 'r1', author: 'Hamza A.', rating: 5, title: 'Great everyday fit', body: 'The fabric feels substantial and the relaxed fit is exactly what I wanted.', date: '12 Oct 2026' },
  { id: 'r2', author: 'Saad K.', rating: 4, title: 'Worth it', body: 'Really good quality for the price. Size exchange was easy too.', date: '04 Oct 2026' },
]

const definitions = [
  ['essential-heavyweight-hoodie', 'Essential Heavyweight Hoodie', 'Hoodies', 4990, 5990, '#37453b', '/images/df-hoodies.png', ['Bestseller', 'Winter']],
  ['everyday-drop-shoulder-tee', 'Everyday Drop Shoulder Tee', 'Drop Shoulder', 2490, 2990, '#d1c6b4', '/images/df-tees.png', ['Top pick']],
  ['utility-overshirt', 'Utility Cotton Overshirt', 'Shirts', 4290, undefined, '#6e725b', '/images/df-campaign.png', ['New']],
  ['core-boxy-tee', 'Core Boxy T-Shirt', 'T-Shirts', 1890, 2390, '#e8e5dc', '/images/df-tees.png', ['Bestseller']],
  ['studio-zip-hoodie', 'Studio Zip Hoodie', 'Hoodies', 5490, 6490, '#363c44', '/images/df-hoodies.png', ['New', 'Winter']],
  ['washed-cotton-shirt', 'Washed Cotton Shirt', 'Shirts', 3790, undefined, '#bbb09b', '/images/df-campaign.png', ['Trending']],
  ['relaxed-fit-tee', 'Relaxed Fit T-Shirt', 'T-Shirts', 1990, undefined, '#73806f', '/images/df-tees.png', ['Trending']],
  ['oversized-graphic-tee', 'Oversized Graphic Tee', 'Drop Shoulder', 2690, 3290, '#323431', '/images/df-tees.png', ['Sale']],
  ['everyday-pullover', 'Everyday Pullover Hoodie', 'Hoodies', 4790, undefined, '#a58c75', '/images/df-hoodies.png', ['Winter']],
  ['classic-oxford-shirt', 'Classic Oxford Shirt', 'Shirts', 3990, undefined, '#c7d0ca', '/images/df-campaign.png', ['New']],
  ['essential-crew-tee', 'Essential Crew T-Shirt', 'T-Shirts', 1790, 2190, '#c97e6d', '/images/df-tees.png', ['Sale']],
  ['wide-cut-tee', 'Wide Cut Cotton Tee', 'Drop Shoulder', 2290, undefined, '#c3bca9', '/images/df-campaign.png', ['Top pick']],
] as const

export const mockProducts: Product[] = definitions.map(([slug, name, category, price, compareAtPrice, color, image, tags], index) => {
  const colorOptions = [{ name: 'Olive', hex: color }, { name: 'Stone', hex: '#d4d0c7' }, { name: 'Black', hex: '#252624' }]
  const variants: Variant[] = colorOptions.flatMap((option, colorIndex) => sizes.map((size, sizeIndex) => {
    const stock = (index + sizeIndex + colorIndex) % 8 === 0 ? 0 : ((index * 3 + sizeIndex * 2 + colorIndex + 1) % 12) + 1
    return { id: `${slug}-${colorIndex}-${size.toLowerCase()}`, sku: `DF-${String(index + 1).padStart(3, '0')}-${colorIndex}${size}`, size, color: option.name, stock, available: stock > 0 }
  }))
  return {
    id: `df-${String(index + 1).padStart(3, '0')}`,
    slug,
    name,
    category,
    description: 'An everyday layer, made to move with you. Cut from soft, breathable cotton with a considered relaxed fit and finished for long wear.',
    price,
    compareAtPrice,
    currency: store.currency,
    colors: colorOptions,
    sizes,
    variants,
    images: [image, '/images/df-campaign.png', '/images/df-hero.png'],
    reviews: reviewSet,
    tags: [...tags],
    featured: index < 8,
  }
})
