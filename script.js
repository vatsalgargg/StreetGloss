'use strict';

/* ══════════════════════════════════════════════
   STREETGLOSS — Optimised JS
   Mobile-first: kills expensive effects on touch
   ══════════════════════════════════════════════ */

/* ── Device detection ─────────────────────── */
const isMobile   = window.matchMedia('(pointer: coarse)').matches;
const isReduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── DOM refs ─────────────────────────────── */
const body             = document.body;
const menuToggle       = document.querySelector('.menu-toggle');
const mobileNav        = document.querySelector('.mobile-nav');
const navBackdrop      = document.querySelector('.nav-backdrop');
const chips            = document.querySelectorAll('.chip');
const products         = document.querySelectorAll('.product-card');
const cartBtn          = document.querySelector('.cart-button');
const cartCountEl      = document.querySelector('.cart-count');
const toast            = document.querySelector('.toast');
const newsletter       = document.querySelector('.newsletter');
const heroProduct      = document.querySelector('#hero-product');
const particlesFG      = document.querySelector('.particle-layer-fg');
const particlesBG      = document.querySelector('.particle-layer-bg');
const particles        = document.querySelectorAll('.particle');
const variantCards     = document.querySelectorAll('.variant-card');
const bubblesContainer = document.querySelector('#bubbles-container');
const siteHeader       = document.querySelector('.site-header');

let cartItems   = 0;
let toastTimer  = null;
let isSwitching = false;
let switchSpin  = 0;
let rafId       = null;

const mouse        = { x: 0, y: 0, px: 0, py: 0 };
const currentMouse = { x: 0, y: 0 };

/* ── Perf: remove particle layers on mobile ─── */
if (isMobile) {
  particlesFG?.remove();
  particlesBG?.remove();
  if (bubblesContainer) bubblesContainer.style.display = 'none';
}

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

mobileNav?.querySelectorAll('a').forEach(link =>
  link.addEventListener('click', closeNav)
);

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
    products.forEach(product => {
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

/* ── Add to cart ──────────────────────────── */
document.querySelectorAll('.add-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = btn.closest('.product-card');
    const name = card?.dataset.name ?? 'Product';
    cartItems++;
    if (cartCountEl) cartCountEl.textContent = String(cartItems);
    if (cartBtn)     cartBtn.setAttribute('aria-label', `Cart, ${cartItems} item${cartItems !== 1 ? 's' : ''}`);
    showToast(`${name} added to bag ✓`);
    addRipple(e, btn);
  });
});

/* ── Newsletter ───────────────────────────── */
newsletter?.addEventListener('submit', e => {
  e.preventDefault();
  const note = newsletter.querySelector('.form-note');
  if (note) note.textContent = "You're on the StreetGloss list! 🎉";
  newsletter.reset();
});

/* ── Variant theme switcher ───────────────── */
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
  const label  = heroProduct?.querySelector('.bottle-label strong');
  const sub    = heroProduct?.querySelector('.bottle-label em');

  const applyTheme = () => {
    body.classList.toggle('foam-theme', isFoam);
    if (label) label.innerHTML = isFoam ? 'Cerami<br>Wash' : 'Gloss<br>Max';
    if (sub)   sub.textContent = isFoam ? 'Ceramic Infused / 200ml' : 'Universal Polish / 200ml';
  };

  if (window.gsap && !isReduced && !isMobile) {
    const obj = { val: 0, blur: 0 };
    gsap.to(obj, {
      val: 360, blur: 10, duration: 0.38, ease: 'power2.in',
      onUpdate() {
        switchSpin = obj.val;
        if (heroProduct) heroProduct.style.filter = `drop-shadow(0 38px 48px rgba(0,0,0,0.44)) blur(${obj.blur}px)`;
      },
      onComplete() {
        applyTheme();
        gsap.to(obj, {
          val: 720, blur: 0, duration: 0.95, ease: 'back.out(0.75)',
          onUpdate() {
            switchSpin = obj.val;
            if (heroProduct) heroProduct.style.filter = `drop-shadow(0 38px 48px rgba(0,0,0,0.44)) blur(${obj.blur}px)`;
          },
          onComplete() {
            switchSpin = 0;
            if (heroProduct) heroProduct.style.filter = '';
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

/* ── Mouse tracking (desktop only) ───────── */
if (!isMobile && !isReduced) {
  mouse.px = window.innerWidth / 2;
  mouse.py = window.innerHeight / 2;

  particles.forEach(p => {
    p.dataset.rx    = '0';
    p.dataset.ry    = '0';
    p.dataset.angle = String(Math.random() * 360);
    p.dataset.baseX = '0';
    p.dataset.baseY = '0';
  });

  window.addEventListener('mousemove', e => {
    mouse.x  = e.clientX / window.innerWidth  - 0.5;
    mouse.y  = e.clientY / window.innerHeight - 0.5;
    mouse.px = e.clientX;
    mouse.py = e.clientY;
  }, { passive: true });
}

/* ── Animation loop ───────────────────────── */
function animate() {
  rafId = requestAnimationFrame(animate);
  if (isMobile || isReduced) return;          // ← bail on mobile

  const time = Date.now() * 0.001;

  /* Smooth mouse lerp */
  currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
  currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

  /* 3-D bottle tilt */
  if (heroProduct) {
    const ry = currentMouse.x * 34 + switchSpin;
    const rx = currentMouse.y * -16;
    heroProduct.style.transform = `rotateZ(-8deg) rotateY(${ry}deg) rotateX(${rx}deg)`;
  }

  /* Parallax particle layers */
  if (particlesFG) particlesFG.style.transform = `translate(${currentMouse.x * 50}px,${currentMouse.y * 50}px)`;
  if (particlesBG) particlesBG.style.transform = `translate(${currentMouse.x * -22}px,${currentMouse.y * -22}px)`;

  /* Individual particle orbits */
  if (!isSwitching) {
    const durations = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10, 8.5];

    particles.forEach((p, i) => {
      const rect  = p.getBoundingClientRect();
      const px    = rect.left + rect.width  / 2;
      const py    = rect.top  + rect.height / 2;
      const dx    = mouse.px - px;
      const dy    = mouse.py - py;
      const dist  = Math.max(1, Math.hypot(dx, dy));

      let trx = 0, try_ = 0, speed = 1;
      if (dist < 340) {
        const f = (340 - dist) / 340;
        trx   = (dx / dist) * f * -68;
        try_  = (dy / dist) * f * -68;
        speed = 1 + f * 4;
      }

      let rx    = parseFloat(p.dataset.rx)    || 0;
      let ry    = parseFloat(p.dataset.ry)    || 0;
      let angle = parseFloat(p.dataset.angle) || 0;
      const bx  = parseFloat(p.dataset.baseX) || 0;
      const by  = parseFloat(p.dataset.baseY) || 0;

      rx    += (trx   - rx)    * 0.1;
      ry    += (try_  - ry)    * 0.1;
      angle += 0.15 * speed;

      p.dataset.rx    = String(rx);
      p.dataset.ry    = String(ry);
      p.dataset.angle = String(angle);

      const phase  = (time + i * 0.7) * ((Math.PI * 2) / durations[i % durations.length]);
      const floatY = Math.sin(phase) * 13;
      const floatA = Math.cos(phase) * 5;

      p.style.transform = `translate(${rx + bx}px,${ry + by + floatY}px) rotate(${angle + floatA}deg)`;
    });
  }
}

/* ── Bubbles (desktop only) ───────────────── */
function spawnBubble() {
  if (!bubblesContainer || isMobile) return;
  const b    = document.createElement('span');
  b.className = 'bubble';
  const size = Math.random() * 20 + 7;
  const dur  = Math.random() * 6 + 4;
  b.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;animation-duration:${dur}s`;
  bubblesContainer.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000);
}

/* ── Start ────────────────────────────────── */
animate();
if (!isMobile) setInterval(spawnBubble, 500);
