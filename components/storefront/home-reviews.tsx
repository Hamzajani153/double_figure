import { Star, StarHalf } from 'lucide-react'
import type { Review } from '@/src/types'

type HomeReviewsProps = {
  reviews: Review[]
}

export function HomeReviews({ reviews }: HomeReviewsProps) {
  if (reviews.length === 0) return null

  const averageRating = reviews.reduce((total, review) => total + review.rating, 0) / reviews.length
  const fullStars = Math.floor(averageRating)
  const hasHalfStar = averageRating % 1 >= 0.25 && averageRating % 1 < 0.75
  const emptyStars = Math.max(0, 5 - fullStars - Number(hasHalfStar))

  return (
    <section className="section home-reviews" aria-labelledby="reviews-heading">
      <div className="review-intro">
        <p className="eyebrow">SAMPLE CUSTOMER NOTES · PREVIEW</p>
        <h2 id="reviews-heading">Good words, good company.</h2>
        <p>Feedback on the fits and little details that make everyday pieces worth reaching for.</p>
        <div className="review-average" aria-label={`${averageRating.toFixed(1)} out of 5 from ${reviews.length} sample reviews`}>
          <strong>{averageRating.toFixed(1)}</strong>
          <span className="review-stars" aria-hidden="true">
            {Array.from({ length: fullStars }, (_, index) => <Star key={`full-${index}`} fill="currentColor" />)}
            {hasHalfStar && <StarHalf aria-hidden="true" fill="currentColor" />}
            {Array.from({ length: emptyStars }, (_, index) => <Star key={`empty-${index}`} />)}
          </span>
          <span>{reviews.length} sample reviews</span>
        </div>
      </div>
      <div className="review-cards">
        {reviews.map((review) => (
          <article className="review-card" key={review.id}>
            <div className="review-card-rating" aria-label={`${review.rating} out of 5 stars`}>
              <Star size={14} fill="currentColor" aria-hidden="true" />
              <strong>{review.rating.toFixed(1)}</strong>
            </div>
            <h3>{review.title}</h3>
            <p>{review.body}</p>
            <div className="review-byline"><strong>{review.author}</strong><span>{review.date}</span></div>
          </article>
        ))}
      </div>
    </section>
  )
}
