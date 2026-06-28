'use strict';

/* ══════════════════════════════════════════════
   STREETGLOSS — Full Featured JS
   ══════════════════════════════════════════════ */

/* ── Device detection ─────────────────────── */
const isMobile  = window.matchMedia('(pointer: coarse)').matches;
const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Product data ─────────────────────────── */
const PRODUCTS = {
  'stealth-coat': {
    name: 'Stealth Coat',
    tagline: 'Matte Finish Ceramic Protectant',
    price: 699,
    originalPrice: null,
    badge: 'Pro Formula',
    visual: 'pv-stealth',
    rating: '4.7',
    reviews: '218',
    description: 'Stealth Coat is a professional-grade matte ceramic protectant engineered for flat and satin finishes. Unlike traditional polishes that add gloss, Stealth Coat creates an invisible nano-ceramic shield that repels water, UV rays, and environmental contaminants — all while preserving your car\'s raw matte aesthetic.',
    specs: [
      { label: 'Volume', value: '200ml' },
      { label: 'Finish Type', value: 'Matte / Satin' },
      { label: 'Protection Duration', value: 'Up to 6 months' },
      { label: 'Key Ingredients', value: 'SiO₂ Ceramic, UV Inhibitors, Carnauba Wax Blend' },
      { label: 'pH Level', value: '7.0 (Neutral)' },
      { label: 'Application', value: 'Microfibre applicator pad' },
    ]
  },
  'cerami-wash': {
    name: 'Cerami Wash',
    tagline: 'Ceramic Infused Car Shampoo',
    price: 499,
    originalPrice: null,
    badge: 'Fan Favourite',
    visual: 'pv-cerami',
    rating: '4.9',
    reviews: '531',
    description: 'Cerami Wash combines the cleaning power of a professional detailing shampoo with the protection of ceramic-infused polymers. Every wash leaves behind a hydrophobic layer that boosts shine and makes your next wash easier. Safe for all paint types, coatings, and vinyl wraps.',
    specs: [
      { label: 'Volume', value: '200ml (dilutes 1:200)' },
      { label: 'Foam Level', value: 'High' },
      { label: 'Safe For', value: 'All paint, PPF, Vinyl, Ceramic coatings' },
      { label: 'Key Ingredients', value: 'SiO₂ Ceramic Polymers, Coconut-derived surfactants' },
      { label: 'pH Level', value: '8.0 (Mildly Alkaline)' },
      { label: 'Scent', value: 'Fresh Cotton' },
    ]
  },
  'sunset-foam': {
    name: 'Sunset Foam',
    tagline: 'Citrus Thick Snow Foam Shampoo',
    price: 449,
    originalPrice: 549,
    badge: 'On Sale',
    visual: 'pv-sunset',
    rating: '4.8',
    reviews: '389',
    description: 'Sunset Foam produces an incredibly thick, clinging foam that clings to your paintwork and lifts dirt before you even touch the surface. The citrus-powered formula dissolves road grime, bug splatter, and traffic film effortlessly. Perfect for the pre-wash stage in a two-bucket wash method.',
    specs: [
      { label: 'Volume', value: '200ml' },
      { label: 'Dilution Ratio', value: '1:10 to 1:20 (foam cannon)' },
      { label: 'Foam Density', value: 'Ultra-thick snow foam' },
      { label: 'Key Ingredients', value: 'Citrus D-Limonene, Anionic Surfactants, Foam Boosters' },
      { label: 'pH Level', value: '9.5 (Alkaline degreaser)' },
      { label: 'Scent', value: 'Zesty Citrus' },
    ]
  },
  'ocean-wash': {
    name: 'Ocean Wash',
    tagline: 'Premium High-Gloss Foam Shampoo',
    price: 449,
    originalPrice: null,
    badge: 'Bestseller',
    visual: 'pv-ocean',
    rating: '4.8',
    reviews: '412',
    description: 'Ocean Wash is our signature premium shampoo, blended with deep-sea mineral extracts and high-gloss polymers. It cleans and enhances simultaneously — your paint comes out cleaner, shinier, and more hydrophobic with every use. The oceanic scent makes wash day genuinely enjoyable.',
    specs: [
      { label: 'Volume', value: '200ml (dilutes 1:300)' },
      { label: 'Foam Level', value: 'Rich, creamy lather' },
      { label: 'Key Ingredients', value: 'Marine Mineral Extracts, Gloss Polymers, Aloe Vera' },
      { label: 'pH Level', value: '7.5 (Near-neutral)' },
      { label: 'Scent', value: 'Fresh Ocean Breeze' },
      { label: 'Rinse Residue', value: 'Spot-free formula' },
    ]
  },
  'acid-foam': {
    name: 'Acid Foam',
    tagline: 'pH-Balanced Decontamination Foam',
    price: 499,
    originalPrice: null,
    badge: 'Pro Grade',
    visual: 'pv-acid',
    rating: '4.6',
    reviews: '167',
    description: 'Acid Foam is a specialist decontamination foam formulated to dissolve mineral deposits, water spots, and iron fallout from wheels and paintwork. The mildly acidic formula is safe for regular use and makes wheels sparkle. Essential part of a proper decontamination detail.',
    specs: [
      { label: 'Volume', value: '200ml' },
      { label: 'Primary Use', value: 'Wheels, glass, decontamination' },
      { label: 'Key Ingredients', value: 'Citric Acid, Phosphoric Acid (5%), Corrosion Inhibitors' },
      { label: 'pH Level', value: '2.5 (Mild Acid)' },
      { label: 'Contact Time', value: '2–5 minutes (do not let dry)' },
      { label: 'Safe For', value: 'Alloy wheels, chrome, stainless steel' },
    ]
  },
  'gloss-max': {
    name: 'Gloss Max',
    tagline: 'Universal Cutting & Finishing Polish',
    price: 599,
    originalPrice: 749,
    badge: '⭐ Best Seller',
    visual: 'pv-gloss',
    rating: '4.9',
    reviews: '724',
    description: 'Gloss Max is the flagship product of the StreetGloss range — a one-step polish that cuts light swirl marks, oxidation, and water spots, then finishes to a mirror-like gloss without leaving residue. Works by hand or with a DA polisher. Compatible with all paint colours and clearcoats.',
    specs: [
      { label: 'Volume', value: '200ml' },
      { label: 'Cut Level', value: 'Light–Medium' },
      { label: 'Finish', value: 'High-gloss mirror finish' },
      { label: 'Key Ingredients', value: 'Diminishing Abrasive Technology, Silicone Polymers, Carnauba Wax' },
      { label: 'Application', value: 'Hand or DA polisher (5mm orbit)' },
      { label: 'Compatible With', value: 'All factory and aftermarket clearcoats' },
    ]
  }
};

/* ── DOM refs ─────────────────────────────── */
const body             = document.body;
const menuToggle       = document.querySelector('.menu-toggle');
const mobileNav        = document.querySelector('.mobile-nav');
const navBackdrop      = document.querySelector('.nav-backdrop');
const chips            = document.querySelectorAll('.chip');
const productCards     = document.querySelectorAll('.product-card');
const cartBtn          = document.querySelector('#cart-open-btn');
const cartCountEl      = document.querySelector('.cart-count');
const cartHeaderCount  = document.querySelector('.cart-header-count');
const toast            = document.querySelector('.toast');
const newsletter       = document.querySelector('.newsletter');
const heroProduct      = document.querySelector('#hero-product');
const particlesFG      = document.querySelector('.particle-layer-fg');
const particlesBG      = document.querySelector('.particle-layer-bg');
const particles        = document.querySelectorAll('.particle');
const variantCards     = document.querySelectorAll('.variant-card');
const bubblesContainer = document.querySelector('#bubbles-container');
const siteHeader       = document.querySelector('.site-header');

/* ── Cart State ───────────────────────────── */
let cart = loadCart();
let toastTimer = null;
let isSwitching = false;
let switchSpin = 0;
let rafId = null;
let currentProductId = null;
let modalQty = 1;

const mouse        = { x: 0, y: 0, px: 0, py: 0 };
const currentMouse = { x: 0, y: 0 };

/* ── Perf: remove particle layers on mobile ── */
if (isMobile) {
  particlesFG?.remove();
  particlesBG?.remove();
  if (bubblesContainer) bubblesContainer.style.display = 'none';
}

/* ══════════════════════════════════════════
   CART SYSTEM
════════════════════════════════════════════ */
function loadCart() {
  try {
    const raw = JSON.parse(localStorage.getItem('sg-cart') || '[]');
    return raw
      .filter(item => item && item.id && PRODUCTS[item.id])
      .map(item => ({
        id: item.id,
        name: PRODUCTS[item.id].name,
        price: PRODUCTS[item.id].price,
        qty: Math.min(Math.max(1, parseInt(item.qty) || 1), 10)
      }));
  } catch { return []; }
}

function saveCart() {
  localStorage.setItem('sg-cart', JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  const total = getCartTotal();

  if (cartCountEl) cartCountEl.textContent = String(count);
  if (cartHeaderCount) cartHeaderCount.textContent = count;
  if (cartBtn) cartBtn.setAttribute('aria-label', `Cart, ${count} item${count !== 1 ? 's' : ''}`);

  const totalEl = document.getElementById('cart-total');
  const grandEl = document.getElementById('cart-grand-total');
  if (totalEl) totalEl.textContent = `₹${total.toLocaleString('en-IN')}`;
  if (grandEl) grandEl.textContent = `₹${total.toLocaleString('en-IN')}`;

  renderCartItems();
  saveCart();
}

function renderCartItems() {
  const itemsEl = document.getElementById('cart-items');
  const emptyEl = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');
  if (!itemsEl) return;

  if (cart.length === 0) {
    if (emptyEl) emptyEl.style.display = 'flex';
    if (footerEl) footerEl.style.display = 'none';
    // Remove old item rows
    itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    return;
  }

  if (emptyEl) emptyEl.style.display = 'none';
  if (footerEl) footerEl.style.display = 'flex';

  // Remove old items
  itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());

  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.dataset.id = item.id;
    div.innerHTML = `
      <div class="cart-item-visual ${PRODUCTS[item.id]?.visual || ''}">
        <span>${item.name.split(' ')[0]}</span>
      </div>
      <div class="cart-item-info">
        <strong>${item.name}</strong>
        <span>200ml</span>
        <div class="cart-item-bottom">
          <div class="cart-qty-ctrl">
            <button class="qty-btn cart-qty-btn" data-action="minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
            <span class="cart-item-qty">${item.qty}</span>
            <button class="qty-btn cart-qty-btn" data-action="plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
          </div>
          <span class="cart-item-price">₹${(item.price * item.qty).toLocaleString('en-IN')}</span>
        </div>
      </div>
      <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M18 6L6 18M6 6l12 12"/>
        </svg>
      </button>
    `;
    itemsEl.appendChild(div);
  });

  // Bind qty buttons
  itemsEl.querySelectorAll('.cart-qty-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      changeCartQty(id, action === 'plus' ? 1 : -1);
    });
  });

  // Bind remove buttons
  itemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      removeFromCart(btn.dataset.id);
    });
  });
}

const MAX_QTY = 5;

function addToCart(productId, qty = 1) {
  const product = PRODUCTS[productId];
  if (!product) return;
  const existing = cart.find(i => i.id === productId);
  if (existing) {
    const newQty = existing.qty + qty;
    if (existing.qty >= MAX_QTY) {
      showToast(`Max ${MAX_QTY} per item allowed`);
      return;
    }
    existing.qty = Math.min(newQty, MAX_QTY);
    if (newQty > MAX_QTY) showToast(`Capped at ${MAX_QTY} — that's the limit!`);
  } else {
    cart.push({ id: productId, name: product.name, price: product.price, qty: Math.min(qty, MAX_QTY) });
  }
  updateCartUI();
}

function changeCartQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  if (delta > 0 && item.qty >= MAX_QTY) {
    showToast(`Max ${MAX_QTY} per item allowed`);
    return;
  }
  item.qty += delta;
  if (item.qty <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
  showToast('Item removed from bag');
}

/* ── Cart drawer open/close ─────────────── */
const cartDrawer  = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartDrawer?.setAttribute('aria-hidden', 'false');
  cartDrawer?.classList.add('is-open');
  cartOverlay?.classList.add('is-visible');
  body.classList.add('cart-open');
}

function closeCart() {
  cartDrawer?.setAttribute('aria-hidden', 'true');
  cartDrawer?.classList.remove('is-open');
  cartOverlay?.classList.remove('is-visible');
  body.classList.remove('cart-open');
}

cartBtn?.addEventListener('click', openCart);
document.getElementById('cart-close-btn')?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

/* ══════════════════════════════════════════════
   CHECKOUT — Real API Flow
   ══════════════════════════════════════════════ */

const API_BASE = 'https://streetgloss-api.radongamingg.workers.dev';

/* ── Open / close checkout form modal ───────── */
function openCheckoutModal() {
  const total = getCartTotal();
  // Update the order summary in the form (textContent only — no innerHTML)
  const fmt = v => `₹${v.toLocaleString('en-IN')}`;
  const sub = document.getElementById('cs-subtotal');
  const tot = document.getElementById('cs-total');
  const amt = document.getElementById('checkout-pay-amount');
  if (sub) sub.textContent = fmt(total);
  if (tot) tot.textContent = fmt(total);
  if (amt) amt.textContent = fmt(total);

  const overlay = document.getElementById('checkout-overlay');
  overlay?.setAttribute('aria-hidden', 'false');
  overlay?.classList.add('is-visible');
  body.classList.add('modal-open');
  document.getElementById('cf-name')?.focus();
}

function closeCheckoutModal() {
  const overlay = document.getElementById('checkout-overlay');
  overlay?.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('is-visible');
  body.classList.remove('modal-open');
  setCheckoutLoading(false);
  clearCheckoutErrors();
}

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length === 0) return;
  closeCart();
  openCheckoutModal();
});

document.getElementById('checkout-modal-close')?.addEventListener('click', closeCheckoutModal);
document.getElementById('checkout-overlay')?.addEventListener('click', e => {
  if (e.target === document.getElementById('checkout-overlay')) closeCheckoutModal();
});

/* ── Field validation helpers ────────────────── */
function setFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) el.textContent = msg;   // textContent only — SECURITY.md §7.4
}

function clearCheckoutErrors() {
  ['err-name','err-phone','err-email','err-address','err-city','err-pincode','err-state','err-global']
    .forEach(id => setFieldError(id, ''));
}

function validateCheckoutForm() {
  clearCheckoutErrors();
  let valid = true;

  const name    = document.getElementById('cf-name')?.value.trim() || '';
  const phone   = document.getElementById('cf-phone')?.value.trim() || '';
  const email   = document.getElementById('cf-email')?.value.trim() || '';
  const address = document.getElementById('cf-address')?.value.trim() || '';
  const city    = document.getElementById('cf-city')?.value.trim() || '';
  const pincode = document.getElementById('cf-pincode')?.value.trim() || '';
  const state   = document.getElementById('cf-state')?.value || '';

  if (!name)                           { setFieldError('err-name',    'Name is required');         valid = false; }
  if (!/^\d{10}$/.test(phone))         { setFieldError('err-phone',   'Enter 10-digit phone');      valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setFieldError('err-email', 'Valid email required'); valid = false; }
  if (!address)                        { setFieldError('err-address',  'Address is required');       valid = false; }
  if (!city)                           { setFieldError('err-city',     'City is required');           valid = false; }
  if (!/^\d{6}$/.test(pincode))        { setFieldError('err-pincode',  'Enter 6-digit pincode');     valid = false; }
  if (!state)                          { setFieldError('err-state',    'Please select a state');     valid = false; }

  return valid ? { name, phone, email, address_line1: address, address_city: city, address_pincode: pincode, address_state: state } : null;
}

/* ── Loading state ───────────────────────────── */
function setCheckoutLoading(on) {
  const btn     = document.getElementById('checkout-pay-btn');
  const label   = document.getElementById('checkout-pay-label');
  const spinner = document.getElementById('checkout-pay-spinner');
  if (btn)     btn.disabled = on;
  if (label)   label.hidden = on;
  if (spinner) spinner.hidden = !on;
}

/* ── Razorpay script loader ──────────────────── */
function loadRazorpay() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

/* ── Show success modal ──────────────────────── */
function showOrderSuccess(orderNumber) {
  // Use textContent — never innerHTML for user/API data (SECURITY.md §7.4)
  const numEl = document.getElementById('order-num-display');
  if (numEl) numEl.textContent = orderNumber;

  const trackLink = document.getElementById('track-order-link');
  if (trackLink) trackLink.href = `track.html`;

  const overlay = document.getElementById('checkout-success-overlay');
  overlay?.setAttribute('aria-hidden', 'false');
  overlay?.classList.add('is-visible');
}

/* ── Main checkout form submit ───────────────── */
document.getElementById('checkout-form')?.addEventListener('submit', async e => {
  e.preventDefault();

  const customer = validateCheckoutForm();
  if (!customer) return;

  setCheckoutLoading(true);
  setFieldError('err-global', '');

  try {
    // Load Razorpay SDK (only when needed)
    const rzpLoaded = await loadRazorpay();
    if (!rzpLoaded) {
      setFieldError('err-global', 'Could not load payment gateway. Please try again.');
      setCheckoutLoading(false);
      return;
    }

    // Step 1: Create order on our Worker
    const createRes = await fetch(`${API_BASE}/api/create-order`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ items: cart, customer }),
    });

    const createData = await createRes.json();
    if (!createRes.ok) {
      setFieldError('err-global', createData.error || 'Could not create order. Please try again.');
      setCheckoutLoading(false);
      return;
    }

    // Step 2: Open Razorpay payment sheet
    const rzp = new window.Razorpay({
      key:         createData.key_id,
      amount:      createData.amount,
      currency:    'INR',
      order_id:    createData.razorpay_order_id,
      name:        'StreetGloss',
      description: 'Premium Car Care',
      prefill: {
        name:    customer.name,
        email:   customer.email,
        contact: customer.phone,
      },
      theme: { color: '#7c3aed' },

      handler: async function(response) {
        // Step 3: Verify payment on our Worker
        try {
          const verifyRes = await fetch(`${API_BASE}/api/verify-payment`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_signature:  response.razorpay_signature,
              customer,
              items:    createData.items,
              subtotal: createData.amount,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            cart = [];
            updateCartUI();
            closeCheckoutModal();
            showOrderSuccess(verifyData.order_number);
          } else {
            setFieldError('err-global', verifyData.error || 'Payment verification failed.');
            setCheckoutLoading(false);
          }
        } catch {
          setFieldError('err-global', 'Network error. Contact us with your payment ID.');
          setCheckoutLoading(false);
        }
      },

      modal: {
        ondismiss: () => setCheckoutLoading(false),
      },
    });

    rzp.open();

  } catch {
    setFieldError('err-global', 'Something went wrong. Please try again.');
    setCheckoutLoading(false);
  }
});

/* ── Success modal close ─────────────────────── */
document.getElementById('checkout-success-close')?.addEventListener('click', () => {
  const overlay = document.getElementById('checkout-success-overlay');
  overlay?.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('is-visible');
});

/* ── Toast ────────────────────────────────── */
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2600);
}

/* ── Nav open / close ─────────────────────── */
function openNav() {
  body.classList.add('nav-open');
  menuToggle?.setAttribute('aria-expanded', 'true');
  mobileNav?.setAttribute('aria-hidden', 'false');
}

function closeNav() {
  body.classList.remove('nav-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  mobileNav?.setAttribute('aria-hidden', 'true');
}

menuToggle?.addEventListener('click', () =>
  body.classList.contains('nav-open') ? closeNav() : openNav()
);

navBackdrop?.addEventListener('click', closeNav);
mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

/* ── Header scroll glass ──────────────────── */
const heroEl = document.querySelector('.hero');
if (heroEl && siteHeader) {
  const obs = new IntersectionObserver(
    ([entry]) => siteHeader.classList.toggle('is-scrolled', !entry.isIntersecting),
    { threshold: 0.05 }
  );
  obs.observe(heroEl);
}

/* ── Product filters ──────────────────────── */
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    chips.forEach(c => c.classList.toggle('is-active', c === chip));
    productCards.forEach(product => {
      const show = filter === 'all' || product.dataset.category === filter;
      product.hidden = !show;
    });
  });
});

/* ── Ripple ───────────────────────────────── */
function addRipple(e, el) {
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = (e.clientX ?? rect.left + rect.width / 2)  - rect.left - size / 2;
  const y = (e.clientY ?? rect.top  + rect.height / 2) - rect.top  - size / 2;
  const wave = document.createElement('span');
  wave.className = 'ripple-wave';
  wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  el.appendChild(wave);
  wave.addEventListener('animationend', () => wave.remove(), { once: true });
}

/* ── Add to cart buttons ──────────────────── */
document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const productId = btn.dataset.productId;
    addToCart(productId);
    showToast(`${PRODUCTS[productId]?.name || 'Product'} added to bag ✓`);
    addRipple(e, btn);
  });
});

/* ── Product card click → modal ───────────── */
productCards.forEach(card => {
  card.addEventListener('click', e => {
    if (e.target.closest('.add-cart')) return; // don't open modal if clicking add-to-cart
    const productId = card.dataset.productId;
    openProductModal(productId);
  });

  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!e.target.closest('.add-cart')) openProductModal(card.dataset.productId);
    }
  });
});

/* ══════════════════════════════════════════
   PRODUCT MODAL
════════════════════════════════════════════ */
const productOverlay  = document.getElementById('product-overlay');
const productModalClose = document.getElementById('product-modal-close');

function openProductModal(productId) {
  const product = PRODUCTS[productId];
  if (!product) return;
  currentProductId = productId;
  modalQty = 1;

  // Fill modal
  document.getElementById('product-modal-title').textContent = product.name;
  document.getElementById('product-modal-tagline').textContent = product.tagline;
  document.getElementById('product-modal-badge').textContent = product.badge;
  document.getElementById('product-modal-rating-text').textContent = `${product.rating} (${product.reviews} reviews)`;
  document.getElementById('product-modal-desc').textContent = product.description;
  document.getElementById('modal-qty').textContent = '1';

  // Price
  const priceEl = document.getElementById('product-modal-price');
  if (product.originalPrice) {
    priceEl.innerHTML = `<span class="sale-price">₹${product.price}</span> <del class="original-price">₹${product.originalPrice}</del>`;
  } else {
    priceEl.innerHTML = `<span class="sale-price">₹${product.price}</span>`;
  }

  // Visual
  const visualEl = document.getElementById('product-modal-visual');
  visualEl.className = `product-modal-visual ${product.visual}`;
  visualEl.innerHTML = `<span>${product.name}</span>`;

  // Specs
  const specsEl = document.getElementById('product-modal-specs');
  specsEl.innerHTML = product.specs.map(s =>
    `<div class="spec-row"><span class="spec-label">${s.label}</span><span class="spec-value">${s.value}</span></div>`
  ).join('');

  productOverlay?.setAttribute('aria-hidden', 'false');
  productOverlay?.classList.add('is-visible');
  body.classList.add('modal-open');
  setTimeout(() => productModalClose?.focus(), 50);
}

function closeProductModal() {
  productOverlay?.setAttribute('aria-hidden', 'true');
  productOverlay?.classList.remove('is-visible');
  body.classList.remove('modal-open');
  currentProductId = null;
}

productModalClose?.addEventListener('click', closeProductModal);
productOverlay?.addEventListener('click', e => {
  if (e.target === productOverlay) closeProductModal();
});

// Modal qty controls
document.getElementById('qty-minus')?.addEventListener('click', () => {
  if (modalQty > 1) { modalQty--; document.getElementById('modal-qty').textContent = modalQty; }
});
document.getElementById('qty-plus')?.addEventListener('click', () => {
  if (modalQty < MAX_QTY) {
    modalQty++;
    document.getElementById('modal-qty').textContent = modalQty;
  } else {
    showToast(`Max ${MAX_QTY} per item allowed`);
  }
});

// Add from modal
document.getElementById('product-modal-add-btn')?.addEventListener('click', e => {
  if (!currentProductId) return;
  addToCart(currentProductId, modalQty);
  showToast(`${PRODUCTS[currentProductId]?.name} ×${modalQty} added to bag ✓`);
  addRipple(e, e.currentTarget);
  closeProductModal();
  setTimeout(() => openCart(), 300);
});

/* ── Variant hero switcher ────────────────── */
variantCards.forEach(card => {
  card.addEventListener('click', () => {
    if (isSwitching) return;
    variantCards.forEach(c => c.classList.toggle('active', c === card));
    switchTheme(card.dataset.theme);
  });
});

function switchTheme(theme) {
  isSwitching = true;
  const isFoam = theme === 'foam';
  const label = heroProduct?.querySelector('.bottle-label strong');
  const sub   = heroProduct?.querySelector('.bottle-label em');

  const applyTheme = () => {
    body.classList.toggle('foam-theme', isFoam);
    if (label) label.innerHTML = isFoam ? 'Cerami<br>Wash' : 'Gloss<br>Max';
    if (sub)   sub.textContent = isFoam ? 'Ceramic Infused / 200ml' : 'Universal Polish / 200ml';
  };

  if (window.gsap && !isReduced) {
    const obj = { val: 0 };
    gsap.to(obj, {
      val: 360, duration: 0.38, ease: 'power2.in',
      onUpdate() {
        switchSpin = obj.val;
      },
      onComplete() {
        applyTheme();
        gsap.to(obj, {
          val: 720, duration: 0.95, ease: 'back.out(0.75)',
          onUpdate() {
            switchSpin = obj.val;
          },
          onComplete() {
            switchSpin = 0;
            isSwitching = false;
          },
        });
      },
    });
  } else {
    applyTheme();
    setTimeout(() => { isSwitching = false; }, 300);
  }
}

/* ══════════════════════════════════════════
   CONTACT MODAL
════════════════════════════════════════════ */
function openModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay?.setAttribute('aria-hidden', 'false');
  overlay?.classList.add('is-visible');
  body.classList.add('modal-open');
}

function closeModal(overlayId) {
  const overlay = document.getElementById(overlayId);
  overlay?.setAttribute('aria-hidden', 'true');
  overlay?.classList.remove('is-visible');
  body.classList.remove('modal-open');
}

// Contact links
['desk-contact-link', 'mob-contact-link', 'contact-link'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', e => {
    e.preventDefault();
    openModal('contact-overlay');
    document.getElementById('contact-subject').value = '';
    document.getElementById('bug-details-label').style.display = 'none';
  });
});

// Bug report direct
document.getElementById('bug-report-link')?.addEventListener('click', e => {
  e.preventDefault();
  openModal('contact-overlay');
  setTimeout(() => {
    document.getElementById('contact-subject').value = 'bug';
    document.getElementById('bug-details-label').style.display = 'flex';
  }, 50);
});

document.getElementById('contact-modal-close')?.addEventListener('click', () => closeModal('contact-overlay'));
document.getElementById('contact-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'contact-overlay') closeModal('contact-overlay');
});

// Bug report toggle
document.getElementById('contact-subject')?.addEventListener('change', e => {
  const bugLabel = document.getElementById('bug-details-label');
  if (bugLabel) bugLabel.style.display = e.target.value === 'bug' ? 'flex' : 'none';
});

// Contact form submit
document.getElementById('contact-form')?.addEventListener('submit', e => {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('contact-form-note');
  const btn  = document.getElementById('contact-submit');

  if (!form.checkValidity()) {
    if (note) {
      note.textContent = '❌ Please fill out all required fields correctly.';
      note.style.color = '#f87171';
    }
    return;
  }

  if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
  setTimeout(() => {
    if (note) {
      note.textContent = '✅ Message sent! We\'ll get back to you within 24 hours.';
      note.style.color = 'var(--success)';
    }
    if (btn) { btn.textContent = 'Send Message →'; btn.disabled = false; }
    form.reset();
    const bugDetails = document.getElementById('bug-details-label');
    if (bugDetails) bugDetails.style.display = 'none';
    setTimeout(() => { if (note) note.textContent = ''; }, 5000);
  }, 1200);
});

/* ══════════════════════════════════════════
   PRIVACY POLICY MODAL
════════════════════════════════════════════ */
['privacy-link', 'privacy-link-2', 'cookie-privacy-link'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', e => {
    e.preventDefault();
    openModal('privacy-overlay');
  });
});
document.getElementById('privacy-modal-close')?.addEventListener('click', () => closeModal('privacy-overlay'));
document.getElementById('privacy-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'privacy-overlay') closeModal('privacy-overlay');
});

/* ══════════════════════════════════════════
   TERMS MODAL
════════════════════════════════════════════ */
['terms-link', 'terms-link-2'].forEach(id => {
  document.getElementById(id)?.addEventListener('click', e => {
    e.preventDefault();
    openModal('terms-overlay');
  });
});
document.getElementById('terms-modal-close')?.addEventListener('click', () => closeModal('terms-overlay'));
document.getElementById('terms-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'terms-overlay') closeModal('terms-overlay');
});

/* ══════════════════════════════════════════
   COOKIE CONSENT
════════════════════════════════════════════ */
const cookieBanner = document.getElementById('cookie-banner');

function showCookieBanner() {
  const consent = localStorage.getItem('sg-cookie-consent');
  if (!consent && cookieBanner) {
    setTimeout(() => cookieBanner.classList.add('is-visible'), 1500);
  }
}

function hideCookieBanner() {
  cookieBanner?.classList.remove('is-visible');
}

document.getElementById('cookie-accept-btn')?.addEventListener('click', () => {
  localStorage.setItem('sg-cookie-consent', JSON.stringify({ essential: true, analytics: true, marketing: true }));
  hideCookieBanner();
  showToast('Cookie preferences saved ✓');
});

document.getElementById('cookie-manage-btn')?.addEventListener('click', () => {
  openModal('cookie-manage-overlay');
});

document.getElementById('cookie-manage-close')?.addEventListener('click', () => closeModal('cookie-manage-overlay'));
document.getElementById('cookie-manage-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'cookie-manage-overlay') closeModal('cookie-manage-overlay');
});

document.getElementById('cookie-save-btn')?.addEventListener('click', () => {
  const analytics = document.getElementById('analytics-toggle')?.checked;
  const marketing = document.getElementById('marketing-toggle')?.checked;
  localStorage.setItem('sg-cookie-consent', JSON.stringify({ essential: true, analytics, marketing }));
  closeModal('cookie-manage-overlay');
  hideCookieBanner();
  showToast('Cookie preferences saved ✓');
});

showCookieBanner();

/* ══════════════════════════════════════════
   FIND YOUR KIT MODAL
════════════════════════════════════════════ */
const kitSteps = [
  {
    question: 'What\'s your primary goal?',
    options: [
      { label: '✨ Maximum Gloss', value: 'gloss' },
      { label: '🛡️ Long-lasting Protection', value: 'protect' },
      { label: '🧼 Deep Clean', value: 'clean' },
      { label: '🌫️ Keep Matte Finish', value: 'matte' },
    ]
  },
  {
    question: 'How often do you wash your car?',
    options: [
      { label: '🗓️ Weekly', value: 'weekly' },
      { label: '📅 Bi-weekly', value: 'biweekly' },
      { label: '🌙 Monthly', value: 'monthly' },
    ]
  }
];

const kitRecs = {
  gloss:   ['gloss-max', 'ocean-wash'],
  protect: ['stealth-coat', 'cerami-wash'],
  clean:   ['acid-foam', 'sunset-foam'],
  matte:   ['stealth-coat', 'cerami-wash'],
};

let kitStep = 0;
let kitAnswers = [];

document.getElementById('find-kit-btn')?.addEventListener('click', () => {
  kitStep = 0;
  kitAnswers = [];
  renderKitStep();
  openModal('kit-overlay');
});
document.getElementById('kit-modal-close')?.addEventListener('click', () => closeModal('kit-overlay'));
document.getElementById('kit-overlay')?.addEventListener('click', e => {
  if (e.target.id === 'kit-overlay') closeModal('kit-overlay');
});

function renderKitStep() {
  const content = document.getElementById('kit-modal-content');
  if (!content) return;

  if (kitStep < kitSteps.length) {
    const step = kitSteps[kitStep];
    content.innerHTML = `
      <div class="kit-progress">Step ${kitStep + 1} of ${kitSteps.length}</div>
      <h2 class="kit-question">${step.question}</h2>
      <div class="kit-options">
        ${step.options.map(o => `
          <button class="kit-option-btn" data-value="${o.value}" type="button">${o.label}</button>
        `).join('')}
      </div>
    `;
    content.querySelectorAll('.kit-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        kitAnswers.push(btn.dataset.value);
        kitStep++;
        renderKitStep();
      });
    });
  } else {
    const goal = kitAnswers[0];
    const recs = kitRecs[goal] || ['gloss-max', 'cerami-wash'];
    content.innerHTML = `
      <div class="kit-result">
        <div class="kit-result-icon">🎯</div>
        <h2>Your Perfect Kit</h2>
        <p>Based on your answers, we recommend:</p>
        <div class="kit-rec-products">
          ${recs.map(id => {
            const p = PRODUCTS[id];
            return `
              <div class="kit-rec-card">
                <div class="kit-rec-visual ${p.visual}"><span>${p.name.split(' ')[0]}</span></div>
                <strong>${p.name}</strong>
                <span>₹${p.price}</span>
                <button class="button button-primary kit-add-btn" data-id="${id}" type="button">Add to Bag</button>
              </div>
            `;
          }).join('')}
        </div>
        <button class="button button-secondary kit-restart-btn" type="button">Start Over</button>
      </div>
    `;
    content.querySelectorAll('.kit-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        addToCart(btn.dataset.id);
        showToast(`${PRODUCTS[btn.dataset.id]?.name} added to bag ✓`);
      });
    });
    content.querySelector('.kit-restart-btn')?.addEventListener('click', () => {
      kitStep = 0;
      kitAnswers = [];
      renderKitStep();
    });
  }
}

/* ── Newsletter ───────────────────────────── */
newsletter?.addEventListener('submit', async e => {
  e.preventDefault();
  const note = newsletter.querySelector('.form-note');
  const emailInput = document.getElementById('newsletter-email');
  const email = emailInput?.value.trim() || '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    if (note) {
      note.textContent = '❌ Please enter a valid email address';
      note.style.color = '#f87171';
    }
    return;
  }

  const btn = newsletter.querySelector('button[type="submit"]');
  if (btn) btn.disabled = true;
  if (note) {
    note.textContent = 'Subscribing…';
    note.style.color = 'var(--muted)';
  }

  try {
    const res = await fetch(`${API_BASE}/api/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      if (note) {
        note.textContent = '🎉 ' + data.message;
        note.style.color = '#4ade80';
      }
      newsletter.reset();
    } else {
      if (note) {
        note.textContent = '❌ ' + (data.error || 'Subscription failed. Please try again.');
        note.style.color = '#f87171';
      }
    }
  } catch {
    if (note) {
      note.textContent = '❌ Connection error. Please try again later.';
      note.style.color = '#f87171';
    }
  } finally {
    if (btn) btn.disabled = false;
  }
});

/* ── Global ESC key ───────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeProductModal();
  closeModal('contact-overlay');
  closeModal('privacy-overlay');
  closeModal('terms-overlay');
  closeModal('cookie-manage-overlay');
  closeModal('kit-overlay');
  closeCart();
});

/* ── Mouse tracking (desktop only) ───────── */

// Particle state stored in plain objects — avoids expensive dataset string read/write every frame
const particleState = [];
const PARTICLE_DURATIONS = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10, 8.5];

// Cache particle viewport positions once — eliminates getBoundingClientRect() from the RAF loop.
// Only re-read on resize (debounced). This is the single biggest perf fix.
function cacheParticlePositions() {
  if (isMobile || isReduced) return;
  particles.forEach((p, i) => {
    // Temporarily zero out transform so we get the base CSS position, not the animated offset
    const saved = p.style.transform;
    p.style.transform = 'none';
    const rect = p.getBoundingClientRect();
    particleState[i] = particleState[i] || { rx: 0, ry: 0, angle: Math.random() * 360 };
    particleState[i].baseCx = rect.left + rect.width  / 2;
    particleState[i].baseCy = rect.top  + rect.height / 2;
    p.style.transform = saved;
  });
}

if (!isMobile && !isReduced) {
  mouse.px = window.innerWidth  / 2;
  mouse.py = window.innerHeight / 2;

  // Call once after layout settles
  requestAnimationFrame(cacheParticlePositions);

  // Re-cache on resize — debounced to avoid thrash
  let _resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(cacheParticlePositions, 250);
  }, { passive: true });

  // Throttle mousemove through a RAF flag — prevents event-loop flooding
  let _mousePending = false;
  window.addEventListener('mousemove', e => {
    mouse.px = e.clientX;
    mouse.py = e.clientY;
    if (!_mousePending) {
      _mousePending = true;
      requestAnimationFrame(() => {
        mouse.x = mouse.px / window.innerWidth  - 0.5;
        mouse.y = mouse.py / window.innerHeight - 0.5;
        _mousePending = false;
      });
    }
  }, { passive: true });
}

/* ── Pause animation when page/hero not visible ── */
let _heroVisible  = true;
let _pageVisible  = !document.hidden;
let isRunning = false;
let scrollY = 0;

if (isMobile) {
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  }, { passive: true });
}

function startAnimation() {
  if (isReduced || !_pageVisible || !_heroVisible) return;
  if (!isRunning) {
    isRunning = true;
    animate();
  }
}

function stopAnimation() {
  if (isRunning) {
    isRunning = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
}

// Stop RAF when browser tab is backgrounded
document.addEventListener('visibilitychange', () => {
  _pageVisible = !document.hidden;
  if (_pageVisible) {
    if (!isReduced) {
      if (!isMobile) requestAnimationFrame(cacheParticlePositions);
      startAnimation();
    }
  } else {
    stopAnimation();
  }
});

// Pause particle animation when hero scrolls out of view
if (heroEl && !isReduced) {
  new IntersectionObserver(
    ([e]) => {
      _heroVisible = e.isIntersecting;
      if (_heroVisible) {
        startAnimation();
      } else {
        stopAnimation();
      }
    },
    { threshold: 0 }
  ).observe(heroEl);
}

/* ── Animation loop ───────────────────────── */
function animate() {
  if (!isRunning) return;

  const time = Date.now() * 0.001;

  currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
  currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

  // 3-D bottle tilt — single style write per frame, cheap
  if (heroProduct && _heroVisible) {
    let ry, rx;
    if (isMobile) {
      ry = (scrollY * 0.06) + switchSpin;
      rx = Math.sin(scrollY * 0.003) * 6;
    } else {
      ry = currentMouse.x * 34 + switchSpin;
      rx = currentMouse.y * -16;
    }
    heroProduct.style.transform = `rotateZ(-8deg) rotateY(${ry}deg) rotateX(${rx}deg)`;
  }

  // Parallax layers — only when hero is visible
  if (_heroVisible) {
    if (particlesFG) particlesFG.style.transform = `translate(${currentMouse.x * 50}px,${currentMouse.y * 50}px)`;
    if (particlesBG) particlesBG.style.transform = `translate(${currentMouse.x * -22}px,${currentMouse.y * -22}px)`;
  }

  // Particle orbits — only when hero visible and positions cached
  if (!isSwitching && _heroVisible && particleState.length === particles.length) {
    particles.forEach((p, i) => {
      const ps = particleState[i];
      if (!ps || ps.baseCx === undefined) return; // not yet cached

      // Proximity calc uses cached positions — zero getBoundingClientRect() calls!
      const dx     = mouse.px - ps.baseCx;
      const dy     = mouse.py - ps.baseCy;
      const distSq = dx * dx + dy * dy;

      let trx = 0, try_ = 0, speed = 1;
      if (distSq < 115600) { // 340px squared
        const dist = Math.sqrt(distSq) || 1;
        const f    = (340 - dist) / 340;
        trx        = (dx / dist) * f * -68;
        try_       = (dy / dist) * f * -68;
        speed      = 1 + f * 4;
      }

      // Lerp in plain object — no string parsing, no dataset writes
      ps.rx    += (trx   - ps.rx)    * 0.1;
      ps.ry    += (try_  - ps.ry)    * 0.1;
      ps.angle += 0.15 * speed;

      const phase  = (time + i * 0.7) * ((Math.PI * 2) / PARTICLE_DURATIONS[i % PARTICLE_DURATIONS.length]);
      const floatY = Math.sin(phase) * 13;
      const floatA = Math.cos(phase) * 5;

      // Single transform write per particle — GPU compositor handles it
      p.style.transform = `translate(${ps.rx}px,${ps.ry + floatY}px) rotate(${ps.angle + floatA}deg)`;
    });
  }

  rafId = requestAnimationFrame(animate);
}

/* ── Bubbles (desktop only) ───────────────── */
// Spawn less frequently and limit max count to prevent DOM bloat
const MAX_BUBBLES = 12;
function spawnBubble() {
  if (!bubblesContainer || isMobile || !_pageVisible || !_heroVisible) return;
  if (bubblesContainer.children.length >= MAX_BUBBLES) return;
  const b   = document.createElement('span');
  b.className = 'bubble';
  const size = Math.random() * 20 + 7;
  const dur  = Math.random() * 6 + 4;
  b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${dur}s`;
  bubblesContainer.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000);
}

/* ── Init ─────────────────────────────────── */
updateCartUI();
startAnimation();
// Spawn bubbles at 1200ms (was 500ms) — reduces constant DOM mutations by 60%
if (!isMobile) setInterval(spawnBubble, 1200);
