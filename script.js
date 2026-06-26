const body = document.body;
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".primary-nav");
const chips = document.querySelectorAll(".chip");
const products = document.querySelectorAll(".product-card");
const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
const newsletter = document.querySelector(".newsletter");
const heroProduct = document.querySelector("#hero-product");
const particlesFG = document.querySelector(".particle-layer-fg");
const particlesBG = document.querySelector(".particle-layer-bg");
const particles = document.querySelectorAll(".particle");
const variantCards = document.querySelectorAll(".variant-card");
const bubblesContainer = document.querySelector("#bubbles-container");
let cartItems = 0;
let toastTimer;
let isSwitching = false;
let switchSpin = 0;
let mouse = { x: 0, y: 0, px: window.innerWidth / 2, py: window.innerHeight / 2 };
let currentMouse = { x: 0, y: 0 };

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }
});

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const filter = chip.dataset.filter;
    chips.forEach((item) => item.classList.toggle("is-active", item === chip));

    products.forEach((product) => {
      const isVisible = filter === "all" || product.dataset.category === filter;
      product.hidden = !isVisible;
    });
  });
});

document.querySelectorAll(".add-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".product-card");
    const productName = product?.dataset.name || "Product";
    cartItems += 1;
    cartCount.textContent = String(cartItems);
    showToast(`${productName} added to bag`);
  });
});

newsletter?.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const note = form.querySelector(".form-note");
  if (note) {
    note.textContent = "You're on the StreetGloss list.";
  }
  form.reset();
});

particles.forEach((particle) => {
  particle.dataset.rx = "0";
  particle.dataset.ry = "0";
  particle.dataset.angle = String(Math.random() * 360);
  particle.dataset.baseX = "0";
  particle.dataset.baseY = "0";
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = event.clientY / window.innerHeight - 0.5;
  mouse.px = event.clientX;
  mouse.py = event.clientY;
});

window.addEventListener(
  "touchmove",
  (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    mouse.x = touch.clientX / window.innerWidth - 0.5;
    mouse.y = touch.clientY / window.innerHeight - 0.5;
    mouse.px = touch.clientX;
    mouse.py = touch.clientY;
  },
  { passive: true },
);

variantCards.forEach((card) => {
  card.addEventListener("click", () => {
    if (isSwitching) return;
    variantCards.forEach((item) => item.classList.toggle("active", item === card));
    switchTheme(card.dataset.theme);
  });
});

function switchTheme(theme) {
  isSwitching = true;
  const isFoam = theme === "foam";
  const targetColors = isFoam
    ? { inner: "#6559ff", mid: "#1b2450", outer: "#080b16" }
    : { inner: "#5f2fd6", mid: "#251337", outer: "#0c0912" };

  if (window.gsap) {
    gsap.to(body, {
      "--bg-inner": targetColors.inner,
      "--bg-mid": targetColors.mid,
      "--bg-outer": targetColors.outer,
      duration: 1.3,
      ease: "power2.inOut",
    });

    const spinObj = { val: 0, blur: 0 };
    gsap.to(spinObj, {
      val: 360,
      blur: 12,
      duration: 0.45,
      ease: "power2.in",
      onUpdate: () => {
        switchSpin = spinObj.val;
        heroProduct.style.filter = `drop-shadow(0 44px 56px rgba(0, 0, 0, 0.45)) blur(${spinObj.blur}px)`;
      },
      onComplete: () => {
        body.classList.toggle("foam-theme", isFoam);
        document.querySelector(".bottle-label strong").innerHTML = isFoam ? "Wash<br>Foam" : "Ceramic<br>Cleaner";
        document.querySelector(".bottle-label em").textContent = isFoam ? "pH-balanced foam / 1L" : "SiO2 gloss prep / 500ml";
        gsap.to(spinObj, {
          val: 720,
          blur: 0,
          duration: 1.05,
          ease: "back.out(0.7)",
          onUpdate: () => {
            switchSpin = spinObj.val;
            heroProduct.style.filter = `drop-shadow(0 44px 56px rgba(0, 0, 0, 0.45)) blur(${spinObj.blur}px)`;
          },
          onComplete: () => {
            switchSpin = 0;
            heroProduct.style.filter = "";
            isSwitching = false;
          },
        });
      },
    });

    particles.forEach((particle) => {
      const rect = particle.getBoundingClientRect();
      const centerX = window.innerWidth / 2 - rect.left - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.top - rect.height / 2;
      const startAngle = parseFloat(particle.dataset.angle) || 0;
      const nextBaseX = (Math.random() - 0.5) * 200;
      const nextBaseY = (Math.random() - 0.5) * 200;

      gsap
        .timeline()
        .to(particle, {
          x: centerX,
          y: centerY,
          rotation: startAngle + 45,
          scale: 0.12,
          opacity: 0,
          duration: 0.45,
          ease: "power2.in",
        })
        .to(particle, { duration: 0.2 })
        .to(particle, {
          x: nextBaseX,
          y: nextBaseY,
          rotation: startAngle + 90,
          scale: 1,
          opacity: 1,
          duration: 0.85,
          ease: "back.out(1.5)",
          onComplete: () => {
            particle.dataset.angle = String(startAngle + 90);
            particle.dataset.baseX = String(nextBaseX);
            particle.dataset.baseY = String(nextBaseY);
            particle.dataset.rx = "0";
            particle.dataset.ry = "0";
          },
        });
    });
  } else {
    body.classList.toggle("foam-theme", isFoam);
    window.setTimeout(() => {
      isSwitching = false;
    }, 600);
  }
}

function animate() {
  const time = Date.now() * 0.001;
  currentMouse.x += (mouse.x - currentMouse.x) * 0.05;
  currentMouse.y += (mouse.y - currentMouse.y) * 0.05;

  if (heroProduct) {
    const rotateY = currentMouse.x * 36 + switchSpin;
    const rotateX = currentMouse.y * -18;
    heroProduct.style.transform = `rotateZ(-8deg) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
  }

  if (particlesFG) {
    particlesFG.style.transform = `translate(${currentMouse.x * 58}px, ${currentMouse.y * 58}px)`;
  }
  if (particlesBG) {
    particlesBG.style.transform = `translate(${currentMouse.x * -28}px, ${currentMouse.y * -28}px)`;
  }

  if (!isSwitching) {
    particles.forEach((particle, index) => {
      const rect = particle.getBoundingClientRect();
      const particleX = rect.left + rect.width / 2;
      const particleY = rect.top + rect.height / 2;
      const diffX = mouse.px - particleX;
      const diffY = mouse.py - particleY;
      const distance = Math.max(1, Math.sqrt(diffX * diffX + diffY * diffY));

      let targetRx = 0;
      let targetRy = 0;
      let speedMult = 1;

      if (distance < 360) {
        const force = (360 - distance) / 360;
        targetRx = (diffX / distance) * force * -76;
        targetRy = (diffY / distance) * force * -76;
        speedMult = 1 + force * 5;
      }

      let rx = parseFloat(particle.dataset.rx) || 0;
      let ry = parseFloat(particle.dataset.ry) || 0;
      let angle = parseFloat(particle.dataset.angle) || 0;
      const baseX = parseFloat(particle.dataset.baseX) || 0;
      const baseY = parseFloat(particle.dataset.baseY) || 0;

      rx += (targetRx - rx) * 0.1;
      ry += (targetRy - ry) * 0.1;
      angle += 0.18 * speedMult;

      particle.dataset.rx = String(rx);
      particle.dataset.ry = String(ry);
      particle.dataset.angle = String(angle);

      const durations = [5, 7, 6, 8, 5.5, 6.5, 9, 11, 10, 8.5];
      const phase = (time + index * 0.7) * ((Math.PI * 2) / durations[index % durations.length]);
      const floatY = Math.sin(phase) * 15;
      const floatAngle = Math.cos(phase) * 6;

      particle.style.transform = `translate(${rx + baseX}px, ${ry + baseY + floatY}px) rotate(${angle + floatAngle}deg)`;
    });
  }

  requestAnimationFrame(animate);
}

function createBubble() {
  if (!bubblesContainer) return;
  const bubble = document.createElement("span");
  bubble.className = "bubble";
  const size = Math.random() * 22 + 10;
  const duration = Math.random() * 6 + 4;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * 100}%`;
  bubble.style.opacity = `${Math.random() * 0.4 + 0.2}`;
  bubble.style.animationDuration = `${duration}s`;
  bubblesContainer.appendChild(bubble);
  window.setTimeout(() => bubble.remove(), duration * 1000);
}

animate();
window.setInterval(createBubble, 400);
