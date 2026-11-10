import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { store } from '@/src/config/store'

const pageTitles: Record<string, string> = {
  about: 'A little about us',
  'size-guide': 'Find your fit',
  faq: 'A few good answers',
  returns: 'Returns & exchange',
  'shipping-policy': 'Shipping policy',
  contact: 'Let’s talk',
  'privacy-policy': 'Privacy policy',
  terms: 'Terms of service',
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  return pageTitles[slug] ? { title: pageTitles[slug] } : { title: 'Page not found' }
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!pageTitles[slug]) notFound()
  return <section className="static-page"><nav className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>{pageTitles[slug]}</span></nav><p className="eyebrow">DOUBLE FIGURE · PAKISTAN</p><h1>{pageTitles[slug]}</h1>{slug === 'about' ? <AboutContent /> : slug === 'size-guide' ? <SizeGuideContent /> : slug === 'faq' ? <FaqContent /> : slug === 'returns' ? <ReturnsContent /> : slug === 'shipping-policy' ? <ShippingPolicyContent /> : slug === 'contact' ? <ContactContent /> : slug === 'privacy-policy' ? <PrivacyContent /> : <TermsContent />}</section>
}

function AboutContent() { return <><p className="lead">Double Figure is for the years you&apos;re figuring it out. The fits change, the days get longer, and the clothes should keep up.</p><img src="/images/df-campaign.png" alt="Friends sharing an everyday moment in Lahore" style={{ width: '100%', maxHeight: 460, objectFit: 'cover', margin: '28px 0' }} /><h2>Made for everyday</h2><p>We make considered, easy-to-wear pieces for boys and young men. The kind of layers that work before school, after class and everywhere the day takes you. Our clothes are designed with room to move, quality fabrics and details that last.</p><h2>Made in Pakistan</h2><p>We&apos;re proud to build Double Figure here at home, working with local makers and partners who care about getting the small things right.</p><Link className="text-link" href="/collections/all">Find your fit →</Link></> }
function SizeGuideContent() { return <><p className="lead">Our fits are relaxed and true to size. If you prefer a closer fit, choose one size down.</p><h2>Adult sizes · garment measurements in inches</h2><div style={{ overflowX: 'auto' }}><table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}><thead><tr>{['Size','Chest','Length','Shoulder'].map((item) => <th key={item} style={{ padding: 13, borderBottom: '1px solid #ddd', textAlign: 'left' }}>{item}</th>)}</tr></thead><tbody>{[['S','38','26','17'],['M','40','27','18'],['L','42','28','19'],['XL','44','29','20']].map((row) => <tr key={row[0]}>{row.map((item) => <td key={item} style={{ padding: 13, borderBottom: '1px solid #e4e4df' }}>{item}</td>)}</tr>)}</tbody></table></div><h2>Between sizes?</h2><p>For a roomier look, size up. For more help finding your fit, <Link href="/contact"><u>send us a note</u></Link> and our team will help.</p></> }
function FaqContent() { return <><p className="lead">The useful details, all in one place.</p>{[['How long does delivery take?', 'Most orders are delivered in 2–5 working days, depending on your city. We’ll share updates as your order moves along.'],['Can I pay cash on delivery?', 'Yes. Cash on delivery is available across Pakistan. We confirm COD orders with a one-time phone verification code.'],['How do I exchange a size?', 'You can request a size exchange within 7 days of delivery. The item should be unworn and have its original tags. Visit our Returns & Exchange page for the steps.'],['How can I track my order?', 'Use the order number from your confirmation and the phone number used at checkout on our Track Order page.'],['How do I find my size?', 'Our Size Guide includes garment measurements. If you are between sizes, we recommend sizing up for a more relaxed fit.'],['Can I change my order?', 'Get in touch as soon as possible. Once an order is packed, we may not be able to change it.']].map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</> }
function ReturnsContent() { return <><p className="lead">The right fit matters. If something isn&apos;t quite right, we make exchanges straightforward.</p><h2>Exchange window</h2><p>Request an exchange within 7 days of receiving your order. Items should be unworn, unwashed and returned with original tags and packaging.</p><h2>How it works</h2><ol><li>Message our team with your order number and the size you need.</li><li>We&apos;ll confirm availability and arrange the exchange.</li><li>Keep the item in its original condition until pickup.</li></ol><h2>Need a hand?</h2><p>Contact us on WhatsApp at +92 300 1234567 or email <a href="mailto:hello@doublefigure.pk"><u>hello@doublefigure.pk</u></a>. Sale pieces are exchangeable for size, subject to availability.</p><Link className="button button-dark" href="/track-order">Track your order</Link></> }
function ShippingPolicyContent() {
  const shippingFee = `${store.currencySymbol} ${store.shippingFee.toLocaleString('en-PK')}`
  const freeShippingThreshold = `${store.currencySymbol} ${store.freeShippingThreshold.toLocaleString('en-PK')}`
  const whatsappLabel = `+${store.whatsappNumber.slice(0, 2)} ${store.whatsappNumber.slice(2, 5)} ${store.whatsappNumber.slice(5)}`
  return <>
    <p className="lead">From checkout to your doorstep, we keep delivery straightforward. Orders are shipped across Pakistan with clear rates and tracking through your order details.</p>
    <div className="shipping-policy-summary" aria-label="Delivery summary">
      <div><span>Standard delivery</span><strong>{shippingFee}</strong><small>Orders below {freeShippingThreshold}</small></div>
      <div><span>Free delivery</span><strong>{freeShippingThreshold}+</strong><small>On qualifying orders</small></div>
      <div><span>Estimated arrival</span><strong>2–5 working days</strong><small>Depending on your location</small></div>
    </div>
    <h2>Where we deliver</h2>
    <p>We currently deliver across Pakistan. Availability and the final delivery charge are confirmed at checkout for your address.</p>
    <h2>Processing and delivery time</h2>
    <p>We review and confirm each order before it is prepared for dispatch. Most orders arrive within 2–5 working days. Delivery may take longer for remote locations, public holidays, or courier delays.</p>
    <h2>Delivery charges</h2>
    <p>Standard delivery is {shippingFee} on orders below {freeShippingThreshold}. Delivery is free when your order total reaches {freeShippingThreshold}. The final charge is shown before you place your order.</p>
    <h2>Track your order</h2>
    <p>Use our <Link href="/track-order"><u>Track your order</u></Link> page with your order number and the mobile number used at checkout. If you need an update, our team can help.</p>
    <h2>Need a hand?</h2>
    <p>Message us on <a href={`https://wa.me/${store.whatsappNumber}`}><u>WhatsApp {whatsappLabel}</u></a> or email <a href="mailto:hello@doublefigure.pk"><u>hello@doublefigure.pk</u></a>.</p>
    <Link className="button button-dark" href="/contact">Contact Double Figure</Link>
  </>
}
function ContactContent() { return <><p className="lead">Need a hand with sizing, an order or just want to say hello? We&apos;re here Monday to Saturday, 10am–6pm PKT.</p><ContactForm /><h2>Prefer a message?</h2><p><a href={`https://wa.me/${store.whatsappNumber}`}><u>WhatsApp {`+${store.whatsappNumber.slice(0, 2)} ${store.whatsappNumber.slice(2, 5)} ${store.whatsappNumber.slice(5)}`}</u></a><br /><a href="mailto:hello@doublefigure.pk"><u>hello@doublefigure.pk</u></a></p></> }
function ContactForm() { return <form className="track-form" onSubmit={(event) => { event.preventDefault(); const form = event.currentTarget; form.reset(); window.alert('Thanks for reaching out. Our team will be in touch soon.') }}><div className="form-grid"><div className="form-field"><label htmlFor="contact-name">Your name</label><input id="contact-name" required /></div><div className="form-field"><label htmlFor="contact-email">Email</label><input id="contact-email" type="email" required /></div><div className="form-field full"><label htmlFor="contact-message">How can we help?</label><textarea id="contact-message" required /></div><div className="form-field full"><button className="button button-dark">Send message</button></div></div></form> }
function PrivacyContent() { return <><p className="lead">Your details are yours. We collect only the information needed to serve you, fulfil your orders and improve your experience.</p><h2>What we collect</h2><p>When you place an order or contact us, we may collect your name, phone number, delivery address and optional email address. This frontend demonstration does not send or store that information on a server.</p><h2>How we use it</h2><p>In a live store, order details are used to process delivery, provide support and send order updates. We do not sell personal information.</p><h2>Your choices</h2><p>You can contact us to ask about your data or update your preferences. Essential cookies help shopping features work; optional tracking is subject to your consent.</p><p>Last updated: November 2026</p></> }
function TermsContent() { return <><p className="lead">By placing an order with Double Figure, you agree to the terms below.</p><h2>Orders and availability</h2><p>All orders are subject to product availability and confirmation. Product colours may vary slightly between screens and real life.</p><h2>Pricing and payment</h2><p>Prices are shown in Pakistani Rupees. Delivery fees, where applicable, are displayed before you place your order. We may correct pricing errors before confirming an order.</p><h2>Delivery and exchanges</h2><p>Delivery estimates are indicative and can vary by location. Exchanges are handled under our Returns & Exchange policy.</p><h2>Contact</h2><p>Questions? Email <a href="mailto:hello@doublefigure.pk"><u>hello@doublefigure.pk</u></a>.</p><p>Last updated: November 2026</p></> }
