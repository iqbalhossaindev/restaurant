/* ═══════════════════════════════════════════
   DISH STUDIO — Script
   ═══════════════════════════════════════════ */

const dishes = [
  {
    id: 'lamb',
    titleTop: 'Lamb Steak',
    titleBottom: 'Potato',
    image: 'assets/dish-lamb.svg',
    rating: '4.8',
    chef: 'Chef K. Semy',
    description: 'Tender cuts, creamy sides, and a plated finish made to feel refined, warm, and memorable.',
    tags: ['Most loved dish', 'Creamy side', 'Premium cut'],
    style: 'Modern',
    course: 'Main',
    texture: 'Soft',
    serving: 'Hot',
    price: 65,
  },
  {
    id: 'lotek',
    titleTop: 'Lotek',
    titleBottom: 'Perkedel',
    image: 'assets/dish-lotek.svg',
    rating: '4.9',
    chef: 'Chef Rina',
    description: 'Fresh greens, bright garnish, and crisp golden bites plated with a clean and cheerful touch.',
    tags: ['Chef pick', 'Fresh daily', 'Bright flavour'],
    style: 'Fresh',
    course: 'Lunch',
    texture: 'Crisp',
    serving: 'Warm',
    price: 45,
  },
  {
    id: 'martabak',
    titleTop: 'Martabak',
    titleBottom: 'Pakadin',
    image: 'assets/dish-martabak.svg',
    rating: '4.7',
    chef: 'Chef Arman',
    description: 'Golden layers, soft centers, and a rich finish styled with contrast and gentle warmth.',
    tags: ['Street classic', 'Soft texture', 'Best seller'],
    style: 'Golden',
    course: 'Snack',
    texture: 'Layered',
    serving: 'Hot',
    price: 35,
  },
  {
    id: 'sup',
    titleTop: 'Sup Asli',
    titleBottom: 'Wonogiri',
    image: 'assets/dish-soup.svg',
    rating: '4.6',
    chef: 'Chef Dimas',
    description: 'A comforting bowl with a smooth broth, light garnish, and a calm home style mood.',
    tags: ['Comfort food', 'Warm broth', 'Family recipe'],
    style: 'Classic',
    course: 'Soup',
    texture: 'Silky',
    serving: 'Hot',
    price: 40,
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
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent   = dish.titleTop;
  titleBottom.textContent= dish.titleBottom;
  dishDesc.textContent   = dish.description;
  ratingEl.textContent   = dish.rating;
  chefName.textContent   = dish.chef;
  chefText.textContent   = dish.description;
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
// direction: 1 = going right (next) → current exits RIGHT, new enters from top
//           -1 = going left (prev) → current exits LEFT, new enters from top
function switchDish(nextIndex, direction = 1) {
  if (isAnimating || nextIndex === activeIndex) return;
  isAnimating = true;

  const nextDish = dishes[nextIndex];
  // If going next (right direction), current exits to the RIGHT
  // If going prev (left direction), current exits to the LEFT
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

// ─── Navigation ───────────────────────────────────────────
prevBtn.addEventListener('click', () => {
  const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
  switchDish(nextIndex, -1);
});

nextBtn.addEventListener('click', () => {
  const nextIndex = (activeIndex + 1) % dishes.length;
  switchDish(nextIndex, 1);
});

// ─── Tabs ─────────────────────────────────────────────────
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const dish = dishes[activeIndex];
    if (index === 0) {
      chefText.textContent = dish.description;
    } else {
      chefText.textContent = `${dish.tags[0]}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()} — presented with clean modern styling.`;
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

  // Reset payment to card
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

// Open modal from multiple buttons
document.getElementById('order-now-btn').addEventListener('click', openOrderModal);
document.getElementById('card-order-main-btn').addEventListener('click', openOrderModal);
document.getElementById('about-order-btn').addEventListener('click', openOrderModal);
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
    // Show success
    closeOrderModal();
    successModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
});

// ─── Success Modal Close ──────────────────────────────────
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

// ─── WhatsApp Order Buttons ───────────────────────────────
function updateWhatsAppLinks() {
  const dish = dishes[activeIndex];
  const msg = encodeURIComponent(`Hi Dish Studio! 🍽️\n\nI'd like to order *${dish.titleTop} ${dish.titleBottom}* (AED ${dish.price}).\n\nPlease confirm. Thank you!`);
  const url = `https://wa.me/15798995633?text=${msg}`;
  document.getElementById('whatsapp-order-btn').href = url;
  document.querySelector('.floating-wa').href = url;
}

// Update WA links when dish changes (wrap switchDish)
const originalSwitchDish = switchDish;
const _origRenderText = renderText;
renderText = function(dish) {
  _origRenderText(dish);
  updateWhatsAppLinks();
};

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
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
    if (e.key === 'Escape') closeOrderModal();
  }
  if (e.key === 'Escape') {
    closeOrderModal();
    successModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// ─── Smooth scroll for nav links ──────────────────────────
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

// ─── Search button (placeholder UX) ──────────────────────
document.getElementById('search-btn').addEventListener('click', () => {
  alert('Search coming soon! Browse our menu above.');
});

// ─── Cart button ─────────────────────────────────────────
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

// ─── Init ─────────────────────────────────────────────────
mountPlate(currentPlate, dishes[0].image, `${dishes[0].titleTop} ${dishes[0].titleBottom}`);
buildThumbs();
renderText(dishes[0]);
updateWhatsAppLinks();
