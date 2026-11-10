import Image from 'next/image'
import Link from 'next/link'

const collections = [
  { label: 'Hoodies', href: '/collections/hoodies', image: '/images/df-hoodies.png' },
  { label: 'Drop shoulder', href: '/collections/drop-shoulder', image: '/images/df-tees.png' },
  { label: 'Shirts', href: '/collections/shirts', image: '/images/df-campaign.png' },
  { label: 'T-shirts', href: '/collections/t-shirts', image: '/images/df-hero.png' },
  { label: 'Winter layers', href: '/collections/winter', image: '/images/df-hoodies.png' },
]

export function FindYourFitMarquee() {
  return (
    <section className="section fit-section" aria-labelledby="fit-heading">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE MEN&apos;S EDIT</p>
          <h2 id="fit-heading">Find your fit.</h2>
          <p>Easy layers, considered for the way you move.</p>
        </div>
        <Link className="text-link" href="/collections/all">Shop men</Link>
      </div>
      <div className="fit-marquee">
        <div className="fit-marquee-track">
          <div className="fit-marquee-group">
            {collections.map((collection) => (
              <Link className="fit-card" href={collection.href} key={collection.label}>
                <Image src={collection.image} alt="" fill sizes="(max-width: 760px) 74vw, 25vw" loading="lazy" />
                <span className="fit-card-copy"><strong>{collection.label}</strong><span>Explore <span aria-hidden="true">↗</span></span></span>
              </Link>
            ))}
          </div>
          <div className="fit-marquee-group" aria-hidden="true">
            {collections.map((collection) => (
              <div className="fit-card" key={`loop-${collection.label}`}>
                <Image src={collection.image} alt="" fill sizes="(max-width: 760px) 74vw, 25vw" loading="lazy" />
                <span className="fit-card-copy"><strong>{collection.label}</strong><span>Explore <span>↗</span></span></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
