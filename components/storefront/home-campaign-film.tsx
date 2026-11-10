import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Play } from 'lucide-react'

const posterImage = '/images/df-campaign.png'

type HomeCampaignFilmProps = {
  videoSrc?: string
}

export function HomeCampaignFilm({ videoSrc }: HomeCampaignFilmProps) {
  return (
    <section className="home-film" aria-labelledby="home-film-heading">
      <div className="home-film-media">
        {videoSrc ? (
          <video controls playsInline preload="metadata" poster={posterImage} aria-label="Double Figure campaign film">
            <source src={videoSrc} />
          </video>
        ) : (
          <>
            <Image src={posterImage} alt="Two friends wearing relaxed Double Figure layers on a sunlit street" fill sizes="(max-width: 760px) 100vw, 58vw" loading="lazy" />
            <div className="film-placeholder" aria-label="Campaign video placeholder">
              <span className="film-play-mark" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
              <span className="film-status">Video coming soon</span>
            </div>
          </>
        )}
      </div>
      <div className="home-film-copy">
        <p className="eyebrow">THE DOUBLE FIGURE FILM</p>
        <h2 id="home-film-heading">Everyday, in motion.</h2>
        <p>Soft layers and easy fits, made for all the in-between moments. Our campaign film is on its way.</p>
        <Link className="text-link" href="/collections/new-in">Explore new in <ArrowRight size={13} /></Link>
      </div>
    </section>
  )
}
