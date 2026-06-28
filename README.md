# StreetGloss 🚗✨

> **Premium Car Care — Complete. Maximum Shine.**

A high-performance, mobile-first product landing page for **StreetGloss** — a premium car care brand offering professional-grade detailing formulas for a showroom finish every time.

---

## 🛍️ Product Range

| Product | Category | Description | Price |
|---|---|---|---|
| **Stealth Coat** | Coat | Matte finish protectant · 200ml | ₹699 |
| **Cerami Wash** | Wash | Ceramic infused shampoo · 200ml | ₹499 |
| **Sunset Foam** | Foam | Citrus thick foam shampoo · 200ml | ₹449 |
| **Ocean Wash** | Foam | Premium foam shampoo · 200ml | ₹449 |
| **Acid Foam** | Foam | pH-balanced foam shampoo · 200ml | ₹499 |
| **Gloss Max** | Polish | Universal polish · 200ml | ₹599 |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Role |
|---|---|
| **HTML5** | Semantic structure, ARIA accessibility |
| **Vanilla CSS** | All styling — zero frameworks, zero runtime overhead |
| **Vanilla JavaScript** | All interactivity — no dependencies |
| **Razorpay Web SDK** | Secure, client-side checkout & payment gateway overlay |

### Backend (Edge API)
| Technology / Service | Role |
|---|---|
| **Cloudflare Workers** | Globally distributed edge API router, handling order creation, verification, rate limiting, and webhooks |
| **Cloudflare D1** | Serverless SQLite database storing order statuses, customer details, and newsletter subscribers |
| **Cloudflare Access** | Zero-trust Google account login protection covering the `/admin` API |
| **Resend API** | Transactional email delivery for order confirmations and shipping updates |
| **Shiprocket API** | Automated courier assignment, shipping label generation, and tracking webhooks |

### CSS Architecture
| Feature | Details |
|---|---|
| **CSS Layers** (`@layer`) | `reset → tokens → base → layout → components → utilities → responsive` |
| **Mobile-first** | All base styles target phones; progressively enhanced at 480 / 768 / 1024 / 1280px |
| **`clamp()`** | Every font size and spacing value scales fluidly across all screen sizes |
| **CSS Custom Properties** | Full design token system (colours, spacing, radii, motion, z-index) |
| **`dvh` / `dvw` units** | Dynamic viewport units — no iOS address-bar jump bugs |
| **`env(safe-area-inset-*)`** | Proper notch / home indicator padding on iPhone |

### Animations & Motion
| Library | Version | Usage |
|---|---|---|
| **GSAP** (GreenSock) | 3.12.2 | Bottle spin on variant switch, smooth theme transitions |
| **CSS `@keyframes`** | Native | Bottle float, bottle shine, glow pulse, bubble rise, ripple tap |
| **`requestAnimationFrame`** | Native | 60fps particle orbit + 3D mouse-tilt loop (desktop only) |

### Typography
| Font | Weights | Usage |
|---|---|---|
| **Outfit** (Google Fonts) | 700, 900 | Display headings, product names, hero title |
| **Inter** (Google Fonts) | 400, 500, 700, 800 | Body text, buttons, UI labels |
| `display=optional` | — | Prevents layout shift (CLS) on font load |

### Performance & Security Optimisations
- **Revalidated LocalStorage Cart** — Re-checks item properties against hardcoded catalog on load to prevent price tempering.
- **Strict Content Security Policy (CSP)** — Strictly locks script, frame, and network origins to self, Razorpay, and your Cloudflare Worker.
- **XSS & Open Redirect Safeguards** — Custom DOM-based escaping and strict `https://` protocol validation for live tracking URLs.
- **Particles removed from DOM on mobile** — zero RAF cost on touch devices
- **3D tilt disabled on mobile** — `mousemove` listener never attached
- **Passive event listeners** on all touch/scroll handlers

### Mobile UX
- **Slide-in drawer nav** with blur backdrop — tap outside to close
- **Horizontal scrolling filter chips** — edge-to-edge, no scrollbar
- **Ripple effect** on all cart buttons and interactive elements
- **48px minimum tap targets** on all buttons, chips, and nav links
- **Toast notification at top-centre** — out of thumb-block zone
- **`viewport-fit=cover`** — full-bleed on notched iPhones
- **`theme-color`** meta — browser chrome matches brand colour
- **Apple PWA metas** — installable, black-translucent status bar

---

## 📁 Project Structure

```
StreetGloss/
├── index.html        # Main landing page & variant details
├── track.html        # Live order tracking page (timeline + shipping details)
├── styles.css        # Mobile-first CSS (CSS Layers architecture)
├── script.js         # Vanilla JS — interactions, cart & payment flow
├── api/              # [Ignored] Cloudflare Workers backend folder (local only)
│   ├── src/          # Worker source routes (create, verify, track, webhook)
│   ├── schema.sql    # D1 SQLite table declarations
│   └── wrangler.toml # Worker configuration and public variables
├── AGENTS.md         # AI agent configuration (not pushed)
├── SECURITY.md       # Security checklist (not pushed)
└── README.md         # This file
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Target | Hero Layout | Product Grid |
|---|---|---|---|
| `0px` (default) | Phones | Single column, bottle on top | 2 columns |
| `480px` | Large phones | Single column | 2 columns |
| `768px` | Tablets | 2-column (text + bottle) | 3 columns |
| `1024px` | Desktop | 3-column (text + bottle + variants) | 3 columns |
| `1280px` | Wide desktop | 3-column | 4 columns |

---

## 🎨 Design System

### Colour Tokens
| Token | Value | Usage |
|---|---|---|
| `--ink` | `#f8f5ff` | Primary text |
| `--canvas` | `#0a0810` | Page background |
| `--pink` | `#f0b6ff` | Accent, CTAs, active states |
| `--purple` | `#b884ff` | Brand secondary |
| `--sale` | `#ff6d8b` | Sale price labels |
| `--success` | `#72f2b4` | Form success messages |
| `--muted` | `rgba(248,245,255,0.64)` | Secondary text |

### Background Gradient
Radial gradient from `--bg-inner` → `--bg-mid` → `--bg-outer`. Smoothly transitions on theme switch (ceramic ↔ foam) via GSAP-animated CSS custom properties.

### Per-Product Visual Themes
Each product card has a unique colour identity:
- **Stealth Coat** — Dark silver/matte
- **Cerami Wash** — Deep sapphire blue
- **Sunset Foam** — Warm amber/orange
- **Ocean Wash** — Teal/cyan
- **Acid Foam** — Acid green
- **Gloss Max** — Crimson/chrome red

---

## ✨ Key Features

- 🍾 **3D CSS bottle** — fully drawn in CSS, mouse-tracked tilt on desktop
- 💳 **Razorpay Payment Gateway** — Validates checkout form details client-side and triggers secure payment card/UPI overlay.
- 🚚 **Live Order Tracking** —timeline tracking page displaying live delivery stages and courier details using encrypted D1 record pairs.
- 🎨 **Live theme switch** — ceramic ↔ foam variant swaps background + bottle label with GSAP spin
- 🔍 **Product filter** — chips filter the grid by category instantly
- 🛒 **Add to Bag** — cart count + toast notification with ripple feedback
- 📧 **Newsletter signup** — API-wired subscription form saving emails directly to database
- 💫 **Floating particles** — physics-based orbit with mouse repulsion (desktop)
- 🫧 **Rising bubbles** — ambient background animation (desktop)
- 🌓 **Scroll-aware header** — becomes frosted glass on scroll

---

## 📊 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full |
| Safari / iOS Safari 15.4+ | ✅ Full (including `dvh`, `backdrop-filter`) |
| Firefox 121+ | ✅ Full (`@layer` supported) |
| Samsung Internet 21+ | ✅ Full |

---

## 📄 License

© 2026 StreetGloss. All rights reserved.
