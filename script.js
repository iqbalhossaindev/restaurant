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
    tags: ['Chef favourite', 'Premium spice', 'Dubai classic']
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
    tags: ['Bold flavour', 'Chef grill', 'Rice bowl']
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
    tags: ['Fresh garden', 'Soft texture', 'Light finish']
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
    tags: ['Creamy pasta', 'Family pick', 'Comfort dish']
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
    tags: ['Wok toss', 'Seafood', 'Popular pick']
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
    tags: ['Healthy pick', 'Protein rich', 'Light box']
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
    tags: ['Fresh prep', 'Bright colour', 'Vegetable side']
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
    tags: ['Simple plate', 'Light meal', 'Fresh greens']
  }
];

let activeIndex = 0;
let activeTab = 'overview';
let isAnimating = false;
let startX = 0;
let startY = 0;
let pointerActive = false;

const plateStage = document.getElementById('plate-stage');
const currentPlate = document.getElementById('plate-current');
const incomingPlate = document.getElementById('plate-incoming');
const menuTrack = document.getElementById('menu-track');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const menuPrev = document.getElementById('menu-prev');
const menuNext = document.getElementById('menu-next');
const rankNumber = document.getElementById('rank-number');
const titleTop = document.getElementById('title-top');
const titleBottom = document.getElementById('title-bottom');
const dishDescription = document.getElementById('dish-description');
const tagRow = document.getElementById('tag-row');
const pricePill = document.getElementById('price-pill');
const locationPill = document.getElementById('location-pill');
const dishRating = document.getElementById('dish-rating');
const cardTitle = document.getElementById('card-title');
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

function mountPlate(element, dish) {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.src = dish.image;
  img.alt = dish.name;
  img.draggable = false;
  element.appendChild(img);
}

function menuCardTemplate(dish, index) {
  return `
    <button class="menu-card ${index === activeIndex ? 'active' : ''}" data-index="${index}" type="button" aria-label="${dish.name}">
      <img src="${dish.image}" alt="${dish.name}" />
      <span>${dish.titleTop.replace(' ', ' ')}</span>
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
      const direction = nextIndex >= activeIndex ? 1 : -1;
      switchDish(nextIndex, direction);
    });
  });
}

function getDetailsText(dish) {
  if (activeTab === 'details') {
    return `${dish.name} is served from our Dubai Marina kitchen with ${dish.tags[0].toLowerCase()}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()}.`;
  }
  return dish.description;
}

function renderDish() {
  const dish = dishes[activeIndex];
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  dishDescription.textContent = dish.description;
  pricePill.textContent = `AED ${dish.price}`;
  locationPill.textContent = dish.location;
  dishRating.textContent = dish.rating.toFixed(1);
  cardTitle.textContent = 'Kestford Signature';
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
  dish.tags.forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    tagRow.appendChild(pill);
  });

  menuTrack.querySelectorAll('.menu-card').forEach((card, index) => {
    card.classList.toggle('active', index === activeIndex);
  });

  const activeCard = menuTrack.querySelector(`.menu-card[data-index="${activeIndex}"]`);
  if (activeCard) {
    activeCard.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }
}

function switchDish(nextIndex, direction) {
  if (isAnimating || nextIndex === activeIndex) return;
  isAnimating = true;
  const nextDish = dishes[nextIndex];
  mountPlate(incomingPlate, nextDish);
  incomingPlate.className = 'plate-layer incoming';
  currentPlate.classList.remove('animate-out-left', 'animate-out-right');
  incomingPlate.classList.remove('animate-in');
  void incomingPlate.offsetWidth;
  currentPlate.classList.add(direction >= 0 ? 'animate-out-left' : 'animate-out-right');
  incomingPlate.classList.add('animate-in');
  activeIndex = nextIndex;
  renderDish();
  window.setTimeout(() => {
    mountPlate(currentPlate, nextDish);
    currentPlate.className = 'plate-layer current';
    incomingPlate.className = 'plate-layer incoming';
    incomingPlate.innerHTML = '';
    isAnimating = false;
  }, 760);
}

function goPrev() {
  const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
  switchDish(nextIndex, -1);
}

function goNext() {
  const nextIndex = (activeIndex + 1) % dishes.length;
  switchDish(nextIndex, 1);
}

function onStart(x, y) {
  startX = x;
  startY = y;
  pointerActive = true;
}

function onEnd(x, y) {
  if (!pointerActive) return;
  pointerActive = false;
  const dx = x - startX;
  const dy = y - startY;
  if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
    if (dx < 0) goNext();
    else goPrev();
  }
}

function updateOrderTotal() {
  const qty = Math.max(1, Number(orderQty.value) || 1);
  orderQty.value = String(qty);
  const total = qty * dishes[activeIndex].price;
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
    const scale = Math.max(0.18, end.height / start.height * 0.46);
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(-22deg)`;
    clone.style.opacity = '0.12';
  });
  window.setTimeout(() => {
    clone.remove();
    orderBtn.classList.remove('ordering');
  }, 760);
}

function handleOrderClick() {
  animatePlateIntoButton();
  window.setTimeout(() => {
    goNext();
  }, 100);
  window.setTimeout(() => {
    openModal();
    orderLocation.focus();
  }, 420);
}

function buildWhatsAppMessage(dish, qty, phone, location, building) {
  const total = dish.price * qty;
  return `Hello Kestford Restaurant, I want to order *${dish.name}*.` +
    `\n\n*Quantity:* ${qty}` +
    `\n*Total:* AED ${total}` +
    `\n*Phone:* ${phone}` +
    `\n*Location:* ${location}` +
    `\n*Building Number:* ${building}` +
    `\n\nPlease confirm my order.`;
}

prevBtn.addEventListener('click', goPrev);
nextBtn.addEventListener('click', goNext);
menuPrev.addEventListener('click', () => {
  menuTrack.scrollBy({ left: -menuTrack.clientWidth * 0.5, behavior: 'smooth' });
  goPrev();
});
menuNext.addEventListener('click', () => {
  menuTrack.scrollBy({ left: menuTrack.clientWidth * 0.5, behavior: 'smooth' });
  goNext();
});

plateStage.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  onStart(touch.clientX, touch.clientY);
}, { passive: true });
plateStage.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  onEnd(touch.clientX, touch.clientY);
}, { passive: true });
plateStage.addEventListener('pointerdown', (event) => {
  onStart(event.clientX, event.clientY);
});
plateStage.addEventListener('pointerup', (event) => {
  onEnd(event.clientX, event.clientY);
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') goPrev();
  if (event.key === 'ArrowRight') goNext();
  if (event.key === 'Escape') closeModal();
});

overviewTab.addEventListener('click', () => {
  activeTab = 'overview';
  overviewTab.classList.add('active');
  detailsTab.classList.remove('active');
  detailsCopy.textContent = getDetailsText(dishes[activeIndex]);
});
detailsTab.addEventListener('click', () => {
  activeTab = 'details';
  detailsTab.classList.add('active');
  overviewTab.classList.remove('active');
  detailsCopy.textContent = getDetailsText(dishes[activeIndex]);
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
  const dish = dishes[activeIndex];
  const message = buildWhatsAppMessage(dish, qty, phone, location, building);
  const url = `https://wa.me/15798995633?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
});

mountPlate(currentPlate, dishes[0]);
buildMenu();
renderDish();
orderLocation.value = 'Dubai Marina, Dubai';
