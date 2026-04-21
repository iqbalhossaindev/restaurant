const dishes = [
  {
    id: 'royal-chicken-biryani',
    titleTop: 'ROYAL CHICKEN',
    titleBottom: 'BIRYANI',
    name: 'Royal Chicken Biryani',
    image: 'assets/dishes/royal-chicken-biryani.webp',
    price: 49,
    rating: 4.9,
    cuisine: 'Middle Eastern',
    service: 'Dine In',
    location: 'Dubai Marina, Dubai',
    description: 'Fragrant rice, tender chicken, and warm spice notes presented in a rich premium bowl.',
    tags: ['Chef favourite', 'Premium spice', 'Dubai classic', 'AED ready']
  },
  {
    id: 'sesame-beef-bowl',
    titleTop: 'SESAME BEEF',
    titleBottom: 'BOWL',
    name: 'Sesame Beef Bowl',
    image: 'assets/dishes/sesame-beef-bowl.webp',
    price: 46,
    rating: 4.9,
    cuisine: 'Asian Grill',
    service: 'Dine In',
    location: 'Dubai Marina, Dubai',
    description: 'Tender beef, sesame, and rich savoury depth in a warm modern bowl.',
    tags: ['Bold flavour', 'Chef grill', 'Rice bowl', 'AED ready']
  },
  {
    id: 'mushroom-garden-plate',
    titleTop: 'MUSHROOM GARDEN',
    titleBottom: 'PLATE',
    name: 'Mushroom Garden Plate',
    image: 'assets/dishes/mushroom-garden-plate.webp',
    price: 34,
    rating: 4.8,
    cuisine: 'Contemporary',
    service: 'Dine In',
    location: 'Dubai Marina, Dubai',
    description: 'Savory mushrooms, soft bites, and fresh green garnish with a calm plated finish.',
    tags: ['Fresh garden', 'Soft texture', 'Light finish', 'AED ready']
  },
  {
    id: 'chicken-pasta-bowl',
    titleTop: 'CHICKEN PASTA',
    titleBottom: 'BOWL',
    name: 'Chicken Pasta Bowl',
    image: 'assets/dishes/chicken-pasta-bowl.webp',
    price: 38,
    rating: 4.7,
    cuisine: 'Italian Comfort',
    service: 'Dine In',
    location: 'Dubai Marina, Dubai',
    description: 'Creamy pasta, tender chicken, and a soft cheesy finish served in a bright hearty bowl.',
    tags: ['Creamy pasta', 'Family pick', 'Comfort dish', 'AED ready']
  },
  {
    id: 'shrimp-noodle-bowl',
    titleTop: 'SHRIMP NOODLE',
    titleBottom: 'BOWL',
    name: 'Shrimp Noodle Bowl',
    image: 'assets/dishes/shrimp-noodle-bowl.webp',
    price: 42,
    rating: 4.8,
    cuisine: 'Wok Style',
    service: 'Dine In',
    location: 'Dubai Marina, Dubai',
    description: 'Springy noodles, shrimp, and wok tossed vegetables finished with a glossy savoury sauce.',
    tags: ['Wok toss', 'Seafood', 'Popular pick', 'AED ready']
  },
  {
    id: 'low-carb-tofu-box',
    titleTop: 'LOW CARB',
    titleBottom: 'TOFU BOX',
    name: 'Low Carb Tofu Box',
    image: 'assets/dishes/low-carb-tofu-box.webp',
    price: 36,
    rating: 4.6,
    cuisine: 'Healthy Box',
    service: 'Takeaway',
    location: 'Dubai Marina, Dubai',
    description: 'Grilled tofu, noodles, and greens in a light balanced box with clean presentation.',
    tags: ['Healthy pick', 'Protein rich', 'Light box', 'AED ready']
  },
  {
    id: 'sweet-potato-spirals',
    titleTop: 'SWEET POTATO',
    titleBottom: 'SPIRALS',
    name: 'Sweet Potato Spirals',
    image: 'assets/dishes/sweet-potato-spirals.webp',
    price: 24,
    rating: 4.5,
    cuisine: 'Fresh Prep',
    service: 'Takeaway',
    location: 'Dubai Marina, Dubai',
    description: 'Fresh cut sweet potato spirals with bright colour and a clean ready to cook presentation.',
    tags: ['Fresh prep', 'Bright colour', 'Vegetable side', 'AED ready']
  },
  {
    id: 'classic-noodle-plate',
    titleTop: 'CLASSIC NOODLE',
    titleBottom: 'PLATE',
    name: 'Classic Noodle Plate',
    image: 'assets/dishes/classic-noodle-plate.webp',
    price: 28,
    rating: 4.4,
    cuisine: 'Simple Plate',
    service: 'Dine In',
    location: 'Dubai Marina, Dubai',
    description: 'A light noodle plate with crisp greens and a clean minimal finish.',
    tags: ['Simple plate', 'Light meal', 'Fresh greens', 'AED ready']
  }
];

let activeIndex = 0;
let activeTab = 'overview';
let isAnimating = false;
let plateStartX = 0;
let plateStartY = 0;
let plateSwiping = false;
let menuScrollTimer = null;

const plateStage = document.getElementById('plate-stage');
const currentPlate = document.getElementById('plate-current');
const incomingPlate = document.getElementById('plate-incoming');
const menuTrack = document.getElementById('menu-track');
const rankNumber = document.getElementById('rank-number');
const titleTop = document.getElementById('title-top');
const titleBottom = document.getElementById('title-bottom');
const dishDescription = document.getElementById('dish-description');
const tagRow = document.getElementById('tag-row');
const pricePill = document.getElementById('price-pill');
const locationPill = document.getElementById('location-pill');
const dishRating = document.getElementById('dish-rating');
const detailsCopy = document.getElementById('details-copy');
const detailPrice = document.getElementById('detail-price');
const detailCuisine = document.getElementById('detail-cuisine');
const detailLocation = document.getElementById('detail-location');
const detailService = document.getElementById('detail-service');
const overviewTab = document.getElementById('overview-tab');
const detailsTab = document.getElementById('details-tab');
const orderBtn = document.getElementById('order-btn');
const modal = document.getElementById('order-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const orderForm = document.getElementById('order-form');
const orderDish = document.getElementById('order-dish');
const orderQty = document.getElementById('order-qty');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const orderLocation = document.getElementById('order-location');
const orderPhone = document.getElementById('order-phone');
const orderBuilding = document.getElementById('order-building');
const summaryUnit = document.getElementById('summary-unit');
const summaryTotal = document.getElementById('summary-total');

function getDish(index) {
  const size = dishes.length;
  return dishes[(index + size) % size];
}

function mountPlate(target, dish) {
  target.innerHTML = '';
  const img = document.createElement('img');
  img.src = dish.image;
  img.alt = dish.name;
  img.draggable = false;
  target.appendChild(img);
}

function cardAlpha(distance) {
  const raw = 0.5 - distance * 0.05;
  return Math.max(0.25, raw).toFixed(2);
}

function menuCardTemplate(dish, index) {
  const distance = Math.abs(index - activeIndex);
  return `
    <button class="menu-card ${index === activeIndex ? 'active' : ''}" data-index="${index}" type="button" style="--box-alpha:${cardAlpha(distance)}" aria-label="${dish.name}">
      <img src="${dish.image}" alt="${dish.name}" />
      <span>${dish.titleTop}</span>
      <strong>${dish.titleBottom}</strong>
      <em>AED ${dish.price}</em>
    </button>
  `;
}

function buildMenu() {
  menuTrack.innerHTML = dishes.map(menuCardTemplate).join('');
  menuTrack.querySelectorAll('.menu-card').forEach((card) => {
    card.addEventListener('click', () => {
      const nextIndex = Number(card.dataset.index);
      switchDish(nextIndex);
    });
  });
}

function getDetailsText(dish) {
  if (activeTab === 'details') {
    return `${dish.name} is served from our Dubai Marina kitchen with ${dish.tags[0].toLowerCase()}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()}.`;
  }
  return dish.description;
}

function refreshMenuStyles() {
  menuTrack.querySelectorAll('.menu-card').forEach((card, index) => {
    const distance = Math.abs(index - activeIndex);
    card.style.setProperty('--box-alpha', cardAlpha(distance));
    card.classList.toggle('active', index === activeIndex);
  });
}

function centerActiveMenuCard() {
  const card = menuTrack.querySelector(`[data-index="${activeIndex}"]`);
  if (!card) return;
  const left = card.offsetLeft - (menuTrack.clientWidth - card.clientWidth) / 2;
  menuTrack.scrollTo({ left, behavior: 'smooth' });
}

function renderDish() {
  const dish = getDish(activeIndex);
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  dishDescription.textContent = dish.description;
  pricePill.textContent = `AED ${dish.price}`;
  locationPill.textContent = dish.location;
  dishRating.textContent = dish.rating.toFixed(1);
  detailsCopy.textContent = getDetailsText(dish);
  detailPrice.textContent = `AED ${dish.price}`;
  detailCuisine.textContent = dish.cuisine;
  detailLocation.textContent = 'Dubai Marina';
  detailService.textContent = dish.service;
  orderDish.value = dish.name;
  summaryUnit.textContent = `AED ${dish.price}`;
  updateOrderTotal();

  [titleTop, titleBottom, dishDescription, detailsCopy, dishRating].forEach((node) => {
    node.classList.remove('fade-swap');
    void node.offsetWidth;
    node.classList.add('fade-swap');
  });

  tagRow.innerHTML = '';
  dish.tags.slice(0, 4).forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    tagRow.appendChild(pill);
  });

  refreshMenuStyles();
  centerActiveMenuCard();
}

function switchDish(nextIndex) {
  const normalized = (nextIndex + dishes.length) % dishes.length;
  if (isAnimating || normalized === activeIndex) return;
  const nextDish = getDish(normalized);
  isAnimating = true;
  mountPlate(incomingPlate, nextDish);
  incomingPlate.className = 'plate-layer incoming';
  currentPlate.classList.remove('animate-out');
  incomingPlate.classList.remove('animate-in');
  void incomingPlate.offsetWidth;
  currentPlate.classList.add('animate-out');
  incomingPlate.classList.add('animate-in');
  activeIndex = normalized;
  renderDish();
  window.setTimeout(() => {
    mountPlate(currentPlate, nextDish);
    currentPlate.className = 'plate-layer current';
    incomingPlate.className = 'plate-layer incoming';
    incomingPlate.innerHTML = '';
    isAnimating = false;
  }, 820);
}

function nextDish() {
  switchDish(activeIndex + 1);
}

function previousDish() {
  switchDish(activeIndex - 1);
}

function plateSwipeStart(x, y) {
  plateStartX = x;
  plateStartY = y;
  plateSwiping = true;
}

function plateSwipeEnd(x, y) {
  if (!plateSwiping) return;
  plateSwiping = false;
  const dx = x - plateStartX;
  const dy = y - plateStartY;
  if (Math.abs(dx) > 34 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) nextDish();
    else previousDish();
  }
}

function getCenteredMenuIndex() {
  const cards = [...menuTrack.querySelectorAll('.menu-card')];
  if (!cards.length) return activeIndex;
  const center = menuTrack.scrollLeft + menuTrack.clientWidth / 2;
  let bestIndex = activeIndex;
  let bestDistance = Infinity;
  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    const distance = Math.abs(cardCenter - center);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestIndex = index;
    }
  });
  return bestIndex;
}

function handleMenuScroll() {
  window.clearTimeout(menuScrollTimer);
  menuScrollTimer = window.setTimeout(() => {
    const centeredIndex = getCenteredMenuIndex();
    if (centeredIndex !== activeIndex) {
      switchDish(centeredIndex);
    }
  }, 90);
}

function updateOrderTotal() {
  const qty = Math.max(1, Number(orderQty.value) || 1);
  orderQty.value = String(qty);
  const total = qty * getDish(activeIndex).price;
  summaryTotal.textContent = `AED ${total}`;
}

function openModal() {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function animatePlateIntoButton() {
  const img = currentPlate.querySelector('img');
  if (!img) {
    openModal();
    return;
  }
  const start = img.getBoundingClientRect();
  const end = orderBtn.getBoundingClientRect();
  const clone = document.createElement('div');
  clone.className = 'fly-plate';
  clone.style.left = `${start.left}px`;
  clone.style.top = `${start.top}px`;
  clone.style.width = `${start.width}px`;
  clone.style.height = `${start.height}px`;
  clone.innerHTML = `<img src="${img.src}" alt="" />`;
  document.body.appendChild(clone);
  orderBtn.classList.add('ordering');
  requestAnimationFrame(() => {
    const dx = end.left + end.width / 2 - (start.left + start.width / 2);
    const dy = end.top + end.height / 2 - (start.top + start.height / 2);
    const scale = Math.max(0.18, end.height / start.height * 0.42);
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(-20deg)`;
    clone.style.opacity = '0.12';
  });
  window.setTimeout(() => {
    clone.remove();
    orderBtn.classList.remove('ordering');
  }, 780);
}

function handleOrderClick() {
  animatePlateIntoButton();
  window.setTimeout(() => {
    nextDish();
  }, 120);
  window.setTimeout(() => {
    openModal();
    orderLocation.focus();
  }, 430);
}

function buildWhatsAppMessage(dish, qty, phone, location, building) {
  const total = dish.price * qty;
  return `Hello Kestford Restaurant, I want to order *${dish.name}*.` +
    `

*Quantity:* ${qty}` +
    `
*Total:* AED ${total}` +
    `
*Phone:* ${phone}` +
    `
*Location:* ${location}` +
    `
*Building Number:* ${building}` +
    `

Please confirm my order.`;
}

plateStage.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  plateSwipeStart(touch.clientX, touch.clientY);
}, { passive: true });
plateStage.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  plateSwipeEnd(touch.clientX, touch.clientY);
}, { passive: true });
plateStage.addEventListener('pointerdown', (event) => {
  plateSwipeStart(event.clientX, event.clientY);
});
plateStage.addEventListener('pointerup', (event) => {
  plateSwipeEnd(event.clientX, event.clientY);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') previousDish();
  if (event.key === 'ArrowRight') nextDish();
  if (event.key === 'Escape') closeModal();
});
menuTrack.addEventListener('scroll', handleMenuScroll, { passive: true });

overviewTab.addEventListener('click', () => {
  activeTab = 'overview';
  overviewTab.classList.add('active');
  detailsTab.classList.remove('active');
  detailsCopy.textContent = getDetailsText(getDish(activeIndex));
});

detailsTab.addEventListener('click', () => {
  activeTab = 'details';
  detailsTab.classList.add('active');
  overviewTab.classList.remove('active');
  detailsCopy.textContent = getDetailsText(getDish(activeIndex));
});

qtyMinus.addEventListener('click', () => {
  orderQty.value = String(Math.max(1, Number(orderQty.value || 1) - 1));
  updateOrderTotal();
});
qtyPlus.addEventListener('click', () => {
  orderQty.value = String(Math.max(1, Number(orderQty.value || 1) + 1));
  updateOrderTotal();
});
orderQty.addEventListener('input', updateOrderTotal);
orderBtn.addEventListener('click', handleOrderClick);
modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);

orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const qty = Math.max(1, Number(orderQty.value) || 1);
  const phone = orderPhone.value.trim();
  const location = orderLocation.value.trim();
  const building = orderBuilding.value.trim();
  if (!phone || !location || !building) {
    if (!phone) orderPhone.focus();
    else if (!location) orderLocation.focus();
    else orderBuilding.focus();
    return;
  }
  const dish = getDish(activeIndex);
  const message = buildWhatsAppMessage(dish, qty, phone, location, building);
  const url = `https://wa.me/15798995633?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});

mountPlate(currentPlate, dishes[0]);
buildMenu();
renderDish();
orderLocation.value = 'Dubai Marina, Dubai';
