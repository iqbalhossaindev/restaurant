const dishes = [
  { id: 'royal-chicken-biryani', titleTop: 'ROYAL CHICKEN', titleBottom: 'BIRYANI', name: 'Royal Chicken Biryani', image: 'assets/dishes/royal-chicken-biryani.png', price: 49, rating: 4.9, cuisine: 'Middle Eastern', service: 'Dine In', location: 'Dubai Marina, Dubai', description: 'Fragrant rice, tender chicken, and warm spice notes presented in a rich premium bowl.', tags: ['Chef favourite', 'Premium spice', 'Dubai classic', 'AED ready'] },
  { id: 'sesame-beef-bowl', titleTop: 'SESAME BEEF', titleBottom: 'BOWL', name: 'Sesame Beef Bowl', image: 'assets/dishes/sesame-beef-bowl.png', price: 46, rating: 4.9, cuisine: 'Asian Grill', service: 'Dine In', location: 'Dubai Marina, Dubai', description: 'Tender beef, sesame, and rich savoury depth in a warm modern bowl.', tags: ['Bold flavour', 'Chef grill', 'Rice bowl', 'AED ready'] },
  { id: 'mushroom-garden-plate', titleTop: 'MUSHROOM GARDEN', titleBottom: 'PLATE', name: 'Mushroom Garden Plate', image: 'assets/dishes/mushroom-garden-plate.png', price: 34, rating: 4.8, cuisine: 'Contemporary', service: 'Dine In', location: 'Dubai Marina, Dubai', description: 'Savory mushrooms, soft bites, and fresh green garnish with a calm plated finish.', tags: ['Fresh garden', 'Soft texture', 'Light finish', 'AED ready'] },
  { id: 'chicken-pasta-bowl', titleTop: 'CHICKEN PASTA', titleBottom: 'BOWL', name: 'Chicken Pasta Bowl', image: 'assets/dishes/chicken-pasta-bowl.png', price: 38, rating: 4.7, cuisine: 'Italian Comfort', service: 'Dine In', location: 'Dubai Marina, Dubai', description: 'Creamy pasta, tender chicken, and a soft cheesy finish served in a bright hearty bowl.', tags: ['Creamy pasta', 'Family pick', 'Comfort dish', 'AED ready'] },
  { id: 'shrimp-noodle-bowl', titleTop: 'SHRIMP NOODLE', titleBottom: 'BOWL', name: 'Shrimp Noodle Bowl', image: 'assets/dishes/shrimp-noodle-bowl.png', price: 42, rating: 4.8, cuisine: 'Wok Style', service: 'Dine In', location: 'Dubai Marina, Dubai', description: 'Springy noodles, shrimp, and wok tossed vegetables finished with a glossy savoury sauce.', tags: ['Wok toss', 'Seafood', 'Popular pick', 'AED ready'] },
  { id: 'low-carb-tofu-box', titleTop: 'LOW CARB', titleBottom: 'TOFU BOX', name: 'Low Carb Tofu Box', image: 'assets/dishes/low-carb-tofu-box.png', price: 36, rating: 4.6, cuisine: 'Healthy Box', service: 'Takeaway', location: 'Dubai Marina, Dubai', description: 'Grilled tofu, noodles, and greens in a light balanced box with clean presentation.', tags: ['Healthy pick', 'Protein rich', 'Light box', 'AED ready'] },
  { id: 'sweet-potato-spirals', titleTop: 'SWEET POTATO', titleBottom: 'SPIRALS', name: 'Sweet Potato Spirals', image: 'assets/dishes/sweet-potato-spirals.png', price: 24, rating: 4.5, cuisine: 'Fresh Prep', service: 'Takeaway', location: 'Dubai Marina, Dubai', description: 'Fresh cut sweet potato spirals with bright colour and a clean ready to cook presentation.', tags: ['Fresh prep', 'Bright colour', 'Vegetable side', 'AED ready'] },
  { id: 'classic-noodle-plate', titleTop: 'CLASSIC NOODLE', titleBottom: 'PLATE', name: 'Classic Noodle Plate', image: 'assets/dishes/classic-noodle-plate.png', price: 28, rating: 4.4, cuisine: 'Simple Plate', service: 'Dine In', location: 'Dubai Marina, Dubai', description: 'A light noodle plate with crisp greens and a clean minimal finish.', tags: ['Simple plate', 'Light meal', 'Fresh greens', 'AED ready'] }
];

let activeIndex = 0;
let activeTab = 'overview';
let isAnimating = false;
let plateStartX = 0;
let plateStartY = 0;
let plateSwiping = false;
let lastPlateTap = 0;
const cart = new Map();

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
const addBtn = document.getElementById('add-btn');
const orderBtn = document.getElementById('order-btn');
const searchBtn = document.getElementById('search-btn');
const cartBtn = document.getElementById('cart-btn');
const cartPeek = document.getElementById('cart-peek');
const cartBadge = document.getElementById('cart-badge');
const modal = document.getElementById('order-modal');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalPanel = document.getElementById('order-modal-panel');
const orderCartList = document.getElementById('order-cart-list');
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

function getActiveDish() {
  return getDish(activeIndex);
}

function getCartItems() {
  return [...cart.entries()].map(([id, quantity]) => ({ dish: dishes.find((item) => item.id === id), quantity }));
}

function getCartCount() {
  return getCartItems().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartTotal() {
  return getCartItems().reduce((sum, item) => sum + item.quantity * item.dish.price, 0);
}

function mountPlate(target, dish) {
  target.innerHTML = '';
  const img = document.createElement('img');
  img.src = dish.image;
  img.alt = dish.name;
  img.draggable = false;
  target.appendChild(img);
}

function cardAlpha(distance, isActive) {
  if (isActive) return 0.6;
  return Math.max(0.25, 0.5 - distance * 0.05);
}

function menuCardTemplate(dish, index) {
  const isActive = index === activeIndex;
  const distance = Math.abs(index - activeIndex);
  return `
    <button class="menu-card ${isActive ? 'active' : ''}" data-index="${index}" type="button" style="--box-alpha:${cardAlpha(distance, isActive)}" aria-label="${dish.name}">
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

function refreshMenuStyles() {
  menuTrack.querySelectorAll('.menu-card').forEach((card, index) => {
    const isActive = index === activeIndex;
    const distance = Math.abs(index - activeIndex);
    card.style.setProperty('--box-alpha', cardAlpha(distance, isActive));
    card.classList.toggle('active', isActive);
  });
}

function centerActiveMenuCard() {
  const card = menuTrack.querySelector(`[data-index="${activeIndex}"]`);
  if (!card) return;
  const left = card.offsetLeft - (menuTrack.clientWidth - card.clientWidth) / 2;
  menuTrack.scrollTo({ left, behavior: 'smooth' });
}

function getDetailsText(dish) {
  if (activeTab === 'details') {
    return `${dish.name} is served from our Dubai Marina kitchen with ${dish.tags[0].toLowerCase()}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()}.`;
  }
  return dish.description;
}

function renderDish() {
  const dish = getActiveDish();
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent = dish.titleTop;
  titleTop.dataset.text = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  titleBottom.dataset.text = dish.titleBottom;
  dishDescription.textContent = dish.description;
  pricePill.textContent = `AED ${dish.price}`;
  locationPill.textContent = dish.location;
  dishRating.textContent = dish.rating.toFixed(1);
  detailsCopy.textContent = getDetailsText(dish);
  detailPrice.textContent = `AED ${dish.price}`;
  detailCuisine.textContent = dish.cuisine;
  detailLocation.textContent = 'Dubai Marina';
  detailService.textContent = dish.service;
  document.getElementById('card-title').textContent = 'Kestford Signature';

  tagRow.innerHTML = '';
  dish.tags.slice(0, 4).forEach((tag) => {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.textContent = tag;
    tagRow.appendChild(pill);
  });

  [titleTop, titleBottom, dishDescription, detailsCopy, dishRating].forEach((node) => {
    node.classList.remove('fade-swap');
    void node.offsetWidth;
    node.classList.add('fade-swap');
  });

  refreshMenuStyles();
  centerActiveMenuCard();
  syncOrderSummary();
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

function nextDish() { switchDish(activeIndex + 1); }
function previousDish() { switchDish(activeIndex - 1); }

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
    return true;
  }
  return false;
}

function updateCartVisuals() {
  const items = getCartItems();
  const count = getCartCount();
  cartBadge.textContent = String(count);
  cartBtn.classList.toggle('has-items', count > 0);
  if (items.length) {
    cartPeek.style.backgroundImage = `url('${items[items.length - 1].dish.image}')`;
  } else {
    cartPeek.style.backgroundImage = 'none';
  }
}

function animateImageToTarget(imageSrc, sourceRect, targetRect, extraClass = '') {
  const clone = document.createElement('div');
  clone.className = `fly-plate ${extraClass}`.trim();
  clone.style.left = `${sourceRect.left}px`;
  clone.style.top = `${sourceRect.top}px`;
  clone.style.width = `${sourceRect.width}px`;
  clone.style.height = `${sourceRect.height}px`;
  clone.innerHTML = `<img src="${imageSrc}" alt="" />`;
  document.body.appendChild(clone);
  requestAnimationFrame(() => {
    const dx = targetRect.left + targetRect.width / 2 - (sourceRect.left + sourceRect.width / 2);
    const dy = targetRect.top + targetRect.height / 2 - (sourceRect.top + sourceRect.height / 2);
    const scale = Math.max(0.18, Math.min(targetRect.width / sourceRect.width, targetRect.height / sourceRect.height) * 0.72);
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scale}) rotate(-14deg)`;
    clone.style.opacity = '0.14';
  });
  window.setTimeout(() => clone.remove(), 760);
}

function addDishToCart(dish = getActiveDish(), sourceRect = null) {
  cart.set(dish.id, (cart.get(dish.id) || 0) + 1);
  updateCartVisuals();
  syncOrderSummary();
  addBtn.classList.add('success-flash');
  window.setTimeout(() => addBtn.classList.remove('success-flash'), 420);
  if (sourceRect) {
    animateImageToTarget(dish.image, sourceRect, cartBtn.getBoundingClientRect());
  }
}

function handlePlateDoubleTap() {
  const img = currentPlate.querySelector('img');
  if (!img) return;
  addDishToCart(getActiveDish(), img.getBoundingClientRect());
}

function cartSummaryText() {
  const items = getCartItems();
  if (!items.length) {
    return getActiveDish().name;
  }
  return items.map(({ dish, quantity }) => `${dish.name} x${quantity}`).join(', ');
}

function renderOrderCartList(animated = false) {
  const items = getCartItems();
  orderCartList.innerHTML = '';
  if (!items.length) {
    const item = document.createElement('div');
    item.className = 'order-cart-chip single';
    item.innerHTML = `<img src="${getActiveDish().image}" alt="${getActiveDish().name}" /><span>${getActiveDish().name}</span>`;
    orderCartList.appendChild(item);
    return;
  }
  items.forEach(({ dish, quantity }, index) => {
    const item = document.createElement('div');
    item.className = `order-cart-chip ${animated ? 'drop-in' : ''}`;
    item.style.animationDelay = `${index * 90}ms`;
    item.innerHTML = `<img src="${dish.image}" alt="${dish.name}" /><span>${dish.name} x${quantity}</span>`;
    orderCartList.appendChild(item);
  });
}

function syncOrderSummary() {
  const totalItems = getCartCount() || Math.max(1, Number(orderQty.value) || 1);
  const total = getCartItems().length ? getCartTotal() : getActiveDish().price * totalItems;
  orderDish.value = cartSummaryText();
  orderQty.value = String(totalItems);
  summaryUnit.textContent = `AED ${total}`;
  summaryTotal.textContent = `AED ${total}`;
}

function openModal(animated = true) {
  renderOrderCartList(animated);
  syncOrderSummary();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  modalPanel.classList.remove('pop-in');
  void modalPanel.offsetWidth;
  modalPanel.classList.add('pop-in');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function animateCartIntoModal() {
  const items = getCartItems();
  if (!items.length) {
    openModal(true);
    return;
  }
  const targetRect = modalPanel.getBoundingClientRect();
  items.forEach(({ dish }, index) => {
    window.setTimeout(() => {
      const rect = cartBtn.getBoundingClientRect();
      animateImageToTarget(dish.image, rect, { left: targetRect.left + 120 + index * 18, top: targetRect.top + 92, width: 44, height: 44 }, 'mini');
    }, index * 90);
  });
  window.setTimeout(() => openModal(true), items.length * 90 + 120);
}

function handleOrderClick() {
  if (!getCartCount()) {
    const img = currentPlate.querySelector('img');
    if (img) addDishToCart(getActiveDish(), img.getBoundingClientRect());
  }
  animateCartIntoModal();
}

function buildWhatsAppMessage(phone, location, building) {
  const items = getCartItems();
  const lines = items.length ? items.map(({ dish, quantity }) => `*${dish.name}* x${quantity}`).join('\n') : `*${getActiveDish().name}* x${orderQty.value}`;
  const total = items.length ? getCartTotal() : getActiveDish().price * (Number(orderQty.value) || 1);
  return `Hello Kestford Restaurant, I want to order ${items.length ? 'these items' : '*'+getActiveDish().name+'*'}.\n\n${items.length ? lines + '\n\n' : ''}*Quantity:* ${items.length ? getCartCount() : orderQty.value}\n*Total:* AED ${total}\n*Phone:* ${phone}\n*Location:* ${location}\n*Building Number:* ${building}\n\nPlease confirm my order.`;
}

plateStage.addEventListener('touchstart', (event) => {
  const touch = event.changedTouches[0];
  plateSwipeStart(touch.clientX, touch.clientY);
}, { passive: true });

plateStage.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  const swiped = plateSwipeEnd(touch.clientX, touch.clientY);
  const now = Date.now();
  if (!swiped && now - lastPlateTap < 280) handlePlateDoubleTap();
  lastPlateTap = now;
}, { passive: true });

plateStage.addEventListener('pointerdown', (event) => plateSwipeStart(event.clientX, event.clientY));
plateStage.addEventListener('pointerup', (event) => {
  const swiped = plateSwipeEnd(event.clientX, event.clientY);
  const now = Date.now();
  if (!swiped && event.pointerType !== 'touch' && now - lastPlateTap < 280) handlePlateDoubleTap();
  lastPlateTap = now;
});

overviewTab.addEventListener('click', () => {
  activeTab = 'overview';
  overviewTab.classList.add('active');
  detailsTab.classList.remove('active');
  detailsCopy.textContent = getDetailsText(getActiveDish());
});

detailsTab.addEventListener('click', () => {
  activeTab = 'details';
  detailsTab.classList.add('active');
  overviewTab.classList.remove('active');
  detailsCopy.textContent = getDetailsText(getActiveDish());
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') previousDish();
  if (event.key === 'ArrowRight') nextDish();
  if (event.key === 'Escape') closeModal();
});

searchBtn.addEventListener('click', () => menuTrack.scrollIntoView({ behavior: 'smooth', block: 'center' }));
addBtn.addEventListener('click', () => {
  const img = currentPlate.querySelector('img');
  if (img) addDishToCart(getActiveDish(), img.getBoundingClientRect());
});
orderBtn.addEventListener('click', handleOrderClick);
cartBtn.addEventListener('click', handleOrderClick);
modalBackdrop.addEventListener('click', closeModal);
modalClose.addEventListener('click', closeModal);
qtyMinus.addEventListener('click', () => {
  const next = Math.max(1, Number(orderQty.value || 1) - 1);
  orderQty.value = String(next);
  if (!getCartCount()) summaryTotal.textContent = `AED ${getActiveDish().price * next}`;
});
qtyPlus.addEventListener('click', () => {
  const next = Math.max(1, Number(orderQty.value || 1) + 1);
  orderQty.value = String(next);
  if (!getCartCount()) summaryTotal.textContent = `AED ${getActiveDish().price * next}`;
});
orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const phone = orderPhone.value.trim();
  const location = orderLocation.value.trim();
  const building = orderBuilding.value.trim();
  if (!phone || !location || !building) {
    if (!phone) orderPhone.focus();
    else if (!location) orderLocation.focus();
    else orderBuilding.focus();
    return;
  }
  const url = `https://wa.me/15798995633?text=${encodeURIComponent(buildWhatsAppMessage(phone, location, building))}`;
  window.open(url, '_blank', 'noopener');
});

mountPlate(currentPlate, dishes[0]);
buildMenu();
renderDish();
updateCartVisuals();
orderLocation.value = 'Dubai Marina, Dubai';
