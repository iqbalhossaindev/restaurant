const dishes = [
  {
    id: 'biryani',
    titleTop: 'Royal Chicken',
    titleBottom: 'Biryani',
    image: 'assets/dishes/royal-chicken-biryani.png',
    rating: '4.9',
    chef: 'Kestford Signature',
    description: 'Fragrant rice, tender chicken, and warm spice notes presented in a rich premium bowl.',
    tags: ['Chef favourite', 'Premium spice', 'Dubai classic'],
    price: 'AED 49',
    cuisine: 'Middle Eastern',
    location: 'Dubai Marina',
    service: 'Dine In',
  },
  {
    id: 'beef',
    titleTop: 'Sesame Beef',
    titleBottom: 'Bowl',
    image: 'assets/dishes/sesame-beef-bowl.png',
    rating: '4.8',
    chef: 'House Bowl',
    description: 'Juicy beef, sesame garnish, and bold savoury depth in a warm modern bowl.',
    tags: ['Bold flavour', 'Best seller', 'Hot bowl'],
    price: 'AED 46',
    cuisine: 'Asian Fusion',
    location: 'Dubai Marina',
    service: 'Dine In',
  },
  {
    id: 'mushroom',
    titleTop: 'Mushroom Garden',
    titleBottom: 'Plate',
    image: 'assets/dishes/mushroom-garden-plate.png',
    rating: '4.7',
    chef: 'Chef Plate',
    description: 'A light premium plate with mushrooms, herbs, and delicate texture in a clean presentation.',
    tags: ['Light plate', 'Fresh finish', 'Chef style'],
    price: 'AED 34',
    cuisine: 'Modern Comfort',
    location: 'Dubai Marina',
    service: 'Dine In',
  },
  {
    id: 'pasta',
    titleTop: 'Chicken Pasta',
    titleBottom: 'Bowl',
    image: 'assets/dishes/chicken-pasta-bowl.png',
    rating: '4.6',
    chef: 'Pasta Special',
    description: 'Creamy pasta, tender chicken, and a soft cheesy finish served in a bright hearty bowl.',
    tags: ['Creamy pasta', 'Family pick', 'Comfort dish'],
    price: 'AED 38',
    cuisine: 'Italian Inspired',
    location: 'Dubai Marina',
    service: 'Dine In',
  },
  {
    id: 'shrimp',
    titleTop: 'Shrimp Noodle',
    titleBottom: 'Bowl',
    image: 'assets/dishes/shrimp-noodle-bowl.png',
    rating: '4.8',
    chef: 'Seafood Pick',
    description: 'Stirred noodles, shrimp, and vibrant vegetables balanced with a glossy rich finish.',
    tags: ['Seafood pick', 'Wok finish', 'Colourful bowl'],
    price: 'AED 42',
    cuisine: 'Asian Fusion',
    location: 'Dubai Marina',
    service: 'Dine In',
  },
  {
    id: 'lowcarb',
    titleTop: 'Low Carb',
    titleBottom: 'Tofu Box',
    image: 'assets/dishes/low-carb-tofu-box.png',
    rating: '4.5',
    chef: 'Wellness Pick',
    description: 'Grilled tofu, greens, and noodles arranged in a clean box for a lighter option.',
    tags: ['Healthy choice', 'Low carb', 'Balanced meal'],
    price: 'AED 36',
    cuisine: 'Healthy Box',
    location: 'Dubai Marina',
    service: 'Takeaway',
  },
  {
    id: 'sweetpotato',
    titleTop: 'Sweet Potato',
    titleBottom: 'Spirals',
    image: 'assets/dishes/sweet-potato-spirals.png',
    rating: '4.4',
    chef: 'Fresh Market',
    description: 'Fresh sweet potato spirals with a bright colour profile and crisp prepared texture.',
    tags: ['Fresh prep', 'Crisp cut', 'Light option'],
    price: 'AED 24',
    cuisine: 'Fresh Produce',
    location: 'Dubai Marina',
    service: 'Takeaway',
  },
  {
    id: 'noodles',
    titleTop: 'Classic Noodle',
    titleBottom: 'Plate',
    image: 'assets/dishes/classic-noodle-plate.png',
    rating: '4.3',
    chef: 'Simple Favourite',
    description: 'A simple clean noodle plate served with crisp greens and a soft comforting bite.',
    tags: ['Simple classic', 'Soft texture', 'Everyday favourite'],
    price: 'AED 28',
    cuisine: 'Classic Plate',
    location: 'Dubai Marina',
    service: 'Dine In',
  },
];

let activeIndex = 0;
let isAnimating = false;
let activeTab = 0;
let startX = 0;
let startY = 0;

const currentDish = document.getElementById('dish-current');
const incomingDish = document.getElementById('dish-incoming');
const dishStage = document.getElementById('dish-stage');
const rankNumber = document.getElementById('rank-number');
const titleTop = document.getElementById('title-top');
const titleBottom = document.getElementById('title-bottom');
const dishDescription = document.getElementById('dish-description');
const dishPrice = document.getElementById('dish-price');
const dishLocation = document.getElementById('dish-location');
const tagRow = document.getElementById('tag-row');
const rating = document.getElementById('dish-rating');
const chefName = document.getElementById('chef-name');
const chefText = document.getElementById('chef-text');
const thumbStrip = document.getElementById('thumb-strip');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const statPrice = document.getElementById('stat-price');
const statCuisine = document.getElementById('stat-cuisine');
const statLocation = document.getElementById('stat-location');
const statService = document.getElementById('stat-service');
const tabs = Array.from(document.querySelectorAll('.tab'));

function buildThumbs() {
  thumbStrip.innerHTML = '';
  dishes.forEach((dish, index) => {
    const button = document.createElement('button');
    button.className = 'thumb-card';
    if (index === activeIndex) button.classList.add('active');
    button.setAttribute('aria-label', `${dish.titleTop} ${dish.titleBottom}`);
    button.innerHTML = `
      <img src="${dish.image}" alt="${dish.titleTop} ${dish.titleBottom}" />
      <span>${dish.titleTop}</span>
      <strong>${dish.titleBottom}</strong>
      <small>${dish.price}</small>
    `;
    button.addEventListener('click', () => {
      const direction = index > activeIndex ? 1 : -1;
      switchDish(index, direction);
    });
    thumbStrip.appendChild(button);
  });
}

function renderText(dish) {
  rankNumber.textContent = `#${activeIndex + 1}`;
  titleTop.textContent = dish.titleTop;
  titleBottom.textContent = dish.titleBottom;
  dishDescription.textContent = dish.description;
  dishPrice.textContent = dish.price;
  dishLocation.textContent = `${dish.location}, Dubai`;
  rating.textContent = dish.rating;
  chefName.textContent = dish.chef;
  chefText.textContent = activeTab === 0
    ? dish.description
    : `${dish.tags[0]}, ${dish.tags[1].toLowerCase()}, and ${dish.tags[2].toLowerCase()} prepared for guests in Dubai, UAE.`;
  statPrice.textContent = dish.price;
  statCuisine.textContent = dish.cuisine;
  statLocation.textContent = dish.location;
  statService.textContent = dish.service;

  [titleTop, titleBottom, dishDescription, dishPrice, dishLocation, rating, chefName, chefText, statPrice, statCuisine, statLocation, statService].forEach((node) => {
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

  Array.from(thumbStrip.children).forEach((thumb, index) => {
    thumb.classList.toggle('active', index === activeIndex);
  });

  const activeThumb = thumbStrip.children[activeIndex];
  activeThumb?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function mountDish(element, src, alt) {
  element.innerHTML = '';
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  element.appendChild(img);
}

function switchDish(nextIndex, direction = 1) {
  if (isAnimating || nextIndex === activeIndex) return;
  isAnimating = true;

  const nextDish = dishes[nextIndex];
  mountDish(incomingDish, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);

  currentDish.className = 'dish-layer current';
  incomingDish.className = 'dish-layer incoming';
  void incomingDish.offsetWidth;

  if (direction >= 0) {
    currentDish.classList.add('animate-out-left');
    incomingDish.classList.add('animate-in-right');
  } else {
    currentDish.classList.add('animate-out-right');
    incomingDish.classList.add('animate-in-left');
  }

  activeIndex = nextIndex;
  renderText(nextDish);

  setTimeout(() => {
    mountDish(currentDish, nextDish.image, `${nextDish.titleTop} ${nextDish.titleBottom}`);
    currentDish.className = 'dish-layer current';
    incomingDish.className = 'dish-layer incoming';
    incomingDish.innerHTML = '';
    isAnimating = false;
  }, 720);
}

prevBtn?.addEventListener('click', () => {
  const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
  switchDish(nextIndex, -1);
});

nextBtn?.addEventListener('click', () => {
  const nextIndex = (activeIndex + 1) % dishes.length;
  switchDish(nextIndex, 1);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') prevBtn?.click();
  if (event.key === 'ArrowRight') nextBtn?.click();
});

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    activeTab = index;
    renderText(dishes[activeIndex]);
  });
});

function onTouchStart(event) {
  const touch = event.changedTouches[0];
  startX = touch.clientX;
  startY = touch.clientY;
}

function onTouchEnd(event) {
  const touch = event.changedTouches[0];
  const diffX = touch.clientX - startX;
  const diffY = touch.clientY - startY;
  if (Math.abs(diffX) < 45 || Math.abs(diffX) < Math.abs(diffY)) return;
  if (diffX < 0) {
    const nextIndex = (activeIndex + 1) % dishes.length;
    switchDish(nextIndex, 1);
  } else {
    const nextIndex = (activeIndex - 1 + dishes.length) % dishes.length;
    switchDish(nextIndex, -1);
  }
}

dishStage?.addEventListener('touchstart', onTouchStart, { passive: true });
dishStage?.addEventListener('touchend', onTouchEnd, { passive: true });

mountDish(currentDish, dishes[0].image, `${dishes[0].titleTop} ${dishes[0].titleBottom}`);
buildThumbs();
renderText(dishes[0]);
