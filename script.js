/* ═══════════════════════════════════════════
   DISH STUDIO — Script
   ═══════════════════════════════════════════ */

// ─── Dish Data ────────────────────────────────────────────
const dishes = [
  {
    id: 'bulgogi',
    titleTop: 'Korean',
    titleBottom: 'Bulgogi Bowl',
    image: 'images/dish-bulgogi.png',
    rating: '4.9',
    chef: 'Chef Min-Jun K.',
    description: 'Tender marinated beef, steamed rice, caramelised onions, sesame seeds and spring onions — a bold, satisfying Korean classic done right.',
    chefNote: 'A bold Korean classic — marinated beef, sesame, and rice perfectly balanced with house-pickled garnish.',
    ingredients: 'Sliced beef, jasmine rice, soy-sesame marinade, spring onions, toasted sesame, pickled daikon — slow-cooked to perfection.',
    tags: ['Best Seller', 'Korean Classic', 'Rich & Bold'],
    style: 'Korean',
    course: 'Main',
    texture: 'Tender',
    serving: 'Hot',
    price: 65,
  },
  {
    id: 'noodle',
    titleTop: 'Noodle',
    titleBottom: 'Greens Base',
    image: 'images/dish-noodle.png',
    rating: '4.6',
    chef: 'Chef Yuki T.',
    description: 'Clean, light and versatile — springy egg noodles with fresh crisp lettuce, served as a pure base ready for your favourite toppings.',
    chefNote: 'The blank canvas of our menu. Pure, bouncy noodles paired with fresh greens for those who love simplicity.',
    ingredients: 'Fresh egg noodles, crisp iceberg lettuce, light sesame oil, sea salt — minimal, honest, and clean.',
    tags: ['Clean & Light', 'Customisable', 'Vegetarian'],
    style: 'Minimal',
    course: 'Base',
    texture: 'Springy',
    serving: 'Warm',
    price: 35,
  },
  {
    id: 'lomein',
    titleTop: 'Shrimp',
    titleBottom: 'Lo Mein',
    image: 'images/dish-lomein.png',
    rating: '4.8',
    chef: 'Chef Hai W.',
    description: 'Wok-tossed egg noodles with juicy tiger shrimp, snow peas, mushrooms, carrot ribbons and red chilli — fragrant, fiery and full of character.',
    chefNote: 'High-heat wok magic — every strand coated in savoury umami, every shrimp perfectly blistered and sweet.',
    ingredients: 'Tiger shrimp, egg noodles, snow peas, shiitake mushroom, red bell pepper, oyster sauce, garlic, sesame oil.',
    tags: ['Wok-Fired', 'Seafood', 'Chef Pick'],
    style: 'Chinese',
    course: 'Main',
    texture: 'Silky',
    serving: 'Hot',
    price: 55,
  },
  {
    id: 'tofu',
    titleTop: 'Low Carb',
    titleBottom: 'Tofu Box',
    image: 'images/dish-tofu.png',
    rating: '4.7',
    chef: 'Chef Priya N.',
    description: 'Golden spiced tofu slabs over delicate noodles with steamed bok choy — the ultimate low-carb bowl that never compromises on flavour.',
    chefNote: 'Perfectly seared tofu with a golden crust and soft centre, paired with clean greens and umami-seasoned noodles.',
    ingredients: 'Firm tofu, konjac noodles, baby bok choy, turmeric spice crust, garlic crumb, light soy glaze.',
    tags: ['Low Carb', 'Plant-Based', 'High Protein'],
    style: 'Asian Fusion',
    course: 'Main',
    texture: 'Crisp-Soft',
    serving: 'Hot',
    price: 45,
  },
  {
    id: 'biryani',
    titleTop: 'Chicken',
    titleBottom: 'Biryani',
    image: 'images/dish-biryani.png',
    rating: '5.0',
    chef: 'Chef Arif M.',
    description: 'Saffron-kissed long-grain basmati layered with slow-cooked chicken, caramelised onions, whole spices, cashews and fresh mint — a celebration in a bowl.',
    chefNote: 'A labour of love built on centuries of tradition. Every grain carries the perfume of cardamom, clove and star anise.',
    ingredients: 'Basmati rice, whole chicken leg, saffron, caramelised onion, cashews, cinnamon, cardamom, cloves, star anise, fresh mint.',
    tags: ['Signature Dish', 'Slow Cooked', 'South Asian'],
    style: 'South Asian',
    course: 'Main',
    texture: 'Fluffy',
    serving: 'Hot',
    price: 60,
  },
  {
    id: 'spirals',
    titleTop: 'Sweet Potato',
    titleBottom: 'Spirals',
    image: 'images/dish-spirals.png',
    rating: '4.5',
    chef: 'Chef Lena B.',
    description: 'Vibrant, naturally sweet spiralised sweet potato — roasted to tender perfection. A colourful, wholesome alternative to pasta or noodles.',
    chefNote: 'Farm-fresh sweet potato turned into silky spirals — naturally sweet, naturally beautiful, and packed with goodness.',
    ingredients: 'Fresh sweet potato spirals, olive oil, rosemary, cracked black pepper, sea salt, optional honey glaze.',
    tags: ['Gluten-Free', 'Farm Fresh', 'Wholesome'],
    style: 'Wholesome',
    course: 'Side / Main',
    texture: 'Tender',
    serving: 'Warm',
    price: 30,
  },
  {
    id: 'pasta',
    titleTop: 'Paneer',
    titleBottom: 'Pasta',
    image: 'images/dish-pasta.webp',
    rating: '4.8',
    chef: 'Chef Sofia R.',
    description: 'Golden paneer cubes over spaghetti with sautéed spinach, roasted red pepper, mushrooms and a light Parmesan dusting — comfort fusion at its finest.',
    chefNote: 'East meets West in the most satisfying way. Crispy paneer brings richness, while the spaghetti keeps every bite grounded.',
    ingredients: 'Spaghetti, fresh paneer, baby spinach, roasted red pepper, cremini mushrooms, Parmesan, garlic, olive oil, herbs.',
    tags: ['Fusion Favourite', 'Vegetarian', 'Comfort Food'],
    style: 'Fusion',
    course: 'Main',
    texture: 'Rich',
    serving: 'Hot',
    price: 50,
  },
  {
    id: 'stirfry',
    titleTop: 'Mushroom',
    titleBottom: 'Stir-Fry',
    image: 'images/dish-stirfry.png',
    rating: '4.7',
    chef: 'Chef Dani L.',
    description: 'Earthy shiitake mushrooms, minced meat, diced carrots and spring onion in a savoury sauce — wok-tossed fast and served with soul.',
    chefNote: 'A humble dish elevated by technique. The secret is high heat and the perfect umami broth that ties every element together.',
    ingredients: 'Shiitake mushrooms, minced pork, carrot, spring onion, ginger, oyster sauce, Shaoxing wine, sesame oil, white pepper.',
    tags: ['Umami Packed', 'Wok Fresh', 'Quick & Hearty'],
    style: 'Chinese',
    course: 'Main',
    texture: 'Juicy',
    serving: 'Hot',
    price: 48,
  },
];

// ─── State ───────────────────────────────────────────────
let activeIndex = 0;
let isAnimating = false;
let qty = 1;
let currentPaymentMethod = 'card';

// ─── DOM refs ─────────────────────────────────────────────
const currentPlate  = document.getElementById('plate-current');
const incomingPlate = document.getElementById('plate-incoming');
const plateStage    = document.getElementById('plate-stage');
const rankNumber    = document.getElementById('rank-number');
const titleTop      = document.getElementById('title-top');
const titleBottom   = document.getElementById('title-bottom');
const dishDesc      = document.getElementById('dish-description');
const tagRow        = document.getElementById('tag-row');
const ratingEl      = document.getElementById('dish-rating');
const chefName      = document.getElementById('chef-name');
const chefText      = document.getElementById('chef-text');
const thumbStrip    = document.getElementById('thumb-strip');
const prevBtn       = document.getElementById('prev-btn');
const nextBtn       = document.getElementById('next-btn');
const statStyle     = document.getElementById('stat-style');
const statCourse    = document.getElementById('stat-course');
const statTexture   = document.getElementById('stat-texture');
const statServing   = document.getElementById('stat-serving');
const tabs          = Array.from(document.querySelectorAll('.tab'));
const priceBadge    = document.getElementById('dish-price');
const heroPrice     = document.getElementById('hero-price');

// Modal refs
const orderModal    = document.getElementById('order-modal');
const successModal  = document.getElementById('success-modal');
const modalClose    = document.getElementById('modal-close-btn');
const modalDishImg  = document.getElementById('modal-dish-img');
const modalDishName = document.getElementById('modal-dish-name');
const modalDishPrice= document.getElementById('modal-dish-price');
const qtyMinus      = document.getElementById('qty-minus');
const qtyPlus       = document.getElementById('qty-plus');
const qtyDisplay    = document.getElementById('qty-display');
const qtyTotal      = document.getElementById('qty-total');
const confirmBtn    = document.getElementById('confirm-order-btn');
const successCloseBtn= document.getElementById('success-close-btn');
const cardForm      = document.getElementById('card-form');
const codForm       = document.getElementById('cod-form');
const heartBtn      = document.getElementById('heart-btn');

// ─── Build Thumbs ─────────────────────────────────────────
function buildThumbs() {
  thumbStrip.innerHTML = '';
  dishes.forEach((dish, index) => {
    const btn = document.createElement('button');
    btn.className = 'thumb-card' + (index === activeIndex ? ' active' : '');
    btn.setAttribute('aria-label', `${dish.titleTop} ${dish.titleBottom}`);
    btn.innerHTML = `
      <img src="${dish.image}" alt="${dish.titleTop}" />
      <span>${dish.titleTop}</span>
      <strong>${dish.titleBottom}</strong>
    `;
    btn.addEventListener('click', () => switchDish(index, index > activeIndex ? 1 : -1));
    thumbStrip.appendChild(btn);
  });
}

// ─── Render Text ──────────────────────────────────────────
function renderText(dish) {
  rankNumber.textContent  = `#${activeIndex + 1}`;
  titleTop.textContent    = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  dishDesc.textContent    = dish.description;
  ratingEl.textContent    = dish.rating;
  chefName.textContent    = dish.chef;
  chefText.textContent    = dish.chefNote;
  statStyle.textContent   = dish.style;
  statCourse.textContent  = dish.course;
  statTexture.textContent = dish.texture;
  statServing.textContent = dish.serving;
  priceBadge.textContent  = dish.price;
  heroPrice.textContent   = dish.price;

  const fadeEls = [titleTop, titleBottom, dishDesc, ratingEl, chefName, chefText, priceBadge, heroPrice];
  fadeEls.forEach(el => {
    el.classList.remove('fade-swap');
    void el.offsetWidth;
    el.classList.add('fade-swap');
  });

  tagRow.innerHTML = '';
  dish.tags.forEach(tag => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    tagRow.appendChild(pill);
  });

  Array.from(thumbStrip.children).forEach((thumb, i) => {
    thumb.classList.toggle('active', i === activeIndex);
  });

  // Keep active thumb visible
  const activeThumb = thumbStrip.children[activeIndex];
  if (activeThumb) {
    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  updateWhatsAppLinks();
}

// ─── Mount Plate Image ────────────────────────────────────
function mountPlate(element, src, alt) {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  element.appendChild(img);
}

// ─── Switch Dish ──────────────────────────────────────────
// direction: 1 = swipe right → current exits RIGHT, -1 = swipe left → current exits LEFT
function switchDish(nextIndex, direction = 1) {
  if (isAnimating || nextIndex === activeIndex) return;
  isAnimating = true;

  const nextDish = dishes[nextIndex];
  const outClass = direction >= 0 ? 'animate-out-right' : 'animate-out-left';

  mountPlate(incomingPlate, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);
  incomingPlate.className = 'plate-layer incoming';
  currentPlate.classList.remove('animate-out-left', 'animate-out-right');
  incomingPlate.classList.remove('animate-in');

  void incomingPlate.offsetWidth;
  currentPlate.classList.add(outClass);
  incomingPlate.classList.add('animate-in');

  activeIndex = nextIndex;
  renderText(nextDish);

  setTimeout(() => {
    mountPlate(currentPlate, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);
    currentPlate.className = 'plate-layer current';
    incomingPlate.className = 'plate-layer incoming';
    incomingPlate.innerHTML = '';
    isAnimating = false;
  }, 720);
}

// ─── Navigation Buttons ───────────────────────────────────
prevBtn.addEventListener('click', () => {
  const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
  switchDish(nextIndex, -1);
});

nextBtn.addEventListener('click', () => {
  const nextIndex = (activeIndex + 1) % dishes.length;
  switchDish(nextIndex, 1);
});

// ─── SWIPE SUPPORT (Touch + Mouse) ───────────────────────
(function initSwipe() {
  let startX = 0;
  let startY = 0;
  let isDragging = false;
  const THRESHOLD = 50; // min px to trigger swipe

  // ── Touch events ──
  plateStage.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  }, { passive: true });

  plateStage.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    // If horizontal swipe is dominant, prevent vertical scroll
    if (Math.abs(dx) > Math.abs(dy)) {
      e.preventDefault();
    }
  }, { passive: false });

  plateStage.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;

    // Only trigger if horizontal movement is dominant
    if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < THRESHOLD) return;

    if (dx > 0) {
      // Swiped RIGHT → dish exits right → go to previous
      const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
      switchDish(nextIndex, 1);
    } else {
      // Swiped LEFT → dish exits left → go to next
      const nextIndex = (activeIndex + 1) % dishes.length;
      switchDish(nextIndex, -1);
    }
  }, { passive: true });

  // ── Mouse drag events ──
  plateStage.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    startY = e.clientY;
    isDragging = true;
    e.preventDefault();
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
  });

  document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (Math.abs(dx) < Math.abs(dy) || Math.abs(dx) < THRESHOLD) return;

    if (dx > 0) {
      // Dragged RIGHT → dish exits right → previous
      const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
      switchDish(nextIndex, 1);
    } else {
      // Dragged LEFT → dish exits left → next
      const nextIndex = (activeIndex + 1) % dishes.length;
      switchDish(nextIndex, -1);
    }
  });

  // Cancel drag if mouse leaves window
  document.addEventListener('mouseleave', () => { isDragging = false; });
})();

// ─── Tabs ─────────────────────────────────────────────────
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const dish = dishes[activeIndex];
    if (index === 0) {
      chefText.textContent = dish.chefNote;
    } else {
      chefText.textContent = dish.ingredients;
    }
    chefText.classList.remove('fade-swap');
    void chefText.offsetWidth;
    chefText.classList.add('fade-swap');
  });
});

// ─── Heart / Like ─────────────────────────────────────────
heartBtn.addEventListener('click', () => {
  heartBtn.classList.toggle('active');
});

document.getElementById('like-btn').addEventListener('click', (e) => {
  const btn = e.currentTarget;
  btn.style.color = btn.style.color === 'rgb(233, 100, 122)' ? '' : '#e9647a';
});

// ─── Order Modal ──────────────────────────────────────────
function openOrderModal() {
  const dish = dishes[activeIndex];
  qty = 1;
  qtyDisplay.textContent = qty;
  qtyTotal.textContent = dish.price * qty;
  modalDishImg.src = dish.image;
  modalDishImg.alt = `${dish.titleTop} ${dish.titleBottom}`;
  modalDishName.textContent = `${dish.titleTop} ${dish.titleBottom}`;
  modalDishPrice.textContent = dish.price;

  document.getElementById('pay-card').checked = true;
  cardForm.classList.remove('hidden');
  codForm.classList.add('hidden');
  currentPaymentMethod = 'card';

  orderModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
  orderModal.classList.add('hidden');
  document.body.style.overflow = '';
}

document.getElementById('order-now-btn').addEventListener('click', openOrderModal);
document.getElementById('card-order-main-btn').addEventListener('click', openOrderModal);
document.getElementById('footer-order-link').addEventListener('click', openOrderModal);

modalClose.addEventListener('click', closeOrderModal);

orderModal.addEventListener('click', (e) => {
  if (e.target === orderModal) closeOrderModal();
});

// ─── Quantity Controls ────────────────────────────────────
qtyMinus.addEventListener('click', () => {
  if (qty > 1) {
    qty--;
    qtyDisplay.textContent = qty;
    qtyTotal.textContent = dishes[activeIndex].price * qty;
  }
});

qtyPlus.addEventListener('click', () => {
  if (qty < 20) {
    qty++;
    qtyDisplay.textContent = qty;
    qtyTotal.textContent = dishes[activeIndex].price * qty;
  }
});

// ─── Payment Method Toggle ────────────────────────────────
document.querySelectorAll('input[name="payment"]').forEach(radio => {
  radio.addEventListener('change', () => {
    currentPaymentMethod = radio.value;
    if (radio.value === 'card') {
      cardForm.classList.remove('hidden');
      codForm.classList.add('hidden');
    } else if (radio.value === 'cod') {
      cardForm.classList.add('hidden');
      codForm.classList.remove('hidden');
    } else {
      cardForm.classList.add('hidden');
      codForm.classList.add('hidden');
    }
  });
});

// ─── Confirm Order ────────────────────────────────────────
confirmBtn.addEventListener('click', () => {
  if (currentPaymentMethod === 'whatsapp') {
    const dish = dishes[activeIndex];
    const msg = encodeURIComponent(`Hi Dish Studio! 🍽️\n\nI'd like to order:\n*${dish.titleTop} ${dish.titleBottom}*\nQty: ${qty}\nTotal: AED ${dish.price * qty}\n\nPlease confirm my order. Thank you!`);
    window.open(`https://wa.me/15798995633?text=${msg}`, '_blank');
    closeOrderModal();
  } else {
    closeOrderModal();
    successModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
});

successCloseBtn.addEventListener('click', () => {
  successModal.classList.add('hidden');
  document.body.style.overflow = '';
});

successModal.addEventListener('click', (e) => {
  if (e.target === successModal) {
    successModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// ─── WhatsApp Links ───────────────────────────────────────
function updateWhatsAppLinks() {
  const dish = dishes[activeIndex];
  const msg = encodeURIComponent(`Hi Dish Studio! 🍽️\n\nI'd like to order *${dish.titleTop} ${dish.titleBottom}* (AED ${dish.price}).\n\nPlease confirm. Thank you!`);
  const url = `https://wa.me/15798995633?text=${msg}`;
  const waBtn = document.getElementById('whatsapp-order-btn');
  const floatingWa = document.querySelector('.floating-wa');
  if (waBtn) waBtn.href = url;
  if (floatingWa) floatingWa.href = url;
}

// ─── Card number formatting ───────────────────────────────
const cardInput = document.getElementById('card-number-input');
if (cardInput) {
  cardInput.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 16);
    val = val.match(/.{1,4}/g)?.join(' ') || val;
    e.target.value = val;
  });
}

// ─── Keyboard navigation ──────────────────────────────────
document.addEventListener('keydown', (e) => {
  if (orderModal.classList.contains('hidden') && successModal.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft') {
      const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
      switchDish(nextIndex, 1);
    }
    if (e.key === 'ArrowRight') {
      const nextIndex = (activeIndex + 1) % dishes.length;
      switchDish(nextIndex, -1);
    }
  }
  if (e.key === 'Escape') {
    closeOrderModal();
    successModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// ─── Smooth scroll for hash links ────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Page Transition for About link ──────────────────────
const overlay = document.getElementById('page-transition');

function navigateWithTransition(href) {
  overlay.classList.add('exit-active');
  setTimeout(() => { window.location.href = href; }, 400);
}

document.querySelectorAll('.about-page-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateWithTransition(link.getAttribute('href'));
  });
});

// ─── Search button ────────────────────────────────────────
document.getElementById('search-btn').addEventListener('click', () => {
  alert('Search coming soon! Browse our menu above.');
});

// ─── Cart button ──────────────────────────────────────────
document.getElementById('cart-btn').addEventListener('click', openOrderModal);

// ─── Share button ─────────────────────────────────────────
document.getElementById('share-btn').addEventListener('click', async () => {
  const dish = dishes[activeIndex];
  if (navigator.share) {
    try {
      await navigator.share({
        title: `${dish.titleTop} ${dish.titleBottom} — Dish Studio`,
        text: dish.description,
        url: window.location.href,
      });
    } catch {}
  } else {
    navigator.clipboard?.writeText(window.location.href);
    alert('Link copied to clipboard!');
  }
});

// ─── Page enter animation ────────────────────────────────
window.addEventListener('pageshow', () => {
  overlay.classList.remove('exit-active', 'enter-start');
  overlay.classList.add('enter-done');
  setTimeout(() => overlay.classList.remove('enter-done'), 50);
});

// ─── Init ─────────────────────────────────────────────────
mountPlate(currentPlate, dishes[0].image, `${dishes[0].titleTop} ${dishes[0].titleBottom}`);
buildThumbs();
renderText(dishes[0]);
