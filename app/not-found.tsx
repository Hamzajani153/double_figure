import Link from 'next/link'

export default function NotFound() {
  return <section className="not-found"><p className="eyebrow">A WRONG TURN, MAYBE</p><h1>404</h1><p>We can&apos;t find that page. The good stuff is still right here.</p><Link href="/" className="button button-dark">Back to the shop</Link></section>
}
