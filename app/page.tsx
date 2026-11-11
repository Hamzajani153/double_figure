import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CreditCard, RotateCcw, ShieldCheck, Truck } from 'lucide-react'
import { getProducts } from '@/src/api'
import { ProductCard } from '@/components/storefront/product-card'
import { HomeBestSellers } from '@/components/storefront/home-best-sellers'
import { SaleEventBanner } from '@/components/storefront/sale-event-banner'
import { FindYourFitMarquee } from '@/components/storefront/find-your-fit-marquee'
import { HomeCampaignFilm } from '@/components/storefront/home-campaign-film'
import { HomeReviews } from '@/components/storefront/home-reviews'

export default async function HomePage() {
  const products = await getProducts()
  return <>
    <section className="hero" aria-label="Double Figure winter 2026 collection">
      <Image className="hero-image" src="/images/df-hero.png" alt="Young man wearing a heavyweight charcoal hoodie in a warm, minimal studio" fill priority sizes="100vw" unoptimized={false} />
      <div className="hero-copy"><p className="eyebrow">WINTER 2026</p><h1>Heavyweight hoodies, made for the cold.</h1><Link className="button button-dark" href="/collections/hoodies">Shop hoodies</Link></div>
    </section>

    <FindYourFitMarquee />

    <HomeBestSellers products={products} />
    <HomeCampaignFilm />
    <SaleEventBanner />

    <section className="campaign-banner" aria-label="A little more room to move"><Image src="/images/df-campaign.png" alt="Two friends in relaxed everyday layers on a sunlit Lahore street" fill loading="lazy" sizes="(max-width: 760px) calc(100vw - 20px), (max-width: 1440px) calc(100vw - 48px), 1440px" unoptimized={false} /><div className="campaign-copy"><p className="eyebrow">MADE FOR THE IN-BETWEEN</p><h2>A little more room to move.</h2><Link className="button button-light" href="/collections/drop-shoulder">Find your everyday <ArrowRight size={14} /></Link></div></section>

    <HomeReviews reviews={products[0]?.reviews ?? []} />

    <section className="benefit-strip" aria-label="Why Double Figure"><div className="benefit"><Truck aria-hidden="true" /><div><strong>Fast delivery</strong><span>Across Pakistan</span></div></div><div className="benefit"><RotateCcw aria-hidden="true" /><div><strong>Easy exchange</strong><span>Find the right fit</span></div></div><div className="benefit"><CreditCard aria-hidden="true" /><div><strong>Cash on delivery</strong><span>Pay your way</span></div></div><div className="benefit"><ShieldCheck aria-hidden="true" /><div><strong>Secure payment</strong><span>Checkout with ease</span></div></div></section>

    <section className="section" aria-labelledby="social-heading"><div className="section-heading"><div><p className="eyebrow">OUT IN THE WORLD</p><h2 id="social-heading">The good company.</h2></div><a className="text-link" href="https://instagram.com" target="_blank" rel="noreferrer">Follow along <ArrowRight size={13} /></a></div><div className="instagram-grid"><Image src="/images/df-hero.png" alt="Charcoal hoodie in a warm studio" width={400} height={400} loading="lazy" sizes="20vw" unoptimized={false} /><Image src="/images/df-hoodies.png" alt="Olive hoodie outdoors" width={400} height={400} loading="lazy" sizes="20vw" unoptimized={false} /><Image src="/images/df-tees.png" alt="White oversized tee in studio" width={400} height={400} loading="lazy" sizes="20vw" unoptimized={false} /><Image src="/images/df-campaign.png" alt="Friends in their everyday layers" width={400} height={400} loading="lazy" sizes="20vw" unoptimized={false} /><Image src="/images/df-hero.png" alt="A detail from the Double Figure lookbook" width={400} height={400} loading="lazy" sizes="20vw" unoptimized={false} /></div></section>
  </>
}
