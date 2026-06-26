# StreetGloss Website Architecture

## Project Overview

StreetGloss is an ecommerce website for bike care products: ceramic cleaner, wash foams, ceramic coatings, degreasers, microfiber kits, and detailing bundles.

The current implementation is a polished static prototype with a black-purple glass aesthetic, animated hero product, ecommerce product grid, filters, add-to-cart feedback, newsletter capture, and responsive mobile navigation.

The homepage is intentionally visual-heavy. The hero product is a CSS-rendered ceramic cleaner bottle with cursor tilt, floating particles, bubble motion, variant switching, and theme transitions.

## Current Build

The current site is built with:

- `HTML`
- `CSS`
- `JavaScript`
- `GSAP` via CDN for smooth animation
- No build step
- No framework
- No backend
- No real checkout
- No CMS

Current files:

- `index.html` - page structure and content
- `styles.css` - design system, layout, responsive styles, animations
- `script.js` - UI interactions, product animation, filters, cart count, newsletter state
- `AGENTS.md` - local instruction file

## Current Site Sections

1. **Animated Hero**
   - StreetGloss brand navigation
   - Large `Ceramic Cleaner` headline
   - Animated hero bottle
   - Floating decorative particles
   - Rising bubbles
   - CTA buttons
   - Variant cards for Ceramic Cleaner and Wash Foam

2. **Category Strip**
   - Ceramic Coating
   - Wash Foam
   - Chain Degreaser
   - Detailing Kits

3. **Product Grid**
   - Product cards
   - Filter chips
   - Add-to-bag buttons
   - Sale price styling

4. **Campaign Tiles**
   - Coating-focused feature panel
   - Wash-focused feature panel

5. **Brand Story Band**
   - Visual brand positioning
   - Kit-building CTA

6. **Footer**
   - Brand summary
   - Shop links
   - Newsletter form
   - Legal links

## Current Interaction Architecture

### Navigation

Mobile menu state is handled with a `nav-open` class on `body`.

### Product Filter

Product cards use `data-category`.

Filter chips use `data-filter`.

The script toggles each product card’s `hidden` state based on the active filter.

### Cart Feedback

The current cart is local UI state only.

When a user clicks `Add to Bag`:

- Cart count increments
- Toast message appears
- No product is persisted
- No checkout happens

### Newsletter

The newsletter form is simulated.

On submit:

- Form submission is prevented
- Success text appears
- Input resets

### Hero Product Animation

The hero animation uses:

- Mouse/touch position tracking
- Smoothed cursor values
- Bottle `rotateX` / `rotateY` transform
- Floating particles
- Pointer repulsion
- Bubble generation
- GSAP-powered variant switch
- Theme color transition between ceramic and foam modes

## Recommended Production Tech Stack

The current static prototype is good for visual direction, but it is not the right final architecture for a serious ecommerce business. For production, use this stack.

### Frontend Framework

Use **Next.js 15+ with React and TypeScript**.

Why:

- Excellent SEO for product pages
- Fast static and server-rendered pages
- App Router supports clean route architecture
- Strong ecosystem for ecommerce
- Easy image optimization
- Works well with animation-heavy landing pages

### Styling

Use **Tailwind CSS v4** plus CSS variables for brand tokens.

Why:

- Fast UI iteration
- Consistent spacing, typography, and responsive behavior
- Easy dark/glass theme control
- Less long-term CSS drift

Use regular CSS modules only for complex animation layers where Tailwind becomes awkward.

### UI Components

Use **shadcn/ui** as the base component system.

Use it for:

- Buttons
- Dialogs
- Drawers
- Sheet/mobile menu
- Toasts
- Accordions
- Forms
- Tabs

Do not let shadcn make the site generic. Keep the StreetGloss visual language custom.

### Animation

Use:

- **GSAP** for hero product choreography
- **Framer Motion** for smaller UI transitions

GSAP is better for the hero because it needs choreographed product movement, variant switching, and particle behavior.

Framer Motion is better for component-level transitions like drawers, product cards, modals, and checkout UI.

### Ecommerce Backend

Best practical options:

1. **Shopify Hydrogen / Shopify Storefront API**
   - Best if you want a reliable ecommerce backend quickly
   - Handles products, inventory, checkout, discounts, taxes, and orders

2. **Medusa.js**
   - Better if you want full control
   - More engineering effort
   - Good for custom ecommerce workflows

Recommendation: use **Shopify Storefront API** unless you have a strong reason to build custom commerce infrastructure.

### Payments

Use **Shopify Payments** if using Shopify.

If using custom backend:

- Use **Stripe Checkout**
- Avoid building your own payment forms at this stage

### CMS

Use **Sanity** for editable marketing content.

Use it for:

- Homepage copy
- Campaign tiles
- Product education sections
- FAQs
- Blog/detailing guides
- Landing pages

Do not use a CMS for cart or checkout logic.

### Database

If using Shopify, product/order data lives in Shopify.

For custom app data, use:

- **Supabase Postgres**

Useful for:

- Newsletter signups
- Product waitlists
- Reviews
- User-generated detailing reports
- Warranty registrations

### Authentication

For the first version, avoid user accounts unless required.

If accounts are needed later:

- Shopify customer accounts if using Shopify
- Clerk or Supabase Auth if building custom flows

### Images and Assets

Use:

- Next.js `<Image />`
- Shopify CDN for product images
- Sanity CDN for marketing images
- WebP/AVIF image formats

For the hero:

- Replace CSS bottle with a real product render
- Use transparent PNG/WebP or a lightweight 3D model
- Keep fallback static image for low-power devices

### 3D / Product Visualization

For the best version of the hero product:

- Use **Three.js / React Three Fiber** if building a real 3D bottle
- Use **Spline** only if you want faster no-code 3D design iteration
- Use static high-quality WebP if performance becomes a problem

Recommendation:

- Start with high-quality transparent product renders
- Move to Three.js only if interactive 3D materially improves conversion

## Recommended Production Folder Structure

```text
streetgloss/
  app/
    layout.tsx
    page.tsx
    products/
      page.tsx
      [handle]/
        page.tsx
    cart/
      page.tsx
    checkout/
      page.tsx
    journal/
      page.tsx
  components/
    site/
      Header.tsx
      Footer.tsx
      MobileNav.tsx
    home/
      Hero.tsx
      HeroProduct.tsx
      ProductParticles.tsx
      CategoryRail.tsx
      BestSellers.tsx
      CampaignTiles.tsx
      BrandStory.tsx
    product/
      ProductCard.tsx
      ProductGrid.tsx
      ProductFilters.tsx
      VariantSelector.tsx
    cart/
      CartDrawer.tsx
      CartLineItem.tsx
    ui/
      Button.tsx
      GlassPanel.tsx
      Toast.tsx
  lib/
    shopify/
      client.ts
      queries.ts
      types.ts
    sanity/
      client.ts
      queries.ts
    analytics.ts
    format-money.ts
  styles/
    globals.css
    tokens.css
  public/
    images/
    models/
    icons/
  content/
    brand-copy.md
  tests/
    e2e/
```

## Recommended Routes

```text
/                      Homepage
/products              Product listing page
/products/[handle]     Product detail page
/cart                  Cart page or drawer route
/checkout              Redirect to Shopify/Stripe checkout
/journal               Detailing guides and SEO content
/about                 Brand story
/contact               Support/contact page
```

## Design System

### Brand Direction

StreetGloss should feel:

- Premium
- Night-drive inspired
- Bike detailing focused
- Glossy but not childish
- Black/purple with controlled highlights
- Dense enough for ecommerce, not just a flashy landing page

### Core Colors

```css
--canvas: #100d18;
--canvas-2: #171121;
--ink: #f8f5ff;
--muted: rgba(248, 245, 255, 0.68);
--purple: #b884ff;
--purple-2: #7c3cff;
--pink: #f0b6ff;
--cyan: #92f2ff;
--sale: #ff6d8b;
--success: #72f2b4;
```

### Typography

Recommended:

- Display: `Outfit`
- Body/UI: `Inter`

Display headings should be bold, uppercase, and tight.

Body copy should stay readable and practical. Do not over-style product descriptions.

### Component Style

Use:

- Pill buttons
- Glass panels
- High-contrast product cards
- Minimal borders
- Large product visuals
- Clear CTA hierarchy

Avoid:

- Generic gradients everywhere
- Too many glow effects
- Tiny unreadable copy
- Overlapping text and product imagery
- Inert decorative UI that looks clickable

## UX Requirements

### Homepage

The homepage must answer quickly:

- What is StreetGloss?
- What is the hero product?
- Why should a rider care?
- What can I buy right now?
- Where do I click next?

### Product Cards

Each product card should include:

- Product image
- Product name
- Category/formula
- Price
- Sale price if applicable
- Rating or review count later
- Add-to-cart button

### Product Detail Page

Each PDP should include:

- Product gallery
- Product title
- Price
- Variant selector
- Quantity selector
- Add to cart
- Short value proposition
- Usage steps
- Compatibility notes
- Shipping/returns accordion
- Reviews
- Related products

### Cart

Cart should include:

- Product image
- Product name
- Variant
- Quantity controls
- Remove button
- Subtotal
- Free shipping progress
- Checkout CTA

## Performance Requirements

Targets:

- Lighthouse Performance: 90+
- Accessibility: 95+
- SEO: 95+
- Largest Contentful Paint under 2.5s
- Cumulative Layout Shift under 0.1
- First Input Delay / INP should stay low

Rules:

- Do not load heavy 3D assets on mobile without fallback
- Lazy-load below-the-fold images
- Use optimized image formats
- Keep animation GPU-friendly with `transform` and `opacity`
- Avoid animating layout properties
- Respect `prefers-reduced-motion`

## Accessibility Requirements

Must include:

- Semantic HTML
- Keyboard-accessible navigation
- Visible focus states
- Form labels
- Button labels
- Sufficient text contrast
- Reduced motion fallback
- No critical text embedded only in images

## SEO Requirements

Must include:

- Product-specific metadata
- Open Graph images
- JSON-LD product schema
- Clean product URLs
- Fast page rendering
- Blog/detailing guide content for organic search

Important SEO content ideas:

- How to clean a bike after rain
- Ceramic coating for bikes explained
- Bike chain degreaser guide
- Snow foam vs shampoo for bikes
- How to protect matte bike paint

## Analytics

Use:

- Vercel Analytics or Plausible for privacy-friendly traffic
- Shopify analytics for ecommerce
- Meta/Google pixels only when ads begin

Track:

- Product card clicks
- Add-to-cart events
- Checkout starts
- Purchase completion
- Newsletter signups
- Hero variant interactions

## Deployment

Recommended:

- **Vercel** for Next.js frontend
- **Shopify** for commerce backend
- **Sanity** for CMS
- **Supabase** only if custom app data is needed

Environment variables:

```text
NEXT_PUBLIC_SITE_URL=
SHOPIFY_STORE_DOMAIN=
SHOPIFY_STOREFRONT_ACCESS_TOKEN=
SANITY_PROJECT_ID=
SANITY_DATASET=
SANITY_API_VERSION=
```

## Roadmap

### Phase 1 - Static Brand Prototype

Status: current.

- Homepage visual direction
- Animated hero
- Static products
- Simulated cart
- Simulated newsletter

### Phase 2 - Production Frontend

- Rebuild in Next.js + TypeScript
- Componentize homepage
- Add real product data model
- Add product listing page
- Add product detail page
- Add cart drawer

### Phase 3 - Commerce Integration

- Connect Shopify Storefront API
- Add real checkout
- Add inventory states
- Add discount support
- Add real product images

### Phase 4 - Content and Conversion

- Add Sanity CMS
- Add detailing guide pages
- Add reviews
- Add product education sections
- Add SEO schema

### Phase 5 - Polish and Scale

- Replace CSS bottle with final product render or 3D asset
- Add advanced product bundles
- Add subscriptions if relevant
- Add analytics-driven A/B testing

## Honest Technical Notes

The current site looks good as a prototype, but it is not production ecommerce yet. It has no real product backend, no checkout, no persistence, no SEO product schema, and no CMS.

The right next move is not to keep adding visual effects. The next move is to convert this into a maintainable Next.js ecommerce codebase with real product data and checkout. Animation should support conversion, not distract from buying.

