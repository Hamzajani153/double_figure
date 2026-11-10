# Double Figure Storefront

A responsive, men's fashion storefront built with the Next.js App Router. It includes a home page, catalog and product pages, a cart and checkout flow, order tracking, account UI, and brand information pages.

> **Project status:** This is a front-end demo. The products, customer reviews, checkout, account verification, and order tracking use sample or in-memory data. Do not use it to process real orders or customer information until production services are connected.

## Features

- Responsive Double Figure home page with campaign hero, looping “Find your fit” gallery, featured products, campaign-video placeholder, sample review cards, and benefits.
- Men's collections: New In, Hoodies, Drop Shoulder, Shirts, T-shirts, Winter, and Sale.
- Product search, category browsing, sorting, product detail pages, recommendations, color and size variants, and sample stock availability.
- Shopping bag with quantity controls, item removal, subtotal and delivery calculations, and the demo `FIGURE10` coupon.
- Checkout form with delivery details and demo payment choices for cash on delivery, card, JazzCash, and Easypaisa.
- Order confirmation and a tracking timeline for orders created in the current server session.
- Account tabs, sample sign-in flow, wishlist UI, and brand information pages.

## Tech stack

- Next.js 16 App Router
- React 19 and TypeScript
- Tailwind CSS 4 plus custom styles in `app/globals.css`
- `lucide-react` icons
- pnpm 12.3.4, declared in `package.json`

## Run locally

### Requirements

- Node.js 20.9 or newer
- Corepack (bundled with supported Node.js releases) to use the project's pinned pnpm version

### Install and start

```bash
git clone https://github.com/Hamzajani153/double_figure.git
cd double_figure
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). The current demo does not require a `.env` file or environment variables.

### Available scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the Next.js development server with hot reload. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Serve the latest production build; run `pnpm build` first. |
| `pnpm exec tsc --noEmit` | Run the TypeScript type check without generating output files. |

There are no dedicated lint or automated test scripts configured in `package.json` yet.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Storefront home page. |
| `/collections/all` | Full product catalog. |
| `/collections/new-in` | Products tagged as new. |
| `/collections/hoodies`, `/collections/drop-shoulder`, `/collections/shirts`, `/collections/t-shirts` | Product categories. |
| `/collections/winter`, `/collections/sale` | Seasonal and sale collections. |
| `/products/[slug]` | Product details, variants, and recommendations. |
| `/search` | Search the sample product catalog. |
| `/cart` | Review and update the bag. |
| `/checkout` | Enter delivery details and place a demo order. |
| `/order/success?order=[order-number]` | Order confirmation. |
| `/track-order` | Look up an order created during the current server session. |
| `/account` | Demo account experience. `/account?tab=wishlist` opens the wishlist tab. |
| `/about`, `/size-guide`, `/faq`, `/returns`, `/shipping-policy`, `/contact`, `/privacy-policy`, `/terms` | Store information and policy pages. |

## How the demo works

- **Catalog and reviews:** `src/api/mock-data.ts` contains 12 sample products, generated size/color variants and stock values, and two sample reviews. Replace these fixtures with real catalog and verified review data before launch.
- **Data access:** `src/api/index.ts` exposes asynchronous functions for catalog lookup, order creation, and order tracking. Orders live in a server-side `Map` and disappear when the server restarts; this is not durable storage.
- **Cart and wishlist:** `components/storefront/store-provider.tsx` keeps cart, wishlist, coupon, and last-order state in React state. These values are not persisted across a page reload or browser session.
- **Checkout:** The payment choices are UI only; no card, JazzCash, or Easypaisa gateway is connected. The COD phone-verification flow uses the demo code `123456` and does not send an SMS.
- **Contact form:** The form displays a browser confirmation only; it does not send email or create a support ticket.
- **Tracking events:** `src/lib/track.ts` writes sample events to the browser console; no analytics service is wired up.
- **Campaign media:** The home page currently uses `/images/df-campaign.png` as a video poster and labels it “Video coming soon.” To add a clip, put it in `public/videos/` and pass its public path to the `HomeCampaignFilm` component's `videoSrc` prop in `app/page.tsx`.
- **Social link:** The homepage Instagram link is a generic placeholder. Replace it with the brand's real profile URL before launch.

The demo OTP, sample reviews, product inventory, prices, and in-memory order flow are not production credentials or live commerce services. Connect persistent storage, server-side validation, authentication, real OTP delivery, payment processing, order notifications, and live tracking before accepting customer orders.

## Brand and content updates

| Update | File |
| --- | --- |
| Store name, tagline, logo URL, colors, WhatsApp number, currency, shipping values, navigation, footer links, and delivery cities | `src/config/store.ts` |
| Product names, descriptions, prices, images, variants, inventory samples, tags, and review fixtures | `src/api/mock-data.ts` |
| Catalog filtering, recommendations, and demo order functions | `src/api/index.ts` |
| Price formatting, coupon, and shipping calculations | `src/lib/store-utils.ts` |
| Home page section order | `app/page.tsx` |
| Home fit marquee, campaign-video slot, and review presentation | `components/storefront/find-your-fit-marquee.tsx`, `components/storefront/home-campaign-film.tsx`, `components/storefront/home-reviews.tsx` |
| Global typography, responsive layout, and component styling | `app/globals.css` |
| Page metadata and shared storefront providers | `app/layout.tsx` |

Current demo shipping settings in `src/config/store.ts` are Rs. 250 for orders below Rs. 5,000, free shipping at Rs. 5,000 and above, and an estimated delivery window of 2–5 working days in the policy copy. Confirm these terms and support details before using them on a live store.

## Project structure

```text
app/                         App Router pages and global styles
  [slug]/                    About, FAQ, shipping, returns, and other info pages
  account/                   Demo account page
  cart/                      Shopping bag
  checkout/                  Demo checkout
  collections/[slug]/        Collection listings
  order/success/              Order confirmation
  products/[slug]/            Product details
  search/                     Catalog search
  track-order/                Demo order tracking
components/storefront/       Storefront UI and state provider
components/ui/               Shared UI primitives
public/images/               Local Double Figure campaign and product images
src/api/                     Sample catalog and in-memory order functions
src/config/store.ts          Brand and storefront configuration
src/lib/                     Pricing, cart, and tracking helpers
src/types/                   Shared TypeScript data types
```
